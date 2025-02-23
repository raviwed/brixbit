import { ContentTypeId, Ciphertext, decrypt, encrypt } from '@brixbit/brixbit-js';
import * as secp from '@noble/secp256k1';
import { content } from '@brixbit/proto';
import { webcrypto } from 'node:crypto';

const ContentTypeAttachment = new ContentTypeId({
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

const crypto = webcrypto;

const ContentTypeRemoteAttachment = new ContentTypeId({
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
        const digest = secp.utils.bytesToHex(digestBytes);
        if (digest !== remoteAttachment.contentDigest) {
            throw new Error("content digest does not match");
        }
        const ciphertext = new Ciphertext({
            aes256GcmHkdfSha256: {
                hkdfSalt: remoteAttachment.salt,
                gcmNonce: remoteAttachment.nonce,
                payload,
            },
        });
        const encodedContentData = await decrypt(ciphertext, remoteAttachment.secret);
        const encodedContent = content.EncodedContent.decode(encodedContentData);
        if (!encodedContent || !encodedContent.type) {
            throw new Error("no encoded content");
        }
        const contentType = encodedContent.type;
        if (!contentType) {
            throw new Error("no content type");
        }
        const codec = codecRegistry.codecFor(new ContentTypeId(contentType));
        if (!codec) {
            throw new Error(`no codec found for ${encodedContent.type?.typeId}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return codec.decode(encodedContent, codecRegistry);
    }
    static async encodeEncrypted(content$1, codec) {
        const secret = crypto.getRandomValues(new Uint8Array(32));
        const encodedContent = content.EncodedContent.encode(codec.encode(content$1, {
            codecFor() {
                return undefined;
            },
        })).finish();
        const ciphertext = await encrypt(encodedContent, secret);
        const salt = ciphertext.aes256GcmHkdfSha256?.hkdfSalt;
        const nonce = ciphertext.aes256GcmHkdfSha256?.gcmNonce;
        const payload = ciphertext.aes256GcmHkdfSha256?.payload;
        if (!salt || !nonce || !payload) {
            throw new Error("missing encryption key");
        }
        const digestBytes = new Uint8Array(await crypto.subtle.digest("SHA-256", payload));
        const digest = secp.utils.bytesToHex(digestBytes);
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
                salt: secp.utils.bytesToHex(content.salt),
                nonce: secp.utils.bytesToHex(content.nonce),
                secret: secp.utils.bytesToHex(content.secret),
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
            salt: secp.utils.hexToBytes(content.parameters.salt),
            nonce: secp.utils.hexToBytes(content.parameters.nonce),
            secret: secp.utils.hexToBytes(content.parameters.secret),
            scheme: content.parameters.scheme,
            contentLength: parseInt(content.parameters.contentLength, 10),
            filename: content.parameters.filename,
        };
    }
    fallback(content) {
        return `Can’t display "${content.filename}". This app doesn’t support attachments.`;
    }
}

export { AttachmentCodec, ContentTypeAttachment, ContentTypeRemoteAttachment, RemoteAttachmentCodec };
//# sourceMappingURL=index.js.map
