import * as _brixbit_brixbit_js from '@brixbit/brixbit-js';
import { InvitationContext, Client, Conversation, SendOptions, DecodedMessage, decodeContent, ContentCodec, ClientOptions, Signer, ContentTypeId, ConsentState, ConsentListEntry, PrivatePreferencesAction } from '@brixbit/brixbit-js';
export * from '@brixbit/brixbit-js';
export { Client, Compression, ContentTypeId, ContentTypeText, SortDirection } from '@brixbit/brixbit-js';
import * as Dexie from 'dexie';
import Dexie__default, { Table, Dexie as Dexie$1 } from 'dexie';
import { WalletClient } from 'viem';
import { Attachment, RemoteAttachment } from '@brixbit/content-type-remote-attachment';
import { Reaction } from '@brixbit/content-type-reaction';

type CachedConversation<M = ContentTypeMetadata> = {
    context?: InvitationContext;
    createdAt: Date;
    id?: number;
    isReady: boolean;
    lastSyncedAt?: Date;
    metadata?: M;
    peerAddress: string;
    topic: string;
    updatedAt: Date;
    walletAddress: string;
};
type CachedConversationsTable = Table<CachedConversation, number>;
type CachedConversationWithId = CachedConversation & {
    id: number;
};
/**
 * Retrieve a cached conversation by topic
 *
 * @returns The cached conversation if found, otherwise `undefined`
 */
declare const getCachedConversationByTopic: (walletAddress: string, topic: string, db: Dexie__default) => Promise<CachedConversationWithId | undefined>;
/**
 * Retrieve a cached conversation by peer address
 *
 * @returns The cached conversation if found, otherwise `undefined`
 */
declare const getCachedConversationByPeerAddress: (walletAddress: string, peerAddress: string, db: Dexie__default) => Promise<CachedConversationWithId | undefined>;
/**
 * Retrieve a conversation from the BRIXBIT client by a topic
 *
 * @returns The conversation if found, otherwise `undefined`
 */
declare const getConversationByTopic: (topic: string, client: Client) => Promise<Conversation | undefined>;
/**
 * Update properties of a cached conversation
 */
declare const updateConversation: (topic: string, update: Partial<Pick<CachedConversation, "updatedAt" | "isReady" | "metadata" | "lastSyncedAt">>, db: Dexie__default) => Promise<void>;
/**
 * Update metadata of a cached conversation using the specified namespace
 *
 * This is not meant to be called directly
 */
declare const updateConversationMetadata: (walletAddress: string, topic: string, namespace: string, data: ContentTypeMetadataValues, db: Dexie__default) => Promise<void>;
/**
 * Sets the `updatedAt` field of a cached conversation
 */
declare const setConversationUpdatedAt: (topic: string, updatedAt: CachedConversation["updatedAt"], db: Dexie__default) => Promise<void>;
/**
 * Check to see if a topic exists in the conversations cache
 */
declare const hasConversationTopic: (walletAddress: string, topic: string, db: Dexie__default) => Promise<boolean>;
/**
 * Converts a Conversation from the BRIXBIT network to its cached format
 *
 * @returns The conversation in cached format
 */
declare const toCachedConversation: (conversation: Conversation, walletAddress: string) => {
    context: InvitationContext | undefined;
    createdAt: Date;
    isReady: boolean;
    peerAddress: string;
    topic: string;
    updatedAt: Date;
    walletAddress: string;
};
/**
 * Save a conversation to the cache
 *
 * @returns The saved cached conversation with ID
 */
declare const saveConversation: (conversation: CachedConversation, db: Dexie__default) => Promise<CachedConversationWithId>;

type CachedMessage<C = any, M = ContentTypeMetadata> = {
    content: C;
    contentBytes?: Uint8Array;
    contentFallback?: string;
    contentType: string;
    conversationTopic: string;
    hasLoadError: boolean;
    hasSendError: boolean;
    id?: number;
    isSending: boolean;
    metadata?: M;
    senderAddress: string;
    sendOptions?: SendOptions;
    sentAt: Date;
    status: "unprocessed" | "processed";
    uuid: string;
    walletAddress: string;
    brixbitID: string;
};
type CachedMessagesTable = Table<CachedMessage, number>;
type CachedMessageWithId<C = any> = CachedMessage<C> & {
    id: number;
};
/**
 * Converts a DecodedMessage from the BRIXBIT network to its cached format
 *
 * @param message The message to convert
 * @param walletAddress The wallet address associated with the message
 * @returns The message in cached format
 */
