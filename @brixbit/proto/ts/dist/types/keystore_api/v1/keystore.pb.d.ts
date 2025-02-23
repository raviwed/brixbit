import Long from "long";
import { Ciphertext } from "../../message_contents/ciphertext.pb";
import { PublicKeyBundle, SignedPublicKeyBundle } from "../../message_contents/public_key.pb";
import { InvitationV1_Context, ConsentProofPayload, InvitationV1 } from "../../message_contents/invitation.pb";
import { ConversationReference } from "../../message_contents/conversation_reference.pb";
import { PrivateKeyBundleV1 } from "../../message_contents/private_key.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.keystore_api.v1";
/** Message content encoding structures */
/** Application-specific error codes for the Keystore API. */
export declare enum ErrorCode {
    ERROR_CODE_UNSPECIFIED = 0,
    ERROR_CODE_INVALID_INPUT = 1,
    ERROR_CODE_NO_MATCHING_PREKEY = 2,
    UNRECOGNIZED = -1
}
export declare function errorCodeFromJSON(object: any): ErrorCode;
export declare function errorCodeToJSON(object: ErrorCode): string;
/** JobType is used to specify the type of job the caller would like info on */
export declare enum JobType {
    JOB_TYPE_UNSPECIFIED = 0,
    JOB_TYPE_REFRESH_V1 = 1,
    JOB_TYPE_REFRESH_V2 = 2,
    JOB_TYPE_REFRESH_PPPP = 3,
    UNRECOGNIZED = -1
}
export declare function jobTypeFromJSON(object: any): JobType;
export declare function jobTypeToJSON(object: JobType): string;
/** Wrapper class for errors from the Keystore API */
export interface KeystoreError {
    message: string;
    code: ErrorCode;
}
/** Decrypt a batch of messages using X3DH key agreement */
export interface DecryptV1Request {
    requests: DecryptV1Request_Request[];
}
/** A single decryption request */
export interface DecryptV1Request_Request {
    payload: Ciphertext | undefined;
    peerKeys: PublicKeyBundle | undefined;
    headerBytes: Uint8Array;
    isSender: boolean;
}
/** Response type for both V1 and V2 decryption requests */
export interface DecryptResponse {
    responses: DecryptResponse_Response[];
}
/** A single decryption response */
export interface DecryptResponse_Response {
    result: DecryptResponse_Response_Success | undefined;
    error: KeystoreError | undefined;
}
/** Wrapper object for success response */
export interface DecryptResponse_Response_Success {
    decrypted: Uint8Array;
}
/** Decrypt a batch of messages using the appropriate topic keys */
export interface DecryptV2Request {
    requests: DecryptV2Request_Request[];
}
/** A single decryption request */
export interface DecryptV2Request_Request {
    payload: Ciphertext | undefined;
    headerBytes: Uint8Array;
    contentTopic: string;
}
/** Encrypt a batch of messages using X3DH key agreement */
export interface EncryptV1Request {
    requests: EncryptV1Request_Request[];
}
/** A single encryption request */
export interface EncryptV1Request_Request {
    recipient: PublicKeyBundle | undefined;
    payload: Uint8Array;
    headerBytes: Uint8Array;
}
/** Response type for both V1 and V2 encryption requests */
export interface EncryptResponse {
    responses: EncryptResponse_Response[];
}
/** A single encryption response */
export interface EncryptResponse_Response {
    result: EncryptResponse_Response_Success | undefined;
    error: KeystoreError | undefined;
}
/** Wrapper object for success response */
export interface EncryptResponse_Response_Success {
    encrypted: Ciphertext | undefined;
    senderHmac: Uint8Array;
}
/** Encrypt a batch of messages using the appropriate topic keys */
export interface EncryptV2Request {
    requests: EncryptV2Request_Request[];
}
/** A single encryption request */
export interface EncryptV2Request_Request {
    payload: Uint8Array;
    headerBytes: Uint8Array;
    contentTopic: string;
}
/** Encrypt a message for yourself */
export interface SelfEncryptRequest {
    requests: SelfEncryptRequest_Request[];
}
/** Request type */
export interface SelfEncryptRequest_Request {
    payload: Uint8Array;
}
/** Response type for SelfEncryptRequest */
export interface SelfEncryptResponse {
    responses: SelfEncryptResponse_Response[];
}
/** Response type */
export interface SelfEncryptResponse_Response {
    result: SelfEncryptResponse_Response_Success | undefined;
    error: KeystoreError | undefined;
}
/** Success response */
export interface SelfEncryptResponse_Response_Success {
    encrypted: Uint8Array;
}
/** SelfDecryptRequest */
export interface SelfDecryptRequest {
    requests: SelfDecryptRequest_Request[];
}
/** Request type */
export interface SelfDecryptRequest_Request {
    payload: Uint8Array;
}
/** Get the private preferences topic identifier */
export interface GetPrivatePreferencesTopicIdentifierResponse {
    identifier: string;
}
/** Request to create an invite payload, and store the topic keys in the Keystore */
export interface CreateInviteRequest {
    context: InvitationV1_Context | undefined;
    recipient: SignedPublicKeyBundle | undefined;
    createdNs: Long;
    consentProof: ConsentProofPayload | undefined;
}
/** Response to a CreateInviteRequest */
export interface CreateInviteResponse {
    conversation: ConversationReference | undefined;
    payload: Uint8Array;
}
/** Request to save a batch of invite messages to the Keystore */
export interface SaveInvitesRequest {
    requests: SaveInvitesRequest_Request[];
}
/** Mirrors brixbit.envelope schema */
export interface SaveInvitesRequest_Request {
    contentTopic: string;
    timestampNs: Long;
    payload: Uint8Array;
}
/** Response to a SaveInvitesRequest */
export interface SaveInvitesResponse {
    responses: SaveInvitesResponse_Response[];
}
/** A single response */
export interface SaveInvitesResponse_Response {
    result: SaveInvitesResponse_Response_Success | undefined;
    error: KeystoreError | undefined;
}
/** Wrapper object for success response */
export interface SaveInvitesResponse_Response_Success {
    conversation: ConversationReference | undefined;
}
/** CreateAuthTokenRequest is used to create an auth token for the BRIXBIT API */
export interface CreateAuthTokenRequest {
    timestampNs?: Long | undefined;
}
/**
 * SaveV1ConversationsRequest is used to save a batch of conversations to the
 * built in persistence
 */
export interface SaveV1ConversationsRequest {
    conversations: ConversationReference[];
}
/** Placeholder response type for SaveV1Conversations */
export interface SaveV1ConversationsResponse {
}
/** Response for GetV2Conversations */
export interface GetConversationsResponse {
    conversations: ConversationReference[];
}
/**
 * Used to check if the Keystore implementation has been setup for the given
 * wallet address Only used for MM Snap Keystore currently
 */
export interface GetKeystoreStatusRequest {
    walletAddress: string;
}
/** Response to GetKeystoreStatusRequest */
export interface GetKeystoreStatusResponse {
    status: GetKeystoreStatusResponse_KeystoreStatus;
}
/** Status of the Keystore for the specified wallet address */
export declare enum GetKeystoreStatusResponse_KeystoreStatus {
    KEYSTORE_STATUS_UNSPECIFIED = 0,
    KEYSTORE_STATUS_UNINITIALIZED = 1,
    KEYSTORE_STATUS_INITIALIZED = 2,
    UNRECOGNIZED = -1
}
export declare function getKeystoreStatusResponse_KeystoreStatusFromJSON(object: any): GetKeystoreStatusResponse_KeystoreStatus;
export declare function getKeystoreStatusResponse_KeystoreStatusToJSON(object: GetKeystoreStatusResponse_KeystoreStatus): string;
/**
 * Used to initialize the Keystore with a private key bundle retrieved from the
 * client
 */
export interface InitKeystoreRequest {
    v1: PrivateKeyBundleV1 | undefined;
}
/** Response to the request to initialize the Keystore */
export interface InitKeystoreResponse {
    error: KeystoreError | undefined;
}
/**
 * SignDigestRequest is used to sign a digest with either the identity key
 * or a prekey
 */
