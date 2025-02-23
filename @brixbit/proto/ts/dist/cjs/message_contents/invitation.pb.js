"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsentProofPayload = exports.SealedInvitation = exports.SealedInvitationV1 = exports.SealedInvitationHeaderV1 = exports.InvitationV1_Context_MetadataEntry = exports.InvitationV1_Context = exports.InvitationV1_Aes256gcmHkdfsha256 = exports.InvitationV1 = exports.consentProofPayloadVersionToJSON = exports.consentProofPayloadVersionFromJSON = exports.ConsentProofPayloadVersion = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const public_key_pb_1 = require("./public_key.pb");
const ciphertext_pb_1 = require("./ciphertext.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
/**
 * Invitation is used by an initiator to invite participants
 * into a new conversation. Invitation carries the chosen topic name
 * and encryption scheme and key material to be used for message encryption.
 */
/** Version of consent proof payload */
var ConsentProofPayloadVersion;
(function (ConsentProofPayloadVersion) {
    ConsentProofPayloadVersion[ConsentProofPayloadVersion["CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED"] = 0] = "CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED";
    ConsentProofPayloadVersion[ConsentProofPayloadVersion["CONSENT_PROOF_PAYLOAD_VERSION_1"] = 1] = "CONSENT_PROOF_PAYLOAD_VERSION_1";
    ConsentProofPayloadVersion[ConsentProofPayloadVersion["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ConsentProofPayloadVersion = exports.ConsentProofPayloadVersion || (exports.ConsentProofPayloadVersion = {}));
function consentProofPayloadVersionFromJSON(object) {
    switch (object) {
        case 0:
        case "CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED":
            return ConsentProofPayloadVersion.CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED;
        case 1:
        case "CONSENT_PROOF_PAYLOAD_VERSION_1":
            return ConsentProofPayloadVersion.CONSENT_PROOF_PAYLOAD_VERSION_1;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ConsentProofPayloadVersion.UNRECOGNIZED;
    }
}
exports.consentProofPayloadVersionFromJSON = consentProofPayloadVersionFromJSON;
function consentProofPayloadVersionToJSON(object) {
    switch (object) {
        case ConsentProofPayloadVersion.CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED:
            return "CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED";
        case ConsentProofPayloadVersion.CONSENT_PROOF_PAYLOAD_VERSION_1:
            return "CONSENT_PROOF_PAYLOAD_VERSION_1";
        case ConsentProofPayloadVersion.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.consentProofPayloadVersionToJSON = consentProofPayloadVersionToJSON;
function createBaseInvitationV1() {
    return {
        topic: "",
        context: undefined,
        aes256GcmHkdfSha256: undefined,
        consentProof: undefined,
    };
}
exports.InvitationV1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.topic !== "") {
            writer.uint32(10).string(message.topic);
        }
        if (message.context !== undefined) {
            exports.InvitationV1_Context.encode(message.context, writer.uint32(18).fork()).ldelim();
        }
        if (message.aes256GcmHkdfSha256 !== undefined) {
            exports.InvitationV1_Aes256gcmHkdfsha256.encode(message.aes256GcmHkdfSha256, writer.uint32(26).fork()).ldelim();
        }
        if (message.consentProof !== undefined) {
            exports.ConsentProofPayload.encode(message.consentProof, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInvitationV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topic = reader.string();
                    break;
                case 2:
                    message.context = exports.InvitationV1_Context.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.aes256GcmHkdfSha256 = exports.InvitationV1_Aes256gcmHkdfsha256.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.consentProof = exports.ConsentProofPayload.decode(reader, reader.uint32());
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
            topic: isSet(object.topic) ? String(object.topic) : "",
            context: isSet(object.context)
                ? exports.InvitationV1_Context.fromJSON(object.context)
                : undefined,
            aes256GcmHkdfSha256: isSet(object.aes256GcmHkdfSha256)
                ? exports.InvitationV1_Aes256gcmHkdfsha256.fromJSON(object.aes256GcmHkdfSha256)
                : undefined,
            consentProof: isSet(object.consentProof)
                ? exports.ConsentProofPayload.fromJSON(object.consentProof)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.topic !== undefined && (obj.topic = message.topic);
        message.context !== undefined &&
            (obj.context = message.context
                ? exports.InvitationV1_Context.toJSON(message.context)
                : undefined);
        message.aes256GcmHkdfSha256 !== undefined &&
            (obj.aes256GcmHkdfSha256 = message.aes256GcmHkdfSha256
                ? exports.InvitationV1_Aes256gcmHkdfsha256.toJSON(message.aes256GcmHkdfSha256)
                : undefined);
        message.consentProof !== undefined &&
            (obj.consentProof = message.consentProof
                ? exports.ConsentProofPayload.toJSON(message.consentProof)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseInvitationV1();
        message.topic = (_a = object.topic) !== null && _a !== void 0 ? _a : "";
        message.context =
            object.context !== undefined && object.context !== null
                ? exports.InvitationV1_Context.fromPartial(object.context)
                : undefined;
        message.aes256GcmHkdfSha256 =
            object.aes256GcmHkdfSha256 !== undefined &&
                object.aes256GcmHkdfSha256 !== null
                ? exports.InvitationV1_Aes256gcmHkdfsha256.fromPartial(object.aes256GcmHkdfSha256)
                : undefined;
        message.consentProof =
            object.consentProof !== undefined && object.consentProof !== null
                ? exports.ConsentProofPayload.fromPartial(object.consentProof)
                : undefined;
        return message;
    },
};
function createBaseInvitationV1_Aes256gcmHkdfsha256() {
    return { keyMaterial: new Uint8Array() };
}
exports.InvitationV1_Aes256gcmHkdfsha256 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyMaterial.length !== 0) {
            writer.uint32(10).bytes(message.keyMaterial);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInvitationV1_Aes256gcmHkdfsha256();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyMaterial = reader.bytes();
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
            keyMaterial: isSet(object.keyMaterial)
                ? bytesFromBase64(object.keyMaterial)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyMaterial !== undefined &&
            (obj.keyMaterial = base64FromBytes(message.keyMaterial !== undefined
                ? message.keyMaterial
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseInvitationV1_Aes256gcmHkdfsha256();
        message.keyMaterial = (_a = object.keyMaterial) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseInvitationV1_Context() {
    return { conversationId: "", metadata: {} };
}
exports.InvitationV1_Context = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.conversationId !== "") {
            writer.uint32(10).string(message.conversationId);
        }
        Object.entries(message.metadata).forEach(([key, value]) => {
            exports.InvitationV1_Context_MetadataEntry.encode({ key: key, value }, writer.uint32(18).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInvitationV1_Context();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversationId = reader.string();
                    break;
                case 2:
                    const entry2 = exports.InvitationV1_Context_MetadataEntry.decode(reader, reader.uint32());
                    if (entry2.value !== undefined) {
                        message.metadata[entry2.key] = entry2.value;
                    }
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
            conversationId: isSet(object.conversationId)
                ? String(object.conversationId)
                : "",
            metadata: isObject(object.metadata)
                ? Object.entries(object.metadata).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {})
                : {},
        };
    },
    toJSON(message) {
        const obj = {};
        message.conversationId !== undefined &&
            (obj.conversationId = message.conversationId);
        obj.metadata = {};
        if (message.metadata) {
            Object.entries(message.metadata).forEach(([k, v]) => {
                obj.metadata[k] = v;
            });
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseInvitationV1_Context();
        message.conversationId = (_a = object.conversationId) !== null && _a !== void 0 ? _a : "";
        message.metadata = Object.entries((_b = object.metadata) !== null && _b !== void 0 ? _b : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = String(value);
            }
            return acc;
        }, {});
        return message;
    },
};
function createBaseInvitationV1_Context_MetadataEntry() {
    return { key: "", value: "" };
}
exports.InvitationV1_Context_MetadataEntry = {
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
        const message = createBaseInvitationV1_Context_MetadataEntry();
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
        const message = createBaseInvitationV1_Context_MetadataEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseSealedInvitationHeaderV1() {
    return { sender: undefined, recipient: undefined, createdNs: long_1.default.UZERO };
}
exports.SealedInvitationHeaderV1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== undefined) {
            public_key_pb_1.SignedPublicKeyBundle.encode(message.sender, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            public_key_pb_1.SignedPublicKeyBundle.encode(message.recipient, writer.uint32(18).fork()).ldelim();
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(24).uint64(message.createdNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSealedInvitationHeaderV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = public_key_pb_1.SignedPublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipient = public_key_pb_1.SignedPublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 3:
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
            sender: isSet(object.sender)
                ? public_key_pb_1.SignedPublicKeyBundle.fromJSON(object.sender)
                : undefined,
            recipient: isSet(object.recipient)
                ? public_key_pb_1.SignedPublicKeyBundle.fromJSON(object.recipient)
                : undefined,
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined &&
            (obj.sender = message.sender
                ? public_key_pb_1.SignedPublicKeyBundle.toJSON(message.sender)
                : undefined);
        message.recipient !== undefined &&
            (obj.recipient = message.recipient
                ? public_key_pb_1.SignedPublicKeyBundle.toJSON(message.recipient)
                : undefined);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSealedInvitationHeaderV1();
        message.sender =
            object.sender !== undefined && object.sender !== null
                ? public_key_pb_1.SignedPublicKeyBundle.fromPartial(object.sender)
                : undefined;
        message.recipient =
            object.recipient !== undefined && object.recipient !== null
                ? public_key_pb_1.SignedPublicKeyBundle.fromPartial(object.recipient)
                : undefined;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseSealedInvitationV1() {
    return { headerBytes: new Uint8Array(), ciphertext: undefined };
}
exports.SealedInvitationV1 = {
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
        const message = createBaseSealedInvitationV1();
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
        const message = createBaseSealedInvitationV1();
        message.headerBytes = (_a = object.headerBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.ciphertext =
            object.ciphertext !== undefined && object.ciphertext !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.ciphertext)
                : undefined;
        return message;
    },
};
function createBaseSealedInvitation() {
    return { v1: undefined };
}
exports.SealedInvitation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.SealedInvitationV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSealedInvitation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.SealedInvitationV1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? exports.SealedInvitationV1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? exports.SealedInvitationV1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSealedInvitation();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.SealedInvitationV1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseConsentProofPayload() {
    return { signature: "", timestamp: long_1.default.UZERO, payloadVersion: 0 };
}
exports.ConsentProofPayload = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.signature !== "") {
            writer.uint32(10).string(message.signature);
        }
        if (!message.timestamp.isZero()) {
            writer.uint32(16).uint64(message.timestamp);
        }
        if (message.payloadVersion !== 0) {
            writer.uint32(24).int32(message.payloadVersion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsentProofPayload();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signature = reader.string();
                    break;
                case 2:
                    message.timestamp = reader.uint64();
                    break;
                case 3:
                    message.payloadVersion = reader.int32();
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
            signature: isSet(object.signature) ? String(object.signature) : "",
            timestamp: isSet(object.timestamp)
                ? long_1.default.fromValue(object.timestamp)
                : long_1.default.UZERO,
            payloadVersion: isSet(object.payloadVersion)
                ? consentProofPayloadVersionFromJSON(object.payloadVersion)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.signature !== undefined && (obj.signature = message.signature);
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || long_1.default.UZERO).toString());
        message.payloadVersion !== undefined &&
            (obj.payloadVersion = consentProofPayloadVersionToJSON(message.payloadVersion));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseConsentProofPayload();
        message.signature = (_a = object.signature) !== null && _a !== void 0 ? _a : "";
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null
                ? long_1.default.fromValue(object.timestamp)
                : long_1.default.UZERO;
        message.payloadVersion = (_b = object.payloadVersion) !== null && _b !== void 0 ? _b : 0;
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
//# sourceMappingURL=invitation.pb.js.map