declare const toCachedMessage: (message: DecodedMessage, walletAddress: string) => {
    content: any;
    contentBytes: Uint8Array | undefined;
    contentFallback: string | undefined;
    contentType: string;
    conversationTopic: string;
    status: "unprocessed";
    hasLoadError: false;
    hasSendError: false;
    isSending: false;
    senderAddress: string;
    sentAt: Date;
    uuid: string;
    walletAddress: string;
    brixbitID: string;
};
/**
 * Retrieve a message from the cache by its BRIXBIT ID
 *
 * @param brixbitID The BRIXBIT ID of the message to retrieve
 * @param db Database instance
 * @returns The cached message, or `undefined` if not found
 */
declare const getMessageByBrixbitID: (brixbitID: string, db: Dexie__default) => Promise<CachedMessageWithId<any> | undefined>;
/**
 * Save a message to the cache
 *
 * @returns The newly cached message, or an already existing cached message
 */
declare const saveMessage: (message: CachedMessage, db: Dexie__default) => Promise<CachedMessageWithId<any>>;
/**
 * Remove a message from the cache
 */
declare const deleteMessage: (message: CachedMessageWithId, db: Dexie__default) => Promise<void>;
/**
 * Update properties of a cached message
 */
declare const updateMessage: (message: CachedMessage, update: Partial<Pick<CachedMessage, "status" | "isSending" | "sentAt" | "brixbitID" | "metadata" | "hasLoadError" | "hasSendError" | "sendOptions">>, db: Dexie__default) => Promise<{
    metadata?: ContentTypeMetadata | undefined;
    status: "unprocessed" | "processed";
    isSending: boolean;
    sentAt: Date;
    brixbitID: string;
    hasLoadError: boolean;
    hasSendError: boolean;
    sendOptions?: SendOptions | undefined;
    content: any;
    contentBytes?: Uint8Array | undefined;
    contentFallback?: string | undefined;
    contentType: string;
    conversationTopic: string;
    id?: number | undefined;
    senderAddress: string;
    uuid: string;
    walletAddress: string;
}>;
/**
 * Update metadata of a cached message using the specified namespace
 *
 * This is not meant to be called directly
 */
declare const updateMessageMetadata: (message: CachedMessage, namespace: string, data: ContentTypeMetadataValues, db: Dexie__default) => Promise<{
    metadata?: ContentTypeMetadata | undefined;
    status: "unprocessed" | "processed";
    isSending: boolean;
    sentAt: Date;
    brixbitID: string;
    hasLoadError: boolean;
    hasSendError: boolean;
    sendOptions?: SendOptions | undefined;
    content: any;
    contentBytes?: Uint8Array | undefined;
    contentFallback?: string | undefined;
    contentType: string;
    conversationTopic: string;
    id?: number | undefined;
    senderAddress: string;
    uuid: string;
    walletAddress: string;
}>;
type ProcessMessageOptions = {
    client?: Client;
    conversation: CachedConversation;
    db: Dexie__default;
    message: CachedMessage;
    namespaces: Record<string, string>;
    processors: ContentTypeMessageProcessors;
    validators: ContentTypeMessageValidators;
};
type ReprocessMessageOptions = ProcessMessageOptions & {
    /**
     * This is a convenience option to override the default message processor
     * for testing purposes and should not be used in production.
     */
    process?: typeof processMessage;
    /**
     * This is a convenience option to override the default content decoder
     * for testing purposes and should not be used in production.
     */
    decode?: typeof decodeContent;
};
type ProcessStatus = "no_client" | "queued" | "duplicate" | "invalid" | "unsupported" | "processed";
/**
 * Process a cached message using the passed parameters. Optionally remove
 * an existing message before processing.
 */
declare const processMessage: ({ client, conversation, db, message, namespaces, processors, validators, }: ProcessMessageOptions, removeExisting?: boolean) => Promise<{
    status: ProcessStatus;
    message: CachedMessage;
}>;
/**
 * Reprocess a message if it has the following requirements:
 *
 * - Message content must be undefined (not decoded)
 * - Message content bytes must be defined
 * - Client must be defined (for decoding)
 * - Message content type must have a processor
 *
 * Reprocessing a message will remove its original entry in the cache and
 * create a new one.
 */
