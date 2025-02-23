import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Ciphertext is a generic structure for encrypted payload. */
/**
 * Ciphertext represents encrypted payload.
 * It is definited as a union to support cryptographic algorithm agility.
 * The payload is accompanied by the cryptographic parameters
 * required by the chosen encryption scheme.
 */
export interface Ciphertext {
    aes256GcmHkdfSha256: Ciphertext_Aes256gcmHkdfsha256 | undefined;
}
/**
 * Encryption: AES256-GCM
 * Key derivation function: HKDF-SHA256
 */
export interface Ciphertext_Aes256gcmHkdfsha256 {
    /** 32 bytes */
    hkdfSalt: Uint8Array;
    /** 12 bytes */
    gcmNonce: Uint8Array;
    /** encrypted payload */
    payload: Uint8Array;
}
/** SignedEciesCiphertext represents an ECIES encrypted payload and a signature */
export interface SignedEciesCiphertext {
    /** serialized Ecies message */
    eciesBytes: Uint8Array;
    /** signature of sha256(ecies_bytes) signed with the IdentityKey */
    signature: Signature | undefined;
}
/** Ecies is ciphertext encrypted using ECIES with a MAC */
export interface SignedEciesCiphertext_Ecies {
    /** 65 bytes */
    ephemeralPublicKey: Uint8Array;
    /** 16 bytes */
    iv: Uint8Array;
    /** 32 bytes */
    mac: Uint8Array;
    /** encrypted payload with block size of 16 */
    ciphertext: Uint8Array;
}
export declare const Ciphertext: {
    encode(message: Ciphertext, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Ciphertext;
    fromJSON(object: any): Ciphertext;
    toJSON(message: Ciphertext): unknown;
    fromPartial<I extends {
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
        } & { [K in Exclude<keyof I["aes256GcmHkdfSha256"], keyof Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "aes256GcmHkdfSha256">]: never; }>(object: I): Ciphertext;
};
export declare const Ciphertext_Aes256gcmHkdfsha256: {
    encode(message: Ciphertext_Aes256gcmHkdfsha256, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Ciphertext_Aes256gcmHkdfsha256;
    fromJSON(object: any): Ciphertext_Aes256gcmHkdfsha256;
    toJSON(message: Ciphertext_Aes256gcmHkdfsha256): unknown;
    fromPartial<I extends {
        hkdfSalt?: Uint8Array | undefined;
        gcmNonce?: Uint8Array | undefined;
        payload?: Uint8Array | undefined;
    } & {
        hkdfSalt?: Uint8Array | undefined;
        gcmNonce?: Uint8Array | undefined;
        payload?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof Ciphertext_Aes256gcmHkdfsha256>]: never; }>(object: I): Ciphertext_Aes256gcmHkdfsha256;
};
export declare const SignedEciesCiphertext: {
    encode(message: SignedEciesCiphertext, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedEciesCiphertext;
    fromJSON(object: any): SignedEciesCiphertext;
    toJSON(message: SignedEciesCiphertext): unknown;
    fromPartial<I extends {
        eciesBytes?: Uint8Array | undefined;
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
        eciesBytes?: Uint8Array | undefined;
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
    } & { [K_3 in Exclude<keyof I, keyof SignedEciesCiphertext>]: never; }>(object: I): SignedEciesCiphertext;
};
export declare const SignedEciesCiphertext_Ecies: {
    encode(message: SignedEciesCiphertext_Ecies, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedEciesCiphertext_Ecies;
    fromJSON(object: any): SignedEciesCiphertext_Ecies;
    toJSON(message: SignedEciesCiphertext_Ecies): unknown;
    fromPartial<I extends {
        ephemeralPublicKey?: Uint8Array | undefined;
        iv?: Uint8Array | undefined;
        mac?: Uint8Array | undefined;
        ciphertext?: Uint8Array | undefined;
    } & {
        ephemeralPublicKey?: Uint8Array | undefined;
        iv?: Uint8Array | undefined;
        mac?: Uint8Array | undefined;
        ciphertext?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof SignedEciesCiphertext_Ecies>]: never; }>(object: I): SignedEciesCiphertext_Ecies;
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
