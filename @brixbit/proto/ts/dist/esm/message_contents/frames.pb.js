/* eslint-disable */
import Long from "long";
import { Signature } from "./signature.pb";
import { SignedPublicKeyBundle } from "./public_key.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseFrameActionBody() {
    return {
        frameUrl: "",
        buttonIndex: 0,
        timestamp: Long.UZERO,
        opaqueConversationIdentifier: "",
        unixTimestamp: 0,
        inputText: "",
        state: "",
        address: "",
        transactionId: "",
    };
}
export const FrameActionBody = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.frameUrl !== "") {
            writer.uint32(10).string(message.frameUrl);
        }
        if (message.buttonIndex !== 0) {
            writer.uint32(16).int32(message.buttonIndex);
        }
        if (!message.timestamp.isZero()) {
            writer.uint32(24).uint64(message.timestamp);
        }
        if (message.opaqueConversationIdentifier !== "") {
            writer.uint32(34).string(message.opaqueConversationIdentifier);
        }
        if (message.unixTimestamp !== 0) {
            writer.uint32(40).uint32(message.unixTimestamp);
        }
        if (message.inputText !== "") {
            writer.uint32(50).string(message.inputText);
        }
        if (message.state !== "") {
            writer.uint32(58).string(message.state);
        }
        if (message.address !== "") {
            writer.uint32(66).string(message.address);
        }
        if (message.transactionId !== "") {
            writer.uint32(74).string(message.transactionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFrameActionBody();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.frameUrl = reader.string();
                    break;
                case 2:
                    message.buttonIndex = reader.int32();
                    break;
                case 3:
                    message.timestamp = reader.uint64();
                    break;
                case 4:
                    message.opaqueConversationIdentifier = reader.string();
                    break;
                case 5:
                    message.unixTimestamp = reader.uint32();
                    break;
                case 6:
                    message.inputText = reader.string();
                    break;
                case 7:
                    message.state = reader.string();
                    break;
                case 8:
                    message.address = reader.string();
                    break;
                case 9:
                    message.transactionId = reader.string();
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
            frameUrl: isSet(object.frameUrl) ? String(object.frameUrl) : "",
            buttonIndex: isSet(object.buttonIndex) ? Number(object.buttonIndex) : 0,
            timestamp: isSet(object.timestamp)
                ? Long.fromValue(object.timestamp)
                : Long.UZERO,
            opaqueConversationIdentifier: isSet(object.opaqueConversationIdentifier)
                ? String(object.opaqueConversationIdentifier)
                : "",
            unixTimestamp: isSet(object.unixTimestamp)
                ? Number(object.unixTimestamp)
                : 0,
            inputText: isSet(object.inputText) ? String(object.inputText) : "",
            state: isSet(object.state) ? String(object.state) : "",
            address: isSet(object.address) ? String(object.address) : "",
            transactionId: isSet(object.transactionId)
                ? String(object.transactionId)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.frameUrl !== undefined && (obj.frameUrl = message.frameUrl);
        message.buttonIndex !== undefined &&
            (obj.buttonIndex = Math.round(message.buttonIndex));
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || Long.UZERO).toString());
        message.opaqueConversationIdentifier !== undefined &&
            (obj.opaqueConversationIdentifier = message.opaqueConversationIdentifier);
        message.unixTimestamp !== undefined &&
            (obj.unixTimestamp = Math.round(message.unixTimestamp));
        message.inputText !== undefined && (obj.inputText = message.inputText);
        message.state !== undefined && (obj.state = message.state);
        message.address !== undefined && (obj.address = message.address);
        message.transactionId !== undefined &&
            (obj.transactionId = message.transactionId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseFrameActionBody();
        message.frameUrl = (_a = object.frameUrl) !== null && _a !== void 0 ? _a : "";
        message.buttonIndex = (_b = object.buttonIndex) !== null && _b !== void 0 ? _b : 0;
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null
                ? Long.fromValue(object.timestamp)
                : Long.UZERO;
        message.opaqueConversationIdentifier =
            (_c = object.opaqueConversationIdentifier) !== null && _c !== void 0 ? _c : "";
        message.unixTimestamp = (_d = object.unixTimestamp) !== null && _d !== void 0 ? _d : 0;
        message.inputText = (_e = object.inputText) !== null && _e !== void 0 ? _e : "";
        message.state = (_f = object.state) !== null && _f !== void 0 ? _f : "";
        message.address = (_g = object.address) !== null && _g !== void 0 ? _g : "";
        message.transactionId = (_h = object.transactionId) !== null && _h !== void 0 ? _h : "";
        return message;
    },
};
function createBaseFrameAction() {
    return {
        signature: undefined,
        signedPublicKeyBundle: undefined,
        actionBody: new Uint8Array(),
    };
}
export const FrameAction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signature !== undefined) {
            Signature.encode(message.signature, writer.uint32(10).fork()).ldelim();
        }
        if (message.signedPublicKeyBundle !== undefined) {
            SignedPublicKeyBundle.encode(message.signedPublicKeyBundle, writer.uint32(18).fork()).ldelim();
        }
        if (message.actionBody.length !== 0) {
            writer.uint32(26).bytes(message.actionBody);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFrameAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signature = Signature.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signedPublicKeyBundle = SignedPublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.actionBody = reader.bytes();
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
            signature: isSet(object.signature)
                ? Signature.fromJSON(object.signature)
                : undefined,
            signedPublicKeyBundle: isSet(object.signedPublicKeyBundle)
                ? SignedPublicKeyBundle.fromJSON(object.signedPublicKeyBundle)
                : undefined,
            actionBody: isSet(object.actionBody)
                ? bytesFromBase64(object.actionBody)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? Signature.toJSON(message.signature)
                : undefined);
        message.signedPublicKeyBundle !== undefined &&
            (obj.signedPublicKeyBundle = message.signedPublicKeyBundle
                ? SignedPublicKeyBundle.toJSON(message.signedPublicKeyBundle)
                : undefined);
        message.actionBody !== undefined &&
            (obj.actionBody = base64FromBytes(message.actionBody !== undefined ? message.actionBody : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseFrameAction();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? Signature.fromPartial(object.signature)
                : undefined;
        message.signedPublicKeyBundle =
            object.signedPublicKeyBundle !== undefined &&
                object.signedPublicKeyBundle !== null
                ? SignedPublicKeyBundle.fromPartial(object.signedPublicKeyBundle)
                : undefined;
        message.actionBody = (_a = object.actionBody) !== null && _a !== void 0 ? _a : new Uint8Array();
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
//# sourceMappingURL=frames.pb.js.map