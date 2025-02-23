import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.message_contents";
/** Group mutable metadata */
/** Message for group mutable metadata */
export interface GroupMutableMetadataV1 {
    /** Map to store various metadata attributes (Group name, etc.) */
    attributes: {
        [key: string]: string;
    };
    adminList: Inboxes | undefined;
    /**
     * Creator starts as only super_admin
     * Only super_admin can add/remove other super_admin
     */
    superAdminList: Inboxes | undefined;
}
export interface GroupMutableMetadataV1_AttributesEntry {
    key: string;
    value: string;
}
/** Wrapper around a list of repeated Inbox Ids */
export interface Inboxes {
    inboxIds: string[];
}
export declare const GroupMutableMetadataV1: {
    encode(message: GroupMutableMetadataV1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMutableMetadataV1;
    fromJSON(object: any): GroupMutableMetadataV1;
    toJSON(message: GroupMutableMetadataV1): unknown;
    fromPartial<I extends {
        attributes?: {
            [x: string]: string | undefined;
        } | undefined;
        adminList?: {
            inboxIds?: string[] | undefined;
        } | undefined;
        superAdminList?: {
            inboxIds?: string[] | undefined;
        } | undefined;
    } & {
        attributes?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["attributes"], string | number>]: never; }) | undefined;
        adminList?: ({
            inboxIds?: string[] | undefined;
        } & {
            inboxIds?: (string[] & string[] & { [K_1 in Exclude<keyof I["adminList"]["inboxIds"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["adminList"], "inboxIds">]: never; }) | undefined;
        superAdminList?: ({
            inboxIds?: string[] | undefined;
        } & {
            inboxIds?: (string[] & string[] & { [K_3 in Exclude<keyof I["superAdminList"]["inboxIds"], keyof string[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["superAdminList"], "inboxIds">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof GroupMutableMetadataV1>]: never; }>(object: I): GroupMutableMetadataV1;
};
export declare const GroupMutableMetadataV1_AttributesEntry: {
    encode(message: GroupMutableMetadataV1_AttributesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMutableMetadataV1_AttributesEntry;
    fromJSON(object: any): GroupMutableMetadataV1_AttributesEntry;
    toJSON(message: GroupMutableMetadataV1_AttributesEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof GroupMutableMetadataV1_AttributesEntry>]: never; }>(object: I): GroupMutableMetadataV1_AttributesEntry;
};
export declare const Inboxes: {
    encode(message: Inboxes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Inboxes;
    fromJSON(object: any): Inboxes;
    toJSON(message: Inboxes): unknown;
    fromPartial<I extends {
        inboxIds?: string[] | undefined;
    } & {
        inboxIds?: (string[] & string[] & { [K in Exclude<keyof I["inboxIds"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "inboxIds">]: never; }>(object: I): Inboxes;
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
