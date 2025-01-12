import type { Client } from "@brixbit/brixbit-js";
import {
  signature as signatureProto,
  publicKey as publicKeyProto,
  frames,
} from "@brixbit/proto";
import { sha256 } from "@noble/hashes/sha256";
import Long from "long";
import { PROTOCOL_VERSION } from "./constants";
import type {
  FrameActionInputs,
  FramePostPayload,
  ReactNativeClient,
} from "./types";
import { v1ToV2Bundle } from "./converters";
import {
  base64Encode,
  buildOpaqueIdentifier,
  isReactNativeClient,
} from "./utils";
import OpenFramesProxy from "./proxy";

export class FramesClient {
  brixbitClient: Client | ReactNativeClient;

  proxy: OpenFramesProxy;

  constructor(brixbitClient: Client | ReactNativeClient, proxy?: OpenFramesProxy) {
    this.brixbitClient = brixbitClient;
    this.proxy = proxy || new OpenFramesProxy();
  }

  async signFrameAction(inputs: FrameActionInputs): Promise<FramePostPayload> {
    const opaqueConversationIdentifier = buildOpaqueIdentifier(inputs);
    const { frameUrl, buttonIndex, inputText, state, address, transactionId } =
      inputs;
    const now = Date.now();
    const timestamp = Long.fromNumber(now);
    const toSign: frames.FrameActionBody = {
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

  private async buildSignedFrameAction(
    actionBodyInputs: frames.FrameActionBody,
  ) {
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

  private async signDigest(
    digest: Uint8Array,
  ): Promise<signatureProto.Signature> {
    if (isReactNativeClient(this.brixbitClient)) {
      const signatureBytes = await this.brixbitClient.sign(digest, {
        kind: "identity",
      });
      return signatureProto.Signature.decode(signatureBytes);
    }

    return this.brixbitClient.keystore.signDigest({
      digest,
      identityKey: true,
      prekeyIndex: undefined,
    });
  }

  private async getPublicKeyBundle(): Promise<publicKeyProto.PublicKeyBundle> {
    if (isReactNativeClient(this.brixbitClient)) {
      const bundleBytes = await this.brixbitClient.exportPublicKeyBundle();
      return publicKeyProto.PublicKeyBundle.decode(bundleBytes);
    }

    return this.brixbitClient.keystore.getPublicKeyBundle();
  }
}
