'use strict';

var brixbitJs = require('@brixbit/brixbit-js');
var secp = require('@noble/secp256k1');
var proto = require('@brixbit/proto');
var node_crypto = require('node:crypto');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var secp__namespace = /*#__PURE__*/_interopNamespaceDefault(secp);

const ContentTypeAttachment = new brixbitJs.ContentTypeId({
    authorityId: "brixbit.org",
    typeId: "attachment",
    versionMajor: 1,
    versionMinor: 0,
});
class AttachmentCodec {
    get contentType() {
        return ContentTypeAttachment;
    }
    encode(content) {
        return {
            type: ContentTypeAttachment,
            parameters: {
                filename: content.filename,
                mimeType: content.mimeType,
            },
            content: content.data,
        };
    }
    decode(content) {
        return {
            filename: content.parameters.filename,
            mimeType: content.parameters.mimeType,
            data: content.content,
        };
    }
    fallback(content) {
        return `Can’t display "${content.filename}". This app doesn’t support attachments.`;
    }
}

const crypto = node_crypto.webcrypto;

const ContentTypeRemoteAttachment = new brixbitJs.ContentTypeId({
    authorityId: "brixbit.org",
    typeId: "remoteStaticAttachment",
    versionMajor: 1,
    versionMinor: 0,
});
class RemoteAttachmentCodec {
    static async load(remoteAttachment, codecRegistry) {
        const response = await fetch(remoteAttachment.url);
        const payload = new Uint8Array(await response.arrayBuffer());
        if (!payload) {
            throw new Error(`no payload for remote attachment at ${remoteAttachment.url}`);
        }
        const digestBytes = new Uint8Array(await crypto.subtle.digest("SHA-256", payload));
        const digest = secp__namespace.utils.bytesToHex(digestBytes);
        if (digest !== remoteAttachment.contentDigest) {
            throw new Error("content digest does not match");
        }
        const ciphertext = new brixbitJs.Ciphertext({
            aes256GcmHkdfSha256: {
                hkdfSalt: remoteAttachment.salt,
                gcmNonce: remoteAttachment.nonce,
                payload,
            },
        });
        const encodedContentData = await brixbitJs.decrypt(ciphertext, remoteAttachment.secret);
        const encodedContent = proto.content.EncodedContent.decode(encodedContentData);
        if (!encodedContent || !encodedContent.type) {
            throw new Error("no encoded content");
        }
        const contentType = encodedContent.type;
        if (!contentType) {
            throw new Error("no content type");
        }
        const codec = codecRegistry.codecFor(new brixbitJs.ContentTypeId(contentType));
        if (!codec) {
            throw new Error(`no codec found for ${encodedContent.type?.typeId}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return codec.decode(encodedContent, codecRegistry);
    }
    static async encodeEncrypted(content, codec) {
        const secret = crypto.getRandomValues(new Uint8Array(32));
        const encodedContent = proto.content.EncodedContent.encode(codec.encode(content, {
            codecFor() {
                return undefined;
            },
        })).finish();
        const ciphertext = await brixbitJs.encrypt(encodedContent, secret);
        const salt = ciphertext.aes256GcmHkdfSha256?.hkdfSalt;
        const nonce = ciphertext.aes256GcmHkdfSha256?.gcmNonce;
        const payload = ciphertext.aes256GcmHkdfSha256?.payload;
        if (!salt || !nonce || !payload) {
            throw new Error("missing encryption key");
        }
        const digestBytes = new Uint8Array(await crypto.subtle.digest("SHA-256", payload));
        const digest = secp__namespace.utils.bytesToHex(digestBytes);
        return {
            digest,
            secret,
            salt,
            nonce,
            payload,
        };
    }
    get contentType() {
        return ContentTypeRemoteAttachment;
    }
    encode(content) {
        if (!content.url.startsWith("https")) {
            throw new Error("scheme must be https");
        }
        return {
            type: ContentTypeRemoteAttachment,
            parameters: {
                contentDigest: content.contentDigest,
                salt: secp__namespace.utils.bytesToHex(content.salt),
                nonce: secp__namespace.utils.bytesToHex(content.nonce),
                secret: secp__namespace.utils.bytesToHex(content.secret),
                scheme: content.scheme,
                contentLength: String(content.contentLength),
                filename: content.filename,
            },
            content: new TextEncoder().encode(content.url),
        };
    }
    decode(content) {
        return {
            url: new TextDecoder().decode(content.content),
            contentDigest: content.parameters.contentDigest,
            salt: secp__namespace.utils.hexToBytes(content.parameters.salt),
            nonce: secp__namespace.utils.hexToBytes(content.parameters.nonce),
            secret: secp__namespace.utils.hexToBytes(content.parameters.secret),
            scheme: content.parameters.scheme,
            contentLength: parseInt(content.parameters.contentLength, 10),
            filename: content.parameters.filename,
        };
    }
    fallback(content) {
        return `Can’t display "${content.filename}". This app doesn’t support attachments.`;
    }
}

exports.AttachmentCodec = AttachmentCodec;
exports.ContentTypeAttachment = ContentTypeAttachment;
exports.ContentTypeRemoteAttachment = ContentTypeRemoteAttachment;
exports.RemoteAttachmentCodec = RemoteAttachmentCodec;
//# sourceMappingURL=index.cjs.map
