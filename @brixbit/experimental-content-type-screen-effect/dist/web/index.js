import { ContentTypeId } from '@brixbit/brixbit-js';

var t=new ContentTypeId({authorityId:"experimental.brixbit.org",typeId:"screenEffect",versionMajor:1,versionMinor:0}),n=class{get contentType(){return t}encode(e){return {type:t,parameters:{messageId:e.messageId,effectType:e.effectType},content:new Uint8Array}}decode(e){let{messageId:r,effectType:f}=e.parameters;return {messageId:r,effectType:f}}fallback(){}};

export { t as ContentTypeScreenEffect, n as ScreenEffectCodec };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map