/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseSignature() {
    return { ecdsaCompact: undefined, walletEcdsaCompact: undefined };
}
export const Signature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.ecdsaCompact !== undefined) {
            Signature_ECDSACompact.encode(message.ecdsaCompact, writer.uint32(10).fork()).ldelim();
        }
        if (message.walletEcdsaCompact !== undefined) {
            Signature_WalletECDSACompact.encode(message.walletEcdsaCompact, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ecdsaCompact = Signature_ECDSACompact.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.walletEcdsaCompact = Signature_WalletECDSACompact.decode(reader, reader.uint32());
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
            ecdsaCompact: isSet(object.ecdsaCompact)
                ? Signature_ECDSACompact.fromJSON(object.ecdsaCompact)
                : undefined,
            walletEcdsaCompact: isSet(object.walletEcdsaCompact)
                ? Signature_WalletECDSACompact.fromJSON(object.walletEcdsaCompact)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.ecdsaCompact !== undefined &&
            (obj.ecdsaCompact = message.ecdsaCompact
                ? Signature_ECDSACompact.toJSON(message.ecdsaCompact)
                : undefined);
        message.walletEcdsaCompact !== undefined &&
            (obj.walletEcdsaCompact = message.walletEcdsaCompact
                ? Signature_WalletECDSACompact.toJSON(message.walletEcdsaCompact)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSignature();
        message.ecdsaCompact =
            object.ecdsaCompact !== undefined && object.ecdsaCompact !== null
                ? Signature_ECDSACompact.fromPartial(object.ecdsaCompact)
                : undefined;
        message.walletEcdsaCompact =
            object.walletEcdsaCompact !== undefined &&
                object.walletEcdsaCompact !== null
                ? Signature_WalletECDSACompact.fromPartial(object.walletEcdsaCompact)
                : undefined;
        return message;
    },
};
function createBaseSignature_ECDSACompact() {
    return { bytes: new Uint8Array(), recovery: 0 };
}
export const Signature_ECDSACompact = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        if (message.recovery !== 0) {
            writer.uint32(16).uint32(message.recovery);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignature_ECDSACompact();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
                    break;
                case 2:
                    message.recovery = reader.uint32();
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
            recovery: isSet(object.recovery) ? Number(object.recovery) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        message.recovery !== undefined &&
            (obj.recovery = Math.round(message.recovery));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseSignature_ECDSACompact();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.recovery = (_b = object.recovery) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseSignature_WalletECDSACompact() {
    return { bytes: new Uint8Array(), recovery: 0 };
}
export const Signature_WalletECDSACompact = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        if (message.recovery !== 0) {
            writer.uint32(16).uint32(message.recovery);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignature_WalletECDSACompact();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
                    break;
                case 2:
                    message.recovery = reader.uint32();
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
            recovery: isSet(object.recovery) ? Number(object.recovery) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        message.recovery !== undefined &&
            (obj.recovery = Math.round(message.recovery));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseSignature_WalletECDSACompact();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.recovery = (_b = object.recovery) !== null && _b !== void 0 ? _b : 0;
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
//# sourceMappingURL=signature.pb.js.map