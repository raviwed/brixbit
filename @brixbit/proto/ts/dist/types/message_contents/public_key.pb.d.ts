import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/**
 * Structure for representing public keys of different types,
 * including signatures used to authenticate the keys.
 */
/**
 * UnsignedPublicKey represents a generalized public key,
 * defined as a union to support cryptographic algorithm agility.
 */
export interface UnsignedPublicKey {
    createdNs: Long;
    secp256k1Uncompressed: UnsignedPublicKey_Secp256k1Uncompressed | undefined;
}
/** EC: SECP256k1 */
export interface UnsignedPublicKey_Secp256k1Uncompressed {
    /** uncompressed point with prefix (0x04) [ P || X || Y ], 65 bytes */
    bytes: Uint8Array;
}
/** SignedPublicKey */
export interface SignedPublicKey {
    /** embeds an UnsignedPublicKey */
    keyBytes: Uint8Array;
    /** signs key_bytes */
    signature: Signature | undefined;
}
/** PublicKeyBundle packages the cryptographic keys associated with a wallet. */
export interface SignedPublicKeyBundle {
    /** Identity key MUST be signed by the wallet. */
    identityKey: SignedPublicKey | undefined;
    /** Pre-key MUST be signed by the identity key. */
    preKey: SignedPublicKey | undefined;
}
/**
 * PublicKey represents a generalized public key,
 * defined as a union to support cryptographic algorithm agility.
 */
export interface PublicKey {
    timestamp: Long;
    signature?: Signature | undefined;
    secp256k1Uncompressed: PublicKey_Secp256k1Uncompressed | undefined;
}
/** The key bytes */
export interface PublicKey_Secp256k1Uncompressed {
    /** uncompressed point with prefix (0x04) [ P || X || Y ], 65 bytes */
    bytes: Uint8Array;
}
/**
 * PublicKeyBundle packages the cryptographic keys associated with a wallet,
 * both senders and recipients are identified by their key bundles.
 */
export interface PublicKeyBundle {
    /** Identity key MUST be signed by the wallet. */
    identityKey: PublicKey | undefined;
    /** Pre-key MUST be signed by the identity key. */
    preKey: PublicKey | undefined;
}
export declare const UnsignedPublicKey: {
    encode(message: UnsignedPublicKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UnsignedPublicKey;
    fromJSON(object: any): UnsignedPublicKey;
    toJSON(message: UnsignedPublicKey): unknown;
    fromPartial<I extends {
        createdNs?: string | number | Long | undefined;
        secp256k1Uncompressed?: {
            bytes?: Uint8Array | undefined;
        } | undefined;
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
        secp256k1Uncompressed?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K_1 in Exclude<keyof I["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof UnsignedPublicKey>]: never; }>(object: I): UnsignedPublicKey;
};
export declare const UnsignedPublicKey_Secp256k1Uncompressed: {
    encode(message: UnsignedPublicKey_Secp256k1Uncompressed, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UnsignedPublicKey_Secp256k1Uncompressed;
    fromJSON(object: any): UnsignedPublicKey_Secp256k1Uncompressed;
    toJSON(message: UnsignedPublicKey_Secp256k1Uncompressed): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
    } & {
        bytes?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "bytes">]: never; }>(object: I): UnsignedPublicKey_Secp256k1Uncompressed;
};
export declare const SignedPublicKey: {
    encode(message: SignedPublicKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedPublicKey;
    fromJSON(object: any): SignedPublicKey;
    toJSON(message: SignedPublicKey): unknown;
    fromPartial<I extends {
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
            } & { [K in Exclude<keyof I["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
            walletEcdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_1 in Exclude<keyof I["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["signature"], keyof Signature>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof SignedPublicKey>]: never; }>(object: I): SignedPublicKey;
};
export declare const SignedPublicKeyBundle: {
    encode(message: SignedPublicKeyBundle, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedPublicKeyBundle;
    fromJSON(object: any): SignedPublicKeyBundle;
    toJSON(message: SignedPublicKeyBundle): unknown;
    fromPartial<I extends {
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
                } & { [K in Exclude<keyof I["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_1 in Exclude<keyof I["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["identityKey"]["signature"], keyof Signature>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["identityKey"], keyof SignedPublicKey>]: never; }) | undefined;
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
                } & { [K_4 in Exclude<keyof I["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_5 in Exclude<keyof I["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["preKey"]["signature"], keyof Signature>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["preKey"], keyof SignedPublicKey>]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, keyof SignedPublicKeyBundle>]: never; }>(object: I): SignedPublicKeyBundle;
};
export declare const PublicKey: {
    encode(message: PublicKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PublicKey;
    fromJSON(object: any): PublicKey;
    toJSON(message: PublicKey): unknown;
    fromPartial<I extends {
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
        } & { [K in Exclude<keyof I["timestamp"], keyof Long>]: never; }) | undefined;
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
            } & { [K_1 in Exclude<keyof I["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
            walletEcdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_2 in Exclude<keyof I["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["signature"], keyof Signature>]: never; }) | undefined;
        secp256k1Uncompressed?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K_4 in Exclude<keyof I["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof PublicKey>]: never; }>(object: I): PublicKey;
};
export declare const PublicKey_Secp256k1Uncompressed: {
    encode(message: PublicKey_Secp256k1Uncompressed, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PublicKey_Secp256k1Uncompressed;
    fromJSON(object: any): PublicKey_Secp256k1Uncompressed;
    toJSON(message: PublicKey_Secp256k1Uncompressed): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
    } & {
        bytes?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "bytes">]: never; }>(object: I): PublicKey_Secp256k1Uncompressed;
};
export declare const PublicKeyBundle: {
    encode(message: PublicKeyBundle, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PublicKeyBundle;
    fromJSON(object: any): PublicKeyBundle;
    toJSON(message: PublicKeyBundle): unknown;
    fromPartial<I extends {
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
            } & { [K in Exclude<keyof I["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                } & { [K_1 in Exclude<keyof I["identityKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_2 in Exclude<keyof I["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["identityKey"]["signature"], keyof Signature>]: never; }) | undefined;
            secp256k1Uncompressed?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["identityKey"], keyof PublicKey>]: never; }) | undefined;
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
            } & { [K_6 in Exclude<keyof I["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
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
                } & { [K_7 in Exclude<keyof I["preKey"]["signature"]["ecdsaCompact"], keyof import("./signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_8 in Exclude<keyof I["preKey"]["signature"]["walletEcdsaCompact"], keyof import("./signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_9 in Exclude<keyof I["preKey"]["signature"], keyof Signature>]: never; }) | undefined;
            secp256k1Uncompressed?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_10 in Exclude<keyof I["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["preKey"], keyof PublicKey>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof PublicKeyBundle>]: never; }>(object: I): PublicKeyBundle;
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
