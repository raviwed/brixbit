import { ContentTypeId } from '@brixbit/brixbit-js';
import { content } from '@brixbit/proto';

const ContentTypeReply = new ContentTypeId({
    authorityId: "brixbit.org",
    typeId: "reply",
    versionMajor: 1,
    versionMinor: 0,
});
class ReplyCodec {
    get contentType() {
        return ContentTypeReply;
    }
    encode(content$1, codecs) {
        const codec = codecs.codecFor(content$1.contentType);
        if (!codec) {
            throw new Error(`missing codec for content type "${content$1.contentType.toString()}"`);
        }
        const encodedContent = codec.encode(content$1.content, codecs);
        const bytes = content.EncodedContent.encode(encodedContent).finish();
        return {
            type: ContentTypeReply,
            parameters: {
                // TODO: cut when we're certain no one is looking for "contentType" here.
                contentType: content$1.contentType.toString(),
                reference: content$1.reference,
            },
            content: bytes,
        };
    }
    decode(content$1, codecs) {
        const decodedContent = content.EncodedContent.decode(content$1.content);
        if (!decodedContent.type) {
            throw new Error("missing content type");
        }
        const contentType = new ContentTypeId(decodedContent.type);
        const codec = codecs.codecFor(contentType);
        if (!codec) {
            throw new Error(`missing codec for content type "${contentType.toString()}"`);
        }
        return {
            reference: content$1.parameters.reference,
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

export { ContentTypeReply, ReplyCodec };
//# sourceMappingURL=index.js.map