declare const reprocessMessage: ({ client, conversation, db, message, namespaces, processors, validators, process, decode, }: ReprocessMessageOptions) => Promise<CachedMessage<any, ContentTypeMetadata> | {
    status: ProcessStatus;
    message: CachedMessage;
}>;
/**
 * Retrieve the last message of conversation in the cache
 */
declare const getLastMessage: (topic: string, db: Dexie__default) => Promise<CachedMessage<any, ContentTypeMetadata>>;
type ProcessUnprocessedMessagesOptions = Omit<ProcessMessageOptions, "conversation" | "message" | "client"> & Pick<Required<ProcessMessageOptions>, "client"> & {
    /**
     * This is a convenience option to override the default `reprocessMessage`
     * for testing purposes and should not be used in production.
     */
    reprocess?: typeof reprocessMessage;
};

type ContentTypeMetadataValue = string | string[] | number | number[] | boolean | boolean[] | null | Uint8Array;
type ContentTypeMetadataValues = ContentTypeMetadataValue | Record<string, ContentTypeMetadataValue>;
type ContentTypeMetadata = {
    [namespace: string]: ContentTypeMetadataValues;
};
type ContentTypeMessageProcessor<C = any> = (options: {
    client: Client;
    conversation: CachedConversation;
    db: Dexie__default;
    message: CachedMessage<C>;
    processors?: ContentTypeMessageProcessors;
    updateConversationMetadata: (data: ContentTypeMetadataValues) => Promise<void>;
}) => void | Promise<void>;
type ContentTypeMessageValidators = Record<string, (content: unknown) => boolean>;
type ContentTypeConfiguration = {
    codecs: ContentCodec<any>[];
    contentTypes: string[];
    namespace: string;
    processors?: ContentTypeMessageProcessors;
    schema?: Record<string, string>;
    validators?: ContentTypeMessageValidators;
};
type ContentTypeMessageProcessors = {
    [contentType: string]: ContentTypeMessageProcessor[];
};
type GetDBInstanceOptions = {
    db?: Dexie__default;
    contentTypeConfigs?: ContentTypeConfiguration[];
    version?: number;
};
/**
 * Get a new DB instance using the passed options
 */
declare const getDbInstance: (options?: GetDBInstanceOptions) => Dexie__default;
declare const clearCache: (db: Dexie__default) => Promise<void>;

type BRIXBITProviderProps = React.PropsWithChildren & {
    /**
     * Initial BRIXBIT client instance
     */
    client?: Client;
    /**
     * An array of content type configurations to support the caching and/or
     * processing of messages
     */
    contentTypeConfigs?: ContentTypeConfiguration[];
    /**
     * Database version to use for the local cache
     *
     * This number should be incremented when adding support for additional
     * content types
     */
    dbVersion?: number;
};
declare const BRIXBITProvider: React.FC<BRIXBITProviderProps>;

/**
 * Check if a wallet address is valid.
 *
 * @param address The string to validate
 * @returns `true` if address is valid
 */
declare const isValidAddress: (address: string) => boolean;

type OnError = {
    /**
     * Callback function to execute when an error occurs
     */
    onError?: (error: Error) => void;
};
type CanMessageReturns<T> = T extends string ? boolean : T extends string[] ? boolean[] : never;

type InitializeClientOptions = {
    /**
     * Provide a BRIXBIT PrivateKeyBundle encoded as a Uint8Array for signing
     *
     * This is required if `signer` is not specified
     */
    keys?: Uint8Array;
    /**
     * BRIXBIT client options
     */
    options?: Partial<Omit<ClientOptions, "codecs">>;
    /**
     * The signer (wallet) to associate with the BRIXBIT client
     */
    signer?: Signer | WalletClient | null;
};
/**
 * This hook allows you to initialize, disconnect, and access the BRIXBIT client
 * instance. It also exposes the error and loading states of the client.
 */
declare const useClient: (onError?: OnError["onError"]) => {
    client: Client<any> | undefined;
    disconnect: () => Promise<void>;
    error: Error | null;
    initialize: ({ keys, options, signer }: InitializeClientOptions) => Promise<Client<any> | undefined>;
    isLoading: boolean;
};

/**
 * This hook returns the local DB instance and a method for clearing all of
 * its data
 */
declare const useDb: () => {
    clearCache: () => Promise<void>;
    db: Dexie.Dexie;
};

/**
 * This hook returns helper functions for working with conversations in the
 * local cache.
 */
