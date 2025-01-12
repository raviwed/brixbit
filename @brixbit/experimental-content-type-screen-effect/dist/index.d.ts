import { ContentTypeId, ContentCodec, EncodedContent } from '@brixbit/brixbit-js';

type EffectType = "SNOW" | "RAIN";
declare const ContentTypeScreenEffect: ContentTypeId;
type ScreenEffect = {
    messageId: string;
    effectType: EffectType;
};
type ScreenEffectParameters = Pick<ScreenEffect, "messageId" | "effectType">;
declare class ScreenEffectCodec implements ContentCodec<ScreenEffect | undefined> {
    get contentType(): ContentTypeId;
    encode(content: ScreenEffect): EncodedContent<ScreenEffectParameters>;
    decode(content: EncodedContent<ScreenEffectParameters>): ScreenEffect | undefined;
    fallback(): undefined;
}

export { ContentTypeScreenEffect, EffectType, ScreenEffect, ScreenEffectCodec };
