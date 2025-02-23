import Long from "long";
import { Signature } from "./signature.pb";
import { SignedPublicKeyBundle } from "./public_key.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Signature is a generic structure for public key signatures. */
/**
 * The message that will be signed by the Client and returned inside the
 * `action_body` field of the FrameAction message
 */
export interface FrameActionBody {
    /**
     * The URL of the frame that was clicked
     * May be different from `post_url`
     */
    frameUrl: string;
    /** The 1-indexed button that was clicked */
    buttonIndex: number;
    /**
     * Timestamp of the click in milliseconds since the epoch
     *
     * @deprecated
     */
    timestamp: Long;
    /**
     * A unique identifier for the conversation, not tied to anything on the
     * network. Will not match the topic or conversation_id
     */
    opaqueConversationIdentifier: string;
    /** Unix timestamp */
    unixTimestamp: number;
    /** Input text from a text input field */
    inputText: string;
    /** A state serialized to a string (for example via JSON.stringify()). Maximum 4096 bytes. */
    state: string;
    /** A 0x wallet address */
    address: string;
    /** A hash from a transaction */
    transactionId: string;
}
/**
 * The outer payload that will be sent as the `messageBytes` in the
 * `trusted_data` part of the Frames message
 */
export interface FrameAction {
    signature: Signature | undefined;
    /**
     * The SignedPublicKeyBundle of the signer, used to link the BRIXBIT signature
     * with a blockchain account through a chain of signatures.
     */
    signedPublicKeyBundle: SignedPublicKeyBundle | undefined;
    /**
     * Serialized FrameActionBody message, so that the signature verification can
     * happen on a byte-perfect representation of the message
     */
    actionBody: Uint8Array;
}
export declare const FrameActionBody: {
    encode(message: FrameActionBody, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FrameActionBody;
    fromJSON(object: any): FrameActionBody;
    toJSON(message: FrameActionBody): unknown;
    fromPartial<I extends {
        frameUrl?: string | undefined;
        buttonIndex?: number | undefined;
        timestamp?: string | number | Long | undefined;
        opaqueConversationIdentifier?: string | undefined;
        unixTimestamp?: number | undefined;
        inputText?: string | undefined;
        state?: string | undefined;
        address?: string | undefined;
        transactionId?: string | undefined;
    } & {
        frameUrl?: string | undefined;
        buttonIndex?: number | undefined;
        timestamp?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K in Exclude<keyof I["timestamp"], keyof Long>]: never; }) | undefined;
        opaqueConversationIdentifier?: string | undefined;
        unixTimestamp?: number | undefined;
        inputText?: string | undefined;
        state?: string | undefined;
        address?: string | undefined;
        transactionId?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof FrameActionBody>]: never; }>(object: I): FrameActionBody;
};
export declare const FrameAction: {
    encode(message: FrameAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FrameAction;
    fromJSON(object: any): FrameAction;
    toJSON(message: FrameAction): unknown;
    fromPartial<I extends {
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
        signedPublicKeyBundle?: {
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
        actionBody?: Uint8Array | undefined;
    } & {
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
            } & { [K in Exclude<keyof I["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
            walletEcdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_1 in Exclude<keyof I["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["signature"], keyof Signature>]: never; }) | undefined;
        signedPublicKeyBundle?: ({
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
                    } & { [K_3 in Exclude<keyof I["signedPublicKeyBundle"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_4 in Exclude<keyof I["signedPublicKeyBundle"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["signedPublicKeyBundle"]["identityKey"]["signature"], keyof Signature>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["signedPublicKeyBundle"]["identityKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
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
                    } & { [K_7 in Exclude<keyof I["signedPublicKeyBundle"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_8 in Exclude<keyof I["signedPublicKeyBundle"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["signedPublicKeyBundle"]["preKey"]["signature"], keyof Signature>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["signedPublicKeyBundle"]["preKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["signedPublicKeyBundle"], keyof SignedPublicKeyBundle>]: never; }) | undefined;
        actionBody?: Uint8Array | undefined;
    } & { [K_12 in Exclude<keyof I, keyof FrameAction>]: never; }>(object: I): FrameAction;
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