export interface SignDigestRequest {
    digest: Uint8Array;
    identityKey: boolean | undefined;
    prekeyIndex: number | undefined;
}
/** GetRefreshJobRequest is used to get the last run time of a refresh job */
export interface GetRefreshJobRequest {
    jobType: JobType;
}
/** GetRefreshJobResponse is used to return the last run time of a refresh job */
export interface GetRefreshJobResponse {
    lastRunNs: Long;
}
/** SetRefreshJobRequest is used to set the last run time of a refresh job */
export interface SetRefeshJobRequest {
    jobType: JobType;
    lastRunNs: Long;
}
/** SetRefreshJobResponse is an empty response type */
export interface SetRefreshJobResponse {
}
/** A mapping of topics to their decrypted invitations */
export interface TopicMap {
    topics: {
        [key: string]: TopicMap_TopicData;
    };
}
/** TopicData wraps the invitation and the timestamp it was created */
export interface TopicMap_TopicData {
    createdNs: Long;
    peerAddress: string;
    invitation: InvitationV1 | undefined;
}
export interface TopicMap_TopicsEntry {
    key: string;
    value: TopicMap_TopicData | undefined;
}
/** Used to get a mapping of conversation topics to their HMAC keys */
export interface GetConversationHmacKeysRequest {
    topics: string[];
}
/** A mapping of topics to their HMAC keys */
export interface GetConversationHmacKeysResponse {
    hmacKeys: {
        [key: string]: GetConversationHmacKeysResponse_HmacKeys;
    };
}
/** HmacKeyData wraps the HMAC key and the number of 30 day periods since epoch */
export interface GetConversationHmacKeysResponse_HmacKeyData {
    thirtyDayPeriodsSinceEpoch: number;
    hmacKey: Uint8Array;
}
/** HmacKeys represents multiple HmacKeyData objects */
export interface GetConversationHmacKeysResponse_HmacKeys {
    values: GetConversationHmacKeysResponse_HmacKeyData[];
}
export interface GetConversationHmacKeysResponse_HmacKeysEntry {
    key: string;
    value: GetConversationHmacKeysResponse_HmacKeys | undefined;
}
export declare const KeystoreError: {
    encode(message: KeystoreError, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): KeystoreError;
    fromJSON(object: any): KeystoreError;
    toJSON(message: KeystoreError): unknown;
    fromPartial<I extends {
        message?: string | undefined;
        code?: ErrorCode | undefined;
    } & {
        message?: string | undefined;
        code?: ErrorCode | undefined;
    } & { [K in Exclude<keyof I, keyof KeystoreError>]: never; }>(object: I): KeystoreError;
};
export declare const DecryptV1Request: {
    encode(message: DecryptV1Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptV1Request;
    fromJSON(object: any): DecryptV1Request;
    toJSON(message: DecryptV1Request): unknown;
    fromPartial<I extends {
        requests?: {
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            peerKeys?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            isSender?: boolean | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            peerKeys?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            isSender?: boolean | undefined;
        }[] & ({
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            peerKeys?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            isSender?: boolean | undefined;
        } & {
            payload?: ({
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } & {
                aes256GcmHkdfSha256?: ({
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } & {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } & { [K in Exclude<keyof I["requests"][number]["payload"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["requests"][number]["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
            peerKeys?: ({
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                identityKey?: ({
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_2 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                    signature?: ({
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } & {
                        ecdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_3 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_4 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_5 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_6 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_7 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
                preKey?: ({
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_8 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                    signature?: ({
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } & {
                        ecdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_9 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_10 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_11 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_12 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_13 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
            } & { [K_14 in Exclude<keyof I["requests"][number]["peerKeys"], keyof PublicKeyBundle>]: never; }) | undefined;
            headerBytes?: Uint8Array | undefined;
            isSender?: boolean | undefined;
        } & { [K_15 in Exclude<keyof I["requests"][number], keyof DecryptV1Request_Request>]: never; })[] & { [K_16 in Exclude<keyof I["requests"], keyof {
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            peerKeys?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            isSender?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_17 in Exclude<keyof I, "requests">]: never; }>(object: I): DecryptV1Request;
};
export declare const DecryptV1Request_Request: {
    encode(message: DecryptV1Request_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptV1Request_Request;
    fromJSON(object: any): DecryptV1Request_Request;
    toJSON(message: DecryptV1Request_Request): unknown;
    fromPartial<I extends {
        payload?: {
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        peerKeys?: {
            identityKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        headerBytes?: Uint8Array | undefined;
        isSender?: boolean | undefined;
    } & {
        payload?: ({
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } & {
            aes256GcmHkdfSha256?: ({
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["payload"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
        peerKeys?: ({
            identityKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            identityKey?: ({
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_2 in Exclude<keyof I["peerKeys"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_3 in Exclude<keyof I["peerKeys"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_4 in Exclude<keyof I["peerKeys"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["peerKeys"]["identityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_6 in Exclude<keyof I["peerKeys"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["peerKeys"]["identityKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
            preKey?: ({
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_8 in Exclude<keyof I["peerKeys"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_9 in Exclude<keyof I["peerKeys"]["preKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_10 in Exclude<keyof I["peerKeys"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_11 in Exclude<keyof I["peerKeys"]["preKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_12 in Exclude<keyof I["peerKeys"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_13 in Exclude<keyof I["peerKeys"]["preKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
        } & { [K_14 in Exclude<keyof I["peerKeys"], keyof PublicKeyBundle>]: never; }) | undefined;
        headerBytes?: Uint8Array | undefined;
        isSender?: boolean | undefined;
    } & { [K_15 in Exclude<keyof I, keyof DecryptV1Request_Request>]: never; }>(object: I): DecryptV1Request_Request;
};
export declare const DecryptResponse: {
    encode(message: DecryptResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptResponse;
    fromJSON(object: any): DecryptResponse;
    toJSON(message: DecryptResponse): unknown;
    fromPartial<I extends {
        responses?: {
            result?: {
                decrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            result?: {
                decrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] & ({
            result?: {
                decrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        } & {
            result?: ({
                decrypted?: Uint8Array | undefined;
            } & {
                decrypted?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["responses"][number]["result"], "decrypted">]: never; }) | undefined;
            error?: ({
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & { [K_1 in Exclude<keyof I["responses"][number]["error"], keyof KeystoreError>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["responses"][number], keyof DecryptResponse_Response>]: never; })[] & { [K_3 in Exclude<keyof I["responses"], keyof {
            result?: {
                decrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "responses">]: never; }>(object: I): DecryptResponse;
};
export declare const DecryptResponse_Response: {
    encode(message: DecryptResponse_Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptResponse_Response;
    fromJSON(object: any): DecryptResponse_Response;
    toJSON(message: DecryptResponse_Response): unknown;
    fromPartial<I extends {
        result?: {
            decrypted?: Uint8Array | undefined;
        } | undefined;
        error?: {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } | undefined;
    } & {
        result?: ({
            decrypted?: Uint8Array | undefined;
        } & {
            decrypted?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["result"], "decrypted">]: never; }) | undefined;
        error?: ({
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & { [K_1 in Exclude<keyof I["error"], keyof KeystoreError>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof DecryptResponse_Response>]: never; }>(object: I): DecryptResponse_Response;
};
export declare const DecryptResponse_Response_Success: {
    encode(message: DecryptResponse_Response_Success, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptResponse_Response_Success;
    fromJSON(object: any): DecryptResponse_Response_Success;
    toJSON(message: DecryptResponse_Response_Success): unknown;
    fromPartial<I extends {
        decrypted?: Uint8Array | undefined;
    } & {
        decrypted?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "decrypted">]: never; }>(object: I): DecryptResponse_Response_Success;
};
export declare const DecryptV2Request: {
    encode(message: DecryptV2Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptV2Request;
    fromJSON(object: any): DecryptV2Request;
    toJSON(message: DecryptV2Request): unknown;
    fromPartial<I extends {
        requests?: {
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        }[] & ({
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        } & {
            payload?: ({
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } & {
                aes256GcmHkdfSha256?: ({
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } & {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } & { [K in Exclude<keyof I["requests"][number]["payload"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["requests"][number]["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        } & { [K_2 in Exclude<keyof I["requests"][number], keyof DecryptV2Request_Request>]: never; })[] & { [K_3 in Exclude<keyof I["requests"], keyof {
            payload?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "requests">]: never; }>(object: I): DecryptV2Request;
};
export declare const DecryptV2Request_Request: {
    encode(message: DecryptV2Request_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DecryptV2Request_Request;
    fromJSON(object: any): DecryptV2Request_Request;
    toJSON(message: DecryptV2Request_Request): unknown;
    fromPartial<I extends {
        payload?: {
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        headerBytes?: Uint8Array | undefined;
        contentTopic?: string | undefined;
    } & {
        payload?: ({
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } & {
            aes256GcmHkdfSha256?: ({
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["payload"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
        headerBytes?: Uint8Array | undefined;
        contentTopic?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof DecryptV2Request_Request>]: never; }>(object: I): DecryptV2Request_Request;
};
export declare const EncryptV1Request: {
    encode(message: EncryptV1Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptV1Request;
    fromJSON(object: any): EncryptV1Request;
    toJSON(message: EncryptV1Request): unknown;
    fromPartial<I extends {
        requests?: {
            recipient?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            recipient?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
        }[] & ({
            recipient?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
        } & {
            recipient?: ({
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                identityKey?: ({
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K in Exclude<keyof I["requests"][number]["recipient"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                    signature?: ({
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } & {
                        ecdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_1 in Exclude<keyof I["requests"][number]["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_2 in Exclude<keyof I["requests"][number]["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_3 in Exclude<keyof I["requests"][number]["recipient"]["identityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_4 in Exclude<keyof I["requests"][number]["recipient"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["requests"][number]["recipient"]["identityKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
                preKey?: ({
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_6 in Exclude<keyof I["requests"][number]["recipient"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                    signature?: ({
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } & {
                        ecdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_7 in Exclude<keyof I["requests"][number]["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_8 in Exclude<keyof I["requests"][number]["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_9 in Exclude<keyof I["requests"][number]["recipient"]["preKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_10 in Exclude<keyof I["requests"][number]["recipient"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_11 in Exclude<keyof I["requests"][number]["recipient"]["preKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
            } & { [K_12 in Exclude<keyof I["requests"][number]["recipient"], keyof PublicKeyBundle>]: never; }) | undefined;
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
        } & { [K_13 in Exclude<keyof I["requests"][number], keyof EncryptV1Request_Request>]: never; })[] & { [K_14 in Exclude<keyof I["requests"], keyof {
            recipient?: {
                identityKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                preKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_15 in Exclude<keyof I, "requests">]: never; }>(object: I): EncryptV1Request;
};
export declare const EncryptV1Request_Request: {
    encode(message: EncryptV1Request_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptV1Request_Request;
    fromJSON(object: any): EncryptV1Request_Request;
    toJSON(message: EncryptV1Request_Request): unknown;
    fromPartial<I extends {
        recipient?: {
            identityKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        payload?: Uint8Array | undefined;
        headerBytes?: Uint8Array | undefined;
    } & {
        recipient?: ({
            identityKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            identityKey?: ({
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K in Exclude<keyof I["recipient"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_1 in Exclude<keyof I["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_2 in Exclude<keyof I["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["recipient"]["identityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_4 in Exclude<keyof I["recipient"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["recipient"]["identityKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
            preKey?: ({
                timestamp?: string | number | Long | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
                secp256k1Uncompressed?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_6 in Exclude<keyof I["recipient"]["preKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_7 in Exclude<keyof I["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_8 in Exclude<keyof I["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["recipient"]["preKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                secp256k1Uncompressed?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_10 in Exclude<keyof I["recipient"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
            } & { [K_11 in Exclude<keyof I["recipient"]["preKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I["recipient"], keyof PublicKeyBundle>]: never; }) | undefined;
        payload?: Uint8Array | undefined;
        headerBytes?: Uint8Array | undefined;
    } & { [K_13 in Exclude<keyof I, keyof EncryptV1Request_Request>]: never; }>(object: I): EncryptV1Request_Request;
};
export declare const EncryptResponse: {
    encode(message: EncryptResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptResponse;
    fromJSON(object: any): EncryptResponse;
    toJSON(message: EncryptResponse): unknown;
    fromPartial<I extends {
        responses?: {
            result?: {
                encrypted?: {
                    aes256GcmHkdfSha256?: {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            result?: {
                encrypted?: {
                    aes256GcmHkdfSha256?: {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] & ({
            result?: {
                encrypted?: {
                    aes256GcmHkdfSha256?: {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        } & {
            result?: ({
                encrypted?: {
                    aes256GcmHkdfSha256?: {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                senderHmac?: Uint8Array | undefined;
            } & {
                encrypted?: ({
                    aes256GcmHkdfSha256?: {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    aes256GcmHkdfSha256?: ({
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } & {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } & { [K in Exclude<keyof I["responses"][number]["result"]["encrypted"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                } & { [K_1 in Exclude<keyof I["responses"][number]["result"]["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                senderHmac?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["responses"][number]["result"], keyof EncryptResponse_Response_Success>]: never; }) | undefined;
            error?: ({
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & { [K_3 in Exclude<keyof I["responses"][number]["error"], keyof KeystoreError>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["responses"][number], keyof EncryptResponse_Response>]: never; })[] & { [K_5 in Exclude<keyof I["responses"], keyof {
            result?: {
                encrypted?: {
                    aes256GcmHkdfSha256?: {
                        hkdfSalt?: Uint8Array | undefined;
                        gcmNonce?: Uint8Array | undefined;
                        payload?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "responses">]: never; }>(object: I): EncryptResponse;
};
export declare const EncryptResponse_Response: {
    encode(message: EncryptResponse_Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptResponse_Response;
    fromJSON(object: any): EncryptResponse_Response;
    toJSON(message: EncryptResponse_Response): unknown;
    fromPartial<I extends {
        result?: {
            encrypted?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            senderHmac?: Uint8Array | undefined;
        } | undefined;
        error?: {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } | undefined;
    } & {
        result?: ({
            encrypted?: {
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            senderHmac?: Uint8Array | undefined;
        } & {
            encrypted?: ({
                aes256GcmHkdfSha256?: {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } | undefined;
            } & {
                aes256GcmHkdfSha256?: ({
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } & {
                    hkdfSalt?: Uint8Array | undefined;
                    gcmNonce?: Uint8Array | undefined;
                    payload?: Uint8Array | undefined;
                } & { [K in Exclude<keyof I["result"]["encrypted"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["result"]["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
            senderHmac?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["result"], keyof EncryptResponse_Response_Success>]: never; }) | undefined;
        error?: ({
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & { [K_3 in Exclude<keyof I["error"], keyof KeystoreError>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof EncryptResponse_Response>]: never; }>(object: I): EncryptResponse_Response;
};
export declare const EncryptResponse_Response_Success: {
    encode(message: EncryptResponse_Response_Success, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptResponse_Response_Success;
    fromJSON(object: any): EncryptResponse_Response_Success;
    toJSON(message: EncryptResponse_Response_Success): unknown;
    fromPartial<I extends {
        encrypted?: {
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        senderHmac?: Uint8Array | undefined;
    } & {
        encrypted?: ({
            aes256GcmHkdfSha256?: {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } | undefined;
        } & {
            aes256GcmHkdfSha256?: ({
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & {
                hkdfSalt?: Uint8Array | undefined;
                gcmNonce?: Uint8Array | undefined;
                payload?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["encrypted"]["aes256GcmHkdfSha256"], keyof import("../../message_contents/ciphertext.pb").Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
        senderHmac?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof EncryptResponse_Response_Success>]: never; }>(object: I): EncryptResponse_Response_Success;
};
export declare const EncryptV2Request: {
    encode(message: EncryptV2Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptV2Request;
    fromJSON(object: any): EncryptV2Request;
    toJSON(message: EncryptV2Request): unknown;
    fromPartial<I extends {
        requests?: {
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        }[] & ({
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        } & {
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        } & { [K in Exclude<keyof I["requests"][number], keyof EncryptV2Request_Request>]: never; })[] & { [K_1 in Exclude<keyof I["requests"], keyof {
            payload?: Uint8Array | undefined;
            headerBytes?: Uint8Array | undefined;
            contentTopic?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "requests">]: never; }>(object: I): EncryptV2Request;
};
export declare const EncryptV2Request_Request: {
    encode(message: EncryptV2Request_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EncryptV2Request_Request;
    fromJSON(object: any): EncryptV2Request_Request;
    toJSON(message: EncryptV2Request_Request): unknown;
    fromPartial<I extends {
        payload?: Uint8Array | undefined;
        headerBytes?: Uint8Array | undefined;
        contentTopic?: string | undefined;
    } & {
        payload?: Uint8Array | undefined;
        headerBytes?: Uint8Array | undefined;
        contentTopic?: string | undefined;
    } & { [K in Exclude<keyof I, keyof EncryptV2Request_Request>]: never; }>(object: I): EncryptV2Request_Request;
};
export declare const SelfEncryptRequest: {
    encode(message: SelfEncryptRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfEncryptRequest;
    fromJSON(object: any): SelfEncryptRequest;
    toJSON(message: SelfEncryptRequest): unknown;
    fromPartial<I extends {
        requests?: {
            payload?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            payload?: Uint8Array | undefined;
        }[] & ({
            payload?: Uint8Array | undefined;
        } & {
            payload?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["requests"][number], "payload">]: never; })[] & { [K_1 in Exclude<keyof I["requests"], keyof {
            payload?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "requests">]: never; }>(object: I): SelfEncryptRequest;
};
export declare const SelfEncryptRequest_Request: {
    encode(message: SelfEncryptRequest_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfEncryptRequest_Request;
    fromJSON(object: any): SelfEncryptRequest_Request;
    toJSON(message: SelfEncryptRequest_Request): unknown;
    fromPartial<I extends {
        payload?: Uint8Array | undefined;
    } & {
        payload?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "payload">]: never; }>(object: I): SelfEncryptRequest_Request;
};
export declare const SelfEncryptResponse: {
    encode(message: SelfEncryptResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfEncryptResponse;
    fromJSON(object: any): SelfEncryptResponse;
    toJSON(message: SelfEncryptResponse): unknown;
    fromPartial<I extends {
        responses?: {
            result?: {
                encrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            result?: {
                encrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] & ({
            result?: {
                encrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        } & {
            result?: ({
                encrypted?: Uint8Array | undefined;
            } & {
                encrypted?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["responses"][number]["result"], "encrypted">]: never; }) | undefined;
            error?: ({
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & { [K_1 in Exclude<keyof I["responses"][number]["error"], keyof KeystoreError>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["responses"][number], keyof SelfEncryptResponse_Response>]: never; })[] & { [K_3 in Exclude<keyof I["responses"], keyof {
            result?: {
                encrypted?: Uint8Array | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "responses">]: never; }>(object: I): SelfEncryptResponse;
};
export declare const SelfEncryptResponse_Response: {
    encode(message: SelfEncryptResponse_Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfEncryptResponse_Response;
    fromJSON(object: any): SelfEncryptResponse_Response;
    toJSON(message: SelfEncryptResponse_Response): unknown;
    fromPartial<I extends {
        result?: {
            encrypted?: Uint8Array | undefined;
        } | undefined;
        error?: {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } | undefined;
    } & {
        result?: ({
            encrypted?: Uint8Array | undefined;
        } & {
            encrypted?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["result"], "encrypted">]: never; }) | undefined;
        error?: ({
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & { [K_1 in Exclude<keyof I["error"], keyof KeystoreError>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof SelfEncryptResponse_Response>]: never; }>(object: I): SelfEncryptResponse_Response;
};
export declare const SelfEncryptResponse_Response_Success: {
    encode(message: SelfEncryptResponse_Response_Success, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfEncryptResponse_Response_Success;
    fromJSON(object: any): SelfEncryptResponse_Response_Success;
    toJSON(message: SelfEncryptResponse_Response_Success): unknown;
    fromPartial<I extends {
        encrypted?: Uint8Array | undefined;
    } & {
        encrypted?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "encrypted">]: never; }>(object: I): SelfEncryptResponse_Response_Success;
};
export declare const SelfDecryptRequest: {
    encode(message: SelfDecryptRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfDecryptRequest;
    fromJSON(object: any): SelfDecryptRequest;
    toJSON(message: SelfDecryptRequest): unknown;
    fromPartial<I extends {
        requests?: {
            payload?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            payload?: Uint8Array | undefined;
        }[] & ({
            payload?: Uint8Array | undefined;
        } & {
            payload?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["requests"][number], "payload">]: never; })[] & { [K_1 in Exclude<keyof I["requests"], keyof {
            payload?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "requests">]: never; }>(object: I): SelfDecryptRequest;
};
export declare const SelfDecryptRequest_Request: {
    encode(message: SelfDecryptRequest_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SelfDecryptRequest_Request;
    fromJSON(object: any): SelfDecryptRequest_Request;
    toJSON(message: SelfDecryptRequest_Request): unknown;
    fromPartial<I extends {
        payload?: Uint8Array | undefined;
    } & {
        payload?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "payload">]: never; }>(object: I): SelfDecryptRequest_Request;
};
export declare const GetPrivatePreferencesTopicIdentifierResponse: {
    encode(message: GetPrivatePreferencesTopicIdentifierResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetPrivatePreferencesTopicIdentifierResponse;
    fromJSON(object: any): GetPrivatePreferencesTopicIdentifierResponse;
    toJSON(message: GetPrivatePreferencesTopicIdentifierResponse): unknown;
    fromPartial<I extends {
        identifier?: string | undefined;
    } & {
        identifier?: string | undefined;
    } & { [K in Exclude<keyof I, "identifier">]: never; }>(object: I): GetPrivatePreferencesTopicIdentifierResponse;
};
export declare const CreateInviteRequest: {
    encode(message: CreateInviteRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CreateInviteRequest;
    fromJSON(object: any): CreateInviteRequest;
    toJSON(message: CreateInviteRequest): unknown;
    fromPartial<I extends {
        context?: {
            conversationId?: string | undefined;
            metadata?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        recipient?: {
            identityKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        createdNs?: string | number | Long | undefined;
        consentProof?: {
            signature?: string | undefined;
            timestamp?: string | number | Long | undefined;
            payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
        } | undefined;
    } & {
        context?: ({
            conversationId?: string | undefined;
            metadata?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            conversationId?: string | undefined;
            metadata?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["context"]["metadata"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["context"], keyof InvitationV1_Context>]: never; }) | undefined;
        recipient?: ({
            identityKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            preKey?: {
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            identityKey?: ({
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } & {
                keyBytes?: Uint8Array | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_2 in Exclude<keyof I["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_3 in Exclude<keyof I["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_4 in Exclude<keyof I["recipient"]["identityKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["recipient"]["identityKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
            preKey?: ({
                keyBytes?: Uint8Array | undefined;
                signature?: {
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } | undefined;
            } & {
                keyBytes?: Uint8Array | undefined;
                signature?: ({
                    ecdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                    walletEcdsaCompact?: {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } | undefined;
                } & {
                    ecdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_6 in Exclude<keyof I["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_7 in Exclude<keyof I["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_8 in Exclude<keyof I["recipient"]["preKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
            } & { [K_9 in Exclude<keyof I["recipient"]["preKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
        } & { [K_10 in Exclude<keyof I["recipient"], keyof SignedPublicKeyBundle>]: never; }) | undefined;
        createdNs?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K_11 in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
        consentProof?: ({
            signature?: string | undefined;
            timestamp?: string | number | Long | undefined;
            payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
        } & {
            signature?: string | undefined;
            timestamp?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_12 in Exclude<keyof I["consentProof"]["timestamp"], keyof Long>]: never; }) | undefined;
            payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
        } & { [K_13 in Exclude<keyof I["consentProof"], keyof ConsentProofPayload>]: never; }) | undefined;
    } & { [K_14 in Exclude<keyof I, keyof CreateInviteRequest>]: never; }>(object: I): CreateInviteRequest;
};
export declare const CreateInviteResponse: {
    encode(message: CreateInviteResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CreateInviteResponse;
    fromJSON(object: any): CreateInviteResponse;
    toJSON(message: CreateInviteResponse): unknown;
    fromPartial<I extends {
        conversation?: {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } | undefined;
        payload?: Uint8Array | undefined;
    } & {
        conversation?: ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } & {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["conversation"]["createdNs"], keyof Long>]: never; }) | undefined;
            context?: ({
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } & {
                conversationId?: string | undefined;
                metadata?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_1 in Exclude<keyof I["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["conversation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
            consentProofPayload?: ({
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & {
                signature?: string | undefined;
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_3 in Exclude<keyof I["conversation"]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & { [K_4 in Exclude<keyof I["conversation"]["consentProofPayload"], keyof ConsentProofPayload>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["conversation"], keyof ConversationReference>]: never; }) | undefined;
        payload?: Uint8Array | undefined;
    } & { [K_6 in Exclude<keyof I, keyof CreateInviteResponse>]: never; }>(object: I): CreateInviteResponse;
};
export declare const SaveInvitesRequest: {
    encode(message: SaveInvitesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveInvitesRequest;
    fromJSON(object: any): SaveInvitesRequest;
    toJSON(message: SaveInvitesRequest): unknown;
    fromPartial<I extends {
        requests?: {
            contentTopic?: string | undefined;
            timestampNs?: string | number | Long | undefined;
            payload?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            contentTopic?: string | undefined;
            timestampNs?: string | number | Long | undefined;
            payload?: Uint8Array | undefined;
        }[] & ({
            contentTopic?: string | undefined;
            timestampNs?: string | number | Long | undefined;
            payload?: Uint8Array | undefined;
        } & {
            contentTopic?: string | undefined;
            timestampNs?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["requests"][number]["timestampNs"], keyof Long>]: never; }) | undefined;
            payload?: Uint8Array | undefined;
        } & { [K_1 in Exclude<keyof I["requests"][number], keyof SaveInvitesRequest_Request>]: never; })[] & { [K_2 in Exclude<keyof I["requests"], keyof {
            contentTopic?: string | undefined;
            timestampNs?: string | number | Long | undefined;
            payload?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "requests">]: never; }>(object: I): SaveInvitesRequest;
};
export declare const SaveInvitesRequest_Request: {
    encode(message: SaveInvitesRequest_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveInvitesRequest_Request;
    fromJSON(object: any): SaveInvitesRequest_Request;
    toJSON(message: SaveInvitesRequest_Request): unknown;
    fromPartial<I extends {
        contentTopic?: string | undefined;
        timestampNs?: string | number | Long | undefined;
        payload?: Uint8Array | undefined;
    } & {
        contentTopic?: string | undefined;
        timestampNs?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K in Exclude<keyof I["timestampNs"], keyof Long>]: never; }) | undefined;
        payload?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SaveInvitesRequest_Request>]: never; }>(object: I): SaveInvitesRequest_Request;
};
export declare const SaveInvitesResponse: {
    encode(message: SaveInvitesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveInvitesResponse;
    fromJSON(object: any): SaveInvitesResponse;
    toJSON(message: SaveInvitesResponse): unknown;
    fromPartial<I extends {
        responses?: {
            result?: {
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | Long | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    consentProofPayload?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            result?: {
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | Long | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    consentProofPayload?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[] & ({
            result?: {
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | Long | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    consentProofPayload?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        } & {
            result?: ({
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | Long | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    consentProofPayload?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } & {
                conversation?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | Long | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    consentProofPayload?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K in Exclude<keyof I["responses"][number]["result"]["conversation"]["createdNs"], keyof Long>]: never; }) | undefined;
                    context?: ({
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } & {
                        conversationId?: string | undefined;
                        metadata?: ({
                            [x: string]: string | undefined;
                        } & {
                            [x: string]: string | undefined;
                        } & { [K_1 in Exclude<keyof I["responses"][number]["result"]["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2 in Exclude<keyof I["responses"][number]["result"]["conversation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
                    consentProofPayload?: ({
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } & {
                        signature?: string | undefined;
                        timestamp?: string | number | (Long & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | Long) => Long;
                            and: (other: string | number | Long) => Long;
                            compare: (other: string | number | Long) => number;
                            comp: (other: string | number | Long) => number;
                            divide: (divisor: string | number | Long) => Long;
                            div: (divisor: string | number | Long) => Long;
                            equals: (other: string | number | Long) => boolean;
                            eq: (other: string | number | Long) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | Long) => boolean;
                            gt: (other: string | number | Long) => boolean;
                            greaterThanOrEqual: (other: string | number | Long) => boolean;
                            gte: (other: string | number | Long) => boolean;
                            ge: (other: string | number | Long) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | Long) => boolean;
                            lt: (other: string | number | Long) => boolean;
                            lessThanOrEqual: (other: string | number | Long) => boolean;
                            lte: (other: string | number | Long) => boolean;
                            le: (other: string | number | Long) => boolean;
                            modulo: (other: string | number | Long) => Long;
                            mod: (other: string | number | Long) => Long;
                            rem: (other: string | number | Long) => Long;
                            multiply: (multiplier: string | number | Long) => Long;
                            mul: (multiplier: string | number | Long) => Long;
                            negate: () => Long;
                            neg: () => Long;
                            not: () => Long;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | Long) => boolean;
                            neq: (other: string | number | Long) => boolean;
                            ne: (other: string | number | Long) => boolean;
                            or: (other: string | number | Long) => Long;
                            shiftLeft: (numBits: number | Long) => Long;
                            shl: (numBits: number | Long) => Long;
                            shiftRight: (numBits: number | Long) => Long;
                            shr: (numBits: number | Long) => Long;
                            shiftRightUnsigned: (numBits: number | Long) => Long;
                            shru: (numBits: number | Long) => Long;
                            shr_u: (numBits: number | Long) => Long;
                            rotateLeft: (numBits: number | Long) => Long;
                            rotl: (numBits: number | Long) => Long;
                            rotateRight: (numBits: number | Long) => Long;
                            rotr: (numBits: number | Long) => Long;
                            subtract: (subtrahend: string | number | Long) => Long;
                            sub: (subtrahend: string | number | Long) => Long;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => Long;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => Long;
                            xor: (other: string | number | Long) => Long;
                        } & { [K_3 in Exclude<keyof I["responses"][number]["result"]["conversation"]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } & { [K_4 in Exclude<keyof I["responses"][number]["result"]["conversation"]["consentProofPayload"], keyof ConsentProofPayload>]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["responses"][number]["result"]["conversation"], keyof ConversationReference>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["responses"][number]["result"], "conversation">]: never; }) | undefined;
            error?: ({
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } & { [K_7 in Exclude<keyof I["responses"][number]["error"], keyof KeystoreError>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["responses"][number], keyof SaveInvitesResponse_Response>]: never; })[] & { [K_9 in Exclude<keyof I["responses"], keyof {
            result?: {
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | Long | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    consentProofPayload?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            error?: {
                message?: string | undefined;
                code?: ErrorCode | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_10 in Exclude<keyof I, "responses">]: never; }>(object: I): SaveInvitesResponse;
};
export declare const SaveInvitesResponse_Response: {
    encode(message: SaveInvitesResponse_Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveInvitesResponse_Response;
    fromJSON(object: any): SaveInvitesResponse_Response;
    toJSON(message: SaveInvitesResponse_Response): unknown;
    fromPartial<I extends {
        result?: {
            conversation?: {
                topic?: string | undefined;
                peerAddress?: string | undefined;
                createdNs?: string | number | Long | undefined;
                context?: {
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } | undefined;
                consentProofPayload?: {
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        error?: {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } | undefined;
    } & {
        result?: ({
            conversation?: {
                topic?: string | undefined;
                peerAddress?: string | undefined;
                createdNs?: string | number | Long | undefined;
                context?: {
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } | undefined;
                consentProofPayload?: {
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } | undefined;
            } | undefined;
        } & {
            conversation?: ({
                topic?: string | undefined;
                peerAddress?: string | undefined;
                createdNs?: string | number | Long | undefined;
                context?: {
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } | undefined;
                consentProofPayload?: {
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } | undefined;
            } & {
                topic?: string | undefined;
                peerAddress?: string | undefined;
                createdNs?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K in Exclude<keyof I["result"]["conversation"]["createdNs"], keyof Long>]: never; }) | undefined;
                context?: ({
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } & {
                    conversationId?: string | undefined;
                    metadata?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_1 in Exclude<keyof I["result"]["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                } & { [K_2 in Exclude<keyof I["result"]["conversation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
                consentProofPayload?: ({
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } & {
                    signature?: string | undefined;
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_3 in Exclude<keyof I["result"]["conversation"]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } & { [K_4 in Exclude<keyof I["result"]["conversation"]["consentProofPayload"], keyof ConsentProofPayload>]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["result"]["conversation"], keyof ConversationReference>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["result"], "conversation">]: never; }) | undefined;
        error?: ({
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & { [K_7 in Exclude<keyof I["error"], keyof KeystoreError>]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, keyof SaveInvitesResponse_Response>]: never; }>(object: I): SaveInvitesResponse_Response;
};
export declare const SaveInvitesResponse_Response_Success: {
    encode(message: SaveInvitesResponse_Response_Success, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveInvitesResponse_Response_Success;
    fromJSON(object: any): SaveInvitesResponse_Response_Success;
    toJSON(message: SaveInvitesResponse_Response_Success): unknown;
    fromPartial<I extends {
        conversation?: {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } | undefined;
    } & {
        conversation?: ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } & {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["conversation"]["createdNs"], keyof Long>]: never; }) | undefined;
            context?: ({
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } & {
                conversationId?: string | undefined;
                metadata?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_1 in Exclude<keyof I["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["conversation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
            consentProofPayload?: ({
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & {
                signature?: string | undefined;
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_3 in Exclude<keyof I["conversation"]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & { [K_4 in Exclude<keyof I["conversation"]["consentProofPayload"], keyof ConsentProofPayload>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["conversation"], keyof ConversationReference>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "conversation">]: never; }>(object: I): SaveInvitesResponse_Response_Success;
};
export declare const CreateAuthTokenRequest: {
    encode(message: CreateAuthTokenRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CreateAuthTokenRequest;
    fromJSON(object: any): CreateAuthTokenRequest;
    toJSON(message: CreateAuthTokenRequest): unknown;
    fromPartial<I extends {
        timestampNs?: string | number | Long | undefined;
    } & {
        timestampNs?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K in Exclude<keyof I["timestampNs"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "timestampNs">]: never; }>(object: I): CreateAuthTokenRequest;
};
export declare const SaveV1ConversationsRequest: {
    encode(message: SaveV1ConversationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveV1ConversationsRequest;
    fromJSON(object: any): SaveV1ConversationsRequest;
    toJSON(message: SaveV1ConversationsRequest): unknown;
    fromPartial<I extends {
        conversations?: {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        conversations?: ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        }[] & ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } & {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["conversations"][number]["createdNs"], keyof Long>]: never; }) | undefined;
            context?: ({
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } & {
                conversationId?: string | undefined;
                metadata?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_1 in Exclude<keyof I["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["conversations"][number]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
            consentProofPayload?: ({
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & {
                signature?: string | undefined;
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_3 in Exclude<keyof I["conversations"][number]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & { [K_4 in Exclude<keyof I["conversations"][number]["consentProofPayload"], keyof ConsentProofPayload>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["conversations"][number], keyof ConversationReference>]: never; })[] & { [K_6 in Exclude<keyof I["conversations"], keyof {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, "conversations">]: never; }>(object: I): SaveV1ConversationsRequest;
};
export declare const SaveV1ConversationsResponse: {
    encode(_: SaveV1ConversationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SaveV1ConversationsResponse;
    fromJSON(_: any): SaveV1ConversationsResponse;
    toJSON(_: SaveV1ConversationsResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): SaveV1ConversationsResponse;
};
export declare const GetConversationsResponse: {
    encode(message: GetConversationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetConversationsResponse;
    fromJSON(object: any): GetConversationsResponse;
    toJSON(message: GetConversationsResponse): unknown;
    fromPartial<I extends {
        conversations?: {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        conversations?: ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        }[] & ({
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } & {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["conversations"][number]["createdNs"], keyof Long>]: never; }) | undefined;
            context?: ({
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } & {
                conversationId?: string | undefined;
                metadata?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_1 in Exclude<keyof I["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["conversations"][number]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
            consentProofPayload?: ({
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & {
                signature?: string | undefined;
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_3 in Exclude<keyof I["conversations"][number]["consentProofPayload"]["timestamp"], keyof Long>]: never; }) | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & { [K_4 in Exclude<keyof I["conversations"][number]["consentProofPayload"], keyof ConsentProofPayload>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["conversations"][number], keyof ConversationReference>]: never; })[] & { [K_6 in Exclude<keyof I["conversations"], keyof {
            topic?: string | undefined;
            peerAddress?: string | undefined;
            createdNs?: string | number | Long | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            consentProofPayload?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, "conversations">]: never; }>(object: I): GetConversationsResponse;
};
export declare const GetKeystoreStatusRequest: {
    encode(message: GetKeystoreStatusRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetKeystoreStatusRequest;
    fromJSON(object: any): GetKeystoreStatusRequest;
    toJSON(message: GetKeystoreStatusRequest): unknown;
    fromPartial<I extends {
        walletAddress?: string | undefined;
    } & {
        walletAddress?: string | undefined;
    } & { [K in Exclude<keyof I, "walletAddress">]: never; }>(object: I): GetKeystoreStatusRequest;
};
export declare const GetKeystoreStatusResponse: {
    encode(message: GetKeystoreStatusResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetKeystoreStatusResponse;
    fromJSON(object: any): GetKeystoreStatusResponse;
    toJSON(message: GetKeystoreStatusResponse): unknown;
    fromPartial<I extends {
        status?: GetKeystoreStatusResponse_KeystoreStatus | undefined;
    } & {
        status?: GetKeystoreStatusResponse_KeystoreStatus | undefined;
    } & { [K in Exclude<keyof I, "status">]: never; }>(object: I): GetKeystoreStatusResponse;
};
export declare const InitKeystoreRequest: {
    encode(message: InitKeystoreRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): InitKeystoreRequest;
    fromJSON(object: any): InitKeystoreRequest;
    toJSON(message: InitKeystoreRequest): unknown;
    fromPartial<I extends {
        v1?: {
            identityKey?: {
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            preKeys?: {
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        v1?: ({
            identityKey?: {
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            preKeys?: {
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
        } & {
            identityKey?: ({
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K in Exclude<keyof I["v1"]["identityKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                secp256k1?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_1 in Exclude<keyof I["v1"]["identityKey"]["secp256k1"], "bytes">]: never; }) | undefined;
                publicKey?: ({
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_2 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                    signature?: ({
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } & {
                        ecdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_3 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_4 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_5 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_6 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_7 in Exclude<keyof I["v1"]["identityKey"]["publicKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
            } & { [K_8 in Exclude<keyof I["v1"]["identityKey"], keyof import("../../message_contents/private_key.pb").PrivateKey>]: never; }) | undefined;
            preKeys?: ({
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            }[] & ({
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_9 in Exclude<keyof I["v1"]["preKeys"][number]["timestamp"], keyof Long>]: never; }) | undefined;
                secp256k1?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_10 in Exclude<keyof I["v1"]["preKeys"][number]["secp256k1"], "bytes">]: never; }) | undefined;
                publicKey?: ({
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_11 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["timestamp"], keyof Long>]: never; }) | undefined;
                    signature?: ({
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } & {
                        ecdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_12 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_13 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_14 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_15 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_16 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"], keyof import("../../message_contents/public_key.pb").PublicKey>]: never; }) | undefined;
            } & { [K_17 in Exclude<keyof I["v1"]["preKeys"][number], keyof import("../../message_contents/private_key.pb").PrivateKey>]: never; })[] & { [K_18 in Exclude<keyof I["v1"]["preKeys"], keyof {
                timestamp?: string | number | Long | undefined;
                secp256k1?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                publicKey?: {
                    timestamp?: string | number | Long | undefined;
                    signature?: {
                        ecdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                        walletEcdsaCompact?: {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } | undefined;
                    } | undefined;
                    secp256k1Uncompressed?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_19 in Exclude<keyof I["v1"], keyof PrivateKeyBundleV1>]: never; }) | undefined;
    } & { [K_20 in Exclude<keyof I, "v1">]: never; }>(object: I): InitKeystoreRequest;
};
export declare const InitKeystoreResponse: {
    encode(message: InitKeystoreResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): InitKeystoreResponse;
    fromJSON(object: any): InitKeystoreResponse;
    toJSON(message: InitKeystoreResponse): unknown;
    fromPartial<I extends {
        error?: {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } | undefined;
    } & {
        error?: ({
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & {
            message?: string | undefined;
            code?: ErrorCode | undefined;
        } & { [K in Exclude<keyof I["error"], keyof KeystoreError>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "error">]: never; }>(object: I): InitKeystoreResponse;
};
export declare const SignDigestRequest: {
    encode(message: SignDigestRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignDigestRequest;
    fromJSON(object: any): SignDigestRequest;
    toJSON(message: SignDigestRequest): unknown;
    fromPartial<I extends {
        digest?: Uint8Array | undefined;
        identityKey?: boolean | undefined;
        prekeyIndex?: number | undefined;
    } & {
        digest?: Uint8Array | undefined;
        identityKey?: boolean | undefined;
        prekeyIndex?: number | undefined;
    } & { [K in Exclude<keyof I, keyof SignDigestRequest>]: never; }>(object: I): SignDigestRequest;
};
export declare const GetRefreshJobRequest: {
    encode(message: GetRefreshJobRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetRefreshJobRequest;
    fromJSON(object: any): GetRefreshJobRequest;
    toJSON(message: GetRefreshJobRequest): unknown;
    fromPartial<I extends {
        jobType?: JobType | undefined;
    } & {
        jobType?: JobType | undefined;
    } & { [K in Exclude<keyof I, "jobType">]: never; }>(object: I): GetRefreshJobRequest;
};
export declare const GetRefreshJobResponse: {
    encode(message: GetRefreshJobResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetRefreshJobResponse;
    fromJSON(object: any): GetRefreshJobResponse;
    toJSON(message: GetRefreshJobResponse): unknown;
    fromPartial<I extends {
        lastRunNs?: string | number | Long | undefined;
    } & {
        lastRunNs?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K in Exclude<keyof I["lastRunNs"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "lastRunNs">]: never; }>(object: I): GetRefreshJobResponse;
};
export declare const SetRefeshJobRequest: {
    encode(message: SetRefeshJobRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SetRefeshJobRequest;
    fromJSON(object: any): SetRefeshJobRequest;
    toJSON(message: SetRefeshJobRequest): unknown;
    fromPartial<I extends {
        jobType?: JobType | undefined;
        lastRunNs?: string | number | Long | undefined;
    } & {
        jobType?: JobType | undefined;
        lastRunNs?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K in Exclude<keyof I["lastRunNs"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SetRefeshJobRequest>]: never; }>(object: I): SetRefeshJobRequest;
};
export declare const SetRefreshJobResponse: {
    encode(_: SetRefreshJobResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SetRefreshJobResponse;
    fromJSON(_: any): SetRefreshJobResponse;
    toJSON(_: SetRefreshJobResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): SetRefreshJobResponse;
};
export declare const TopicMap: {
    encode(message: TopicMap, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TopicMap;
    fromJSON(object: any): TopicMap;
    toJSON(message: TopicMap): unknown;
    fromPartial<I extends {
        topics?: {
            [x: string]: {
                createdNs?: string | number | Long | undefined;
                peerAddress?: string | undefined;
                invitation?: {
                    topic?: string | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    aes256GcmHkdfSha256?: {
                        keyMaterial?: Uint8Array | undefined;
                    } | undefined;
                    consentProof?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        topics?: ({
            [x: string]: {
                createdNs?: string | number | Long | undefined;
                peerAddress?: string | undefined;
                invitation?: {
                    topic?: string | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    aes256GcmHkdfSha256?: {
                        keyMaterial?: Uint8Array | undefined;
                    } | undefined;
                    consentProof?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            [x: string]: ({
                createdNs?: string | number | Long | undefined;
                peerAddress?: string | undefined;
                invitation?: {
                    topic?: string | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    aes256GcmHkdfSha256?: {
                        keyMaterial?: Uint8Array | undefined;
                    } | undefined;
                    consentProof?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } | undefined;
            } & {
                createdNs?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K in Exclude<keyof I["topics"][string]["createdNs"], keyof Long>]: never; }) | undefined;
                peerAddress?: string | undefined;
                invitation?: ({
                    topic?: string | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                    aes256GcmHkdfSha256?: {
                        keyMaterial?: Uint8Array | undefined;
                    } | undefined;
                    consentProof?: {
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    context?: ({
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } & {
                        conversationId?: string | undefined;
                        metadata?: ({
                            [x: string]: string | undefined;
                        } & {
                            [x: string]: string | undefined;
                        } & { [K_1 in Exclude<keyof I["topics"][string]["invitation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2 in Exclude<keyof I["topics"][string]["invitation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
                    aes256GcmHkdfSha256?: ({
                        keyMaterial?: Uint8Array | undefined;
                    } & {
                        keyMaterial?: Uint8Array | undefined;
                    } & { [K_3 in Exclude<keyof I["topics"][string]["invitation"]["aes256GcmHkdfSha256"], "keyMaterial">]: never; }) | undefined;
                    consentProof?: ({
                        signature?: string | undefined;
                        timestamp?: string | number | Long | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } & {
                        signature?: string | undefined;
                        timestamp?: string | number | (Long & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | Long) => Long;
                            and: (other: string | number | Long) => Long;
                            compare: (other: string | number | Long) => number;
                            comp: (other: string | number | Long) => number;
                            divide: (divisor: string | number | Long) => Long;
                            div: (divisor: string | number | Long) => Long;
                            equals: (other: string | number | Long) => boolean;
                            eq: (other: string | number | Long) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | Long) => boolean;
                            gt: (other: string | number | Long) => boolean;
                            greaterThanOrEqual: (other: string | number | Long) => boolean;
                            gte: (other: string | number | Long) => boolean;
                            ge: (other: string | number | Long) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | Long) => boolean;
                            lt: (other: string | number | Long) => boolean;
                            lessThanOrEqual: (other: string | number | Long) => boolean;
                            lte: (other: string | number | Long) => boolean;
                            le: (other: string | number | Long) => boolean;
                            modulo: (other: string | number | Long) => Long;
                            mod: (other: string | number | Long) => Long;
                            rem: (other: string | number | Long) => Long;
                            multiply: (multiplier: string | number | Long) => Long;
                            mul: (multiplier: string | number | Long) => Long;
                            negate: () => Long;
                            neg: () => Long;
                            not: () => Long;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | Long) => boolean;
                            neq: (other: string | number | Long) => boolean;
                            ne: (other: string | number | Long) => boolean;
                            or: (other: string | number | Long) => Long;
                            shiftLeft: (numBits: number | Long) => Long;
                            shl: (numBits: number | Long) => Long;
                            shiftRight: (numBits: number | Long) => Long;
                            shr: (numBits: number | Long) => Long;
                            shiftRightUnsigned: (numBits: number | Long) => Long;
                            shru: (numBits: number | Long) => Long;
                            shr_u: (numBits: number | Long) => Long;
                            rotateLeft: (numBits: number | Long) => Long;
                            rotl: (numBits: number | Long) => Long;
                            rotateRight: (numBits: number | Long) => Long;
                            rotr: (numBits: number | Long) => Long;
                            subtract: (subtrahend: string | number | Long) => Long;
                            sub: (subtrahend: string | number | Long) => Long;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => Long;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => Long;
                            xor: (other: string | number | Long) => Long;
                        } & { [K_4 in Exclude<keyof I["topics"][string]["invitation"]["consentProof"]["timestamp"], keyof Long>]: never; }) | undefined;
                        payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                    } & { [K_5 in Exclude<keyof I["topics"][string]["invitation"]["consentProof"], keyof ConsentProofPayload>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["topics"][string]["invitation"], keyof InvitationV1>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["topics"][string], keyof TopicMap_TopicData>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["topics"], string | number>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, "topics">]: never; }>(object: I): TopicMap;
};
export declare const TopicMap_TopicData: {
    encode(message: TopicMap_TopicData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TopicMap_TopicData;
    fromJSON(object: any): TopicMap_TopicData;
    toJSON(message: TopicMap_TopicData): unknown;
    fromPartial<I extends {
        createdNs?: string | number | Long | undefined;
        peerAddress?: string | undefined;
        invitation?: {
            topic?: string | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            aes256GcmHkdfSha256?: {
                keyMaterial?: Uint8Array | undefined;
            } | undefined;
            consentProof?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } | undefined;
    } & {
        createdNs?: string | number | (Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long) => Long;
            and: (other: string | number | Long) => Long;
            compare: (other: string | number | Long) => number;
            comp: (other: string | number | Long) => number;
            divide: (divisor: string | number | Long) => Long;
            div: (divisor: string | number | Long) => Long;
            equals: (other: string | number | Long) => boolean;
            eq: (other: string | number | Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long) => boolean;
            gt: (other: string | number | Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long) => boolean;
            gte: (other: string | number | Long) => boolean;
            ge: (other: string | number | Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            eqz: () => boolean;
            lessThan: (other: string | number | Long) => boolean;
            lt: (other: string | number | Long) => boolean;
            lessThanOrEqual: (other: string | number | Long) => boolean;
            lte: (other: string | number | Long) => boolean;
            le: (other: string | number | Long) => boolean;
            modulo: (other: string | number | Long) => Long;
            mod: (other: string | number | Long) => Long;
            rem: (other: string | number | Long) => Long;
            multiply: (multiplier: string | number | Long) => Long;
            mul: (multiplier: string | number | Long) => Long;
            negate: () => Long;
            neg: () => Long;
            not: () => Long;
            countLeadingZeros: () => number;
            clz: () => number;
            countTrailingZeros: () => number;
            ctz: () => number;
            notEquals: (other: string | number | Long) => boolean;
            neq: (other: string | number | Long) => boolean;
            ne: (other: string | number | Long) => boolean;
            or: (other: string | number | Long) => Long;
            shiftLeft: (numBits: number | Long) => Long;
            shl: (numBits: number | Long) => Long;
            shiftRight: (numBits: number | Long) => Long;
            shr: (numBits: number | Long) => Long;
            shiftRightUnsigned: (numBits: number | Long) => Long;
            shru: (numBits: number | Long) => Long;
            shr_u: (numBits: number | Long) => Long;
            rotateLeft: (numBits: number | Long) => Long;
            rotl: (numBits: number | Long) => Long;
            rotateRight: (numBits: number | Long) => Long;
            rotr: (numBits: number | Long) => Long;
            subtract: (subtrahend: string | number | Long) => Long;
            sub: (subtrahend: string | number | Long) => Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long;
            xor: (other: string | number | Long) => Long;
        } & { [K in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
        peerAddress?: string | undefined;
        invitation?: ({
            topic?: string | undefined;
            context?: {
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } | undefined;
            aes256GcmHkdfSha256?: {
                keyMaterial?: Uint8Array | undefined;
            } | undefined;
            consentProof?: {
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } | undefined;
        } & {
            topic?: string | undefined;
            context?: ({
                conversationId?: string | undefined;
                metadata?: {
                    [x: string]: string | undefined;
                } | undefined;
            } & {
                conversationId?: string | undefined;
                metadata?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_1 in Exclude<keyof I["invitation"]["context"]["metadata"], string | number>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["invitation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
            aes256GcmHkdfSha256?: ({
                keyMaterial?: Uint8Array | undefined;
            } & {
                keyMaterial?: Uint8Array | undefined;
            } & { [K_3 in Exclude<keyof I["invitation"]["aes256GcmHkdfSha256"], "keyMaterial">]: never; }) | undefined;
            consentProof?: ({
                signature?: string | undefined;
                timestamp?: string | number | Long | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & {
                signature?: string | undefined;
                timestamp?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_4 in Exclude<keyof I["invitation"]["consentProof"]["timestamp"], keyof Long>]: never; }) | undefined;
                payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
            } & { [K_5 in Exclude<keyof I["invitation"]["consentProof"], keyof ConsentProofPayload>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["invitation"], keyof InvitationV1>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof TopicMap_TopicData>]: never; }>(object: I): TopicMap_TopicData;
};
export declare const TopicMap_TopicsEntry: {
    encode(message: TopicMap_TopicsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TopicMap_TopicsEntry;
    fromJSON(object: any): TopicMap_TopicsEntry;
    toJSON(message: TopicMap_TopicsEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: {
            createdNs?: string | number | Long | undefined;
            peerAddress?: string | undefined;
            invitation?: {
                topic?: string | undefined;
                context?: {
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } | undefined;
                aes256GcmHkdfSha256?: {
                    keyMaterial?: Uint8Array | undefined;
                } | undefined;
                consentProof?: {
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        key?: string | undefined;
        value?: ({
            createdNs?: string | number | Long | undefined;
            peerAddress?: string | undefined;
            invitation?: {
                topic?: string | undefined;
                context?: {
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } | undefined;
                aes256GcmHkdfSha256?: {
                    keyMaterial?: Uint8Array | undefined;
                } | undefined;
                consentProof?: {
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } | undefined;
            } | undefined;
        } & {
            createdNs?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["value"]["createdNs"], keyof Long>]: never; }) | undefined;
            peerAddress?: string | undefined;
            invitation?: ({
                topic?: string | undefined;
                context?: {
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } | undefined;
                aes256GcmHkdfSha256?: {
                    keyMaterial?: Uint8Array | undefined;
                } | undefined;
                consentProof?: {
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } | undefined;
            } & {
                topic?: string | undefined;
                context?: ({
                    conversationId?: string | undefined;
                    metadata?: {
                        [x: string]: string | undefined;
                    } | undefined;
                } & {
                    conversationId?: string | undefined;
                    metadata?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_1 in Exclude<keyof I["value"]["invitation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                } & { [K_2 in Exclude<keyof I["value"]["invitation"]["context"], keyof InvitationV1_Context>]: never; }) | undefined;
                aes256GcmHkdfSha256?: ({
                    keyMaterial?: Uint8Array | undefined;
                } & {
                    keyMaterial?: Uint8Array | undefined;
                } & { [K_3 in Exclude<keyof I["value"]["invitation"]["aes256GcmHkdfSha256"], "keyMaterial">]: never; }) | undefined;
                consentProof?: ({
                    signature?: string | undefined;
                    timestamp?: string | number | Long | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } & {
                    signature?: string | undefined;
                    timestamp?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_4 in Exclude<keyof I["value"]["invitation"]["consentProof"]["timestamp"], keyof Long>]: never; }) | undefined;
                    payloadVersion?: import("../../message_contents/invitation.pb").ConsentProofPayloadVersion | undefined;
                } & { [K_5 in Exclude<keyof I["value"]["invitation"]["consentProof"], keyof ConsentProofPayload>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["value"]["invitation"], keyof InvitationV1>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["value"], keyof TopicMap_TopicData>]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, keyof TopicMap_TopicsEntry>]: never; }>(object: I): TopicMap_TopicsEntry;
};
export declare const GetConversationHmacKeysRequest: {
    encode(message: GetConversationHmacKeysRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetConversationHmacKeysRequest;
    fromJSON(object: any): GetConversationHmacKeysRequest;
    toJSON(message: GetConversationHmacKeysRequest): unknown;
    fromPartial<I extends {
        topics?: string[] | undefined;
    } & {
        topics?: (string[] & string[] & { [K in Exclude<keyof I["topics"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "topics">]: never; }>(object: I): GetConversationHmacKeysRequest;
};
export declare const GetConversationHmacKeysResponse: {
    encode(message: GetConversationHmacKeysResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetConversationHmacKeysResponse;
    fromJSON(object: any): GetConversationHmacKeysResponse;
    toJSON(message: GetConversationHmacKeysResponse): unknown;
    fromPartial<I extends {
        hmacKeys?: {
            [x: string]: {
                values?: {
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
    } & {
        hmacKeys?: ({
            [x: string]: {
                values?: {
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            [x: string]: ({
                values?: {
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                values?: ({
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                }[] & ({
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                } & {
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                } & { [K in Exclude<keyof I["hmacKeys"][string]["values"][number], keyof GetConversationHmacKeysResponse_HmacKeyData>]: never; })[] & { [K_1 in Exclude<keyof I["hmacKeys"][string]["values"], keyof {
                    thirtyDayPeriodsSinceEpoch?: number | undefined;
                    hmacKey?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["hmacKeys"][string], "values">]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["hmacKeys"], string | number>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "hmacKeys">]: never; }>(object: I): GetConversationHmacKeysResponse;
};
export declare const GetConversationHmacKeysResponse_HmacKeyData: {
    encode(message: GetConversationHmacKeysResponse_HmacKeyData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetConversationHmacKeysResponse_HmacKeyData;
    fromJSON(object: any): GetConversationHmacKeysResponse_HmacKeyData;
    toJSON(message: GetConversationHmacKeysResponse_HmacKeyData): unknown;
    fromPartial<I extends {
        thirtyDayPeriodsSinceEpoch?: number | undefined;
        hmacKey?: Uint8Array | undefined;
    } & {
        thirtyDayPeriodsSinceEpoch?: number | undefined;
        hmacKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof GetConversationHmacKeysResponse_HmacKeyData>]: never; }>(object: I): GetConversationHmacKeysResponse_HmacKeyData;
};
export declare const GetConversationHmacKeysResponse_HmacKeys: {
    encode(message: GetConversationHmacKeysResponse_HmacKeys, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetConversationHmacKeysResponse_HmacKeys;
    fromJSON(object: any): GetConversationHmacKeysResponse_HmacKeys;
    toJSON(message: GetConversationHmacKeysResponse_HmacKeys): unknown;
    fromPartial<I extends {
        values?: {
            thirtyDayPeriodsSinceEpoch?: number | undefined;
            hmacKey?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        values?: ({
            thirtyDayPeriodsSinceEpoch?: number | undefined;
            hmacKey?: Uint8Array | undefined;
        }[] & ({
            thirtyDayPeriodsSinceEpoch?: number | undefined;
            hmacKey?: Uint8Array | undefined;
        } & {
            thirtyDayPeriodsSinceEpoch?: number | undefined;
            hmacKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["values"][number], keyof GetConversationHmacKeysResponse_HmacKeyData>]: never; })[] & { [K_1 in Exclude<keyof I["values"], keyof {
            thirtyDayPeriodsSinceEpoch?: number | undefined;
            hmacKey?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "values">]: never; }>(object: I): GetConversationHmacKeysResponse_HmacKeys;
};
export declare const GetConversationHmacKeysResponse_HmacKeysEntry: {
    encode(message: GetConversationHmacKeysResponse_HmacKeysEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetConversationHmacKeysResponse_HmacKeysEntry;
    fromJSON(object: any): GetConversationHmacKeysResponse_HmacKeysEntry;
    toJSON(message: GetConversationHmacKeysResponse_HmacKeysEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: {
            values?: {
                thirtyDayPeriodsSinceEpoch?: number | undefined;
                hmacKey?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        key?: string | undefined;
        value?: ({
            values?: {
                thirtyDayPeriodsSinceEpoch?: number | undefined;
                hmacKey?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            values?: ({
                thirtyDayPeriodsSinceEpoch?: number | undefined;
                hmacKey?: Uint8Array | undefined;
            }[] & ({
                thirtyDayPeriodsSinceEpoch?: number | undefined;
                hmacKey?: Uint8Array | undefined;
            } & {
                thirtyDayPeriodsSinceEpoch?: number | undefined;
                hmacKey?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["value"]["values"][number], keyof GetConversationHmacKeysResponse_HmacKeyData>]: never; })[] & { [K_1 in Exclude<keyof I["value"]["values"], keyof {
                thirtyDayPeriodsSinceEpoch?: number | undefined;
                hmacKey?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["value"], "values">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof GetConversationHmacKeysResponse_HmacKeysEntry>]: never; }>(object: I): GetConversationHmacKeysResponse_HmacKeysEntry;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
