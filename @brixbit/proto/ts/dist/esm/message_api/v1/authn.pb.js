/* eslint-disable */
import Long from "long";
import { PublicKey } from "../../message_contents/public_key.pb";
import { Signature } from "../../message_contents/signature.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_api.v1";
function createBaseToken() {
    return {
        identityKey: undefined,
        authDataBytes: new Uint8Array(),
        authDataSignature: undefined,
    };
}
export const Token = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identityKey !== undefined) {
            PublicKey.encode(message.identityKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.authDataBytes.length !== 0) {
            writer.uint32(18).bytes(message.authDataBytes);
        }
        if (message.authDataSignature !== undefined) {
            Signature.encode(message.authDataSignature, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identityKey = PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.authDataBytes = reader.bytes();
                    break;
                case 3:
                    message.authDataSignature = Signature.decode(reader, reader.uint32());
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
            authDataBytes: isSet(object.authDataBytes)
                ? bytesFromBase64(object.authDataBytes)
                : new Uint8Array(),
            authDataSignature: isSet(object.authDataSignature)
                ? Signature.fromJSON(object.authDataSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey
                ? PublicKey.toJSON(message.identityKey)
                : undefined);
        message.authDataBytes !== undefined &&
            (obj.authDataBytes = base64FromBytes(message.authDataBytes !== undefined
                ? message.authDataBytes
                : new Uint8Array()));
        message.authDataSignature !== undefined &&
            (obj.authDataSignature = message.authDataSignature
                ? Signature.toJSON(message.authDataSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseToken();
        message.identityKey =
            object.identityKey !== undefined && object.identityKey !== null
                ? PublicKey.fromPartial(object.identityKey)
                : undefined;
        message.authDataBytes = (_a = object.authDataBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.authDataSignature =
            object.authDataSignature !== undefined &&
                object.authDataSignature !== null
                ? Signature.fromPartial(object.authDataSignature)
                : undefined;
        return message;
    },
};
function createBaseAuthData() {
    return { walletAddr: "", createdNs: Long.UZERO };
}
export const AuthData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.walletAddr !== "") {
            writer.uint32(10).string(message.walletAddr);
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(16).uint64(message.createdNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAuthData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.walletAddr = reader.string();
                    break;
                case 2:
                    message.createdNs = reader.uint64();
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
            walletAddr: isSet(object.walletAddr) ? String(object.walletAddr) : "",
            createdNs: isSet(object.createdNs)
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.walletAddr !== undefined && (obj.walletAddr = message.walletAddr);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseAuthData();
        message.walletAddr = (_a = object.walletAddr) !== null && _a !== void 0 ? _a : "";
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
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
//# sourceMappingURL=authn.pb.js.map