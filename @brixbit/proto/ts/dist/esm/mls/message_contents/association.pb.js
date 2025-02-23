/* eslint-disable */
import Long from "long";
import { SignedPublicKey } from "../../message_contents/public_key.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.message_contents";
/** Associations and signatures */
/**
 * Allows for us to update the format of the association text without
 * incrementing the entire proto
 */
export var AssociationTextVersion;
(function (AssociationTextVersion) {
    AssociationTextVersion[AssociationTextVersion["ASSOCIATION_TEXT_VERSION_UNSPECIFIED"] = 0] = "ASSOCIATION_TEXT_VERSION_UNSPECIFIED";
    AssociationTextVersion[AssociationTextVersion["ASSOCIATION_TEXT_VERSION_1"] = 1] = "ASSOCIATION_TEXT_VERSION_1";
    AssociationTextVersion[AssociationTextVersion["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(AssociationTextVersion || (AssociationTextVersion = {}));
export function associationTextVersionFromJSON(object) {
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
export function associationTextVersionToJSON(object) {
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
function createBaseGrantMessagingAccessAssociation() {
    return {
        associationTextVersion: 0,
        signature: undefined,
        accountAddress: "",
        createdNs: Long.UZERO,
    };
}
export const GrantMessagingAccessAssociation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.associationTextVersion !== 0) {
            writer.uint32(8).int32(message.associationTextVersion);
        }
        if (message.signature !== undefined) {
            RecoverableEcdsaSignature.encode(message.signature, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGrantMessagingAccessAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.associationTextVersion = reader.int32();
                    break;
                case 2:
                    message.signature = RecoverableEcdsaSignature.decode(reader, reader.uint32());
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
                ? RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            createdNs: isSet(object.createdNs)
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.associationTextVersion !== undefined &&
            (obj.associationTextVersion = associationTextVersionToJSON(message.associationTextVersion));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGrantMessagingAccessAssociation();
        message.associationTextVersion = (_a = object.associationTextVersion) !== null && _a !== void 0 ? _a : 0;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        message.accountAddress = (_b = object.accountAddress) !== null && _b !== void 0 ? _b : "";
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        return message;
    },
};
function createBaseRevokeMessagingAccessAssociation() {
    return {
        associationTextVersion: 0,
        signature: undefined,
        accountAddress: "",
        createdNs: Long.UZERO,
    };
}
export const RevokeMessagingAccessAssociation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.associationTextVersion !== 0) {
            writer.uint32(8).int32(message.associationTextVersion);
        }
        if (message.signature !== undefined) {
            RecoverableEcdsaSignature.encode(message.signature, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRevokeMessagingAccessAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.associationTextVersion = reader.int32();
                    break;
                case 2:
                    message.signature = RecoverableEcdsaSignature.decode(reader, reader.uint32());
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
                ? RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            createdNs: isSet(object.createdNs)
                ? Long.fromValue(object.createdNs)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.associationTextVersion !== undefined &&
            (obj.associationTextVersion = associationTextVersionToJSON(message.associationTextVersion));
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.createdNs !== undefined &&
            (obj.createdNs = (message.createdNs || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRevokeMessagingAccessAssociation();
        message.associationTextVersion = (_a = object.associationTextVersion) !== null && _a !== void 0 ? _a : 0;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        message.accountAddress = (_b = object.accountAddress) !== null && _b !== void 0 ? _b : "";
        message.createdNs =
            object.createdNs !== undefined && object.createdNs !== null
                ? Long.fromValue(object.createdNs)
                : Long.UZERO;
        return message;
    },
};
function createBaseLegacyCreateIdentityAssociation() {
    return { signature: undefined, signedLegacyCreateIdentityKey: undefined };
}
export const LegacyCreateIdentityAssociation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signature !== undefined) {
            RecoverableEcdsaSignature.encode(message.signature, writer.uint32(10).fork()).ldelim();
        }
        if (message.signedLegacyCreateIdentityKey !== undefined) {
            SignedPublicKey.encode(message.signedLegacyCreateIdentityKey, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLegacyCreateIdentityAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signature = RecoverableEcdsaSignature.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signedLegacyCreateIdentityKey = SignedPublicKey.decode(reader, reader.uint32());
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
                ? RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
            signedLegacyCreateIdentityKey: isSet(object.signedLegacyCreateIdentityKey)
                ? SignedPublicKey.fromJSON(object.signedLegacyCreateIdentityKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        message.signedLegacyCreateIdentityKey !== undefined &&
            (obj.signedLegacyCreateIdentityKey = message.signedLegacyCreateIdentityKey
                ? SignedPublicKey.toJSON(message.signedLegacyCreateIdentityKey)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseLegacyCreateIdentityAssociation();
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        message.signedLegacyCreateIdentityKey =
            object.signedLegacyCreateIdentityKey !== undefined &&
                object.signedLegacyCreateIdentityKey !== null
                ? SignedPublicKey.fromPartial(object.signedLegacyCreateIdentityKey)
                : undefined;
        return message;
    },
};
function createBaseRecoverableEcdsaSignature() {
    return { bytes: new Uint8Array() };
}
export const RecoverableEcdsaSignature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const EdDsaSignature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=association.pb.js.map