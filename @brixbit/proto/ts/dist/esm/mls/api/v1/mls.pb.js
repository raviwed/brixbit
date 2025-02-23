/* eslint-disable */
import Long from "long";
import { Signature } from "../../../message_contents/signature.pb";
import { Empty } from "../../../google/protobuf/empty.pb";
import { map } from "rxjs/operators";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.api.v1";
/** Message API */
/** Sort direction for queries */
export var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["SORT_DIRECTION_UNSPECIFIED"] = 0] = "SORT_DIRECTION_UNSPECIFIED";
    SortDirection[SortDirection["SORT_DIRECTION_ASCENDING"] = 1] = "SORT_DIRECTION_ASCENDING";
    SortDirection[SortDirection["SORT_DIRECTION_DESCENDING"] = 2] = "SORT_DIRECTION_DESCENDING";
    SortDirection[SortDirection["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SortDirection || (SortDirection = {}));
export function sortDirectionFromJSON(object) {
    switch (object) {
        case 0:
        case "SORT_DIRECTION_UNSPECIFIED":
            return SortDirection.SORT_DIRECTION_UNSPECIFIED;
        case 1:
        case "SORT_DIRECTION_ASCENDING":
            return SortDirection.SORT_DIRECTION_ASCENDING;
        case 2:
        case "SORT_DIRECTION_DESCENDING":
            return SortDirection.SORT_DIRECTION_DESCENDING;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SortDirection.UNRECOGNIZED;
    }
}
export function sortDirectionToJSON(object) {
    switch (object) {
        case SortDirection.SORT_DIRECTION_UNSPECIFIED:
            return "SORT_DIRECTION_UNSPECIFIED";
        case SortDirection.SORT_DIRECTION_ASCENDING:
            return "SORT_DIRECTION_ASCENDING";
        case SortDirection.SORT_DIRECTION_DESCENDING:
            return "SORT_DIRECTION_DESCENDING";
        case SortDirection.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseWelcomeMessage() {
    return { v1: undefined };
}
export const WelcomeMessage = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            WelcomeMessage_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWelcomeMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = WelcomeMessage_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? WelcomeMessage_V1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? WelcomeMessage_V1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseWelcomeMessage();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? WelcomeMessage_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseWelcomeMessage_V1() {
    return {
        id: Long.UZERO,
        createdNs: Long.UZERO,
        installationKey: new Uint8Array(),
        data: new Uint8Array(),
        hpkePublicKey: new Uint8Array(),
    };
}
export const WelcomeMessage_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(16).uint64(message.createdNs);
        }
        if (message.installationKey.length !== 0) {
            writer.uint32(26).bytes(message.installationKey);
        }
        if (message.data.length !== 0) {
            writer.uint32(34).bytes(message.data);
        }
        if (message.hpkePublicKey.length !== 0) {
            writer.uint32(42).bytes(message.hpkePublicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWelcomeMessage_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.createdNs = reader.uint64();
                    break;
                case 3:
                    message.installationKey = reader.bytes();
                    break;
                case 4:
                    message.data = reader.bytes();
                    break;
                case 5:
                    message.hpkePublicKey = reader.bytes();
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
            id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
            createdNs: isSet(object.createdNs)
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            hpkePublicKey: isSet(object.hpkePublicKey)
                ? bytesFromBase64(object.hpkePublicKey)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || Long.UZERO).toString());
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.hpkePublicKey !== undefined &&
            (obj.hpkePublicKey = base64FromBytes(message.hpkePublicKey !== undefined
                ? message.hpkePublicKey
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseWelcomeMessage_V1();
        message.id =
            object.id !== undefined && object.id !== null
                ? Long.fromValue(object.id)
                : Long.UZERO;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.hpkePublicKey = (_c = object.hpkePublicKey) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseWelcomeMessageInput() {
    return { v1: undefined };
}
export const WelcomeMessageInput = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            WelcomeMessageInput_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWelcomeMessageInput();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = WelcomeMessageInput_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1)
                ? WelcomeMessageInput_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? WelcomeMessageInput_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseWelcomeMessageInput();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? WelcomeMessageInput_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseWelcomeMessageInput_V1() {
    return {
        installationKey: new Uint8Array(),
        data: new Uint8Array(),
        hpkePublicKey: new Uint8Array(),
    };
}
export const WelcomeMessageInput_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.hpkePublicKey.length !== 0) {
            writer.uint32(26).bytes(message.hpkePublicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWelcomeMessageInput_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.hpkePublicKey = reader.bytes();
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            hpkePublicKey: isSet(object.hpkePublicKey)
                ? bytesFromBase64(object.hpkePublicKey)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.hpkePublicKey !== undefined &&
            (obj.hpkePublicKey = base64FromBytes(message.hpkePublicKey !== undefined
                ? message.hpkePublicKey
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseWelcomeMessageInput_V1();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.hpkePublicKey = (_c = object.hpkePublicKey) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseGroupMessage() {
    return { v1: undefined };
}
export const GroupMessage = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            GroupMessage_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = GroupMessage_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? GroupMessage_V1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? GroupMessage_V1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupMessage();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? GroupMessage_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseGroupMessage_V1() {
    return {
        id: Long.UZERO,
        createdNs: Long.UZERO,
        groupId: new Uint8Array(),
        data: new Uint8Array(),
        senderHmac: new Uint8Array(),
    };
}
export const GroupMessage_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(16).uint64(message.createdNs);
        }
        if (message.groupId.length !== 0) {
            writer.uint32(26).bytes(message.groupId);
        }
        if (message.data.length !== 0) {
            writer.uint32(34).bytes(message.data);
        }
        if (message.senderHmac.length !== 0) {
            writer.uint32(42).bytes(message.senderHmac);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMessage_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.createdNs = reader.uint64();
                    break;
                case 3:
                    message.groupId = reader.bytes();
                    break;
                case 4:
                    message.data = reader.bytes();
                    break;
                case 5:
                    message.senderHmac = reader.bytes();
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
            id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
            createdNs: isSet(object.createdNs)
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
            groupId: isSet(object.groupId)
                ? bytesFromBase64(object.groupId)
                : new Uint8Array(),
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            senderHmac: isSet(object.senderHmac)
                ? bytesFromBase64(object.senderHmac)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || Long.UZERO).toString());
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        message.groupId !== undefined &&
            (obj.groupId = base64FromBytes(message.groupId !== undefined ? message.groupId : new Uint8Array()));
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.senderHmac !== undefined &&
            (obj.senderHmac = base64FromBytes(message.senderHmac !== undefined ? message.senderHmac : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseGroupMessage_V1();
        message.id =
            object.id !== undefined && object.id !== null
                ? Long.fromValue(object.id)
                : Long.UZERO;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        message.groupId = (_a = object.groupId) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.senderHmac = (_c = object.senderHmac) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseGroupMessageInput() {
    return { v1: undefined };
}
export const GroupMessageInput = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            GroupMessageInput_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMessageInput();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = GroupMessageInput_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1)
                ? GroupMessageInput_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? GroupMessageInput_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupMessageInput();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? GroupMessageInput_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseGroupMessageInput_V1() {
    return { data: new Uint8Array(), senderHmac: new Uint8Array() };
}
export const GroupMessageInput_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.senderHmac.length !== 0) {
            writer.uint32(18).bytes(message.senderHmac);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMessageInput_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.senderHmac = reader.bytes();
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
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            senderHmac: isSet(object.senderHmac)
                ? bytesFromBase64(object.senderHmac)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.senderHmac !== undefined &&
            (obj.senderHmac = base64FromBytes(message.senderHmac !== undefined ? message.senderHmac : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGroupMessageInput_V1();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.senderHmac = (_b = object.senderHmac) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseSendGroupMessagesRequest() {
    return { messages: [] };
}
export const SendGroupMessagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            GroupMessageInput.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(GroupMessageInput.decode(reader, reader.uint32()));
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
            messages: Array.isArray(object === null || object === void 0 ? void 0 : object.messages)
                ? object.messages.map((e) => GroupMessageInput.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? GroupMessageInput.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSendGroupMessagesRequest();
        message.messages =
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => GroupMessageInput.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSendWelcomeMessagesRequest() {
    return { messages: [] };
}
export const SendWelcomeMessagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            WelcomeMessageInput.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendWelcomeMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(WelcomeMessageInput.decode(reader, reader.uint32()));
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
            messages: Array.isArray(object === null || object === void 0 ? void 0 : object.messages)
                ? object.messages.map((e) => WelcomeMessageInput.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? WelcomeMessageInput.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSendWelcomeMessagesRequest();
        message.messages =
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => WelcomeMessageInput.fromPartial(e))) || [];
        return message;
    },
};
function createBaseKeyPackageUpload() {
    return { keyPackageTlsSerialized: new Uint8Array() };
}
export const KeyPackageUpload = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyPackageTlsSerialized.length !== 0) {
            writer.uint32(10).bytes(message.keyPackageTlsSerialized);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseKeyPackageUpload();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackageTlsSerialized = reader.bytes();
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
            keyPackageTlsSerialized: isSet(object.keyPackageTlsSerialized)
                ? bytesFromBase64(object.keyPackageTlsSerialized)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyPackageTlsSerialized !== undefined &&
            (obj.keyPackageTlsSerialized = base64FromBytes(message.keyPackageTlsSerialized !== undefined
                ? message.keyPackageTlsSerialized
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseKeyPackageUpload();
        message.keyPackageTlsSerialized =
            (_a = object.keyPackageTlsSerialized) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseRegisterInstallationRequest() {
    return { keyPackage: undefined, isInboxIdCredential: false };
}
export const RegisterInstallationRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyPackage !== undefined) {
            KeyPackageUpload.encode(message.keyPackage, writer.uint32(10).fork()).ldelim();
        }
        if (message.isInboxIdCredential === true) {
            writer.uint32(16).bool(message.isInboxIdCredential);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRegisterInstallationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackage = KeyPackageUpload.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.isInboxIdCredential = reader.bool();
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
            keyPackage: isSet(object.keyPackage)
                ? KeyPackageUpload.fromJSON(object.keyPackage)
                : undefined,
            isInboxIdCredential: isSet(object.isInboxIdCredential)
                ? Boolean(object.isInboxIdCredential)
                : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyPackage !== undefined &&
            (obj.keyPackage = message.keyPackage
                ? KeyPackageUpload.toJSON(message.keyPackage)
                : undefined);
        message.isInboxIdCredential !== undefined &&
            (obj.isInboxIdCredential = message.isInboxIdCredential);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRegisterInstallationRequest();
        message.keyPackage =
            object.keyPackage !== undefined && object.keyPackage !== null
                ? KeyPackageUpload.fromPartial(object.keyPackage)
                : undefined;
        message.isInboxIdCredential = (_a = object.isInboxIdCredential) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
function createBaseRegisterInstallationResponse() {
    return { installationKey: new Uint8Array() };
}
export const RegisterInstallationResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRegisterInstallationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRegisterInstallationResponse();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseUploadKeyPackageRequest() {
    return { keyPackage: undefined, isInboxIdCredential: false };
}
export const UploadKeyPackageRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyPackage !== undefined) {
            KeyPackageUpload.encode(message.keyPackage, writer.uint32(10).fork()).ldelim();
        }
        if (message.isInboxIdCredential === true) {
            writer.uint32(16).bool(message.isInboxIdCredential);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUploadKeyPackageRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackage = KeyPackageUpload.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.isInboxIdCredential = reader.bool();
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
            keyPackage: isSet(object.keyPackage)
                ? KeyPackageUpload.fromJSON(object.keyPackage)
                : undefined,
            isInboxIdCredential: isSet(object.isInboxIdCredential)
                ? Boolean(object.isInboxIdCredential)
                : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyPackage !== undefined &&
            (obj.keyPackage = message.keyPackage
                ? KeyPackageUpload.toJSON(message.keyPackage)
                : undefined);
        message.isInboxIdCredential !== undefined &&
            (obj.isInboxIdCredential = message.isInboxIdCredential);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseUploadKeyPackageRequest();
        message.keyPackage =
            object.keyPackage !== undefined && object.keyPackage !== null
                ? KeyPackageUpload.fromPartial(object.keyPackage)
                : undefined;
        message.isInboxIdCredential = (_a = object.isInboxIdCredential) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
function createBaseFetchKeyPackagesRequest() {
    return { installationKeys: [] };
}
export const FetchKeyPackagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.installationKeys) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFetchKeyPackagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKeys.push(reader.bytes());
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
            installationKeys: Array.isArray(object === null || object === void 0 ? void 0 : object.installationKeys)
                ? object.installationKeys.map((e) => bytesFromBase64(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.installationKeys) {
            obj.installationKeys = message.installationKeys.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.installationKeys = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseFetchKeyPackagesRequest();
        message.installationKeys = ((_a = object.installationKeys) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseFetchKeyPackagesResponse() {
    return { keyPackages: [] };
}
export const FetchKeyPackagesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.keyPackages) {
            FetchKeyPackagesResponse_KeyPackage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFetchKeyPackagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackages.push(FetchKeyPackagesResponse_KeyPackage.decode(reader, reader.uint32()));
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
            keyPackages: Array.isArray(object === null || object === void 0 ? void 0 : object.keyPackages)
                ? object.keyPackages.map((e) => FetchKeyPackagesResponse_KeyPackage.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyPackages) {
            obj.keyPackages = message.keyPackages.map((e) => e ? FetchKeyPackagesResponse_KeyPackage.toJSON(e) : undefined);
        }
        else {
            obj.keyPackages = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseFetchKeyPackagesResponse();
        message.keyPackages =
            ((_a = object.keyPackages) === null || _a === void 0 ? void 0 : _a.map((e) => FetchKeyPackagesResponse_KeyPackage.fromPartial(e))) || [];
        return message;
    },
};
function createBaseFetchKeyPackagesResponse_KeyPackage() {
    return { keyPackageTlsSerialized: new Uint8Array() };
}
export const FetchKeyPackagesResponse_KeyPackage = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyPackageTlsSerialized.length !== 0) {
            writer.uint32(10).bytes(message.keyPackageTlsSerialized);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFetchKeyPackagesResponse_KeyPackage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackageTlsSerialized = reader.bytes();
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
            keyPackageTlsSerialized: isSet(object.keyPackageTlsSerialized)
                ? bytesFromBase64(object.keyPackageTlsSerialized)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyPackageTlsSerialized !== undefined &&
            (obj.keyPackageTlsSerialized = base64FromBytes(message.keyPackageTlsSerialized !== undefined
                ? message.keyPackageTlsSerialized
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseFetchKeyPackagesResponse_KeyPackage();
        message.keyPackageTlsSerialized =
            (_a = object.keyPackageTlsSerialized) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseRevokeInstallationRequest() {
    return { installationKey: new Uint8Array(), walletSignature: undefined };
}
export const RevokeInstallationRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.walletSignature !== undefined) {
            Signature.encode(message.walletSignature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRevokeInstallationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.walletSignature = Signature.decode(reader, reader.uint32());
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
            walletSignature: isSet(object.walletSignature)
                ? Signature.fromJSON(object.walletSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.walletSignature !== undefined &&
            (obj.walletSignature = message.walletSignature
                ? Signature.toJSON(message.walletSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRevokeInstallationRequest();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.walletSignature =
            object.walletSignature !== undefined && object.walletSignature !== null
                ? Signature.fromPartial(object.walletSignature)
                : undefined;
        return message;
    },
};
function createBaseGetIdentityUpdatesRequest() {
    return { accountAddresses: [], startTimeNs: Long.UZERO };
}
export const GetIdentityUpdatesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.accountAddresses) {
            writer.uint32(10).string(v);
        }
        if (!message.startTimeNs.isZero()) {
            writer.uint32(16).uint64(message.startTimeNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountAddresses.push(reader.string());
                    break;
                case 2:
                    message.startTimeNs = reader.uint64();
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
            accountAddresses: Array.isArray(object === null || object === void 0 ? void 0 : object.accountAddresses)
                ? object.accountAddresses.map((e) => String(e))
                : [],
            startTimeNs: isSet(object.startTimeNs)
                ? Long.fromValue(object.startTimeNs)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.accountAddresses) {
            obj.accountAddresses = message.accountAddresses.map((e) => e);
        }
        else {
            obj.accountAddresses = [];
        }
        message.startTimeNs !== undefined &&
            (obj.startTimeNs = (message.startTimeNs || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetIdentityUpdatesRequest();
        message.accountAddresses = ((_a = object.accountAddresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        message.startTimeNs =
            object.startTimeNs !== undefined && object.startTimeNs !== null
                ? Long.fromValue(object.startTimeNs)
                : Long.UZERO;
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse() {
    return { updates: [] };
}
export const GetIdentityUpdatesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.updates) {
            GetIdentityUpdatesResponse_WalletUpdates.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(GetIdentityUpdatesResponse_WalletUpdates.decode(reader, reader.uint32()));
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
            updates: Array.isArray(object === null || object === void 0 ? void 0 : object.updates)
                ? object.updates.map((e) => GetIdentityUpdatesResponse_WalletUpdates.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map((e) => e ? GetIdentityUpdatesResponse_WalletUpdates.toJSON(e) : undefined);
        }
        else {
            obj.updates = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetIdentityUpdatesResponse();
        message.updates =
            ((_a = object.updates) === null || _a === void 0 ? void 0 : _a.map((e) => GetIdentityUpdatesResponse_WalletUpdates.fromPartial(e))) || [];
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse_NewInstallationUpdate() {
    return {
        installationKey: new Uint8Array(),
        credentialIdentity: new Uint8Array(),
    };
}
export const GetIdentityUpdatesResponse_NewInstallationUpdate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.credentialIdentity.length !== 0) {
            writer.uint32(18).bytes(message.credentialIdentity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse_NewInstallationUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.credentialIdentity = reader.bytes();
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
            credentialIdentity: isSet(object.credentialIdentity)
                ? bytesFromBase64(object.credentialIdentity)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.credentialIdentity !== undefined &&
            (obj.credentialIdentity = base64FromBytes(message.credentialIdentity !== undefined
                ? message.credentialIdentity
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGetIdentityUpdatesResponse_NewInstallationUpdate();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.credentialIdentity = (_b = object.credentialIdentity) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse_RevokedInstallationUpdate() {
    return { installationKey: new Uint8Array() };
}
export const GetIdentityUpdatesResponse_RevokedInstallationUpdate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse_RevokedInstallationUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetIdentityUpdatesResponse_RevokedInstallationUpdate();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse_Update() {
    return {
        timestampNs: Long.UZERO,
        newInstallation: undefined,
        revokedInstallation: undefined,
    };
}
export const GetIdentityUpdatesResponse_Update = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.timestampNs.isZero()) {
            writer.uint32(8).uint64(message.timestampNs);
        }
        if (message.newInstallation !== undefined) {
            GetIdentityUpdatesResponse_NewInstallationUpdate.encode(message.newInstallation, writer.uint32(18).fork()).ldelim();
        }
        if (message.revokedInstallation !== undefined) {
            GetIdentityUpdatesResponse_RevokedInstallationUpdate.encode(message.revokedInstallation, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse_Update();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestampNs = reader.uint64();
                    break;
                case 2:
                    message.newInstallation =
                        GetIdentityUpdatesResponse_NewInstallationUpdate.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.revokedInstallation =
                        GetIdentityUpdatesResponse_RevokedInstallationUpdate.decode(reader, reader.uint32());
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
            timestampNs: isSet(object.timestampNs)
                ? Long.fromValue(object.timestampNs)
                : Long.UZERO,
            newInstallation: isSet(object.newInstallation)
                ? GetIdentityUpdatesResponse_NewInstallationUpdate.fromJSON(object.newInstallation)
                : undefined,
            revokedInstallation: isSet(object.revokedInstallation)
                ? GetIdentityUpdatesResponse_RevokedInstallationUpdate.fromJSON(object.revokedInstallation)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.timestampNs !== undefined &&
            (obj.timestampNs = (message.timestampNs || Long.UZERO).toString());
        message.newInstallation !== undefined &&
            (obj.newInstallation = message.newInstallation
                ? GetIdentityUpdatesResponse_NewInstallationUpdate.toJSON(message.newInstallation)
                : undefined);
        message.revokedInstallation !== undefined &&
            (obj.revokedInstallation = message.revokedInstallation
                ? GetIdentityUpdatesResponse_RevokedInstallationUpdate.toJSON(message.revokedInstallation)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGetIdentityUpdatesResponse_Update();
        message.timestampNs =
            object.timestampNs !== undefined && object.timestampNs !== null
                ? Long.fromValue(object.timestampNs)
                : Long.UZERO;
        message.newInstallation =
            object.newInstallation !== undefined && object.newInstallation !== null
                ? GetIdentityUpdatesResponse_NewInstallationUpdate.fromPartial(object.newInstallation)
                : undefined;
        message.revokedInstallation =
            object.revokedInstallation !== undefined &&
                object.revokedInstallation !== null
                ? GetIdentityUpdatesResponse_RevokedInstallationUpdate.fromPartial(object.revokedInstallation)
                : undefined;
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse_WalletUpdates() {
    return { updates: [] };
}
export const GetIdentityUpdatesResponse_WalletUpdates = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.updates) {
            GetIdentityUpdatesResponse_Update.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse_WalletUpdates();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(GetIdentityUpdatesResponse_Update.decode(reader, reader.uint32()));
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
            updates: Array.isArray(object === null || object === void 0 ? void 0 : object.updates)
                ? object.updates.map((e) => GetIdentityUpdatesResponse_Update.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map((e) => e ? GetIdentityUpdatesResponse_Update.toJSON(e) : undefined);
        }
        else {
            obj.updates = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetIdentityUpdatesResponse_WalletUpdates();
        message.updates =
            ((_a = object.updates) === null || _a === void 0 ? void 0 : _a.map((e) => GetIdentityUpdatesResponse_Update.fromPartial(e))) || [];
        return message;
    },
};
function createBasePagingInfo() {
    return { direction: 0, limit: 0, idCursor: Long.UZERO };
}
export const PagingInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.direction !== 0) {
            writer.uint32(8).int32(message.direction);
        }
        if (message.limit !== 0) {
            writer.uint32(16).uint32(message.limit);
        }
        if (!message.idCursor.isZero()) {
            writer.uint32(24).uint64(message.idCursor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePagingInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.direction = reader.int32();
                    break;
                case 2:
                    message.limit = reader.uint32();
                    break;
                case 3:
                    message.idCursor = reader.uint64();
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
            direction: isSet(object.direction)
                ? sortDirectionFromJSON(object.direction)
                : 0,
            limit: isSet(object.limit) ? Number(object.limit) : 0,
            idCursor: isSet(object.idCursor)
                ? Long.fromValue(object.idCursor)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.direction !== undefined &&
            (obj.direction = sortDirectionToJSON(message.direction));
        message.limit !== undefined && (obj.limit = Math.round(message.limit));
        message.idCursor !== undefined &&
            (obj.idCursor = (message.idCursor || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePagingInfo();
        message.direction = (_a = object.direction) !== null && _a !== void 0 ? _a : 0;
        message.limit = (_b = object.limit) !== null && _b !== void 0 ? _b : 0;
        message.idCursor =
            object.idCursor !== undefined && object.idCursor !== null
                ? Long.fromValue(object.idCursor)
                : Long.UZERO;
        return message;
    },
};
function createBaseQueryGroupMessagesRequest() {
    return { groupId: new Uint8Array(), pagingInfo: undefined };
}
export const QueryGroupMessagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId.length !== 0) {
            writer.uint32(10).bytes(message.groupId);
        }
        if (message.pagingInfo !== undefined) {
            PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.bytes();
                    break;
                case 2:
                    message.pagingInfo = PagingInfo.decode(reader, reader.uint32());
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
            groupId: isSet(object.groupId)
                ? bytesFromBase64(object.groupId)
                : new Uint8Array(),
            pagingInfo: isSet(object.pagingInfo)
                ? PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.groupId !== undefined &&
            (obj.groupId = base64FromBytes(message.groupId !== undefined ? message.groupId : new Uint8Array()));
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryGroupMessagesRequest();
        message.groupId = (_a = object.groupId) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseQueryGroupMessagesResponse() {
    return { messages: [], pagingInfo: undefined };
}
export const QueryGroupMessagesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            GroupMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagingInfo !== undefined) {
            PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGroupMessagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(GroupMessage.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagingInfo = PagingInfo.decode(reader, reader.uint32());
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
            messages: Array.isArray(object === null || object === void 0 ? void 0 : object.messages)
                ? object.messages.map((e) => GroupMessage.fromJSON(e))
                : [],
            pagingInfo: isSet(object.pagingInfo)
                ? PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? GroupMessage.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryGroupMessagesResponse();
        message.messages =
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => GroupMessage.fromPartial(e))) || [];
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseQueryWelcomeMessagesRequest() {
    return { installationKey: new Uint8Array(), pagingInfo: undefined };
}
export const QueryWelcomeMessagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.pagingInfo !== undefined) {
            PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWelcomeMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.pagingInfo = PagingInfo.decode(reader, reader.uint32());
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
            pagingInfo: isSet(object.pagingInfo)
                ? PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryWelcomeMessagesRequest();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseQueryWelcomeMessagesResponse() {
    return { messages: [], pagingInfo: undefined };
}
export const QueryWelcomeMessagesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            WelcomeMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagingInfo !== undefined) {
            PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWelcomeMessagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(WelcomeMessage.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagingInfo = PagingInfo.decode(reader, reader.uint32());
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
            messages: Array.isArray(object === null || object === void 0 ? void 0 : object.messages)
                ? object.messages.map((e) => WelcomeMessage.fromJSON(e))
                : [],
            pagingInfo: isSet(object.pagingInfo)
                ? PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? WelcomeMessage.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryWelcomeMessagesResponse();
        message.messages =
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => WelcomeMessage.fromPartial(e))) || [];
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseSubscribeGroupMessagesRequest() {
    return { filters: [] };
}
export const SubscribeGroupMessagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.filters) {
            SubscribeGroupMessagesRequest_Filter.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscribeGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters.push(SubscribeGroupMessagesRequest_Filter.decode(reader, reader.uint32()));
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
            filters: Array.isArray(object === null || object === void 0 ? void 0 : object.filters)
                ? object.filters.map((e) => SubscribeGroupMessagesRequest_Filter.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.filters) {
            obj.filters = message.filters.map((e) => e ? SubscribeGroupMessagesRequest_Filter.toJSON(e) : undefined);
        }
        else {
            obj.filters = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSubscribeGroupMessagesRequest();
        message.filters =
            ((_a = object.filters) === null || _a === void 0 ? void 0 : _a.map((e) => SubscribeGroupMessagesRequest_Filter.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSubscribeGroupMessagesRequest_Filter() {
    return { groupId: new Uint8Array(), idCursor: Long.UZERO };
}
export const SubscribeGroupMessagesRequest_Filter = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId.length !== 0) {
            writer.uint32(10).bytes(message.groupId);
        }
        if (!message.idCursor.isZero()) {
            writer.uint32(16).uint64(message.idCursor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscribeGroupMessagesRequest_Filter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.bytes();
                    break;
                case 2:
                    message.idCursor = reader.uint64();
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
            groupId: isSet(object.groupId)
                ? bytesFromBase64(object.groupId)
                : new Uint8Array(),
            idCursor: isSet(object.idCursor)
                ? Long.fromValue(object.idCursor)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.groupId !== undefined &&
            (obj.groupId = base64FromBytes(message.groupId !== undefined ? message.groupId : new Uint8Array()));
        message.idCursor !== undefined &&
            (obj.idCursor = (message.idCursor || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSubscribeGroupMessagesRequest_Filter();
        message.groupId = (_a = object.groupId) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.idCursor =
            object.idCursor !== undefined && object.idCursor !== null
                ? Long.fromValue(object.idCursor)
                : Long.UZERO;
        return message;
    },
};
function createBaseSubscribeWelcomeMessagesRequest() {
    return { filters: [] };
}
export const SubscribeWelcomeMessagesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.filters) {
            SubscribeWelcomeMessagesRequest_Filter.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscribeWelcomeMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters.push(SubscribeWelcomeMessagesRequest_Filter.decode(reader, reader.uint32()));
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
            filters: Array.isArray(object === null || object === void 0 ? void 0 : object.filters)
                ? object.filters.map((e) => SubscribeWelcomeMessagesRequest_Filter.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.filters) {
            obj.filters = message.filters.map((e) => e ? SubscribeWelcomeMessagesRequest_Filter.toJSON(e) : undefined);
        }
        else {
            obj.filters = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSubscribeWelcomeMessagesRequest();
        message.filters =
            ((_a = object.filters) === null || _a === void 0 ? void 0 : _a.map((e) => SubscribeWelcomeMessagesRequest_Filter.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSubscribeWelcomeMessagesRequest_Filter() {
    return { installationKey: new Uint8Array(), idCursor: Long.UZERO };
}
export const SubscribeWelcomeMessagesRequest_Filter = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (!message.idCursor.isZero()) {
            writer.uint32(16).uint64(message.idCursor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscribeWelcomeMessagesRequest_Filter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.idCursor = reader.uint64();
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
            installationKey: isSet(object.installationKey)
                ? bytesFromBase64(object.installationKey)
                : new Uint8Array(),
            idCursor: isSet(object.idCursor)
                ? Long.fromValue(object.idCursor)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.idCursor !== undefined &&
            (obj.idCursor = (message.idCursor || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSubscribeWelcomeMessagesRequest_Filter();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.idCursor =
            object.idCursor !== undefined && object.idCursor !== null
                ? Long.fromValue(object.idCursor)
                : Long.UZERO;
        return message;
    },
};
export class MlsApiClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.SendGroupMessages = this.SendGroupMessages.bind(this);
        this.SendWelcomeMessages = this.SendWelcomeMessages.bind(this);
        this.RegisterInstallation = this.RegisterInstallation.bind(this);
        this.UploadKeyPackage = this.UploadKeyPackage.bind(this);
        this.FetchKeyPackages = this.FetchKeyPackages.bind(this);
        this.RevokeInstallation = this.RevokeInstallation.bind(this);
        this.GetIdentityUpdates = this.GetIdentityUpdates.bind(this);
        this.QueryGroupMessages = this.QueryGroupMessages.bind(this);
        this.QueryWelcomeMessages = this.QueryWelcomeMessages.bind(this);
        this.SubscribeGroupMessages = this.SubscribeGroupMessages.bind(this);
        this.SubscribeWelcomeMessages = this.SubscribeWelcomeMessages.bind(this);
    }
    SendGroupMessages(request) {
        const data = SendGroupMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "SendGroupMessages", data);
        return promise.then((data) => Empty.decode(new _m0.Reader(data)));
    }
    SendWelcomeMessages(request) {
        const data = SendWelcomeMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "SendWelcomeMessages", data);
        return promise.then((data) => Empty.decode(new _m0.Reader(data)));
    }
    RegisterInstallation(request) {
        const data = RegisterInstallationRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "RegisterInstallation", data);
        return promise.then((data) => RegisterInstallationResponse.decode(new _m0.Reader(data)));
    }
    UploadKeyPackage(request) {
        const data = UploadKeyPackageRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "UploadKeyPackage", data);
        return promise.then((data) => Empty.decode(new _m0.Reader(data)));
    }
    FetchKeyPackages(request) {
        const data = FetchKeyPackagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "FetchKeyPackages", data);
        return promise.then((data) => FetchKeyPackagesResponse.decode(new _m0.Reader(data)));
    }
    RevokeInstallation(request) {
        const data = RevokeInstallationRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "RevokeInstallation", data);
        return promise.then((data) => Empty.decode(new _m0.Reader(data)));
    }
    GetIdentityUpdates(request) {
        const data = GetIdentityUpdatesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "GetIdentityUpdates", data);
        return promise.then((data) => GetIdentityUpdatesResponse.decode(new _m0.Reader(data)));
    }
    QueryGroupMessages(request) {
        const data = QueryGroupMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "QueryGroupMessages", data);
        return promise.then((data) => QueryGroupMessagesResponse.decode(new _m0.Reader(data)));
    }
    QueryWelcomeMessages(request) {
        const data = QueryWelcomeMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "QueryWelcomeMessages", data);
        return promise.then((data) => QueryWelcomeMessagesResponse.decode(new _m0.Reader(data)));
    }
    SubscribeGroupMessages(request) {
        const data = SubscribeGroupMessagesRequest.encode(request).finish();
        const result = this.rpc.serverStreamingRequest("brixbit.mls.api.v1.MlsApi", "SubscribeGroupMessages", data);
        return result.pipe(map((data) => GroupMessage.decode(new _m0.Reader(data))));
    }
    SubscribeWelcomeMessages(request) {
        const data = SubscribeWelcomeMessagesRequest.encode(request).finish();
        const result = this.rpc.serverStreamingRequest("brixbit.mls.api.v1.MlsApi", "SubscribeWelcomeMessages", data);
        return result.pipe(map((data) => WelcomeMessage.decode(new _m0.Reader(data))));
    }
}
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
//# sourceMappingURL=mls.pb.js.map