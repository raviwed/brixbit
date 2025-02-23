import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** ECIES is a wrapper for ECIES payloads */
/** EciesMessage is a wrapper for ECIES encrypted payloads */
export interface EciesMessage {
    /** Expected to be an ECIES encrypted SignedPayload */
    v1: Uint8Array | undefined;
}
export declare const EciesMessage: {
    encode(message: EciesMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EciesMessage;
    fromJSON(object: any): EciesMessage;
    toJSON(message: EciesMessage): unknown;
    fromPartial<I extends {
        v1?: Uint8Array | undefined;
    } & {
        v1?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "v1">]: never; }>(object: I): EciesMessage;
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