declare const useConversation: () => {
    getByTopic: (topic: string) => Promise<_brixbit_brixbit_js.Conversation<any> | undefined>;
    getCachedByTopic: (topic: string) => Promise<CachedConversationWithId | undefined>;
    getCachedByPeerAddress: (peerAddress: string) => Promise<CachedConversationWithId | undefined>;
    getLastMessage: (topic: string) => Promise<CachedMessage<any, ContentTypeMetadata>>;
    hasConversationTopic: (topic: string) => Promise<boolean>;
};

type UseConversationsOptions = OnError & {
    /**
     * Callback function to execute when new conversations are fetched
     */
    onConversations?: (conversations: Conversation[]) => void;
};
/**
 * This hook fetches all conversations with the current wallet on mount.
 * It also exposes error and loading states.
 */
declare const useConversations: (options?: UseConversationsOptions) => {
    conversations: CachedConversation<ContentTypeMetadata>[];
    error: Error | null;
    isLoaded: boolean;
    isLoading: boolean;
};

type UseSendMessageOptions = OnError & {
    /**
     * Callback function to execute when a message has been sent successfully
     */
    onSuccess?: (message: DecodedMessage) => void;
};
/**
 * This hook sends a new message into a conversation
 */
declare const useSendMessage: (options?: UseSendMessageOptions) => {
    error: Error | null;
    isLoading: boolean;
    sendMessage: <T = string>(conversation: CachedConversation, content: T, contentType?: ContentTypeId, sendOptions?: Omit<SendOptions, "contentType">) => Promise<DecodedMessage<any> | undefined>;
};

type SendMessageOptions = Omit<SendOptions, "contentType"> & Pick<UseSendMessageOptions, "onSuccess" | "onError">;

type UseStartConversation = Partial<InvitationContext> & OnError;
/**
 * This hook starts a new conversation and sends an initial message to it.
 */
declare const useStartConversation: (options?: UseStartConversation) => {
    error: Error | null;
    isLoading: boolean;
    startConversation: <T = string>(peerAddress: string, content: T, contentType?: ContentTypeId, sendOptions?: SendMessageOptions) => Promise<{
        cachedConversation: undefined;
        cachedMessage: undefined;
        conversation: undefined;
    } | {
        cachedConversation: undefined;
        cachedMessage: undefined;
        conversation: _brixbit_brixbit_js.Conversation<any>;
    } | {
        cachedConversation: CachedConversationWithId;
        cachedMessage: undefined;
        conversation: _brixbit_brixbit_js.Conversation<any>;
    } | {
        cachedConversation: CachedConversationWithId;
        cachedMessage: CachedMessage<any, ContentTypeMetadata>;
        conversation: _brixbit_brixbit_js.Conversation<any>;
    }>;
};

type UseStreamConversationsOptions = {
    onConversation?: (conversation: Conversation) => void;
    onError?: OnError["onError"];
};
/**
 * This hook listens for new conversations in real-time and calls the passed
 * callback when a new conversation is created. It also exposes an error state.
 */
declare const useStreamConversations: (options?: UseStreamConversationsOptions) => {
    error: Error | null;
};

/**
 * This hook returns the last message from a conversation from the local cache
 */
declare const useLastMessage: (topic: string) => CachedMessage<any, ContentTypeMetadata> | undefined;

/**
 * This hook exposes both the client and static instances of the `canMessage`
 * method.
 */
declare const useCanMessage: (onError?: OnError["onError"]) => {
    error: Error | null;
    isLoading: boolean;
    canMessage: <T extends string | string[]>(peerAddress: T) => Promise<CanMessageReturns<T>>;
    canMessageStatic: <T_1 extends string | string[]>(peerAddress: T_1, options?: Partial<_brixbit_brixbit_js.NetworkOptions> | undefined) => Promise<CanMessageReturns<T_1>>;
};

type UseMessagesOptions = OnError & {
    /**
     * Callback function to execute when new messages are fetched
     */
    onMessages?: (messages: DecodedMessage[]) => void;
    /**
     * Whether or not to disable automatic syncing of messages when the
     * browser tab becomes visible
     */
    disableAutoSync?: boolean;
};
/**
 * This hook fetches a list of all messages within a conversation on mount. It
 * also exposes loading and error states and whether or not there are more
 * messages based on the options passed.
 */
declare const useMessages: (conversation: CachedConversation, options?: UseMessagesOptions) => {
    error: Error | null;
    isLoaded: boolean;
    isLoading: boolean;
    messages: CachedMessageWithId[];
};

/**
 * This hook can be used to resend a previously failed message, or cancel it.
 */
