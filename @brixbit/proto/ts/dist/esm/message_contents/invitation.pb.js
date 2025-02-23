/* eslint-disable */
import Long from "long";
import { SignedPublicKeyBundle } from "./public_key.pb";
import { Ciphertext } from "./ciphertext.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
/**
 * Invitation is used by an initiator to invite participants
 * into a new conversation. Invitation carries the chosen topic name
 * and encryption scheme and key material to be used for message encryption.
 */
/** Version of consent proof payload */
export var ConsentProofPayloadVersion;
(function (ConsentProofPayloadVersion) {
    ConsentProofPayloadVersion[ConsentProofPayloadVersion["CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED"] = 0] = "CONSENT_PROOF_PAYLOAD_VERSION_UNSPECIFIED";
    ConsentProofPayloadVersion[ConsentProofPayloadVersion["CONSENT_PROOF_PAYLOAD_VERSION_1"] = 1] = "CONSENT_PROOF_PAYLOAD_VERSION_1";
    ConsentProofPayloadVersion[ConsentProofPayloadVersion["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ConsentProofPayloadVersion || (ConsentProofPayloadVersion = {}));
export function consentProofPayloadVersionFromJSON(object) {
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
export function consentProofPayloadVersionToJSON(object) {
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
function createBaseInvitationV1() {
    return {
        topic: "",
        context: undefined,
        aes256GcmHkdfSha256: undefined,
        consentProof: undefined,
    };
}
export const InvitationV1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.topic !== "") {
            writer.uint32(10).string(message.topic);
        }
        if (message.context !== undefined) {
            InvitationV1_Context.encode(message.context, writer.uint32(18).fork()).ldelim();
        }
        if (message.aes256GcmHkdfSha256 !== undefined) {
            InvitationV1_Aes256gcmHkdfsha256.encode(message.aes256GcmHkdfSha256, writer.uint32(26).fork()).ldelim();
        }
        if (message.consentProof !== undefined) {
            ConsentProofPayload.encode(message.consentProof, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInvitationV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topic = reader.string();
                    break;
                case 2:
                    message.context = InvitationV1_Context.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.aes256GcmHkdfSha256 = InvitationV1_Aes256gcmHkdfsha256.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.consentProof = ConsentProofPayload.decode(reader, reader.uint32());
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
                ? InvitationV1_Context.fromJSON(object.context)
                : undefined,
            aes256GcmHkdfSha256: isSet(object.aes256GcmHkdfSha256)
                ? InvitationV1_Aes256gcmHkdfsha256.fromJSON(object.aes256GcmHkdfSha256)
                : undefined,
            consentProof: isSet(object.consentProof)
                ? ConsentProofPayload.fromJSON(object.consentProof)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.topic !== undefined && (obj.topic = message.topic);
        message.context !== undefined &&
            (obj.context = message.context
                ? InvitationV1_Context.toJSON(message.context)
                : undefined);
        message.aes256GcmHkdfSha256 !== undefined &&
            (obj.aes256GcmHkdfSha256 = message.aes256GcmHkdfSha256
                ? InvitationV1_Aes256gcmHkdfsha256.toJSON(message.aes256GcmHkdfSha256)
                : undefined);
        message.consentProof !== undefined &&
            (obj.consentProof = message.consentProof
                ? ConsentProofPayload.toJSON(message.consentProof)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseInvitationV1();
        message.topic = (_a = object.topic) !== null && _a !== void 0 ? _a : "";
        message.context =
            object.context !== undefined && object.context !== null
                ? InvitationV1_Context.fromPartial(object.context)
                : undefined;
        message.aes256GcmHkdfSha256 =
            object.aes256GcmHkdfSha256 !== undefined &&
                object.aes256GcmHkdfSha256 !== null
                ? InvitationV1_Aes256gcmHkdfsha256.fromPartial(object.aes256GcmHkdfSha256)
                : undefined;
        message.consentProof =
            object.consentProof !== undefined && object.consentProof !== null
                ? ConsentProofPayload.fromPartial(object.consentProof)
                : undefined;
        return message;
    },
};
function createBaseInvitationV1_Aes256gcmHkdfsha256() {
    return { keyMaterial: new Uint8Array() };
}
export const InvitationV1_Aes256gcmHkdfsha256 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyMaterial.length !== 0) {
            writer.uint32(10).bytes(message.keyMaterial);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const InvitationV1_Context = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.conversationId !== "") {
            writer.uint32(10).string(message.conversationId);
        }
        Object.entries(message.metadata).forEach(([key, value]) => {
            InvitationV1_Context_MetadataEntry.encode({ key: key, value }, writer.uint32(18).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInvitationV1_Context();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversationId = reader.string();
                    break;
                case 2:
                    const entry2 = InvitationV1_Context_MetadataEntry.decode(reader, reader.uint32());
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
export const InvitationV1_Context_MetadataEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return { sender: undefined, recipient: undefined, createdNs: Long.UZERO };
}
export const SealedInvitationHeaderV1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== undefined) {
            SignedPublicKeyBundle.encode(message.sender, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            SignedPublicKeyBundle.encode(message.recipient, writer.uint32(18).fork()).ldelim();
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(24).uint64(message.createdNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSealedInvitationHeaderV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = SignedPublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipient = SignedPublicKeyBundle.decode(reader, reader.uint32());
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
                ? SignedPublicKeyBundle.fromJSON(object.sender)
                : undefined,
            recipient: isSet(object.recipient)
                ? SignedPublicKeyBundle.fromJSON(object.recipient)
                : undefined,
            createdNs: isSet(object.createdNs)
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined &&
            (obj.sender = message.sender
                ? SignedPublicKeyBundle.toJSON(message.sender)
                : undefined);
        message.recipient !== undefined &&
            (obj.recipient = message.recipient
                ? SignedPublicKeyBundle.toJSON(message.recipient)
                : undefined);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSealedInvitationHeaderV1();
        message.sender =
            object.sender !== undefined && object.sender !== null
                ? SignedPublicKeyBundle.fromPartial(object.sender)
                : undefined;
        message.recipient =
            object.recipient !== undefined && object.recipient !== null
                ? SignedPublicKeyBundle.fromPartial(object.recipient)
                : undefined;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        return message;
    },
};
function createBaseSealedInvitationV1() {
    return { headerBytes: new Uint8Array(), ciphertext: undefined };
}
export const SealedInvitationV1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.headerBytes.length !== 0) {
            writer.uint32(10).bytes(message.headerBytes);
        }
        if (message.ciphertext !== undefined) {
            Ciphertext.encode(message.ciphertext, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSealedInvitationV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.headerBytes = reader.bytes();
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
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
            ciphertext: isSet(object.ciphertext)
                ? Ciphertext.fromJSON(object.ciphertext)
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
                ? Ciphertext.toJSON(message.ciphertext)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSealedInvitationV1();
        message.headerBytes = (_a = object.headerBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.ciphertext =
            object.ciphertext !== undefined && object.ciphertext !== null
                ? Ciphertext.fromPartial(object.ciphertext)
                : undefined;
        return message;
    },
};
function createBaseSealedInvitation() {
    return { v1: undefined };
}
export const SealedInvitation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            SealedInvitationV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSealedInvitation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = SealedInvitationV1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? SealedInvitationV1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? SealedInvitationV1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSealedInvitation();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? SealedInvitationV1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseConsentProofPayload() {
    return { signature: "", timestamp: Long.UZERO, payloadVersion: 0 };
}
export const ConsentProofPayload = {
    encode(message, writer = _m0.Writer.create()) {
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
                ? Long.fromValue(object.timestamp)
                : Long.UZERO,
            payloadVersion: isSet(object.payloadVersion)
                ? consentProofPayloadVersionFromJSON(object.payloadVersion)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.signature !== undefined && (obj.signature = message.signature);
        message.timestamp !== undefined &&
            (obj.timestamp = (message.timestamp || Long.UZERO).toString());
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
                ? Long.fromValue(object.timestamp)
                : Long.UZERO;
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
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=invitation.pb.js.map