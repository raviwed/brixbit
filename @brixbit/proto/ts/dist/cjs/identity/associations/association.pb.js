"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationStateDiff = exports.AssociationState = exports.MemberMap = exports.IdentityUpdate = exports.IdentityAction = exports.ChangeRecoveryAddress = exports.RevokeAssociation = exports.AddAssociation = exports.CreateInbox = exports.Member = exports.MemberIdentifier = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const signature_pb_1 = require("./signature.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.identity.associations";
function createBaseMemberIdentifier() {
    return { address: undefined, installationPublicKey: undefined };
}
exports.MemberIdentifier = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== undefined) {
            writer.uint32(10).string(message.address);
        }
        if (message.installationPublicKey !== undefined) {
            writer.uint32(18).bytes(message.installationPublicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMemberIdentifier();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.installationPublicKey = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : undefined,
            installationPublicKey: isSet(object.installationPublicKey)
                ? bytesFromBase64(object.installationPublicKey)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.installationPublicKey !== undefined &&
            (obj.installationPublicKey =
                message.installationPublicKey !== undefined
                    ? base64FromBytes(message.installationPublicKey)
                    : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMemberIdentifier();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : undefined;
        message.installationPublicKey = (_b = object.installationPublicKey) !== null && _b !== void 0 ? _b : undefined;
        return message;
    },
};
function createBaseMember() {
    return { identifier: undefined, addedByEntity: undefined };
}
exports.Member = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.identifier !== undefined) {
            exports.MemberIdentifier.encode(message.identifier, writer.uint32(10).fork()).ldelim();
        }
        if (message.addedByEntity !== undefined) {
            exports.MemberIdentifier.encode(message.addedByEntity, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMember();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identifier = exports.MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.addedByEntity = exports.MemberIdentifier.decode(reader, reader.uint32());
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
            identifier: isSet(object.identifier)
                ? exports.MemberIdentifier.fromJSON(object.identifier)
                : undefined,
            addedByEntity: isSet(object.addedByEntity)
                ? exports.MemberIdentifier.fromJSON(object.addedByEntity)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identifier !== undefined &&
            (obj.identifier = message.identifier
                ? exports.MemberIdentifier.toJSON(message.identifier)
                : undefined);
        message.addedByEntity !== undefined &&
            (obj.addedByEntity = message.addedByEntity
                ? exports.MemberIdentifier.toJSON(message.addedByEntity)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMember();
        message.identifier =
            object.identifier !== undefined && object.identifier !== null
                ? exports.MemberIdentifier.fromPartial(object.identifier)
                : undefined;
        message.addedByEntity =
            object.addedByEntity !== undefined && object.addedByEntity !== null
                ? exports.MemberIdentifier.fromPartial(object.addedByEntity)
                : undefined;
        return message;
    },
};
function createBaseCreateInbox() {
    return {
        initialAddress: "",
        nonce: long_1.default.UZERO,
        initialAddressSignature: undefined,
    };
}
exports.CreateInbox = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.initialAddress !== "") {
            writer.uint32(10).string(message.initialAddress);
        }
        if (!message.nonce.isZero()) {
            writer.uint32(16).uint64(message.nonce);
        }
        if (message.initialAddressSignature !== undefined) {
            signature_pb_1.Signature.encode(message.initialAddressSignature, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreateInbox();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.initialAddress = reader.string();
                    break;
                case 2:
                    message.nonce = reader.uint64();
                    break;
                case 3:
                    message.initialAddressSignature = signature_pb_1.Signature.decode(reader, reader.uint32());
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
            initialAddress: isSet(object.initialAddress)
                ? String(object.initialAddress)
                : "",
            nonce: isSet(object.nonce) ? long_1.default.fromValue(object.nonce) : long_1.default.UZERO,
            initialAddressSignature: isSet(object.initialAddressSignature)
                ? signature_pb_1.Signature.fromJSON(object.initialAddressSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.initialAddress !== undefined &&
            (obj.initialAddress = message.initialAddress);
        message.nonce !== undefined &&
            (obj.nonce = (message.nonce || long_1.default.UZERO).toString());
        message.initialAddressSignature !== undefined &&
            (obj.initialAddressSignature = message.initialAddressSignature
                ? signature_pb_1.Signature.toJSON(message.initialAddressSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseCreateInbox();
        message.initialAddress = (_a = object.initialAddress) !== null && _a !== void 0 ? _a : "";
        message.nonce =
            object.nonce !== undefined && object.nonce !== null
                ? long_1.default.fromValue(object.nonce)
                : long_1.default.UZERO;
        message.initialAddressSignature =
            object.initialAddressSignature !== undefined &&
                object.initialAddressSignature !== null
                ? signature_pb_1.Signature.fromPartial(object.initialAddressSignature)
                : undefined;
        return message;
    },
};
function createBaseAddAssociation() {
    return {
        newMemberIdentifier: undefined,
        existingMemberSignature: undefined,
        newMemberSignature: undefined,
    };
}
exports.AddAssociation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.newMemberIdentifier !== undefined) {
            exports.MemberIdentifier.encode(message.newMemberIdentifier, writer.uint32(10).fork()).ldelim();
        }
        if (message.existingMemberSignature !== undefined) {
            signature_pb_1.Signature.encode(message.existingMemberSignature, writer.uint32(18).fork()).ldelim();
        }
        if (message.newMemberSignature !== undefined) {
            signature_pb_1.Signature.encode(message.newMemberSignature, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.newMemberIdentifier = exports.MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.existingMemberSignature = signature_pb_1.Signature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.newMemberSignature = signature_pb_1.Signature.decode(reader, reader.uint32());
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
            newMemberIdentifier: isSet(object.newMemberIdentifier)
                ? exports.MemberIdentifier.fromJSON(object.newMemberIdentifier)
                : undefined,
            existingMemberSignature: isSet(object.existingMemberSignature)
                ? signature_pb_1.Signature.fromJSON(object.existingMemberSignature)
                : undefined,
            newMemberSignature: isSet(object.newMemberSignature)
                ? signature_pb_1.Signature.fromJSON(object.newMemberSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.newMemberIdentifier !== undefined &&
            (obj.newMemberIdentifier = message.newMemberIdentifier
                ? exports.MemberIdentifier.toJSON(message.newMemberIdentifier)
                : undefined);
        message.existingMemberSignature !== undefined &&
            (obj.existingMemberSignature = message.existingMemberSignature
                ? signature_pb_1.Signature.toJSON(message.existingMemberSignature)
                : undefined);
        message.newMemberSignature !== undefined &&
            (obj.newMemberSignature = message.newMemberSignature
                ? signature_pb_1.Signature.toJSON(message.newMemberSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAddAssociation();
        message.newMemberIdentifier =
            object.newMemberIdentifier !== undefined &&
                object.newMemberIdentifier !== null
                ? exports.MemberIdentifier.fromPartial(object.newMemberIdentifier)
                : undefined;
        message.existingMemberSignature =
            object.existingMemberSignature !== undefined &&
                object.existingMemberSignature !== null
                ? signature_pb_1.Signature.fromPartial(object.existingMemberSignature)
                : undefined;
        message.newMemberSignature =
            object.newMemberSignature !== undefined &&
                object.newMemberSignature !== null
                ? signature_pb_1.Signature.fromPartial(object.newMemberSignature)
                : undefined;
        return message;
    },
};
function createBaseRevokeAssociation() {
    return { memberToRevoke: undefined, recoveryAddressSignature: undefined };
}
exports.RevokeAssociation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.memberToRevoke !== undefined) {
            exports.MemberIdentifier.encode(message.memberToRevoke, writer.uint32(10).fork()).ldelim();
        }
        if (message.recoveryAddressSignature !== undefined) {
            signature_pb_1.Signature.encode(message.recoveryAddressSignature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRevokeAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.memberToRevoke = exports.MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recoveryAddressSignature = signature_pb_1.Signature.decode(reader, reader.uint32());
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
            memberToRevoke: isSet(object.memberToRevoke)
                ? exports.MemberIdentifier.fromJSON(object.memberToRevoke)
                : undefined,
            recoveryAddressSignature: isSet(object.recoveryAddressSignature)
                ? signature_pb_1.Signature.fromJSON(object.recoveryAddressSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.memberToRevoke !== undefined &&
            (obj.memberToRevoke = message.memberToRevoke
                ? exports.MemberIdentifier.toJSON(message.memberToRevoke)
                : undefined);
        message.recoveryAddressSignature !== undefined &&
            (obj.recoveryAddressSignature = message.recoveryAddressSignature
                ? signature_pb_1.Signature.toJSON(message.recoveryAddressSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseRevokeAssociation();
        message.memberToRevoke =
            object.memberToRevoke !== undefined && object.memberToRevoke !== null
                ? exports.MemberIdentifier.fromPartial(object.memberToRevoke)
                : undefined;
        message.recoveryAddressSignature =
            object.recoveryAddressSignature !== undefined &&
                object.recoveryAddressSignature !== null
                ? signature_pb_1.Signature.fromPartial(object.recoveryAddressSignature)
                : undefined;
        return message;
    },
};
function createBaseChangeRecoveryAddress() {
    return {
        newRecoveryAddress: "",
        existingRecoveryAddressSignature: undefined,
    };
}
exports.ChangeRecoveryAddress = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.newRecoveryAddress !== "") {
            writer.uint32(10).string(message.newRecoveryAddress);
        }
        if (message.existingRecoveryAddressSignature !== undefined) {
            signature_pb_1.Signature.encode(message.existingRecoveryAddressSignature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseChangeRecoveryAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.newRecoveryAddress = reader.string();
                    break;
                case 2:
                    message.existingRecoveryAddressSignature = signature_pb_1.Signature.decode(reader, reader.uint32());
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
            newRecoveryAddress: isSet(object.newRecoveryAddress)
                ? String(object.newRecoveryAddress)
                : "",
            existingRecoveryAddressSignature: isSet(object.existingRecoveryAddressSignature)
                ? signature_pb_1.Signature.fromJSON(object.existingRecoveryAddressSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.newRecoveryAddress !== undefined &&
            (obj.newRecoveryAddress = message.newRecoveryAddress);
        message.existingRecoveryAddressSignature !== undefined &&
            (obj.existingRecoveryAddressSignature =
                message.existingRecoveryAddressSignature
                    ? signature_pb_1.Signature.toJSON(message.existingRecoveryAddressSignature)
                    : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseChangeRecoveryAddress();
        message.newRecoveryAddress = (_a = object.newRecoveryAddress) !== null && _a !== void 0 ? _a : "";
        message.existingRecoveryAddressSignature =
            object.existingRecoveryAddressSignature !== undefined &&
                object.existingRecoveryAddressSignature !== null
                ? signature_pb_1.Signature.fromPartial(object.existingRecoveryAddressSignature)
                : undefined;
        return message;
    },
};
function createBaseIdentityAction() {
    return {
        createInbox: undefined,
        add: undefined,
        revoke: undefined,
        changeRecoveryAddress: undefined,
    };
}
exports.IdentityAction = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.createInbox !== undefined) {
            exports.CreateInbox.encode(message.createInbox, writer.uint32(10).fork()).ldelim();
        }
        if (message.add !== undefined) {
            exports.AddAssociation.encode(message.add, writer.uint32(18).fork()).ldelim();
        }
        if (message.revoke !== undefined) {
            exports.RevokeAssociation.encode(message.revoke, writer.uint32(26).fork()).ldelim();
        }
        if (message.changeRecoveryAddress !== undefined) {
            exports.ChangeRecoveryAddress.encode(message.changeRecoveryAddress, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentityAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createInbox = exports.CreateInbox.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.add = exports.AddAssociation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.revoke = exports.RevokeAssociation.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.changeRecoveryAddress = exports.ChangeRecoveryAddress.decode(reader, reader.uint32());
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
            createInbox: isSet(object.createInbox)
                ? exports.CreateInbox.fromJSON(object.createInbox)
                : undefined,
            add: isSet(object.add) ? exports.AddAssociation.fromJSON(object.add) : undefined,
            revoke: isSet(object.revoke)
                ? exports.RevokeAssociation.fromJSON(object.revoke)
                : undefined,
            changeRecoveryAddress: isSet(object.changeRecoveryAddress)
                ? exports.ChangeRecoveryAddress.fromJSON(object.changeRecoveryAddress)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.createInbox !== undefined &&
            (obj.createInbox = message.createInbox
                ? exports.CreateInbox.toJSON(message.createInbox)
                : undefined);
        message.add !== undefined &&
            (obj.add = message.add ? exports.AddAssociation.toJSON(message.add) : undefined);
        message.revoke !== undefined &&
            (obj.revoke = message.revoke
                ? exports.RevokeAssociation.toJSON(message.revoke)
                : undefined);
        message.changeRecoveryAddress !== undefined &&
            (obj.changeRecoveryAddress = message.changeRecoveryAddress
                ? exports.ChangeRecoveryAddress.toJSON(message.changeRecoveryAddress)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseIdentityAction();
        message.createInbox =
            object.createInbox !== undefined && object.createInbox !== null
                ? exports.CreateInbox.fromPartial(object.createInbox)
                : undefined;
        message.add =
            object.add !== undefined && object.add !== null
                ? exports.AddAssociation.fromPartial(object.add)
                : undefined;
        message.revoke =
            object.revoke !== undefined && object.revoke !== null
                ? exports.RevokeAssociation.fromPartial(object.revoke)
                : undefined;
        message.changeRecoveryAddress =
            object.changeRecoveryAddress !== undefined &&
                object.changeRecoveryAddress !== null
                ? exports.ChangeRecoveryAddress.fromPartial(object.changeRecoveryAddress)
                : undefined;
        return message;
    },
};
function createBaseIdentityUpdate() {
    return { actions: [], clientTimestampNs: long_1.default.UZERO, inboxId: "" };
}
exports.IdentityUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.actions) {
            exports.IdentityAction.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (!message.clientTimestampNs.isZero()) {
            writer.uint32(16).uint64(message.clientTimestampNs);
        }
        if (message.inboxId !== "") {
            writer.uint32(26).string(message.inboxId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentityUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.actions.push(exports.IdentityAction.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.clientTimestampNs = reader.uint64();
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
            actions: Array.isArray(object === null || object === void 0 ? void 0 : object.actions)
                ? object.actions.map((e) => exports.IdentityAction.fromJSON(e))
                : [],
            clientTimestampNs: isSet(object.clientTimestampNs)
                ? long_1.default.fromValue(object.clientTimestampNs)
                : long_1.default.UZERO,
            inboxId: isSet(object.inboxId) ? String(object.inboxId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.actions) {
            obj.actions = message.actions.map((e) => e ? exports.IdentityAction.toJSON(e) : undefined);
        }
        else {
            obj.actions = [];
        }
        message.clientTimestampNs !== undefined &&
            (obj.clientTimestampNs = (message.clientTimestampNs || long_1.default.UZERO).toString());
        message.inboxId !== undefined && (obj.inboxId = message.inboxId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseIdentityUpdate();
        message.actions =
            ((_a = object.actions) === null || _a === void 0 ? void 0 : _a.map((e) => exports.IdentityAction.fromPartial(e))) || [];
        message.clientTimestampNs =
            object.clientTimestampNs !== undefined &&
                object.clientTimestampNs !== null
                ? long_1.default.fromValue(object.clientTimestampNs)
                : long_1.default.UZERO;
        message.inboxId = (_b = object.inboxId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMemberMap() {
    return { key: undefined, value: undefined };
}
exports.MemberMap = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== undefined) {
            exports.MemberIdentifier.encode(message.key, writer.uint32(10).fork()).ldelim();
        }
        if (message.value !== undefined) {
            exports.Member.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMemberMap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = exports.MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.value = exports.Member.decode(reader, reader.uint32());
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
            key: isSet(object.key)
                ? exports.MemberIdentifier.fromJSON(object.key)
                : undefined,
            value: isSet(object.value) ? exports.Member.fromJSON(object.value) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = message.key
                ? exports.MemberIdentifier.toJSON(message.key)
                : undefined);
        message.value !== undefined &&
            (obj.value = message.value ? exports.Member.toJSON(message.value) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMemberMap();
        message.key =
            object.key !== undefined && object.key !== null
                ? exports.MemberIdentifier.fromPartial(object.key)
                : undefined;
        message.value =
            object.value !== undefined && object.value !== null
                ? exports.Member.fromPartial(object.value)
                : undefined;
        return message;
    },
};
function createBaseAssociationState() {
    return { inboxId: "", members: [], recoveryAddress: "", seenSignatures: [] };
}
exports.AssociationState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.inboxId !== "") {
            writer.uint32(10).string(message.inboxId);
        }
        for (const v of message.members) {
            exports.MemberMap.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.recoveryAddress !== "") {
            writer.uint32(26).string(message.recoveryAddress);
        }
        for (const v of message.seenSignatures) {
            writer.uint32(34).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssociationState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inboxId = reader.string();
                    break;
                case 2:
                    message.members.push(exports.MemberMap.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.recoveryAddress = reader.string();
                    break;
                case 4:
                    message.seenSignatures.push(reader.bytes());
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
            inboxId: isSet(object.inboxId) ? String(object.inboxId) : "",
            members: Array.isArray(object === null || object === void 0 ? void 0 : object.members)
                ? object.members.map((e) => exports.MemberMap.fromJSON(e))
                : [],
            recoveryAddress: isSet(object.recoveryAddress)
                ? String(object.recoveryAddress)
                : "",
            seenSignatures: Array.isArray(object === null || object === void 0 ? void 0 : object.seenSignatures)
                ? object.seenSignatures.map((e) => bytesFromBase64(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.inboxId !== undefined && (obj.inboxId = message.inboxId);
        if (message.members) {
            obj.members = message.members.map((e) => e ? exports.MemberMap.toJSON(e) : undefined);
        }
        else {
            obj.members = [];
        }
        message.recoveryAddress !== undefined &&
            (obj.recoveryAddress = message.recoveryAddress);
        if (message.seenSignatures) {
            obj.seenSignatures = message.seenSignatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.seenSignatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseAssociationState();
        message.inboxId = (_a = object.inboxId) !== null && _a !== void 0 ? _a : "";
        message.members =
            ((_b = object.members) === null || _b === void 0 ? void 0 : _b.map((e) => exports.MemberMap.fromPartial(e))) || [];
        message.recoveryAddress = (_c = object.recoveryAddress) !== null && _c !== void 0 ? _c : "";
        message.seenSignatures = ((_d = object.seenSignatures) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function createBaseAssociationStateDiff() {
    return { newMembers: [], removedMembers: [] };
}
exports.AssociationStateDiff = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.newMembers) {
            exports.MemberIdentifier.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.removedMembers) {
            exports.MemberIdentifier.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssociationStateDiff();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.newMembers.push(exports.MemberIdentifier.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.removedMembers.push(exports.MemberIdentifier.decode(reader, reader.uint32()));
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
            newMembers: Array.isArray(object === null || object === void 0 ? void 0 : object.newMembers)
                ? object.newMembers.map((e) => exports.MemberIdentifier.fromJSON(e))
                : [],
            removedMembers: Array.isArray(object === null || object === void 0 ? void 0 : object.removedMembers)
                ? object.removedMembers.map((e) => exports.MemberIdentifier.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.newMembers) {
            obj.newMembers = message.newMembers.map((e) => e ? exports.MemberIdentifier.toJSON(e) : undefined);
        }
        else {
            obj.newMembers = [];
        }
        if (message.removedMembers) {
            obj.removedMembers = message.removedMembers.map((e) => e ? exports.MemberIdentifier.toJSON(e) : undefined);
        }
        else {
            obj.removedMembers = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseAssociationStateDiff();
        message.newMembers =
            ((_a = object.newMembers) === null || _a === void 0 ? void 0 : _a.map((e) => exports.MemberIdentifier.fromPartial(e))) || [];
        message.removedMembers =
            ((_b = object.removedMembers) === null || _b === void 0 ? void 0 : _b.map((e) => exports.MemberIdentifier.fromPartial(e))) || [];
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