declare const useResendMessage: (options?: UseSendMessageOptions) => {
    cancel: (message: CachedMessageWithId) => Promise<void>;
    error: Error | null;
    isLoading: boolean;
    resend: (message: CachedMessageWithId) => Promise<_brixbit_brixbit_js.DecodedMessage<any>>;
};

/**
 * This hook streams new messages from all conversations on mount and exposes
 * an error state.
 */
declare const useStreamAllMessages: (onMessage?: ((message: DecodedMessage) => void | Promise<void>) | undefined, onError?: OnError["onError"]) => {
    error: Error | null;
};

type UseStreamMessagesOptions = {
    onError?: OnError["onError"];
    onMessage?: (message: DecodedMessage) => void;
};
/**
 * This hook streams new conversation messages on mount and exposes an error state.
 */
declare const useStreamMessages: (conversation: CachedConversation, options?: UseStreamMessagesOptions) => {
    error: Error | null;
};

type CachedConsentEntry = {
    peerAddress: string;
    state: ConsentState;
    walletAddress: string;
};
type CachedConsentTable = Table<CachedConsentEntry, string>;
type CachedConsentEntryMap = {
    [peerAddress: string]: ConsentListEntry;
};
/**
 * Retrieve a cached consent entry by wallet and peer address
 *
 * @returns The cached consent entry if found, otherwise `undefined`
 */
declare const getCachedConsentEntry: (walletAddress: string, peerAddress: string, db: Dexie__default) => Promise<CachedConsentEntry | undefined>;
/**
 * Retrieve all cached consent entries
 *
 * @returns An array of ConsentListEntry instances
 */
declare const getCachedConsentEntries: (walletAddress: string, db: Dexie__default) => Promise<ConsentListEntry[]>;
/**
 * Retrieve all cached consent entries as an object mapping
 *
 * @returns A map of peer addresses and their ConsentListEntry instance
 */
declare const getCachedConsentEntriesMap: (walletAddress: string, db: Dexie__default) => Promise<Partial<CachedConsentEntryMap>>;
/**
 * Retrieve a cached consent state by wallet and peer address
 *
 * @returns The cached consent state if found, otherwise `undefined`
 */
declare const getCachedConsentState: (walletAddress: string, peerAddress: string, db: Dexie__default) => Promise<ConsentState>;
/**
 * Load the cached consent list entries into the BRIXBIT client
 */
declare const loadConsentListFromCache: (client: Client, db: Dexie__default) => Promise<void>;
/**
 * Add or update a peer address's consent state
 */
declare const putConsentState: (walletAddress: string, peerAddress: string, state: ConsentState, db: Dexie__default) => Promise<void>;
/**
 * Add or update multiple peer addresses' consent state
 */
declare const bulkPutConsentState: (entries: CachedConsentEntry[], db: Dexie__default) => Promise<void>;

/**
 * This hook returns helper functions for working with consent
 */
declare const useConsent: () => {
    allow: (addresses: string[], skipPublish?: boolean) => Promise<void>;
    consentState: (address: string) => Promise<_brixbit_brixbit_js.ConsentState>;
    deny: (addresses: string[], skipPublish?: boolean) => Promise<void>;
    entries: Partial<CachedConsentEntryMap>;
    isAllowed: (address: string) => Promise<boolean>;
    isDenied: (address: string) => Promise<boolean>;
    loadConsentList: (startTime?: Date) => Promise<_brixbit_brixbit_js.ConsentListEntry[]>;
    refreshConsentList: () => Promise<_brixbit_brixbit_js.ConsentListEntry[]>;
};

/**
 * This hook streams new consent list actions on mount and exposes
 * an error state.
 */
declare const useStreamConsentList: (onAction?: ((action: PrivatePreferencesAction) => void | Promise<void>) | undefined, onError?: OnError["onError"]) => {
    error: Error | null;
};

type UseAttachmentOptions = {
    disableAutoload?: boolean;
    autoloadMaxFileSize?: number;
};
type AttachmentStatus = "init" | "loading" | "error" | "loaded" | "autoloadMaxFileSizeExceeded";
/**
 * This hook returns the attachment data of a cached message
 */
declare const useAttachment: (message: CachedMessage, options?: UseAttachmentOptions) => {
    attachment: Attachment | undefined;
    error: Error | undefined;
    load: () => void;
    status: AttachmentStatus;
};

