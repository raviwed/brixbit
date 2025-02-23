/* eslint-disable */
import Long from "long";
import { Ciphertext } from "./ciphertext.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
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
export const PrivatePreferencesAction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.allowAddress !== undefined) {
            PrivatePreferencesAction_AllowAddress.encode(message.allowAddress, writer.uint32(10).fork()).ldelim();
        }
        if (message.denyAddress !== undefined) {
            PrivatePreferencesAction_DenyAddress.encode(message.denyAddress, writer.uint32(18).fork()).ldelim();
        }
        if (message.allowGroup !== undefined) {
            PrivatePreferencesAction_AllowGroup.encode(message.allowGroup, writer.uint32(26).fork()).ldelim();
        }
        if (message.denyGroup !== undefined) {
            PrivatePreferencesAction_DenyGroup.encode(message.denyGroup, writer.uint32(34).fork()).ldelim();
        }
        if (message.allowInboxId !== undefined) {
            PrivatePreferencesAction_AllowInboxId.encode(message.allowInboxId, writer.uint32(42).fork()).ldelim();
        }
        if (message.denyInboxId !== undefined) {
            PrivatePreferencesAction_DenyInboxId.encode(message.denyInboxId, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.allowAddress = PrivatePreferencesAction_AllowAddress.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.denyAddress = PrivatePreferencesAction_DenyAddress.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.allowGroup = PrivatePreferencesAction_AllowGroup.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.denyGroup = PrivatePreferencesAction_DenyGroup.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.allowInboxId = PrivatePreferencesAction_AllowInboxId.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.denyInboxId = PrivatePreferencesAction_DenyInboxId.decode(reader, reader.uint32());
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
                ? PrivatePreferencesAction_AllowAddress.fromJSON(object.allowAddress)
                : undefined,
            denyAddress: isSet(object.denyAddress)
                ? PrivatePreferencesAction_DenyAddress.fromJSON(object.denyAddress)
                : undefined,
            allowGroup: isSet(object.allowGroup)
                ? PrivatePreferencesAction_AllowGroup.fromJSON(object.allowGroup)
                : undefined,
            denyGroup: isSet(object.denyGroup)
                ? PrivatePreferencesAction_DenyGroup.fromJSON(object.denyGroup)
                : undefined,
            allowInboxId: isSet(object.allowInboxId)
                ? PrivatePreferencesAction_AllowInboxId.fromJSON(object.allowInboxId)
                : undefined,
            denyInboxId: isSet(object.denyInboxId)
                ? PrivatePreferencesAction_DenyInboxId.fromJSON(object.denyInboxId)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.allowAddress !== undefined &&
            (obj.allowAddress = message.allowAddress
                ? PrivatePreferencesAction_AllowAddress.toJSON(message.allowAddress)
                : undefined);
        message.denyAddress !== undefined &&
            (obj.denyAddress = message.denyAddress
                ? PrivatePreferencesAction_DenyAddress.toJSON(message.denyAddress)
                : undefined);
        message.allowGroup !== undefined &&
            (obj.allowGroup = message.allowGroup
                ? PrivatePreferencesAction_AllowGroup.toJSON(message.allowGroup)
                : undefined);
        message.denyGroup !== undefined &&
            (obj.denyGroup = message.denyGroup
                ? PrivatePreferencesAction_DenyGroup.toJSON(message.denyGroup)
                : undefined);
        message.allowInboxId !== undefined &&
            (obj.allowInboxId = message.allowInboxId
                ? PrivatePreferencesAction_AllowInboxId.toJSON(message.allowInboxId)
                : undefined);
        message.denyInboxId !== undefined &&
            (obj.denyInboxId = message.denyInboxId
                ? PrivatePreferencesAction_DenyInboxId.toJSON(message.denyInboxId)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrivatePreferencesAction();
        message.allowAddress =
            object.allowAddress !== undefined && object.allowAddress !== null
                ? PrivatePreferencesAction_AllowAddress.fromPartial(object.allowAddress)
                : undefined;
        message.denyAddress =
            object.denyAddress !== undefined && object.denyAddress !== null
                ? PrivatePreferencesAction_DenyAddress.fromPartial(object.denyAddress)
                : undefined;
        message.allowGroup =
            object.allowGroup !== undefined && object.allowGroup !== null
                ? PrivatePreferencesAction_AllowGroup.fromPartial(object.allowGroup)
                : undefined;
        message.denyGroup =
            object.denyGroup !== undefined && object.denyGroup !== null
                ? PrivatePreferencesAction_DenyGroup.fromPartial(object.denyGroup)
                : undefined;
        message.allowInboxId =
            object.allowInboxId !== undefined && object.allowInboxId !== null
                ? PrivatePreferencesAction_AllowInboxId.fromPartial(object.allowInboxId)
                : undefined;
        message.denyInboxId =
            object.denyInboxId !== undefined && object.denyInboxId !== null
                ? PrivatePreferencesAction_DenyInboxId.fromPartial(object.denyInboxId)
                : undefined;
        return message;
    },
};
function createBasePrivatePreferencesAction_AllowAddress() {
    return { walletAddresses: [] };
}
export const PrivatePreferencesAction_AllowAddress = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.walletAddresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PrivatePreferencesAction_DenyAddress = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.walletAddresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PrivatePreferencesAction_AllowInboxId = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.inboxIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PrivatePreferencesAction_DenyInboxId = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.inboxIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PrivatePreferencesAction_AllowGroup = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groupIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PrivatePreferencesAction_DenyGroup = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groupIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const PrivatePreferencesPayload = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            Ciphertext.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrivatePreferencesPayload();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = Ciphertext.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? Ciphertext.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? Ciphertext.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrivatePreferencesPayload();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? Ciphertext.fromPartial(object.v1)
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
//# sourceMappingURL=private_preferences.pb.js.map