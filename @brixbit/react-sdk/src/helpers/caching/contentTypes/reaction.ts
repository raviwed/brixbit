import type { Reaction } from "@brixbit/content-type-reaction";
import {
  ReactionCodec,
  ContentTypeReaction,
} from "@brixbit/content-type-reaction";
import { ContentTypeId } from "@brixbit/brixbit-js";
import type { Dexie, Table } from "dexie";
import { Mutex } from "async-mutex";
import { z } from "zod";
import type {
  ContentTypeConfiguration,
  ContentTypeMessageProcessor,
} from "../db";
import type { CachedMessage } from "../messages";
import { getMessageByBrixbitID, updateMessageMetadata } from "../messages";

const NAMESPACE = "reactions";

export type CachedReaction = {
  content: Reaction["content"];
  id?: number;
  referenceBrixbitID: Reaction["reference"];
  schema: Reaction["schema"];
  senderAddress: string;
  sentAt: Date;
  brixbitID: string;
};

export type CachedReactionWithId = CachedReaction & {
  id: number;
};

export type CachedReactionQuery = Partial<
  Pick<
    CachedReaction,
    "content" | "referenceBrixbitID" | "schema" | "senderAddress"
  >
>;

export type CachedReactionsMetadata = boolean;

export type CachedReactionsTable = Table<CachedReaction, number>;

/**
 * Finds a reaction in the cache
 *
 * @param reaction Cached reaction properties to look for
 * @param db Database instance
 * @returns Cached reaction, or `undefined` if not found
 */
export const findReaction = async (reaction: CachedReaction, db: Dexie) => {
  const reactionsTable = db.table("reactions") as CachedReactionsTable;

  const reactionQuery: CachedReactionQuery = {
    content: reaction.content,
    referenceBrixbitID: reaction.referenceBrixbitID,
    schema: reaction.schema,
    senderAddress: reaction.senderAddress,
  };

  const found = await reactionsTable.where(reactionQuery).first();

  return found ? (found as CachedReactionWithId) : undefined;
};

/**
 * Save a reaction to the cache
 *
 * @param reaction Reaction to save
 * @param db Database instance
 * @returns ID of the saved reaction, or an existing ID if the reaction
 * already exists in the cache
 */
export const saveReaction = async (reaction: CachedReaction, db: Dexie) => {
  const reactionsTable = db.table("reactions") as CachedReactionsTable;

  // check if reaction already exists
  const existing = await findReaction(reaction, db);
  if (existing) {
    // update when the reaction was sent
    await reactionsTable.update(existing.id, {
      sentAt: reaction.sentAt,
    });
    return existing.id;
  }

  return reactionsTable.add(reaction);
};

/**
 * Delete a reaction from the cache
 *
 * @param reaction Reaction to delete
 * @param db Database instance
 */
export const deleteReaction = async (reaction: CachedReaction, db: Dexie) => {
  const reactionsTable = db.table("reactions") as CachedReactionsTable;
  // make sure reaction exists
  const existing = await findReaction(reaction, db);
  if (existing) {
    await reactionsTable.delete(existing.id);
  }
};

/**
 * Get all reactions to a cached message by its BRIXBIT ID
 *
 * @param brixbitID The BRIXBIT ID of the cached message
 * @param db Database instance
 * @returns An array of reactions to the message
 */
export const getReactionsByBrixbitID = async (
  brixbitID: Reaction["reference"],
  db: Dexie,
) => {
  const reactionsTable = db.table("reactions") as CachedReactionsTable;
  return reactionsTable.where({ referenceBrixbitID: brixbitID }).sortBy("sentAt");
};

/**
 * Update the reactions metadata of a cached message
 *
 * The metadata stores the number of reactions to the message only.
 *
 * @param referenceBrixbitID The BRIXBIT ID of the cached message
 * @param db Database instance
 */
const updateReactionsMetadata = async (
  referenceBrixbitID: Reaction["reference"],
  db: Dexie,
) => {
  const reactions = await getReactionsByBrixbitID(referenceBrixbitID, db);
  const message = await getMessageByBrixbitID(referenceBrixbitID, db);
  if (message) {
    await updateMessageMetadata(message, NAMESPACE, reactions.length > 0, db);
  }
};

/**
 * Check if a cached message has a reaction
 *
 * @param message Cached message
 * @returns `true` if the message has a reaction, `false` otherwise
 */
export const hasReaction = (message: CachedMessage) =>
  !!message?.metadata?.[NAMESPACE];

const ReactionContentSchema = z.object({
  reference: z.string(),
  action: z.enum(["added", "removed"]),
  content: z.string(),
  schema: z.enum(["unicode", "shortcode", "custom"]),
});

/**
 * Validate the content of a reaction message
 *
 * @param content Message content
 * @returns `true` if the content is valid, `false` otherwise
 */
const isValidReactionContent = (content: unknown) => {
  const { success } = ReactionContentSchema.safeParse(content);
  return success;
};

const processReactionMutex = new Mutex();

/**
 * Process a reaction message
 *
 * Adds or removes the reaction from the cache based on the `action`
 * property. The original message is not saved to the messages cache.
 */
export const processReaction: ContentTypeMessageProcessor = async ({
  message,
  db,
}) => {
  // ensure that only 1 reaction message is processed at a time to preserve order
  await processReactionMutex.runExclusive(async () => {
    const contentType = ContentTypeId.fromString(message.contentType);
    if (
      ContentTypeReaction.sameAs(contentType) &&
      isValidReactionContent(message.content)
    ) {
      const reaction = message.content as Reaction;
      const cachedReaction = {
        content: reaction.content,
        referenceBrixbitID: reaction.reference,
        schema: reaction.schema,
        senderAddress: message.senderAddress,
        sentAt: message.sentAt,
        brixbitID: message.brixbitID,
      } satisfies CachedReaction;

      switch (reaction.action) {
        case "added":
          await saveReaction(cachedReaction, db);
          break;
        case "removed":
          await deleteReaction(cachedReaction, db);
          break;
        // no default
      }

      // update reactions metadata on the referenced message
      await updateReactionsMetadata(reaction.reference, db);
    }
  });
};

export const reactionContentTypeConfig: ContentTypeConfiguration = {
  codecs: [new ReactionCodec()],
  contentTypes: [ContentTypeReaction.toString()],
  namespace: NAMESPACE,
  processors: {
    [ContentTypeReaction.toString()]: [processReaction],
  },
  schema: {
    reactions: `
      ++id,
      [content+referenceBrixbitID+schema+senderAddress],
      referenceBrixbitID,
      content,
      schema,
      senderAddress,
      sentAt,
      brixbitID
    `,
  },
  validators: {
    [ContentTypeReaction.toString()]: isValidReactionContent,
  },
};
