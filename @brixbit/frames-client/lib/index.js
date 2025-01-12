import { publicKey, fetcher, frames, signature } from '@brixbit/proto';
import { sha256 } from '@noble/hashes/sha256';
import Long from 'long';
import { OpenFramesProxy as OpenFramesProxy$1 } from '@open-frames/proxy-client';

const OPEN_FRAMES_PROXY_URL = "https://frames.brixbit.chat/";
const PROTOCOL_VERSION = "2024-02-09";

function publicKeyBytesToSign(pubKey) {
    return publicKey.PublicKey.encode({
        timestamp: pubKey.timestamp,
        secp256k1Uncompressed: pubKey.secp256k1Uncompressed,
    }).finish();
}
function toSignedPublicKey(v1Key, signedByWallet) {
    if (!v1Key.signature) {
        throw new Error("Missing signature");
    }
    let v1Signature = v1Key.signature;
    if (signedByWallet) {
        v1Signature = {
            walletEcdsaCompact: v1Signature.walletEcdsaCompact || v1Signature.ecdsaCompact,
            ecdsaCompact: undefined,
        };
    }
    return {
        keyBytes: publicKeyBytesToSign(v1Key),
        signature: v1Signature,
    };
}
function v1ToV2Bundle(v1Bundle) {
    if (!v1Bundle.identityKey || !v1Bundle.preKey) {
        throw new Error("Invalid bundle");
    }
    return {
        identityKey: toSignedPublicKey(v1Bundle.identityKey, true),
        preKey: toSignedPublicKey(v1Bundle.preKey, false),
    };
}

/* eslint-disable max-classes-per-file */
class InvalidArgumentsError extends Error {
}

const { b64Encode } = fetcher;
function concatArrays(...arrays) {
    return new Uint8Array(arrays.reduce((acc, arr) => acc.concat(Array.from(arr)), []));
}
function concatStringsToBytes(...arrays) {
    return new TextEncoder().encode(arrays.join(""));
}
function base64Encode(input) {
    return b64Encode(input, 0, input.length);
}
function buildOpaqueIdentifier(inputs) {
    if ("groupId" in inputs && "groupSecret" in inputs) {
        return base64Encode(sha256(concatArrays(inputs.groupId, inputs.groupSecret)));
    }
    const { conversationTopic, participantAccountAddresses } = inputs;
    if (!conversationTopic || !participantAccountAddresses.length) {
        throw new InvalidArgumentsError("Missing conversation topic or participants");
    }
    return base64Encode(sha256(concatStringsToBytes(conversationTopic.toLowerCase(), ...participantAccountAddresses.map((p) => p.toLowerCase()).sort())));
}
function isReactNativeClient(client) {
    const assertedClient = client;
    return (typeof assertedClient.sign === "function" &&
        typeof assertedClient.exportPublicKeyBundle === "function" &&
        !("keystore" in client));
}

class OpenFramesProxy {
    inner;
    constructor(baseUrl = OPEN_FRAMES_PROXY_URL) {
        this.inner = new OpenFramesProxy$1(baseUrl);
    }
    readMetadata(url) {
        return this.inner.readMetadata(url);
    }
    post(url, payload) {
        return this.inner.post(url, payload);
    }
    postRedirect(url, payload) {
        return this.inner.postRedirect(url, payload);
    }
    postTransaction(url, payload) {
        return this.inner.postTransaction(url, payload);
    }
    mediaUrl(url) {
        if (url?.startsWith("data:")) {
            return url;
        }
        return this.inner.mediaUrl(url);
    }
}

class FramesClient {
    brixbitClient;
    proxy;
    constructor(brixbitClient, proxy) {
        this.brixbitClient = brixbitClient;
        this.proxy = proxy || new OpenFramesProxy();
    }
    async signFrameAction(inputs) {
        const opaqueConversationIdentifier = buildOpaqueIdentifier(inputs);
        const { frameUrl, buttonIndex, inputText, state, address, transactionId } = inputs;
        const now = Date.now();
        const timestamp = Long.fromNumber(now);
        const toSign = {
            frameUrl,
            buttonIndex,
            opaqueConversationIdentifier,
            timestamp,
            inputText: inputText || "",
            unixTimestamp: now,
            state: state || "",
            address: address || "",
            transactionId: transactionId || "",
        };
        const signedAction = await this.buildSignedFrameAction(toSign);
        return {
            clientProtocol: `brixbit@${PROTOCOL_VERSION}`,
            untrustedData: {
                buttonIndex,
                opaqueConversationIdentifier,
                walletAddress: this.brixbitClient.address,
                inputText,
                url: frameUrl,
                timestamp: now,
                unixTimestamp: now,
                state,
                // The address associated with initiating a transaction
                address,
                transactionId,
            },
            trustedData: {
                messageBytes: base64Encode(signedAction),
            },
        };
    }
    async buildSignedFrameAction(actionBodyInputs) {
        const actionBody = frames.FrameActionBody.encode(actionBodyInputs).finish();
        const digest = sha256(actionBody);
        const signature = await this.signDigest(digest);
        const publicKeyBundle = await this.getPublicKeyBundle();
        return frames.FrameAction.encode({
            actionBody,
            signature,
            signedPublicKeyBundle: v1ToV2Bundle(publicKeyBundle),
        }).finish();
    }
    async signDigest(digest) {
        if (isReactNativeClient(this.brixbitClient)) {
            const signatureBytes = await this.brixbitClient.sign(digest, {
                kind: "identity",
            });
            return signature.Signature.decode(signatureBytes);
        }
        return this.brixbitClient.keystore.signDigest({
            digest,
            identityKey: true,
            prekeyIndex: undefined,
        });
    }
    async getPublicKeyBundle() {
        if (isReactNativeClient(this.brixbitClient)) {
            const bundleBytes = await this.brixbitClient.exportPublicKeyBundle();
            return publicKey.PublicKeyBundle.decode(bundleBytes);
        }
        return this.brixbitClient.keystore.getPublicKeyBundle();
    }
}

export { FramesClient, OPEN_FRAMES_PROXY_URL, OpenFramesProxy, PROTOCOL_VERSION };
//# sourceMappingURL=index.js.map
