"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodedMessage = exports.Message = exports.MessageV2 = exports.MessageHeaderV2 = exports.MessageV1 = exports.MessageHeaderV1 = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const public_key_pb_1 = require("./public_key.pb");
const ciphertext_pb_1 = require("./ciphertext.pb");
const conversation_reference_pb_1 = require("./conversation_reference.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBaseMessageHeaderV1() {
    return { sender: undefined, recipient: undefined, timestamp: long_1.default.UZERO };
}
exports.MessageHeaderV1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== undefined) {
            public_key_pb_1.PublicKeyBundle.encode(message.sender, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            public_key_pb_1.PublicKeyBundle.encode(message.recipient, writer.uint32(18).fork()).ldelim();
        }
        if (!message.timestamp.isZero()) {
            writer.uint32(24).uint64(message.timestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageHeaderV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = public_key_pb_1.PublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipient = public_key_pb_1.PublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.timestamp = reader.uint64();
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
            sender: isSet(object.sender)
                ? public_key_pb_1.PublicKeyBundle.fromJSON(object.sender)
                : undefined,
            recipient: isSet(object.recipient)
                ? public_key_pb_1.PublicKeyBundle.fromJSON(object.recipient)
                : undefined,
            timestamp: isSet(object.timestamp)
                ? long_1.default.fromValue(object.timestamp)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined &&
            (obj.sender = message.sender
                ? public_key_pb_1.PublicKeyBundle.toJSON(message.sender)
                : undefined);
        message.recipient !== undefined &&
            (obj.recipient = message.recipient
                ? public_key_pb_1.PublicKeyBundle.toJSON(message.recipient)
                : undefined);
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMessageHeaderV1();
        message.sender =
            object.sender !== undefined && object.sender !== null
                ? public_key_pb_1.PublicKeyBundle.fromPartial(object.sender)
                : undefined;
        message.recipient =
            object.recipient !== undefined && object.recipient !== null
                ? public_key_pb_1.PublicKeyBundle.fromPartial(object.recipient)
                : undefined;
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null
                ? long_1.default.fromValue(object.timestamp)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseMessageV1() {
    return { headerBytes: new Uint8Array(), ciphertext: undefined };
}
exports.MessageV1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.headerBytes.length !== 0) {
            writer.uint32(10).bytes(message.headerBytes);
        }
        if (message.ciphertext !== undefined) {
            ciphertext_pb_1.Ciphertext.encode(message.ciphertext, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.headerBytes = reader.bytes();
                    break;
                case 2:
                    message.ciphertext = ciphertext_pb_1.Ciphertext.decode(reader, reader.uint32());
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
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
            ciphertext: isSet(object.ciphertext)
                ? ciphertext_pb_1.Ciphertext.fromJSON(object.ciphertext)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.headerBytes !== undefined &&
            (obj.headerBytes = base64FromBytes(message.headerBytes !== undefined
                ? message.headerBytes
                : new Uint8Array()));
        message.ciphertext !== undefined &&
            (obj.ciphertext = message.ciphertext
                ? ciphertext_pb_1.Ciphertext.toJSON(message.ciphertext)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMessageV1();
        message.headerBytes = (_a = object.headerBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.ciphertext =
            object.ciphertext !== undefined && object.ciphertext !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.ciphertext)
                : undefined;
        return message;
    },
};
function createBaseMessageHeaderV2() {
    return { createdNs: long_1.default.UZERO, topic: "" };
}
exports.MessageHeaderV2 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.createdNs.isZero()) {
            writer.uint32(8).uint64(message.createdNs);
        }
        if (message.topic !== "") {
            writer.uint32(18).string(message.topic);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageHeaderV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdNs = reader.uint64();
                    break;
                case 2:
                    message.topic = reader.string();
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
            topic: isSet(object.topic) ? String(object.topic) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        message.topic !== undefined && (obj.topic = message.topic);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMessageHeaderV2();
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.topic = (_a = object.topic) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseMessageV2() {
    return {
        headerBytes: new Uint8Array(),
        ciphertext: undefined,
        senderHmac: undefined,
        shouldPush: undefined,
    };
}
exports.MessageV2 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.headerBytes.length !== 0) {
            writer.uint32(10).bytes(message.headerBytes);
        }
        if (message.ciphertext !== undefined) {
            ciphertext_pb_1.Ciphertext.encode(message.ciphertext, writer.uint32(18).fork()).ldelim();
        }
        if (message.senderHmac !== undefined) {
            writer.uint32(26).bytes(message.senderHmac);
        }
        if (message.shouldPush !== undefined) {
            writer.uint32(32).bool(message.shouldPush);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessageV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.headerBytes = reader.bytes();
                    break;
                case 2:
                    message.ciphertext = ciphertext_pb_1.Ciphertext.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.senderHmac = reader.bytes();
                    break;
                case 4:
                    message.shouldPush = reader.bool();
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
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
            ciphertext: isSet(object.ciphertext)
                ? ciphertext_pb_1.Ciphertext.fromJSON(object.ciphertext)
                : undefined,
            senderHmac: isSet(object.senderHmac)
                ? bytesFromBase64(object.senderHmac)
                : undefined,
            shouldPush: isSet(object.shouldPush)
                ? Boolean(object.shouldPush)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.headerBytes !== undefined &&
            (obj.headerBytes = base64FromBytes(message.headerBytes !== undefined
                ? message.headerBytes
                : new Uint8Array()));
        message.ciphertext !== undefined &&
            (obj.ciphertext = message.ciphertext
                ? ciphertext_pb_1.Ciphertext.toJSON(message.ciphertext)
                : undefined);
        message.senderHmac !== undefined &&
            (obj.senderHmac =
                message.senderHmac !== undefined
                    ? base64FromBytes(message.senderHmac)
                    : undefined);
        message.shouldPush !== undefined && (obj.shouldPush = message.shouldPush);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMessageV2();
        message.headerBytes = (_a = object.headerBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.ciphertext =
            object.ciphertext !== undefined && object.ciphertext !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.ciphertext)
                : undefined;
        message.senderHmac = (_b = object.senderHmac) !== null && _b !== void 0 ? _b : undefined;
        message.shouldPush = (_c = object.shouldPush) !== null && _c !== void 0 ? _c : undefined;
        return message;
    },
};
function createBaseMessage() {
    return { v1: undefined, v2: undefined };
}
exports.Message = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.MessageV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        if (message.v2 !== undefined) {
            exports.MessageV2.encode(message.v2, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.MessageV1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.v2 = exports.MessageV2.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? exports.MessageV1.fromJSON(object.v1) : undefined,
            v2: isSet(object.v2) ? exports.MessageV2.fromJSON(object.v2) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? exports.MessageV1.toJSON(message.v1) : undefined);
        message.v2 !== undefined &&
            (obj.v2 = message.v2 ? exports.MessageV2.toJSON(message.v2) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMessage();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.MessageV1.fromPartial(object.v1)
                : undefined;
        message.v2 =
            object.v2 !== undefined && object.v2 !== null
                ? exports.MessageV2.fromPartial(object.v2)
                : undefined;
        return message;
    },
};
function createBaseDecodedMessage() {
    return {
        id: "",
        messageVersion: "",
        senderAddress: "",
        recipientAddress: undefined,
        sentNs: long_1.default.UZERO,
        contentTopic: "",
        conversation: undefined,
        contentBytes: new Uint8Array(),
    };
}
exports.DecodedMessage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.messageVersion !== "") {
            writer.uint32(18).string(message.messageVersion);
        }
        if (message.senderAddress !== "") {
            writer.uint32(26).string(message.senderAddress);
        }
        if (message.recipientAddress !== undefined) {
            writer.uint32(34).string(message.recipientAddress);
        }
        if (!message.sentNs.isZero()) {
            writer.uint32(40).uint64(message.sentNs);
        }
        if (message.contentTopic !== "") {
            writer.uint32(50).string(message.contentTopic);
        }
        if (message.conversation !== undefined) {
            conversation_reference_pb_1.ConversationReference.encode(message.conversation, writer.uint32(58).fork()).ldelim();
        }
        if (message.contentBytes.length !== 0) {
            writer.uint32(66).bytes(message.contentBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecodedMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.messageVersion = reader.string();
                    break;
                case 3:
                    message.senderAddress = reader.string();
                    break;
                case 4:
                    message.recipientAddress = reader.string();
                    break;
                case 5:
                    message.sentNs = reader.uint64();
                    break;
                case 6:
                    message.contentTopic = reader.string();
                    break;
                case 7:
                    message.conversation = conversation_reference_pb_1.ConversationReference.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.contentBytes = reader.bytes();
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
            id: isSet(object.id) ? String(object.id) : "",
            messageVersion: isSet(object.messageVersion)
                ? String(object.messageVersion)
                : "",
            senderAddress: isSet(object.senderAddress)
                ? String(object.senderAddress)
                : "",
            recipientAddress: isSet(object.recipientAddress)
                ? String(object.recipientAddress)
                : undefined,
            sentNs: isSet(object.sentNs) ? long_1.default.fromValue(object.sentNs) : long_1.default.UZERO,
            contentTopic: isSet(object.contentTopic)
                ? String(object.contentTopic)
                : "",
            conversation: isSet(object.conversation)
                ? conversation_reference_pb_1.ConversationReference.fromJSON(object.conversation)
                : undefined,
            contentBytes: isSet(object.contentBytes)
                ? bytesFromBase64(object.contentBytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.messageVersion !== undefined &&
            (obj.messageVersion = message.messageVersion);
        message.senderAddress !== undefined &&
            (obj.senderAddress = message.senderAddress);
        message.recipientAddress !== undefined &&
            (obj.recipientAddress = message.recipientAddress);
        message.sentNs !== undefined &&
            (obj.sentNs = (message.sentNs || long_1.default.UZERO).toString());
        message.contentTopic !== undefined &&
            (obj.contentTopic = message.contentTopic);
        message.conversation !== undefined &&
            (obj.conversation = message.conversation
                ? conversation_reference_pb_1.ConversationReference.toJSON(message.conversation)
                : undefined);
        message.contentBytes !== undefined &&
            (obj.contentBytes = base64FromBytes(message.contentBytes !== undefined
                ? message.contentBytes
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseDecodedMessage();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.messageVersion = (_b = object.messageVersion) !== null && _b !== void 0 ? _b : "";
        message.senderAddress = (_c = object.senderAddress) !== null && _c !== void 0 ? _c : "";
        message.recipientAddress = (_d = object.recipientAddress) !== null && _d !== void 0 ? _d : undefined;
        message.sentNs =
            object.sentNs !== undefined && object.sentNs !== null
                ? long_1.default.fromValue(object.sentNs)
                : long_1.default.UZERO;
        message.contentTopic = (_e = object.contentTopic) !== null && _e !== void 0 ? _e : "";
        message.conversation =
            object.conversation !== undefined && object.conversation !== null
                ? conversation_reference_pb_1.ConversationReference.fromPartial(object.conversation)
                : undefined;
        message.contentBytes = (_f = object.contentBytes) !== null && _f !== void 0 ? _f : new Uint8Array();
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
//# sourceMappingURL=message.pb.js.map