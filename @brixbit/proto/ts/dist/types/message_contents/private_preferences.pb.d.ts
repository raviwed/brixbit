import Long from "long";
import { Ciphertext } from "./ciphertext.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/**
 * Private Key Storage
 *
 * Following definitions are not used in the protocol, instead they provide a
 * way for encoding private keys for storage.
 */
/**
 * PrivatePreferencesAction is a message used to update the client's preference
 * store.
 */
export interface PrivatePreferencesAction {
    allowAddress: PrivatePreferencesAction_AllowAddress | undefined;
    denyAddress: PrivatePreferencesAction_DenyAddress | undefined;
    allowGroup: PrivatePreferencesAction_AllowGroup | undefined;
    denyGroup: PrivatePreferencesAction_DenyGroup | undefined;
    allowInboxId: PrivatePreferencesAction_AllowInboxId | undefined;
    denyInboxId: PrivatePreferencesAction_DenyInboxId | undefined;
}
/** Allow 1:1 direct message (DM) access */
export interface PrivatePreferencesAction_AllowAddress {
    /** Add the given wallet addresses to the allow list */
    walletAddresses: string[];
}
/** Deny (block) 1:1 direct message (DM) access */
export interface PrivatePreferencesAction_DenyAddress {
    /** Add the given wallet addresses to the deny list */
    walletAddresses: string[];
}
/** Allow V3 1:1 direct message (DM) access */
export interface PrivatePreferencesAction_AllowInboxId {
    /** Add the given inbox id to the allow list */
    inboxIds: string[];
}
/** Deny (block) V3 1:1 direct message (DM) access */
export interface PrivatePreferencesAction_DenyInboxId {
    /** Add the given inbox id to the deny list */
    inboxIds: string[];
}
/** Allow Group access */
export interface PrivatePreferencesAction_AllowGroup {
    /** Add the given group_ids to the allow list */
    groupIds: string[];
}
/** Deny (deny) Group access */
export interface PrivatePreferencesAction_DenyGroup {
    /** Add the given group_ids to the deny list */
    groupIds: string[];
}
/** The payload that goes over the wire */
export interface PrivatePreferencesPayload {
    v1: Ciphertext | undefined;
}
export declare const PrivatePreferencesAction: {
    encode(message: PrivatePreferencesAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction;
    fromJSON(object: any): PrivatePreferencesAction;
    toJSON(message: PrivatePreferencesAction): unknown;
    fromPartial<I extends {
        allowAddress?: {
            walletAddresses?: string[] | undefined;
        } | undefined;
        denyAddress?: {
            walletAddresses?: string[] | undefined;
        } | undefined;
        allowGroup?: {
            groupIds?: string[] | undefined;
        } | undefined;
        denyGroup?: {
            groupIds?: string[] | undefined;
        } | undefined;
        allowInboxId?: {
            inboxIds?: string[] | undefined;
        } | undefined;
        denyInboxId?: {
            inboxIds?: string[] | undefined;
        } | undefined;
    } & {
        allowAddress?: ({
            walletAddresses?: string[] | undefined;
        } & {
            walletAddresses?: (string[] & string[] & { [K in Exclude<keyof I["allowAddress"]["walletAddresses"], keyof string[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["allowAddress"], "walletAddresses">]: never; }) | undefined;
        denyAddress?: ({
            walletAddresses?: string[] | undefined;
        } & {
            walletAddresses?: (string[] & string[] & { [K_2 in Exclude<keyof I["denyAddress"]["walletAddresses"], keyof string[]>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["denyAddress"], "walletAddresses">]: never; }) | undefined;
        allowGroup?: ({
            groupIds?: string[] | undefined;
        } & {
            groupIds?: (string[] & string[] & { [K_4 in Exclude<keyof I["allowGroup"]["groupIds"], keyof string[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["allowGroup"], "groupIds">]: never; }) | undefined;
        denyGroup?: ({
            groupIds?: string[] | undefined;
        } & {
            groupIds?: (string[] & string[] & { [K_6 in Exclude<keyof I["denyGroup"]["groupIds"], keyof string[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["denyGroup"], "groupIds">]: never; }) | undefined;
        allowInboxId?: ({
            inboxIds?: string[] | undefined;
        } & {
            inboxIds?: (string[] & string[] & { [K_8 in Exclude<keyof I["allowInboxId"]["inboxIds"], keyof string[]>]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["allowInboxId"], "inboxIds">]: never; }) | undefined;
        denyInboxId?: ({
            inboxIds?: string[] | undefined;
        } & {
            inboxIds?: (string[] & string[] & { [K_10 in Exclude<keyof I["denyInboxId"]["inboxIds"], keyof string[]>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["denyInboxId"], "inboxIds">]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof PrivatePreferencesAction>]: never; }>(object: I): PrivatePreferencesAction;
};
export declare const PrivatePreferencesAction_AllowAddress: {
    encode(message: PrivatePreferencesAction_AllowAddress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction_AllowAddress;
    fromJSON(object: any): PrivatePreferencesAction_AllowAddress;
    toJSON(message: PrivatePreferencesAction_AllowAddress): unknown;
    fromPartial<I extends {
        walletAddresses?: string[] | undefined;
    } & {
        walletAddresses?: (string[] & string[] & { [K in Exclude<keyof I["walletAddresses"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "walletAddresses">]: never; }>(object: I): PrivatePreferencesAction_AllowAddress;
};
export declare const PrivatePreferencesAction_DenyAddress: {
    encode(message: PrivatePreferencesAction_DenyAddress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction_DenyAddress;
    fromJSON(object: any): PrivatePreferencesAction_DenyAddress;
    toJSON(message: PrivatePreferencesAction_DenyAddress): unknown;
    fromPartial<I extends {
        walletAddresses?: string[] | undefined;
    } & {
        walletAddresses?: (string[] & string[] & { [K in Exclude<keyof I["walletAddresses"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "walletAddresses">]: never; }>(object: I): PrivatePreferencesAction_DenyAddress;
};
export declare const PrivatePreferencesAction_AllowInboxId: {
    encode(message: PrivatePreferencesAction_AllowInboxId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction_AllowInboxId;
    fromJSON(object: any): PrivatePreferencesAction_AllowInboxId;
    toJSON(message: PrivatePreferencesAction_AllowInboxId): unknown;
    fromPartial<I extends {
        inboxIds?: string[] | undefined;
    } & {
        inboxIds?: (string[] & string[] & { [K in Exclude<keyof I["inboxIds"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "inboxIds">]: never; }>(object: I): PrivatePreferencesAction_AllowInboxId;
};
export declare const PrivatePreferencesAction_DenyInboxId: {
    encode(message: PrivatePreferencesAction_DenyInboxId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction_DenyInboxId;
    fromJSON(object: any): PrivatePreferencesAction_DenyInboxId;
    toJSON(message: PrivatePreferencesAction_DenyInboxId): unknown;
    fromPartial<I extends {
        inboxIds?: string[] | undefined;
    } & {
        inboxIds?: (string[] & string[] & { [K in Exclude<keyof I["inboxIds"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "inboxIds">]: never; }>(object: I): PrivatePreferencesAction_DenyInboxId;
};
export declare const PrivatePreferencesAction_AllowGroup: {
    encode(message: PrivatePreferencesAction_AllowGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction_AllowGroup;
    fromJSON(object: any): PrivatePreferencesAction_AllowGroup;
    toJSON(message: PrivatePreferencesAction_AllowGroup): unknown;
    fromPartial<I extends {
        groupIds?: string[] | undefined;
    } & {
        groupIds?: (string[] & string[] & { [K in Exclude<keyof I["groupIds"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "groupIds">]: never; }>(object: I): PrivatePreferencesAction_AllowGroup;
};
export declare const PrivatePreferencesAction_DenyGroup: {
    encode(message: PrivatePreferencesAction_DenyGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesAction_DenyGroup;
    fromJSON(object: any): PrivatePreferencesAction_DenyGroup;
    toJSON(message: PrivatePreferencesAction_DenyGroup): unknown;
    fromPartial<I extends {
        groupIds?: string[] | undefined;
    } & {
        groupIds?: (string[] & string[] & { [K in Exclude<keyof I["groupIds"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "groupIds">]: never; }>(object: I): PrivatePreferencesAction_DenyGroup;
};
export declare const PrivatePreferencesPayload: {
    encode(message: PrivatePreferencesPayload, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PrivatePreferencesPayload;
    fromJSON(object: any): PrivatePreferencesPayload;
    toJSON(message: PrivatePreferencesPayload): unknown;
    fromPartial<I extends {
        v1?: {
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
    } & {
        v1?: ({
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } & {
            aes256GcmHkdfSha256?: ({
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["v1"]["aes256GcmHkdfSha256"], keyof import("./ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["v1"], "aes256GcmHkdfSha256">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "v1">]: never; }>(object: I): PrivatePreferencesPayload;
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
