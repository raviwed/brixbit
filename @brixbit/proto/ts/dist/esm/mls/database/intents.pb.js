/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.database";
/** Type of update to admin lists */
export var AdminListUpdateType;
(function (AdminListUpdateType) {
    AdminListUpdateType[AdminListUpdateType["ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED"] = 0] = "ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED";
    AdminListUpdateType[AdminListUpdateType["ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN"] = 1] = "ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN";
    AdminListUpdateType[AdminListUpdateType["ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN"] = 2] = "ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN";
    AdminListUpdateType[AdminListUpdateType["ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN"] = 3] = "ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN";
    AdminListUpdateType[AdminListUpdateType["ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN"] = 4] = "ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN";
    AdminListUpdateType[AdminListUpdateType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(AdminListUpdateType || (AdminListUpdateType = {}));
export function adminListUpdateTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED":
            return AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED;
        case 1:
        case "ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN":
            return AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN;
        case 2:
        case "ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN":
            return AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN;
        case 3:
        case "ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN":
            return AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN;
        case 4:
        case "ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN":
            return AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN;
        case -1:
        case "UNRECOGNIZED":
        default:
            return AdminListUpdateType.UNRECOGNIZED;
    }
}
export function adminListUpdateTypeToJSON(object) {
    switch (object) {
        case AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED:
            return "ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED";
        case AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN:
            return "ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN";
        case AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN:
            return "ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN";
        case AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN:
            return "ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN";
        case AdminListUpdateType.ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN:
            return "ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN";
        case AdminListUpdateType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** Type of Permission to Update */
export var PermissionUpdateType;
(function (PermissionUpdateType) {
    PermissionUpdateType[PermissionUpdateType["PERMISSION_UPDATE_TYPE_UNSPECIFIED"] = 0] = "PERMISSION_UPDATE_TYPE_UNSPECIFIED";
    PermissionUpdateType[PermissionUpdateType["PERMISSION_UPDATE_TYPE_ADD_MEMBER"] = 1] = "PERMISSION_UPDATE_TYPE_ADD_MEMBER";
    PermissionUpdateType[PermissionUpdateType["PERMISSION_UPDATE_TYPE_REMOVE_MEMBER"] = 2] = "PERMISSION_UPDATE_TYPE_REMOVE_MEMBER";
    PermissionUpdateType[PermissionUpdateType["PERMISSION_UPDATE_TYPE_ADD_ADMIN"] = 3] = "PERMISSION_UPDATE_TYPE_ADD_ADMIN";
    PermissionUpdateType[PermissionUpdateType["PERMISSION_UPDATE_TYPE_REMOVE_ADMIN"] = 4] = "PERMISSION_UPDATE_TYPE_REMOVE_ADMIN";
    PermissionUpdateType[PermissionUpdateType["PERMISSION_UPDATE_TYPE_UPDATE_METADATA"] = 5] = "PERMISSION_UPDATE_TYPE_UPDATE_METADATA";
    PermissionUpdateType[PermissionUpdateType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PermissionUpdateType || (PermissionUpdateType = {}));
export function permissionUpdateTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "PERMISSION_UPDATE_TYPE_UNSPECIFIED":
            return PermissionUpdateType.PERMISSION_UPDATE_TYPE_UNSPECIFIED;
        case 1:
        case "PERMISSION_UPDATE_TYPE_ADD_MEMBER":
            return PermissionUpdateType.PERMISSION_UPDATE_TYPE_ADD_MEMBER;
        case 2:
        case "PERMISSION_UPDATE_TYPE_REMOVE_MEMBER":
            return PermissionUpdateType.PERMISSION_UPDATE_TYPE_REMOVE_MEMBER;
        case 3:
        case "PERMISSION_UPDATE_TYPE_ADD_ADMIN":
            return PermissionUpdateType.PERMISSION_UPDATE_TYPE_ADD_ADMIN;
        case 4:
        case "PERMISSION_UPDATE_TYPE_REMOVE_ADMIN":
            return PermissionUpdateType.PERMISSION_UPDATE_TYPE_REMOVE_ADMIN;
        case 5:
        case "PERMISSION_UPDATE_TYPE_UPDATE_METADATA":
            return PermissionUpdateType.PERMISSION_UPDATE_TYPE_UPDATE_METADATA;
        case -1:
        case "UNRECOGNIZED":
        default:
            return PermissionUpdateType.UNRECOGNIZED;
    }
}
export function permissionUpdateTypeToJSON(object) {
    switch (object) {
        case PermissionUpdateType.PERMISSION_UPDATE_TYPE_UNSPECIFIED:
            return "PERMISSION_UPDATE_TYPE_UNSPECIFIED";
        case PermissionUpdateType.PERMISSION_UPDATE_TYPE_ADD_MEMBER:
            return "PERMISSION_UPDATE_TYPE_ADD_MEMBER";
        case PermissionUpdateType.PERMISSION_UPDATE_TYPE_REMOVE_MEMBER:
            return "PERMISSION_UPDATE_TYPE_REMOVE_MEMBER";
        case PermissionUpdateType.PERMISSION_UPDATE_TYPE_ADD_ADMIN:
            return "PERMISSION_UPDATE_TYPE_ADD_ADMIN";
        case PermissionUpdateType.PERMISSION_UPDATE_TYPE_REMOVE_ADMIN:
            return "PERMISSION_UPDATE_TYPE_REMOVE_ADMIN";
        case PermissionUpdateType.PERMISSION_UPDATE_TYPE_UPDATE_METADATA:
            return "PERMISSION_UPDATE_TYPE_UPDATE_METADATA";
        case PermissionUpdateType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** Permission Policy */
export var PermissionPolicyOption;
(function (PermissionPolicyOption) {
    PermissionPolicyOption[PermissionPolicyOption["PERMISSION_POLICY_OPTION_UNSPECIFIED"] = 0] = "PERMISSION_POLICY_OPTION_UNSPECIFIED";
    PermissionPolicyOption[PermissionPolicyOption["PERMISSION_POLICY_OPTION_ALLOW"] = 1] = "PERMISSION_POLICY_OPTION_ALLOW";
    PermissionPolicyOption[PermissionPolicyOption["PERMISSION_POLICY_OPTION_DENY"] = 2] = "PERMISSION_POLICY_OPTION_DENY";
    PermissionPolicyOption[PermissionPolicyOption["PERMISSION_POLICY_OPTION_ADMIN_ONLY"] = 3] = "PERMISSION_POLICY_OPTION_ADMIN_ONLY";
    PermissionPolicyOption[PermissionPolicyOption["PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY"] = 4] = "PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY";
    PermissionPolicyOption[PermissionPolicyOption["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PermissionPolicyOption || (PermissionPolicyOption = {}));
export function permissionPolicyOptionFromJSON(object) {
    switch (object) {
        case 0:
        case "PERMISSION_POLICY_OPTION_UNSPECIFIED":
            return PermissionPolicyOption.PERMISSION_POLICY_OPTION_UNSPECIFIED;
        case 1:
        case "PERMISSION_POLICY_OPTION_ALLOW":
            return PermissionPolicyOption.PERMISSION_POLICY_OPTION_ALLOW;
        case 2:
        case "PERMISSION_POLICY_OPTION_DENY":
            return PermissionPolicyOption.PERMISSION_POLICY_OPTION_DENY;
        case 3:
        case "PERMISSION_POLICY_OPTION_ADMIN_ONLY":
            return PermissionPolicyOption.PERMISSION_POLICY_OPTION_ADMIN_ONLY;
        case 4:
        case "PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY":
            return PermissionPolicyOption.PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY;
        case -1:
        case "UNRECOGNIZED":
        default:
            return PermissionPolicyOption.UNRECOGNIZED;
    }
}
export function permissionPolicyOptionToJSON(object) {
    switch (object) {
        case PermissionPolicyOption.PERMISSION_POLICY_OPTION_UNSPECIFIED:
            return "PERMISSION_POLICY_OPTION_UNSPECIFIED";
        case PermissionPolicyOption.PERMISSION_POLICY_OPTION_ALLOW:
            return "PERMISSION_POLICY_OPTION_ALLOW";
        case PermissionPolicyOption.PERMISSION_POLICY_OPTION_DENY:
            return "PERMISSION_POLICY_OPTION_DENY";
        case PermissionPolicyOption.PERMISSION_POLICY_OPTION_ADMIN_ONLY:
            return "PERMISSION_POLICY_OPTION_ADMIN_ONLY";
        case PermissionPolicyOption.PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY:
            return "PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY";
        case PermissionPolicyOption.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseSendMessageData() {
    return { v1: undefined };
}
export const SendMessageData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            SendMessageData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendMessageData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = SendMessageData_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? SendMessageData_V1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? SendMessageData_V1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSendMessageData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? SendMessageData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseSendMessageData_V1() {
    return { payloadBytes: new Uint8Array() };
}
export const SendMessageData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.payloadBytes.length !== 0) {
            writer.uint32(10).bytes(message.payloadBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendMessageData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payloadBytes = reader.bytes();
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
            payloadBytes: isSet(object.payloadBytes)
                ? bytesFromBase64(object.payloadBytes)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.payloadBytes !== undefined &&
            (obj.payloadBytes = base64FromBytes(message.payloadBytes !== undefined
                ? message.payloadBytes
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSendMessageData_V1();
        message.payloadBytes = (_a = object.payloadBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseAccountAddresses() {
    return { accountAddresses: [] };
}
export const AccountAddresses = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.accountAddresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountAddresses();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountAddresses.push(reader.string());
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
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseAccountAddresses();
        message.accountAddresses = ((_a = object.accountAddresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseInstallationIds() {
    return { installationIds: [] };
}
export const InstallationIds = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.installationIds) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstallationIds();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationIds.push(reader.bytes());
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
            installationIds: Array.isArray(object === null || object === void 0 ? void 0 : object.installationIds)
                ? object.installationIds.map((e) => bytesFromBase64(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.installationIds) {
            obj.installationIds = message.installationIds.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.installationIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseInstallationIds();
        message.installationIds = ((_a = object.installationIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseAddressesOrInstallationIds() {
    return { accountAddresses: undefined, installationIds: undefined };
}
export const AddressesOrInstallationIds = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.accountAddresses !== undefined) {
            AccountAddresses.encode(message.accountAddresses, writer.uint32(10).fork()).ldelim();
        }
        if (message.installationIds !== undefined) {
            InstallationIds.encode(message.installationIds, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressesOrInstallationIds();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountAddresses = AccountAddresses.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.installationIds = InstallationIds.decode(reader, reader.uint32());
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
            accountAddresses: isSet(object.accountAddresses)
                ? AccountAddresses.fromJSON(object.accountAddresses)
                : undefined,
            installationIds: isSet(object.installationIds)
                ? InstallationIds.fromJSON(object.installationIds)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.accountAddresses !== undefined &&
            (obj.accountAddresses = message.accountAddresses
                ? AccountAddresses.toJSON(message.accountAddresses)
                : undefined);
        message.installationIds !== undefined &&
            (obj.installationIds = message.installationIds
                ? InstallationIds.toJSON(message.installationIds)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAddressesOrInstallationIds();
        message.accountAddresses =
            object.accountAddresses !== undefined && object.accountAddresses !== null
                ? AccountAddresses.fromPartial(object.accountAddresses)
                : undefined;
        message.installationIds =
            object.installationIds !== undefined && object.installationIds !== null
                ? InstallationIds.fromPartial(object.installationIds)
                : undefined;
        return message;
    },
};
function createBaseAddMembersData() {
    return { v1: undefined };
}
export const AddMembersData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            AddMembersData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddMembersData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = AddMembersData_V1.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? AddMembersData_V1.fromJSON(object.v1) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? AddMembersData_V1.toJSON(message.v1) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAddMembersData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? AddMembersData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseAddMembersData_V1() {
    return { addressesOrInstallationIds: undefined };
}
export const AddMembersData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.addressesOrInstallationIds !== undefined) {
            AddressesOrInstallationIds.encode(message.addressesOrInstallationIds, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddMembersData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addressesOrInstallationIds =
                        AddressesOrInstallationIds.decode(reader, reader.uint32());
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
            addressesOrInstallationIds: isSet(object.addressesOrInstallationIds)
                ? AddressesOrInstallationIds.fromJSON(object.addressesOrInstallationIds)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.addressesOrInstallationIds !== undefined &&
            (obj.addressesOrInstallationIds = message.addressesOrInstallationIds
                ? AddressesOrInstallationIds.toJSON(message.addressesOrInstallationIds)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAddMembersData_V1();
        message.addressesOrInstallationIds =
            object.addressesOrInstallationIds !== undefined &&
                object.addressesOrInstallationIds !== null
                ? AddressesOrInstallationIds.fromPartial(object.addressesOrInstallationIds)
                : undefined;
        return message;
    },
};
function createBaseRemoveMembersData() {
    return { v1: undefined };
}
export const RemoveMembersData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            RemoveMembersData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRemoveMembersData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = RemoveMembersData_V1.decode(reader, reader.uint32());
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
                ? RemoveMembersData_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? RemoveMembersData_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseRemoveMembersData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? RemoveMembersData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseRemoveMembersData_V1() {
    return { addressesOrInstallationIds: undefined };
}
export const RemoveMembersData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.addressesOrInstallationIds !== undefined) {
            AddressesOrInstallationIds.encode(message.addressesOrInstallationIds, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRemoveMembersData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addressesOrInstallationIds =
                        AddressesOrInstallationIds.decode(reader, reader.uint32());
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
            addressesOrInstallationIds: isSet(object.addressesOrInstallationIds)
                ? AddressesOrInstallationIds.fromJSON(object.addressesOrInstallationIds)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.addressesOrInstallationIds !== undefined &&
            (obj.addressesOrInstallationIds = message.addressesOrInstallationIds
                ? AddressesOrInstallationIds.toJSON(message.addressesOrInstallationIds)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseRemoveMembersData_V1();
        message.addressesOrInstallationIds =
            object.addressesOrInstallationIds !== undefined &&
                object.addressesOrInstallationIds !== null
                ? AddressesOrInstallationIds.fromPartial(object.addressesOrInstallationIds)
                : undefined;
        return message;
    },
};
function createBaseUpdateGroupMembershipData() {
    return { v1: undefined };
}
export const UpdateGroupMembershipData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            UpdateGroupMembershipData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateGroupMembershipData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = UpdateGroupMembershipData_V1.decode(reader, reader.uint32());
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
                ? UpdateGroupMembershipData_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? UpdateGroupMembershipData_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUpdateGroupMembershipData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? UpdateGroupMembershipData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseUpdateGroupMembershipData_V1() {
    return { membershipUpdates: {}, removedMembers: [] };
}
export const UpdateGroupMembershipData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        Object.entries(message.membershipUpdates).forEach(([key, value]) => {
            UpdateGroupMembershipData_V1_MembershipUpdatesEntry.encode({ key: key, value }, writer.uint32(10).fork()).ldelim();
        });
        for (const v of message.removedMembers) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateGroupMembershipData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    const entry1 = UpdateGroupMembershipData_V1_MembershipUpdatesEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.membershipUpdates[entry1.key] = entry1.value;
                    }
                    break;
                case 2:
                    message.removedMembers.push(reader.string());
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
            membershipUpdates: isObject(object.membershipUpdates)
                ? Object.entries(object.membershipUpdates).reduce((acc, [key, value]) => {
                    acc[key] = Long.fromValue(value);
                    return acc;
                }, {})
                : {},
            removedMembers: Array.isArray(object === null || object === void 0 ? void 0 : object.removedMembers)
                ? object.removedMembers.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        obj.membershipUpdates = {};
        if (message.membershipUpdates) {
            Object.entries(message.membershipUpdates).forEach(([k, v]) => {
                obj.membershipUpdates[k] = v.toString();
            });
        }
        if (message.removedMembers) {
            obj.removedMembers = message.removedMembers.map((e) => e);
        }
        else {
            obj.removedMembers = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseUpdateGroupMembershipData_V1();
        message.membershipUpdates = Object.entries((_a = object.membershipUpdates) !== null && _a !== void 0 ? _a : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = Long.fromValue(value);
            }
            return acc;
        }, {});
        message.removedMembers = ((_b = object.removedMembers) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        return message;
    },
};
function createBaseUpdateGroupMembershipData_V1_MembershipUpdatesEntry() {
    return { key: "", value: Long.UZERO };
}
export const UpdateGroupMembershipData_V1_MembershipUpdatesEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (!message.value.isZero()) {
            writer.uint32(16).uint64(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateGroupMembershipData_V1_MembershipUpdatesEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.uint64();
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
            value: isSet(object.value) ? Long.fromValue(object.value) : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = (message.value || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseUpdateGroupMembershipData_V1_MembershipUpdatesEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value =
            object.value !== undefined && object.value !== null
                ? Long.fromValue(object.value)
                : Long.UZERO;
        return message;
    },
};
function createBaseUpdateMetadataData() {
    return { v1: undefined };
}
export const UpdateMetadataData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            UpdateMetadataData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateMetadataData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = UpdateMetadataData_V1.decode(reader, reader.uint32());
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
                ? UpdateMetadataData_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? UpdateMetadataData_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUpdateMetadataData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? UpdateMetadataData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseUpdateMetadataData_V1() {
    return { fieldName: "", fieldValue: "" };
}
export const UpdateMetadataData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fieldName !== "") {
            writer.uint32(10).string(message.fieldName);
        }
        if (message.fieldValue !== "") {
            writer.uint32(18).string(message.fieldValue);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateMetadataData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fieldName = reader.string();
                    break;
                case 2:
                    message.fieldValue = reader.string();
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
            fieldName: isSet(object.fieldName) ? String(object.fieldName) : "",
            fieldValue: isSet(object.fieldValue) ? String(object.fieldValue) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.fieldName !== undefined && (obj.fieldName = message.fieldName);
        message.fieldValue !== undefined && (obj.fieldValue = message.fieldValue);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseUpdateMetadataData_V1();
        message.fieldName = (_a = object.fieldName) !== null && _a !== void 0 ? _a : "";
        message.fieldValue = (_b = object.fieldValue) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseUpdateAdminListsData() {
    return { v1: undefined };
}
export const UpdateAdminListsData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            UpdateAdminListsData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateAdminListsData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = UpdateAdminListsData_V1.decode(reader, reader.uint32());
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
                ? UpdateAdminListsData_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? UpdateAdminListsData_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUpdateAdminListsData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? UpdateAdminListsData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseUpdateAdminListsData_V1() {
    return { adminListUpdateType: 0, inboxId: "" };
}
export const UpdateAdminListsData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.adminListUpdateType !== 0) {
            writer.uint32(8).int32(message.adminListUpdateType);
        }
        if (message.inboxId !== "") {
            writer.uint32(18).string(message.inboxId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateAdminListsData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.adminListUpdateType = reader.int32();
                    break;
                case 2:
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
            adminListUpdateType: isSet(object.adminListUpdateType)
                ? adminListUpdateTypeFromJSON(object.adminListUpdateType)
                : 0,
            inboxId: isSet(object.inboxId) ? String(object.inboxId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.adminListUpdateType !== undefined &&
            (obj.adminListUpdateType = adminListUpdateTypeToJSON(message.adminListUpdateType));
        message.inboxId !== undefined && (obj.inboxId = message.inboxId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseUpdateAdminListsData_V1();
        message.adminListUpdateType = (_a = object.adminListUpdateType) !== null && _a !== void 0 ? _a : 0;
        message.inboxId = (_b = object.inboxId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseUpdatePermissionData() {
    return { v1: undefined };
}
export const UpdatePermissionData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            UpdatePermissionData_V1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdatePermissionData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = UpdatePermissionData_V1.decode(reader, reader.uint32());
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
                ? UpdatePermissionData_V1.fromJSON(object.v1)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1
                ? UpdatePermissionData_V1.toJSON(message.v1)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUpdatePermissionData();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? UpdatePermissionData_V1.fromPartial(object.v1)
                : undefined;
        return message;
    },
};
function createBaseUpdatePermissionData_V1() {
    return {
        permissionUpdateType: 0,
        permissionPolicyOption: 0,
        metadataFieldName: undefined,
    };
}
export const UpdatePermissionData_V1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.permissionUpdateType !== 0) {
            writer.uint32(8).int32(message.permissionUpdateType);
        }
        if (message.permissionPolicyOption !== 0) {
            writer.uint32(16).int32(message.permissionPolicyOption);
        }
        if (message.metadataFieldName !== undefined) {
            writer.uint32(26).string(message.metadataFieldName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdatePermissionData_V1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.permissionUpdateType = reader.int32();
                    break;
                case 2:
                    message.permissionPolicyOption = reader.int32();
                    break;
                case 3:
                    message.metadataFieldName = reader.string();
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
            permissionUpdateType: isSet(object.permissionUpdateType)
                ? permissionUpdateTypeFromJSON(object.permissionUpdateType)
                : 0,
            permissionPolicyOption: isSet(object.permissionPolicyOption)
                ? permissionPolicyOptionFromJSON(object.permissionPolicyOption)
                : 0,
            metadataFieldName: isSet(object.metadataFieldName)
                ? String(object.metadataFieldName)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.permissionUpdateType !== undefined &&
            (obj.permissionUpdateType = permissionUpdateTypeToJSON(message.permissionUpdateType));
        message.permissionPolicyOption !== undefined &&
            (obj.permissionPolicyOption = permissionPolicyOptionToJSON(message.permissionPolicyOption));
        message.metadataFieldName !== undefined &&
            (obj.metadataFieldName = message.metadataFieldName);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseUpdatePermissionData_V1();
        message.permissionUpdateType = (_a = object.permissionUpdateType) !== null && _a !== void 0 ? _a : 0;
        message.permissionPolicyOption = (_b = object.permissionPolicyOption) !== null && _b !== void 0 ? _b : 0;
        message.metadataFieldName = (_c = object.metadataFieldName) !== null && _c !== void 0 ? _c : undefined;
        return message;
    },
};
function createBasePostCommitAction() {
    return { sendWelcomes: undefined };
}
export const PostCommitAction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sendWelcomes !== undefined) {
            PostCommitAction_SendWelcomes.encode(message.sendWelcomes, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePostCommitAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sendWelcomes = PostCommitAction_SendWelcomes.decode(reader, reader.uint32());
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
            sendWelcomes: isSet(object.sendWelcomes)
                ? PostCommitAction_SendWelcomes.fromJSON(object.sendWelcomes)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sendWelcomes !== undefined &&
            (obj.sendWelcomes = message.sendWelcomes
                ? PostCommitAction_SendWelcomes.toJSON(message.sendWelcomes)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePostCommitAction();
        message.sendWelcomes =
            object.sendWelcomes !== undefined && object.sendWelcomes !== null
                ? PostCommitAction_SendWelcomes.fromPartial(object.sendWelcomes)
                : undefined;
        return message;
    },
};
function createBasePostCommitAction_Installation() {
    return { installationKey: new Uint8Array(), hpkePublicKey: new Uint8Array() };
}
export const PostCommitAction_Installation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.installationKey.length !== 0) {
            writer.uint32(10).bytes(message.installationKey);
        }
        if (message.hpkePublicKey.length !== 0) {
            writer.uint32(18).bytes(message.hpkePublicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePostCommitAction_Installation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationKey = reader.bytes();
                    break;
                case 2:
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
        message.hpkePublicKey !== undefined &&
            (obj.hpkePublicKey = base64FromBytes(message.hpkePublicKey !== undefined
                ? message.hpkePublicKey
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePostCommitAction_Installation();
        message.installationKey = (_a = object.installationKey) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.hpkePublicKey = (_b = object.hpkePublicKey) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBasePostCommitAction_SendWelcomes() {
    return { installations: [], welcomeMessage: new Uint8Array() };
}
export const PostCommitAction_SendWelcomes = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.installations) {
            PostCommitAction_Installation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.welcomeMessage.length !== 0) {
            writer.uint32(18).bytes(message.welcomeMessage);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePostCommitAction_SendWelcomes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installations.push(PostCommitAction_Installation.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.welcomeMessage = reader.bytes();
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
            installations: Array.isArray(object === null || object === void 0 ? void 0 : object.installations)
                ? object.installations.map((e) => PostCommitAction_Installation.fromJSON(e))
                : [],
            welcomeMessage: isSet(object.welcomeMessage)
                ? bytesFromBase64(object.welcomeMessage)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.installations) {
            obj.installations = message.installations.map((e) => e ? PostCommitAction_Installation.toJSON(e) : undefined);
        }
        else {
            obj.installations = [];
        }
        message.welcomeMessage !== undefined &&
            (obj.welcomeMessage = base64FromBytes(message.welcomeMessage !== undefined
                ? message.welcomeMessage
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePostCommitAction_SendWelcomes();
        message.installations =
            ((_a = object.installations) === null || _a === void 0 ? void 0 : _a.map((e) => PostCommitAction_Installation.fromPartial(e))) || [];
        message.welcomeMessage = (_b = object.welcomeMessage) !== null && _b !== void 0 ? _b : new Uint8Array();
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
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=intents.pb.js.map