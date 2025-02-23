import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Signature is a generic structure for signed byte arrays */
/** SignedPayload is a wrapper for a signature and a payload */
export interface SignedPayload {
    payload: Uint8Array;
    signature: Signature | undefined;
}
export declare const SignedPayload: {
    encode(message: SignedPayload, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedPayload;
    fromJSON(object: any): SignedPayload;
    toJSON(message: SignedPayload): unknown;
    fromPartial<I extends {
        payload?: Uint8Array | undefined;
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
        payload?: Uint8Array | undefined;
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
    } & { [K_3 in Exclude<keyof I, keyof SignedPayload>]: never; }>(object: I): SignedPayload;
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
