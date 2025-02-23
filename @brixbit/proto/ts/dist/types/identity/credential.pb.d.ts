import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.identity";
/** Credentials */
/** A credential that can be used in MLS leaf nodes */
export interface MlsCredential {
    inboxId: string;
}
export declare const MlsCredential: {
    encode(message: MlsCredential, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MlsCredential;
    fromJSON(object: any): MlsCredential;
    toJSON(message: MlsCredential): unknown;
    fromPartial<I extends {
        inboxId?: string | undefined;
    } & {
        inboxId?: string | undefined;
    } & { [K in Exclude<keyof I, "inboxId">]: never; }>(object: I): MlsCredential;
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
