/* eslint-disable */
import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.identity.associations";
function createBaseMemberIdentifier() {
    return { address: undefined, installationPublicKey: undefined };
}
export const MemberIdentifier = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== undefined) {
            writer.uint32(10).string(message.address);
        }
        if (message.installationPublicKey !== undefined) {
            writer.uint32(18).bytes(message.installationPublicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
export const Member = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identifier !== undefined) {
            MemberIdentifier.encode(message.identifier, writer.uint32(10).fork()).ldelim();
        }
        if (message.addedByEntity !== undefined) {
            MemberIdentifier.encode(message.addedByEntity, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMember();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identifier = MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.addedByEntity = MemberIdentifier.decode(reader, reader.uint32());
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
                ? MemberIdentifier.fromJSON(object.identifier)
                : undefined,
            addedByEntity: isSet(object.addedByEntity)
                ? MemberIdentifier.fromJSON(object.addedByEntity)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.identifier !== undefined &&
            (obj.identifier = message.identifier
                ? MemberIdentifier.toJSON(message.identifier)
                : undefined);
        message.addedByEntity !== undefined &&
            (obj.addedByEntity = message.addedByEntity
                ? MemberIdentifier.toJSON(message.addedByEntity)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMember();
        message.identifier =
            object.identifier !== undefined && object.identifier !== null
                ? MemberIdentifier.fromPartial(object.identifier)
                : undefined;
        message.addedByEntity =
            object.addedByEntity !== undefined && object.addedByEntity !== null
                ? MemberIdentifier.fromPartial(object.addedByEntity)
                : undefined;
        return message;
    },
};
function createBaseCreateInbox() {
    return {
        initialAddress: "",
        nonce: Long.UZERO,
        initialAddressSignature: undefined,
    };
}
export const CreateInbox = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.initialAddress !== "") {
            writer.uint32(10).string(message.initialAddress);
        }
        if (!message.nonce.isZero()) {
            writer.uint32(16).uint64(message.nonce);
        }
        if (message.initialAddressSignature !== undefined) {
            Signature.encode(message.initialAddressSignature, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
                    message.initialAddressSignature = Signature.decode(reader, reader.uint32());
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
            nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
            initialAddressSignature: isSet(object.initialAddressSignature)
                ? Signature.fromJSON(object.initialAddressSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.initialAddress !== undefined &&
            (obj.initialAddress = message.initialAddress);
        message.nonce !== undefined &&
            (obj.nonce = (message.nonce || Long.UZERO).toString());
        message.initialAddressSignature !== undefined &&
            (obj.initialAddressSignature = message.initialAddressSignature
                ? Signature.toJSON(message.initialAddressSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseCreateInbox();
        message.initialAddress = (_a = object.initialAddress) !== null && _a !== void 0 ? _a : "";
        message.nonce =
            object.nonce !== undefined && object.nonce !== null
                ? Long.fromValue(object.nonce)
                : Long.UZERO;
        message.initialAddressSignature =
            object.initialAddressSignature !== undefined &&
                object.initialAddressSignature !== null
                ? Signature.fromPartial(object.initialAddressSignature)
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
export const AddAssociation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.newMemberIdentifier !== undefined) {
            MemberIdentifier.encode(message.newMemberIdentifier, writer.uint32(10).fork()).ldelim();
        }
        if (message.existingMemberSignature !== undefined) {
            Signature.encode(message.existingMemberSignature, writer.uint32(18).fork()).ldelim();
        }
        if (message.newMemberSignature !== undefined) {
            Signature.encode(message.newMemberSignature, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.newMemberIdentifier = MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.existingMemberSignature = Signature.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.newMemberSignature = Signature.decode(reader, reader.uint32());
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
                ? MemberIdentifier.fromJSON(object.newMemberIdentifier)
                : undefined,
            existingMemberSignature: isSet(object.existingMemberSignature)
                ? Signature.fromJSON(object.existingMemberSignature)
                : undefined,
            newMemberSignature: isSet(object.newMemberSignature)
                ? Signature.fromJSON(object.newMemberSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.newMemberIdentifier !== undefined &&
            (obj.newMemberIdentifier = message.newMemberIdentifier
                ? MemberIdentifier.toJSON(message.newMemberIdentifier)
                : undefined);
        message.existingMemberSignature !== undefined &&
            (obj.existingMemberSignature = message.existingMemberSignature
                ? Signature.toJSON(message.existingMemberSignature)
                : undefined);
        message.newMemberSignature !== undefined &&
            (obj.newMemberSignature = message.newMemberSignature
                ? Signature.toJSON(message.newMemberSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAddAssociation();
        message.newMemberIdentifier =
            object.newMemberIdentifier !== undefined &&
                object.newMemberIdentifier !== null
                ? MemberIdentifier.fromPartial(object.newMemberIdentifier)
                : undefined;
        message.existingMemberSignature =
            object.existingMemberSignature !== undefined &&
                object.existingMemberSignature !== null
                ? Signature.fromPartial(object.existingMemberSignature)
                : undefined;
        message.newMemberSignature =
            object.newMemberSignature !== undefined &&
                object.newMemberSignature !== null
                ? Signature.fromPartial(object.newMemberSignature)
                : undefined;
        return message;
    },
};
function createBaseRevokeAssociation() {
    return { memberToRevoke: undefined, recoveryAddressSignature: undefined };
}
export const RevokeAssociation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.memberToRevoke !== undefined) {
            MemberIdentifier.encode(message.memberToRevoke, writer.uint32(10).fork()).ldelim();
        }
        if (message.recoveryAddressSignature !== undefined) {
            Signature.encode(message.recoveryAddressSignature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRevokeAssociation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.memberToRevoke = MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recoveryAddressSignature = Signature.decode(reader, reader.uint32());
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
                ? MemberIdentifier.fromJSON(object.memberToRevoke)
                : undefined,
            recoveryAddressSignature: isSet(object.recoveryAddressSignature)
                ? Signature.fromJSON(object.recoveryAddressSignature)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.memberToRevoke !== undefined &&
            (obj.memberToRevoke = message.memberToRevoke
                ? MemberIdentifier.toJSON(message.memberToRevoke)
                : undefined);
        message.recoveryAddressSignature !== undefined &&
            (obj.recoveryAddressSignature = message.recoveryAddressSignature
                ? Signature.toJSON(message.recoveryAddressSignature)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseRevokeAssociation();
        message.memberToRevoke =
            object.memberToRevoke !== undefined && object.memberToRevoke !== null
                ? MemberIdentifier.fromPartial(object.memberToRevoke)
                : undefined;
        message.recoveryAddressSignature =
            object.recoveryAddressSignature !== undefined &&
                object.recoveryAddressSignature !== null
                ? Signature.fromPartial(object.recoveryAddressSignature)
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
export const ChangeRecoveryAddress = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.newRecoveryAddress !== "") {
            writer.uint32(10).string(message.newRecoveryAddress);
        }
        if (message.existingRecoveryAddressSignature !== undefined) {
            Signature.encode(message.existingRecoveryAddressSignature, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseChangeRecoveryAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.newRecoveryAddress = reader.string();
                    break;
                case 2:
                    message.existingRecoveryAddressSignature = Signature.decode(reader, reader.uint32());
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
                ? Signature.fromJSON(object.existingRecoveryAddressSignature)
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
                    ? Signature.toJSON(message.existingRecoveryAddressSignature)
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
                ? Signature.fromPartial(object.existingRecoveryAddressSignature)
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
export const IdentityAction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.createInbox !== undefined) {
            CreateInbox.encode(message.createInbox, writer.uint32(10).fork()).ldelim();
        }
        if (message.add !== undefined) {
            AddAssociation.encode(message.add, writer.uint32(18).fork()).ldelim();
        }
        if (message.revoke !== undefined) {
            RevokeAssociation.encode(message.revoke, writer.uint32(26).fork()).ldelim();
        }
        if (message.changeRecoveryAddress !== undefined) {
            ChangeRecoveryAddress.encode(message.changeRecoveryAddress, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentityAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createInbox = CreateInbox.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.add = AddAssociation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.revoke = RevokeAssociation.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.changeRecoveryAddress = ChangeRecoveryAddress.decode(reader, reader.uint32());
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
                ? CreateInbox.fromJSON(object.createInbox)
                : undefined,
            add: isSet(object.add) ? AddAssociation.fromJSON(object.add) : undefined,
            revoke: isSet(object.revoke)
                ? RevokeAssociation.fromJSON(object.revoke)
                : undefined,
            changeRecoveryAddress: isSet(object.changeRecoveryAddress)
                ? ChangeRecoveryAddress.fromJSON(object.changeRecoveryAddress)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.createInbox !== undefined &&
            (obj.createInbox = message.createInbox
                ? CreateInbox.toJSON(message.createInbox)
                : undefined);
        message.add !== undefined &&
            (obj.add = message.add ? AddAssociation.toJSON(message.add) : undefined);
        message.revoke !== undefined &&
            (obj.revoke = message.revoke
                ? RevokeAssociation.toJSON(message.revoke)
                : undefined);
        message.changeRecoveryAddress !== undefined &&
            (obj.changeRecoveryAddress = message.changeRecoveryAddress
                ? ChangeRecoveryAddress.toJSON(message.changeRecoveryAddress)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseIdentityAction();
        message.createInbox =
            object.createInbox !== undefined && object.createInbox !== null
                ? CreateInbox.fromPartial(object.createInbox)
                : undefined;
        message.add =
            object.add !== undefined && object.add !== null
                ? AddAssociation.fromPartial(object.add)
                : undefined;
        message.revoke =
            object.revoke !== undefined && object.revoke !== null
                ? RevokeAssociation.fromPartial(object.revoke)
                : undefined;
        message.changeRecoveryAddress =
            object.changeRecoveryAddress !== undefined &&
                object.changeRecoveryAddress !== null
                ? ChangeRecoveryAddress.fromPartial(object.changeRecoveryAddress)
                : undefined;
        return message;
    },
};
function createBaseIdentityUpdate() {
    return { actions: [], clientTimestampNs: Long.UZERO, inboxId: "" };
}
export const IdentityUpdate = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.actions) {
            IdentityAction.encode(v, writer.uint32(10).fork()).ldelim();
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentityUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.actions.push(IdentityAction.decode(reader, reader.uint32()));
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
                ? object.actions.map((e) => IdentityAction.fromJSON(e))
                : [],
            clientTimestampNs: isSet(object.clientTimestampNs)
                ? Long.fromValue(object.clientTimestampNs)
                : Long.UZERO,
            inboxId: isSet(object.inboxId) ? String(object.inboxId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.actions) {
            obj.actions = message.actions.map((e) => e ? IdentityAction.toJSON(e) : undefined);
        }
        else {
            obj.actions = [];
        }
        message.clientTimestampNs !== undefined &&
            (obj.clientTimestampNs = (message.clientTimestampNs || Long.UZERO).toString());
        message.inboxId !== undefined && (obj.inboxId = message.inboxId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseIdentityUpdate();
        message.actions =
            ((_a = object.actions) === null || _a === void 0 ? void 0 : _a.map((e) => IdentityAction.fromPartial(e))) || [];
        message.clientTimestampNs =
            object.clientTimestampNs !== undefined &&
                object.clientTimestampNs !== null
                ? Long.fromValue(object.clientTimestampNs)
                : Long.UZERO;
        message.inboxId = (_b = object.inboxId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMemberMap() {
    return { key: undefined, value: undefined };
}
export const MemberMap = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== undefined) {
            MemberIdentifier.encode(message.key, writer.uint32(10).fork()).ldelim();
        }
        if (message.value !== undefined) {
            Member.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMemberMap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = MemberIdentifier.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.value = Member.decode(reader, reader.uint32());
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
                ? MemberIdentifier.fromJSON(object.key)
                : undefined,
            value: isSet(object.value) ? Member.fromJSON(object.value) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = message.key
                ? MemberIdentifier.toJSON(message.key)
                : undefined);
        message.value !== undefined &&
            (obj.value = message.value ? Member.toJSON(message.value) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMemberMap();
        message.key =
            object.key !== undefined && object.key !== null
                ? MemberIdentifier.fromPartial(object.key)
                : undefined;
        message.value =
            object.value !== undefined && object.value !== null
                ? Member.fromPartial(object.value)
                : undefined;
        return message;
    },
};
function createBaseAssociationState() {
    return { inboxId: "", members: [], recoveryAddress: "", seenSignatures: [] };
}
export const AssociationState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.inboxId !== "") {
            writer.uint32(10).string(message.inboxId);
        }
        for (const v of message.members) {
            MemberMap.encode(v, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssociationState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inboxId = reader.string();
                    break;
                case 2:
                    message.members.push(MemberMap.decode(reader, reader.uint32()));
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
                ? object.members.map((e) => MemberMap.fromJSON(e))
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
            obj.members = message.members.map((e) => e ? MemberMap.toJSON(e) : undefined);
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
            ((_b = object.members) === null || _b === void 0 ? void 0 : _b.map((e) => MemberMap.fromPartial(e))) || [];
        message.recoveryAddress = (_c = object.recoveryAddress) !== null && _c !== void 0 ? _c : "";
        message.seenSignatures = ((_d = object.seenSignatures) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function createBaseAssociationStateDiff() {
    return { newMembers: [], removedMembers: [] };
}
export const AssociationStateDiff = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.newMembers) {
            MemberIdentifier.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.removedMembers) {
            MemberIdentifier.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssociationStateDiff();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.newMembers.push(MemberIdentifier.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.removedMembers.push(MemberIdentifier.decode(reader, reader.uint32()));
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
                ? object.newMembers.map((e) => MemberIdentifier.fromJSON(e))
                : [],
            removedMembers: Array.isArray(object === null || object === void 0 ? void 0 : object.removedMembers)
                ? object.removedMembers.map((e) => MemberIdentifier.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.newMembers) {
            obj.newMembers = message.newMembers.map((e) => e ? MemberIdentifier.toJSON(e) : undefined);
        }
        else {
            obj.newMembers = [];
        }
        if (message.removedMembers) {
            obj.removedMembers = message.removedMembers.map((e) => e ? MemberIdentifier.toJSON(e) : undefined);
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
            ((_a = object.newMembers) === null || _a === void 0 ? void 0 : _a.map((e) => MemberIdentifier.fromPartial(e))) || [];
        message.removedMembers =
            ((_b = object.removedMembers) === null || _b === void 0 ? void 0 : _b.map((e) => MemberIdentifier.fromPartial(e))) || [];
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