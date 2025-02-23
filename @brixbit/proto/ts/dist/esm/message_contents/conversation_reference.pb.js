/* eslint-disable */
import Long from "long";
import { InvitationV1_Context, ConsentProofPayload } from "./invitation.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseConversationReference() {
    return {
        topic: "",
        peerAddress: "",
        createdNs: Long.UZERO,
        context: undefined,
        consentProofPayload: undefined,
    };
}
export const ConversationReference = {
    encode(message, writer = _m0.Writer.create()) {
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
            InvitationV1_Context.encode(message.context, writer.uint32(34).fork()).ldelim();
        }
        if (message.consentProofPayload !== undefined) {
            ConsentProofPayload.encode(message.consentProofPayload, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
                    message.context = InvitationV1_Context.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.consentProofPayload = ConsentProofPayload.decode(reader, reader.uint32());
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
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
            context: isSet(object.context)
                ? InvitationV1_Context.fromJSON(object.context)
                : undefined,
            consentProofPayload: isSet(object.consentProofPayload)
                ? ConsentProofPayload.fromJSON(object.consentProofPayload)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.topic !== undefined && (obj.topic = message.topic);
        message.peerAddress !== undefined &&
            (obj.peerAddress = message.peerAddress);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        message.context !== undefined &&
            (obj.context = message.context
                ? InvitationV1_Context.toJSON(message.context)
                : undefined);
        message.consentProofPayload !== undefined &&
            (obj.consentProofPayload = message.consentProofPayload
                ? ConsentProofPayload.toJSON(message.consentProofPayload)
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
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        message.context =
            object.context !== undefined && object.context !== null
                ? InvitationV1_Context.fromPartial(object.context)
                : undefined;
        message.consentProofPayload =
            object.consentProofPayload !== undefined &&
                object.consentProofPayload !== null
                ? ConsentProofPayload.fromPartial(object.consentProofPayload)
                : undefined;
        return message;
    },
};
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=conversation_reference.pb.js.map