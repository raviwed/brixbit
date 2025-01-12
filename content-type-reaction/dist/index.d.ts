import { ContentTypeId, ContentCodec, EncodedContent } from '@brixbit/brixbit-js';

declare const ContentTypeReaction: ContentTypeId;
type Reaction = {
    /**
     * The message ID for the message that is being reacted to
     */
    reference: string;
    /**
     * The action of the reaction
     */
    action: "added" | "removed";
    /**
     * The content of the reaction
     */
    content: string;
    /**
     * The schema of the content to provide guidance on how to display it
     */
    schema: "unicode" | "shortcode" | "custom";
};
declare class ReactionCodec implements ContentCodec<Reaction> {
    get contentType(): ContentTypeId;
    encode(reaction: Reaction): EncodedContent;
    decode(encodedContent: EncodedContent): Reaction;
    fallback(content: Reaction): string | undefined;
}

export { ContentTypeReaction, type Reaction, ReactionCodec };
