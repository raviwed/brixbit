"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactBundle = exports.ContactBundleV2 = exports.ContactBundleV1 = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const public_key_pb_1 = require("./public_key.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBaseContactBundleV1() {
    return { keyBundle: undefined };
}
exports.ContactBundleV1 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyBundle !== undefined) {
            public_key_pb_1.PublicKeyBundle.encode(message.keyBundle, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContactBundleV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyBundle = public_key_pb_1.PublicKeyBundle.decode(reader, reader.uint32());
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
                ? public_key_pb_1.PublicKeyBundle.fromJSON(object.keyBundle)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyBundle !== undefined &&
            (obj.keyBundle = message.keyBundle
                ? public_key_pb_1.PublicKeyBundle.toJSON(message.keyBundle)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseContactBundleV1();
        message.keyBundle =
            object.keyBundle !== undefined && object.keyBundle !== null
                ? public_key_pb_1.PublicKeyBundle.fromPartial(object.keyBundle)
                : undefined;
        return message;
    },
};
function createBaseContactBundleV2() {
    return { keyBundle: undefined };
}
exports.ContactBundleV2 = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.keyBundle !== undefined) {
            public_key_pb_1.SignedPublicKeyBundle.encode(message.keyBundle, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContactBundleV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyBundle = public_key_pb_1.SignedPublicKeyBundle.decode(reader, reader.uint32());
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
                ? public_key_pb_1.SignedPublicKeyBundle.fromJSON(object.keyBundle)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.keyBundle !== undefined &&
            (obj.keyBundle = message.keyBundle
                ? public_key_pb_1.SignedPublicKeyBundle.toJSON(message.keyBundle)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseContactBundleV2();
        message.keyBundle =
            object.keyBundle !== undefined && object.keyBundle !== null
                ? public_key_pb_1.SignedPublicKeyBundle.fromPartial(object.keyBundle)
                : undefined;
        return message;
    },
};
function createBaseContactBundle() {
    return { v1: undefined, v2: undefined };
}
exports.ContactBundle = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.v1 !== undefined) {
            exports.ContactBundleV1.encode(message.v1, writer.uint32(10).fork()).ldelim();
        }
        if (message.v2 !== undefined) {
            exports.ContactBundleV2.encode(message.v2, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContactBundle();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.v1 = exports.ContactBundleV1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.v2 = exports.ContactBundleV2.decode(reader, reader.uint32());
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
            v1: isSet(object.v1) ? exports.ContactBundleV1.fromJSON(object.v1) : undefined,
            v2: isSet(object.v2) ? exports.ContactBundleV2.fromJSON(object.v2) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.v1 !== undefined &&
            (obj.v1 = message.v1 ? exports.ContactBundleV1.toJSON(message.v1) : undefined);
        message.v2 !== undefined &&
            (obj.v2 = message.v2 ? exports.ContactBundleV2.toJSON(message.v2) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseContactBundle();
        message.v1 =
            object.v1 !== undefined && object.v1 !== null
                ? exports.ContactBundleV1.fromPartial(object.v1)
                : undefined;
        message.v2 =
            object.v2 !== undefined && object.v2 !== null
                ? exports.ContactBundleV2.fromPartial(object.v2)
                : undefined;
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=contact.pb.js.map