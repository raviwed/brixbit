import Long from "long";
import { PublicKey } from "../../message_contents/public_key.pb";
import { Signature } from "../../message_contents/signature.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_api.v1";
/** Client authentication protocol */
/**
 * Token is used by clients to prove to the nodes
 * that they are serving a specific wallet.
 */
export interface Token {
    /** identity key signed by a wallet */
    identityKey: PublicKey | undefined;
    /** encoded bytes of AuthData */
    authDataBytes: Uint8Array;
    /** identity key signature of AuthData bytes */
    authDataSignature: Signature | undefined;
}
/**
 * AuthData carries token parameters that are authenticated
 * by the identity key signature.
 * It is embedded in the Token structure as bytes
 * so that the bytes don't need to be reconstructed
 * to verify the token signature.
 */
export interface AuthData {
    /** address of the wallet */
    walletAddr: string;
    /** time when the token was generated/signed */
    createdNs: Long;
}
export declare const Token: {
    encode(message: Token, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Token;
    fromJSON(object: any): Token;
    toJSON(message: Token): unknown;
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
        authDataBytes?: Uint8Array | undefined;
        authDataSignature?: {
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
                } & { [K_1 in Exclude<keyof I["identityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_2 in Exclude<keyof I["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["identityKey"]["signature"], keyof Signature>]: never; }) | undefined;
            secp256k1Uncompressed?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["identityKey"], keyof PublicKey>]: never; }) | undefined;
        authDataBytes?: Uint8Array | undefined;
        authDataSignature?: ({
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
            } & { [K_6 in Exclude<keyof I["authDataSignature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
            walletEcdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_7 in Exclude<keyof I["authDataSignature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["authDataSignature"], keyof Signature>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof Token>]: never; }>(object: I): Token;
};
export declare const AuthData: {
    encode(message: AuthData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthData;
    fromJSON(object: any): AuthData;
    toJSON(message: AuthData): unknown;
    fromPartial<I extends {
        walletAddr?: string | undefined;
        createdNs?: string | number | Long | undefined;
    } & {
        walletAddr?: string | undefined;
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
    } & { [K_1 in Exclude<keyof I, keyof AuthData>]: never; }>(object: I): AuthData;
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
