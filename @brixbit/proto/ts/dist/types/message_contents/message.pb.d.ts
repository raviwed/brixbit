import Long from "long";
import { PublicKeyBundle } from "./public_key.pb";
import { Ciphertext } from "./ciphertext.pb";
import { ConversationReference } from "./conversation_reference.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Messages used for transport and storage of user conversations. */
/**
 * Message header is encoded separately as the bytes are also used
 * as associated data for authenticated encryption
 */
export interface MessageHeaderV1 {
    sender: PublicKeyBundle | undefined;
    recipient: PublicKeyBundle | undefined;
    timestamp: Long;
}
/** Message is the top level protocol element */
export interface MessageV1 {
    /** encapsulates encoded MessageHeaderV1 */
    headerBytes: Uint8Array;
    /** Ciphertext.payload MUST contain encrypted EncodedContent */
    ciphertext: Ciphertext | undefined;
}
/**
 * Message header carries information that is not encrypted, and is therefore
 * observable by the network. It is however authenticated as associated data
 * of the AEAD encryption used to protect the message,
 * thus providing tamper evidence.
 */
export interface MessageHeaderV2 {
    /** sender specified message creation time */
    createdNs: Long;
    /** the topic the message belongs to */
    topic: string;
}
/** Message combines the encoded header with the encrypted payload. */
export interface MessageV2 {
    /** encapsulates encoded MessageHeaderV2 */
    headerBytes: Uint8Array;
    /** Ciphertext.payload MUST contain encrypted SignedContent */
    ciphertext: Ciphertext | undefined;
    /**
     * HMAC of the message ciphertext, with the HMAC key derived from the topic
     * key
     */
    senderHmac?: Uint8Array | undefined;
    /**
     * Flag indicating whether the message should be pushed from a notification
     * server
     */
    shouldPush?: boolean | undefined;
}
/** Versioned Message */
export interface Message {
    v1: MessageV1 | undefined;
    v2: MessageV2 | undefined;
}
/**
 * DecodedMessage represents the decrypted message contents.
 * DecodedMessage instances are not stored on the network, but
 * may be serialized and stored by clients
 */
