"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHistoryKeyType = exports.MessageHistoryReply = exports.MessageHistoryRequest = exports.PlaintextEnvelope_V2 = exports.PlaintextEnvelope_V1 = exports.PlaintextEnvelope = exports.EncodedContent_ParametersEntry = exports.EncodedContent = exports.ContentTypeId = exports.compressionToJSON = exports.compressionFromJSON = exports.Compression = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.mls.message_contents";
/**
 * Message content encoding structures
 * Copied from V2 code so that we can eventually retire all V2 message content
 */
/**
 * Recognized compression algorithms
 * protolint:disable ENUM_FIELD_NAMES_ZERO_VALUE_END_WITH
 */
var Compression;
(function (Compression) {
    Compression[Compression["COMPRESSION_DEFLATE"] = 0] = "COMPRESSION_DEFLATE";
    Compression[Compression["COMPRESSION_GZIP"] = 1] = "COMPRESSION_GZIP";
    Compression[Compression["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Compression = exports.Compression || (exports.Compression = {}));
function compressionFromJSON(object) {
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
exports.compressionFromJSON = compressionFromJSON;
function compressionToJSON(object) {
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
exports.compressionToJSON = compressionToJSON;
function createBaseContentTypeId() {
    return { authorityId: "", typeId: "", versionMajor: 0, versionMinor: 0 };
}
exports.ContentTypeId = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.EncodedContent = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== undefined) {
            exports.ContentTypeId.encode(message.type, writer.uint32(10).fork()).ldelim();
        }
        Object.entries(message.parameters).forEach(([key, value]) => {
            exports.EncodedContent_ParametersEntry.encode({ key: key, value }, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncodedContent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = exports.ContentTypeId.decode(reader, reader.uint32());
                    break;
                case 2:
                    const entry2 = exports.EncodedContent_ParametersEntry.decode(reader, reader.uint32());
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
                ? exports.ContentTypeId.fromJSON(object.type)
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
                ? exports.ContentTypeId.toJSON(message.type)
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
                ? exports.ContentTypeId.fromPartial(object.type)
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
exports.EncodedContent_ParametersEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
function createBasePlaintextEnvelope() {
    return { v1: undefined, v2: undefined };
}
exports.PlaintextEnvelope = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.PlaintextEnvelope_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        if (message.v2 !== undefined) {
            exports.PlaintextEnvelope_V2.encode(message.v2, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePlaintextEnvelope();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.PlaintextEnvelope_V1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.v2 = exports.PlaintextEnvelope_V2.decode(reader, reader.uint32());
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
            v1: isSet(object.v1)
                ? exports.PlaintextEnvelope_V1.fromJSON(object.v1)
                : undefined,
            v2: isSet(object.v2)
                ? exports.PlaintextEnvelope_V2.fromJSON(object.v2)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? exports.PlaintextEnvelope_V1.toJSON(message.v1)
                : undefined);
        message.v2 !== undefined &&
            (obj.v2 = message.v2
                ? exports.PlaintextEnvelope_V2.toJSON(message.v2)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePlaintextEnvelope();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.PlaintextEnvelope_V1.fromPartial(object.v1)
                : undefined;
        message.v2 =
            object.v2 !== undefined && object.v2 !== null
                ? exports.PlaintextEnvelope_V2.fromPartial(object.v2)
                : undefined;
        return message;
    },
};
function createBasePlaintextEnvelope_V1() {
    return { content: new Uint8Array(), idempotencyKey: "" };
}
exports.PlaintextEnvelope_V1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.content.length !== 0) {
            writer.uint32(10).bytes(message.content);
        }
        if (message.idempotencyKey !== "") {
            writer.uint32(18).string(message.idempotencyKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePlaintextEnvelope_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.content = reader.bytes();
                    break;
                case 2:
                    message.idempotencyKey = reader.string();
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
            content: isSet(object.content)
                ? bytesFromBase64(object.content)
                : new Uint8Array(),
            idempotencyKey: isSet(object.idempotencyKey)
                ? String(object.idempotencyKey)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.content !== undefined &&
            (obj.content = base64FromBytes(message.content !== undefined ? message.content : new Uint8Array()));
        message.idempotencyKey !== undefined &&
            (obj.idempotencyKey = message.idempotencyKey);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePlaintextEnvelope_V1();
        message.content = (_a = object.content) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.idempotencyKey = (_b = object.idempotencyKey) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBasePlaintextEnvelope_V2() {
    return {
        idempotencyKey: "",
        content: undefined,
        request: undefined,
        reply: undefined,
    };
}
exports.PlaintextEnvelope_V2 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.idempotencyKey !== "") {
            writer.uint32(10).string(message.idempotencyKey);
        }
        if (message.content !== undefined) {
            writer.uint32(18).bytes(message.content);
        }
        if (message.request !== undefined) {
            exports.MessageHistoryRequest.encode(message.request, writer.uint32(26).fork()).ldelim();
        }
        if (message.reply !== undefined) {
            exports.MessageHistoryReply.encode(message.reply, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePlaintextEnvelope_V2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.idempotencyKey = reader.string();
                    break;
                case 2:
                    message.content = reader.bytes();
                    break;
                case 3:
                    message.request = exports.MessageHistoryRequest.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.reply = exports.MessageHistoryReply.decode(reader, reader.uint32());
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
            idempotencyKey: isSet(object.idempotencyKey)
                ? String(object.idempotencyKey)
                : "",
            content: isSet(object.content)
                ? bytesFromBase64(object.content)
                : undefined,
            request: isSet(object.request)
                ? exports.MessageHistoryRequest.fromJSON(object.request)
                : undefined,
            reply: isSet(object.reply)
                ? exports.MessageHistoryReply.fromJSON(object.reply)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.idempotencyKey !== undefined &&
            (obj.idempotencyKey = message.idempotencyKey);
        message.content !== undefined &&
            (obj.content =
                message.content !== undefined
                    ? base64FromBytes(message.content)
                    : undefined);
        message.request !== undefined &&
            (obj.request = message.request
                ? exports.MessageHistoryRequest.toJSON(message.request)
                : undefined);
        message.reply !== undefined &&
            (obj.reply = message.reply
                ? exports.MessageHistoryReply.toJSON(message.reply)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePlaintextEnvelope_V2();
        message.idempotencyKey = (_a = object.idempotencyKey) !== null && _a !== void 0 ? _a : "";
        message.content = (_b = object.content) !== null && _b !== void 0 ? _b : undefined;
        message.request =
            object.request !== undefined && object.request !== null
                ? exports.MessageHistoryRequest.fromPartial(object.request)
                : undefined;
        message.reply =
            object.reply !== undefined && object.reply !== null
                ? exports.MessageHistoryReply.fromPartial(object.reply)
                : undefined;
        return message;
    },
};
function createBaseMessageHistoryRequest() {
    return { requestId: "", pinCode: "" };
}
exports.MessageHistoryRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.requestId !== "") {
            writer.uint32(10).string(message.requestId);
        }
        if (message.pinCode !== "") {
            writer.uint32(18).string(message.pinCode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageHistoryRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = reader.string();
                    break;
                case 2:
                    message.pinCode = reader.string();
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
            requestId: isSet(object.requestId) ? String(object.requestId) : "",
            pinCode: isSet(object.pinCode) ? String(object.pinCode) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.requestId !== undefined && (obj.requestId = message.requestId);
        message.pinCode !== undefined && (obj.pinCode = message.pinCode);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMessageHistoryRequest();
        message.requestId = (_a = object.requestId) !== null && _a !== void 0 ? _a : "";
        message.pinCode = (_b = object.pinCode) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMessageHistoryReply() {
    return {
        requestId: "",
        url: "",
        encryptionKey: undefined,
        signingKey: undefined,
        bundleHash: new Uint8Array(),
    };
}
exports.MessageHistoryReply = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.requestId !== "") {
            writer.uint32(10).string(message.requestId);
        }
        if (message.url !== "") {
            writer.uint32(18).string(message.url);
        }
        if (message.encryptionKey !== undefined) {
            exports.MessageHistoryKeyType.encode(message.encryptionKey, writer.uint32(26).fork()).ldelim();
        }
        if (message.signingKey !== undefined) {
            exports.MessageHistoryKeyType.encode(message.signingKey, writer.uint32(34).fork()).ldelim();
        }
        if (message.bundleHash.length !== 0) {
            writer.uint32(42).bytes(message.bundleHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageHistoryReply();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = reader.string();
                    break;
                case 2:
                    message.url = reader.string();
                    break;
                case 3:
                    message.encryptionKey = exports.MessageHistoryKeyType.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.signingKey = exports.MessageHistoryKeyType.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.bundleHash = reader.bytes();
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
            requestId: isSet(object.requestId) ? String(object.requestId) : "",
            url: isSet(object.url) ? String(object.url) : "",
            encryptionKey: isSet(object.encryptionKey)
                ? exports.MessageHistoryKeyType.fromJSON(object.encryptionKey)
                : undefined,
            signingKey: isSet(object.signingKey)
                ? exports.MessageHistoryKeyType.fromJSON(object.signingKey)
                : undefined,
            bundleHash: isSet(object.bundleHash)
                ? bytesFromBase64(object.bundleHash)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.requestId !== undefined && (obj.requestId = message.requestId);
        message.url !== undefined && (obj.url = message.url);
        message.encryptionKey !== undefined &&
            (obj.encryptionKey = message.encryptionKey
                ? exports.MessageHistoryKeyType.toJSON(message.encryptionKey)
                : undefined);
        message.signingKey !== undefined &&
            (obj.signingKey = message.signingKey
                ? exports.MessageHistoryKeyType.toJSON(message.signingKey)
                : undefined);
        message.bundleHash !== undefined &&
            (obj.bundleHash = base64FromBytes(message.bundleHash !== undefined ? message.bundleHash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMessageHistoryReply();
        message.requestId = (_a = object.requestId) !== null && _a !== void 0 ? _a : "";
        message.url = (_b = object.url) !== null && _b !== void 0 ? _b : "";
        message.encryptionKey =
            object.encryptionKey !== undefined && object.encryptionKey !== null
                ? exports.MessageHistoryKeyType.fromPartial(object.encryptionKey)
                : undefined;
        message.signingKey =
            object.signingKey !== undefined && object.signingKey !== null
                ? exports.MessageHistoryKeyType.fromPartial(object.signingKey)
                : undefined;
        message.bundleHash = (_c = object.bundleHash) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseMessageHistoryKeyType() {
    return { chacha20Poly1305: undefined };
}
exports.MessageHistoryKeyType = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chacha20Poly1305 !== undefined) {
            writer.uint32(10).bytes(message.chacha20Poly1305);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageHistoryKeyType();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chacha20Poly1305 = reader.bytes();
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
            chacha20Poly1305: isSet(object.chacha20Poly1305)
                ? bytesFromBase64(object.chacha20Poly1305)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.chacha20Poly1305 !== undefined &&
            (obj.chacha20Poly1305 =
                message.chacha20Poly1305 !== undefined
                    ? base64FromBytes(message.chacha20Poly1305)
                    : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMessageHistoryKeyType();
        message.chacha20Poly1305 = (_a = object.chacha20Poly1305) !== null && _a !== void 0 ? _a : undefined;
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
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=content.pb.js.map