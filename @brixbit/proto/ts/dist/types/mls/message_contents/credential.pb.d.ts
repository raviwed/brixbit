import Long from "long";
import { GrantMessagingAccessAssociation, LegacyCreateIdentityAssociation, RevokeMessagingAccessAssociation } from "./association.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.message_contents";
/** Credentials and revocations */
/** A credential that can be used in MLS leaf nodes */
export interface MlsCredential {
    installationPublicKey: Uint8Array;
    messagingAccess: GrantMessagingAccessAssociation | undefined;
    legacyCreateIdentity: LegacyCreateIdentityAssociation | undefined;
}
/** A declaration and proof that a credential is no longer valid */
export interface CredentialRevocation {
    /** The 'installation_public_key' field of the MlsCredential proto */
    installationKey: Uint8Array | undefined;
    /** The 'key_bytes' field of the legacy SignedPublicKey proto */
    unsignedLegacyCreateIdentityKey: Uint8Array | undefined;
    messagingAccess: RevokeMessagingAccessAssociation | undefined;
}
export declare const MlsCredential: {
    encode(message: MlsCredential, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MlsCredential;
    fromJSON(object: any): MlsCredential;
    toJSON(message: MlsCredential): unknown;
    fromPartial<I extends {
        installationPublicKey?: Uint8Array | undefined;
        messagingAccess?: {
            associationTextVersion?: import("./association.pb").AssociationTextVersion | undefined;
            signature?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            accountAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
        } | undefined;
        legacyCreateIdentity?: {
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
        } | undefined;
    } & {
        installationPublicKey?: Uint8Array | undefined;
        messagingAccess?: ({
            associationTextVersion?: import("./association.pb").AssociationTextVersion | undefined;
            signature?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            accountAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
        } & {
            associationTextVersion?: import("./association.pb").AssociationTextVersion | undefined;
            signature?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["messagingAccess"]["signature"], "bytes">]: never; }) | undefined;
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
            } & { [K_1 in Exclude<keyof I["messagingAccess"]["createdNs"], keyof Long>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["messagingAccess"], keyof GrantMessagingAccessAssociation>]: never; }) | undefined;
        legacyCreateIdentity?: ({
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
            } & { [K_3 in Exclude<keyof I["legacyCreateIdentity"]["signature"], "bytes">]: never; }) | undefined;
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
                    } & { [K_4 in Exclude<keyof I["legacyCreateIdentity"]["signedLegacyCreateIdentityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["legacyCreateIdentity"]["signedLegacyCreateIdentityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["legacyCreateIdentity"]["signedLegacyCreateIdentityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["legacyCreateIdentity"]["signedLegacyCreateIdentityKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["legacyCreateIdentity"], keyof LegacyCreateIdentityAssociation>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof MlsCredential>]: never; }>(object: I): MlsCredential;
};
export declare const CredentialRevocation: {
    encode(message: CredentialRevocation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CredentialRevocation;
    fromJSON(object: any): CredentialRevocation;
    toJSON(message: CredentialRevocation): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        unsignedLegacyCreateIdentityKey?: Uint8Array | undefined;
        messagingAccess?: {
            associationTextVersion?: import("./association.pb").AssociationTextVersion | undefined;
            signature?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            accountAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
        } | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
        unsignedLegacyCreateIdentityKey?: Uint8Array | undefined;
        messagingAccess?: ({
            associationTextVersion?: import("./association.pb").AssociationTextVersion | undefined;
            signature?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            accountAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
        } & {
            associationTextVersion?: import("./association.pb").AssociationTextVersion | undefined;
            signature?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["messagingAccess"]["signature"], "bytes">]: never; }) | undefined;
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
            } & { [K_1 in Exclude<keyof I["messagingAccess"]["createdNs"], keyof Long>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["messagingAccess"], keyof RevokeMessagingAccessAssociation>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof CredentialRevocation>]: never; }>(object: I): CredentialRevocation;
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
