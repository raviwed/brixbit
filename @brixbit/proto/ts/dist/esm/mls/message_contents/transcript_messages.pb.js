/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.message_contents";
function createBaseMembershipChange() {
    return {
        installationIds: [],
        accountAddress: "",
        initiatedByAccountAddress: "",
    };
}
export const MembershipChange = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.installationIds) {
            writer.uint32(10).bytes(v);
        }
        if (message.accountAddress !== "") {
            writer.uint32(18).string(message.accountAddress);
        }
        if (message.initiatedByAccountAddress !== "") {
            writer.uint32(26).string(message.initiatedByAccountAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMembershipChange();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.installationIds.push(reader.bytes());
                    break;
                case 2:
                    message.accountAddress = reader.string();
                    break;
                case 3:
                    message.initiatedByAccountAddress = reader.string();
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
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            initiatedByAccountAddress: isSet(object.initiatedByAccountAddress)
                ? String(object.initiatedByAccountAddress)
                : "",
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
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.initiatedByAccountAddress !== undefined &&
            (obj.initiatedByAccountAddress = message.initiatedByAccountAddress);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMembershipChange();
        message.installationIds = ((_a = object.installationIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        message.accountAddress = (_b = object.accountAddress) !== null && _b !== void 0 ? _b : "";
        message.initiatedByAccountAddress = (_c = object.initiatedByAccountAddress) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseGroupMembershipChanges() {
    return {
        membersAdded: [],
        membersRemoved: [],
        installationsAdded: [],
        installationsRemoved: [],
    };
}
export const GroupMembershipChanges = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.membersAdded) {
            MembershipChange.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.membersRemoved) {
            MembershipChange.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.installationsAdded) {
            MembershipChange.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.installationsRemoved) {
            MembershipChange.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMembershipChanges();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.membersAdded.push(MembershipChange.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.membersRemoved.push(MembershipChange.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.installationsAdded.push(MembershipChange.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.installationsRemoved.push(MembershipChange.decode(reader, reader.uint32()));
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
            membersAdded: Array.isArray(object === null || object === void 0 ? void 0 : object.membersAdded)
                ? object.membersAdded.map((e) => MembershipChange.fromJSON(e))
                : [],
            membersRemoved: Array.isArray(object === null || object === void 0 ? void 0 : object.membersRemoved)
                ? object.membersRemoved.map((e) => MembershipChange.fromJSON(e))
                : [],
            installationsAdded: Array.isArray(object === null || object === void 0 ? void 0 : object.installationsAdded)
                ? object.installationsAdded.map((e) => MembershipChange.fromJSON(e))
                : [],
            installationsRemoved: Array.isArray(object === null || object === void 0 ? void 0 : object.installationsRemoved)
                ? object.installationsRemoved.map((e) => MembershipChange.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.membersAdded) {
            obj.membersAdded = message.membersAdded.map((e) => e ? MembershipChange.toJSON(e) : undefined);
        }
        else {
            obj.membersAdded = [];
        }
        if (message.membersRemoved) {
            obj.membersRemoved = message.membersRemoved.map((e) => e ? MembershipChange.toJSON(e) : undefined);
        }
        else {
            obj.membersRemoved = [];
        }
        if (message.installationsAdded) {
            obj.installationsAdded = message.installationsAdded.map((e) => e ? MembershipChange.toJSON(e) : undefined);
        }
        else {
            obj.installationsAdded = [];
        }
        if (message.installationsRemoved) {
            obj.installationsRemoved = message.installationsRemoved.map((e) => e ? MembershipChange.toJSON(e) : undefined);
        }
        else {
            obj.installationsRemoved = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseGroupMembershipChanges();
        message.membersAdded =
            ((_a = object.membersAdded) === null || _a === void 0 ? void 0 : _a.map((e) => MembershipChange.fromPartial(e))) || [];
        message.membersRemoved =
            ((_b = object.membersRemoved) === null || _b === void 0 ? void 0 : _b.map((e) => MembershipChange.fromPartial(e))) || [];
        message.installationsAdded =
            ((_c = object.installationsAdded) === null || _c === void 0 ? void 0 : _c.map((e) => MembershipChange.fromPartial(e))) ||
                [];
        message.installationsRemoved =
            ((_d = object.installationsRemoved) === null || _d === void 0 ? void 0 : _d.map((e) => MembershipChange.fromPartial(e))) || [];
        return message;
    },
};
function createBaseGroupUpdated() {
    return {
        initiatedByInboxId: "",
        addedInboxes: [],
        removedInboxes: [],
        metadataFieldChanges: [],
    };
}
export const GroupUpdated = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.initiatedByInboxId !== "") {
            writer.uint32(10).string(message.initiatedByInboxId);
        }
        for (const v of message.addedInboxes) {
            GroupUpdated_Inbox.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.removedInboxes) {
            GroupUpdated_Inbox.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.metadataFieldChanges) {
            GroupUpdated_MetadataFieldChange.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupUpdated();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.initiatedByInboxId = reader.string();
                    break;
                case 2:
                    message.addedInboxes.push(GroupUpdated_Inbox.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.removedInboxes.push(GroupUpdated_Inbox.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.metadataFieldChanges.push(GroupUpdated_MetadataFieldChange.decode(reader, reader.uint32()));
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
            initiatedByInboxId: isSet(object.initiatedByInboxId)
                ? String(object.initiatedByInboxId)
                : "",
            addedInboxes: Array.isArray(object === null || object === void 0 ? void 0 : object.addedInboxes)
                ? object.addedInboxes.map((e) => GroupUpdated_Inbox.fromJSON(e))
                : [],
            removedInboxes: Array.isArray(object === null || object === void 0 ? void 0 : object.removedInboxes)
                ? object.removedInboxes.map((e) => GroupUpdated_Inbox.fromJSON(e))
                : [],
            metadataFieldChanges: Array.isArray(object === null || object === void 0 ? void 0 : object.metadataFieldChanges)
                ? object.metadataFieldChanges.map((e) => GroupUpdated_MetadataFieldChange.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.initiatedByInboxId !== undefined &&
            (obj.initiatedByInboxId = message.initiatedByInboxId);
        if (message.addedInboxes) {
            obj.addedInboxes = message.addedInboxes.map((e) => e ? GroupUpdated_Inbox.toJSON(e) : undefined);
        }
        else {
            obj.addedInboxes = [];
        }
        if (message.removedInboxes) {
            obj.removedInboxes = message.removedInboxes.map((e) => e ? GroupUpdated_Inbox.toJSON(e) : undefined);
        }
        else {
            obj.removedInboxes = [];
        }
        if (message.metadataFieldChanges) {
            obj.metadataFieldChanges = message.metadataFieldChanges.map((e) => e ? GroupUpdated_MetadataFieldChange.toJSON(e) : undefined);
        }
        else {
            obj.metadataFieldChanges = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseGroupUpdated();
        message.initiatedByInboxId = (_a = object.initiatedByInboxId) !== null && _a !== void 0 ? _a : "";
        message.addedInboxes =
            ((_b = object.addedInboxes) === null || _b === void 0 ? void 0 : _b.map((e) => GroupUpdated_Inbox.fromPartial(e))) || [];
        message.removedInboxes =
            ((_c = object.removedInboxes) === null || _c === void 0 ? void 0 : _c.map((e) => GroupUpdated_Inbox.fromPartial(e))) ||
                [];
        message.metadataFieldChanges =
            ((_d = object.metadataFieldChanges) === null || _d === void 0 ? void 0 : _d.map((e) => GroupUpdated_MetadataFieldChange.fromPartial(e))) || [];
        return message;
    },
};
function createBaseGroupUpdated_Inbox() {
    return { inboxId: "" };
}
export const GroupUpdated_Inbox = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.inboxId !== "") {
            writer.uint32(10).string(message.inboxId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupUpdated_Inbox();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
            inboxId: isSet(object.inboxId) ? String(object.inboxId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.inboxId !== undefined && (obj.inboxId = message.inboxId);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGroupUpdated_Inbox();
        message.inboxId = (_a = object.inboxId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseGroupUpdated_MetadataFieldChange() {
    return { fieldName: "", oldValue: undefined, newValue: undefined };
}
export const GroupUpdated_MetadataFieldChange = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fieldName !== "") {
            writer.uint32(10).string(message.fieldName);
        }
        if (message.oldValue !== undefined) {
            writer.uint32(18).string(message.oldValue);
        }
        if (message.newValue !== undefined) {
            writer.uint32(26).string(message.newValue);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupUpdated_MetadataFieldChange();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fieldName = reader.string();
                    break;
                case 2:
                    message.oldValue = reader.string();
                    break;
                case 3:
                    message.newValue = reader.string();
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
            oldValue: isSet(object.oldValue) ? String(object.oldValue) : undefined,
            newValue: isSet(object.newValue) ? String(object.newValue) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.fieldName !== undefined && (obj.fieldName = message.fieldName);
        message.oldValue !== undefined && (obj.oldValue = message.oldValue);
        message.newValue !== undefined && (obj.newValue = message.newValue);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseGroupUpdated_MetadataFieldChange();
        message.fieldName = (_a = object.fieldName) !== null && _a !== void 0 ? _a : "";
        message.oldValue = (_b = object.oldValue) !== null && _b !== void 0 ? _b : undefined;
        message.newValue = (_c = object.newValue) !== null && _c !== void 0 ? _c : undefined;
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
//# sourceMappingURL=transcript_messages.pb.js.map