'use strict';

var brixbitJs = require('@brixbit/brixbit-js');
var proto = require('@brixbit/proto');

const ContentTypeReply = new brixbitJs.ContentTypeId({
    authorityId: "brixbit.org",
    typeId: "reply",
    versionMajor: 1,
    versionMinor: 0,
});
class ReplyCodec {
    get contentType() {
        return ContentTypeReply;
    }
    encode(content, codecs) {
        const codec = codecs.codecFor(content.contentType);
        if (!codec) {
            throw new Error(`missing codec for content type "${content.contentType.toString()}"`);
        }
        const encodedContent = codec.encode(content.content, codecs);
        const bytes = proto.content.EncodedContent.encode(encodedContent).finish();
        return {
            type: ContentTypeReply,
            parameters: {
                // TODO: cut when we're certain no one is looking for "contentType" here.
                contentType: content.contentType.toString(),
                reference: content.reference,
            },
            content: bytes,
        };
    }
    decode(content, codecs) {
        const decodedContent = proto.content.EncodedContent.decode(content.content);
        if (!decodedContent.type) {
            throw new Error("missing content type");
        }
        const contentType = new brixbitJs.ContentTypeId(decodedContent.type);
        const codec = codecs.codecFor(contentType);
        if (!codec) {
            throw new Error(`missing codec for content type "${contentType.toString()}"`);
        }
        return {
            reference: content.parameters.reference,
            contentType,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            content: codec.decode(decodedContent, codecs),
        };
    }
    fallback(content) {
        if (typeof content.content === "string") {
            return `Replied with “${content.content}” to an earlier message`;
        }
        return "Replied to an earlier message";
    }
}

exports.ContentTypeReply = ContentTypeReply;
exports.ReplyCodec = ReplyCodec;
//# sourceMappingURL=index.cjs.map
