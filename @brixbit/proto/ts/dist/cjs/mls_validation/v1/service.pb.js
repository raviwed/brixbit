"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationApiClientImpl = exports.ValidateInboxIdsResponse_ValidationResponse = exports.ValidateInboxIdsResponse = exports.ValidateInboxIdsRequest_ValidationRequest = exports.ValidateInboxIdsRequest = exports.GetAssociationStateResponse = exports.GetAssociationStateRequest = exports.ValidateGroupMessagesResponse_ValidationResponse = exports.ValidateGroupMessagesResponse = exports.ValidateGroupMessagesRequest_GroupMessage = exports.ValidateGroupMessagesRequest = exports.ValidateKeyPackagesResponse_ValidationResponse = exports.ValidateKeyPackagesResponse = exports.ValidateKeyPackagesRequest_KeyPackage = exports.ValidateKeyPackagesRequest = exports.ValidateInboxIdKeyPackagesResponse_Response = exports.ValidateInboxIdKeyPackagesResponse = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const credential_pb_1 = require("../../identity/credential.pb");
const association_pb_1 = require("../../identity/associations/association.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.mls_validation.v1";
function createBaseValidateInboxIdKeyPackagesResponse() {
    return { responses: [] };
}
exports.ValidateInboxIdKeyPackagesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.ValidateInboxIdKeyPackagesResponse_Response.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateInboxIdKeyPackagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.ValidateInboxIdKeyPackagesResponse_Response.decode(reader, reader.uint32()));
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
            responses: Array.isArray(object === null || object === void 0 ? void 0 : object.responses)
                ? object.responses.map((e) => exports.ValidateInboxIdKeyPackagesResponse_Response.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.ValidateInboxIdKeyPackagesResponse_Response.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateInboxIdKeyPackagesResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateInboxIdKeyPackagesResponse_Response.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateInboxIdKeyPackagesResponse_Response() {
    return {
        isOk: false,
        errorMessage: "",
        credential: undefined,
        installationPublicKey: new Uint8Array(),
        expiration: long_1.default.UZERO,
    };
}
exports.ValidateInboxIdKeyPackagesResponse_Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.isOk === true) {
            writer.uint32(8).bool(message.isOk);
        }
        if (message.errorMessage !== "") {
            writer.uint32(18).string(message.errorMessage);
        }
        if (message.credential !== undefined) {
            credential_pb_1.MlsCredential.encode(message.credential, writer.uint32(26).fork()).ldelim();
        }
        if (message.installationPublicKey.length !== 0) {
            writer.uint32(34).bytes(message.installationPublicKey);
        }
        if (!message.expiration.isZero()) {
            writer.uint32(40).uint64(message.expiration);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateInboxIdKeyPackagesResponse_Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.isOk = reader.bool();
                    break;
                case 2:
                    message.errorMessage = reader.string();
                    break;
                case 3:
                    message.credential = credential_pb_1.MlsCredential.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.installationPublicKey = reader.bytes();
                    break;
                case 5:
                    message.expiration = reader.uint64();
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
            isOk: isSet(object.isOk) ? Boolean(object.isOk) : false,
            errorMessage: isSet(object.errorMessage)
                ? String(object.errorMessage)
                : "",
            credential: isSet(object.credential)
                ? credential_pb_1.MlsCredential.fromJSON(object.credential)
                : undefined,
            installationPublicKey: isSet(object.installationPublicKey)
                ? bytesFromBase64(object.installationPublicKey)
                : new Uint8Array(),
            expiration: isSet(object.expiration)
                ? long_1.default.fromValue(object.expiration)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.isOk !== undefined && (obj.isOk = message.isOk);
        message.errorMessage !== undefined &&
            (obj.errorMessage = message.errorMessage);
        message.credential !== undefined &&
            (obj.credential = message.credential
                ? credential_pb_1.MlsCredential.toJSON(message.credential)
                : undefined);
        message.installationPublicKey !== undefined &&
            (obj.installationPublicKey = base64FromBytes(message.installationPublicKey !== undefined
                ? message.installationPublicKey
                : new Uint8Array()));
        message.expiration !== undefined &&
            (obj.expiration = (message.expiration || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseValidateInboxIdKeyPackagesResponse_Response();
        message.isOk = (_a = object.isOk) !== null && _a !== void 0 ? _a : false;
        message.errorMessage = (_b = object.errorMessage) !== null && _b !== void 0 ? _b : "";
        message.credential =
            object.credential !== undefined && object.credential !== null
                ? credential_pb_1.MlsCredential.fromPartial(object.credential)
                : undefined;
        message.installationPublicKey =
            (_c = object.installationPublicKey) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.expiration =
            object.expiration !== undefined && object.expiration !== null
                ? long_1.default.fromValue(object.expiration)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseValidateKeyPackagesRequest() {
    return { keyPackages: [] };
}
exports.ValidateKeyPackagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.keyPackages) {
            exports.ValidateKeyPackagesRequest_KeyPackage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateKeyPackagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackages.push(exports.ValidateKeyPackagesRequest_KeyPackage.decode(reader, reader.uint32()));
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
                ? object.keyPackages.map((e) => exports.ValidateKeyPackagesRequest_KeyPackage.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyPackages) {
            obj.keyPackages = message.keyPackages.map((e) => e ? exports.ValidateKeyPackagesRequest_KeyPackage.toJSON(e) : undefined);
        }
        else {
            obj.keyPackages = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateKeyPackagesRequest();
        message.keyPackages =
            ((_a = object.keyPackages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateKeyPackagesRequest_KeyPackage.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateKeyPackagesRequest_KeyPackage() {
    return {
        keyPackageBytesTlsSerialized: new Uint8Array(),
        isInboxIdCredential: false,
    };
}
exports.ValidateKeyPackagesRequest_KeyPackage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyPackageBytesTlsSerialized.length !== 0) {
            writer.uint32(10).bytes(message.keyPackageBytesTlsSerialized);
        }
        if (message.isInboxIdCredential === true) {
            writer.uint32(16).bool(message.isInboxIdCredential);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateKeyPackagesRequest_KeyPackage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyPackageBytesTlsSerialized = reader.bytes();
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
            keyPackageBytesTlsSerialized: isSet(object.keyPackageBytesTlsSerialized)
                ? bytesFromBase64(object.keyPackageBytesTlsSerialized)
                : new Uint8Array(),
            isInboxIdCredential: isSet(object.isInboxIdCredential)
                ? Boolean(object.isInboxIdCredential)
                : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyPackageBytesTlsSerialized !== undefined &&
            (obj.keyPackageBytesTlsSerialized = base64FromBytes(message.keyPackageBytesTlsSerialized !== undefined
                ? message.keyPackageBytesTlsSerialized
                : new Uint8Array()));
        message.isInboxIdCredential !== undefined &&
            (obj.isInboxIdCredential = message.isInboxIdCredential);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseValidateKeyPackagesRequest_KeyPackage();
        message.keyPackageBytesTlsSerialized =
            (_a = object.keyPackageBytesTlsSerialized) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.isInboxIdCredential = (_b = object.isInboxIdCredential) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
function createBaseValidateKeyPackagesResponse() {
    return { responses: [] };
}
exports.ValidateKeyPackagesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.ValidateKeyPackagesResponse_ValidationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateKeyPackagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.ValidateKeyPackagesResponse_ValidationResponse.decode(reader, reader.uint32()));
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
            responses: Array.isArray(object === null || object === void 0 ? void 0 : object.responses)
                ? object.responses.map((e) => exports.ValidateKeyPackagesResponse_ValidationResponse.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.ValidateKeyPackagesResponse_ValidationResponse.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateKeyPackagesResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateKeyPackagesResponse_ValidationResponse.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateKeyPackagesResponse_ValidationResponse() {
    return {
        isOk: false,
        errorMessage: "",
        installationId: new Uint8Array(),
        accountAddress: "",
        credentialIdentityBytes: new Uint8Array(),
        expiration: long_1.default.UZERO,
    };
}
exports.ValidateKeyPackagesResponse_ValidationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.isOk === true) {
            writer.uint32(8).bool(message.isOk);
        }
        if (message.errorMessage !== "") {
            writer.uint32(18).string(message.errorMessage);
        }
        if (message.installationId.length !== 0) {
            writer.uint32(26).bytes(message.installationId);
        }
        if (message.accountAddress !== "") {
            writer.uint32(34).string(message.accountAddress);
        }
        if (message.credentialIdentityBytes.length !== 0) {
            writer.uint32(42).bytes(message.credentialIdentityBytes);
        }
        if (!message.expiration.isZero()) {
            writer.uint32(48).uint64(message.expiration);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateKeyPackagesResponse_ValidationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.isOk = reader.bool();
                    break;
                case 2:
                    message.errorMessage = reader.string();
                    break;
                case 3:
                    message.installationId = reader.bytes();
                    break;
                case 4:
                    message.accountAddress = reader.string();
                    break;
                case 5:
                    message.credentialIdentityBytes = reader.bytes();
                    break;
                case 6:
                    message.expiration = reader.uint64();
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
            isOk: isSet(object.isOk) ? Boolean(object.isOk) : false,
            errorMessage: isSet(object.errorMessage)
                ? String(object.errorMessage)
                : "",
            installationId: isSet(object.installationId)
                ? bytesFromBase64(object.installationId)
                : new Uint8Array(),
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            credentialIdentityBytes: isSet(object.credentialIdentityBytes)
                ? bytesFromBase64(object.credentialIdentityBytes)
                : new Uint8Array(),
            expiration: isSet(object.expiration)
                ? long_1.default.fromValue(object.expiration)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.isOk !== undefined && (obj.isOk = message.isOk);
        message.errorMessage !== undefined &&
            (obj.errorMessage = message.errorMessage);
        message.installationId !== undefined &&
            (obj.installationId = base64FromBytes(message.installationId !== undefined
                ? message.installationId
                : new Uint8Array()));
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.credentialIdentityBytes !== undefined &&
            (obj.credentialIdentityBytes = base64FromBytes(message.credentialIdentityBytes !== undefined
                ? message.credentialIdentityBytes
                : new Uint8Array()));
        message.expiration !== undefined &&
            (obj.expiration = (message.expiration || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseValidateKeyPackagesResponse_ValidationResponse();
        message.isOk = (_a = object.isOk) !== null && _a !== void 0 ? _a : false;
        message.errorMessage = (_b = object.errorMessage) !== null && _b !== void 0 ? _b : "";
        message.installationId = (_c = object.installationId) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.accountAddress = (_d = object.accountAddress) !== null && _d !== void 0 ? _d : "";
        message.credentialIdentityBytes =
            (_e = object.credentialIdentityBytes) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.expiration =
            object.expiration !== undefined && object.expiration !== null
                ? long_1.default.fromValue(object.expiration)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseValidateGroupMessagesRequest() {
    return { groupMessages: [] };
}
exports.ValidateGroupMessagesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.groupMessages) {
            exports.ValidateGroupMessagesRequest_GroupMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateGroupMessagesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupMessages.push(exports.ValidateGroupMessagesRequest_GroupMessage.decode(reader, reader.uint32()));
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
            groupMessages: Array.isArray(object === null || object === void 0 ? void 0 : object.groupMessages)
                ? object.groupMessages.map((e) => exports.ValidateGroupMessagesRequest_GroupMessage.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupMessages) {
            obj.groupMessages = message.groupMessages.map((e) => e ? exports.ValidateGroupMessagesRequest_GroupMessage.toJSON(e) : undefined);
        }
        else {
            obj.groupMessages = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateGroupMessagesRequest();
        message.groupMessages =
            ((_a = object.groupMessages) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateGroupMessagesRequest_GroupMessage.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateGroupMessagesRequest_GroupMessage() {
    return { groupMessageBytesTlsSerialized: new Uint8Array() };
}
exports.ValidateGroupMessagesRequest_GroupMessage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.groupMessageBytesTlsSerialized.length !== 0) {
            writer.uint32(10).bytes(message.groupMessageBytesTlsSerialized);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateGroupMessagesRequest_GroupMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupMessageBytesTlsSerialized = reader.bytes();
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
            groupMessageBytesTlsSerialized: isSet(object.groupMessageBytesTlsSerialized)
                ? bytesFromBase64(object.groupMessageBytesTlsSerialized)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.groupMessageBytesTlsSerialized !== undefined &&
            (obj.groupMessageBytesTlsSerialized = base64FromBytes(message.groupMessageBytesTlsSerialized !== undefined
                ? message.groupMessageBytesTlsSerialized
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateGroupMessagesRequest_GroupMessage();
        message.groupMessageBytesTlsSerialized =
            (_a = object.groupMessageBytesTlsSerialized) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseValidateGroupMessagesResponse() {
    return { responses: [] };
}
exports.ValidateGroupMessagesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.ValidateGroupMessagesResponse_ValidationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateGroupMessagesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.ValidateGroupMessagesResponse_ValidationResponse.decode(reader, reader.uint32()));
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
            responses: Array.isArray(object === null || object === void 0 ? void 0 : object.responses)
                ? object.responses.map((e) => exports.ValidateGroupMessagesResponse_ValidationResponse.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e
                ? exports.ValidateGroupMessagesResponse_ValidationResponse.toJSON(e)
                : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateGroupMessagesResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateGroupMessagesResponse_ValidationResponse.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateGroupMessagesResponse_ValidationResponse() {
    return { isOk: false, errorMessage: "", groupId: "" };
}
exports.ValidateGroupMessagesResponse_ValidationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.isOk === true) {
            writer.uint32(8).bool(message.isOk);
        }
        if (message.errorMessage !== "") {
            writer.uint32(18).string(message.errorMessage);
        }
        if (message.groupId !== "") {
            writer.uint32(26).string(message.groupId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateGroupMessagesResponse_ValidationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.isOk = reader.bool();
                    break;
                case 2:
                    message.errorMessage = reader.string();
                    break;
                case 3:
                    message.groupId = reader.string();
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
            isOk: isSet(object.isOk) ? Boolean(object.isOk) : false,
            errorMessage: isSet(object.errorMessage)
                ? String(object.errorMessage)
                : "",
            groupId: isSet(object.groupId) ? String(object.groupId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.isOk !== undefined && (obj.isOk = message.isOk);
        message.errorMessage !== undefined &&
            (obj.errorMessage = message.errorMessage);
        message.groupId !== undefined && (obj.groupId = message.groupId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseValidateGroupMessagesResponse_ValidationResponse();
        message.isOk = (_a = object.isOk) !== null && _a !== void 0 ? _a : false;
        message.errorMessage = (_b = object.errorMessage) !== null && _b !== void 0 ? _b : "";
        message.groupId = (_c = object.groupId) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseGetAssociationStateRequest() {
    return { oldUpdates: [], newUpdates: [] };
}
exports.GetAssociationStateRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.oldUpdates) {
            association_pb_1.IdentityUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.newUpdates) {
            association_pb_1.IdentityUpdate.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetAssociationStateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.oldUpdates.push(association_pb_1.IdentityUpdate.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.newUpdates.push(association_pb_1.IdentityUpdate.decode(reader, reader.uint32()));
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
            oldUpdates: Array.isArray(object === null || object === void 0 ? void 0 : object.oldUpdates)
                ? object.oldUpdates.map((e) => association_pb_1.IdentityUpdate.fromJSON(e))
                : [],
            newUpdates: Array.isArray(object === null || object === void 0 ? void 0 : object.newUpdates)
                ? object.newUpdates.map((e) => association_pb_1.IdentityUpdate.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.oldUpdates) {
            obj.oldUpdates = message.oldUpdates.map((e) => e ? association_pb_1.IdentityUpdate.toJSON(e) : undefined);
        }
        else {
            obj.oldUpdates = [];
        }
        if (message.newUpdates) {
            obj.newUpdates = message.newUpdates.map((e) => e ? association_pb_1.IdentityUpdate.toJSON(e) : undefined);
        }
        else {
            obj.newUpdates = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGetAssociationStateRequest();
        message.oldUpdates =
            ((_a = object.oldUpdates) === null || _a === void 0 ? void 0 : _a.map((e) => association_pb_1.IdentityUpdate.fromPartial(e))) || [];
        message.newUpdates =
            ((_b = object.newUpdates) === null || _b === void 0 ? void 0 : _b.map((e) => association_pb_1.IdentityUpdate.fromPartial(e))) || [];
        return message;
    },
};
function createBaseGetAssociationStateResponse() {
    return { associationState: undefined, stateDiff: undefined };
}
exports.GetAssociationStateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.associationState !== undefined) {
            association_pb_1.AssociationState.encode(message.associationState, writer.uint32(10).fork()).ldelim();
        }
        if (message.stateDiff !== undefined) {
            association_pb_1.AssociationStateDiff.encode(message.stateDiff, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetAssociationStateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.associationState = association_pb_1.AssociationState.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.stateDiff = association_pb_1.AssociationStateDiff.decode(reader, reader.uint32());
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
            associationState: isSet(object.associationState)
                ? association_pb_1.AssociationState.fromJSON(object.associationState)
                : undefined,
            stateDiff: isSet(object.stateDiff)
                ? association_pb_1.AssociationStateDiff.fromJSON(object.stateDiff)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.associationState !== undefined &&
            (obj.associationState = message.associationState
                ? association_pb_1.AssociationState.toJSON(message.associationState)
                : undefined);
        message.stateDiff !== undefined &&
            (obj.stateDiff = message.stateDiff
                ? association_pb_1.AssociationStateDiff.toJSON(message.stateDiff)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGetAssociationStateResponse();
        message.associationState =
            object.associationState !== undefined && object.associationState !== null
                ? association_pb_1.AssociationState.fromPartial(object.associationState)
                : undefined;
        message.stateDiff =
            object.stateDiff !== undefined && object.stateDiff !== null
                ? association_pb_1.AssociationStateDiff.fromPartial(object.stateDiff)
                : undefined;
        return message;
    },
};
function createBaseValidateInboxIdsRequest() {
    return { requests: [] };
}
exports.ValidateInboxIdsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.ValidateInboxIdsRequest_ValidationRequest.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateInboxIdsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.ValidateInboxIdsRequest_ValidationRequest.decode(reader, reader.uint32()));
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
            requests: Array.isArray(object === null || object === void 0 ? void 0 : object.requests)
                ? object.requests.map((e) => exports.ValidateInboxIdsRequest_ValidationRequest.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.ValidateInboxIdsRequest_ValidationRequest.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateInboxIdsRequest();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateInboxIdsRequest_ValidationRequest.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateInboxIdsRequest_ValidationRequest() {
    return {
        credential: undefined,
        installationPublicKey: new Uint8Array(),
        identityUpdates: [],
    };
}
exports.ValidateInboxIdsRequest_ValidationRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.credential !== undefined) {
            credential_pb_1.MlsCredential.encode(message.credential, writer.uint32(10).fork()).ldelim();
        }
        if (message.installationPublicKey.length !== 0) {
            writer.uint32(18).bytes(message.installationPublicKey);
        }
        for (const v of message.identityUpdates) {
            association_pb_1.IdentityUpdate.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateInboxIdsRequest_ValidationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.credential = credential_pb_1.MlsCredential.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.installationPublicKey = reader.bytes();
                    break;
                case 3:
                    message.identityUpdates.push(association_pb_1.IdentityUpdate.decode(reader, reader.uint32()));
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
            credential: isSet(object.credential)
                ? credential_pb_1.MlsCredential.fromJSON(object.credential)
                : undefined,
            installationPublicKey: isSet(object.installationPublicKey)
                ? bytesFromBase64(object.installationPublicKey)
                : new Uint8Array(),
            identityUpdates: Array.isArray(object === null || object === void 0 ? void 0 : object.identityUpdates)
                ? object.identityUpdates.map((e) => association_pb_1.IdentityUpdate.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.credential !== undefined &&
            (obj.credential = message.credential
                ? credential_pb_1.MlsCredential.toJSON(message.credential)
                : undefined);
        message.installationPublicKey !== undefined &&
            (obj.installationPublicKey = base64FromBytes(message.installationPublicKey !== undefined
                ? message.installationPublicKey
                : new Uint8Array()));
        if (message.identityUpdates) {
            obj.identityUpdates = message.identityUpdates.map((e) => e ? association_pb_1.IdentityUpdate.toJSON(e) : undefined);
        }
        else {
            obj.identityUpdates = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseValidateInboxIdsRequest_ValidationRequest();
        message.credential =
            object.credential !== undefined && object.credential !== null
                ? credential_pb_1.MlsCredential.fromPartial(object.credential)
                : undefined;
        message.installationPublicKey =
            (_a = object.installationPublicKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.identityUpdates =
            ((_b = object.identityUpdates) === null || _b === void 0 ? void 0 : _b.map((e) => association_pb_1.IdentityUpdate.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateInboxIdsResponse() {
    return { responses: [] };
}
exports.ValidateInboxIdsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.ValidateInboxIdsResponse_ValidationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateInboxIdsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.ValidateInboxIdsResponse_ValidationResponse.decode(reader, reader.uint32()));
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
            responses: Array.isArray(object === null || object === void 0 ? void 0 : object.responses)
                ? object.responses.map((e) => exports.ValidateInboxIdsResponse_ValidationResponse.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.ValidateInboxIdsResponse_ValidationResponse.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidateInboxIdsResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidateInboxIdsResponse_ValidationResponse.fromPartial(e))) || [];
        return message;
    },
};
function createBaseValidateInboxIdsResponse_ValidationResponse() {
    return { isOk: false, errorMessage: "", inboxId: "" };
}
exports.ValidateInboxIdsResponse_ValidationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.isOk === true) {
            writer.uint32(8).bool(message.isOk);
        }
        if (message.errorMessage !== "") {
            writer.uint32(18).string(message.errorMessage);
        }
        if (message.inboxId !== "") {
            writer.uint32(26).string(message.inboxId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidateInboxIdsResponse_ValidationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.isOk = reader.bool();
                    break;
                case 2:
                    message.errorMessage = reader.string();
                    break;
                case 3:
                    message.inboxId = reader.string();
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
            isOk: isSet(object.isOk) ? Boolean(object.isOk) : false,
            errorMessage: isSet(object.errorMessage)
                ? String(object.errorMessage)
                : "",
            inboxId: isSet(object.inboxId) ? String(object.inboxId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.isOk !== undefined && (obj.isOk = message.isOk);
        message.errorMessage !== undefined &&
            (obj.errorMessage = message.errorMessage);
        message.inboxId !== undefined && (obj.inboxId = message.inboxId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseValidateInboxIdsResponse_ValidationResponse();
        message.isOk = (_a = object.isOk) !== null && _a !== void 0 ? _a : false;
        message.errorMessage = (_b = object.errorMessage) !== null && _b !== void 0 ? _b : "";
        message.inboxId = (_c = object.inboxId) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
class ValidationApiClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ValidateKeyPackages = this.ValidateKeyPackages.bind(this);
        this.ValidateGroupMessages = this.ValidateGroupMessages.bind(this);
        this.GetAssociationState = this.GetAssociationState.bind(this);
        this.ValidateInboxIdKeyPackages =
            this.ValidateInboxIdKeyPackages.bind(this);
        this.ValidateInboxIds = this.ValidateInboxIds.bind(this);
    }
    ValidateKeyPackages(request) {
        const data = exports.ValidateKeyPackagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls_validation.v1.ValidationApi", "ValidateKeyPackages", data);
        return promise.then((data) => exports.ValidateKeyPackagesResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidateGroupMessages(request) {
        const data = exports.ValidateGroupMessagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls_validation.v1.ValidationApi", "ValidateGroupMessages", data);
        return promise.then((data) => exports.ValidateGroupMessagesResponse.decode(new minimal_1.default.Reader(data)));
    }
    GetAssociationState(request) {
        const data = exports.GetAssociationStateRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls_validation.v1.ValidationApi", "GetAssociationState", data);
        return promise.then((data) => exports.GetAssociationStateResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidateInboxIdKeyPackages(request) {
        const data = exports.ValidateKeyPackagesRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls_validation.v1.ValidationApi", "ValidateInboxIdKeyPackages", data);
        return promise.then((data) => exports.ValidateInboxIdKeyPackagesResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidateInboxIds(request) {
        const data = exports.ValidateInboxIdsRequest.encode(request).finish();
        const promise = this.rpc.request("brixbit.mls_validation.v1.ValidationApi", "ValidateInboxIds", data);
        return promise.then((data) => exports.ValidateInboxIdsResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.ValidationApiClientImpl = ValidationApiClientImpl;
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
//# sourceMappingURL=service.pb.js.map