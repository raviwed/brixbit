import Long from "long";
import { EncodedContent } from "./content.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.message_contents";
/** Composite ContentType */
/** Composite is used to implement brixbit.org/composite content type */
export interface Composite {
    parts: Composite_Part[];
}
/** Part represents one section of a composite message */
export interface Composite_Part {
    part: EncodedContent | undefined;
    composite: Composite | undefined;
}
export declare const Composite: {
    encode(message: Composite, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Composite;
    fromJSON(object: any): Composite;
    toJSON(message: Composite): unknown;
    fromPartial<I extends {
        parts?: {
            part?: {
                type?: {
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } | undefined;
                parameters?: {
                    [x: string]: string | undefined;
                } | undefined;
                fallback?: string | undefined;
                compression?: import("./content.pb").Compression | undefined;
                content?: Uint8Array | undefined;
            } | undefined;
            composite?: any | undefined;
        }[] | undefined;
    } & {
        parts?: ({
            part?: {
                type?: {
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } | undefined;
                parameters?: {
                    [x: string]: string | undefined;
                } | undefined;
                fallback?: string | undefined;
                compression?: import("./content.pb").Compression | undefined;
                content?: Uint8Array | undefined;
            } | undefined;
            composite?: any | undefined;
        }[] & ({
            part?: {
                type?: {
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } | undefined;
                parameters?: {
                    [x: string]: string | undefined;
                } | undefined;
                fallback?: string | undefined;
                compression?: import("./content.pb").Compression | undefined;
                content?: Uint8Array | undefined;
            } | undefined;
            composite?: any | undefined;
        } & {
            part?: ({
                type?: {
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } | undefined;
                parameters?: {
                    [x: string]: string | undefined;
                } | undefined;
                fallback?: string | undefined;
                compression?: import("./content.pb").Compression | undefined;
                content?: Uint8Array | undefined;
            } & {
                type?: ({
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } & {
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } & { [K in Exclude<keyof I["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                parameters?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_1 in Exclude<keyof I["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                fallback?: string | undefined;
                compression?: import("./content.pb").Compression | undefined;
                content?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
            composite?: ({
                parts?: {
                    part?: {
                        type?: {
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } | undefined;
                        parameters?: {
                            [x: string]: string | undefined;
                        } | undefined;
                        fallback?: string | undefined;
                        compression?: import("./content.pb").Compression | undefined;
                        content?: Uint8Array | undefined;
                    } | undefined;
                    composite?: any | undefined;
                }[] | undefined;
            } & {
                parts?: ({
                    part?: {
                        type?: {
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } | undefined;
                        parameters?: {
                            [x: string]: string | undefined;
                        } | undefined;
                        fallback?: string | undefined;
                        compression?: import("./content.pb").Compression | undefined;
                        content?: Uint8Array | undefined;
                    } | undefined;
                    composite?: any | undefined;
                }[] & ({
                    part?: {
                        type?: {
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } | undefined;
                        parameters?: {
                            [x: string]: string | undefined;
                        } | undefined;
                        fallback?: string | undefined;
                        compression?: import("./content.pb").Compression | undefined;
                        content?: Uint8Array | undefined;
                    } | undefined;
                    composite?: any | undefined;
                } & {
                    part?: ({
                        type?: {
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } | undefined;
                        parameters?: {
                            [x: string]: string | undefined;
                        } | undefined;
                        fallback?: string | undefined;
                        compression?: import("./content.pb").Compression | undefined;
                        content?: Uint8Array | undefined;
                    } & {
                        type?: ({
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } & {
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } & { [K_3 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                        parameters?: ({
                            [x: string]: string | undefined;
                        } & {
                            [x: string]: string | undefined;
                        } & { [K_4 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                        fallback?: string | undefined;
                        compression?: import("./content.pb").Compression | undefined;
                        content?: Uint8Array | undefined;
                    } & { [K_5 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                    composite?: ({
                        parts?: {
                            part?: {
                                type?: {
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } | undefined;
                                parameters?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                                fallback?: string | undefined;
                                compression?: import("./content.pb").Compression | undefined;
                                content?: Uint8Array | undefined;
                            } | undefined;
                            composite?: any | undefined;
                        }[] | undefined;
                    } & {
                        parts?: ({
                            part?: {
                                type?: {
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } | undefined;
                                parameters?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                                fallback?: string | undefined;
                                compression?: import("./content.pb").Compression | undefined;
                                content?: Uint8Array | undefined;
                            } | undefined;
                            composite?: any | undefined;
                        }[] & ({
                            part?: {
                                type?: {
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } | undefined;
                                parameters?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                                fallback?: string | undefined;
                                compression?: import("./content.pb").Compression | undefined;
                                content?: Uint8Array | undefined;
                            } | undefined;
                            composite?: any | undefined;
                        } & {
                            part?: ({
                                type?: {
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } | undefined;
                                parameters?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                                fallback?: string | undefined;
                                compression?: import("./content.pb").Compression | undefined;
                                content?: Uint8Array | undefined;
                            } & {
                                type?: ({
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } & {
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } & { [K_6 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                                parameters?: ({
                                    [x: string]: string | undefined;
                                } & {
                                    [x: string]: string | undefined;
                                } & { [K_7 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                                fallback?: string | undefined;
                                compression?: import("./content.pb").Compression | undefined;
                                content?: Uint8Array | undefined;
                            } & { [K_8 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                            composite?: ({
                                parts?: {
                                    part?: {
                                        type?: {
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } | undefined;
                                        parameters?: {
                                            [x: string]: string | undefined;
                                        } | undefined;
                                        fallback?: string | undefined;
                                        compression?: import("./content.pb").Compression | undefined;
                                        content?: Uint8Array | undefined;
                                    } | undefined;
                                    composite?: any | undefined;
                                }[] | undefined;
                            } & {
                                parts?: ({
                                    part?: {
                                        type?: {
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } | undefined;
                                        parameters?: {
                                            [x: string]: string | undefined;
                                        } | undefined;
                                        fallback?: string | undefined;
                                        compression?: import("./content.pb").Compression | undefined;
                                        content?: Uint8Array | undefined;
                                    } | undefined;
                                    composite?: any | undefined;
                                }[] & ({
                                    part?: {
                                        type?: {
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } | undefined;
                                        parameters?: {
                                            [x: string]: string | undefined;
                                        } | undefined;
                                        fallback?: string | undefined;
                                        compression?: import("./content.pb").Compression | undefined;
                                        content?: Uint8Array | undefined;
                                    } | undefined;
                                    composite?: any | undefined;
                                } & {
                                    part?: ({
                                        type?: {
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } | undefined;
                                        parameters?: {
                                            [x: string]: string | undefined;
                                        } | undefined;
                                        fallback?: string | undefined;
                                        compression?: import("./content.pb").Compression | undefined;
                                        content?: Uint8Array | undefined;
                                    } & {
                                        type?: ({
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } & {
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } & { [K_9 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                                        parameters?: ({
                                            [x: string]: string | undefined;
                                        } & {
                                            [x: string]: string | undefined;
                                        } & { [K_10 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                                        fallback?: string | undefined;
                                        compression?: import("./content.pb").Compression | undefined;
                                        content?: Uint8Array | undefined;
                                    } & { [K_11 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                                    composite?: ({
                                        parts?: {
                                            part?: {
                                                type?: {
                                                    authorityId?: string | undefined;
                                                    typeId?: string | undefined;
                                                    versionMajor?: number | undefined;
                                                    versionMinor?: number | undefined;
                                                } | undefined;
                                                parameters?: {
                                                    [x: string]: string | undefined;
                                                } | undefined;
                                                fallback?: string | undefined;
                                                compression?: import("./content.pb").Compression | undefined;
                                                content?: Uint8Array | undefined;
                                            } | undefined;
                                            composite?: any | undefined;
                                        }[] | undefined;
                                    } & {
                                        parts?: ({
                                            part?: {
                                                type?: {
                                                    authorityId?: string | undefined;
                                                    typeId?: string | undefined;
                                                    versionMajor?: number | undefined;
                                                    versionMinor?: number | undefined;
                                                } | undefined;
                                                parameters?: {
                                                    [x: string]: string | undefined;
                                                } | undefined;
                                                fallback?: string | undefined;
                                                compression?: import("./content.pb").Compression | undefined;
                                                content?: Uint8Array | undefined;
                                            } | undefined;
                                            composite?: any | undefined;
                                        }[] & ({
                                            part?: {
                                                type?: {
                                                    authorityId?: string | undefined;
                                                    typeId?: string | undefined;
                                                    versionMajor?: number | undefined;
                                                    versionMinor?: number | undefined;
                                                } | undefined;
                                                parameters?: {
                                                    [x: string]: string | undefined;
                                                } | undefined;
                                                fallback?: string | undefined;
                                                compression?: import("./content.pb").Compression | undefined;
                                                content?: Uint8Array | undefined;
                                            } | undefined;
                                            composite?: any | undefined;
                                        } & {
                                            part?: ({
                                                type?: {
                                                    authorityId?: string | undefined;
                                                    typeId?: string | undefined;
                                                    versionMajor?: number | undefined;
                                                    versionMinor?: number | undefined;
                                                } | undefined;
                                                parameters?: {
                                                    [x: string]: string | undefined;
                                                } | undefined;
                                                fallback?: string | undefined;
                                                compression?: import("./content.pb").Compression | undefined;
                                                content?: Uint8Array | undefined;
                                            } & {
                                                type?: ({
                                                    authorityId?: string | undefined;
                                                    typeId?: string | undefined;
                                                    versionMajor?: number | undefined;
                                                    versionMinor?: number | undefined;
                                                } & any & { [K_12 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                                                parameters?: ({
                                                    [x: string]: string | undefined;
                                                } & any & { [K_13 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                                                fallback?: string | undefined;
                                                compression?: import("./content.pb").Compression | undefined;
                                                content?: Uint8Array | undefined;
                                            } & { [K_14 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                                            composite?: ({
                                                parts?: {
                                                    part?: {
                                                        type?: {
                                                            authorityId?: string | undefined;
                                                            typeId?: string | undefined;
                                                            versionMajor?: number | undefined;
                                                            versionMinor?: number | undefined;
                                                        } | undefined;
                                                        parameters?: {
                                                            [x: string]: string | undefined;
                                                        } | undefined;
                                                        fallback?: string | undefined;
                                                        compression?: import("./content.pb").Compression | undefined;
                                                        content?: Uint8Array | undefined;
                                                    } | undefined;
                                                    composite?: any | undefined;
                                                }[] | undefined;
                                            } & {
                                                parts?: ({
                                                    part?: {
                                                        type?: {
                                                            authorityId?: string | undefined;
                                                            typeId?: string | undefined;
                                                            versionMajor?: number | undefined;
                                                            versionMinor?: number | undefined;
                                                        } | undefined;
                                                        parameters?: {
                                                            [x: string]: string | undefined;
                                                        } | undefined;
                                                        fallback?: string | undefined;
                                                        compression?: import("./content.pb").Compression | undefined;
                                                        content?: Uint8Array | undefined;
                                                    } | undefined;
                                                    composite?: any | undefined;
                                                }[] & ({
                                                    part?: {
                                                        type?: {
                                                            authorityId?: string | undefined;
                                                            typeId?: string | undefined;
                                                            versionMajor?: number | undefined;
                                                            versionMinor?: number | undefined;
                                                        } | undefined;
                                                        parameters?: {
                                                            [x: string]: string | undefined;
                                                        } | undefined;
                                                        fallback?: string | undefined;
                                                        compression?: import("./content.pb").Compression | undefined;
                                                        content?: Uint8Array | undefined;
                                                    } | undefined;
                                                    composite?: any | undefined;
                                                } & any & { [K_15 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_16 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                                                    part?: {
                                                        type?: {
                                                            authorityId?: string | undefined;
                                                            typeId?: string | undefined;
                                                            versionMajor?: number | undefined;
                                                            versionMinor?: number | undefined;
                                                        } | undefined;
                                                        parameters?: {
                                                            [x: string]: string | undefined;
                                                        } | undefined;
                                                        fallback?: string | undefined;
                                                        compression?: import("./content.pb").Compression | undefined;
                                                        content?: Uint8Array | undefined;
                                                    } | undefined;
                                                    composite?: any | undefined;
                                                }[]>]: never; }) | undefined;
                                            } & { [K_17 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                                        } & { [K_18 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_19 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                                            part?: {
                                                type?: {
                                                    authorityId?: string | undefined;
                                                    typeId?: string | undefined;
                                                    versionMajor?: number | undefined;
                                                    versionMinor?: number | undefined;
                                                } | undefined;
                                                parameters?: {
                                                    [x: string]: string | undefined;
                                                } | undefined;
                                                fallback?: string | undefined;
                                                compression?: import("./content.pb").Compression | undefined;
                                                content?: Uint8Array | undefined;
                                            } | undefined;
                                            composite?: any | undefined;
                                        }[]>]: never; }) | undefined;
                                    } & { [K_20 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                                } & { [K_21 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_22 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                                    part?: {
                                        type?: {
                                            authorityId?: string | undefined;
                                            typeId?: string | undefined;
                                            versionMajor?: number | undefined;
                                            versionMinor?: number | undefined;
                                        } | undefined;
                                        parameters?: {
                                            [x: string]: string | undefined;
                                        } | undefined;
                                        fallback?: string | undefined;
                                        compression?: import("./content.pb").Compression | undefined;
                                        content?: Uint8Array | undefined;
                                    } | undefined;
                                    composite?: any | undefined;
                                }[]>]: never; }) | undefined;
                            } & { [K_23 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                        } & { [K_24 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_25 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                            part?: {
                                type?: {
                                    authorityId?: string | undefined;
                                    typeId?: string | undefined;
                                    versionMajor?: number | undefined;
                                    versionMinor?: number | undefined;
                                } | undefined;
                                parameters?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                                fallback?: string | undefined;
                                compression?: import("./content.pb").Compression | undefined;
                                content?: Uint8Array | undefined;
                            } | undefined;
                            composite?: any | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_26 in Exclude<keyof I["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                } & { [K_27 in Exclude<keyof I["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_28 in Exclude<keyof I["parts"][number]["composite"]["parts"], keyof {
                    part?: {
                        type?: {
                            authorityId?: string | undefined;
                            typeId?: string | undefined;
                            versionMajor?: number | undefined;
                            versionMinor?: number | undefined;
                        } | undefined;
                        parameters?: {
                            [x: string]: string | undefined;
                        } | undefined;
                        fallback?: string | undefined;
                        compression?: import("./content.pb").Compression | undefined;
                        content?: Uint8Array | undefined;
                    } | undefined;
                    composite?: any | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_29 in Exclude<keyof I["parts"][number]["composite"], "parts">]: never; }) | undefined;
        } & { [K_30 in Exclude<keyof I["parts"][number], keyof Composite_Part>]: never; })[] & { [K_31 in Exclude<keyof I["parts"], keyof {
            part?: {
                type?: {
                    authorityId?: string | undefined;
                    typeId?: string | undefined;
                    versionMajor?: number | undefined;
                    versionMinor?: number | undefined;
                } | undefined;
                parameters?: {
                    [x: string]: string | undefined;
                } | undefined;
                fallback?: string | undefined;
                compression?: import("./content.pb").Compression | undefined;
                content?: Uint8Array | undefined;
            } | undefined;
            composite?: any | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_32 in Exclude<keyof I, "parts">]: never; }>(object: I): Composite;
};
export declare const Composite_Part: {
    encode(message: Composite_Part, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Composite_Part;
    fromJSON(object: any): Composite_Part;
    toJSON(message: Composite_Part): unknown;
    fromPartial<I extends {
        part?: {
            type?: {
                authorityId?: string | undefined;
                typeId?: string | undefined;
                versionMajor?: number | undefined;
                versionMinor?: number | undefined;
            } | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
            fallback?: string | undefined;
            compression?: import("./content.pb").Compression | undefined;
            content?: Uint8Array | undefined;
        } | undefined;
        composite?: any | undefined;
    } & {
        part?: ({
            type?: {
                authorityId?: string | undefined;
                typeId?: string | undefined;
                versionMajor?: number | undefined;
                versionMinor?: number | undefined;
            } | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
            fallback?: string | undefined;
            compression?: import("./content.pb").Compression | undefined;
            content?: Uint8Array | undefined;
        } & {
            type?: ({
                authorityId?: string | undefined;
                typeId?: string | undefined;
                versionMajor?: number | undefined;
                versionMinor?: number | undefined;
            } & {
                authorityId?: string | undefined;
                typeId?: string | undefined;
                versionMajor?: number | undefined;
                versionMinor?: number | undefined;
            } & { [K in Exclude<keyof I["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
            parameters?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_1 in Exclude<keyof I["part"]["parameters"], string | number>]: never; }) | undefined;
            fallback?: string | undefined;
            compression?: import("./content.pb").Compression | undefined;
            content?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["part"], keyof EncodedContent>]: never; }) | undefined;
        composite?: ({
            parts?: {
                part?: {
                    type?: {
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } | undefined;
                    parameters?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    fallback?: string | undefined;
                    compression?: import("./content.pb").Compression | undefined;
                    content?: Uint8Array | undefined;
                } | undefined;
                composite?: any | undefined;
            }[] | undefined;
        } & {
            parts?: ({
                part?: {
                    type?: {
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } | undefined;
                    parameters?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    fallback?: string | undefined;
                    compression?: import("./content.pb").Compression | undefined;
                    content?: Uint8Array | undefined;
                } | undefined;
                composite?: any | undefined;
            }[] & ({
                part?: {
                    type?: {
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } | undefined;
                    parameters?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    fallback?: string | undefined;
                    compression?: import("./content.pb").Compression | undefined;
                    content?: Uint8Array | undefined;
                } | undefined;
                composite?: any | undefined;
            } & {
                part?: ({
                    type?: {
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } | undefined;
                    parameters?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    fallback?: string | undefined;
                    compression?: import("./content.pb").Compression | undefined;
                    content?: Uint8Array | undefined;
                } & {
                    type?: ({
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } & {
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } & { [K_3 in Exclude<keyof I["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                    parameters?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_4 in Exclude<keyof I["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                    fallback?: string | undefined;
                    compression?: import("./content.pb").Compression | undefined;
                    content?: Uint8Array | undefined;
                } & { [K_5 in Exclude<keyof I["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                composite?: ({
                    parts?: {
                        part?: {
                            type?: {
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } | undefined;
                            parameters?: {
                                [x: string]: string | undefined;
                            } | undefined;
                            fallback?: string | undefined;
                            compression?: import("./content.pb").Compression | undefined;
                            content?: Uint8Array | undefined;
                        } | undefined;
                        composite?: any | undefined;
                    }[] | undefined;
                } & {
                    parts?: ({
                        part?: {
                            type?: {
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } | undefined;
                            parameters?: {
                                [x: string]: string | undefined;
                            } | undefined;
                            fallback?: string | undefined;
                            compression?: import("./content.pb").Compression | undefined;
                            content?: Uint8Array | undefined;
                        } | undefined;
                        composite?: any | undefined;
                    }[] & ({
                        part?: {
                            type?: {
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } | undefined;
                            parameters?: {
                                [x: string]: string | undefined;
                            } | undefined;
                            fallback?: string | undefined;
                            compression?: import("./content.pb").Compression | undefined;
                            content?: Uint8Array | undefined;
                        } | undefined;
                        composite?: any | undefined;
                    } & {
                        part?: ({
                            type?: {
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } | undefined;
                            parameters?: {
                                [x: string]: string | undefined;
                            } | undefined;
                            fallback?: string | undefined;
                            compression?: import("./content.pb").Compression | undefined;
                            content?: Uint8Array | undefined;
                        } & {
                            type?: ({
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } & {
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } & { [K_6 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                            parameters?: ({
                                [x: string]: string | undefined;
                            } & {
                                [x: string]: string | undefined;
                            } & { [K_7 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                            fallback?: string | undefined;
                            compression?: import("./content.pb").Compression | undefined;
                            content?: Uint8Array | undefined;
                        } & { [K_8 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                        composite?: ({
                            parts?: {
                                part?: {
                                    type?: {
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } | undefined;
                                    parameters?: {
                                        [x: string]: string | undefined;
                                    } | undefined;
                                    fallback?: string | undefined;
                                    compression?: import("./content.pb").Compression | undefined;
                                    content?: Uint8Array | undefined;
                                } | undefined;
                                composite?: any | undefined;
                            }[] | undefined;
                        } & {
                            parts?: ({
                                part?: {
                                    type?: {
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } | undefined;
                                    parameters?: {
                                        [x: string]: string | undefined;
                                    } | undefined;
                                    fallback?: string | undefined;
                                    compression?: import("./content.pb").Compression | undefined;
                                    content?: Uint8Array | undefined;
                                } | undefined;
                                composite?: any | undefined;
                            }[] & ({
                                part?: {
                                    type?: {
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } | undefined;
                                    parameters?: {
                                        [x: string]: string | undefined;
                                    } | undefined;
                                    fallback?: string | undefined;
                                    compression?: import("./content.pb").Compression | undefined;
                                    content?: Uint8Array | undefined;
                                } | undefined;
                                composite?: any | undefined;
                            } & {
                                part?: ({
                                    type?: {
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } | undefined;
                                    parameters?: {
                                        [x: string]: string | undefined;
                                    } | undefined;
                                    fallback?: string | undefined;
                                    compression?: import("./content.pb").Compression | undefined;
                                    content?: Uint8Array | undefined;
                                } & {
                                    type?: ({
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } & {
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } & { [K_9 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                                    parameters?: ({
                                        [x: string]: string | undefined;
                                    } & {
                                        [x: string]: string | undefined;
                                    } & { [K_10 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                                    fallback?: string | undefined;
                                    compression?: import("./content.pb").Compression | undefined;
                                    content?: Uint8Array | undefined;
                                } & { [K_11 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                                composite?: ({
                                    parts?: {
                                        part?: {
                                            type?: {
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } | undefined;
                                            parameters?: {
                                                [x: string]: string | undefined;
                                            } | undefined;
                                            fallback?: string | undefined;
                                            compression?: import("./content.pb").Compression | undefined;
                                            content?: Uint8Array | undefined;
                                        } | undefined;
                                        composite?: any | undefined;
                                    }[] | undefined;
                                } & {
                                    parts?: ({
                                        part?: {
                                            type?: {
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } | undefined;
                                            parameters?: {
                                                [x: string]: string | undefined;
                                            } | undefined;
                                            fallback?: string | undefined;
                                            compression?: import("./content.pb").Compression | undefined;
                                            content?: Uint8Array | undefined;
                                        } | undefined;
                                        composite?: any | undefined;
                                    }[] & ({
                                        part?: {
                                            type?: {
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } | undefined;
                                            parameters?: {
                                                [x: string]: string | undefined;
                                            } | undefined;
                                            fallback?: string | undefined;
                                            compression?: import("./content.pb").Compression | undefined;
                                            content?: Uint8Array | undefined;
                                        } | undefined;
                                        composite?: any | undefined;
                                    } & {
                                        part?: ({
                                            type?: {
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } | undefined;
                                            parameters?: {
                                                [x: string]: string | undefined;
                                            } | undefined;
                                            fallback?: string | undefined;
                                            compression?: import("./content.pb").Compression | undefined;
                                            content?: Uint8Array | undefined;
                                        } & {
                                            type?: ({
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } & {
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } & { [K_12 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["type"], keyof import("./content.pb").ContentTypeId>]: never; }) | undefined;
                                            parameters?: ({
                                                [x: string]: string | undefined;
                                            } & {
                                                [x: string]: string | undefined;
                                            } & { [K_13 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"]["parameters"], string | number>]: never; }) | undefined;
                                            fallback?: string | undefined;
                                            compression?: import("./content.pb").Compression | undefined;
                                            content?: Uint8Array | undefined;
                                        } & { [K_14 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                                        composite?: ({
                                            parts?: {
                                                part?: {
                                                    type?: {
                                                        authorityId?: string | undefined;
                                                        typeId?: string | undefined;
                                                        versionMajor?: number | undefined;
                                                        versionMinor?: number | undefined;
                                                    } | undefined;
                                                    parameters?: {
                                                        [x: string]: string | undefined;
                                                    } | undefined;
                                                    fallback?: string | undefined;
                                                    compression?: import("./content.pb").Compression | undefined;
                                                    content?: Uint8Array | undefined;
                                                } | undefined;
                                                composite?: any | undefined;
                                            }[] | undefined;
                                        } & {
                                            parts?: ({
                                                part?: {
                                                    type?: {
                                                        authorityId?: string | undefined;
                                                        typeId?: string | undefined;
                                                        versionMajor?: number | undefined;
                                                        versionMinor?: number | undefined;
                                                    } | undefined;
                                                    parameters?: {
                                                        [x: string]: string | undefined;
                                                    } | undefined;
                                                    fallback?: string | undefined;
                                                    compression?: import("./content.pb").Compression | undefined;
                                                    content?: Uint8Array | undefined;
                                                } | undefined;
                                                composite?: any | undefined;
                                            }[] & ({
                                                part?: {
                                                    type?: {
                                                        authorityId?: string | undefined;
                                                        typeId?: string | undefined;
                                                        versionMajor?: number | undefined;
                                                        versionMinor?: number | undefined;
                                                    } | undefined;
                                                    parameters?: {
                                                        [x: string]: string | undefined;
                                                    } | undefined;
                                                    fallback?: string | undefined;
                                                    compression?: import("./content.pb").Compression | undefined;
                                                    content?: Uint8Array | undefined;
                                                } | undefined;
                                                composite?: any | undefined;
                                            } & {
                                                part?: ({
                                                    type?: {
                                                        authorityId?: string | undefined;
                                                        typeId?: string | undefined;
                                                        versionMajor?: number | undefined;
                                                        versionMinor?: number | undefined;
                                                    } | undefined;
                                                    parameters?: {
                                                        [x: string]: string | undefined;
                                                    } | undefined;
                                                    fallback?: string | undefined;
                                                    compression?: import("./content.pb").Compression | undefined;
                                                    content?: Uint8Array | undefined;
                                                } & any & { [K_15 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["part"], keyof EncodedContent>]: never; }) | undefined;
                                                composite?: ({
                                                    parts?: {
                                                        part?: {
                                                            type?: {
                                                                authorityId?: string | undefined;
                                                                typeId?: string | undefined;
                                                                versionMajor?: number | undefined;
                                                                versionMinor?: number | undefined;
                                                            } | undefined;
                                                            parameters?: {
                                                                [x: string]: string | undefined;
                                                            } | undefined;
                                                            fallback?: string | undefined;
                                                            compression?: import("./content.pb").Compression | undefined;
                                                            content?: Uint8Array | undefined;
                                                        } | undefined;
                                                        composite?: any | undefined;
                                                    }[] | undefined;
                                                } & any & { [K_16 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                                            } & { [K_17 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_18 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                                                part?: {
                                                    type?: {
                                                        authorityId?: string | undefined;
                                                        typeId?: string | undefined;
                                                        versionMajor?: number | undefined;
                                                        versionMinor?: number | undefined;
                                                    } | undefined;
                                                    parameters?: {
                                                        [x: string]: string | undefined;
                                                    } | undefined;
                                                    fallback?: string | undefined;
                                                    compression?: import("./content.pb").Compression | undefined;
                                                    content?: Uint8Array | undefined;
                                                } | undefined;
                                                composite?: any | undefined;
                                            }[]>]: never; }) | undefined;
                                        } & { [K_19 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                                    } & { [K_20 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_21 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                                        part?: {
                                            type?: {
                                                authorityId?: string | undefined;
                                                typeId?: string | undefined;
                                                versionMajor?: number | undefined;
                                                versionMinor?: number | undefined;
                                            } | undefined;
                                            parameters?: {
                                                [x: string]: string | undefined;
                                            } | undefined;
                                            fallback?: string | undefined;
                                            compression?: import("./content.pb").Compression | undefined;
                                            content?: Uint8Array | undefined;
                                        } | undefined;
                                        composite?: any | undefined;
                                    }[]>]: never; }) | undefined;
                                } & { [K_22 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                            } & { [K_23 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_24 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"]["parts"], keyof {
                                part?: {
                                    type?: {
                                        authorityId?: string | undefined;
                                        typeId?: string | undefined;
                                        versionMajor?: number | undefined;
                                        versionMinor?: number | undefined;
                                    } | undefined;
                                    parameters?: {
                                        [x: string]: string | undefined;
                                    } | undefined;
                                    fallback?: string | undefined;
                                    compression?: import("./content.pb").Compression | undefined;
                                    content?: Uint8Array | undefined;
                                } | undefined;
                                composite?: any | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_25 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
                    } & { [K_26 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_27 in Exclude<keyof I["composite"]["parts"][number]["composite"]["parts"], keyof {
                        part?: {
                            type?: {
                                authorityId?: string | undefined;
                                typeId?: string | undefined;
                                versionMajor?: number | undefined;
                                versionMinor?: number | undefined;
                            } | undefined;
                            parameters?: {
                                [x: string]: string | undefined;
                            } | undefined;
                            fallback?: string | undefined;
                            compression?: import("./content.pb").Compression | undefined;
                            content?: Uint8Array | undefined;
                        } | undefined;
                        composite?: any | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_28 in Exclude<keyof I["composite"]["parts"][number]["composite"], "parts">]: never; }) | undefined;
            } & { [K_29 in Exclude<keyof I["composite"]["parts"][number], keyof Composite_Part>]: never; })[] & { [K_30 in Exclude<keyof I["composite"]["parts"], keyof {
                part?: {
                    type?: {
                        authorityId?: string | undefined;
                        typeId?: string | undefined;
                        versionMajor?: number | undefined;
                        versionMinor?: number | undefined;
                    } | undefined;
                    parameters?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    fallback?: string | undefined;
                    compression?: import("./content.pb").Compression | undefined;
                    content?: Uint8Array | undefined;
                } | undefined;
                composite?: any | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_31 in Exclude<keyof I["composite"], "parts">]: never; }) | undefined;
    } & { [K_32 in Exclude<keyof I, keyof Composite_Part>]: never; }>(object: I): Composite_Part;
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
