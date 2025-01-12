import { ContentTypeId, ContentCodec, CodecRegistry, EncodedContent } from '@brixbit/brixbit-js';

declare const ContentTypeReply: ContentTypeId;
type Reply = {
    /**
     * The message ID for the message that is being replied to
     */
    reference: string;
    /**
     * The content of the reply
     */
    content: any;
    /**
     * The content type of the reply
     */
    contentType: ContentTypeId;
};
declare class ReplyCodec implements ContentCodec<Reply> {
    get contentType(): ContentTypeId;
    encode(content: Reply, codecs: CodecRegistry): EncodedContent;
    decode(content: EncodedContent, codecs: CodecRegistry): Reply;
    fallback(content: Reply): string | undefined;
}

export { ContentTypeReply, type Reply, ReplyCodec };
