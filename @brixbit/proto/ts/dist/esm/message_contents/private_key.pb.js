/* eslint-disable */
import Long from "long";
import { SignedPublicKey, PublicKey } from "./public_key.pb";
import { Ciphertext } from "./ciphertext.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseSignedPrivateKey() {
    return { createdNs: Long.UZERO, secp256k1: undefined, publicKey: undefined };
}
export const SignedPrivateKey = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.createdNs.isZero()) {
            writer.uint32(8).uint64(message.createdNs);
        }
        if (message.secp256k1 !== undefined) {
            SignedPrivateKey_Secp256k1.encode(message.secp256k1, writer.uint32(18).fork()).ldelim();
        }
        if (message.publicKey !== undefined) {
            SignedPublicKey.encode(message.publicKey, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPrivateKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdNs = reader.uint64();
                    break;
                case 2:
                    message.secp256k1 = SignedPrivateKey_Secp256k1.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.publicKey = SignedPublicKey.decode(reader, reader.uint32());
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
            secp256k1: isSet(object.secp256k1)
                ? SignedPrivateKey_Secp256k1.fromJSON(object.secp256k1)
                : undefined,
            publicKey: isSet(object.publicKey)
                ? SignedPublicKey.fromJSON(object.publicKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        message.secp256k1 !== undefined &&
            (obj.secp256k1 = message.secp256k1
                ? SignedPrivateKey_Secp256k1.toJSON(message.secp256k1)
                : undefined);
        message.publicKey !== undefined &&
            (obj.publicKey = message.publicKey
                ? SignedPublicKey.toJSON(message.publicKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSignedPrivateKey();
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        message.secp256k1 =
            object.secp256k1 !== undefined && object.secp256k1 !== null
                ? SignedPrivateKey_Secp256k1.fromPartial(object.secp256k1)
                : undefined;
        message.publicKey =
            object.publicKey !== undefined && object.publicKey !== null
                ? SignedPublicKey.fromPartial(object.publicKey)
                : undefined;
        return message;
    },
};
function createBaseSignedPrivateKey_Secp256k1() {
    return { bytes: new Uint8Array() };
}
export const SignedPrivateKey_Secp256k1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPrivateKey_Secp256k1();
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
        const message = createBaseSignedPrivateKey_Secp256k1();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBasePrivateKeyBundleV2() {
    return { identityKey: undefined, preKeys: [] };
}
export const PrivateKeyBundleV2 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identityKey !== undefined) {
            SignedPrivateKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.preKeys) {
            SignedPrivateKey.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivateKeyBundleV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = SignedPrivateKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.preKeys.push(SignedPrivateKey.decode(reader, reader.uint32()));
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
                ? SignedPrivateKey.fromJSON(object.identityKey)
                : undefined,
            preKeys: Array.isArray(object === null || object === void 0 ? void 0 : object.preKeys)
                ? object.preKeys.map((e) => SignedPrivateKey.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? SignedPrivateKey.toJSON(message.identityKey)
                : undefined);
        if (message.preKeys) {
            obj.preKeys = message.preKeys.map((e) => e ? SignedPrivateKey.toJSON(e) : undefined);
        }
        else {
            obj.preKeys = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivateKeyBundleV2();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? SignedPrivateKey.fromPartial(object.identityKey)
                : undefined;
        message.preKeys =
            ((_a = object.preKeys) === null || _a === void 0 ? void 0 : _a.map((e) => SignedPrivateKey.fromPartial(e))) || [];
        return message;
    },
};
function createBasePrivateKey() {
    return { timestamp: Long.UZERO, secp256k1: undefined, publicKey: undefined };
}
export const PrivateKey = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.timestamp.isZero()) {
            writer.uint32(8).uint64(message.timestamp);
        }
        if (message.secp256k1 !== undefined) {
            PrivateKey_Secp256k1.encode(message.secp256k1, writer.uint32(18).fork()).ldelim();
        }
        if (message.publicKey !== undefined) {
            PublicKey.encode(message.publicKey, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivateKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestamp = reader.uint64();
                    break;
                case 2:
                    message.secp256k1 = PrivateKey_Secp256k1.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.publicKey = PublicKey.decode(reader, reader.uint32());
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
            secp256k1: isSet(object.secp256k1)
                ? PrivateKey_Secp256k1.fromJSON(object.secp256k1)
                : undefined,
            publicKey: isSet(object.publicKey)
                ? PublicKey.fromJSON(object.publicKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || Long.UZERO).toString());
        message.secp256k1 !== undefined &&
            (obj.secp256k1 = message.secp256k1
                ? PrivateKey_Secp256k1.toJSON(message.secp256k1)
                : undefined);
        message.publicKey !== undefined &&
            (obj.publicKey = message.publicKey
                ? PublicKey.toJSON(message.publicKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrivateKey();
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null
                ? Long.fromValue(object.timestamp)
                : Long.UZERO;
        message.secp256k1 =
            object.secp256k1 !== undefined && object.secp256k1 !== null
                ? PrivateKey_Secp256k1.fromPartial(object.secp256k1)
                : undefined;
        message.publicKey =
            object.publicKey !== undefined && object.publicKey !== null
                ? PublicKey.fromPartial(object.publicKey)
                : undefined;
        return message;
    },
};
function createBasePrivateKey_Secp256k1() {
    return { bytes: new Uint8Array() };
}
export const PrivateKey_Secp256k1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivateKey_Secp256k1();
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
        const message = createBasePrivateKey_Secp256k1();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBasePrivateKeyBundleV1() {
    return { identityKey: undefined, preKeys: [] };
}
export const PrivateKeyBundleV1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identityKey !== undefined) {
            PrivateKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.preKeys) {
            PrivateKey.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivateKeyBundleV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = PrivateKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.preKeys.push(PrivateKey.decode(reader, reader.uint32()));
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
                ? PrivateKey.fromJSON(object.identityKey)
                : undefined,
            preKeys: Array.isArray(object === null || object === void 0 ? void 0 : object.preKeys)
                ? object.preKeys.map((e) => PrivateKey.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? PrivateKey.toJSON(message.identityKey)
                : undefined);
        if (message.preKeys) {
            obj.preKeys = message.preKeys.map((e) => e ? PrivateKey.toJSON(e) : undefined);
        }
        else {
            obj.preKeys = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivateKeyBundleV1();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? PrivateKey.fromPartial(object.identityKey)
                : undefined;
        message.preKeys =
            ((_a = object.preKeys) === null || _a === void 0 ? void 0 : _a.map((e) => PrivateKey.fromPartial(e))) || [];
        return message;
    },
};
function createBasePrivateKeyBundle() {
    return { v1: undefined, v2: undefined };
}
export const PrivateKeyBundle = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            PrivateKeyBundleV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        if (message.v2 !== undefined) {
            PrivateKeyBundleV2.encode(message.v2, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivateKeyBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = PrivateKeyBundleV1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.v2 = PrivateKeyBundleV2.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? PrivateKeyBundleV1.fromJSON(object.v1) : undefined,
            v2: isSet(object.v2) ? PrivateKeyBundleV2.fromJSON(object.v2) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? PrivateKeyBundleV1.toJSON(message.v1) : undefined);
        message.v2 !== undefined &&
            (obj.v2 = message.v2 ? PrivateKeyBundleV2.toJSON(message.v2) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrivateKeyBundle();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? PrivateKeyBundleV1.fromPartial(object.v1)
                : undefined;
        message.v2 =
            object.v2 !== undefined && object.v2 !== null
                ? PrivateKeyBundleV2.fromPartial(object.v2)
                : undefined;
        return message;
    },
};
function createBaseEncryptedPrivateKeyBundleV1() {
    return { walletPreKey: new Uint8Array(), ciphertext: undefined };
}
export const EncryptedPrivateKeyBundleV1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.walletPreKey.length !== 0) {
            writer.uint32(10).bytes(message.walletPreKey);
        }
        if (message.ciphertext !== undefined) {
            Ciphertext.encode(message.ciphertext, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptedPrivateKeyBundleV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.walletPreKey = reader.bytes();
                    break;
                case 2:
                    message.ciphertext = Ciphertext.decode(reader, reader.uint32());
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
            walletPreKey: isSet(object.walletPreKey)
                ? bytesFromBase64(object.walletPreKey)
                : new Uint8Array(),
            ciphertext: isSet(object.ciphertext)
                ? Ciphertext.fromJSON(object.ciphertext)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.walletPreKey !== undefined &&
            (obj.walletPreKey = base64FromBytes(message.walletPreKey !== undefined
                ? message.walletPreKey
                : new Uint8Array()));
        message.ciphertext !== undefined &&
            (obj.ciphertext = message.ciphertext
                ? Ciphertext.toJSON(message.ciphertext)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEncryptedPrivateKeyBundleV1();
        message.walletPreKey = (_a = object.walletPreKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.ciphertext =
            object.ciphertext !== undefined && object.ciphertext !== null
                ? Ciphertext.fromPartial(object.ciphertext)
                : undefined;
        return message;
    },
};
function createBaseEncryptedPrivateKeyBundle() {
    return { v1: undefined };
}
export const EncryptedPrivateKeyBundle = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            EncryptedPrivateKeyBundleV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptedPrivateKeyBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = EncryptedPrivateKeyBundleV1.decode(reader, reader.uint32());
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
                ? EncryptedPrivateKeyBundleV1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? EncryptedPrivateKeyBundleV1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEncryptedPrivateKeyBundle();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? EncryptedPrivateKeyBundleV1.fromPartial(object.v1)
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
//# sourceMappingURL=private_key.pb.js.map