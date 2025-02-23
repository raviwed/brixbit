"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composite_Part = exports.Composite = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const content_pb_1 = require("./content.pb");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "brixbit.message_contents";
function createBaseComposite() {
    return { parts: [] };
}
exports.Composite = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.parts) {
            exports.Composite_Part.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseComposite();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.parts.push(exports.Composite_Part.decode(reader, reader.uint32()));
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
            parts: Array.isArray(object === null || object === void 0 ? void 0 : object.parts)
                ? object.parts.map((e) => exports.Composite_Part.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.parts) {
            obj.parts = message.parts.map((e) => e ? exports.Composite_Part.toJSON(e) : undefined);
        }
        else {
            obj.parts = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseComposite();
        message.parts =
            ((_a = object.parts) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Composite_Part.fromPartial(e))) || [];
        return message;
    },
};
function createBaseComposite_Part() {
    return { part: undefined, composite: undefined };
}
exports.Composite_Part = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.part !== undefined) {
            content_pb_1.EncodedContent.encode(message.part, writer.uint32(10).fork()).ldelim();
        }
        if (message.composite !== undefined) {
            exports.Composite.encode(message.composite, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseComposite_Part();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.part = content_pb_1.EncodedContent.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.composite = exports.Composite.decode(reader, reader.uint32());
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
            part: isSet(object.part)
                ? content_pb_1.EncodedContent.fromJSON(object.part)
                : undefined,
            composite: isSet(object.composite)
                ? exports.Composite.fromJSON(object.composite)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.part !== undefined &&
            (obj.part = message.part
                ? content_pb_1.EncodedContent.toJSON(message.part)
                : undefined);
        message.composite !== undefined &&
            (obj.composite = message.composite
                ? exports.Composite.toJSON(message.composite)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseComposite_Part();
        message.part =
            object.part !== undefined && object.part !== null
                ? content_pb_1.EncodedContent.fromPartial(object.part)
                : undefined;
        message.composite =
            object.composite !== undefined && object.composite !== null
                ? exports.Composite.fromPartial(object.composite)
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
//# sourceMappingURL=composite.pb.js.map