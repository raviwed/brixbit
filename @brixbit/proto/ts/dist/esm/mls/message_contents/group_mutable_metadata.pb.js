/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.message_contents";
function createBaseGroupMutableMetadataV1() {
    return { attributes: {}, adminList: undefined, superAdminList: undefined };
}
export const GroupMutableMetadataV1 = {
    encode(message, writer = _m0.Writer.create()) {
        Object.entries(message.attributes).forEach(([key, value]) => {
            GroupMutableMetadataV1_AttributesEntry.encode({ key: key, value }, writer.uint32(10).fork()).ldelim();
        });
        if (message.adminList !== undefined) {
            Inboxes.encode(message.adminList, writer.uint32(18).fork()).ldelim();
        }
        if (message.superAdminList !== undefined) {
            Inboxes.encode(message.superAdminList, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMutableMetadataV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    const entry1 = GroupMutableMetadataV1_AttributesEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.attributes[entry1.key] = entry1.value;
                    }
                    break;
                case 2:
                    message.adminList = Inboxes.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.superAdminList = Inboxes.decode(reader, reader.uint32());
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
            attributes: isObject(object.attributes)
                ? Object.entries(object.attributes).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {})
                : {},
            adminList: isSet(object.adminList)
                ? Inboxes.fromJSON(object.adminList)
                : undefined,
            superAdminList: isSet(object.superAdminList)
                ? Inboxes.fromJSON(object.superAdminList)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        obj.attributes = {};
        if (message.attributes) {
            Object.entries(message.attributes).forEach(([k, v]) => {
                obj.attributes[k] = v;
            });
        }
        message.adminList !== undefined &&
            (obj.adminList = message.adminList
                ? Inboxes.toJSON(message.adminList)
                : undefined);
        message.superAdminList !== undefined &&
            (obj.superAdminList = message.superAdminList
                ? Inboxes.toJSON(message.superAdminList)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGroupMutableMetadataV1();
        message.attributes = Object.entries((_a = object.attributes) !== null && _a !== void 0 ? _a : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = String(value);
            }
            return acc;
        }, {});
        message.adminList =
            object.adminList !== undefined && object.adminList !== null
                ? Inboxes.fromPartial(object.adminList)
                : undefined;
        message.superAdminList =
            object.superAdminList !== undefined && object.superAdminList !== null
                ? Inboxes.fromPartial(object.superAdminList)
                : undefined;
        return message;
    },
};
function createBaseGroupMutableMetadataV1_AttributesEntry() {
    return { key: "", value: "" };
}
export const GroupMutableMetadataV1_AttributesEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMutableMetadataV1_AttributesEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
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
            value: isSet(object.value) ? String(object.value) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGroupMutableMetadataV1_AttributesEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseInboxes() {
    return { inboxIds: [] };
}
export const Inboxes = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.inboxIds) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInboxes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inboxIds.push(reader.string());
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
            inboxIds: Array.isArray(object === null || object === void 0 ? void 0 : object.inboxIds)
                ? object.inboxIds.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.inboxIds) {
            obj.inboxIds = message.inboxIds.map((e) => e);
        }
        else {
            obj.inboxIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseInboxes();
        message.inboxIds = ((_a = object.inboxIds) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
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
//# sourceMappingURL=group_mutable_metadata.pb.js.map