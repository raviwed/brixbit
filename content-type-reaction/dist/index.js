import { ContentTypeId } from '@brixbit/brixbit-js';

const ContentTypeReaction = new ContentTypeId({
    authorityId: "brixbit.org",
    typeId: "reaction",
    versionMajor: 1,
    versionMinor: 0,
});
class ReactionCodec {
    get contentType() {
        return ContentTypeReaction;
    }
    encode(reaction) {
        const { action, reference, schema, content } = reaction;
        return {
            type: ContentTypeReaction,
            parameters: {},
            content: new TextEncoder().encode(JSON.stringify({ action, reference, schema, content })),
        };
    }
    decode(encodedContent) {
        const decodedContent = new TextDecoder().decode(encodedContent.content);
        // First try to decode it in the canonical form.
        try {
            const reaction = JSON.parse(decodedContent);
            const { action, reference, schema, content } = reaction;
            return { action, reference, schema, content };
        }
        catch (e) {
            // ignore, fall through to legacy decoding
        }
        // If that fails, try to decode it in the legacy form.
        const parameters = encodedContent.parameters;
        return {
            action: parameters.action,
            reference: parameters.reference,
            schema: parameters.schema,
            content: decodedContent,
        };
    }
    fallback(content) {
        switch (content.action) {
            case "added":
                return `Reacted “${content.content}” to an earlier message`;
            case "removed":
                return `Removed “${content.content}” from an earlier message`;
            default:
                return undefined;
        }
    }
}

export { ContentTypeReaction, ReactionCodec };
//# sourceMappingURL=index.js.map
