"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKeyBundle = exports.PublicKey_Secp256k1Uncompressed = exports.PublicKey = exports.SignedPublicKeyBundle = exports.SignedPublicKey = exports.UnsignedPublicKey_Secp256k1Uncompressed = exports.UnsignedPublicKey = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const signature_pb_1 = require("./signature.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBaseUnsignedPublicKey() {
    return { createdNs: long_1.default.UZERO, secp256k1Uncompressed: undefined };
}
exports.UnsignedPublicKey = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.createdNs.isZero()) {
            writer.uint32(8).uint64(message.createdNs);
        }
        if (message.secp256k1Uncompressed !== undefined) {
            exports.UnsignedPublicKey_Secp256k1Uncompressed.encode(message.secp256k1Uncompressed, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUnsignedPublicKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdNs = reader.uint64();
                    break;
                case 3:
                    message.secp256k1Uncompressed =
                        exports.UnsignedPublicKey_Secp256k1Uncompressed.decode(reader, reader.uint32());
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
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
            secp256k1Uncompressed: isSet(object.secp256k1Uncompressed)
                ? exports.UnsignedPublicKey_Secp256k1Uncompressed.fromJSON(object.secp256k1Uncompressed)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        message.secp256k1Uncompressed !== undefined &&
            (obj.secp256k1Uncompressed = message.secp256k1Uncompressed
                ? exports.UnsignedPublicKey_Secp256k1Uncompressed.toJSON(message.secp256k1Uncompressed)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUnsignedPublicKey();
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.secp256k1Uncompressed =
            object.secp256k1Uncompressed !== undefined &&
                object.secp256k1Uncompressed !== null
                ? exports.UnsignedPublicKey_Secp256k1Uncompressed.fromPartial(object.secp256k1Uncompressed)
                : undefined;
        return message;
    },
};
function createBaseUnsignedPublicKey_Secp256k1Uncompressed() {
    return { bytes: new Uint8Array() };
}
exports.UnsignedPublicKey_Secp256k1Uncompressed = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUnsignedPublicKey_Secp256k1Uncompressed();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
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
            bytes: isSet(object.bytes)
                ? bytesFromBase64(object.bytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseUnsignedPublicKey_Secp256k1Uncompressed();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseSignedPublicKey() {
    return { keyBytes: new Uint8Array(), signature: undefined };
}
exports.SignedPublicKey = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyBytes.length !== 0) {
            writer.uint32(10).bytes(message.keyBytes);
        }
        if (message.signature !== undefined) {
            signature_pb_1.Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPublicKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyBytes = reader.bytes();
                    break;
                case 2:
                    message.signature = signature_pb_1.Signature.decode(reader, reader.uint32());
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
            keyBytes: isSet(object.keyBytes)
                ? bytesFromBase64(object.keyBytes)
                : new Uint8Array(),
            signature: isSet(object.signature)
                ? signature_pb_1.Signature.fromJSON(object.signature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyBytes !== undefined &&
            (obj.keyBytes = base64FromBytes(message.keyBytes !== undefined ? message.keyBytes : new Uint8Array()));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? signature_pb_1.Signature.toJSON(message.signature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSignedPublicKey();
        message.keyBytes = (_a = object.keyBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? signature_pb_1.Signature.fromPartial(object.signature)
                : undefined;
        return message;
    },
};
function createBaseSignedPublicKeyBundle() {
    return { identityKey: undefined, preKey: undefined };
}
exports.SignedPublicKeyBundle = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.identityKey !== undefined) {
            exports.SignedPublicKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.preKey !== undefined) {
            exports.SignedPublicKey.encode(message.preKey, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPublicKeyBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = exports.SignedPublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.preKey = exports.SignedPublicKey.decode(reader, reader.uint32());
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
            identityKey: isSet(object.identityKey)
                ? exports.SignedPublicKey.fromJSON(object.identityKey)
                : undefined,
            preKey: isSet(object.preKey)
                ? exports.SignedPublicKey.fromJSON(object.preKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? exports.SignedPublicKey.toJSON(message.identityKey)
                : undefined);
        message.preKey !== undefined &&
            (obj.preKey = message.preKey
                ? exports.SignedPublicKey.toJSON(message.preKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSignedPublicKeyBundle();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? exports.SignedPublicKey.fromPartial(object.identityKey)
                : undefined;
        message.preKey =
            object.preKey !== undefined && object.preKey !== null
                ? exports.SignedPublicKey.fromPartial(object.preKey)
                : undefined;
        return message;
    },
};
function createBasePublicKey() {
    return {
        timestamp: long_1.default.UZERO,
        signature: undefined,
        secp256k1Uncompressed: undefined,
    };
}
exports.PublicKey = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.timestamp.isZero()) {
            writer.uint32(8).uint64(message.timestamp);
        }
        if (message.signature !== undefined) {
            signature_pb_1.Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        if (message.secp256k1Uncompressed !== undefined) {
            exports.PublicKey_Secp256k1Uncompressed.encode(message.secp256k1Uncompressed, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePublicKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestamp = reader.uint64();
                    break;
                case 2:
                    message.signature = signature_pb_1.Signature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.secp256k1Uncompressed =
                        exports.PublicKey_Secp256k1Uncompressed.decode(reader, reader.uint32());
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
            timestamp: isSet(object.timestamp)
                ? long_1.default.fromValue(object.timestamp)
                : long_1.default.UZERO,
            signature: isSet(object.signature)
                ? signature_pb_1.Signature.fromJSON(object.signature)
                : undefined,
            secp256k1Uncompressed: isSet(object.secp256k1Uncompressed)
                ? exports.PublicKey_Secp256k1Uncompressed.fromJSON(object.secp256k1Uncompressed)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || long_1.default.UZERO).toString());
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? signature_pb_1.Signature.toJSON(message.signature)
                : undefined);
        message.secp256k1Uncompressed !== undefined &&
            (obj.secp256k1Uncompressed = message.secp256k1Uncompressed
                ? exports.PublicKey_Secp256k1Uncompressed.toJSON(message.secp256k1Uncompressed)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePublicKey();
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null
                ? long_1.default.fromValue(object.timestamp)
                : long_1.default.UZERO;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? signature_pb_1.Signature.fromPartial(object.signature)
                : undefined;
        message.secp256k1Uncompressed =
            object.secp256k1Uncompressed !== undefined &&
                object.secp256k1Uncompressed !== null
                ? exports.PublicKey_Secp256k1Uncompressed.fromPartial(object.secp256k1Uncompressed)
                : undefined;
        return message;
    },
};
function createBasePublicKey_Secp256k1Uncompressed() {
    return { bytes: new Uint8Array() };
}
exports.PublicKey_Secp256k1Uncompressed = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePublicKey_Secp256k1Uncompressed();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
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
            bytes: isSet(object.bytes)
                ? bytesFromBase64(object.bytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePublicKey_Secp256k1Uncompressed();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBasePublicKeyBundle() {
    return { identityKey: undefined, preKey: undefined };
}
exports.PublicKeyBundle = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.identityKey !== undefined) {
            exports.PublicKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.preKey !== undefined) {
            exports.PublicKey.encode(message.preKey, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePublicKeyBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = exports.PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.preKey = exports.PublicKey.decode(reader, reader.uint32());
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
            identityKey: isSet(object.identityKey)
                ? exports.PublicKey.fromJSON(object.identityKey)
                : undefined,
            preKey: isSet(object.preKey)
                ? exports.PublicKey.fromJSON(object.preKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? exports.PublicKey.toJSON(message.identityKey)
                : undefined);
        message.preKey !== undefined &&
            (obj.preKey = message.preKey
                ? exports.PublicKey.toJSON(message.preKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePublicKeyBundle();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? exports.PublicKey.fromPartial(object.identityKey)
                : undefined;
        message.preKey =
            object.preKey !== undefined && object.preKey !== null
                ? exports.PublicKey.fromPartial(object.preKey)
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
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=public_key.pb.js.map