import { OpenFramesUntrustedData } from '@open-frames/types';
import { GetMetadataResponse, PostRedirectResponse, TransactionResponse, OpenFramesProxy as OpenFramesProxy$1 } from '@open-frames/proxy-client';
import { Client } from '@brixbit/brixbit-js';
import * as _open_frames_proxy_types from '@open-frames/proxy-types';

type FramesApiResponse = GetMetadataResponse;
type FramesApiRedirectResponse = PostRedirectResponse;
type FramesTransactionApiResponse = TransactionResponse;
type FramePostUntrustedData = OpenFramesUntrustedData & {
    walletAddress: string;
    opaqueConversationIdentifier: string;
    unixTimestamp: number;
};
type FramePostTrustedData = {
    messageBytes: string;
};
type FramePostPayload = {
    clientProtocol: `brixbit@${string}`;
    untrustedData: FramePostUntrustedData;
    trustedData: FramePostTrustedData;
};
type DmActionInputs = {
    conversationTopic: string;
    participantAccountAddresses: string[];
};
type GroupActionInputs = {
    groupId: Uint8Array;
    groupSecret: Uint8Array;
};
type ConversationActionInputs = DmActionInputs | GroupActionInputs;
type FrameActionInputs = {
    frameUrl: string;
    buttonIndex: number;
    inputText?: string;
    state?: string;
    address?: string;
    transactionId?: string;
} & ConversationActionInputs;
type KeyType = {
    kind: "identity" | "prekey";
    prekeyIndex?: number | undefined;
};
type ReactNativeClient = {
    address: string;
    exportPublicKeyBundle(): Promise<Uint8Array>;
    sign(digest: Uint8Array, type: KeyType): Promise<Uint8Array>;
};

declare const OPEN_FRAMES_PROXY_URL = "https://frames.brixbit.chat/";
declare const PROTOCOL_VERSION = "2024-02-09";

declare class OpenFramesProxy {
    inner: OpenFramesProxy$1;
    constructor(baseUrl?: string);
    readMetadata(url: string): Promise<_open_frames_proxy_types.GetMetadataResponse>;
    post(url: string, payload: FramePostPayload): Promise<FramesApiResponse>;
    postRedirect(url: string, payload: FramePostPayload): Promise<FramesApiRedirectResponse>;
    postTransaction(url: string, payload: FramePostPayload): Promise<FramesTransactionApiResponse>;
    mediaUrl(url: string): string;
}

declare class FramesClient {
    brixbitClient: Client | ReactNativeClient;
    proxy: OpenFramesProxy;
    constructor(brixbitClient: Client | ReactNativeClient, proxy?: OpenFramesProxy);
    signFrameAction(inputs: FrameActionInputs): Promise<FramePostPayload>;
    private buildSignedFrameAction;
    private signDigest;
    private getPublicKeyBundle;
}

export { type FrameActionInputs, type FramePostPayload, type FramePostTrustedData, type FramePostUntrustedData, type FramesApiRedirectResponse, type FramesApiResponse, FramesClient, type FramesTransactionApiResponse, OPEN_FRAMES_PROXY_URL, OpenFramesProxy, PROTOCOL_VERSION, type ReactNativeClient };
