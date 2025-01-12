import { ContentTypeId, ContentCodec, EncodedContent, CodecRegistry } from '@brixbit/brixbit-js';

declare const ContentTypeAttachment: ContentTypeId;
type Attachment = {
    filename: string;
    mimeType: string;
    data: Uint8Array;
};
declare class AttachmentCodec implements ContentCodec<Attachment> {
    get contentType(): ContentTypeId;
    encode(content: Attachment): EncodedContent;
    decode(content: EncodedContent): Attachment;
    fallback(content: Attachment): string | undefined;
}

declare const ContentTypeRemoteAttachment: ContentTypeId;
type EncryptedEncodedContent = {
    digest: string;
    salt: Uint8Array;
    nonce: Uint8Array;
    secret: Uint8Array;
    payload: Uint8Array;
};
type RemoteAttachment = {
    url: string;
    contentDigest: string;
    salt: Uint8Array;
    nonce: Uint8Array;
    secret: Uint8Array;
    scheme: string;
    contentLength: number;
    filename: string;
};
declare class RemoteAttachmentCodec implements ContentCodec<RemoteAttachment> {
    static load<T>(remoteAttachment: RemoteAttachment, codecRegistry: CodecRegistry): Promise<T>;
    static encodeEncrypted<T>(content: T, codec: ContentCodec<T>): Promise<EncryptedEncodedContent>;
    get contentType(): ContentTypeId;
    encode(content: RemoteAttachment): EncodedContent;
    decode(content: EncodedContent): RemoteAttachment;
    fallback(content: RemoteAttachment): string | undefined;
}

export { type Attachment, AttachmentCodec, ContentTypeAttachment, ContentTypeRemoteAttachment, type EncryptedEncodedContent, type RemoteAttachment, RemoteAttachmentCodec };
