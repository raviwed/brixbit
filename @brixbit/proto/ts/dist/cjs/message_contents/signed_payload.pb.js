"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedPayload = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const signature_pb_1 = require("./signature.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBaseSignedPayload() {
    return { payload: new Uint8Array(), signature: undefined };
}
exports.SignedPayload = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.payload.length !== 0) {
            writer.uint32(10).bytes(message.payload);
        }
        if (message.signature !== undefined) {
            signature_pb_1.Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedPayload();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
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
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
            signature: isSet(object.signature)
                ? signature_pb_1.Signature.fromJSON(object.signature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? signature_pb_1.Signature.toJSON(message.signature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSignedPayload();
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? signature_pb_1.Signature.fromPartial(object.signature)
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
//# sourceMappingURL=signed_payload.pb.js.map