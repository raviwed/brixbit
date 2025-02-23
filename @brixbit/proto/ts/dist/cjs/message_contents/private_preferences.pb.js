"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivatePreferencesPayload = exports.PrivatePreferencesAction_DenyGroup = exports.PrivatePreferencesAction_AllowGroup = exports.PrivatePreferencesAction_DenyInboxId = exports.PrivatePreferencesAction_AllowInboxId = exports.PrivatePreferencesAction_DenyAddress = exports.PrivatePreferencesAction_AllowAddress = exports.PrivatePreferencesAction = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const ciphertext_pb_1 = require("./ciphertext.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBasePrivatePreferencesAction() {
    return {
        allowAddress: undefined,
        denyAddress: undefined,
        allowGroup: undefined,
        denyGroup: undefined,
        allowInboxId: undefined,
        denyInboxId: undefined,
    };
}
exports.PrivatePreferencesAction = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.allowAddress !== undefined) {
            exports.PrivatePreferencesAction_AllowAddress.encode(message.allowAddress, writer.uint32(10).fork()).ldelim();
        }
        if (message.denyAddress !== undefined) {
            exports.PrivatePreferencesAction_DenyAddress.encode(message.denyAddress, writer.uint32(18).fork()).ldelim();
        }
        if (message.allowGroup !== undefined) {
            exports.PrivatePreferencesAction_AllowGroup.encode(message.allowGroup, writer.uint32(26).fork()).ldelim();
        }
        if (message.denyGroup !== undefined) {
            exports.PrivatePreferencesAction_DenyGroup.encode(message.denyGroup, writer.uint32(34).fork()).ldelim();
        }
        if (message.allowInboxId !== undefined) {
            exports.PrivatePreferencesAction_AllowInboxId.encode(message.allowInboxId, writer.uint32(42).fork()).ldelim();
        }
        if (message.denyInboxId !== undefined) {
            exports.PrivatePreferencesAction_DenyInboxId.encode(message.denyInboxId, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.allowAddress = exports.PrivatePreferencesAction_AllowAddress.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.denyAddress = exports.PrivatePreferencesAction_DenyAddress.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.allowGroup = exports.PrivatePreferencesAction_AllowGroup.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.denyGroup = exports.PrivatePreferencesAction_DenyGroup.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.allowInboxId = exports.PrivatePreferencesAction_AllowInboxId.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.denyInboxId = exports.PrivatePreferencesAction_DenyInboxId.decode(reader, reader.uint32());
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
            allowAddress: isSet(object.allowAddress)
                ? exports.PrivatePreferencesAction_AllowAddress.fromJSON(object.allowAddress)
                : undefined,
            denyAddress: isSet(object.denyAddress)
                ? exports.PrivatePreferencesAction_DenyAddress.fromJSON(object.denyAddress)
                : undefined,
            allowGroup: isSet(object.allowGroup)
                ? exports.PrivatePreferencesAction_AllowGroup.fromJSON(object.allowGroup)
                : undefined,
            denyGroup: isSet(object.denyGroup)
                ? exports.PrivatePreferencesAction_DenyGroup.fromJSON(object.denyGroup)
                : undefined,
            allowInboxId: isSet(object.allowInboxId)
                ? exports.PrivatePreferencesAction_AllowInboxId.fromJSON(object.allowInboxId)
                : undefined,
            denyInboxId: isSet(object.denyInboxId)
                ? exports.PrivatePreferencesAction_DenyInboxId.fromJSON(object.denyInboxId)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.allowAddress !== undefined &&
            (obj.allowAddress = message.allowAddress
                ? exports.PrivatePreferencesAction_AllowAddress.toJSON(message.allowAddress)
                : undefined);
        message.denyAddress !== undefined &&
            (obj.denyAddress = message.denyAddress
                ? exports.PrivatePreferencesAction_DenyAddress.toJSON(message.denyAddress)
                : undefined);
        message.allowGroup !== undefined &&
            (obj.allowGroup = message.allowGroup
                ? exports.PrivatePreferencesAction_AllowGroup.toJSON(message.allowGroup)
                : undefined);
        message.denyGroup !== undefined &&
            (obj.denyGroup = message.denyGroup
                ? exports.PrivatePreferencesAction_DenyGroup.toJSON(message.denyGroup)
                : undefined);
        message.allowInboxId !== undefined &&
            (obj.allowInboxId = message.allowInboxId
                ? exports.PrivatePreferencesAction_AllowInboxId.toJSON(message.allowInboxId)
                : undefined);
        message.denyInboxId !== undefined &&
            (obj.denyInboxId = message.denyInboxId
                ? exports.PrivatePreferencesAction_DenyInboxId.toJSON(message.denyInboxId)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrivatePreferencesAction();
        message.allowAddress =
            object.allowAddress !== undefined && object.allowAddress !== null
                ? exports.PrivatePreferencesAction_AllowAddress.fromPartial(object.allowAddress)
                : undefined;
        message.denyAddress =
            object.denyAddress !== undefined && object.denyAddress !== null
                ? exports.PrivatePreferencesAction_DenyAddress.fromPartial(object.denyAddress)
                : undefined;
        message.allowGroup =
            object.allowGroup !== undefined && object.allowGroup !== null
                ? exports.PrivatePreferencesAction_AllowGroup.fromPartial(object.allowGroup)
                : undefined;
        message.denyGroup =
            object.denyGroup !== undefined && object.denyGroup !== null
                ? exports.PrivatePreferencesAction_DenyGroup.fromPartial(object.denyGroup)
                : undefined;
        message.allowInboxId =
            object.allowInboxId !== undefined && object.allowInboxId !== null
                ? exports.PrivatePreferencesAction_AllowInboxId.fromPartial(object.allowInboxId)
                : undefined;
        message.denyInboxId =
            object.denyInboxId !== undefined && object.denyInboxId !== null
                ? exports.PrivatePreferencesAction_DenyInboxId.fromPartial(object.denyInboxId)
                : undefined;
        return message;
    },
};
function createBasePrivatePreferencesAction_AllowAddress() {
    return { walletAddresses: [] };
}
exports.PrivatePreferencesAction_AllowAddress = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.walletAddresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction_AllowAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.walletAddresses.push(reader.string());
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
            walletAddresses: Array.isArray(object === null || object === void 0 ? void 0 : object.walletAddresses)
                ? object.walletAddresses.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.walletAddresses) {
            obj.walletAddresses = message.walletAddresses.map((e) => e);
        }
        else {
            obj.walletAddresses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivatePreferencesAction_AllowAddress();
        message.walletAddresses = ((_a = object.walletAddresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBasePrivatePreferencesAction_DenyAddress() {
    return { walletAddresses: [] };
}
exports.PrivatePreferencesAction_DenyAddress = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.walletAddresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction_DenyAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.walletAddresses.push(reader.string());
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
            walletAddresses: Array.isArray(object === null || object === void 0 ? void 0 : object.walletAddresses)
                ? object.walletAddresses.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.walletAddresses) {
            obj.walletAddresses = message.walletAddresses.map((e) => e);
        }
        else {
            obj.walletAddresses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivatePreferencesAction_DenyAddress();
        message.walletAddresses = ((_a = object.walletAddresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBasePrivatePreferencesAction_AllowInboxId() {
    return { inboxIds: [] };
}
exports.PrivatePreferencesAction_AllowInboxId = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.inboxIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction_AllowInboxId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inboxIds.push(reader.string());
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
            inboxIds: Array.isArray(object === null || object === void 0 ? void 0 : object.inboxIds)
                ? object.inboxIds.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.inboxIds) {
            obj.inboxIds = message.inboxIds.map((e) => e);
        }
        else {
            obj.inboxIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivatePreferencesAction_AllowInboxId();
        message.inboxIds = ((_a = object.inboxIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBasePrivatePreferencesAction_DenyInboxId() {
    return { inboxIds: [] };
}
exports.PrivatePreferencesAction_DenyInboxId = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.inboxIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction_DenyInboxId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inboxIds.push(reader.string());
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
            inboxIds: Array.isArray(object === null || object === void 0 ? void 0 : object.inboxIds)
                ? object.inboxIds.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.inboxIds) {
            obj.inboxIds = message.inboxIds.map((e) => e);
        }
        else {
            obj.inboxIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivatePreferencesAction_DenyInboxId();
        message.inboxIds = ((_a = object.inboxIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBasePrivatePreferencesAction_AllowGroup() {
    return { groupIds: [] };
}
exports.PrivatePreferencesAction_AllowGroup = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.groupIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction_AllowGroup();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupIds.push(reader.string());
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
            groupIds: Array.isArray(object === null || object === void 0 ? void 0 : object.groupIds)
                ? object.groupIds.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupIds) {
            obj.groupIds = message.groupIds.map((e) => e);
        }
        else {
            obj.groupIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivatePreferencesAction_AllowGroup();
        message.groupIds = ((_a = object.groupIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBasePrivatePreferencesAction_DenyGroup() {
    return { groupIds: [] };
}
exports.PrivatePreferencesAction_DenyGroup = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.groupIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction_DenyGroup();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupIds.push(reader.string());
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
            groupIds: Array.isArray(object === null || object === void 0 ? void 0 : object.groupIds)
                ? object.groupIds.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupIds) {
            obj.groupIds = message.groupIds.map((e) => e);
        }
        else {
            obj.groupIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBasePrivatePreferencesAction_DenyGroup();
        message.groupIds = ((_a = object.groupIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBasePrivatePreferencesPayload() {
    return { v1: undefined };
}
exports.PrivatePreferencesPayload = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            ciphertext_pb_1.Ciphertext.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesPayload();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = ciphertext_pb_1.Ciphertext.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? ciphertext_pb_1.Ciphertext.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? ciphertext_pb_1.Ciphertext.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrivatePreferencesPayload();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.v1)
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
//# sourceMappingURL=private_preferences.pb.js.map