/**
 * Get the attachment data from a cached message
 *
 * @param message Cached message
 * @returns The attachment data, or `undefined` if the message is not an
 * attachment content type
 */
declare const getAttachment: (message: CachedMessage) => Attachment | RemoteAttachment | undefined;
declare const attachmentContentTypeConfig: ContentTypeConfiguration;

type CachedReaction = {
    content: Reaction["content"];
    id?: number;
    referenceBrixbitID: Reaction["reference"];
    schema: Reaction["schema"];
    senderAddress: string;
    sentAt: Date;
    brixbitID: string;
};
type CachedReactionsMetadata = boolean;
type CachedReactionsTable = Table<CachedReaction, number>;
/**
 * Get all reactions to a cached message by its BRIXBIT ID
 *
 * @param brixbitID The BRIXBIT ID of the cached message
 * @param db Database instance
 * @returns An array of reactions to the message
 */
declare const getReactionsByBrixbitID: (brixbitID: Reaction["reference"], db: Dexie$1) => Promise<CachedReaction[]>;
/**
 * Check if a cached message has a reaction
 *
 * @param message Cached message
 * @returns `true` if the message has a reaction, `false` otherwise
 */
declare const hasReaction: (message: CachedMessage) => boolean;
declare const reactionContentTypeConfig: ContentTypeConfiguration;

/**
 * This hook returns cached reactions to a message from the local cache
 */
declare const useReactions: (message?: CachedMessage) => CachedReaction[];

/**
 * This hook returns the original message of a cached reply
 */
declare const useReply: (message?: CachedMessage) => {
    originalMessage: CachedMessage | undefined;
};

/**
 * This hook returns cached replies to a message from the local cache
 */
declare const useReplies: (message?: CachedMessage) => CachedMessageWithId[];

/**
 * Retrieve all replies to a cached message
 *
 * @param message Cached message
 * @param db Database instance
 * @returns An array of reply messages
 */
declare const getReplies: (message: CachedMessage, db: Dexie$1) => Promise<CachedMessageWithId[]>;
/**
 * Check if a cached message has any replies
 *
 * @param message Cached message
 * @param db Database instance
 * @returns `true` if the message has any replies, `false` otherwise
 */
declare const hasReply: (message: CachedMessage, db: Dexie$1) => Promise<boolean>;
/**
 * Get the original message from a reply message
 *
 * @param message Cached message
 * @param db Database instance
 * @returns The original message, or `undefined` if the reply message is invalid
 */
declare const getOriginalMessageFromReply: (message: CachedMessage, db: Dexie$1) => Promise<CachedMessageWithId<any> | undefined>;
declare const replyContentTypeConfig: ContentTypeConfiguration;

declare const textContentTypeConfig: ContentTypeConfiguration;

export { type CachedConsentEntry, type CachedConsentEntryMap, type CachedConsentTable, type CachedConversation, type CachedConversationWithId, type CachedConversationsTable, type CachedMessage, type CachedMessageWithId, type CachedMessagesTable, type CachedReaction, type CachedReactionsMetadata, type CachedReactionsTable, type ContentTypeConfiguration, type ContentTypeMessageProcessor, type ContentTypeMessageProcessors, type ContentTypeMessageValidators, type ContentTypeMetadata, type ContentTypeMetadataValue, type ContentTypeMetadataValues, type ProcessUnprocessedMessagesOptions, BRIXBITProvider, attachmentContentTypeConfig, bulkPutConsentState, clearCache, deleteMessage, getAttachment, getCachedConsentEntries, getCachedConsentEntriesMap, getCachedConsentEntry, getCachedConsentState, getCachedConversationByPeerAddress, getCachedConversationByTopic, getConversationByTopic, getDbInstance, getLastMessage, getMessageByBrixbitID, getOriginalMessageFromReply, getReactionsByBrixbitID, getReplies, hasConversationTopic, hasReaction, hasReply, isValidAddress, loadConsentListFromCache, putConsentState, reactionContentTypeConfig, replyContentTypeConfig, saveConversation, saveMessage, setConversationUpdatedAt, textContentTypeConfig, toCachedConversation, toCachedMessage, updateConversation, updateConversationMetadata, updateMessage, updateMessageMetadata, useAttachment, useCanMessage, useClient, useConsent, useConversation, useConversations, useDb, useLastMessage, useMessages, useReactions, useReplies, useReply, useResendMessage, useSendMessage, useStartConversation, useStreamAllMessages, useStreamConsentList, useStreamConversations, useStreamMessages };
