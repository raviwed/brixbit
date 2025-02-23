"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MlsApiClientImpl = exports.SubscribeWelcomeMessagesRequest_Filter = exports.SubscribeWelcomeMessagesRequest = exports.SubscribeGroupMessagesRequest_Filter = exports.SubscribeGroupMessagesRequest = exports.QueryWelcomeMessagesResponse = exports.QueryWelcomeMessagesRequest = exports.QueryGroupMessagesResponse = exports.QueryGroupMessagesRequest = exports.PagingInfo = exports.GetIdentityUpdatesResponse_WalletUpdates = exports.GetIdentityUpdatesResponse_Update = exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate = exports.GetIdentityUpdatesResponse_NewInstallationUpdate = exports.GetIdentityUpdatesResponse = exports.GetIdentityUpdatesRequest = exports.RevokeInstallationRequest = exports.FetchKeyPackagesResponse_KeyPackage = exports.FetchKeyPackagesResponse = exports.FetchKeyPackagesRequest = exports.UploadKeyPackageRequest = exports.RegisterInstallationResponse = exports.RegisterInstallationRequest = exports.KeyPackageUpload = exports.SendWelcomeMessagesRequest = exports.SendGroupMessagesRequest = exports.GroupMessageInput_V1 = exports.GroupMessageInput = exports.GroupMessage_V1 = exports.GroupMessage = exports.WelcomeMessageInput_V1 = exports.WelcomeMessageInput = exports.WelcomeMessage_V1 = exports.WelcomeMessage = exports.sortDirectionToJSON = exports.sortDirectionFromJSON = exports.SortDirection = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const signature_pb_1 = require("../../../message_contents/signature.pb");
const empty_pb_1 = require("../../../google/protobuf/empty.pb");
const operators_1 = require("rxjs/operators");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.mls.api.v1";
/** Message API */
/** Sort direction for queries */
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["SORT_DIRECTION_UNSPECIFIED"] = 0] = "SORT_DIRECTION_UNSPECIFIED";
    SortDirection[SortDirection["SORT_DIRECTION_ASCENDING"] = 1] = "SORT_DIRECTION_ASCENDING";
    SortDirection[SortDirection["SORT_DIRECTION_DESCENDING"] = 2] = "SORT_DIRECTION_DESCENDING";
    SortDirection[SortDirection["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
function sortDirectionFromJSON(object) {
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
exports.sortDirectionFromJSON = sortDirectionFromJSON;
function sortDirectionToJSON(object) {
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
exports.sortDirectionToJSON = sortDirectionToJSON;
function createBaseWelcomeMessage() {
    return { v1: undefined };
}
exports.WelcomeMessage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.WelcomeMessage_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWelcomeMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.WelcomeMessage_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? exports.WelcomeMessage_V1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? exports.WelcomeMessage_V1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseWelcomeMessage();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.WelcomeMessage_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseWelcomeMessage_V1() {
    return {
        id: long_1.default.UZERO,
        createdNs: long_1.default.UZERO,
        installationKey: new Uint8Array(),
        data: new Uint8Array(),
        hpkePublicKey: new Uint8Array(),
    };
}
exports.WelcomeMessage_V1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
            id: isSet(object.id) ? long_1.default.fromValue(object.id) : long_1.default.UZERO,
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
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
            (obj.id = (message.id || long_1.default.UZERO).toString());
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
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
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.hpkePublicKey = (_c = object.hpkePublicKey) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseWelcomeMessageInput() {
    return { v1: undefined };
}
exports.WelcomeMessageInput = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.WelcomeMessageInput_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWelcomeMessageInput();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.WelcomeMessageInput_V1.decode(reader, reader.uint32());
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
                ? exports.WelcomeMessageInput_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? exports.WelcomeMessageInput_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseWelcomeMessageInput();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.WelcomeMessageInput_V1.fromPartial(object.v1)
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
exports.WelcomeMessageInput_V1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.GroupMessage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.GroupMessage_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.GroupMessage_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? exports.GroupMessage_V1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? exports.GroupMessage_V1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupMessage();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.GroupMessage_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseGroupMessage_V1() {
    return {
        id: long_1.default.UZERO,
        createdNs: long_1.default.UZERO,
        groupId: new Uint8Array(),
        data: new Uint8Array(),
        senderHmac: new Uint8Array(),
    };
}
exports.GroupMessage_V1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
            id: isSet(object.id) ? long_1.default.fromValue(object.id) : long_1.default.UZERO,
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
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
            (obj.id = (message.id || long_1.default.UZERO).toString());
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
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
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.groupId = (_a = object.groupId) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.senderHmac = (_c = object.senderHmac) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
function createBaseGroupMessageInput() {
    return { v1: undefined };
}
exports.GroupMessageInput = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.GroupMessageInput_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMessageInput();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.GroupMessageInput_V1.decode(reader, reader.uint32());
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
                ? exports.GroupMessageInput_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? exports.GroupMessageInput_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupMessageInput();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.GroupMessageInput_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseGroupMessageInput_V1() {
    return { data: new Uint8Array(), senderHmac: new Uint8Array() };
}
exports.GroupMessageInput_V1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.senderHmac.length !== 0) {
            writer.uint32(18).bytes(message.senderHmac);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.SendGroupMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.messages) {
            exports.GroupMessageInput.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(exports.GroupMessageInput.decode(reader, reader.uint32()));
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
                ? object.messages.map((e) => exports.GroupMessageInput.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? exports.GroupMessageInput.toJSON(e) : undefined);
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
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.GroupMessageInput.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSendWelcomeMessagesRequest() {
    return { messages: [] };
}
exports.SendWelcomeMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.messages) {
            exports.WelcomeMessageInput.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendWelcomeMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(exports.WelcomeMessageInput.decode(reader, reader.uint32()));
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
                ? object.messages.map((e) => exports.WelcomeMessageInput.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? exports.WelcomeMessageInput.toJSON(e) : undefined);
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
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.WelcomeMessageInput.fromPartial(e))) || [];
        return message;
    },
};
function createBaseKeyPackageUpload() {
    return { keyPackageTlsSerialized: new Uint8Array() };
}
exports.KeyPackageUpload = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyPackageTlsSerialized.length !== 0) {
            writer.uint32(10).bytes(message.keyPackageTlsSerialized);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.RegisterInstallationRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyPackage !== undefined) {
            exports.KeyPackageUpload.encode(message.keyPackage, writer.uint32(10).fork()).ldelim();
        }
        if (message.isInboxIdCredential === true) {
            writer.uint32(16).bool(message.isInboxIdCredential);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRegisterInstallationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackage = exports.KeyPackageUpload.decode(reader, reader.uint32());
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
                ? exports.KeyPackageUpload.fromJSON(object.keyPackage)
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
                ? exports.KeyPackageUpload.toJSON(message.keyPackage)
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
                ? exports.KeyPackageUpload.fromPartial(object.keyPackage)
                : undefined;
        message.isInboxIdCredential = (_a = object.isInboxIdCredential) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
function createBaseRegisterInstallationResponse() {
    return { installationKey: new Uint8Array() };
}
exports.RegisterInstallationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.UploadKeyPackageRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyPackage !== undefined) {
            exports.KeyPackageUpload.encode(message.keyPackage, writer.uint32(10).fork()).ldelim();
        }
        if (message.isInboxIdCredential === true) {
            writer.uint32(16).bool(message.isInboxIdCredential);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUploadKeyPackageRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackage = exports.KeyPackageUpload.decode(reader, reader.uint32());
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
                ? exports.KeyPackageUpload.fromJSON(object.keyPackage)
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
                ? exports.KeyPackageUpload.toJSON(message.keyPackage)
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
                ? exports.KeyPackageUpload.fromPartial(object.keyPackage)
                : undefined;
        message.isInboxIdCredential = (_a = object.isInboxIdCredential) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
function createBaseFetchKeyPackagesRequest() {
    return { installationKeys: [] };
}
exports.FetchKeyPackagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.installationKeys) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.FetchKeyPackagesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.keyPackages) {
            exports.FetchKeyPackagesResponse_KeyPackage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFetchKeyPackagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackages.push(exports.FetchKeyPackagesResponse_KeyPackage.decode(reader, reader.uint32()));
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
                ? object.keyPackages.map((e) => exports.FetchKeyPackagesResponse_KeyPackage.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyPackages) {
            obj.keyPackages = message.keyPackages.map((e) => e ? exports.FetchKeyPackagesResponse_KeyPackage.toJSON(e) : undefined);
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
            ((_a = object.keyPackages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.FetchKeyPackagesResponse_KeyPackage.fromPartial(e))) || [];
        return message;
    },
};
function createBaseFetchKeyPackagesResponse_KeyPackage() {
    return { keyPackageTlsSerialized: new Uint8Array() };
}
exports.FetchKeyPackagesResponse_KeyPackage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyPackageTlsSerialized.length !== 0) {
            writer.uint32(10).bytes(message.keyPackageTlsSerialized);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.RevokeInstallationRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.walletSignature !== undefined) {
            signature_pb_1.Signature.encode(message.walletSignature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRevokeInstallationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.walletSignature = signature_pb_1.Signature.decode(reader, reader.uint32());
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
                ? signature_pb_1.Signature.fromJSON(object.walletSignature)
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
                ? signature_pb_1.Signature.toJSON(message.walletSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRevokeInstallationRequest();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.walletSignature =
            object.walletSignature !== undefined && object.walletSignature !== null
                ? signature_pb_1.Signature.fromPartial(object.walletSignature)
                : undefined;
        return message;
    },
};
function createBaseGetIdentityUpdatesRequest() {
    return { accountAddresses: [], startTimeNs: long_1.default.UZERO };
}
exports.GetIdentityUpdatesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.accountAddresses) {
            writer.uint32(10).string(v);
        }
        if (!message.startTimeNs.isZero()) {
            writer.uint32(16).uint64(message.startTimeNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
                ? long_1.default.fromValue(object.startTimeNs)
                : long_1.default.UZERO,
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
            (obj.startTimeNs = (message.startTimeNs || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetIdentityUpdatesRequest();
        message.accountAddresses = ((_a = object.accountAddresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        message.startTimeNs =
            object.startTimeNs !== undefined && object.startTimeNs !== null
                ? long_1.default.fromValue(object.startTimeNs)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse() {
    return { updates: [] };
}
exports.GetIdentityUpdatesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.updates) {
            exports.GetIdentityUpdatesResponse_WalletUpdates.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(exports.GetIdentityUpdatesResponse_WalletUpdates.decode(reader, reader.uint32()));
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
                ? object.updates.map((e) => exports.GetIdentityUpdatesResponse_WalletUpdates.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map((e) => e ? exports.GetIdentityUpdatesResponse_WalletUpdates.toJSON(e) : undefined);
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
            ((_a = object.updates) === null || _a === void 0 ? void 0 : _a.map((e) => exports.GetIdentityUpdatesResponse_WalletUpdates.fromPartial(e))) || [];
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse_NewInstallationUpdate() {
    return {
        installationKey: new Uint8Array(),
        credentialIdentity: new Uint8Array(),
    };
}
exports.GetIdentityUpdatesResponse_NewInstallationUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.credentialIdentity.length !== 0) {
            writer.uint32(18).bytes(message.credentialIdentity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
        timestampNs: long_1.default.UZERO,
        newInstallation: undefined,
        revokedInstallation: undefined,
    };
}
exports.GetIdentityUpdatesResponse_Update = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.timestampNs.isZero()) {
            writer.uint32(8).uint64(message.timestampNs);
        }
        if (message.newInstallation !== undefined) {
            exports.GetIdentityUpdatesResponse_NewInstallationUpdate.encode(message.newInstallation, writer.uint32(18).fork()).ldelim();
        }
        if (message.revokedInstallation !== undefined) {
            exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate.encode(message.revokedInstallation, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
                        exports.GetIdentityUpdatesResponse_NewInstallationUpdate.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.revokedInstallation =
                        exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate.decode(reader, reader.uint32());
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
                ? long_1.default.fromValue(object.timestampNs)
                : long_1.default.UZERO,
            newInstallation: isSet(object.newInstallation)
                ? exports.GetIdentityUpdatesResponse_NewInstallationUpdate.fromJSON(object.newInstallation)
                : undefined,
            revokedInstallation: isSet(object.revokedInstallation)
                ? exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate.fromJSON(object.revokedInstallation)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.timestampNs !== undefined &&
            (obj.timestampNs = (message.timestampNs || long_1.default.UZERO).toString());
        message.newInstallation !== undefined &&
            (obj.newInstallation = message.newInstallation
                ? exports.GetIdentityUpdatesResponse_NewInstallationUpdate.toJSON(message.newInstallation)
                : undefined);
        message.revokedInstallation !== undefined &&
            (obj.revokedInstallation = message.revokedInstallation
                ? exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate.toJSON(message.revokedInstallation)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGetIdentityUpdatesResponse_Update();
        message.timestampNs =
            object.timestampNs !== undefined && object.timestampNs !== null
                ? long_1.default.fromValue(object.timestampNs)
                : long_1.default.UZERO;
        message.newInstallation =
            object.newInstallation !== undefined && object.newInstallation !== null
                ? exports.GetIdentityUpdatesResponse_NewInstallationUpdate.fromPartial(object.newInstallation)
                : undefined;
        message.revokedInstallation =
            object.revokedInstallation !== undefined &&
                object.revokedInstallation !== null
                ? exports.GetIdentityUpdatesResponse_RevokedInstallationUpdate.fromPartial(object.revokedInstallation)
                : undefined;
        return message;
    },
};
function createBaseGetIdentityUpdatesResponse_WalletUpdates() {
    return { updates: [] };
}
exports.GetIdentityUpdatesResponse_WalletUpdates = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.updates) {
            exports.GetIdentityUpdatesResponse_Update.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetIdentityUpdatesResponse_WalletUpdates();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(exports.GetIdentityUpdatesResponse_Update.decode(reader, reader.uint32()));
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
                ? object.updates.map((e) => exports.GetIdentityUpdatesResponse_Update.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map((e) => e ? exports.GetIdentityUpdatesResponse_Update.toJSON(e) : undefined);
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
            ((_a = object.updates) === null || _a === void 0 ? void 0 : _a.map((e) => exports.GetIdentityUpdatesResponse_Update.fromPartial(e))) || [];
        return message;
    },
};
function createBasePagingInfo() {
    return { direction: 0, limit: 0, idCursor: long_1.default.UZERO };
}
exports.PagingInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
                ? long_1.default.fromValue(object.idCursor)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.direction !== undefined &&
            (obj.direction = sortDirectionToJSON(message.direction));
        message.limit !== undefined && (obj.limit = Math.round(message.limit));
        message.idCursor !== undefined &&
            (obj.idCursor = (message.idCursor || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePagingInfo();
        message.direction = (_a = object.direction) !== null && _a !== void 0 ? _a : 0;
        message.limit = (_b = object.limit) !== null && _b !== void 0 ? _b : 0;
        message.idCursor =
            object.idCursor !== undefined && object.idCursor !== null
                ? long_1.default.fromValue(object.idCursor)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseQueryGroupMessagesRequest() {
    return { groupId: new Uint8Array(), pagingInfo: undefined };
}
exports.QueryGroupMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.groupId.length !== 0) {
            writer.uint32(10).bytes(message.groupId);
        }
        if (message.pagingInfo !== undefined) {
            exports.PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.bytes();
                    break;
                case 2:
                    message.pagingInfo = exports.PagingInfo.decode(reader, reader.uint32());
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
                ? exports.PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.groupId !== undefined &&
            (obj.groupId = base64FromBytes(message.groupId !== undefined ? message.groupId : new Uint8Array()));
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? exports.PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryGroupMessagesRequest();
        message.groupId = (_a = object.groupId) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? exports.PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseQueryGroupMessagesResponse() {
    return { messages: [], pagingInfo: undefined };
}
exports.QueryGroupMessagesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.messages) {
            exports.GroupMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagingInfo !== undefined) {
            exports.PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGroupMessagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(exports.GroupMessage.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagingInfo = exports.PagingInfo.decode(reader, reader.uint32());
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
                ? object.messages.map((e) => exports.GroupMessage.fromJSON(e))
                : [],
            pagingInfo: isSet(object.pagingInfo)
                ? exports.PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? exports.GroupMessage.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? exports.PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryGroupMessagesResponse();
        message.messages =
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.GroupMessage.fromPartial(e))) || [];
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? exports.PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseQueryWelcomeMessagesRequest() {
    return { installationKey: new Uint8Array(), pagingInfo: undefined };
}
exports.QueryWelcomeMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.pagingInfo !== undefined) {
            exports.PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWelcomeMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.pagingInfo = exports.PagingInfo.decode(reader, reader.uint32());
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
                ? exports.PagingInfo.fromJSON(object.pagingInfo)
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
                ? exports.PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryWelcomeMessagesRequest();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? exports.PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseQueryWelcomeMessagesResponse() {
    return { messages: [], pagingInfo: undefined };
}
exports.QueryWelcomeMessagesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.messages) {
            exports.WelcomeMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagingInfo !== undefined) {
            exports.PagingInfo.encode(message.pagingInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWelcomeMessagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(exports.WelcomeMessage.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagingInfo = exports.PagingInfo.decode(reader, reader.uint32());
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
                ? object.messages.map((e) => exports.WelcomeMessage.fromJSON(e))
                : [],
            pagingInfo: isSet(object.pagingInfo)
                ? exports.PagingInfo.fromJSON(object.pagingInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? exports.WelcomeMessage.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        message.pagingInfo !== undefined &&
            (obj.pagingInfo = message.pagingInfo
                ? exports.PagingInfo.toJSON(message.pagingInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryWelcomeMessagesResponse();
        message.messages =
            ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.WelcomeMessage.fromPartial(e))) || [];
        message.pagingInfo =
            object.pagingInfo !== undefined && object.pagingInfo !== null
                ? exports.PagingInfo.fromPartial(object.pagingInfo)
                : undefined;
        return message;
    },
};
function createBaseSubscribeGroupMessagesRequest() {
    return { filters: [] };
}
exports.SubscribeGroupMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.filters) {
            exports.SubscribeGroupMessagesRequest_Filter.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscribeGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters.push(exports.SubscribeGroupMessagesRequest_Filter.decode(reader, reader.uint32()));
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
                ? object.filters.map((e) => exports.SubscribeGroupMessagesRequest_Filter.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.filters) {
            obj.filters = message.filters.map((e) => e ? exports.SubscribeGroupMessagesRequest_Filter.toJSON(e) : undefined);
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
            ((_a = object.filters) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SubscribeGroupMessagesRequest_Filter.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSubscribeGroupMessagesRequest_Filter() {
    return { groupId: new Uint8Array(), idCursor: long_1.default.UZERO };
}
exports.SubscribeGroupMessagesRequest_Filter = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.groupId.length !== 0) {
            writer.uint32(10).bytes(message.groupId);
        }
        if (!message.idCursor.isZero()) {
            writer.uint32(16).uint64(message.idCursor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
                ? long_1.default.fromValue(object.idCursor)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.groupId !== undefined &&
            (obj.groupId = base64FromBytes(message.groupId !== undefined ? message.groupId : new Uint8Array()));
        message.idCursor !== undefined &&
            (obj.idCursor = (message.idCursor || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSubscribeGroupMessagesRequest_Filter();
        message.groupId = (_a = object.groupId) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.idCursor =
            object.idCursor !== undefined && object.idCursor !== null
                ? long_1.default.fromValue(object.idCursor)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseSubscribeWelcomeMessagesRequest() {
    return { filters: [] };
}
exports.SubscribeWelcomeMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.filters) {
            exports.SubscribeWelcomeMessagesRequest_Filter.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscribeWelcomeMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters.push(exports.SubscribeWelcomeMessagesRequest_Filter.decode(reader, reader.uint32()));
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
                ? object.filters.map((e) => exports.SubscribeWelcomeMessagesRequest_Filter.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.filters) {
            obj.filters = message.filters.map((e) => e ? exports.SubscribeWelcomeMessagesRequest_Filter.toJSON(e) : undefined);
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
            ((_a = object.filters) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SubscribeWelcomeMessagesRequest_Filter.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSubscribeWelcomeMessagesRequest_Filter() {
    return { installationKey: new Uint8Array(), idCursor: long_1.default.UZERO };
}
exports.SubscribeWelcomeMessagesRequest_Filter = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (!message.idCursor.isZero()) {
            writer.uint32(16).uint64(message.idCursor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
                ? long_1.default.fromValue(object.idCursor)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey = base64FromBytes(message.installationKey !== undefined
                ? message.installationKey
                : new Uint8Array()));
        message.idCursor !== undefined &&
            (obj.idCursor = (message.idCursor || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSubscribeWelcomeMessagesRequest_Filter();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.idCursor =
            object.idCursor !== undefined && object.idCursor !== null
                ? long_1.default.fromValue(object.idCursor)
                : long_1.default.UZERO;
        return message;
    },
};
class MlsApiClientImpl {
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
        const data = exports.SendGroupMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "SendGroupMessages", data);
        return promise.then((data) => empty_pb_1.Empty.decode(new minimal_1.default.Reader(data)));
    }
    SendWelcomeMessages(request) {
        const data = exports.SendWelcomeMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "SendWelcomeMessages", data);
        return promise.then((data) => empty_pb_1.Empty.decode(new minimal_1.default.Reader(data)));
    }
    RegisterInstallation(request) {
        const data = exports.RegisterInstallationRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "RegisterInstallation", data);
        return promise.then((data) => exports.RegisterInstallationResponse.decode(new minimal_1.default.Reader(data)));
    }
    UploadKeyPackage(request) {
        const data = exports.UploadKeyPackageRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "UploadKeyPackage", data);
        return promise.then((data) => empty_pb_1.Empty.decode(new minimal_1.default.Reader(data)));
    }
    FetchKeyPackages(request) {
        const data = exports.FetchKeyPackagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "FetchKeyPackages", data);
        return promise.then((data) => exports.FetchKeyPackagesResponse.decode(new minimal_1.default.Reader(data)));
    }
    RevokeInstallation(request) {
        const data = exports.RevokeInstallationRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "RevokeInstallation", data);
        return promise.then((data) => empty_pb_1.Empty.decode(new minimal_1.default.Reader(data)));
    }
    GetIdentityUpdates(request) {
        const data = exports.GetIdentityUpdatesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "GetIdentityUpdates", data);
        return promise.then((data) => exports.GetIdentityUpdatesResponse.decode(new minimal_1.default.Reader(data)));
    }
    QueryGroupMessages(request) {
        const data = exports.QueryGroupMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "QueryGroupMessages", data);
        return promise.then((data) => exports.QueryGroupMessagesResponse.decode(new minimal_1.default.Reader(data)));
    }
    QueryWelcomeMessages(request) {
        const data = exports.QueryWelcomeMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls.api.v1.MlsApi", "QueryWelcomeMessages", data);
        return promise.then((data) => exports.QueryWelcomeMessagesResponse.decode(new minimal_1.default.Reader(data)));
    }
    SubscribeGroupMessages(request) {
        const data = exports.SubscribeGroupMessagesRequest.encode(request).finish();
        const result = this.rpc.serverStreamingRequest("brixbit.mls.api.v1.MlsApi", "SubscribeGroupMessages", data);
        return result.pipe((0, operators_1.map)((data) => exports.GroupMessage.decode(new minimal_1.default.Reader(data))));
    }
    SubscribeWelcomeMessages(request) {
        const data = exports.SubscribeWelcomeMessagesRequest.encode(request).finish();
        const result = this.rpc.serverStreamingRequest("brixbit.mls.api.v1.MlsApi", "SubscribeWelcomeMessages", data);
        return result.pipe((0, operators_1.map)((data) => exports.WelcomeMessage.decode(new minimal_1.default.Reader(data))));
    }
}
exports.MlsApiClientImpl = MlsApiClientImpl;
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
//# sourceMappingURL=mls.pb.js.map