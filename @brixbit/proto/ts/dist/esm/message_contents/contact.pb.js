/* eslint-disable */
import Long from "long";
import { PublicKeyBundle, SignedPublicKeyBundle } from "./public_key.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseContactBundleV1() {
    return { keyBundle: undefined };
}
export const ContactBundleV1 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyBundle !== undefined) {
            PublicKeyBundle.encode(message.keyBundle, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContactBundleV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyBundle = PublicKeyBundle.decode(reader, reader.uint32());
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
            keyBundle: isSet(object.keyBundle)
                ? PublicKeyBundle.fromJSON(object.keyBundle)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyBundle !== undefined &&
            (obj.keyBundle = message.keyBundle
                ? PublicKeyBundle.toJSON(message.keyBundle)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseContactBundleV1();
        message.keyBundle =
            object.keyBundle !== undefined && object.keyBundle !== null
                ? PublicKeyBundle.fromPartial(object.keyBundle)
                : undefined;
        return message;
    },
};
function createBaseContactBundleV2() {
    return { keyBundle: undefined };
}
export const ContactBundleV2 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyBundle !== undefined) {
            SignedPublicKeyBundle.encode(message.keyBundle, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContactBundleV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyBundle = SignedPublicKeyBundle.decode(reader, reader.uint32());
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
            keyBundle: isSet(object.keyBundle)
                ? SignedPublicKeyBundle.fromJSON(object.keyBundle)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyBundle !== undefined &&
            (obj.keyBundle = message.keyBundle
                ? SignedPublicKeyBundle.toJSON(message.keyBundle)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseContactBundleV2();
        message.keyBundle =
            object.keyBundle !== undefined && object.keyBundle !== null
                ? SignedPublicKeyBundle.fromPartial(object.keyBundle)
                : undefined;
        return message;
    },
};
function createBaseContactBundle() {
    return { v1: undefined, v2: undefined };
}
export const ContactBundle = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.v1 !== undefined) {
            ContactBundleV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        if (message.v2 !== undefined) {
            ContactBundleV2.encode(message.v2, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContactBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = ContactBundleV1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.v2 = ContactBundleV2.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? ContactBundleV1.fromJSON(object.v1) : undefined,
            v2: isSet(object.v2) ? ContactBundleV2.fromJSON(object.v2) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? ContactBundleV1.toJSON(message.v1) : undefined);
        message.v2 !== undefined &&
            (obj.v2 = message.v2 ? ContactBundleV2.toJSON(message.v2) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseContactBundle();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? ContactBundleV1.fromPartial(object.v1)
                : undefined;
        message.v2 =
            object.v2 !== undefined && object.v2 !== null
                ? ContactBundleV2.fromPartial(object.v2)
                : undefined;
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
//# sourceMappingURL=contact.pb.js.map