import type { Reply } from "@brixbit/content-type-reply";
import { ReplyCodec, ContentTypeReply } from "@brixbit/content-type-reply";
import { ContentTypeId } from "@brixbit/brixbit-js";
import type { Dexie, Table } from "dexie";
import { z } from "zod";
import type {
  CachedMessage,
  CachedMessageWithId,
  CachedMessagesTable,
} from "@/helpers/caching/messages";
import type {
  ContentTypeConfiguration,
  ContentTypeMessageProcessor,
} from "../db";
import { getMessageByBrixbitID } from "../messages";

const NAMESPACE = "replies";

export type CachedReply = {
  id?: number;
  referenceBrixbitID: Reply["reference"];
  brixbitID: string;
};

export type CachedReplyWithId = CachedReply & {
  id: number;
};

export type CachedRepliesTable = Table<CachedReply, number>;

/**
 * Add a reply to the cache
 *
 * @param brixbitID BRIXBIT message ID of the original message
 * @param replyBrixbitID BRIXBIT message ID of the reply message
 * @param db Database instance
 */
export const addReply = async (
  brixbitID: Reply["reference"],
  replyBrixbitID: string,
  db: Dexie,
) => {
  const repliesTable = db.table("replies") as CachedRepliesTable;

  const existing = await repliesTable
    .where({
      referenceBrixbitID: brixbitID,
      brixbitID: replyBrixbitID,
    })
    .first();

  return existing
    ? (existing as CachedReplyWithId).id
    : repliesTable.add({
        referenceBrixbitID: brixbitID,
        brixbitID: replyBrixbitID,
      });
};

/**
 * Retrieve all replies to a cached message
 *
 * @param message Cached message
 * @param db Database instance
 * @returns An array of reply messages
 */
export const getReplies = async (message: CachedMessage, db: Dexie) => {
  const repliesTable = db.table("replies") as CachedRepliesTable;
  const replies = await repliesTable
    .where({ referenceBrixbitID: message.brixbitID })
    .toArray();
  if (replies.length > 0) {
    const messagesTable = db.table("messages") as CachedMessagesTable;
    const replyMessages = await messagesTable
      .where("brixbitID")
      .anyOf(replies.map((reply) => reply.brixbitID))
      .sortBy("sentAt");
    return replyMessages as CachedMessageWithId[];
  }
  return [];
};

/**
 * Check if a cached message has any replies
 *
 * @param message Cached message
 * @param db Database instance
 * @returns `true` if the message has any replies, `false` otherwise
 */
export const hasReply = async (message: CachedMessage, db: Dexie) => {
  const repliesTable = db.table("replies") as CachedRepliesTable;
  const replies = await repliesTable
    .where({ referenceBrixbitID: message.brixbitID })
    .toArray();
  return replies.length > 0;
};

/**
 * Get the original message from a reply message
 *
 * @param message Cached message
 * @param db Database instance
 * @returns The original message, or `undefined` if the reply message is invalid
 */
export const getOriginalMessageFromReply = async (
  message: CachedMessage,
  db: Dexie,
) => {
  if (
    ContentTypeReply.sameAs(ContentTypeId.fromString(message.contentType)) &&
    message.status === "processed" &&
    message.content
  ) {
    const reply = message.content as Reply;
    return getMessageByBrixbitID(reply.reference, db);
  }
  return undefined;
};

const ReplyContentSchema = z.object({
  content: z.any(),
  contentType: z.object({
    authorityId: z.string(),
    typeId: z.string(),
    versionMajor: z.number().gt(0),
    versionMinor: z.number().gte(0),
  }),
  reference: z.string(),
});

/**
 * Validate the content of a reply message
 *
 * @param content Message content
 * @returns `true` if the content is valid, `false` otherwise
 */
const isValidReplyContent = (content: unknown) => {
  const { success } = ReplyContentSchema.safeParse(content);
  return success;
};

/**
 * Process a reply message
 *
 * Saves the reply message to the cache and updates the metadata of the
 * original message with the new reply.
 */
export const processReply: ContentTypeMessageProcessor = async ({
  message,
  db,
}) => {
  const contentType = ContentTypeId.fromString(message.contentType);
  if (
    ContentTypeReply.sameAs(contentType) &&
    isValidReplyContent(message.content)
  ) {
    const reply = message.content as Reply;

    // save the reply to cache
    await addReply(reply.reference, message.brixbitID, db);
  }
};

export const replyContentTypeConfig: ContentTypeConfiguration = {
  codecs: [new ReplyCodec()],
  contentTypes: [ContentTypeReply.toString()],
  namespace: NAMESPACE,
  processors: {
    [ContentTypeReply.toString()]: [processReply],
  },
  schema: {
    replies: `
      ++id,
      [referenceBrixbitID+brixbitID],
      referenceBrixbitID,
      brixbitID
    `,
  },
  validators: {
    [ContentTypeReply.toString()]: isValidReplyContent,
  },
};
