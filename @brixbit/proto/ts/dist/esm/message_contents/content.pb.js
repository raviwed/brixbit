/* eslint-disable */
import Long from "long";
import { SignedPublicKeyBundle } from "./public_key.pb";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
/** Message content encoding structures */
/**
 * Recognized compression algorithms
 * protolint:disable ENUM_FIELD_NAMES_ZERO_VALUE_END_WITH
 */
export var Compression;
(function (Compression) {
    Compression[Compression["COMPRESSION_DEFLATE"] = 0] = "COMPRESSION_DEFLATE";
    Compression[Compression["COMPRESSION_GZIP"] = 1] = "COMPRESSION_GZIP";
    Compression[Compression["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Compression || (Compression = {}));
export function compressionFromJSON(object) {
    switch (object) {
        case 0:
        case "COMPRESSION_DEFLATE":
            return Compression.COMPRESSION_DEFLATE;
        case 1:
        case "COMPRESSION_GZIP":
            return Compression.COMPRESSION_GZIP;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Compression.UNRECOGNIZED;
    }
}
export function compressionToJSON(object) {
    switch (object) {
        case Compression.COMPRESSION_DEFLATE:
            return "COMPRESSION_DEFLATE";
        case Compression.COMPRESSION_GZIP:
            return "COMPRESSION_GZIP";
        case Compression.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseContentTypeId() {
    return { authorityId: "", typeId: "", versionMajor: 0, versionMinor: 0 };
}
export const ContentTypeId = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authorityId !== "") {
            writer.uint32(10).string(message.authorityId);
        }
        if (message.typeId !== "") {
            writer.uint32(18).string(message.typeId);
        }
        if (message.versionMajor !== 0) {
            writer.uint32(24).uint32(message.versionMajor);
        }
        if (message.versionMinor !== 0) {
            writer.uint32(32).uint32(message.versionMinor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContentTypeId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authorityId = reader.string();
                    break;
                case 2:
                    message.typeId = reader.string();
                    break;
                case 3:
                    message.versionMajor = reader.uint32();
                    break;
                case 4:
                    message.versionMinor = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            authorityId: isSet(object.authorityId) ? String(object.authorityId) : "",
            typeId: isSet(object.typeId) ? String(object.typeId) : "",
            versionMajor: isSet(object.versionMajor)
                ? Number(object.versionMajor)
                : 0,
            versionMinor: isSet(object.versionMinor)
                ? Number(object.versionMinor)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.authorityId !== undefined &&
            (obj.authorityId = message.authorityId);
        message.typeId !== undefined && (obj.typeId = message.typeId);
        message.versionMajor !== undefined &&
            (obj.versionMajor = Math.round(message.versionMajor));
        message.versionMinor !== undefined &&
            (obj.versionMinor = Math.round(message.versionMinor));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseContentTypeId();
        message.authorityId = (_a = object.authorityId) !== null && _a !== void 0 ? _a : "";
        message.typeId = (_b = object.typeId) !== null && _b !== void 0 ? _b : "";
        message.versionMajor = (_c = object.versionMajor) !== null && _c !== void 0 ? _c : 0;
        message.versionMinor = (_d = object.versionMinor) !== null && _d !== void 0 ? _d : 0;
        return message;
    },
};
function createBaseEncodedContent() {
    return {
        type: undefined,
        parameters: {},
        fallback: undefined,
        compression: undefined,
        content: new Uint8Array(),
    };
}
export const EncodedContent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== undefined) {
            ContentTypeId.encode(message.type, writer.uint32(10).fork()).ldelim();
        }
        Object.entries(message.parameters).forEach(([key, value]) => {
            EncodedContent_ParametersEntry.encode({ key: key, value }, writer.uint32(18).fork()).ldelim();
        });
        if (message.fallback !== undefined) {
            writer.uint32(26).string(message.fallback);
        }
        if (message.compression !== undefined) {
            writer.uint32(40).int32(message.compression);
        }
        if (message.content.length !== 0) {
            writer.uint32(34).bytes(message.content);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncodedContent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = ContentTypeId.decode(reader, reader.uint32());
                    break;
                case 2:
                    const entry2 = EncodedContent_ParametersEntry.decode(reader, reader.uint32());
                    if (entry2.value !== undefined) {
                        message.parameters[entry2.key] = entry2.value;
                    }
                    break;
                case 3:
                    message.fallback = reader.string();
                    break;
                case 5:
                    message.compression = reader.int32();
                    break;
                case 4:
                    message.content = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            type: isSet(object.type)
                ? ContentTypeId.fromJSON(object.type)
                : undefined,
            parameters: isObject(object.parameters)
                ? Object.entries(object.parameters).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {})
                : {},
            fallback: isSet(object.fallback) ? String(object.fallback) : undefined,
            compression: isSet(object.compression)
                ? compressionFromJSON(object.compression)
                : undefined,
            content: isSet(object.content)
                ? bytesFromBase64(object.content)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined &&
            (obj.type = message.type
                ? ContentTypeId.toJSON(message.type)
                : undefined);
        obj.parameters = {};
        if (message.parameters) {
            Object.entries(message.parameters).forEach(([k, v]) => {
                obj.parameters[k] = v;
            });
        }
        message.fallback !== undefined && (obj.fallback = message.fallback);
        message.compression !== undefined &&
            (obj.compression =
                message.compression !== undefined
                    ? compressionToJSON(message.compression)
                    : undefined);
        message.content !== undefined &&
            (obj.content = base64FromBytes(message.content !== undefined ? message.content : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEncodedContent();
        message.type =
            object.type !== undefined && object.type !== null
                ? ContentTypeId.fromPartial(object.type)
                : undefined;
        message.parameters = Object.entries((_a = object.parameters) !== null && _a !== void 0 ? _a : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = String(value);
            }
            return acc;
        }, {});
        message.fallback = (_b = object.fallback) !== null && _b !== void 0 ? _b : undefined;
        message.compression = (_c = object.compression) !== null && _c !== void 0 ? _c : undefined;
        message.content = (_d = object.content) !== null && _d !== void 0 ? _d : new Uint8Array();
        return message;
    },
};
function createBaseEncodedContent_ParametersEntry() {
    return { key: "", value: "" };
}
export const EncodedContent_ParametersEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncodedContent_ParametersEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            key: isSet(object.key) ? String(object.key) : "",
            value: isSet(object.value) ? String(object.value) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEncodedContent_ParametersEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseSignedContent() {
    return { payload: new Uint8Array(), sender: undefined, signature: undefined };
}
export const SignedContent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.payload.length !== 0) {
            writer.uint32(10).bytes(message.payload);
        }
        if (message.sender !== undefined) {
            SignedPublicKeyBundle.encode(message.sender, writer.uint32(18).fork()).ldelim();
        }
        if (message.signature !== undefined) {
            Signature.encode(message.signature, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedContent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
                    break;
                case 2:
                    message.sender = SignedPublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signature = Signature.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
            sender: isSet(object.sender)
                ? SignedPublicKeyBundle.fromJSON(object.sender)
                : undefined,
            signature: isSet(object.signature)
                ? Signature.fromJSON(object.signature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        message.sender !== undefined &&
            (obj.sender = message.sender
                ? SignedPublicKeyBundle.toJSON(message.sender)
                : undefined);
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? Signature.toJSON(message.signature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSignedContent();
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.sender =
            object.sender !== undefined && object.sender !== null
                ? SignedPublicKeyBundle.fromPartial(object.sender)
                : undefined;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? Signature.fromPartial(object.signature)
                : undefined;
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (globalThis.Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (globalThis.Buffer) {
        return globalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(""));
    }
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=content.pb.js.map