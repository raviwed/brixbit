/* eslint-disable */
import Long from "long";
import { SignedPublicKey } from "../../message_contents/public_key.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.identity.associations";
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
function createBaseRecoverableEd25519Signature() {
    return { bytes: new Uint8Array(), publicKey: new Uint8Array() };
}
export const RecoverableEd25519Signature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bytes.length !== 0) {
            writer.uint32(10).bytes(message.bytes);
        }
        if (message.publicKey.length !== 0) {
            writer.uint32(18).bytes(message.publicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRecoverableEd25519Signature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bytes = reader.bytes();
                    break;
                case 2:
                    message.publicKey = reader.bytes();
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
            publicKey: isSet(object.publicKey)
                ? bytesFromBase64(object.publicKey)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        message.publicKey !== undefined &&
            (obj.publicKey = base64FromBytes(message.publicKey !== undefined ? message.publicKey : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRecoverableEd25519Signature();
        message.bytes = (_a = object.bytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.publicKey = (_b = object.publicKey) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseSmartContractWalletSignature() {
    return {
        accountId: "",
        blockNumber: Long.UZERO,
        signature: new Uint8Array(),
        chainRpcUrl: "",
    };
}
export const SmartContractWalletSignature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.accountId !== "") {
            writer.uint32(10).string(message.accountId);
        }
        if (!message.blockNumber.isZero()) {
            writer.uint32(16).uint64(message.blockNumber);
        }
        if (message.signature.length !== 0) {
            writer.uint32(26).bytes(message.signature);
        }
        if (message.chainRpcUrl !== "") {
            writer.uint32(34).string(message.chainRpcUrl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSmartContractWalletSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountId = reader.string();
                    break;
                case 2:
                    message.blockNumber = reader.uint64();
                    break;
                case 3:
                    message.signature = reader.bytes();
                    break;
                case 4:
                    message.chainRpcUrl = reader.string();
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
            accountId: isSet(object.accountId) ? String(object.accountId) : "",
            blockNumber: isSet(object.blockNumber)
                ? Long.fromValue(object.blockNumber)
                : Long.UZERO,
            signature: isSet(object.signature)
                ? bytesFromBase64(object.signature)
                : new Uint8Array(),
            chainRpcUrl: isSet(object.chainRpcUrl) ? String(object.chainRpcUrl) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.accountId !== undefined && (obj.accountId = message.accountId);
        message.blockNumber !== undefined &&
            (obj.blockNumber = (message.blockNumber || Long.UZERO).toString());
        message.signature !== undefined &&
            (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
        message.chainRpcUrl !== undefined &&
            (obj.chainRpcUrl = message.chainRpcUrl);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseSmartContractWalletSignature();
        message.accountId = (_a = object.accountId) !== null && _a !== void 0 ? _a : "";
        message.blockNumber =
            object.blockNumber !== undefined && object.blockNumber !== null
                ? Long.fromValue(object.blockNumber)
                : Long.UZERO;
        message.signature = (_b = object.signature) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.chainRpcUrl = (_c = object.chainRpcUrl) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseLegacyDelegatedSignature() {
    return { delegatedKey: undefined, signature: undefined };
}
export const LegacyDelegatedSignature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegatedKey !== undefined) {
            SignedPublicKey.encode(message.delegatedKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.signature !== undefined) {
            RecoverableEcdsaSignature.encode(message.signature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLegacyDelegatedSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatedKey = SignedPublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signature = RecoverableEcdsaSignature.decode(reader, reader.uint32());
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
            delegatedKey: isSet(object.delegatedKey)
                ? SignedPublicKey.fromJSON(object.delegatedKey)
                : undefined,
            signature: isSet(object.signature)
                ? RecoverableEcdsaSignature.fromJSON(object.signature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegatedKey !== undefined &&
            (obj.delegatedKey = message.delegatedKey
                ? SignedPublicKey.toJSON(message.delegatedKey)
                : undefined);
        message.signature !== undefined &&
            (obj.signature = message.signature
                ? RecoverableEcdsaSignature.toJSON(message.signature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseLegacyDelegatedSignature();
        message.delegatedKey =
            object.delegatedKey !== undefined && object.delegatedKey !== null
                ? SignedPublicKey.fromPartial(object.delegatedKey)
                : undefined;
        message.signature =
            object.signature !== undefined && object.signature !== null
                ? RecoverableEcdsaSignature.fromPartial(object.signature)
                : undefined;
        return message;
    },
};
function createBaseSignature() {
    return {
        erc191: undefined,
        erc6492: undefined,
        installationKey: undefined,
        delegatedErc191: undefined,
    };
}
export const Signature = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.erc191 !== undefined) {
            RecoverableEcdsaSignature.encode(message.erc191, writer.uint32(10).fork()).ldelim();
        }
        if (message.erc6492 !== undefined) {
            SmartContractWalletSignature.encode(message.erc6492, writer.uint32(18).fork()).ldelim();
        }
        if (message.installationKey !== undefined) {
            RecoverableEd25519Signature.encode(message.installationKey, writer.uint32(26).fork()).ldelim();
        }
        if (message.delegatedErc191 !== undefined) {
            LegacyDelegatedSignature.encode(message.delegatedErc191, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.erc191 = RecoverableEcdsaSignature.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.erc6492 = SmartContractWalletSignature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.installationKey = RecoverableEd25519Signature.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.delegatedErc191 = LegacyDelegatedSignature.decode(reader, reader.uint32());
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
            erc191: isSet(object.erc191)
                ? RecoverableEcdsaSignature.fromJSON(object.erc191)
                : undefined,
            erc6492: isSet(object.erc6492)
                ? SmartContractWalletSignature.fromJSON(object.erc6492)
                : undefined,
            installationKey: isSet(object.installationKey)
                ? RecoverableEd25519Signature.fromJSON(object.installationKey)
                : undefined,
            delegatedErc191: isSet(object.delegatedErc191)
                ? LegacyDelegatedSignature.fromJSON(object.delegatedErc191)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.erc191 !== undefined &&
            (obj.erc191 = message.erc191
                ? RecoverableEcdsaSignature.toJSON(message.erc191)
                : undefined);
        message.erc6492 !== undefined &&
            (obj.erc6492 = message.erc6492
                ? SmartContractWalletSignature.toJSON(message.erc6492)
                : undefined);
        message.installationKey !== undefined &&
            (obj.installationKey = message.installationKey
                ? RecoverableEd25519Signature.toJSON(message.installationKey)
                : undefined);
        message.delegatedErc191 !== undefined &&
            (obj.delegatedErc191 = message.delegatedErc191
                ? LegacyDelegatedSignature.toJSON(message.delegatedErc191)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSignature();
        message.erc191 =
            object.erc191 !== undefined && object.erc191 !== null
                ? RecoverableEcdsaSignature.fromPartial(object.erc191)
                : undefined;
        message.erc6492 =
            object.erc6492 !== undefined && object.erc6492 !== null
                ? SmartContractWalletSignature.fromPartial(object.erc6492)
                : undefined;
        message.installationKey =
            object.installationKey !== undefined && object.installationKey !== null
                ? RecoverableEd25519Signature.fromPartial(object.installationKey)
                : undefined;
        message.delegatedErc191 =
            object.delegatedErc191 !== undefined && object.delegatedErc191 !== null
                ? LegacyDelegatedSignature.fromPartial(object.delegatedErc191)
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
//# sourceMappingURL=signature.pb.js.map