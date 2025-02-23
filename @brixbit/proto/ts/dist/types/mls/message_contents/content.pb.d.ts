import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.message_contents";
/**
 * Message content encoding structures
 * Copied from V2 code so that we can eventually retire all V2 message content
 */
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
/** A PlaintextEnvelope is the outermost payload that gets encrypted by MLS */
export interface PlaintextEnvelope {
    v1: PlaintextEnvelope_V1 | undefined;
    v2: PlaintextEnvelope_V2 | undefined;
}
/** Version 1 of the encrypted envelope */
export interface PlaintextEnvelope_V1 {
    /** Expected to be EncodedContent */
    content: Uint8Array;
    /**
     * A unique value that can be used to ensure that the same content can
     * produce different hashes. May be the sender timestamp.
     */
    idempotencyKey: string;
}
/** Version 2 of the encrypted envelope */
export interface PlaintextEnvelope_V2 {
    /**
     * A unique value that can be used to ensure that the same content can
     * produce different hashes. May be the sender timestamp.
     */
    idempotencyKey: string;
    /** Expected to be EncodedContent */
    content: Uint8Array | undefined;
    /** Initiator sends a request to receive message history */
    request: MessageHistoryRequest | undefined;
    /** Some other authorized installation sends a reply */
    reply: MessageHistoryReply | undefined;
}
/** Initiator or new installation id requesting a history will send a request */
export interface MessageHistoryRequest {
    /** Unique identifier for each request */
    requestId: string;
    /** Ensures a human is in the loop */
    pinCode: string;
}
/** Pre-existing installation id capable of supplying a history sends this reply */
export interface MessageHistoryReply {
    /** Must match an existing request_id from a message history request */
    requestId: string;
    /** Where the messages can be retrieved from */
    url: string;
    /** Generated input 'secret' for the AES Key used to encrypt the message-bundle */
    encryptionKey: MessageHistoryKeyType | undefined;
    /** Generated input 'secret' for the HMAC Key used to sign the bundle_hash */
    signingKey: MessageHistoryKeyType | undefined;
    /** HMAC Signature of the message-bundle */
    bundleHash: Uint8Array;
}
/** Key used to encrypt or sign the message-bundle */
export interface MessageHistoryKeyType {
    chacha20Poly1305: Uint8Array | undefined;
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
export declare const PlaintextEnvelope: {
    encode(message: PlaintextEnvelope, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PlaintextEnvelope;
    fromJSON(object: any): PlaintextEnvelope;
    toJSON(message: PlaintextEnvelope): unknown;
    fromPartial<I extends {
        v1?: {
            content?: Uint8Array | undefined;
            idempotencyKey?: string | undefined;
        } | undefined;
        v2?: {
            idempotencyKey?: string | undefined;
            content?: Uint8Array | undefined;
            request?: {
                requestId?: string | undefined;
                pinCode?: string | undefined;
            } | undefined;
            reply?: {
                requestId?: string | undefined;
                url?: string | undefined;
                encryptionKey?: {
                    chacha20Poly1305?: Uint8Array | undefined;
                } | undefined;
                signingKey?: {
                    chacha20Poly1305?: Uint8Array | undefined;
                } | undefined;
                bundleHash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
    } & {
        v1?: ({
            content?: Uint8Array | undefined;
            idempotencyKey?: string | undefined;
        } & {
            content?: Uint8Array | undefined;
            idempotencyKey?: string | undefined;
        } & { [K in Exclude<keyof I["v1"], keyof PlaintextEnvelope_V1>]: never; }) | undefined;
        v2?: ({
            idempotencyKey?: string | undefined;
            content?: Uint8Array | undefined;
            request?: {
                requestId?: string | undefined;
                pinCode?: string | undefined;
            } | undefined;
            reply?: {
                requestId?: string | undefined;
                url?: string | undefined;
                encryptionKey?: {
                    chacha20Poly1305?: Uint8Array | undefined;
                } | undefined;
                signingKey?: {
                    chacha20Poly1305?: Uint8Array | undefined;
                } | undefined;
                bundleHash?: Uint8Array | undefined;
            } | undefined;
        } & {
            idempotencyKey?: string | undefined;
            content?: Uint8Array | undefined;
            request?: ({
                requestId?: string | undefined;
                pinCode?: string | undefined;
            } & {
                requestId?: string | undefined;
                pinCode?: string | undefined;
            } & { [K_1 in Exclude<keyof I["v2"]["request"], keyof MessageHistoryRequest>]: never; }) | undefined;
            reply?: ({
                requestId?: string | undefined;
                url?: string | undefined;
                encryptionKey?: {
                    chacha20Poly1305?: Uint8Array | undefined;
                } | undefined;
                signingKey?: {
                    chacha20Poly1305?: Uint8Array | undefined;
                } | undefined;
                bundleHash?: Uint8Array | undefined;
            } & {
                requestId?: string | undefined;
                url?: string | undefined;
                encryptionKey?: ({
                    chacha20Poly1305?: Uint8Array | undefined;
                } & {
                    chacha20Poly1305?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["v2"]["reply"]["encryptionKey"], "chacha20Poly1305">]: never; }) | undefined;
                signingKey?: ({
                    chacha20Poly1305?: Uint8Array | undefined;
                } & {
                    chacha20Poly1305?: Uint8Array | undefined;
                } & { [K_3 in Exclude<keyof I["v2"]["reply"]["signingKey"], "chacha20Poly1305">]: never; }) | undefined;
                bundleHash?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["v2"]["reply"], keyof MessageHistoryReply>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["v2"], keyof PlaintextEnvelope_V2>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof PlaintextEnvelope>]: never; }>(object: I): PlaintextEnvelope;
};
export declare const PlaintextEnvelope_V1: {
    encode(message: PlaintextEnvelope_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PlaintextEnvelope_V1;
    fromJSON(object: any): PlaintextEnvelope_V1;
    toJSON(message: PlaintextEnvelope_V1): unknown;
    fromPartial<I extends {
        content?: Uint8Array | undefined;
        idempotencyKey?: string | undefined;
    } & {
        content?: Uint8Array | undefined;
        idempotencyKey?: string | undefined;
    } & { [K in Exclude<keyof I, keyof PlaintextEnvelope_V1>]: never; }>(object: I): PlaintextEnvelope_V1;
};
export declare const PlaintextEnvelope_V2: {
    encode(message: PlaintextEnvelope_V2, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PlaintextEnvelope_V2;
    fromJSON(object: any): PlaintextEnvelope_V2;
    toJSON(message: PlaintextEnvelope_V2): unknown;
    fromPartial<I extends {
        idempotencyKey?: string | undefined;
        content?: Uint8Array | undefined;
        request?: {
            requestId?: string | undefined;
            pinCode?: string | undefined;
        } | undefined;
        reply?: {
            requestId?: string | undefined;
            url?: string | undefined;
            encryptionKey?: {
                chacha20Poly1305?: Uint8Array | undefined;
            } | undefined;
            signingKey?: {
                chacha20Poly1305?: Uint8Array | undefined;
            } | undefined;
            bundleHash?: Uint8Array | undefined;
        } | undefined;
    } & {
        idempotencyKey?: string | undefined;
        content?: Uint8Array | undefined;
        request?: ({
            requestId?: string | undefined;
            pinCode?: string | undefined;
        } & {
            requestId?: string | undefined;
            pinCode?: string | undefined;
        } & { [K in Exclude<keyof I["request"], keyof MessageHistoryRequest>]: never; }) | undefined;
        reply?: ({
            requestId?: string | undefined;
            url?: string | undefined;
            encryptionKey?: {
                chacha20Poly1305?: Uint8Array | undefined;
            } | undefined;
            signingKey?: {
                chacha20Poly1305?: Uint8Array | undefined;
            } | undefined;
            bundleHash?: Uint8Array | undefined;
        } & {
            requestId?: string | undefined;
            url?: string | undefined;
            encryptionKey?: ({
                chacha20Poly1305?: Uint8Array | undefined;
            } & {
                chacha20Poly1305?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["reply"]["encryptionKey"], "chacha20Poly1305">]: never; }) | undefined;
            signingKey?: ({
                chacha20Poly1305?: Uint8Array | undefined;
            } & {
                chacha20Poly1305?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["reply"]["signingKey"], "chacha20Poly1305">]: never; }) | undefined;
            bundleHash?: Uint8Array | undefined;
        } & { [K_3 in Exclude<keyof I["reply"], keyof MessageHistoryReply>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof PlaintextEnvelope_V2>]: never; }>(object: I): PlaintextEnvelope_V2;
};
export declare const MessageHistoryRequest: {
    encode(message: MessageHistoryRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageHistoryRequest;
    fromJSON(object: any): MessageHistoryRequest;
    toJSON(message: MessageHistoryRequest): unknown;
    fromPartial<I extends {
        requestId?: string | undefined;
        pinCode?: string | undefined;
    } & {
        requestId?: string | undefined;
        pinCode?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MessageHistoryRequest>]: never; }>(object: I): MessageHistoryRequest;
};
export declare const MessageHistoryReply: {
    encode(message: MessageHistoryReply, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageHistoryReply;
    fromJSON(object: any): MessageHistoryReply;
    toJSON(message: MessageHistoryReply): unknown;
    fromPartial<I extends {
        requestId?: string | undefined;
        url?: string | undefined;
        encryptionKey?: {
            chacha20Poly1305?: Uint8Array | undefined;
        } | undefined;
        signingKey?: {
            chacha20Poly1305?: Uint8Array | undefined;
        } | undefined;
        bundleHash?: Uint8Array | undefined;
    } & {
        requestId?: string | undefined;
        url?: string | undefined;
        encryptionKey?: ({
            chacha20Poly1305?: Uint8Array | undefined;
        } & {
            chacha20Poly1305?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["encryptionKey"], "chacha20Poly1305">]: never; }) | undefined;
        signingKey?: ({
            chacha20Poly1305?: Uint8Array | undefined;
        } & {
            chacha20Poly1305?: Uint8Array | undefined;
        } & { [K_1 in Exclude<keyof I["signingKey"], "chacha20Poly1305">]: never; }) | undefined;
        bundleHash?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof MessageHistoryReply>]: never; }>(object: I): MessageHistoryReply;
};
export declare const MessageHistoryKeyType: {
    encode(message: MessageHistoryKeyType, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageHistoryKeyType;
    fromJSON(object: any): MessageHistoryKeyType;
    toJSON(message: MessageHistoryKeyType): unknown;
    fromPartial<I extends {
        chacha20Poly1305?: Uint8Array | undefined;
    } & {
        chacha20Poly1305?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "chacha20Poly1305">]: never; }>(object: I): MessageHistoryKeyType;
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
