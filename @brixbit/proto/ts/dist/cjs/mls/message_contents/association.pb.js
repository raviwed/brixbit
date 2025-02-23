"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdDsaSignature = exports.RecoverableEcdsaSignature = exports.LegacyCreateIdentityAssociation = exports.RevokeMessagingAccessAssociation = exports.GrantMessagingAccessAssociation = exports.associationTextVersionToJSON = exports.associationTextVersionFromJSON = exports.AssociationTextVersion = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const public_key_pb_1 = require("../../message_contents/public_key.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.mls.message_contents";
/** Associations and signatures */
/**
 * Allows for us to update the format of the association text without
 * incrementing the entire proto
 */
var AssociationTextVersion;
(function (AssociationTextVersion) {
    AssociationTextVersion[AssociationTextVersion["ASSOCIATION_TEXT_VERSION_UNSPECIFIED"] = 0] = "ASSOCIATION_TEXT_VERSION_UNSPECIFIED";
    AssociationTextVersion[AssociationTextVersion["ASSOCIATION_TEXT_VERSION_1"] = 1] = "ASSOCIATION_TEXT_VERSION_1";
    AssociationTextVersion[AssociationTextVersion["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(AssociationTextVersion = exports.AssociationTextVersion || (exports.AssociationTextVersion = {}));
function associationTextVersionFromJSON(object) {
    switch (object) {
        case 0:
        case "ASSOCIATION_TEXT_VERSION_UNSPECIFIED":
            return AssociationTextVersion.ASSOCIATION_TEXT_VERSION_UNSPECIFIED;
        case 1:
        case "ASSOCIATION_TEXT_VERSION_1":
            return AssociationTextVersion.ASSOCIATION_TEXT_VERSION_1;
        case -1:
        case "UNRECOGNIZED":
        default:
            return AssociationTextVersion.UNRECOGNIZED;
    }
}
exports.associationTextVersionFromJSON = associationTextVersionFromJSON;
function associationTextVersionToJSON(object) {
    switch (object) {
        case AssociationTextVersion.ASSOCIATION_TEXT_VERSION_UNSPECIFIED:
            return "ASSOCIATION_TEXT_VERSION_UNSPECIFIED";
        case AssociationTextVersion.ASSOCIATION_TEXT_VERSION_1:
            return "ASSOCIATION_TEXT_VERSION_1";
        case AssociationTextVersion.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.associationTextVersionToJSON = associationTextVersionToJSON;
function createBaseGrantMessagingAccessAssociation() {
    return {
        associationTextVersion: 0,
        signature: undefined,
        accountAddress: "",
        createdNs: long_1.default.UZERO,
    };
}
exports.GrantMessagingAccessAssociation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.associationTextVersion !== 0) {
            writer.uint32(8).int32(message.associationTextVersion);
        }
        if (message.signature !== undefined) {
            exports.RecoverableEcdsaSignature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        if (message.accountAddress !== "") {
            writer.uint32(26).string(message.accountAddress);
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(32).uint64(message.createdNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGrantMessagingAccessAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.associationTextVersion = reader.int32();
                    break;
                case 2:
                    message.signature = exports.RecoverableEcdsaSignature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.accountAddress = reader.string();
                    break;
                case 4:
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
            associationTextVersion: isSet(object.associationTextVersion)
                ? associationTextVersionFromJSON(object.associationTextVersion)
                : 0,
            signature: isSet(object.signature)
                ? exports.RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.associationTextVersion !== undefined &&
            (obj.associationTextVersion = associationTextVersionToJSON(message.associationTextVersion));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? exports.RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGrantMessagingAccessAssociation();
        message.associationTextVersion = (_a = object.associationTextVersion) !== null && _a !== void 0 ? _a : 0;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? exports.RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        message.accountAddress = (_b = object.accountAddress) !== null && _b !== void 0 ? _b : "";
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseRevokeMessagingAccessAssociation() {
    return {
        associationTextVersion: 0,
        signature: undefined,
        accountAddress: "",
        createdNs: long_1.default.UZERO,
    };
}
exports.RevokeMessagingAccessAssociation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.associationTextVersion !== 0) {
            writer.uint32(8).int32(message.associationTextVersion);
        }
        if (message.signature !== undefined) {
            exports.RecoverableEcdsaSignature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        if (message.accountAddress !== "") {
            writer.uint32(26).string(message.accountAddress);
        }
        if (!message.createdNs.isZero()) {
            writer.uint32(32).uint64(message.createdNs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRevokeMessagingAccessAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.associationTextVersion = reader.int32();
                    break;
                case 2:
                    message.signature = exports.RecoverableEcdsaSignature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.accountAddress = reader.string();
                    break;
                case 4:
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
            associationTextVersion: isSet(object.associationTextVersion)
                ? associationTextVersionFromJSON(object.associationTextVersion)
                : 0,
            signature: isSet(object.signature)
                ? exports.RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            createdNs: isSet(object.createdNs)
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.associationTextVersion !== undefined &&
            (obj.associationTextVersion = associationTextVersionToJSON(message.associationTextVersion));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? exports.RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRevokeMessagingAccessAssociation();
        message.associationTextVersion = (_a = object.associationTextVersion) !== null && _a !== void 0 ? _a : 0;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? exports.RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        message.accountAddress = (_b = object.accountAddress) !== null && _b !== void 0 ? _b : "";
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? long_1.default.fromValue(object.createdNs)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseLegacyCreateIdentityAssociation() {
    return { signature: undefined, signedLegacyCreateIdentityKey: undefined };
}
exports.LegacyCreateIdentityAssociation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.signature !== undefined) {
            exports.RecoverableEcdsaSignature.encode(message.signature, writer.uint32(10).fork()).ldelim();
        }
        if (message.signedLegacyCreateIdentityKey !== undefined) {
            public_key_pb_1.SignedPublicKey.encode(message.signedLegacyCreateIdentityKey, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLegacyCreateIdentityAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signature = exports.RecoverableEcdsaSignature.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signedLegacyCreateIdentityKey = public_key_pb_1.SignedPublicKey.decode(reader, reader.uint32());
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
            signature: isSet(object.signature)
                ? exports.RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
            signedLegacyCreateIdentityKey: isSet(object.signedLegacyCreateIdentityKey)
                ? public_key_pb_1.SignedPublicKey.fromJSON(object.signedLegacyCreateIdentityKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? exports.RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        message.signedLegacyCreateIdentityKey !== undefined &&
            (obj.signedLegacyCreateIdentityKey = message.signedLegacyCreateIdentityKey
                ? public_key_pb_1.SignedPublicKey.toJSON(message.signedLegacyCreateIdentityKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseLegacyCreateIdentityAssociation();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? exports.RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        message.signedLegacyCreateIdentityKey =
            object.signedLegacyCreateIdentityKey !== undefined &&
                object.signedLegacyCreateIdentityKey !== null
                ? public_key_pb_1.SignedPublicKey.fromPartial(object.signedLegacyCreateIdentityKey)
                : undefined;
        return message;
    },
};
function createBaseRecoverableEcdsaSignature() {
    return { bytes: new Uint8Array() };
}
exports.RecoverableEcdsaSignature = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRecoverableEcdsaSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
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
            bytes: isSet(object.bytes)
                ? bytesFromBase64(object.bytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRecoverableEcdsaSignature();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseEdDsaSignature() {
    return { bytes: new Uint8Array() };
}
exports.EdDsaSignature = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEdDsaSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
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
            bytes: isSet(object.bytes)
                ? bytesFromBase64(object.bytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEdDsaSignature();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
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
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=association.pb.js.map