export interface DecodedMessage {
    id: string;
    messageVersion: string;
    senderAddress: string;
    recipientAddress?: string | undefined;
    sentNs: Long;
    contentTopic: string;
    conversation: ConversationReference | undefined;
    /** encapsulates EncodedContent */
    contentBytes: Uint8Array;
}
export declare const MessageHeaderV1: {
    encode(message: MessageHeaderV1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageHeaderV1;
    fromJSON(object: any): MessageHeaderV1;
    toJSON(message: MessageHeaderV1): unknown;
    fromPartial<I extends {
        sender?: {
            identityKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        recipient?: {
            identityKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        timestamp?: string | number | Long | undefined;
    } & {
        sender?: ({
            identityKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            identityKey?: ({
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
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
                } & { [K in Exclude<keyof I["sender"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_1 in Exclude<keyof I["sender"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_2 in Exclude<keyof I["sender"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["sender"]["identityKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_4 in Exclude<keyof I["sender"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["sender"]["identityKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
            preKey?: ({
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
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
                } & { [K_6 in Exclude<keyof I["sender"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_7 in Exclude<keyof I["sender"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_8 in Exclude<keyof I["sender"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["sender"]["preKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_10 in Exclude<keyof I["sender"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_11 in Exclude<keyof I["sender"]["preKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I["sender"], keyof PublicKeyBundle>]: never; }) | undefined;
        recipient?: ({
            identityKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            identityKey?: ({
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
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
                } & { [K_13 in Exclude<keyof I["recipient"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_14 in Exclude<keyof I["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_15 in Exclude<keyof I["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_16 in Exclude<keyof I["recipient"]["identityKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_17 in Exclude<keyof I["recipient"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_18 in Exclude<keyof I["recipient"]["identityKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
            preKey?: ({
                timestamp?: string | number | Long | undefined;
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
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
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
                } & { [K_19 in Exclude<keyof I["recipient"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_20 in Exclude<keyof I["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_21 in Exclude<keyof I["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_22 in Exclude<keyof I["recipient"]["preKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_23 in Exclude<keyof I["recipient"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_24 in Exclude<keyof I["recipient"]["preKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
        } & { [K_25 in Exclude<keyof I["recipient"], keyof PublicKeyBundle>]: never; }) | undefined;
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
        } & { [K_26 in Exclude<keyof I["timestamp"], keyof Long>]: never; }) | undefined;
    } & { [K_27 in Exclude<keyof I, keyof MessageHeaderV1>]: never; }>(object: I): MessageHeaderV1;
};
export declare const MessageV1: {
    encode(message: MessageV1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageV1;
    fromJSON(object: any): MessageV1;
    toJSON(message: MessageV1): unknown;
    fromPartial<I extends {
        headerBytes?: Uint8Array | undefined;
        ciphertext?: {
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
    } & {
        headerBytes?: Uint8Array | undefined;
        ciphertext?: ({
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
            } & { [K in Exclude<keyof I["ciphertext"]["aes256GcmHkdfSha256"], keyof import("./ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["ciphertext"], "aes256GcmHkdfSha256">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof MessageV1>]: never; }>(object: I): MessageV1;
};
export declare const MessageHeaderV2: {
    encode(message: MessageHeaderV2, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageHeaderV2;
    fromJSON(object: any): MessageHeaderV2;
    toJSON(message: MessageHeaderV2): unknown;
    fromPartial<I extends {
        createdNs?: string | number | Long | undefined;
        topic?: string | undefined;
    } & {
        createdNs?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
        topic?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof MessageHeaderV2>]: never; }>(object: I): MessageHeaderV2;
};
export declare const MessageV2: {
    encode(message: MessageV2, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MessageV2;
    fromJSON(object: any): MessageV2;
    toJSON(message: MessageV2): unknown;
    fromPartial<I extends {
        headerBytes?: Uint8Array | undefined;
        ciphertext?: {
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        senderHmac?: Uint8Array | undefined;
        shouldPush?: boolean | undefined;
    } & {
        headerBytes?: Uint8Array | undefined;
        ciphertext?: ({
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
            } & { [K in Exclude<keyof I["ciphertext"]["aes256GcmHkdfSha256"], keyof import("./ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["ciphertext"], "aes256GcmHkdfSha256">]: never; }) | undefined;
        senderHmac?: Uint8Array | undefined;
        shouldPush?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof MessageV2>]: never; }>(object: I): MessageV2;
};
export declare const Message: {
    encode(message: Message, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Message;
    fromJSON(object: any): Message;
    toJSON(message: Message): unknown;
    fromPartial<I extends {
        v1?: {
            headerBytes?: Uint8Array | undefined;
            ciphertext?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        v2?: {
            headerBytes?: Uint8Array | undefined;
            ciphertext?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            senderHmac?: Uint8Array | undefined;
            shouldPush?: boolean | undefined;
        } | undefined;
    } & {
        v1?: ({
            headerBytes?: Uint8Array | undefined;
            ciphertext?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            headerBytes?: Uint8Array | undefined;
            ciphertext?: ({
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
                } & { [K in Exclude<keyof I["v1"]["ciphertext"]["aes256GcmHkdfSha256"], keyof import("./ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["v1"]["ciphertext"], "aes256GcmHkdfSha256">]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["v1"], keyof MessageV1>]: never; }) | undefined;
        v2?: ({
            headerBytes?: Uint8Array | undefined;
            ciphertext?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            senderHmac?: Uint8Array | undefined;
            shouldPush?: boolean | undefined;
        } & {
            headerBytes?: Uint8Array | undefined;
            ciphertext?: ({
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
                } & { [K_3 in Exclude<keyof I["v2"]["ciphertext"]["aes256GcmHkdfSha256"], keyof import("./ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["v2"]["ciphertext"], "aes256GcmHkdfSha256">]: never; }) | undefined;
            senderHmac?: Uint8Array | undefined;
            shouldPush?: boolean | undefined;
        } & { [K_5 in Exclude<keyof I["v2"], keyof MessageV2>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof Message>]: never; }>(object: I): Message;
};
export declare const DecodedMessage: {
    encode(message: DecodedMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecodedMessage;
    fromJSON(object: any): DecodedMessage;
    toJSON(message: DecodedMessage): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        messageVersion?: string | undefined;
        senderAddress?: string | undefined;
        recipientAddress?: string | undefined;
        sentNs?: string | number | Long | undefined;
        contentTopic?: string | undefined;
        conversation?: {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("./invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } | undefined;
        contentBytes?: Uint8Array | undefined;
    } & {
        id?: string | undefined;
        messageVersion?: string | undefined;
        senderAddress?: string | undefined;
        recipientAddress?: string | undefined;
        sentNs?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["sentNs"], keyof Long>]: never; }) | undefined;
        contentTopic?: string | undefined;
        conversation?: ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("./invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } & {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | (Long & {
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
            } & { [K_1 in Exclude<keyof I["conversation"]["createdNs"], keyof Long>]: never; }) | undefined;
            context?: ({
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } & {
                conversationId?: string | undefined;
                metadata?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_2 in Exclude<keyof I["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["conversation"]["context"], keyof import("./invitation.pb").InvitationV1_Context>]: never; }) | undefined;
            consentProofPayload?: ({
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("./invitation.pb").ConsentProofPayloadVersion | undefined;
            } & {
                signature?: string | undefined;
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
                } & { [K_4 in Exclude<keyof I["conversation"]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                payloadVersion?: import("./invitation.pb").ConsentProofPayloadVersion | undefined;
            } & { [K_5 in Exclude<keyof I["conversation"]["consentProofPayload"], keyof import("./invitation.pb").ConsentProofPayload>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["conversation"], keyof ConversationReference>]: never; }) | undefined;
        contentBytes?: Uint8Array | undefined;
    } & { [K_7 in Exclude<keyof I, keyof DecodedMessage>]: never; }>(object: I): DecodedMessage;
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
