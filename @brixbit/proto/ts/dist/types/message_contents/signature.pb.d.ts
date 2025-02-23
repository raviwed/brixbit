import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Signature is a generic structure for public key signatures. */
/**
 * Signature represents a generalized public key signature,
 * defined as a union to support cryptographic algorithm agility.
 */
export interface Signature {
    ecdsaCompact: Signature_ECDSACompact | undefined;
    walletEcdsaCompact: Signature_WalletECDSACompact | undefined;
}
/** ECDSA signature bytes and the recovery bit */
export interface Signature_ECDSACompact {
    /** compact representation [ R || S ], 64 bytes */
    bytes: Uint8Array;
    /** recovery bit */
    recovery: number;
}
/**
 * ECDSA signature bytes and the recovery bit
 * produced by brixbit-js::PublicKey.signWithWallet function, i.e.
 * EIP-191 signature of a "Create Identity" message with the key embedded.
 * Used to sign identity keys.
 */
export interface Signature_WalletECDSACompact {
    /** compact representation [ R || S ], 64 bytes */
    bytes: Uint8Array;
    /** recovery bit */
    recovery: number;
}
export declare const Signature: {
    encode(message: Signature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Signature;
    fromJSON(object: any): Signature;
    toJSON(message: Signature): unknown;
    fromPartial<I extends {
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
        } & { [K in Exclude<keyof I["ecdsaCompact"], keyof Signature_ECDSACompact>]: never; }) | undefined;
        walletEcdsaCompact?: ({
            bytes?: Uint8Array | undefined;
            recovery?: number | undefined;
        } & {
            bytes?: Uint8Array | undefined;
            recovery?: number | undefined;
        } & { [K_1 in Exclude<keyof I["walletEcdsaCompact"], keyof Signature_WalletECDSACompact>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Signature>]: never; }>(object: I): Signature;
};
export declare const Signature_ECDSACompact: {
    encode(message: Signature_ECDSACompact, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Signature_ECDSACompact;
    fromJSON(object: any): Signature_ECDSACompact;
    toJSON(message: Signature_ECDSACompact): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
        recovery?: number | undefined;
    } & {
        bytes?: Uint8Array | undefined;
        recovery?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Signature_ECDSACompact>]: never; }>(object: I): Signature_ECDSACompact;
};
export declare const Signature_WalletECDSACompact: {
    encode(message: Signature_WalletECDSACompact, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Signature_WalletECDSACompact;
    fromJSON(object: any): Signature_WalletECDSACompact;
    toJSON(message: Signature_WalletECDSACompact): unknown;
    fromPartial<I extends {
        bytes?: Uint8Array | undefined;
        recovery?: number | undefined;
    } & {
        bytes?: Uint8Array | undefined;
        recovery?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Signature_WalletECDSACompact>]: never; }>(object: I): Signature_WalletECDSACompact;
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
