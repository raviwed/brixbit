/* eslint-disable */
import Long from "long";
import { EncodedContent } from "./content.pb";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "brixbit.message_contents";
function createBaseComposite() {
    return { parts: [] };
}
export const Composite = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.parts) {
            Composite_Part.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseComposite();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.parts.push(Composite_Part.decode(reader, reader.uint32()));
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
                ? object.parts.map((e) => Composite_Part.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.parts) {
            obj.parts = message.parts.map((e) => e ? Composite_Part.toJSON(e) : undefined);
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
            ((_a = object.parts) === null || _a === void 0 ? void 0 : _a.map((e) => Composite_Part.fromPartial(e))) || [];
        return message;
    },
};
function createBaseComposite_Part() {
    return { part: undefined, composite: undefined };
}
export const Composite_Part = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.part !== undefined) {
            EncodedContent.encode(message.part, writer.uint32(10).fork()).ldelim();
        }
        if (message.composite !== undefined) {
            Composite.encode(message.composite, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseComposite_Part();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.part = EncodedContent.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.composite = Composite.decode(reader, reader.uint32());
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
                ? EncodedContent.fromJSON(object.part)
                : undefined,
            composite: isSet(object.composite)
                ? Composite.fromJSON(object.composite)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.part !== undefined &&
            (obj.part = message.part
                ? EncodedContent.toJSON(message.part)
                : undefined);
        message.composite !== undefined &&
            (obj.composite = message.composite
                ? Composite.toJSON(message.composite)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseComposite_Part();
        message.part =
            object.part !== undefined && object.part !== null
                ? EncodedContent.fromPartial(object.part)
                : undefined;
        message.composite =
            object.composite !== undefined && object.composite !== null
                ? Composite.fromPartial(object.composite)
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
//# sourceMappingURL=composite.pb.js.map