import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.message_contents";
/** Group immutable metadata */
/** Defines the type of conversation */
export declare enum ConversationType {
    CONVERSATION_TYPE_UNSPECIFIED = 0,
    CONVERSATION_TYPE_GROUP = 1,
    CONVERSATION_TYPE_DM = 2,
    CONVERSATION_TYPE_SYNC = 3,
    UNRECOGNIZED = -1
}
export declare function conversationTypeFromJSON(object: any): ConversationType;
export declare function conversationTypeToJSON(object: ConversationType): string;
/** Parent message for group metadata */
export interface GroupMetadataV1 {
    conversationType: ConversationType;
    /** This will be removed soon */
    creatorAccountAddress: string;
    creatorInboxId: string;
}
export declare const GroupMetadataV1: {
    encode(message: GroupMetadataV1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMetadataV1;
    fromJSON(object: any): GroupMetadataV1;
    toJSON(message: GroupMetadataV1): unknown;
    fromPartial<I extends {
        conversationType?: ConversationType | undefined;
        creatorAccountAddress?: string | undefined;
        creatorInboxId?: string | undefined;
    } & {
        conversationType?: ConversationType | undefined;
        creatorAccountAddress?: string | undefined;
        creatorInboxId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof GroupMetadataV1>]: never; }>(object: I): GroupMetadataV1;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
