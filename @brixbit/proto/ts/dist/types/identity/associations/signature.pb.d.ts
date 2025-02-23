import Long from "long";
import { SignedPublicKey } from "../../message_contents/public_key.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.identity.associations";
/** Signing methods for identity associations */
/** RecoverableEcdsaSignature for EIP-191 and V2 signatures */
export interface RecoverableEcdsaSignature {
    /** 65-bytes [ R || S || V ], with recovery id as the last byte */
    bytes: Uint8Array;
}
/** EdDSA signature for 25519 */
export interface RecoverableEd25519Signature {
    /** 64 bytes [R(32 bytes) || S(32 bytes)] */
    bytes: Uint8Array;
    /** 32 bytes */
    publicKey: Uint8Array;
}
/** Smart Contract Wallet signature */
export interface SmartContractWalletSignature {
    /**
     * CAIP-10 string
     * https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md
     */
    accountId: string;
    /** Specify the block number to verify the signature against */
    blockNumber: Long;
    /** The actual signature bytes */
    signature: Uint8Array;
    /** The RPC URL specifies a chain to verify the signature against */
    chainRpcUrl: string;
}
/**
 * An existing address on brixbitv2 may have already signed a legacy identity key
 * of type SignedPublicKey via the 'Create Identity' signature.
 * For migration to brixbitv3, the legacy key is permitted to sign on behalf of the
 * address to create a matching brixbitv3 installation key.
 * This signature type can ONLY be used for CreateXid and AddAssociation
 * payloads, and can only be used once in brixbitv3.
 */
export interface LegacyDelegatedSignature {
    delegatedKey: SignedPublicKey | undefined;
    signature: RecoverableEcdsaSignature | undefined;
}
/** A wrapper for all possible signature types */
export interface Signature {
    erc191: RecoverableEcdsaSignature | undefined;
    erc6492: SmartContractWalletSignature | undefined;
    installationKey: RecoverableEd25519Signature | undefined;
    delegatedErc191: LegacyDelegatedSignature | undefined;
}
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
export declare const RecoverableEd25519Signature: {
    encode(message: RecoverableEd25519Signature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RecoverableEd25519Signature;
    fromJSON(object: any): RecoverableEd25519Signature;
    toJSON(message: RecoverableEd25519Signature): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
        publicKey?: Uint8Array | undefined;
    } & {
        bytes?: Uint8Array | undefined;
        publicKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof RecoverableEd25519Signature>]: never; }>(object: I): RecoverableEd25519Signature;
};
export declare const SmartContractWalletSignature: {
    encode(message: SmartContractWalletSignature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SmartContractWalletSignature;
    fromJSON(object: any): SmartContractWalletSignature;
    toJSON(message: SmartContractWalletSignature): unknown;
    fromPartial<I extends {
        accountId?: string | undefined;
        blockNumber?: string | number | Long | undefined;
        signature?: Uint8Array | undefined;
        chainRpcUrl?: string | undefined;
    } & {
        accountId?: string | undefined;
        blockNumber?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["blockNumber"], keyof Long>]: never; }) | undefined;
        signature?: Uint8Array | undefined;
        chainRpcUrl?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SmartContractWalletSignature>]: never; }>(object: I): SmartContractWalletSignature;
};
export declare const LegacyDelegatedSignature: {
    encode(message: LegacyDelegatedSignature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LegacyDelegatedSignature;
    fromJSON(object: any): LegacyDelegatedSignature;
    toJSON(message: LegacyDelegatedSignature): unknown;
    fromPartial<I extends {
        delegatedKey?: {
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
        signature?: {
            bytes?: Uint8Array | undefined;
        } | undefined;
    } & {
        delegatedKey?: ({
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
                } & { [K in Exclude<keyof I["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_1 in Exclude<keyof I["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["delegatedKey"], keyof SignedPublicKey>]: never; }) | undefined;
        signature?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K_4 in Exclude<keyof I["signature"], "bytes">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof LegacyDelegatedSignature>]: never; }>(object: I): LegacyDelegatedSignature;
};
export declare const Signature: {
    encode(message: Signature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Signature;
    fromJSON(object: any): Signature;
    toJSON(message: Signature): unknown;
    fromPartial<I extends {
        erc191?: {
            bytes?: Uint8Array | undefined;
        } | undefined;
        erc6492?: {
            accountId?: string | undefined;
            blockNumber?: string | number | Long | undefined;
            signature?: Uint8Array | undefined;
            chainRpcUrl?: string | undefined;
        } | undefined;
        installationKey?: {
            bytes?: Uint8Array | undefined;
            publicKey?: Uint8Array | undefined;
        } | undefined;
        delegatedErc191?: {
            delegatedKey?: {
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
            signature?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
    } & {
        erc191?: ({
            bytes?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["erc191"], "bytes">]: never; }) | undefined;
        erc6492?: ({
            accountId?: string | undefined;
            blockNumber?: string | number | Long | undefined;
            signature?: Uint8Array | undefined;
            chainRpcUrl?: string | undefined;
        } & {
            accountId?: string | undefined;
            blockNumber?: string | number | (Long & {
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
            } & { [K_1 in Exclude<keyof I["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
            signature?: Uint8Array | undefined;
            chainRpcUrl?: string | undefined;
        } & { [K_2 in Exclude<keyof I["erc6492"], keyof SmartContractWalletSignature>]: never; }) | undefined;
        installationKey?: ({
            bytes?: Uint8Array | undefined;
            publicKey?: Uint8Array | undefined;
        } & {
            bytes?: Uint8Array | undefined;
            publicKey?: Uint8Array | undefined;
        } & { [K_3 in Exclude<keyof I["installationKey"], keyof RecoverableEd25519Signature>]: never; }) | undefined;
        delegatedErc191?: ({
            delegatedKey?: {
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
            signature?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
        } & {
            delegatedKey?: ({
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
                    } & { [K_4 in Exclude<keyof I["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["delegatedErc191"]["delegatedKey"], keyof SignedPublicKey>]: never; }) | undefined;
            signature?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_8 in Exclude<keyof I["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["delegatedErc191"], keyof LegacyDelegatedSignature>]: never; }) | undefined;
    } & { [K_10 in Exclude<keyof I, keyof Signature>]: never; }>(object: I): Signature;
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
