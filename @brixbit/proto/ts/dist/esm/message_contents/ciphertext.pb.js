/* eslint-disable */
import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseCiphertext() {
    return { aes256GcmHkdfSha256: undefined };
}
export const Ciphertext = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.aes256GcmHkdfSha256 !== undefined) {
            Ciphertext_Aes256gcmHkdfsha256.encode(message.aes256GcmHkdfSha256, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCiphertext();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.aes256GcmHkdfSha256 = Ciphertext_Aes256gcmHkdfsha256.decode(reader, reader.uint32());
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
            aes256GcmHkdfSha256: isSet(object.aes256GcmHkdfSha256)
                ? Ciphertext_Aes256gcmHkdfsha256.fromJSON(object.aes256GcmHkdfSha256)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.aes256GcmHkdfSha256 !== undefined &&
            (obj.aes256GcmHkdfSha256 = message.aes256GcmHkdfSha256
                ? Ciphertext_Aes256gcmHkdfsha256.toJSON(message.aes256GcmHkdfSha256)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCiphertext();
        message.aes256GcmHkdfSha256 =
            object.aes256GcmHkdfSha256 !== undefined &&
                object.aes256GcmHkdfSha256 !== null
                ? Ciphertext_Aes256gcmHkdfsha256.fromPartial(object.aes256GcmHkdfSha256)
                : undefined;
        return message;
    },
};
function createBaseCiphertext_Aes256gcmHkdfsha256() {
    return {
        hkdfSalt: new Uint8Array(),
        gcmNonce: new Uint8Array(),
        payload: new Uint8Array(),
    };
}
export const Ciphertext_Aes256gcmHkdfsha256 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hkdfSalt.length !== 0) {
            writer.uint32(10).bytes(message.hkdfSalt);
        }
        if (message.gcmNonce.length !== 0) {
            writer.uint32(18).bytes(message.gcmNonce);
        }
        if (message.payload.length !== 0) {
            writer.uint32(26).bytes(message.payload);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCiphertext_Aes256gcmHkdfsha256();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hkdfSalt = reader.bytes();
                    break;
                case 2:
                    message.gcmNonce = reader.bytes();
                    break;
                case 3:
                    message.payload = reader.bytes();
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
            hkdfSalt: isSet(object.hkdfSalt)
                ? bytesFromBase64(object.hkdfSalt)
                : new Uint8Array(),
            gcmNonce: isSet(object.gcmNonce)
                ? bytesFromBase64(object.gcmNonce)
                : new Uint8Array(),
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.hkdfSalt !== undefined &&
            (obj.hkdfSalt = base64FromBytes(message.hkdfSalt !== undefined ? message.hkdfSalt : new Uint8Array()));
        message.gcmNonce !== undefined &&
            (obj.gcmNonce = base64FromBytes(message.gcmNonce !== undefined ? message.gcmNonce : new Uint8Array()));
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseCiphertext_Aes256gcmHkdfsha256();
        message.hkdfSalt = (_a = object.hkdfSalt) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.gcmNonce = (_b = object.gcmNonce) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.payload = (_c = object.payload) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseSignedEciesCiphertext() {
    return { eciesBytes: new Uint8Array(), signature: undefined };
}
export const SignedEciesCiphertext = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.eciesBytes.length !== 0) {
            writer.uint32(10).bytes(message.eciesBytes);
        }
        if (message.signature !== undefined) {
            Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedEciesCiphertext();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.eciesBytes = reader.bytes();
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
            eciesBytes: isSet(object.eciesBytes)
                ? bytesFromBase64(object.eciesBytes)
                : new Uint8Array(),
            signature: isSet(object.signature)
                ? Signature.fromJSON(object.signature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.eciesBytes !== undefined &&
            (obj.eciesBytes = base64FromBytes(message.eciesBytes !== undefined ? message.eciesBytes : new Uint8Array()));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? Signature.toJSON(message.signature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSignedEciesCiphertext();
        message.eciesBytes = (_a = object.eciesBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? Signature.fromPartial(object.signature)
                : undefined;
        return message;
    },
};
function createBaseSignedEciesCiphertext_Ecies() {
    return {
        ephemeralPublicKey: new Uint8Array(),
        iv: new Uint8Array(),
        mac: new Uint8Array(),
        ciphertext: new Uint8Array(),
    };
}
export const SignedEciesCiphertext_Ecies = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.ephemeralPublicKey.length !== 0) {
            writer.uint32(10).bytes(message.ephemeralPublicKey);
        }
        if (message.iv.length !== 0) {
            writer.uint32(18).bytes(message.iv);
        }
        if (message.mac.length !== 0) {
            writer.uint32(26).bytes(message.mac);
        }
        if (message.ciphertext.length !== 0) {
            writer.uint32(34).bytes(message.ciphertext);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedEciesCiphertext_Ecies();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ephemeralPublicKey = reader.bytes();
                    break;
                case 2:
                    message.iv = reader.bytes();
                    break;
                case 3:
                    message.mac = reader.bytes();
                    break;
                case 4:
                    message.ciphertext = reader.bytes();
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
            ephemeralPublicKey: isSet(object.ephemeralPublicKey)
                ? bytesFromBase64(object.ephemeralPublicKey)
                : new Uint8Array(),
            iv: isSet(object.iv) ? bytesFromBase64(object.iv) : new Uint8Array(),
            mac: isSet(object.mac) ? bytesFromBase64(object.mac) : new Uint8Array(),
            ciphertext: isSet(object.ciphertext)
                ? bytesFromBase64(object.ciphertext)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.ephemeralPublicKey !== undefined &&
            (obj.ephemeralPublicKey = base64FromBytes(message.ephemeralPublicKey !== undefined
                ? message.ephemeralPublicKey
                : new Uint8Array()));
        message.iv !== undefined &&
            (obj.iv = base64FromBytes(message.iv !== undefined ? message.iv : new Uint8Array()));
        message.mac !== undefined &&
            (obj.mac = base64FromBytes(message.mac !== undefined ? message.mac : new Uint8Array()));
        message.ciphertext !== undefined &&
            (obj.ciphertext = base64FromBytes(message.ciphertext !== undefined ? message.ciphertext : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseSignedEciesCiphertext_Ecies();
        message.ephemeralPublicKey = (_a = object.ephemeralPublicKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.iv = (_b = object.iv) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.mac = (_c = object.mac) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.ciphertext = (_d = object.ciphertext) !== null && _d !== void 0 ? _d : new Uint8Array();
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
//# sourceMappingURL=ciphertext.pb.js.map