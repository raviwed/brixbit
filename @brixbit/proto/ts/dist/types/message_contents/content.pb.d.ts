import Long from "long";
import { SignedPublicKeyBundle } from "./public_key.pb";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Message content encoding structures */
/**
 * Recognized compression algorithms
 * protolint:disable ENUM_FIELD_NAMES_ZERO_VALUE_END_WITH
 */
export declare enum Compression {
    COMPRESSION_DEFLATE = 0,
    COMPRESSION_GZIP = 1,
    UNRECOGNIZED = -1
}
export declare function compressionFromJSON(object: any): Compression;
export declare function compressionToJSON(object: Compression): string;
/** ContentTypeId is used to identify the type of content stored in a Message. */
export interface ContentTypeId {
    /** authority governing this content type */
    authorityId: string;
    /** type identifier */
    typeId: string;
    /** major version of the type */
    versionMajor: number;
    /** minor version of the type */
    versionMinor: number;
}
/**
 * EncodedContent bundles the content with metadata identifying its type
 * and parameters required for correct decoding and presentation of the content.
 */
export interface EncodedContent {
    /**
     * content type identifier used to match the payload with
     * the correct decoding machinery
     */
    type: ContentTypeId | undefined;
    /** optional encoding parameters required to correctly decode the content */
    parameters: {
        [key: string]: string;
    };
    /**
     * optional fallback description of the content that can be used in case
     * the client cannot decode or render the content
     */
    fallback?: string | undefined;
    /**
     * optional compression; the value indicates algorithm used to
     * compress the encoded content bytes
     */
    compression?: Compression | undefined;
    /** encoded content itself */
    content: Uint8Array;
}
export interface EncodedContent_ParametersEntry {
    key: string;
    value: string;
}
/** SignedContent attaches a signature to EncodedContent. */
export interface SignedContent {
    /** MUST contain EncodedContent */
    payload: Uint8Array;
    sender: SignedPublicKeyBundle | undefined;
    /**
     * MUST be a signature of a concatenation of
     * the message header bytes and the payload bytes,
     * signed by the sender's pre-key.
     */
    signature: Signature | undefined;
}
export declare const ContentTypeId: {
    encode(message: ContentTypeId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContentTypeId;
    fromJSON(object: any): ContentTypeId;
    toJSON(message: ContentTypeId): unknown;
    fromPartial<I extends {
        authorityId?: string | undefined;
        typeId?: string | undefined;
        versionMajor?: number | undefined;
        versionMinor?: number | undefined;
    } & {
        authorityId?: string | undefined;
        typeId?: string | undefined;
        versionMajor?: number | undefined;
        versionMinor?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ContentTypeId>]: never; }>(object: I): ContentTypeId;
};
export declare const EncodedContent: {
    encode(message: EncodedContent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncodedContent;
    fromJSON(object: any): EncodedContent;
    toJSON(message: EncodedContent): unknown;
    fromPartial<I extends {
        type?: {
            authorityId?: string | undefined;
            typeId?: string | undefined;
            versionMajor?: number | undefined;
            versionMinor?: number | undefined;
        } | undefined;
        parameters?: {
            [x: string]: string | undefined;
        } | undefined;
        fallback?: string | undefined;
        compression?: Compression | undefined;
        content?: Uint8Array | undefined;
    } & {
        type?: ({
            authorityId?: string | undefined;
            typeId?: string | undefined;
            versionMajor?: number | undefined;
            versionMinor?: number | undefined;
        } & {
            authorityId?: string | undefined;
            typeId?: string | undefined;
            versionMajor?: number | undefined;
            versionMinor?: number | undefined;
        } & { [K in Exclude<keyof I["type"], keyof ContentTypeId>]: never; }) | undefined;
        parameters?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_1 in Exclude<keyof I["parameters"], string | number>]: never; }) | undefined;
        fallback?: string | undefined;
        compression?: Compression | undefined;
        content?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof EncodedContent>]: never; }>(object: I): EncodedContent;
};
export declare const EncodedContent_ParametersEntry: {
    encode(message: EncodedContent_ParametersEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncodedContent_ParametersEntry;
    fromJSON(object: any): EncodedContent_ParametersEntry;
    toJSON(message: EncodedContent_ParametersEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof EncodedContent_ParametersEntry>]: never; }>(object: I): EncodedContent_ParametersEntry;
};
export declare const SignedContent: {
    encode(message: SignedContent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedContent;
    fromJSON(object: any): SignedContent;
    toJSON(message: SignedContent): unknown;
    fromPartial<I extends {
        payload?: Uint8Array | undefined;
        sender?: {
            identityKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        signature?: {
            ecdsaCompact?: {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } | undefined;
            walletEcdsaCompact?: {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } | undefined;
        } | undefined;
    } & {
        payload?: Uint8Array | undefined;
        sender?: ({
            identityKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            identityKey?: ({
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } & {
                keyBytes?: Uint8Array | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K in Exclude<keyof I["sender"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_1 in Exclude<keyof I["sender"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_2 in Exclude<keyof I["sender"]["identityKey"]["signature"], keyof Signature>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["sender"]["identityKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
            preKey?: ({
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } & {
                keyBytes?: Uint8Array | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_4 in Exclude<keyof I["sender"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["sender"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["sender"]["preKey"]["signature"], keyof Signature>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["sender"]["preKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["sender"], keyof SignedPublicKeyBundle>]: never; }) | undefined;
        signature?: ({
            ecdsaCompact?: {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } | undefined;
            walletEcdsaCompact?: {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } | undefined;
        } & {
            ecdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_9 in Exclude<keyof I["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
            walletEcdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_10 in Exclude<keyof I["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["signature"], keyof Signature>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof SignedContent>]: never; }>(object: I): SignedContent;
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
