/* eslint-disable */
import Long from "long";
import { GrantMessagingAccessAssociation, LegacyCreateIdentityAssociation, RevokeMessagingAccessAssociation, } from "./association.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.message_contents";
function createBaseMlsCredential() {
    return {
        installationPublicKey: new Uint8Array(),
        messagingAccess: undefined,
        legacyCreateIdentity: undefined,
    };
}
export const MlsCredential = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationPublicKey.length !== 0) {
            writer.uint32(10).bytes(message.installationPublicKey);
        }
        if (message.messagingAccess !== undefined) {
            GrantMessagingAccessAssociation.encode(message.messagingAccess, writer.uint32(18).fork()).ldelim();
        }
        if (message.legacyCreateIdentity !== undefined) {
            LegacyCreateIdentityAssociation.encode(message.legacyCreateIdentity, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMlsCredential();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationPublicKey = reader.bytes();
                    break;
                case 2:
                    message.messagingAccess = GrantMessagingAccessAssociation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.legacyCreateIdentity = LegacyCreateIdentityAssociation.decode(reader, reader.uint32());
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
            installationPublicKey: isSet(object.installationPublicKey)
                ? bytesFromBase64(object.installationPublicKey)
                : new Uint8Array(),
            messagingAccess: isSet(object.messagingAccess)
                ? GrantMessagingAccessAssociation.fromJSON(object.messagingAccess)
                : undefined,
            legacyCreateIdentity: isSet(object.legacyCreateIdentity)
                ? LegacyCreateIdentityAssociation.fromJSON(object.legacyCreateIdentity)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationPublicKey !== undefined &&
            (obj.installationPublicKey = base64FromBytes(message.installationPublicKey !== undefined
                ? message.installationPublicKey
                : new Uint8Array()));
        message.messagingAccess !== undefined &&
            (obj.messagingAccess = message.messagingAccess
                ? GrantMessagingAccessAssociation.toJSON(message.messagingAccess)
                : undefined);
        message.legacyCreateIdentity !== undefined &&
            (obj.legacyCreateIdentity = message.legacyCreateIdentity
                ? LegacyCreateIdentityAssociation.toJSON(message.legacyCreateIdentity)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMlsCredential();
        message.installationPublicKey =
            (_a = object.installationPublicKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.messagingAccess =
            object.messagingAccess !== undefined && object.messagingAccess !== null
                ? GrantMessagingAccessAssociation.fromPartial(object.messagingAccess)
                : undefined;
        message.legacyCreateIdentity =
            object.legacyCreateIdentity !== undefined &&
                object.legacyCreateIdentity !== null
                ? LegacyCreateIdentityAssociation.fromPartial(object.legacyCreateIdentity)
                : undefined;
        return message;
    },
};
function createBaseCredentialRevocation() {
    return {
        installationKey: undefined,
        unsignedLegacyCreateIdentityKey: undefined,
        messagingAccess: undefined,
    };
}
export const CredentialRevocation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey !== undefined) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.unsignedLegacyCreateIdentityKey !== undefined) {
            writer.uint32(18).bytes(message.unsignedLegacyCreateIdentityKey);
        }
        if (message.messagingAccess !== undefined) {
            RevokeMessagingAccessAssociation.encode(message.messagingAccess, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCredentialRevocation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
                    message.unsignedLegacyCreateIdentityKey = reader.bytes();
                    break;
                case 3:
                    message.messagingAccess = RevokeMessagingAccessAssociation.decode(reader, reader.uint32());
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
                : undefined,
            unsignedLegacyCreateIdentityKey: isSet(object.unsignedLegacyCreateIdentityKey)
                ? bytesFromBase64(object.unsignedLegacyCreateIdentityKey)
                : undefined,
            messagingAccess: isSet(object.messagingAccess)
                ? RevokeMessagingAccessAssociation.fromJSON(object.messagingAccess)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.installationKey !== undefined &&
            (obj.installationKey =
                message.installationKey !== undefined
                    ? base64FromBytes(message.installationKey)
                    : undefined);
        message.unsignedLegacyCreateIdentityKey !== undefined &&
            (obj.unsignedLegacyCreateIdentityKey =
                message.unsignedLegacyCreateIdentityKey !== undefined
                    ? base64FromBytes(message.unsignedLegacyCreateIdentityKey)
                    : undefined);
        message.messagingAccess !== undefined &&
            (obj.messagingAccess = message.messagingAccess
                ? RevokeMessagingAccessAssociation.toJSON(message.messagingAccess)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseCredentialRevocation();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : undefined;
        message.unsignedLegacyCreateIdentityKey =
            (_b = object.unsignedLegacyCreateIdentityKey) !== null && _b !== void 0 ? _b : undefined;
        message.messagingAccess =
            object.messagingAccess !== undefined && object.messagingAccess !== null
                ? RevokeMessagingAccessAssociation.fromPartial(object.messagingAccess)
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
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=credential.pb.js.map