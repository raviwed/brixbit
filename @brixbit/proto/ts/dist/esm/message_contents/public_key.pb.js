/* eslint-disable */
import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseUnsignedPublicKey() {
    return { createdNs: Long.UZERO, secp256k1Uncompressed: undefined };
}
export const UnsignedPublicKey = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.createdNs.isZero()) {
            writer.uint32(8).uint64(message.createdNs);
        }
        if (message.secp256k1Uncompressed !== undefined) {
            UnsignedPublicKey_Secp256k1Uncompressed.encode(message.secp256k1Uncompressed, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
                        UnsignedPublicKey_Secp256k1Uncompressed.decode(reader, reader.uint32());
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
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
            secp256k1Uncompressed: isSet(object.secp256k1Uncompressed)
                ? UnsignedPublicKey_Secp256k1Uncompressed.fromJSON(object.secp256k1Uncompressed)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        message.secp256k1Uncompressed !== undefined &&
            (obj.secp256k1Uncompressed = message.secp256k1Uncompressed
                ? UnsignedPublicKey_Secp256k1Uncompressed.toJSON(message.secp256k1Uncompressed)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUnsignedPublicKey();
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        message.secp256k1Uncompressed =
            object.secp256k1Uncompressed !== undefined &&
                object.secp256k1Uncompressed !== null
                ? UnsignedPublicKey_Secp256k1Uncompressed.fromPartial(object.secp256k1Uncompressed)
                : undefined;
        return message;
    },
};
function createBaseUnsignedPublicKey_Secp256k1Uncompressed() {
    return { bytes: new Uint8Array() };
}
export const UnsignedPublicKey_Secp256k1Uncompressed = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const SignedPublicKey = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyBytes.length !== 0) {
            writer.uint32(10).bytes(message.keyBytes);
        }
        if (message.signature !== undefined) {
            Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPublicKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyBytes = reader.bytes();
                    break;
                case 2:
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
            keyBytes: isSet(object.keyBytes)
                ? bytesFromBase64(object.keyBytes)
                : new Uint8Array(),
            signature: isSet(object.signature)
                ? Signature.fromJSON(object.signature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyBytes !== undefined &&
            (obj.keyBytes = base64FromBytes(message.keyBytes !== undefined ? message.keyBytes : new Uint8Array()));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? Signature.toJSON(message.signature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSignedPublicKey();
        message.keyBytes = (_a = object.keyBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? Signature.fromPartial(object.signature)
                : undefined;
        return message;
    },
};
function createBaseSignedPublicKeyBundle() {
    return { identityKey: undefined, preKey: undefined };
}
export const SignedPublicKeyBundle = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identityKey !== undefined) {
            SignedPublicKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.preKey !== undefined) {
            SignedPublicKey.encode(message.preKey, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPublicKeyBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = SignedPublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.preKey = SignedPublicKey.decode(reader, reader.uint32());
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
                ? SignedPublicKey.fromJSON(object.identityKey)
                : undefined,
            preKey: isSet(object.preKey)
                ? SignedPublicKey.fromJSON(object.preKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? SignedPublicKey.toJSON(message.identityKey)
                : undefined);
        message.preKey !== undefined &&
            (obj.preKey = message.preKey
                ? SignedPublicKey.toJSON(message.preKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSignedPublicKeyBundle();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? SignedPublicKey.fromPartial(object.identityKey)
                : undefined;
        message.preKey =
            object.preKey !== undefined && object.preKey !== null
                ? SignedPublicKey.fromPartial(object.preKey)
                : undefined;
        return message;
    },
};
function createBasePublicKey() {
    return {
        timestamp: Long.UZERO,
        signature: undefined,
        secp256k1Uncompressed: undefined,
    };
}
export const PublicKey = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.timestamp.isZero()) {
            writer.uint32(8).uint64(message.timestamp);
        }
        if (message.signature !== undefined) {
            Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        if (message.secp256k1Uncompressed !== undefined) {
            PublicKey_Secp256k1Uncompressed.encode(message.secp256k1Uncompressed, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePublicKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestamp = reader.uint64();
                    break;
                case 2:
                    message.signature = Signature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.secp256k1Uncompressed =
                        PublicKey_Secp256k1Uncompressed.decode(reader, reader.uint32());
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
                ? Long.fromValue(object.timestamp)
                : Long.UZERO,
            signature: isSet(object.signature)
                ? Signature.fromJSON(object.signature)
                : undefined,
            secp256k1Uncompressed: isSet(object.secp256k1Uncompressed)
                ? PublicKey_Secp256k1Uncompressed.fromJSON(object.secp256k1Uncompressed)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || Long.UZERO).toString());
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? Signature.toJSON(message.signature)
                : undefined);
        message.secp256k1Uncompressed !== undefined &&
            (obj.secp256k1Uncompressed = message.secp256k1Uncompressed
                ? PublicKey_Secp256k1Uncompressed.toJSON(message.secp256k1Uncompressed)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePublicKey();
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null
                ? Long.fromValue(object.timestamp)
                : Long.UZERO;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? Signature.fromPartial(object.signature)
                : undefined;
        message.secp256k1Uncompressed =
            object.secp256k1Uncompressed !== undefined &&
                object.secp256k1Uncompressed !== null
                ? PublicKey_Secp256k1Uncompressed.fromPartial(object.secp256k1Uncompressed)
                : undefined;
        return message;
    },
};
function createBasePublicKey_Secp256k1Uncompressed() {
    return { bytes: new Uint8Array() };
}
export const PublicKey_Secp256k1Uncompressed = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PublicKeyBundle = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identityKey !== undefined) {
            PublicKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.preKey !== undefined) {
            PublicKey.encode(message.preKey, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePublicKeyBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.preKey = PublicKey.decode(reader, reader.uint32());
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
                ? PublicKey.fromJSON(object.identityKey)
                : undefined,
            preKey: isSet(object.preKey)
                ? PublicKey.fromJSON(object.preKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? PublicKey.toJSON(message.identityKey)
                : undefined);
        message.preKey !== undefined &&
            (obj.preKey = message.preKey
                ? PublicKey.toJSON(message.preKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePublicKeyBundle();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? PublicKey.fromPartial(object.identityKey)
                : undefined;
        message.preKey =
            object.preKey !== undefined && object.preKey !== null
                ? PublicKey.fromPartial(object.preKey)
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
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=public_key.pb.js.map