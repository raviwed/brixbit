'use strict';

var brixbitJs = require('@brixbit/brixbit-js');

// src/ScreenEffect.ts
var ContentTypeScreenEffect = new brixbitJs.ContentTypeId({
  authorityId: "experimental.brixbit.org",
  typeId: "screenEffect",
  versionMajor: 1,
  versionMinor: 0
});
var ScreenEffectCodec = class {
  get contentType() {
    return ContentTypeScreenEffect;
  }
  encode(content) {
    return {
      type: ContentTypeScreenEffect,
      parameters: {
        messageId: content.messageId,
        effectType: content.effectType
      },
      content: new Uint8Array()
    };
  }
  decode(content) {
    const { messageId, effectType } = content.parameters;
    return {
      messageId,
      effectType
    };
  }
  fallback() {
    return void 0;
  }
};

exports.ContentTypeScreenEffect = ContentTypeScreenEffect;
exports.ScreenEffectCodec = ScreenEffectCodec;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map