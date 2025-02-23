import Long from "long";
import { PublicKeyBundle, SignedPublicKeyBundle } from "./public_key.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/**
 * Contact Bundles are used to advertise user's public keys on the network.
 * They are published in well known topics so that other participants
 * can find them when they wish to communicate with the user.
 * The public keys are used to sign messages and to derive encryption keys
 * for some meta-messages, e.g. invitations.
 */
/**
 * LEGACY: User key bundle V1 using PublicKeys.
 * The PublicKeys MUST be signed.
 */
export interface ContactBundleV1 {
    keyBundle: PublicKeyBundle | undefined;
}
/** User key bundle V2 using SignedPublicKeys. */
export interface ContactBundleV2 {
    keyBundle: SignedPublicKeyBundle | undefined;
}
/** Versioned ContactBundle */
export interface ContactBundle {
    v1: ContactBundleV1 | undefined;
    v2: ContactBundleV2 | undefined;
}
export declare const ContactBundleV1: {
    encode(message: ContactBundleV1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContactBundleV1;
    fromJSON(object: any): ContactBundleV1;
    toJSON(message: ContactBundleV1): unknown;
    fromPartial<I extends {
        keyBundle?: {
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
    } & {
        keyBundle?: ({
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
                } & { [K in Exclude<keyof I["keyBundle"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_1 in Exclude<keyof I["keyBundle"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_2 in Exclude<keyof I["keyBundle"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["keyBundle"]["identityKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_4 in Exclude<keyof I["keyBundle"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["keyBundle"]["identityKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
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
                } & { [K_6 in Exclude<keyof I["keyBundle"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_7 in Exclude<keyof I["keyBundle"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_8 in Exclude<keyof I["keyBundle"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["keyBundle"]["preKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_10 in Exclude<keyof I["keyBundle"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_11 in Exclude<keyof I["keyBundle"]["preKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I["keyBundle"], keyof PublicKeyBundle>]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I, "keyBundle">]: never; }>(object: I): ContactBundleV1;
};
export declare const ContactBundleV2: {
    encode(message: ContactBundleV2, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContactBundleV2;
    fromJSON(object: any): ContactBundleV2;
    toJSON(message: ContactBundleV2): unknown;
    fromPartial<I extends {
        keyBundle?: {
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
    } & {
        keyBundle?: ({
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
                    } & { [K in Exclude<keyof I["keyBundle"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_1 in Exclude<keyof I["keyBundle"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_2 in Exclude<keyof I["keyBundle"]["identityKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["keyBundle"]["identityKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
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
                    } & { [K_4 in Exclude<keyof I["keyBundle"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["keyBundle"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["keyBundle"]["preKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["keyBundle"]["preKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["keyBundle"], keyof SignedPublicKeyBundle>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, "keyBundle">]: never; }>(object: I): ContactBundleV2;
};
export declare const ContactBundle: {
    encode(message: ContactBundle, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContactBundle;
    fromJSON(object: any): ContactBundle;
    toJSON(message: ContactBundle): unknown;
    fromPartial<I extends {
        v1?: {
            keyBundle?: {
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
        } | undefined;
        v2?: {
            keyBundle?: {
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
        } | undefined;
    } & {
        v1?: ({
            keyBundle?: {
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
        } & {
            keyBundle?: ({
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
                    } & { [K in Exclude<keyof I["v1"]["keyBundle"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                        } & { [K_1 in Exclude<keyof I["v1"]["keyBundle"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_2 in Exclude<keyof I["v1"]["keyBundle"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_3 in Exclude<keyof I["v1"]["keyBundle"]["identityKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_4 in Exclude<keyof I["v1"]["keyBundle"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["v1"]["keyBundle"]["identityKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
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
                    } & { [K_6 in Exclude<keyof I["v1"]["keyBundle"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                        } & { [K_7 in Exclude<keyof I["v1"]["keyBundle"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_8 in Exclude<keyof I["v1"]["keyBundle"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_9 in Exclude<keyof I["v1"]["keyBundle"]["preKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_10 in Exclude<keyof I["v1"]["keyBundle"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_11 in Exclude<keyof I["v1"]["keyBundle"]["preKey"], keyof import("./public_key.pb").PublicKey>]: never; }) | undefined;
            } & { [K_12 in Exclude<keyof I["v1"]["keyBundle"], keyof PublicKeyBundle>]: never; }) | undefined;
        } & { [K_13 in Exclude<keyof I["v1"], "keyBundle">]: never; }) | undefined;
        v2?: ({
            keyBundle?: {
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
        } & {
            keyBundle?: ({
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
                        } & { [K_14 in Exclude<keyof I["v2"]["keyBundle"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_15 in Exclude<keyof I["v2"]["keyBundle"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_16 in Exclude<keyof I["v2"]["keyBundle"]["identityKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                } & { [K_17 in Exclude<keyof I["v2"]["keyBundle"]["identityKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
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
                        } & { [K_18 in Exclude<keyof I["v2"]["keyBundle"]["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_19 in Exclude<keyof I["v2"]["keyBundle"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_20 in Exclude<keyof I["v2"]["keyBundle"]["preKey"]["signature"], keyof import("./signature.pb").Signature>]: never; }) | undefined;
                } & { [K_21 in Exclude<keyof I["v2"]["keyBundle"]["preKey"], keyof import("./public_key.pb").SignedPublicKey>]: never; }) | undefined;
            } & { [K_22 in Exclude<keyof I["v2"]["keyBundle"], keyof SignedPublicKeyBundle>]: never; }) | undefined;
        } & { [K_23 in Exclude<keyof I["v2"], "keyBundle">]: never; }) | undefined;
    } & { [K_24 in Exclude<keyof I, keyof ContactBundle>]: never; }>(object: I): ContactBundle;
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
