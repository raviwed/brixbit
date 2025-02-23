/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.mls.message_contents";
function createBaseGroupMembership() {
    return { members: {} };
}
export const GroupMembership = {
    encode(message, writer = _m0.Writer.create()) {
        Object.entries(message.members).forEach(([key, value]) => {
            GroupMembership_MembersEntry.encode({ key: key, value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMembership();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    const entry1 = GroupMembership_MembersEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.members[entry1.key] = entry1.value;
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
            members: isObject(object.members)
                ? Object.entries(object.members).reduce((acc, [key, value]) => {
                    acc[key] = Long.fromValue(value);
                    return acc;
                }, {})
                : {},
        };
    },
    toJSON(message) {
        const obj = {};
        obj.members = {};
        if (message.members) {
            Object.entries(message.members).forEach(([k, v]) => {
                obj.members[k] = v.toString();
            });
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGroupMembership();
        message.members = Object.entries((_a = object.members) !== null && _a !== void 0 ? _a : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = Long.fromValue(value);
            }
            return acc;
        }, {});
        return message;
    },
};
function createBaseGroupMembership_MembersEntry() {
    return { key: "", value: Long.UZERO };
}
export const GroupMembership_MembersEntry = {
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
        const message = createBaseGroupMembership_MembersEntry();
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
        const message = createBaseGroupMembership_MembersEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value =
            object.value !== undefined && object.value !== null
                ? Long.fromValue(object.value)
                : Long.UZERO;
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
//# sourceMappingURL=group_membership.pb.js.map