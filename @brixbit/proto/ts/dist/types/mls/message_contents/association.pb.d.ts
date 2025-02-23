import Long from "long";
import { SignedPublicKey } from "../../message_contents/public_key.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.message_contents";
/** Associations and signatures */
/**
 * Allows for us to update the format of the association text without
 * incrementing the entire proto
 */
export declare enum AssociationTextVersion {
    ASSOCIATION_TEXT_VERSION_UNSPECIFIED = 0,
    ASSOCIATION_TEXT_VERSION_1 = 1,
    UNRECOGNIZED = -1
}
export declare function associationTextVersionFromJSON(object: any): AssociationTextVersion;
export declare function associationTextVersionToJSON(object: AssociationTextVersion): string;
/** Used for "Grant Messaging Access" associations */
export interface GrantMessagingAccessAssociation {
    associationTextVersion: AssociationTextVersion;
    /** EIP-191 signature */
    signature: RecoverableEcdsaSignature | undefined;
    accountAddress: string;
    createdNs: Long;
}
/** Used for "Revoke Messaging Access" associations */
export interface RevokeMessagingAccessAssociation {
    associationTextVersion: AssociationTextVersion;
    /** EIP-191 signature */
    signature: RecoverableEcdsaSignature | undefined;
    accountAddress: string;
    createdNs: Long;
}
/**
 * LegacyCreateIdentityAssociation is used when a v3 installation key
 * is signed by a v2 identity key, which in turn is signed via a
 * 'CreateIdentity' wallet signature
 */
export interface LegacyCreateIdentityAssociation {
    /** Signs SHA-256 hash of installation key */
    signature: RecoverableEcdsaSignature | undefined;
    /**
     * created_ns is encoded inside serialized key, account_address is recoverable
     * from the SignedPublicKey signature
     */
    signedLegacyCreateIdentityKey: SignedPublicKey | undefined;
}
/** RecoverableEcdsaSignature */
export interface RecoverableEcdsaSignature {
    /** 65-bytes [ R || S || V ], with recovery id as the last byte */
    bytes: Uint8Array;
}
/** EdDSA signature bytes matching RFC 8032 */
export interface EdDsaSignature {
    bytes: Uint8Array;
}
export declare const GrantMessagingAccessAssociation: {
    encode(message: GrantMessagingAccessAssociation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GrantMessagingAccessAssociation;
    fromJSON(object: any): GrantMessagingAccessAssociation;
    toJSON(message: GrantMessagingAccessAssociation): unknown;
    fromPartial<I extends {
        associationTextVersion?: AssociationTextVersion | undefined;
        signature?: {
            bytes?: Uint8Array | undefined;
        } | undefined;
        accountAddress?: string | undefined;
        createdNs?: string | number | Long | undefined;
    } & {
        associationTextVersion?: AssociationTextVersion | undefined;
        signature?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["signature"], "bytes">]: never; }) | undefined;
        accountAddress?: string | undefined;
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
        } & { [K_1 in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof GrantMessagingAccessAssociation>]: never; }>(object: I): GrantMessagingAccessAssociation;
};
export declare const RevokeMessagingAccessAssociation: {
    encode(message: RevokeMessagingAccessAssociation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RevokeMessagingAccessAssociation;
    fromJSON(object: any): RevokeMessagingAccessAssociation;
    toJSON(message: RevokeMessagingAccessAssociation): unknown;
    fromPartial<I extends {
        associationTextVersion?: AssociationTextVersion | undefined;
        signature?: {
            bytes?: Uint8Array | undefined;
        } | undefined;
        accountAddress?: string | undefined;
        createdNs?: string | number | Long | undefined;
    } & {
        associationTextVersion?: AssociationTextVersion | undefined;
        signature?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["signature"], "bytes">]: never; }) | undefined;
        accountAddress?: string | undefined;
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
        } & { [K_1 in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof RevokeMessagingAccessAssociation>]: never; }>(object: I): RevokeMessagingAccessAssociation;
};
export declare const LegacyCreateIdentityAssociation: {
    encode(message: LegacyCreateIdentityAssociation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LegacyCreateIdentityAssociation;
    fromJSON(object: any): LegacyCreateIdentityAssociation;
    toJSON(message: LegacyCreateIdentityAssociation): unknown;
    fromPartial<I extends {
        signature?: {
            bytes?: Uint8Array | undefined;
        } | undefined;
        signedLegacyCreateIdentityKey?: {
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
        signature?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["signature"], "bytes">]: never; }) | undefined;
        signedLegacyCreateIdentityKey?: ({
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
                } & { [K_1 in Exclude<keyof I["signedLegacyCreateIdentityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_2 in Exclude<keyof I["signedLegacyCreateIdentityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["signedLegacyCreateIdentityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["signedLegacyCreateIdentityKey"], keyof SignedPublicKey>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof LegacyCreateIdentityAssociation>]: never; }>(object: I): LegacyCreateIdentityAssociation;
};
export declare const RecoverableEcdsaSignature: {
    encode(message: RecoverableEcdsaSignature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RecoverableEcdsaSignature;
    fromJSON(object: any): RecoverableEcdsaSignature;
    toJSON(message: RecoverableEcdsaSignature): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
    } & {
        bytes?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "bytes">]: never; }>(object: I): RecoverableEcdsaSignature;
};
export declare const EdDsaSignature: {
    encode(message: EdDsaSignature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EdDsaSignature;
    fromJSON(object: any): EdDsaSignature;
    toJSON(message: EdDsaSignature): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
    } & {
        bytes?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "bytes">]: never; }>(object: I): EdDsaSignature;
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
