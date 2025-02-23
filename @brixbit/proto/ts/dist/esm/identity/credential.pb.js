/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.identity";
function createBaseMlsCredential() {
    return { inboxId: "" };
}
export const MlsCredential = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.inboxId !== "") {
            writer.uint32(10).string(message.inboxId);
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
        const message = createBaseMlsCredential();
        message.inboxId = (_a = object.inboxId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=credential.pb.js.map