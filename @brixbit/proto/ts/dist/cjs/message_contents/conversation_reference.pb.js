"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationReference = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const invitation_pb_1 = require("./invitation.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBaseConversationReference() {
    return {
        topic: "",
        peerAddress: "",
        createdNs: long_1.default.UZERO,
        context: undefined,
        consentProofPayload: undefined,
    };
}
exports.ConversationReference = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.topic !== "") {
            writer.uint32(10).string(message.topic);
        }
        if (message.peerAddress !== "") {
            writer.uint32(18).string(message.peerAddress);
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(24).uint64(message.createdNs);
        }
        if (message.context !== undefined) {
            invitation_pb_1.InvitationV1_Context.encode(message.context, writer.uint32(34).fork()).ldelim();
        }
        if (message.consentProofPayload !== undefined) {
            invitation_pb_1.ConsentProofPayload.encode(message.consentProofPayload, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConversationReference();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topic = reader.string();
                    break;
                case 2:
                    message.peerAddress = reader.string();
                    break;
                case 3:
                    message.createdNs = reader.uint64();
                    break;
                case 4:
                    message.context = invitation_pb_1.InvitationV1_Context.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.consentProofPayload = invitation_pb_1.ConsentProofPayload.decode(reader, reader.uint32());
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
            peerAddress: isSet(object.peerAddress) ? String(object.peerAddress) : "",
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
            context: isSet(object.context)
                ? invitation_pb_1.InvitationV1_Context.fromJSON(object.context)
                : undefined,
            consentProofPayload: isSet(object.consentProofPayload)
                ? invitation_pb_1.ConsentProofPayload.fromJSON(object.consentProofPayload)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.topic !== undefined && (obj.topic = message.topic);
        message.peerAddress !== undefined &&
            (obj.peerAddress = message.peerAddress);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        message.context !== undefined &&
            (obj.context = message.context
                ? invitation_pb_1.InvitationV1_Context.toJSON(message.context)
                : undefined);
        message.consentProofPayload !== undefined &&
            (obj.consentProofPayload = message.consentProofPayload
                ? invitation_pb_1.ConsentProofPayload.toJSON(message.consentProofPayload)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseConversationReference();
        message.topic = (_a = object.topic) !== null && _a !== void 0 ? _a : "";
        message.peerAddress = (_b = object.peerAddress) !== null && _b !== void 0 ? _b : "";
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.context =
            object.context !== undefined && object.context !== null
                ? invitation_pb_1.InvitationV1_Context.fromPartial(object.context)
                : undefined;
        message.consentProofPayload =
            object.consentProofPayload !== undefined &&
                object.consentProofPayload !== null
                ? invitation_pb_1.ConsentProofPayload.fromPartial(object.consentProofPayload)
                : undefined;
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=conversation_reference.pb.js.map