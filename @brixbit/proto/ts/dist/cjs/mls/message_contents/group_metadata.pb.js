"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMetadataV1 = exports.conversationTypeToJSON = exports.conversationTypeFromJSON = exports.ConversationType = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.mls.message_contents";
/** Group immutable metadata */
/** Defines the type of conversation */
var ConversationType;
(function (ConversationType) {
    ConversationType[ConversationType["CONVERSATION_TYPE_UNSPECIFIED"] = 0] = "CONVERSATION_TYPE_UNSPECIFIED";
    ConversationType[ConversationType["CONVERSATION_TYPE_GROUP"] = 1] = "CONVERSATION_TYPE_GROUP";
    ConversationType[ConversationType["CONVERSATION_TYPE_DM"] = 2] = "CONVERSATION_TYPE_DM";
    ConversationType[ConversationType["CONVERSATION_TYPE_SYNC"] = 3] = "CONVERSATION_TYPE_SYNC";
    ConversationType[ConversationType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ConversationType = exports.ConversationType || (exports.ConversationType = {}));
function conversationTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "CONVERSATION_TYPE_UNSPECIFIED":
            return ConversationType.CONVERSATION_TYPE_UNSPECIFIED;
        case 1:
        case "CONVERSATION_TYPE_GROUP":
            return ConversationType.CONVERSATION_TYPE_GROUP;
        case 2:
        case "CONVERSATION_TYPE_DM":
            return ConversationType.CONVERSATION_TYPE_DM;
        case 3:
        case "CONVERSATION_TYPE_SYNC":
            return ConversationType.CONVERSATION_TYPE_SYNC;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ConversationType.UNRECOGNIZED;
    }
}
exports.conversationTypeFromJSON = conversationTypeFromJSON;
function conversationTypeToJSON(object) {
    switch (object) {
        case ConversationType.CONVERSATION_TYPE_UNSPECIFIED:
            return "CONVERSATION_TYPE_UNSPECIFIED";
        case ConversationType.CONVERSATION_TYPE_GROUP:
            return "CONVERSATION_TYPE_GROUP";
        case ConversationType.CONVERSATION_TYPE_DM:
            return "CONVERSATION_TYPE_DM";
        case ConversationType.CONVERSATION_TYPE_SYNC:
            return "CONVERSATION_TYPE_SYNC";
        case ConversationType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.conversationTypeToJSON = conversationTypeToJSON;
function createBaseGroupMetadataV1() {
    return { conversationType: 0, creatorAccountAddress: "", creatorInboxId: "" };
}
exports.GroupMetadataV1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.conversationType !== 0) {
            writer.uint32(8).int32(message.conversationType);
        }
        if (message.creatorAccountAddress !== "") {
            writer.uint32(18).string(message.creatorAccountAddress);
        }
        if (message.creatorInboxId !== "") {
            writer.uint32(26).string(message.creatorInboxId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMetadataV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversationType = reader.int32();
                    break;
                case 2:
                    message.creatorAccountAddress = reader.string();
                    break;
                case 3:
                    message.creatorInboxId = reader.string();
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
            conversationType: isSet(object.conversationType)
                ? conversationTypeFromJSON(object.conversationType)
                : 0,
            creatorAccountAddress: isSet(object.creatorAccountAddress)
                ? String(object.creatorAccountAddress)
                : "",
            creatorInboxId: isSet(object.creatorInboxId)
                ? String(object.creatorInboxId)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.conversationType !== undefined &&
            (obj.conversationType = conversationTypeToJSON(message.conversationType));
        message.creatorAccountAddress !== undefined &&
            (obj.creatorAccountAddress = message.creatorAccountAddress);
        message.creatorInboxId !== undefined &&
            (obj.creatorInboxId = message.creatorInboxId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseGroupMetadataV1();
        message.conversationType = (_a = object.conversationType) !== null && _a !== void 0 ? _a : 0;
        message.creatorAccountAddress = (_b = object.creatorAccountAddress) !== null && _b !== void 0 ? _b : "";
        message.creatorInboxId = (_c = object.creatorInboxId) !== null && _c !== void 0 ? _c : "";
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
//# sourceMappingURL=group_metadata.pb.js.map