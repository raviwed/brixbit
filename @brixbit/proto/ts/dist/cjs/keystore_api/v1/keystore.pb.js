"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRefreshJobRequest = exports.SignDigestRequest = exports.InitKeystoreResponse = exports.InitKeystoreRequest = exports.GetKeystoreStatusResponse = exports.GetKeystoreStatusRequest = exports.GetConversationsResponse = exports.SaveV1ConversationsResponse = exports.SaveV1ConversationsRequest = exports.CreateAuthTokenRequest = exports.SaveInvitesResponse_Response_Success = exports.SaveInvitesResponse_Response = exports.SaveInvitesResponse = exports.SaveInvitesRequest_Request = exports.SaveInvitesRequest = exports.CreateInviteResponse = exports.CreateInviteRequest = exports.GetPrivatePreferencesTopicIdentifierResponse = exports.SelfDecryptRequest_Request = exports.SelfDecryptRequest = exports.SelfEncryptResponse_Response_Success = exports.SelfEncryptResponse_Response = exports.SelfEncryptResponse = exports.SelfEncryptRequest_Request = exports.SelfEncryptRequest = exports.EncryptV2Request_Request = exports.EncryptV2Request = exports.EncryptResponse_Response_Success = exports.EncryptResponse_Response = exports.EncryptResponse = exports.EncryptV1Request_Request = exports.EncryptV1Request = exports.DecryptV2Request_Request = exports.DecryptV2Request = exports.DecryptResponse_Response_Success = exports.DecryptResponse_Response = exports.DecryptResponse = exports.DecryptV1Request_Request = exports.DecryptV1Request = exports.KeystoreError = exports.getKeystoreStatusResponse_KeystoreStatusToJSON = exports.getKeystoreStatusResponse_KeystoreStatusFromJSON = exports.GetKeystoreStatusResponse_KeystoreStatus = exports.jobTypeToJSON = exports.jobTypeFromJSON = exports.JobType = exports.errorCodeToJSON = exports.errorCodeFromJSON = exports.ErrorCode = exports.protobufPackage = void 0;
exports.GetConversationHmacKeysResponse_HmacKeysEntry = exports.GetConversationHmacKeysResponse_HmacKeys = exports.GetConversationHmacKeysResponse_HmacKeyData = exports.GetConversationHmacKeysResponse = exports.GetConversationHmacKeysRequest = exports.TopicMap_TopicsEntry = exports.TopicMap_TopicData = exports.TopicMap = exports.SetRefreshJobResponse = exports.SetRefeshJobRequest = exports.GetRefreshJobResponse = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const ciphertext_pb_1 = require("../../message_contents/ciphertext.pb");
const public_key_pb_1 = require("../../message_contents/public_key.pb");
const invitation_pb_1 = require("../../message_contents/invitation.pb");
const conversation_reference_pb_1 = require("../../message_contents/conversation_reference.pb");
const private_key_pb_1 = require("../../message_contents/private_key.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.keystore_api.v1";
/** Message content encoding structures */
/** Application-specific error codes for the Keystore API. */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ERROR_CODE_UNSPECIFIED"] = 0] = "ERROR_CODE_UNSPECIFIED";
    ErrorCode[ErrorCode["ERROR_CODE_INVALID_INPUT"] = 1] = "ERROR_CODE_INVALID_INPUT";
    ErrorCode[ErrorCode["ERROR_CODE_NO_MATCHING_PREKEY"] = 2] = "ERROR_CODE_NO_MATCHING_PREKEY";
    ErrorCode[ErrorCode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
function errorCodeFromJSON(object) {
    switch (object) {
        case 0:
        case "ERROR_CODE_UNSPECIFIED":
            return ErrorCode.ERROR_CODE_UNSPECIFIED;
        case 1:
        case "ERROR_CODE_INVALID_INPUT":
            return ErrorCode.ERROR_CODE_INVALID_INPUT;
        case 2:
        case "ERROR_CODE_NO_MATCHING_PREKEY":
            return ErrorCode.ERROR_CODE_NO_MATCHING_PREKEY;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ErrorCode.UNRECOGNIZED;
    }
}
exports.errorCodeFromJSON = errorCodeFromJSON;
function errorCodeToJSON(object) {
    switch (object) {
        case ErrorCode.ERROR_CODE_UNSPECIFIED:
            return "ERROR_CODE_UNSPECIFIED";
        case ErrorCode.ERROR_CODE_INVALID_INPUT:
            return "ERROR_CODE_INVALID_INPUT";
        case ErrorCode.ERROR_CODE_NO_MATCHING_PREKEY:
            return "ERROR_CODE_NO_MATCHING_PREKEY";
        case ErrorCode.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.errorCodeToJSON = errorCodeToJSON;
/** JobType is used to specify the type of job the caller would like info on */
var JobType;
(function (JobType) {
    JobType[JobType["JOB_TYPE_UNSPECIFIED"] = 0] = "JOB_TYPE_UNSPECIFIED";
    JobType[JobType["JOB_TYPE_REFRESH_V1"] = 1] = "JOB_TYPE_REFRESH_V1";
    JobType[JobType["JOB_TYPE_REFRESH_V2"] = 2] = "JOB_TYPE_REFRESH_V2";
    JobType[JobType["JOB_TYPE_REFRESH_PPPP"] = 3] = "JOB_TYPE_REFRESH_PPPP";
    JobType[JobType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(JobType = exports.JobType || (exports.JobType = {}));
function jobTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "JOB_TYPE_UNSPECIFIED":
            return JobType.JOB_TYPE_UNSPECIFIED;
        case 1:
        case "JOB_TYPE_REFRESH_V1":
            return JobType.JOB_TYPE_REFRESH_V1;
        case 2:
        case "JOB_TYPE_REFRESH_V2":
            return JobType.JOB_TYPE_REFRESH_V2;
        case 3:
        case "JOB_TYPE_REFRESH_PPPP":
            return JobType.JOB_TYPE_REFRESH_PPPP;
        case -1:
        case "UNRECOGNIZED":
        default:
            return JobType.UNRECOGNIZED;
    }
}
exports.jobTypeFromJSON = jobTypeFromJSON;
function jobTypeToJSON(object) {
    switch (object) {
        case JobType.JOB_TYPE_UNSPECIFIED:
            return "JOB_TYPE_UNSPECIFIED";
        case JobType.JOB_TYPE_REFRESH_V1:
            return "JOB_TYPE_REFRESH_V1";
        case JobType.JOB_TYPE_REFRESH_V2:
            return "JOB_TYPE_REFRESH_V2";
        case JobType.JOB_TYPE_REFRESH_PPPP:
            return "JOB_TYPE_REFRESH_PPPP";
        case JobType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.jobTypeToJSON = jobTypeToJSON;
/** Status of the Keystore for the specified wallet address */
var GetKeystoreStatusResponse_KeystoreStatus;
(function (GetKeystoreStatusResponse_KeystoreStatus) {
    GetKeystoreStatusResponse_KeystoreStatus[GetKeystoreStatusResponse_KeystoreStatus["KEYSTORE_STATUS_UNSPECIFIED"] = 0] = "KEYSTORE_STATUS_UNSPECIFIED";
    GetKeystoreStatusResponse_KeystoreStatus[GetKeystoreStatusResponse_KeystoreStatus["KEYSTORE_STATUS_UNINITIALIZED"] = 1] = "KEYSTORE_STATUS_UNINITIALIZED";
    GetKeystoreStatusResponse_KeystoreStatus[GetKeystoreStatusResponse_KeystoreStatus["KEYSTORE_STATUS_INITIALIZED"] = 2] = "KEYSTORE_STATUS_INITIALIZED";
    GetKeystoreStatusResponse_KeystoreStatus[GetKeystoreStatusResponse_KeystoreStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(GetKeystoreStatusResponse_KeystoreStatus = exports.GetKeystoreStatusResponse_KeystoreStatus || (exports.GetKeystoreStatusResponse_KeystoreStatus = {}));
function getKeystoreStatusResponse_KeystoreStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "KEYSTORE_STATUS_UNSPECIFIED":
            return GetKeystoreStatusResponse_KeystoreStatus.KEYSTORE_STATUS_UNSPECIFIED;
        case 1:
        case "KEYSTORE_STATUS_UNINITIALIZED":
            return GetKeystoreStatusResponse_KeystoreStatus.KEYSTORE_STATUS_UNINITIALIZED;
        case 2:
        case "KEYSTORE_STATUS_INITIALIZED":
            return GetKeystoreStatusResponse_KeystoreStatus.KEYSTORE_STATUS_INITIALIZED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return GetKeystoreStatusResponse_KeystoreStatus.UNRECOGNIZED;
    }
}
exports.getKeystoreStatusResponse_KeystoreStatusFromJSON = getKeystoreStatusResponse_KeystoreStatusFromJSON;
function getKeystoreStatusResponse_KeystoreStatusToJSON(object) {
    switch (object) {
        case GetKeystoreStatusResponse_KeystoreStatus.KEYSTORE_STATUS_UNSPECIFIED:
            return "KEYSTORE_STATUS_UNSPECIFIED";
        case GetKeystoreStatusResponse_KeystoreStatus.KEYSTORE_STATUS_UNINITIALIZED:
            return "KEYSTORE_STATUS_UNINITIALIZED";
        case GetKeystoreStatusResponse_KeystoreStatus.KEYSTORE_STATUS_INITIALIZED:
            return "KEYSTORE_STATUS_INITIALIZED";
        case GetKeystoreStatusResponse_KeystoreStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.getKeystoreStatusResponse_KeystoreStatusToJSON = getKeystoreStatusResponse_KeystoreStatusToJSON;
function createBaseKeystoreError() {
    return { message: "", code: 0 };
}
exports.KeystoreError = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        if (message.code !== 0) {
            writer.uint32(16).int32(message.code);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseKeystoreError();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                case 2:
                    message.code = reader.int32();
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
            message: isSet(object.message) ? String(object.message) : "",
            code: isSet(object.code) ? errorCodeFromJSON(object.code) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.message !== undefined && (obj.message = message.message);
        message.code !== undefined && (obj.code = errorCodeToJSON(message.code));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseKeystoreError();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        message.code = (_b = object.code) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseDecryptV1Request() {
    return { requests: [] };
}
exports.DecryptV1Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.DecryptV1Request_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptV1Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.DecryptV1Request_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.DecryptV1Request_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.DecryptV1Request_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseDecryptV1Request();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.DecryptV1Request_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseDecryptV1Request_Request() {
    return {
        payload: undefined,
        peerKeys: undefined,
        headerBytes: new Uint8Array(),
        isSender: false,
    };
}
exports.DecryptV1Request_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.payload !== undefined) {
            ciphertext_pb_1.Ciphertext.encode(message.payload, writer.uint32(10).fork()).ldelim();
        }
        if (message.peerKeys !== undefined) {
            public_key_pb_1.PublicKeyBundle.encode(message.peerKeys, writer.uint32(18).fork()).ldelim();
        }
        if (message.headerBytes.length !== 0) {
            writer.uint32(26).bytes(message.headerBytes);
        }
        if (message.isSender === true) {
            writer.uint32(32).bool(message.isSender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptV1Request_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = ciphertext_pb_1.Ciphertext.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.peerKeys = public_key_pb_1.PublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.headerBytes = reader.bytes();
                    break;
                case 4:
                    message.isSender = reader.bool();
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
            payload: isSet(object.payload)
                ? ciphertext_pb_1.Ciphertext.fromJSON(object.payload)
                : undefined,
            peerKeys: isSet(object.peerKeys)
                ? public_key_pb_1.PublicKeyBundle.fromJSON(object.peerKeys)
                : undefined,
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
            isSender: isSet(object.isSender) ? Boolean(object.isSender) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = message.payload
                ? ciphertext_pb_1.Ciphertext.toJSON(message.payload)
                : undefined);
        message.peerKeys !== undefined &&
            (obj.peerKeys = message.peerKeys
                ? public_key_pb_1.PublicKeyBundle.toJSON(message.peerKeys)
                : undefined);
        message.headerBytes !== undefined &&
            (obj.headerBytes = base64FromBytes(message.headerBytes !== undefined
                ? message.headerBytes
                : new Uint8Array()));
        message.isSender !== undefined && (obj.isSender = message.isSender);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseDecryptV1Request_Request();
        message.payload =
            object.payload !== undefined && object.payload !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.payload)
                : undefined;
        message.peerKeys =
            object.peerKeys !== undefined && object.peerKeys !== null
                ? public_key_pb_1.PublicKeyBundle.fromPartial(object.peerKeys)
                : undefined;
        message.headerBytes = (_a = object.headerBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.isSender = (_b = object.isSender) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
function createBaseDecryptResponse() {
    return { responses: [] };
}
exports.DecryptResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.DecryptResponse_Response.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.DecryptResponse_Response.decode(reader, reader.uint32()));
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
                ? object.responses.map((e) => exports.DecryptResponse_Response.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.DecryptResponse_Response.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseDecryptResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.DecryptResponse_Response.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseDecryptResponse_Response() {
    return { result: undefined, error: undefined };
}
exports.DecryptResponse_Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== undefined) {
            exports.DecryptResponse_Response_Success.encode(message.result, writer.uint32(10).fork()).ldelim();
        }
        if (message.error !== undefined) {
            exports.KeystoreError.encode(message.error, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptResponse_Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = exports.DecryptResponse_Response_Success.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = exports.KeystoreError.decode(reader, reader.uint32());
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
            result: isSet(object.result)
                ? exports.DecryptResponse_Response_Success.fromJSON(object.result)
                : undefined,
            error: isSet(object.error)
                ? exports.KeystoreError.fromJSON(object.error)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result = message.result
                ? exports.DecryptResponse_Response_Success.toJSON(message.result)
                : undefined);
        message.error !== undefined &&
            (obj.error = message.error
                ? exports.KeystoreError.toJSON(message.error)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDecryptResponse_Response();
        message.result =
            object.result !== undefined && object.result !== null
                ? exports.DecryptResponse_Response_Success.fromPartial(object.result)
                : undefined;
        message.error =
            object.error !== undefined && object.error !== null
                ? exports.KeystoreError.fromPartial(object.error)
                : undefined;
        return message;
    },
};
function createBaseDecryptResponse_Response_Success() {
    return { decrypted: new Uint8Array() };
}
exports.DecryptResponse_Response_Success = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.decrypted.length !== 0) {
            writer.uint32(10).bytes(message.decrypted);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptResponse_Response_Success();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.decrypted = reader.bytes();
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
            decrypted: isSet(object.decrypted)
                ? bytesFromBase64(object.decrypted)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.decrypted !== undefined &&
            (obj.decrypted = base64FromBytes(message.decrypted !== undefined ? message.decrypted : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseDecryptResponse_Response_Success();
        message.decrypted = (_a = object.decrypted) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseDecryptV2Request() {
    return { requests: [] };
}
exports.DecryptV2Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.DecryptV2Request_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptV2Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.DecryptV2Request_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.DecryptV2Request_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.DecryptV2Request_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseDecryptV2Request();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.DecryptV2Request_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseDecryptV2Request_Request() {
    return {
        payload: undefined,
        headerBytes: new Uint8Array(),
        contentTopic: "",
    };
}
exports.DecryptV2Request_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.payload !== undefined) {
            ciphertext_pb_1.Ciphertext.encode(message.payload, writer.uint32(10).fork()).ldelim();
        }
        if (message.headerBytes.length !== 0) {
            writer.uint32(18).bytes(message.headerBytes);
        }
        if (message.contentTopic !== "") {
            writer.uint32(26).string(message.contentTopic);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecryptV2Request_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = ciphertext_pb_1.Ciphertext.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.headerBytes = reader.bytes();
                    break;
                case 3:
                    message.contentTopic = reader.string();
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
            payload: isSet(object.payload)
                ? ciphertext_pb_1.Ciphertext.fromJSON(object.payload)
                : undefined,
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
            contentTopic: isSet(object.contentTopic)
                ? String(object.contentTopic)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = message.payload
                ? ciphertext_pb_1.Ciphertext.toJSON(message.payload)
                : undefined);
        message.headerBytes !== undefined &&
            (obj.headerBytes = base64FromBytes(message.headerBytes !== undefined
                ? message.headerBytes
                : new Uint8Array()));
        message.contentTopic !== undefined &&
            (obj.contentTopic = message.contentTopic);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseDecryptV2Request_Request();
        message.payload =
            object.payload !== undefined && object.payload !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.payload)
                : undefined;
        message.headerBytes = (_a = object.headerBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.contentTopic = (_b = object.contentTopic) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEncryptV1Request() {
    return { requests: [] };
}
exports.EncryptV1Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.EncryptV1Request_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptV1Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.EncryptV1Request_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.EncryptV1Request_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.EncryptV1Request_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEncryptV1Request();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.EncryptV1Request_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseEncryptV1Request_Request() {
    return {
        recipient: undefined,
        payload: new Uint8Array(),
        headerBytes: new Uint8Array(),
    };
}
exports.EncryptV1Request_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.recipient !== undefined) {
            public_key_pb_1.PublicKeyBundle.encode(message.recipient, writer.uint32(10).fork()).ldelim();
        }
        if (message.payload.length !== 0) {
            writer.uint32(18).bytes(message.payload);
        }
        if (message.headerBytes.length !== 0) {
            writer.uint32(26).bytes(message.headerBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptV1Request_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.recipient = public_key_pb_1.PublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.payload = reader.bytes();
                    break;
                case 3:
                    message.headerBytes = reader.bytes();
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
            recipient: isSet(object.recipient)
                ? public_key_pb_1.PublicKeyBundle.fromJSON(object.recipient)
                : undefined,
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.recipient !== undefined &&
            (obj.recipient = message.recipient
                ? public_key_pb_1.PublicKeyBundle.toJSON(message.recipient)
                : undefined);
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        message.headerBytes !== undefined &&
            (obj.headerBytes = base64FromBytes(message.headerBytes !== undefined
                ? message.headerBytes
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEncryptV1Request_Request();
        message.recipient =
            object.recipient !== undefined && object.recipient !== null
                ? public_key_pb_1.PublicKeyBundle.fromPartial(object.recipient)
                : undefined;
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.headerBytes = (_b = object.headerBytes) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseEncryptResponse() {
    return { responses: [] };
}
exports.EncryptResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.EncryptResponse_Response.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.EncryptResponse_Response.decode(reader, reader.uint32()));
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
                ? object.responses.map((e) => exports.EncryptResponse_Response.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.EncryptResponse_Response.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEncryptResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.EncryptResponse_Response.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseEncryptResponse_Response() {
    return { result: undefined, error: undefined };
}
exports.EncryptResponse_Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== undefined) {
            exports.EncryptResponse_Response_Success.encode(message.result, writer.uint32(10).fork()).ldelim();
        }
        if (message.error !== undefined) {
            exports.KeystoreError.encode(message.error, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptResponse_Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = exports.EncryptResponse_Response_Success.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = exports.KeystoreError.decode(reader, reader.uint32());
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
            result: isSet(object.result)
                ? exports.EncryptResponse_Response_Success.fromJSON(object.result)
                : undefined,
            error: isSet(object.error)
                ? exports.KeystoreError.fromJSON(object.error)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result = message.result
                ? exports.EncryptResponse_Response_Success.toJSON(message.result)
                : undefined);
        message.error !== undefined &&
            (obj.error = message.error
                ? exports.KeystoreError.toJSON(message.error)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEncryptResponse_Response();
        message.result =
            object.result !== undefined && object.result !== null
                ? exports.EncryptResponse_Response_Success.fromPartial(object.result)
                : undefined;
        message.error =
            object.error !== undefined && object.error !== null
                ? exports.KeystoreError.fromPartial(object.error)
                : undefined;
        return message;
    },
};
function createBaseEncryptResponse_Response_Success() {
    return { encrypted: undefined, senderHmac: new Uint8Array() };
}
exports.EncryptResponse_Response_Success = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.encrypted !== undefined) {
            ciphertext_pb_1.Ciphertext.encode(message.encrypted, writer.uint32(10).fork()).ldelim();
        }
        if (message.senderHmac.length !== 0) {
            writer.uint32(18).bytes(message.senderHmac);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptResponse_Response_Success();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.encrypted = ciphertext_pb_1.Ciphertext.decode(reader, reader.uint32());
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
            encrypted: isSet(object.encrypted)
                ? ciphertext_pb_1.Ciphertext.fromJSON(object.encrypted)
                : undefined,
            senderHmac: isSet(object.senderHmac)
                ? bytesFromBase64(object.senderHmac)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.encrypted !== undefined &&
            (obj.encrypted = message.encrypted
                ? ciphertext_pb_1.Ciphertext.toJSON(message.encrypted)
                : undefined);
        message.senderHmac !== undefined &&
            (obj.senderHmac = base64FromBytes(message.senderHmac !== undefined ? message.senderHmac : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEncryptResponse_Response_Success();
        message.encrypted =
            object.encrypted !== undefined && object.encrypted !== null
                ? ciphertext_pb_1.Ciphertext.fromPartial(object.encrypted)
                : undefined;
        message.senderHmac = (_a = object.senderHmac) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseEncryptV2Request() {
    return { requests: [] };
}
exports.EncryptV2Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.EncryptV2Request_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptV2Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.EncryptV2Request_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.EncryptV2Request_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.EncryptV2Request_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEncryptV2Request();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.EncryptV2Request_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseEncryptV2Request_Request() {
    return {
        payload: new Uint8Array(),
        headerBytes: new Uint8Array(),
        contentTopic: "",
    };
}
exports.EncryptV2Request_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.payload.length !== 0) {
            writer.uint32(10).bytes(message.payload);
        }
        if (message.headerBytes.length !== 0) {
            writer.uint32(18).bytes(message.headerBytes);
        }
        if (message.contentTopic !== "") {
            writer.uint32(26).string(message.contentTopic);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEncryptV2Request_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
                    break;
                case 2:
                    message.headerBytes = reader.bytes();
                    break;
                case 3:
                    message.contentTopic = reader.string();
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
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
            headerBytes: isSet(object.headerBytes)
                ? bytesFromBase64(object.headerBytes)
                : new Uint8Array(),
            contentTopic: isSet(object.contentTopic)
                ? String(object.contentTopic)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        message.headerBytes !== undefined &&
            (obj.headerBytes = base64FromBytes(message.headerBytes !== undefined
                ? message.headerBytes
                : new Uint8Array()));
        message.contentTopic !== undefined &&
            (obj.contentTopic = message.contentTopic);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEncryptV2Request_Request();
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.headerBytes = (_b = object.headerBytes) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.contentTopic = (_c = object.contentTopic) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseSelfEncryptRequest() {
    return { requests: [] };
}
exports.SelfEncryptRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.SelfEncryptRequest_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfEncryptRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.SelfEncryptRequest_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.SelfEncryptRequest_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.SelfEncryptRequest_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSelfEncryptRequest();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SelfEncryptRequest_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseSelfEncryptRequest_Request() {
    return { payload: new Uint8Array() };
}
exports.SelfEncryptRequest_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.payload.length !== 0) {
            writer.uint32(10).bytes(message.payload);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfEncryptRequest_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
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
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSelfEncryptRequest_Request();
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseSelfEncryptResponse() {
    return { responses: [] };
}
exports.SelfEncryptResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.SelfEncryptResponse_Response.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfEncryptResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.SelfEncryptResponse_Response.decode(reader, reader.uint32()));
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
                ? object.responses.map((e) => exports.SelfEncryptResponse_Response.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.SelfEncryptResponse_Response.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSelfEncryptResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SelfEncryptResponse_Response.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSelfEncryptResponse_Response() {
    return { result: undefined, error: undefined };
}
exports.SelfEncryptResponse_Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== undefined) {
            exports.SelfEncryptResponse_Response_Success.encode(message.result, writer.uint32(10).fork()).ldelim();
        }
        if (message.error !== undefined) {
            exports.KeystoreError.encode(message.error, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfEncryptResponse_Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = exports.SelfEncryptResponse_Response_Success.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = exports.KeystoreError.decode(reader, reader.uint32());
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
            result: isSet(object.result)
                ? exports.SelfEncryptResponse_Response_Success.fromJSON(object.result)
                : undefined,
            error: isSet(object.error)
                ? exports.KeystoreError.fromJSON(object.error)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result = message.result
                ? exports.SelfEncryptResponse_Response_Success.toJSON(message.result)
                : undefined);
        message.error !== undefined &&
            (obj.error = message.error
                ? exports.KeystoreError.toJSON(message.error)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSelfEncryptResponse_Response();
        message.result =
            object.result !== undefined && object.result !== null
                ? exports.SelfEncryptResponse_Response_Success.fromPartial(object.result)
                : undefined;
        message.error =
            object.error !== undefined && object.error !== null
                ? exports.KeystoreError.fromPartial(object.error)
                : undefined;
        return message;
    },
};
function createBaseSelfEncryptResponse_Response_Success() {
    return { encrypted: new Uint8Array() };
}
exports.SelfEncryptResponse_Response_Success = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.encrypted.length !== 0) {
            writer.uint32(10).bytes(message.encrypted);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfEncryptResponse_Response_Success();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.encrypted = reader.bytes();
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
            encrypted: isSet(object.encrypted)
                ? bytesFromBase64(object.encrypted)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.encrypted !== undefined &&
            (obj.encrypted = base64FromBytes(message.encrypted !== undefined ? message.encrypted : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSelfEncryptResponse_Response_Success();
        message.encrypted = (_a = object.encrypted) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseSelfDecryptRequest() {
    return { requests: [] };
}
exports.SelfDecryptRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.SelfDecryptRequest_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfDecryptRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.SelfDecryptRequest_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.SelfDecryptRequest_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.SelfDecryptRequest_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSelfDecryptRequest();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SelfDecryptRequest_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseSelfDecryptRequest_Request() {
    return { payload: new Uint8Array() };
}
exports.SelfDecryptRequest_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.payload.length !== 0) {
            writer.uint32(10).bytes(message.payload);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSelfDecryptRequest_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
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
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSelfDecryptRequest_Request();
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseGetPrivatePreferencesTopicIdentifierResponse() {
    return { identifier: "" };
}
exports.GetPrivatePreferencesTopicIdentifierResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.identifier !== "") {
            writer.uint32(10).string(message.identifier);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetPrivatePreferencesTopicIdentifierResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identifier = reader.string();
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
            identifier: isSet(object.identifier) ? String(object.identifier) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.identifier !== undefined && (obj.identifier = message.identifier);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetPrivatePreferencesTopicIdentifierResponse();
        message.identifier = (_a = object.identifier) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseCreateInviteRequest() {
    return {
        context: undefined,
        recipient: undefined,
        createdNs: long_1.default.UZERO,
        consentProof: undefined,
    };
}
exports.CreateInviteRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.context !== undefined) {
            invitation_pb_1.InvitationV1_Context.encode(message.context, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            public_key_pb_1.SignedPublicKeyBundle.encode(message.recipient, writer.uint32(18).fork()).ldelim();
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(24).uint64(message.createdNs);
        }
        if (message.consentProof !== undefined) {
            invitation_pb_1.ConsentProofPayload.encode(message.consentProof, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreateInviteRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.context = invitation_pb_1.InvitationV1_Context.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipient = public_key_pb_1.SignedPublicKeyBundle.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.createdNs = reader.uint64();
                    break;
                case 4:
                    message.consentProof = invitation_pb_1.ConsentProofPayload.decode(reader, reader.uint32());
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
            context: isSet(object.context)
                ? invitation_pb_1.InvitationV1_Context.fromJSON(object.context)
                : undefined,
            recipient: isSet(object.recipient)
                ? public_key_pb_1.SignedPublicKeyBundle.fromJSON(object.recipient)
                : undefined,
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
            consentProof: isSet(object.consentProof)
                ? invitation_pb_1.ConsentProofPayload.fromJSON(object.consentProof)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.context !== undefined &&
            (obj.context = message.context
                ? invitation_pb_1.InvitationV1_Context.toJSON(message.context)
                : undefined);
        message.recipient !== undefined &&
            (obj.recipient = message.recipient
                ? public_key_pb_1.SignedPublicKeyBundle.toJSON(message.recipient)
                : undefined);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        message.consentProof !== undefined &&
            (obj.consentProof = message.consentProof
                ? invitation_pb_1.ConsentProofPayload.toJSON(message.consentProof)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCreateInviteRequest();
        message.context =
            object.context !== undefined && object.context !== null
                ? invitation_pb_1.InvitationV1_Context.fromPartial(object.context)
                : undefined;
        message.recipient =
            object.recipient !== undefined && object.recipient !== null
                ? public_key_pb_1.SignedPublicKeyBundle.fromPartial(object.recipient)
                : undefined;
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.consentProof =
            object.consentProof !== undefined && object.consentProof !== null
                ? invitation_pb_1.ConsentProofPayload.fromPartial(object.consentProof)
                : undefined;
        return message;
    },
};
function createBaseCreateInviteResponse() {
    return { conversation: undefined, payload: new Uint8Array() };
}
exports.CreateInviteResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.conversation !== undefined) {
            conversation_reference_pb_1.ConversationReference.encode(message.conversation, writer.uint32(10).fork()).ldelim();
        }
        if (message.payload.length !== 0) {
            writer.uint32(18).bytes(message.payload);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreateInviteResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversation = conversation_reference_pb_1.ConversationReference.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.payload = reader.bytes();
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
            conversation: isSet(object.conversation)
                ? conversation_reference_pb_1.ConversationReference.fromJSON(object.conversation)
                : undefined,
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.conversation !== undefined &&
            (obj.conversation = message.conversation
                ? conversation_reference_pb_1.ConversationReference.toJSON(message.conversation)
                : undefined);
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseCreateInviteResponse();
        message.conversation =
            object.conversation !== undefined && object.conversation !== null
                ? conversation_reference_pb_1.ConversationReference.fromPartial(object.conversation)
                : undefined;
        message.payload = (_a = object.payload) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseSaveInvitesRequest() {
    return { requests: [] };
}
exports.SaveInvitesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.requests) {
            exports.SaveInvitesRequest_Request.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveInvitesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requests.push(exports.SaveInvitesRequest_Request.decode(reader, reader.uint32()));
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
                ? object.requests.map((e) => exports.SaveInvitesRequest_Request.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.requests) {
            obj.requests = message.requests.map((e) => e ? exports.SaveInvitesRequest_Request.toJSON(e) : undefined);
        }
        else {
            obj.requests = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSaveInvitesRequest();
        message.requests =
            ((_a = object.requests) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SaveInvitesRequest_Request.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseSaveInvitesRequest_Request() {
    return {
        contentTopic: "",
        timestampNs: long_1.default.UZERO,
        payload: new Uint8Array(),
    };
}
exports.SaveInvitesRequest_Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.contentTopic !== "") {
            writer.uint32(10).string(message.contentTopic);
        }
        if (!message.timestampNs.isZero()) {
            writer.uint32(16).uint64(message.timestampNs);
        }
        if (message.payload.length !== 0) {
            writer.uint32(26).bytes(message.payload);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveInvitesRequest_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.contentTopic = reader.string();
                    break;
                case 2:
                    message.timestampNs = reader.uint64();
                    break;
                case 3:
                    message.payload = reader.bytes();
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
            contentTopic: isSet(object.contentTopic)
                ? String(object.contentTopic)
                : "",
            timestampNs: isSet(object.timestampNs)
                ? long_1.default.fromValue(object.timestampNs)
                : long_1.default.UZERO,
            payload: isSet(object.payload)
                ? bytesFromBase64(object.payload)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.contentTopic !== undefined &&
            (obj.contentTopic = message.contentTopic);
        message.timestampNs !== undefined &&
            (obj.timestampNs = (message.timestampNs || long_1.default.UZERO).toString());
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseSaveInvitesRequest_Request();
        message.contentTopic = (_a = object.contentTopic) !== null && _a !== void 0 ? _a : "";
        message.timestampNs =
            object.timestampNs !== undefined && object.timestampNs !== null
                ? long_1.default.fromValue(object.timestampNs)
                : long_1.default.UZERO;
        message.payload = (_b = object.payload) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseSaveInvitesResponse() {
    return { responses: [] };
}
exports.SaveInvitesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.responses) {
            exports.SaveInvitesResponse_Response.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveInvitesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.responses.push(exports.SaveInvitesResponse_Response.decode(reader, reader.uint32()));
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
                ? object.responses.map((e) => exports.SaveInvitesResponse_Response.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.responses) {
            obj.responses = message.responses.map((e) => e ? exports.SaveInvitesResponse_Response.toJSON(e) : undefined);
        }
        else {
            obj.responses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSaveInvitesResponse();
        message.responses =
            ((_a = object.responses) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SaveInvitesResponse_Response.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSaveInvitesResponse_Response() {
    return { result: undefined, error: undefined };
}
exports.SaveInvitesResponse_Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== undefined) {
            exports.SaveInvitesResponse_Response_Success.encode(message.result, writer.uint32(10).fork()).ldelim();
        }
        if (message.error !== undefined) {
            exports.KeystoreError.encode(message.error, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveInvitesResponse_Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = exports.SaveInvitesResponse_Response_Success.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = exports.KeystoreError.decode(reader, reader.uint32());
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
            result: isSet(object.result)
                ? exports.SaveInvitesResponse_Response_Success.fromJSON(object.result)
                : undefined,
            error: isSet(object.error)
                ? exports.KeystoreError.fromJSON(object.error)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result = message.result
                ? exports.SaveInvitesResponse_Response_Success.toJSON(message.result)
                : undefined);
        message.error !== undefined &&
            (obj.error = message.error
                ? exports.KeystoreError.toJSON(message.error)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSaveInvitesResponse_Response();
        message.result =
            object.result !== undefined && object.result !== null
                ? exports.SaveInvitesResponse_Response_Success.fromPartial(object.result)
                : undefined;
        message.error =
            object.error !== undefined && object.error !== null
                ? exports.KeystoreError.fromPartial(object.error)
                : undefined;
        return message;
    },
};
function createBaseSaveInvitesResponse_Response_Success() {
    return { conversation: undefined };
}
exports.SaveInvitesResponse_Response_Success = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.conversation !== undefined) {
            conversation_reference_pb_1.ConversationReference.encode(message.conversation, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveInvitesResponse_Response_Success();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversation = conversation_reference_pb_1.ConversationReference.decode(reader, reader.uint32());
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
            conversation: isSet(object.conversation)
                ? conversation_reference_pb_1.ConversationReference.fromJSON(object.conversation)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.conversation !== undefined &&
            (obj.conversation = message.conversation
                ? conversation_reference_pb_1.ConversationReference.toJSON(message.conversation)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSaveInvitesResponse_Response_Success();
        message.conversation =
            object.conversation !== undefined && object.conversation !== null
                ? conversation_reference_pb_1.ConversationReference.fromPartial(object.conversation)
                : undefined;
        return message;
    },
};
function createBaseCreateAuthTokenRequest() {
    return { timestampNs: undefined };
}
exports.CreateAuthTokenRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.timestampNs !== undefined) {
            writer.uint32(8).uint64(message.timestampNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreateAuthTokenRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestampNs = reader.uint64();
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
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.timestampNs !== undefined &&
            (obj.timestampNs = (message.timestampNs || undefined).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCreateAuthTokenRequest();
        message.timestampNs =
            object.timestampNs !== undefined && object.timestampNs !== null
                ? long_1.default.fromValue(object.timestampNs)
                : undefined;
        return message;
    },
};
function createBaseSaveV1ConversationsRequest() {
    return { conversations: [] };
}
exports.SaveV1ConversationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.conversations) {
            conversation_reference_pb_1.ConversationReference.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveV1ConversationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversations.push(conversation_reference_pb_1.ConversationReference.decode(reader, reader.uint32()));
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
            conversations: Array.isArray(object === null || object === void 0 ? void 0 : object.conversations)
                ? object.conversations.map((e) => conversation_reference_pb_1.ConversationReference.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.conversations) {
            obj.conversations = message.conversations.map((e) => e ? conversation_reference_pb_1.ConversationReference.toJSON(e) : undefined);
        }
        else {
            obj.conversations = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSaveV1ConversationsRequest();
        message.conversations =
            ((_a = object.conversations) === null || _a === void 0 ? void 0 : _a.map((e) => conversation_reference_pb_1.ConversationReference.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseSaveV1ConversationsResponse() {
    return {};
}
exports.SaveV1ConversationsResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSaveV1ConversationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseSaveV1ConversationsResponse();
        return message;
    },
};
function createBaseGetConversationsResponse() {
    return { conversations: [] };
}
exports.GetConversationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.conversations) {
            conversation_reference_pb_1.ConversationReference.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConversationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversations.push(conversation_reference_pb_1.ConversationReference.decode(reader, reader.uint32()));
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
            conversations: Array.isArray(object === null || object === void 0 ? void 0 : object.conversations)
                ? object.conversations.map((e) => conversation_reference_pb_1.ConversationReference.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.conversations) {
            obj.conversations = message.conversations.map((e) => e ? conversation_reference_pb_1.ConversationReference.toJSON(e) : undefined);
        }
        else {
            obj.conversations = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetConversationsResponse();
        message.conversations =
            ((_a = object.conversations) === null || _a === void 0 ? void 0 : _a.map((e) => conversation_reference_pb_1.ConversationReference.fromPartial(e))) ||
                [];
        return message;
    },
};
function createBaseGetKeystoreStatusRequest() {
    return { walletAddress: "" };
}
exports.GetKeystoreStatusRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.walletAddress !== "") {
            writer.uint32(10).string(message.walletAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetKeystoreStatusRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.walletAddress = reader.string();
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
            walletAddress: isSet(object.walletAddress)
                ? String(object.walletAddress)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.walletAddress !== undefined &&
            (obj.walletAddress = message.walletAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetKeystoreStatusRequest();
        message.walletAddress = (_a = object.walletAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseGetKeystoreStatusResponse() {
    return { status: 0 };
}
exports.GetKeystoreStatusResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.status !== 0) {
            writer.uint32(8).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetKeystoreStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
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
            status: isSet(object.status)
                ? getKeystoreStatusResponse_KeystoreStatusFromJSON(object.status)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.status !== undefined &&
            (obj.status = getKeystoreStatusResponse_KeystoreStatusToJSON(message.status));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetKeystoreStatusResponse();
        message.status = (_a = object.status) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseInitKeystoreRequest() {
    return { v1: undefined };
}
exports.InitKeystoreRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            private_key_pb_1.PrivateKeyBundleV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInitKeystoreRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = private_key_pb_1.PrivateKeyBundleV1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? private_key_pb_1.PrivateKeyBundleV1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? private_key_pb_1.PrivateKeyBundleV1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseInitKeystoreRequest();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? private_key_pb_1.PrivateKeyBundleV1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseInitKeystoreResponse() {
    return { error: undefined };
}
exports.InitKeystoreResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.error !== undefined) {
            exports.KeystoreError.encode(message.error, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInitKeystoreResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.error = exports.KeystoreError.decode(reader, reader.uint32());
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
            error: isSet(object.error)
                ? exports.KeystoreError.fromJSON(object.error)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.error !== undefined &&
            (obj.error = message.error
                ? exports.KeystoreError.toJSON(message.error)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseInitKeystoreResponse();
        message.error =
            object.error !== undefined && object.error !== null
                ? exports.KeystoreError.fromPartial(object.error)
                : undefined;
        return message;
    },
};
function createBaseSignDigestRequest() {
    return {
        digest: new Uint8Array(),
        identityKey: undefined,
        prekeyIndex: undefined,
    };
}
exports.SignDigestRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.digest.length !== 0) {
            writer.uint32(10).bytes(message.digest);
        }
        if (message.identityKey !== undefined) {
            writer.uint32(16).bool(message.identityKey);
        }
        if (message.prekeyIndex !== undefined) {
            writer.uint32(24).uint32(message.prekeyIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignDigestRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.digest = reader.bytes();
                    break;
                case 2:
                    message.identityKey = reader.bool();
                    break;
                case 3:
                    message.prekeyIndex = reader.uint32();
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
            digest: isSet(object.digest)
                ? bytesFromBase64(object.digest)
                : new Uint8Array(),
            identityKey: isSet(object.identityKey)
                ? Boolean(object.identityKey)
                : undefined,
            prekeyIndex: isSet(object.prekeyIndex)
                ? Number(object.prekeyIndex)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.digest !== undefined &&
            (obj.digest = base64FromBytes(message.digest !== undefined ? message.digest : new Uint8Array()));
        message.identityKey !== undefined &&
            (obj.identityKey = message.identityKey);
        message.prekeyIndex !== undefined &&
            (obj.prekeyIndex = Math.round(message.prekeyIndex));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseSignDigestRequest();
        message.digest = (_a = object.digest) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.identityKey = (_b = object.identityKey) !== null && _b !== void 0 ? _b : undefined;
        message.prekeyIndex = (_c = object.prekeyIndex) !== null && _c !== void 0 ? _c : undefined;
        return message;
    },
};
function createBaseGetRefreshJobRequest() {
    return { jobType: 0 };
}
exports.GetRefreshJobRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.jobType !== 0) {
            writer.uint32(8).int32(message.jobType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetRefreshJobRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.jobType = reader.int32();
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
            jobType: isSet(object.jobType) ? jobTypeFromJSON(object.jobType) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.jobType !== undefined &&
            (obj.jobType = jobTypeToJSON(message.jobType));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetRefreshJobRequest();
        message.jobType = (_a = object.jobType) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseGetRefreshJobResponse() {
    return { lastRunNs: long_1.default.ZERO };
}
exports.GetRefreshJobResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.lastRunNs.isZero()) {
            writer.uint32(8).int64(message.lastRunNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetRefreshJobResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.lastRunNs = reader.int64();
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
            lastRunNs: isSet(object.lastRunNs)
                ? long_1.default.fromValue(object.lastRunNs)
                : long_1.default.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.lastRunNs !== undefined &&
            (obj.lastRunNs = (message.lastRunNs || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGetRefreshJobResponse();
        message.lastRunNs =
            object.lastRunNs !== undefined && object.lastRunNs !== null
                ? long_1.default.fromValue(object.lastRunNs)
                : long_1.default.ZERO;
        return message;
    },
};
function createBaseSetRefeshJobRequest() {
    return { jobType: 0, lastRunNs: long_1.default.ZERO };
}
exports.SetRefeshJobRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.jobType !== 0) {
            writer.uint32(8).int32(message.jobType);
        }
        if (!message.lastRunNs.isZero()) {
            writer.uint32(16).int64(message.lastRunNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSetRefeshJobRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.jobType = reader.int32();
                    break;
                case 2:
                    message.lastRunNs = reader.int64();
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
            jobType: isSet(object.jobType) ? jobTypeFromJSON(object.jobType) : 0,
            lastRunNs: isSet(object.lastRunNs)
                ? long_1.default.fromValue(object.lastRunNs)
                : long_1.default.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.jobType !== undefined &&
            (obj.jobType = jobTypeToJSON(message.jobType));
        message.lastRunNs !== undefined &&
            (obj.lastRunNs = (message.lastRunNs || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSetRefeshJobRequest();
        message.jobType = (_a = object.jobType) !== null && _a !== void 0 ? _a : 0;
        message.lastRunNs =
            object.lastRunNs !== undefined && object.lastRunNs !== null
                ? long_1.default.fromValue(object.lastRunNs)
                : long_1.default.ZERO;
        return message;
    },
};
function createBaseSetRefreshJobResponse() {
    return {};
}
exports.SetRefreshJobResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSetRefreshJobResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseSetRefreshJobResponse();
        return message;
    },
};
function createBaseTopicMap() {
    return { topics: {} };
}
exports.TopicMap = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        Object.entries(message.topics).forEach(([key, value]) => {
            exports.TopicMap_TopicsEntry.encode({ key: key, value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTopicMap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    const entry1 = exports.TopicMap_TopicsEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.topics[entry1.key] = entry1.value;
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
            topics: isObject(object.topics)
                ? Object.entries(object.topics).reduce((acc, [key, value]) => {
                    acc[key] = exports.TopicMap_TopicData.fromJSON(value);
                    return acc;
                }, {})
                : {},
        };
    },
    toJSON(message) {
        const obj = {};
        obj.topics = {};
        if (message.topics) {
            Object.entries(message.topics).forEach(([k, v]) => {
                obj.topics[k] = exports.TopicMap_TopicData.toJSON(v);
            });
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseTopicMap();
        message.topics = Object.entries((_a = object.topics) !== null && _a !== void 0 ? _a : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = exports.TopicMap_TopicData.fromPartial(value);
            }
            return acc;
        }, {});
        return message;
    },
};
function createBaseTopicMap_TopicData() {
    return { createdNs: long_1.default.UZERO, peerAddress: "", invitation: undefined };
}
exports.TopicMap_TopicData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.createdNs.isZero()) {
            writer.uint32(8).uint64(message.createdNs);
        }
        if (message.peerAddress !== "") {
            writer.uint32(18).string(message.peerAddress);
        }
        if (message.invitation !== undefined) {
            invitation_pb_1.InvitationV1.encode(message.invitation, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTopicMap_TopicData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdNs = reader.uint64();
                    break;
                case 2:
                    message.peerAddress = reader.string();
                    break;
                case 3:
                    message.invitation = invitation_pb_1.InvitationV1.decode(reader, reader.uint32());
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
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
            peerAddress: isSet(object.peerAddress) ? String(object.peerAddress) : "",
            invitation: isSet(object.invitation)
                ? invitation_pb_1.InvitationV1.fromJSON(object.invitation)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        message.peerAddress !== undefined &&
            (obj.peerAddress = message.peerAddress);
        message.invitation !== undefined &&
            (obj.invitation = message.invitation
                ? invitation_pb_1.InvitationV1.toJSON(message.invitation)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseTopicMap_TopicData();
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        message.peerAddress = (_a = object.peerAddress) !== null && _a !== void 0 ? _a : "";
        message.invitation =
            object.invitation !== undefined && object.invitation !== null
                ? invitation_pb_1.InvitationV1.fromPartial(object.invitation)
                : undefined;
        return message;
    },
};
function createBaseTopicMap_TopicsEntry() {
    return { key: "", value: undefined };
}
exports.TopicMap_TopicsEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== undefined) {
            exports.TopicMap_TopicData.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTopicMap_TopicsEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = exports.TopicMap_TopicData.decode(reader, reader.uint32());
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
            value: isSet(object.value)
                ? exports.TopicMap_TopicData.fromJSON(object.value)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = message.value
                ? exports.TopicMap_TopicData.toJSON(message.value)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseTopicMap_TopicsEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value =
            object.value !== undefined && object.value !== null
                ? exports.TopicMap_TopicData.fromPartial(object.value)
                : undefined;
        return message;
    },
};
function createBaseGetConversationHmacKeysRequest() {
    return { topics: [] };
}
exports.GetConversationHmacKeysRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.topics) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConversationHmacKeysRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topics.push(reader.string());
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
            topics: Array.isArray(object === null || object === void 0 ? void 0 : object.topics)
                ? object.topics.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.topics) {
            obj.topics = message.topics.map((e) => e);
        }
        else {
            obj.topics = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetConversationHmacKeysRequest();
        message.topics = ((_a = object.topics) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseGetConversationHmacKeysResponse() {
    return { hmacKeys: {} };
}
exports.GetConversationHmacKeysResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        Object.entries(message.hmacKeys).forEach(([key, value]) => {
            exports.GetConversationHmacKeysResponse_HmacKeysEntry.encode({ key: key, value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConversationHmacKeysResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    const entry1 = exports.GetConversationHmacKeysResponse_HmacKeysEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.hmacKeys[entry1.key] = entry1.value;
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
            hmacKeys: isObject(object.hmacKeys)
                ? Object.entries(object.hmacKeys).reduce((acc, [key, value]) => {
                    acc[key] = exports.GetConversationHmacKeysResponse_HmacKeys.fromJSON(value);
                    return acc;
                }, {})
                : {},
        };
    },
    toJSON(message) {
        const obj = {};
        obj.hmacKeys = {};
        if (message.hmacKeys) {
            Object.entries(message.hmacKeys).forEach(([k, v]) => {
                obj.hmacKeys[k] = exports.GetConversationHmacKeysResponse_HmacKeys.toJSON(v);
            });
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetConversationHmacKeysResponse();
        message.hmacKeys = Object.entries((_a = object.hmacKeys) !== null && _a !== void 0 ? _a : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = exports.GetConversationHmacKeysResponse_HmacKeys.fromPartial(value);
            }
            return acc;
        }, {});
        return message;
    },
};
function createBaseGetConversationHmacKeysResponse_HmacKeyData() {
    return { thirtyDayPeriodsSinceEpoch: 0, hmacKey: new Uint8Array() };
}
exports.GetConversationHmacKeysResponse_HmacKeyData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.thirtyDayPeriodsSinceEpoch !== 0) {
            writer.uint32(8).int32(message.thirtyDayPeriodsSinceEpoch);
        }
        if (message.hmacKey.length !== 0) {
            writer.uint32(18).bytes(message.hmacKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConversationHmacKeysResponse_HmacKeyData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.thirtyDayPeriodsSinceEpoch = reader.int32();
                    break;
                case 2:
                    message.hmacKey = reader.bytes();
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
            thirtyDayPeriodsSinceEpoch: isSet(object.thirtyDayPeriodsSinceEpoch)
                ? Number(object.thirtyDayPeriodsSinceEpoch)
                : 0,
            hmacKey: isSet(object.hmacKey)
                ? bytesFromBase64(object.hmacKey)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.thirtyDayPeriodsSinceEpoch !== undefined &&
            (obj.thirtyDayPeriodsSinceEpoch = Math.round(message.thirtyDayPeriodsSinceEpoch));
        message.hmacKey !== undefined &&
            (obj.hmacKey = base64FromBytes(message.hmacKey !== undefined ? message.hmacKey : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGetConversationHmacKeysResponse_HmacKeyData();
        message.thirtyDayPeriodsSinceEpoch = (_a = object.thirtyDayPeriodsSinceEpoch) !== null && _a !== void 0 ? _a : 0;
        message.hmacKey = (_b = object.hmacKey) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseGetConversationHmacKeysResponse_HmacKeys() {
    return { values: [] };
}
exports.GetConversationHmacKeysResponse_HmacKeys = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.values) {
            exports.GetConversationHmacKeysResponse_HmacKeyData.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConversationHmacKeysResponse_HmacKeys();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.values.push(exports.GetConversationHmacKeysResponse_HmacKeyData.decode(reader, reader.uint32()));
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
            values: Array.isArray(object === null || object === void 0 ? void 0 : object.values)
                ? object.values.map((e) => exports.GetConversationHmacKeysResponse_HmacKeyData.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.values) {
            obj.values = message.values.map((e) => e ? exports.GetConversationHmacKeysResponse_HmacKeyData.toJSON(e) : undefined);
        }
        else {
            obj.values = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetConversationHmacKeysResponse_HmacKeys();
        message.values =
            ((_a = object.values) === null || _a === void 0 ? void 0 : _a.map((e) => exports.GetConversationHmacKeysResponse_HmacKeyData.fromPartial(e))) || [];
        return message;
    },
};
function createBaseGetConversationHmacKeysResponse_HmacKeysEntry() {
    return { key: "", value: undefined };
}
exports.GetConversationHmacKeysResponse_HmacKeysEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== undefined) {
            exports.GetConversationHmacKeysResponse_HmacKeys.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConversationHmacKeysResponse_HmacKeysEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = exports.GetConversationHmacKeysResponse_HmacKeys.decode(reader, reader.uint32());
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
            value: isSet(object.value)
                ? exports.GetConversationHmacKeysResponse_HmacKeys.fromJSON(object.value)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = message.value
                ? exports.GetConversationHmacKeysResponse_HmacKeys.toJSON(message.value)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGetConversationHmacKeysResponse_HmacKeysEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value =
            object.value !== undefined && object.value !== null
                ? exports.GetConversationHmacKeysResponse_HmacKeys.fromPartial(object.value)
                : undefined;
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
//# sourceMappingURL=keystore.pb.js.map