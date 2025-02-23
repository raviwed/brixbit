import { signature, publicKey, ciphertext, privateKey, authn, keystore, messageApi, invitation, content, privatePreferences, message } from '@brixbit/proto';
import { NotifyStreamEntityArrival } from '@brixbit/proto/ts/dist/types/fetch.pb';
import * as long from 'long';
import long__default from 'long';
import { WalletClient } from 'viem';
import * as _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb from '@brixbit/proto/ts/dist/types/message_contents/conversation_reference.pb';
import * as _brixbit_proto_ts_dist_types_message_contents_invitation_pb from '@brixbit/proto/ts/dist/types/message_contents/invitation.pb';
import * as _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb from '@brixbit/proto/ts/dist/types/message_contents/ciphertext.pb';
import { Reader, Writer } from 'protobufjs/minimal';
import { Envelope } from '@brixbit/proto/ts/dist/types/message_api/v1/message_api.pb';
import * as _brixbit_proto_ts_dist_types_message_contents_private_key_pb from '@brixbit/proto/ts/dist/types/message_contents/private_key.pb';
import * as _brixbit_proto_ts_dist_types_message_contents_public_key_pb from '@brixbit/proto/ts/dist/types/message_contents/public_key.pb';
import * as _brixbit_proto_ts_dist_types_message_contents_signature_pb from '@brixbit/proto/ts/dist/types/message_contents/signature.pb';
import * as _brixbit_proto_ts_dist_types_message_api_v1_authn_pb from '@brixbit/proto/ts/dist/types/message_api/v1/authn.pb';

interface Signer {
    getAddress(): Promise<string>;
    signMessage(message: ArrayLike<number> | string): Promise<string>;
}

type ECDSACompactWithRecovery = {
    bytes: Uint8Array;
    recovery: number;
};
declare class Signature implements signature.Signature {
    ecdsaCompact: ECDSACompactWithRecovery | undefined;
    walletEcdsaCompact: ECDSACompactWithRecovery | undefined;
    constructor(obj: Partial<signature.Signature>);
    signerKey(key: SignedPublicKey): Promise<UnsignedPublicKey | undefined>;
    getPublicKey(digest: Uint8Array): PublicKey | undefined;
    equals(other: Signature): boolean;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): Signature;
}
interface KeySigner {
    signKey(key: UnsignedPublicKey): Promise<SignedPublicKey>;
}

type secp256k1Uncompressed = {
    bytes: Uint8Array;
};
declare class UnsignedPublicKey implements publicKey.UnsignedPublicKey {
    createdNs: long__default;
    secp256k1Uncompressed: secp256k1Uncompressed;
    constructor(obj: publicKey.UnsignedPublicKey);
    generated(): Date | undefined;
    isFromLegacyKey(): boolean;
    get timestamp(): long__default;
    verify(signature: Signature, digest: Uint8Array): boolean;
    verifyKey(pub: PublicKey | SignedPublicKey): Promise<boolean>;
    equals(other: this): boolean;
    getEthereumAddress(): string;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): UnsignedPublicKey;
}
declare class SignedPublicKey extends UnsignedPublicKey implements publicKey.SignedPublicKey {
    keyBytes: Uint8Array;
    signature: Signature;
    constructor(obj: publicKey.SignedPublicKey);
    get unsignedKey(): UnsignedPublicKey;
    signerKey(): Promise<UnsignedPublicKey | undefined>;
    walletSignatureAddress(): Promise<string>;
    equals(other: this): boolean;
    bytesToSign(): Uint8Array;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): SignedPublicKey;
    toLegacyKey(): PublicKey;
    static fromLegacyKey(legacyKey: PublicKey, signedByWallet?: boolean): SignedPublicKey;
}
declare class PublicKey extends UnsignedPublicKey implements publicKey.PublicKey {
    signature?: Signature;
    constructor(obj: publicKey.PublicKey);
    get timestamp(): long__default;
    bytesToSign(): Uint8Array;
    signWithWallet(wallet: Signer): Promise<void>;
    walletSignatureAddress(): string;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): PublicKey;
}

declare class SignedPublicKeyBundle implements publicKey.SignedPublicKeyBundle {
    identityKey: SignedPublicKey;
    preKey: SignedPublicKey;
    constructor(bundle: publicKey.SignedPublicKeyBundle);
    walletSignatureAddress(): Promise<string>;
    equals(other: this): boolean;
    toBytes(): Uint8Array;
    isFromLegacyBundle(): boolean;
    toLegacyBundle(): PublicKeyBundle;
    static fromBytes(bytes: Uint8Array): SignedPublicKeyBundle;
    static fromLegacyBundle(bundle: PublicKeyBundle): SignedPublicKeyBundle;
}
declare class PublicKeyBundle implements publicKey.PublicKeyBundle {
    identityKey: PublicKey;
    preKey: PublicKey;
    constructor(bundle: publicKey.PublicKeyBundle);
    equals(other: this): boolean;
    walletSignatureAddress(): string;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): PublicKeyBundle;
}

declare class Ciphertext implements ciphertext.Ciphertext {
    aes256GcmHkdfSha256: ciphertext.Ciphertext_Aes256gcmHkdfsha256 | undefined;
    constructor(obj: ciphertext.Ciphertext);
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): Ciphertext;
}

type secp256k1 = {
    bytes: Uint8Array;
};
declare class SignedPrivateKey implements privateKey.SignedPrivateKey, KeySigner {
    createdNs: long__default;
    secp256k1: secp256k1;
    publicKey: SignedPublicKey;
    constructor(obj: privateKey.SignedPrivateKey);
    static generate(signer: KeySigner): Promise<SignedPrivateKey>;
    generated(): Date | undefined;
    sign(digest: Uint8Array): Promise<Signature>;
    signKey(pub: UnsignedPublicKey): Promise<SignedPublicKey>;
    static signerKey(key: SignedPublicKey, signature: ECDSACompactWithRecovery): Promise<UnsignedPublicKey | undefined>;
    sharedSecret(peer: SignedPublicKey | UnsignedPublicKey): Uint8Array;
    encrypt(plain: Uint8Array, peer: UnsignedPublicKey, additionalData?: Uint8Array): Promise<Ciphertext>;
    decrypt(encrypted: Ciphertext, peer: UnsignedPublicKey, additionalData?: Uint8Array): Promise<Uint8Array>;
    matches(key: SignedPublicKey): boolean;
    equals(other: this): boolean;
    toBytes(): Uint8Array;
    validatePublicKey(): boolean;
    static fromBytes(bytes: Uint8Array): SignedPrivateKey;
    static fromLegacyKey(key: PrivateKey, signedByWallet?: boolean): SignedPrivateKey;
}
declare class PrivateKey implements privateKey.PrivateKey {
    timestamp: long__default;
    secp256k1: secp256k1;
    publicKey: PublicKey;
    constructor(obj: privateKey.PrivateKey);
    static generate(): PrivateKey;
    generated(): Date | undefined;
    sign(digest: Uint8Array): Promise<Signature>;
    signKey(pub: PublicKey): Promise<PublicKey>;
    sharedSecret(peer: PublicKey | SignedPublicKey): Uint8Array;
    encrypt(plain: Uint8Array, peer: PublicKey, additionalData?: Uint8Array): Promise<Ciphertext>;
    decrypt(encrypted: Ciphertext, peer: PublicKey, additionalData?: Uint8Array): Promise<Uint8Array>;
    matches(key: PublicKey): boolean;
    validatePublicKey(): boolean;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): PrivateKey;
}

declare class PrivateKeyBundleV2 implements privateKey.PrivateKeyBundleV2 {
    identityKey: SignedPrivateKey;
    preKeys: SignedPrivateKey[];
    version: number;
    private _publicKeyBundle?;
    constructor(bundle: privateKey.PrivateKeyBundleV2);
    static generate(wallet: Signer): Promise<PrivateKeyBundleV2>;
    getCurrentPreKey(): SignedPrivateKey;
    findPreKey(which: SignedPublicKey): SignedPrivateKey;
    addPreKey(): Promise<void>;
    getPublicKeyBundle(): SignedPublicKeyBundle;
    sharedSecret(peer: SignedPublicKeyBundle, myPreKey: SignedPublicKey, isRecipient: boolean): Promise<Uint8Array>;
    encode(): Uint8Array;
    validatePublicKeys(): boolean;
    equals(other: this): boolean;
    static fromLegacyBundle(bundle: PrivateKeyBundleV1): PrivateKeyBundleV2;
}
declare class PrivateKeyBundleV1 implements privateKey.PrivateKeyBundleV1 {
    identityKey: PrivateKey;
    preKeys: PrivateKey[];
    version: number;
    private _publicKeyBundle?;
    constructor(bundle: privateKey.PrivateKeyBundleV1);
    static generate(wallet?: Signer): Promise<PrivateKeyBundleV1>;
    getCurrentPreKey(): PrivateKey;
    findPreKey(which: PublicKey): PrivateKey;
    addPreKey(): Promise<void>;
    getPublicKeyBundle(): PublicKeyBundle;
    validatePublicKeys(): boolean;
    sharedSecret(peer: PublicKeyBundle | SignedPublicKeyBundle, myPreKey: PublicKey, isRecipient: boolean): Promise<Uint8Array>;
    encode(): Uint8Array;
}
type PrivateKeyBundle = PrivateKeyBundleV1 | PrivateKeyBundleV2;

declare function encrypt(plain: Uint8Array, secret: Uint8Array, additionalData?: Uint8Array): Promise<Ciphertext>;
declare function decrypt(encrypted: Ciphertext | ciphertext.Ciphertext, secret: Uint8Array, additionalData?: Uint8Array): Promise<Uint8Array>;

declare class AuthData implements authn.AuthData {
    walletAddr: string;
    createdNs: long__default;
    constructor({ walletAddr, createdNs }: authn.AuthData);
    static create(walletAddr: string, timestamp?: Date): AuthData;
    static fromBytes(bytes: Uint8Array): AuthData;
    toBytes(): Uint8Array;
}

declare class Token implements authn.Token {
    identityKey: publicKey.PublicKey;
    authDataBytes: Uint8Array;
    authDataSignature: signature.Signature;
    private _authData?;
    constructor({ identityKey, authDataBytes, authDataSignature }: authn.Token);
    get authData(): AuthData;
    get ageMs(): number;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): Token;
    toBase64(): string;
}

declare class LocalAuthenticator {
    private identityKey;
    constructor(identityKey: PrivateKey);
    createToken(timestamp?: Date): Promise<Token>;
}

type Flatten<T> = {
    [K in keyof T]: T[K];
};
type WithoutUndefined<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};

type KeystoreRPCCodec<T = any> = {
    decode(input: Reader | Uint8Array, length?: number): T;
    encode(message: T, writer?: Writer): Writer;
};
type KeystoreRPC<Request = any, Response = any> = {
    req: KeystoreRPCCodec<Request> | null;
    res: KeystoreRPCCodec<Response>;
};
type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
type Values<T> = {
    [K in keyof T]: T[K];
}[keyof T];
type ApiDefs = {
    [key: string]: KeystoreRPC;
};
type ApiInterface = {
    [key: string]: (...args: any[]) => any;
};
type OtherKeyStoreMethods = {
    /**
     * Get the account address of the wallet used to create the Keystore
     */
    getAccountAddress(): Promise<string>;
};
type ExtractInterface<T extends ApiDefs> = Flatten<{
    [K in keyof T]: T[K] extends KeystoreRPC<infer Req, infer Res> ? T[K]['req'] extends null ? () => Promise<Res> : (req: Req) => Promise<Res> : never;
} & OtherKeyStoreMethods>;
type ExtractInterfaceRequestEncoders<T extends ApiDefs> = {
    [K in keyof T]: T[K]['req'] extends KeystoreRPCCodec ? T[K]['req']['encode'] : never;
};
type ExtractInterfaceResponseDecoders<T extends ApiDefs> = {
    [K in keyof T]: T[K]['res'] extends KeystoreRPCCodec ? T[K]['res']['decode'] : never;
};
type ExtractInterfaceRequestValues<T extends ApiInterface> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? Parameters<T[K]>[0] : never;
};
declare const apiDefs: {
    /**
     * Decrypt a batch of V1 messages
     */
    decryptV1: {
        req: {
            encode(message: keystore.DecryptV1Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptV1Request;
            fromJSON(object: any): keystore.DecryptV1Request;
            toJSON(message: keystore.DecryptV1Request): unknown;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                        } & { [K in Exclude<keyof I["requests"][number]["payload"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                    } & { [K_1 in Exclude<keyof I["requests"][number]["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    peerKeys?: ({
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_2 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_3 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_4 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_5 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_6 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_7 in Exclude<keyof I["requests"][number]["peerKeys"]["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                        preKey?: ({
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_8 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_9 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_10 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_11 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_12 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_13 in Exclude<keyof I["requests"][number]["peerKeys"]["preKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                    } & { [K_14 in Exclude<keyof I["requests"][number]["peerKeys"], keyof publicKey.PublicKeyBundle>]: never; }) | undefined;
                    headerBytes?: Uint8Array | undefined;
                    isSender?: boolean | undefined;
                } & { [K_15 in Exclude<keyof I["requests"][number], keyof keystore.DecryptV1Request_Request>]: never; })[] & { [K_16 in Exclude<keyof I["requests"], keyof {
                    payload?: {
                        aes256GcmHkdfSha256?: {
                            hkdfSalt?: Uint8Array | undefined;
                            gcmNonce?: Uint8Array | undefined;
                            payload?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    peerKeys?: {
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
            } & { [K_17 in Exclude<keyof I, "requests">]: never; }>(object: I): keystore.DecryptV1Request;
        };
        res: {
            encode(message: keystore.DecryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptResponse;
            fromJSON(object: any): keystore.DecryptResponse;
            toJSON(message: keystore.DecryptResponse): unknown;
            fromPartial<I_1 extends {
                responses?: {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        decrypted?: Uint8Array | undefined;
                    } & {
                        decrypted?: Uint8Array | undefined;
                    } & { [K_18 in Exclude<keyof I_1["responses"][number]["result"], "decrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_1 in Exclude<keyof I_1["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_1 in Exclude<keyof I_1["responses"][number], keyof keystore.DecryptResponse_Response>]: never; })[] & { [K_3_1 in Exclude<keyof I_1["responses"], keyof {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_1 in Exclude<keyof I_1, "responses">]: never; }>(object: I_1): keystore.DecryptResponse;
        };
    };
    /**
     * Decrypt a batch of V2 messages
     */
    decryptV2: {
        req: {
            encode(message: keystore.DecryptV2Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptV2Request;
            fromJSON(object: any): keystore.DecryptV2Request;
            toJSON(message: keystore.DecryptV2Request): unknown;
            fromPartial<I_2 extends {
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
                        } & { [K_19 in Exclude<keyof I_2["requests"][number]["payload"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                    } & { [K_1_2 in Exclude<keyof I_2["requests"][number]["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    headerBytes?: Uint8Array | undefined;
                    contentTopic?: string | undefined;
                } & { [K_2_2 in Exclude<keyof I_2["requests"][number], keyof keystore.DecryptV2Request_Request>]: never; })[] & { [K_3_2 in Exclude<keyof I_2["requests"], keyof {
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
            } & { [K_4_2 in Exclude<keyof I_2, "requests">]: never; }>(object: I_2): keystore.DecryptV2Request;
        };
        res: {
            encode(message: keystore.DecryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptResponse;
            fromJSON(object: any): keystore.DecryptResponse;
            toJSON(message: keystore.DecryptResponse): unknown;
            fromPartial<I_1 extends {
                responses?: {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        decrypted?: Uint8Array | undefined;
                    } & {
                        decrypted?: Uint8Array | undefined;
                    } & { [K_18 in Exclude<keyof I_1["responses"][number]["result"], "decrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_1 in Exclude<keyof I_1["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_1 in Exclude<keyof I_1["responses"][number], keyof keystore.DecryptResponse_Response>]: never; })[] & { [K_3_1 in Exclude<keyof I_1["responses"], keyof {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_1 in Exclude<keyof I_1, "responses">]: never; }>(object: I_1): keystore.DecryptResponse;
        };
    };
    /**
     * Encrypt a batch of V1 messages
     */
    encryptV1: {
        req: {
            encode(message: keystore.EncryptV1Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptV1Request;
            fromJSON(object: any): keystore.EncryptV1Request;
            toJSON(message: keystore.EncryptV1Request): unknown;
            fromPartial<I_3 extends {
                requests?: {
                    recipient?: {
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_20 in Exclude<keyof I_3["requests"][number]["recipient"]["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_1_3 in Exclude<keyof I_3["requests"][number]["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_2_3 in Exclude<keyof I_3["requests"][number]["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_3_3 in Exclude<keyof I_3["requests"][number]["recipient"]["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_4_3 in Exclude<keyof I_3["requests"][number]["recipient"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_5_1 in Exclude<keyof I_3["requests"][number]["recipient"]["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                        preKey?: ({
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_6_1 in Exclude<keyof I_3["requests"][number]["recipient"]["preKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_7_1 in Exclude<keyof I_3["requests"][number]["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_8_1 in Exclude<keyof I_3["requests"][number]["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_9_1 in Exclude<keyof I_3["requests"][number]["recipient"]["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_10_1 in Exclude<keyof I_3["requests"][number]["recipient"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_11_1 in Exclude<keyof I_3["requests"][number]["recipient"]["preKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                    } & { [K_12_1 in Exclude<keyof I_3["requests"][number]["recipient"], keyof publicKey.PublicKeyBundle>]: never; }) | undefined;
                    payload?: Uint8Array | undefined;
                    headerBytes?: Uint8Array | undefined;
                } & { [K_13_1 in Exclude<keyof I_3["requests"][number], keyof keystore.EncryptV1Request_Request>]: never; })[] & { [K_14_1 in Exclude<keyof I_3["requests"], keyof {
                    recipient?: {
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
            } & { [K_15_1 in Exclude<keyof I_3, "requests">]: never; }>(object: I_3): keystore.EncryptV1Request;
        };
        res: {
            encode(message: keystore.EncryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptResponse;
            fromJSON(object: any): keystore.EncryptResponse;
            toJSON(message: keystore.EncryptResponse): unknown;
            fromPartial<I_4 extends {
                responses?: {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                            } & { [K_21 in Exclude<keyof I_4["responses"][number]["result"]["encrypted"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                        } & { [K_1_4 in Exclude<keyof I_4["responses"][number]["result"]["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    } & { [K_2_4 in Exclude<keyof I_4["responses"][number]["result"], "encrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_3_4 in Exclude<keyof I_4["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_4_4 in Exclude<keyof I_4["responses"][number], keyof keystore.EncryptResponse_Response>]: never; })[] & { [K_5_2 in Exclude<keyof I_4["responses"], keyof {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_6_2 in Exclude<keyof I_4, "responses">]: never; }>(object: I_4): keystore.EncryptResponse;
        };
    };
    /**
     * Encrypt a batch of V2 messages
     */
    encryptV2: {
        req: {
            encode(message: keystore.EncryptV2Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptV2Request;
            fromJSON(object: any): keystore.EncryptV2Request;
            toJSON(message: keystore.EncryptV2Request): unknown;
            fromPartial<I_5 extends {
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
                } & { [K_22 in Exclude<keyof I_5["requests"][number], keyof keystore.EncryptV2Request_Request>]: never; })[] & { [K_1_5 in Exclude<keyof I_5["requests"], keyof {
                    payload?: Uint8Array | undefined;
                    headerBytes?: Uint8Array | undefined;
                    contentTopic?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2_5 in Exclude<keyof I_5, "requests">]: never; }>(object: I_5): keystore.EncryptV2Request;
        };
        res: {
            encode(message: keystore.EncryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptResponse;
            fromJSON(object: any): keystore.EncryptResponse;
            toJSON(message: keystore.EncryptResponse): unknown;
            fromPartial<I_4 extends {
                responses?: {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                            } & { [K_21 in Exclude<keyof I_4["responses"][number]["result"]["encrypted"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                        } & { [K_1_4 in Exclude<keyof I_4["responses"][number]["result"]["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    } & { [K_2_4 in Exclude<keyof I_4["responses"][number]["result"], "encrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_3_4 in Exclude<keyof I_4["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_4_4 in Exclude<keyof I_4["responses"][number], keyof keystore.EncryptResponse_Response>]: never; })[] & { [K_5_2 in Exclude<keyof I_4["responses"], keyof {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_6_2 in Exclude<keyof I_4, "responses">]: never; }>(object: I_4): keystore.EncryptResponse;
        };
    };
    /**
     * Take a batch of invite messages and store the `TopicKeys` for later use in
     * decrypting messages
     */
    saveInvites: {
        req: {
            encode(message: keystore.SaveInvitesRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveInvitesRequest;
            fromJSON(object: any): keystore.SaveInvitesRequest;
            toJSON(message: keystore.SaveInvitesRequest): unknown;
            fromPartial<I_6 extends {
                requests?: {
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                requests?: ({
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                }[] & ({
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                } & {
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_23 in Exclude<keyof I_6["requests"][number]["timestampNs"], keyof long.default>]: never; }) | undefined;
                    payload?: Uint8Array | undefined;
                } & { [K_1_6 in Exclude<keyof I_6["requests"][number], keyof keystore.SaveInvitesRequest_Request>]: never; })[] & { [K_2_6 in Exclude<keyof I_6["requests"], keyof {
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_3_5 in Exclude<keyof I_6, "requests">]: never; }>(object: I_6): keystore.SaveInvitesRequest;
        };
        res: {
            encode(message: keystore.SaveInvitesResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveInvitesResponse;
            fromJSON(object: any): keystore.SaveInvitesResponse;
            toJSON(message: keystore.SaveInvitesResponse): unknown;
            fromPartial<I_7 extends {
                responses?: {
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } & {
                        conversation?: ({
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } & {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_24 in Exclude<keyof I_7["responses"][number]["result"]["conversation"]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_1_7 in Exclude<keyof I_7["responses"][number]["result"]["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                            } & { [K_2_7 in Exclude<keyof I_7["responses"][number]["result"]["conversation"]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                        } & { [K_3_6 in Exclude<keyof I_7["responses"][number]["result"]["conversation"], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; }) | undefined;
                    } & { [K_4_5 in Exclude<keyof I_7["responses"][number]["result"], "conversation">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_5_3 in Exclude<keyof I_7["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_6_3 in Exclude<keyof I_7["responses"][number], keyof keystore.SaveInvitesResponse_Response>]: never; })[] & { [K_7_2 in Exclude<keyof I_7["responses"], keyof {
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8_2 in Exclude<keyof I_7, "responses">]: never; }>(object: I_7): keystore.SaveInvitesResponse;
        };
    };
    /**
     * Create a sealed/encrypted invite and store the Topic keys in the Keystore
     * for later use. The returned invite payload must be sent to the network for
     * the other party to be able to communicate.
     */
    createInvite: {
        req: {
            encode(message: keystore.CreateInviteRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.CreateInviteRequest;
            fromJSON(object: any): keystore.CreateInviteRequest;
            toJSON(message: keystore.CreateInviteRequest): unknown;
            fromPartial<I_8 extends {
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
                createdNs?: string | number | long.default | undefined;
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
                    } & { [K_25 in Exclude<keyof I_8["context"]["metadata"], string | number>]: never; }) | undefined;
                } & { [K_1_8 in Exclude<keyof I_8["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
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
                            } & { [K_2_8 in Exclude<keyof I_8["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_3_7 in Exclude<keyof I_8["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_4_6 in Exclude<keyof I_8["recipient"]["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    } & { [K_5_4 in Exclude<keyof I_8["recipient"]["identityKey"], keyof publicKey.SignedPublicKey>]: never; }) | undefined;
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
                            } & { [K_6_4 in Exclude<keyof I_8["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_7_3 in Exclude<keyof I_8["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_8_3 in Exclude<keyof I_8["recipient"]["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    } & { [K_9_2 in Exclude<keyof I_8["recipient"]["preKey"], keyof publicKey.SignedPublicKey>]: never; }) | undefined;
                } & { [K_10_2 in Exclude<keyof I_8["recipient"], keyof publicKey.SignedPublicKeyBundle>]: never; }) | undefined;
                createdNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_11_2 in Exclude<keyof I_8["createdNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_12_2 in Exclude<keyof I_8, keyof keystore.CreateInviteRequest>]: never; }>(object: I_8): keystore.CreateInviteRequest;
        };
        res: {
            encode(message: keystore.CreateInviteResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.CreateInviteResponse;
            fromJSON(object: any): keystore.CreateInviteResponse;
            toJSON(message: keystore.CreateInviteResponse): unknown;
            fromPartial<I_9 extends {
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                payload?: Uint8Array | undefined;
            } & {
                conversation?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_26 in Exclude<keyof I_9["conversation"]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_9 in Exclude<keyof I_9["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_9 in Exclude<keyof I_9["conversation"]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_8 in Exclude<keyof I_9["conversation"], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; }) | undefined;
                payload?: Uint8Array | undefined;
            } & { [K_4_7 in Exclude<keyof I_9, keyof keystore.CreateInviteResponse>]: never; }>(object: I_9): keystore.CreateInviteResponse;
        };
    };
    /**
     * Create an BRIXBIT auth token to be used as a header on BRIXBIT API requests
     */
    createAuthToken: {
        req: {
            encode(message: keystore.CreateAuthTokenRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.CreateAuthTokenRequest;
            fromJSON(object: any): keystore.CreateAuthTokenRequest;
            toJSON(message: keystore.CreateAuthTokenRequest): unknown;
            fromPartial<I_10 extends {
                timestampNs?: string | number | long.default | undefined;
            } & {
                timestampNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_27 in Exclude<keyof I_10["timestampNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_1_10 in Exclude<keyof I_10, "timestampNs">]: never; }>(object: I_10): keystore.CreateAuthTokenRequest;
        };
        res: {
            encode(message: authn.Token, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): authn.Token;
            fromJSON(object: any): authn.Token;
            toJSON(message: authn.Token): unknown;
            fromPartial<I_11 extends {
                identityKey?: {
                    timestamp?: string | number | long.default | undefined;
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
                authDataBytes?: Uint8Array | undefined;
                authDataSignature?: {
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
                identityKey?: ({
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        /**
                         * Sets the time of a refresh job
                         */
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_28 in Exclude<keyof I_11["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_11 in Exclude<keyof I_11["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_2_10 in Exclude<keyof I_11["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_3_9 in Exclude<keyof I_11["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_4_8 in Exclude<keyof I_11["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_5_5 in Exclude<keyof I_11["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                authDataBytes?: Uint8Array | undefined;
                authDataSignature?: ({
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
                    } & { [K_6_5 in Exclude<keyof I_11["authDataSignature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_7_4 in Exclude<keyof I_11["authDataSignature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_8_4 in Exclude<keyof I_11["authDataSignature"], keyof signature.Signature>]: never; }) | undefined;
            } & { [K_9_3 in Exclude<keyof I_11, keyof authn.Token>]: never; }>(object: I_11): authn.Token;
        };
    };
    /**
     * Sign the provided digest with either the `IdentityKey` or a specified
     * `PreKey`
     */
    signDigest: {
        req: {
            encode(message: keystore.SignDigestRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SignDigestRequest;
            fromJSON(object: any): keystore.SignDigestRequest;
            toJSON(message: keystore.SignDigestRequest): unknown;
            fromPartial<I_12 extends {
                digest?: Uint8Array | undefined;
                identityKey?: boolean | undefined;
                prekeyIndex?: number | undefined;
            } & {
                digest?: Uint8Array | undefined;
                identityKey?: boolean | undefined;
                prekeyIndex?: number | undefined;
            } & { [K_29 in Exclude<keyof I_12, keyof keystore.SignDigestRequest>]: never; }>(object: I_12): keystore.SignDigestRequest;
        };
        res: {
            encode(message: signature.Signature, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): signature.Signature;
            fromJSON(object: any): signature.Signature;
            toJSON(message: signature.Signature): unknown;
            fromPartial<I_13 extends {
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
                } & { [K_30 in Exclude<keyof I_13["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_1_12 in Exclude<keyof I_13["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_2_11 in Exclude<keyof I_13, keyof signature.Signature>]: never; }>(object: I_13): signature.Signature;
        };
    };
    /**
     * Get the `PublicKeyBundle` associated with the Keystore's private keys
     */
    getPublicKeyBundle: {
        req: null;
        res: {
            encode(message: publicKey.PublicKeyBundle, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): publicKey.PublicKeyBundle;
            fromJSON(object: any): publicKey.PublicKeyBundle;
            toJSON(message: publicKey.PublicKeyBundle): unknown;
            fromPartial<I_14 extends {
                identityKey?: {
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_31 in Exclude<keyof I_14["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_13 in Exclude<keyof I_14["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_2_12 in Exclude<keyof I_14["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_3_10 in Exclude<keyof I_14["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_4_9 in Exclude<keyof I_14["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_5_6 in Exclude<keyof I_14["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                preKey?: ({
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_6_6 in Exclude<keyof I_14["preKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_7_5 in Exclude<keyof I_14["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_8_5 in Exclude<keyof I_14["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_9_4 in Exclude<keyof I_14["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_10_3 in Exclude<keyof I_14["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_11_3 in Exclude<keyof I_14["preKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
            } & { [K_12_3 in Exclude<keyof I_14, keyof publicKey.PublicKeyBundle>]: never; }>(object: I_14): publicKey.PublicKeyBundle;
        };
    };
    /**
     * Export the private keys. May throw an error if the keystore implementation
     * does not allow this operation
     */
    getPrivateKeyBundle: {
        req: null;
        res: {
            encode(message: privateKey.PrivateKeyBundleV1, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): privateKey.PrivateKeyBundleV1;
            fromJSON(object: any): privateKey.PrivateKeyBundleV1;
            toJSON(message: privateKey.PrivateKeyBundleV1): unknown;
            fromPartial<I_15 extends {
                identityKey?: {
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_32 in Exclude<keyof I_15["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
                    secp256k1?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_1_14 in Exclude<keyof I_15["identityKey"]["secp256k1"], "bytes">]: never; }) | undefined;
                    publicKey?: ({
                        timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | (long.default & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | long.default) => long.default;
                            and: (other: string | number | long.default) => long.default;
                            compare: (other: string | number | long.default) => number;
                            comp: (other: string | number | long.default) => number;
                            divide: (divisor: string | number | long.default) => long.default;
                            div: (divisor: string | number | long.default) => long.default;
                            equals: (other: string | number | long.default) => boolean;
                            eq: (other: string | number | long.default) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | long.default) => boolean;
                            gt: (other: string | number | long.default) => boolean;
                            greaterThanOrEqual: (other: string | number | long.default) => boolean;
                            gte: (other: string | number | long.default) => boolean;
                            ge: (other: string | number | long.default) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | long.default) => boolean;
                            lt: (other: string | number | long.default) => boolean;
                            lessThanOrEqual: (other: string | number | long.default) => boolean;
                            lte: (other: string | number | long.default) => boolean;
                            le: (other: string | number | long.default) => boolean;
                            modulo: (other: string | number | long.default) => long.default;
                            mod: (other: string | number | long.default) => long.default;
                            rem: (other: string | number | long.default) => long.default;
                            multiply: (multiplier: string | number | long.default) => long.default;
                            mul: (multiplier: string | number | long.default) => long.default;
                            negate: () => long.default;
                            neg: () => long.default;
                            not: () => long.default;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | long.default) => boolean;
                            neq: (other: string | number | long.default) => boolean;
                            ne: (other: string | number | long.default) => boolean;
                            or: (other: string | number | long.default) => long.default;
                            shiftLeft: (numBits: number | long.default) => long.default;
                            shl: (numBits: number | long.default) => long.default;
                            shiftRight: (numBits: number | long.default) => long.default;
                            shr: (numBits: number | long.default) => long.default;
                            shiftRightUnsigned: (numBits: number | long.default) => long.default;
                            shru: (numBits: number | long.default) => long.default;
                            shr_u: (numBits: number | long.default) => long.default;
                            rotateLeft: (numBits: number | long.default) => long.default;
                            rotl: (numBits: number | long.default) => long.default;
                            rotateRight: (numBits: number | long.default) => long.default;
                            rotr: (numBits: number | long.default) => long.default;
                            subtract: (subtrahend: string | number | long.default) => long.default;
                            sub: (subtrahend: string | number | long.default) => long.default;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => long.default;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => long.default;
                            xor: (other: string | number | long.default) => long.default;
                        } & { [K_2_13 in Exclude<keyof I_15["identityKey"]["publicKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                            } & { [K_3_11 in Exclude<keyof I_15["identityKey"]["publicKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_4_10 in Exclude<keyof I_15["identityKey"]["publicKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_5_7 in Exclude<keyof I_15["identityKey"]["publicKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                        secp256k1Uncompressed?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_6_7 in Exclude<keyof I_15["identityKey"]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                    } & { [K_7_6 in Exclude<keyof I_15["identityKey"]["publicKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                } & { [K_8_6 in Exclude<keyof I_15["identityKey"], keyof privateKey.PrivateKey>]: never; }) | undefined;
                preKeys?: ({
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_9_5 in Exclude<keyof I_15["preKeys"][number]["timestamp"], keyof long.default>]: never; }) | undefined;
                    secp256k1?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_10_4 in Exclude<keyof I_15["preKeys"][number]["secp256k1"], "bytes">]: never; }) | undefined;
                    publicKey?: ({
                        timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | (long.default & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | long.default) => long.default;
                            and: (other: string | number | long.default) => long.default;
                            compare: (other: string | number | long.default) => number;
                            comp: (other: string | number | long.default) => number;
                            divide: (divisor: string | number | long.default) => long.default;
                            div: (divisor: string | number | long.default) => long.default;
                            equals: (other: string | number | long.default) => boolean;
                            eq: (other: string | number | long.default) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | long.default) => boolean;
                            gt: (other: string | number | long.default) => boolean;
                            greaterThanOrEqual: (other: string | number | long.default) => boolean;
                            gte: (other: string | number | long.default) => boolean;
                            ge: (other: string | number | long.default) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | long.default) => boolean;
                            lt: (other: string | number | long.default) => boolean;
                            lessThanOrEqual: (other: string | number | long.default) => boolean;
                            lte: (other: string | number | long.default) => boolean;
                            le: (other: string | number | long.default) => boolean;
                            modulo: (other: string | number | long.default) => long.default;
                            mod: (other: string | number | long.default) => long.default;
                            rem: (other: string | number | long.default) => long.default;
                            multiply: (multiplier: string | number | long.default) => long.default;
                            mul: (multiplier: string | number | long.default) => long.default;
                            negate: () => long.default;
                            neg: () => long.default;
                            not: () => long.default;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | long.default) => boolean;
                            neq: (other: string | number | long.default) => boolean;
                            ne: (other: string | number | long.default) => boolean;
                            or: (other: string | number | long.default) => long.default;
                            shiftLeft: (numBits: number | long.default) => long.default;
                            shl: (numBits: number | long.default) => long.default;
                            shiftRight: (numBits: number | long.default) => long.default;
                            shr: (numBits: number | long.default) => long.default;
                            shiftRightUnsigned: (numBits: number | long.default) => long.default;
                            shru: (numBits: number | long.default) => long.default;
                            shr_u: (numBits: number | long.default) => long.default;
                            rotateLeft: (numBits: number | long.default) => long.default;
                            rotl: (numBits: number | long.default) => long.default;
                            rotateRight: (numBits: number | long.default) => long.default;
                            rotr: (numBits: number | long.default) => long.default;
                            subtract: (subtrahend: string | number | long.default) => long.default;
                            sub: (subtrahend: string | number | long.default) => long.default;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => long.default;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => long.default;
                            xor: (other: string | number | long.default) => long.default;
                        } & { [K_11_4 in Exclude<keyof I_15["preKeys"][number]["publicKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                            } & { [K_12_4 in Exclude<keyof I_15["preKeys"][number]["publicKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_13_2 in Exclude<keyof I_15["preKeys"][number]["publicKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_14_2 in Exclude<keyof I_15["preKeys"][number]["publicKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                        secp256k1Uncompressed?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_15_2 in Exclude<keyof I_15["preKeys"][number]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                    } & { [K_16_1 in Exclude<keyof I_15["preKeys"][number]["publicKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                } & { [K_17_1 in Exclude<keyof I_15["preKeys"][number], keyof privateKey.PrivateKey>]: never; })[] & { [K_18 in Exclude<keyof I_15["preKeys"], keyof {
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
            } & { [K_19 in Exclude<keyof I_15, keyof privateKey.PrivateKeyBundleV1>]: never; }>(object: I_15): privateKey.PrivateKeyBundleV1;
        };
    };
    /**
     * Save V1 Conversations
     */
    saveV1Conversations: {
        req: {
            encode(message: keystore.SaveV1ConversationsRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveV1ConversationsRequest;
            fromJSON(object: any): keystore.SaveV1ConversationsRequest;
            toJSON(message: keystore.SaveV1ConversationsRequest): unknown;
            fromPartial<I_16 extends {
                conversations?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                conversations?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] & ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_33 in Exclude<keyof I_16["conversations"][number]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_15 in Exclude<keyof I_16["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_14 in Exclude<keyof I_16["conversations"][number]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_12 in Exclude<keyof I_16["conversations"][number], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; })[] & { [K_4_11 in Exclude<keyof I_16["conversations"], keyof {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5_8 in Exclude<keyof I_16, "conversations">]: never; }>(object: I_16): keystore.SaveV1ConversationsRequest;
        };
        res: {
            encode(_: keystore.SaveV1ConversationsResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveV1ConversationsResponse;
            fromJSON(_: any): keystore.SaveV1ConversationsResponse;
            toJSON(_: keystore.SaveV1ConversationsResponse): unknown;
            fromPartial<I_17 extends { [K_34 in Exclude<keyof I_17, never>]: never; }>(_: I_17): keystore.SaveV1ConversationsResponse;
        };
    };
    /**
     * Get a list of V1 conversations
     */
    getV1Conversations: {
        req: null;
        res: {
            encode(message: keystore.GetConversationsResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetConversationsResponse;
            fromJSON(object: any): keystore.GetConversationsResponse;
            toJSON(message: keystore.GetConversationsResponse): unknown;
            fromPartial<I_18 extends {
                conversations?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                conversations?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] & ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_35 in Exclude<keyof I_18["conversations"][number]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_16 in Exclude<keyof I_18["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_15 in Exclude<keyof I_18["conversations"][number]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_13 in Exclude<keyof I_18["conversations"][number], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; })[] & { [K_4_12 in Exclude<keyof I_18["conversations"], keyof {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5_9 in Exclude<keyof I_18, "conversations">]: never; }>(object: I_18): keystore.GetConversationsResponse;
        };
    };
    /**
     * Get a list of V2 conversations
     */
    getV2Conversations: {
        req: null;
        res: {
            encode(message: keystore.GetConversationsResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetConversationsResponse;
            fromJSON(object: any): keystore.GetConversationsResponse;
            toJSON(message: keystore.GetConversationsResponse): unknown;
            fromPartial<I_18 extends {
                conversations?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                conversations?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] & ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_35 in Exclude<keyof I_18["conversations"][number]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_16 in Exclude<keyof I_18["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_15 in Exclude<keyof I_18["conversations"][number]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_13 in Exclude<keyof I_18["conversations"][number], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; })[] & { [K_4_12 in Exclude<keyof I_18["conversations"], keyof {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5_9 in Exclude<keyof I_18, "conversations">]: never; }>(object: I_18): keystore.GetConversationsResponse;
        };
    };
    /**
     * Get a refresh job from the persistence
     */
    getRefreshJob: {
        req: {
            encode(message: keystore.GetRefreshJobRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetRefreshJobRequest;
            fromJSON(object: any): keystore.GetRefreshJobRequest;
            toJSON(message: keystore.GetRefreshJobRequest): unknown;
            fromPartial<I_19 extends {
                jobType?: keystore.JobType | undefined;
            } & {
                jobType?: keystore.JobType | undefined;
            } & { [K_36 in Exclude<keyof I_19, "jobType">]: never; }>(object: I_19): keystore.GetRefreshJobRequest;
        };
        res: {
            encode(message: keystore.GetRefreshJobResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetRefreshJobResponse;
            fromJSON(object: any): keystore.GetRefreshJobResponse;
            toJSON(message: keystore.GetRefreshJobResponse): unknown;
            fromPartial<I_20 extends {
                lastRunNs?: string | number | long.default | undefined;
            } & {
                lastRunNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_37 in Exclude<keyof I_20["lastRunNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_1_17 in Exclude<keyof I_20, "lastRunNs">]: never; }>(object: I_20): keystore.GetRefreshJobResponse;
        };
    };
    /**
     * Sets the time of a refresh job
     */
    setRefreshJob: {
        req: {
            encode(message: keystore.SetRefeshJobRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SetRefeshJobRequest;
            fromJSON(object: any): keystore.SetRefeshJobRequest;
            toJSON(message: keystore.SetRefeshJobRequest): unknown;
            fromPartial<I_21 extends {
                jobType?: keystore.JobType | undefined;
                lastRunNs?: string | number | long.default | undefined;
            } & {
                jobType?: keystore.JobType | undefined;
                lastRunNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_38 in Exclude<keyof I_21["lastRunNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_1_18 in Exclude<keyof I_21, keyof keystore.SetRefeshJobRequest>]: never; }>(object: I_21): keystore.SetRefeshJobRequest;
        };
        res: {
            encode(_: keystore.SetRefreshJobResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SetRefreshJobResponse;
            fromJSON(_: any): keystore.SetRefreshJobResponse;
            toJSON(_: keystore.SetRefreshJobResponse): unknown;
            fromPartial<I_22 extends { [K_39 in Exclude<keyof I_22, never>]: never; }>(_: I_22): keystore.SetRefreshJobResponse;
        };
    };
    /**
     * Encrypt a batch of messages to yourself
     */
    selfEncrypt: {
        req: {
            encode(message: keystore.SelfEncryptRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SelfEncryptRequest;
            fromJSON(object: any): keystore.SelfEncryptRequest;
            toJSON(message: keystore.SelfEncryptRequest): unknown;
            fromPartial<I_23 extends {
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
                } & { [K_40 in Exclude<keyof I_23["requests"][number], "payload">]: never; })[] & { [K_1_19 in Exclude<keyof I_23["requests"], keyof {
                    payload?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2_16 in Exclude<keyof I_23, "requests">]: never; }>(object: I_23): keystore.SelfEncryptRequest;
        };
        res: {
            encode(message: keystore.SelfEncryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SelfEncryptResponse;
            fromJSON(object: any): keystore.SelfEncryptResponse;
            toJSON(message: keystore.SelfEncryptResponse): unknown;
            fromPartial<I_24 extends {
                responses?: {
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        encrypted?: Uint8Array | undefined;
                    } & {
                        encrypted?: Uint8Array | undefined;
                    } & { [K_41 in Exclude<keyof I_24["responses"][number]["result"], "encrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_20 in Exclude<keyof I_24["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_17 in Exclude<keyof I_24["responses"][number], keyof keystore.SelfEncryptResponse_Response>]: never; })[] & { [K_3_14 in Exclude<keyof I_24["responses"], keyof {
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_13 in Exclude<keyof I_24, "responses">]: never; }>(object: I_24): keystore.SelfEncryptResponse;
        };
    };
    /**
     * Decrypt a batch of messages to yourself
     */
    selfDecrypt: {
        req: {
            encode(message: keystore.SelfDecryptRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SelfDecryptRequest;
            fromJSON(object: any): keystore.SelfDecryptRequest;
            toJSON(message: keystore.SelfDecryptRequest): unknown;
            fromPartial<I_25 extends {
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
                } & { [K_42 in Exclude<keyof I_25["requests"][number], "payload">]: never; })[] & { [K_1_21 in Exclude<keyof I_25["requests"], keyof {
                    payload?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2_18 in Exclude<keyof I_25, "requests">]: never; }>(object: I_25): keystore.SelfDecryptRequest;
        };
        res: {
            encode(message: keystore.DecryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptResponse;
            fromJSON(object: any): keystore.DecryptResponse;
            toJSON(message: keystore.DecryptResponse): unknown;
            fromPartial<I_1 extends {
                responses?: {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        decrypted?: Uint8Array | undefined;
                    } & {
                        decrypted?: Uint8Array | undefined;
                    } & { [K_18 in Exclude<keyof I_1["responses"][number]["result"], "decrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_1 in Exclude<keyof I_1["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_1 in Exclude<keyof I_1["responses"][number], keyof keystore.DecryptResponse_Response>]: never; })[] & { [K_3_1 in Exclude<keyof I_1["responses"], keyof {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_1 in Exclude<keyof I_1, "responses">]: never; }>(object: I_1): keystore.DecryptResponse;
        };
    };
    /**
     * Get the private preferences topic identifier
     */
    getPrivatePreferencesTopicIdentifier: {
        req: null;
        res: {
            encode(message: keystore.GetPrivatePreferencesTopicIdentifierResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetPrivatePreferencesTopicIdentifierResponse;
            fromJSON(object: any): keystore.GetPrivatePreferencesTopicIdentifierResponse;
            toJSON(message: keystore.GetPrivatePreferencesTopicIdentifierResponse): unknown;
            fromPartial<I_26 extends {
                identifier?: string | undefined;
            } & {
                identifier?: string | undefined;
            } & { [K_43 in Exclude<keyof I_26, "identifier">]: never; }>(object: I_26): keystore.GetPrivatePreferencesTopicIdentifierResponse;
        };
    };
};
type KeystoreApiDefs = typeof apiDefs;
type KeystoreApiMethods = keyof KeystoreApiDefs;
type KeystoreInterface = ExtractInterface<KeystoreApiDefs>;
type KeystoreApiEntries = Entries<KeystoreApiDefs>;
type KeystoreApiRequestEncoders = ExtractInterfaceRequestEncoders<KeystoreApiDefs>;
type KeystoreApiResponseDecoders = ExtractInterfaceResponseDecoders<KeystoreApiDefs>;
type KeystoreInterfaceRequestValues = ExtractInterfaceRequestValues<KeystoreInterface>;
type KeystoreApiRequestValues = Values<KeystoreInterfaceRequestValues>;
declare const snapApiDefs: {
    getKeystoreStatus: {
        req: {
            encode(message: keystore.GetKeystoreStatusRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetKeystoreStatusRequest;
            fromJSON(object: any): keystore.GetKeystoreStatusRequest;
            toJSON(message: keystore.GetKeystoreStatusRequest): unknown;
            fromPartial<I extends {
                walletAddress?: string | undefined;
            } & {
                walletAddress?: string | undefined;
            } & { [K in Exclude<keyof I, "walletAddress">]: never; }>(object: I): keystore.GetKeystoreStatusRequest;
        };
        res: {
            encode(message: keystore.GetKeystoreStatusResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetKeystoreStatusResponse;
            fromJSON(object: any): keystore.GetKeystoreStatusResponse;
            toJSON(message: keystore.GetKeystoreStatusResponse): unknown;
            fromPartial<I_1 extends {
                status?: keystore.GetKeystoreStatusResponse_KeystoreStatus | undefined;
            } & {
                status?: keystore.GetKeystoreStatusResponse_KeystoreStatus | undefined;
            } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): keystore.GetKeystoreStatusResponse;
        };
    };
    initKeystore: {
        req: {
            encode(message: keystore.InitKeystoreRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.InitKeystoreRequest;
            fromJSON(object: any): keystore.InitKeystoreRequest;
            toJSON(message: keystore.InitKeystoreRequest): unknown;
            fromPartial<I extends {
                v1?: {
                    identityKey?: {
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | (long.default & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | long.default) => long.default;
                            and: (other: string | number | long.default) => long.default;
                            compare: (other: string | number | long.default) => number;
                            comp: (other: string | number | long.default) => number;
                            divide: (divisor: string | number | long.default) => long.default;
                            div: (divisor: string | number | long.default) => long.default;
                            equals: (other: string | number | long.default) => boolean;
                            eq: (other: string | number | long.default) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | long.default) => boolean;
                            gt: (other: string | number | long.default) => boolean;
                            greaterThanOrEqual: (other: string | number | long.default) => boolean;
                            gte: (other: string | number | long.default) => boolean;
                            ge: (other: string | number | long.default) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | long.default) => boolean;
                            lt: (other: string | number | long.default) => boolean;
                            lessThanOrEqual: (other: string | number | long.default) => boolean;
                            lte: (other: string | number | long.default) => boolean;
                            le: (other: string | number | long.default) => boolean;
                            modulo: (other: string | number | long.default) => long.default;
                            mod: (other: string | number | long.default) => long.default;
                            rem: (other: string | number | long.default) => long.default;
                            multiply: (multiplier: string | number | long.default) => long.default;
                            mul: (multiplier: string | number | long.default) => long.default;
                            negate: () => long.default;
                            neg: () => long.default;
                            not: () => long.default;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | long.default) => boolean;
                            neq: (other: string | number | long.default) => boolean;
                            ne: (other: string | number | long.default) => boolean;
                            or: (other: string | number | long.default) => long.default;
                            shiftLeft: (numBits: number | long.default) => long.default;
                            shl: (numBits: number | long.default) => long.default;
                            shiftRight: (numBits: number | long.default) => long.default;
                            shr: (numBits: number | long.default) => long.default;
                            shiftRightUnsigned: (numBits: number | long.default) => long.default;
                            shru: (numBits: number | long.default) => long.default;
                            shr_u: (numBits: number | long.default) => long.default;
                            rotateLeft: (numBits: number | long.default) => long.default;
                            rotl: (numBits: number | long.default) => long.default;
                            rotateRight: (numBits: number | long.default) => long.default;
                            rotr: (numBits: number | long.default) => long.default;
                            subtract: (subtrahend: string | number | long.default) => long.default;
                            sub: (subtrahend: string | number | long.default) => long.default;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => long.default;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => long.default;
                            xor: (other: string | number | long.default) => long.default;
                        } & { [K in Exclude<keyof I["v1"]["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
                        secp256k1?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_1 in Exclude<keyof I["v1"]["identityKey"]["secp256k1"], "bytes">]: never; }) | undefined;
                        publicKey?: ({
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_2 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_3 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_4 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_5 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_6 in Exclude<keyof I["v1"]["identityKey"]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_7 in Exclude<keyof I["v1"]["identityKey"]["publicKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                    } & { [K_8 in Exclude<keyof I["v1"]["identityKey"], keyof privateKey.PrivateKey>]: never; }) | undefined;
                    preKeys?: ({
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | (long.default & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | long.default) => long.default;
                            and: (other: string | number | long.default) => long.default;
                            compare: (other: string | number | long.default) => number;
                            comp: (other: string | number | long.default) => number;
                            divide: (divisor: string | number | long.default) => long.default;
                            div: (divisor: string | number | long.default) => long.default;
                            equals: (other: string | number | long.default) => boolean;
                            eq: (other: string | number | long.default) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | long.default) => boolean;
                            gt: (other: string | number | long.default) => boolean;
                            greaterThanOrEqual: (other: string | number | long.default) => boolean;
                            gte: (other: string | number | long.default) => boolean;
                            ge: (other: string | number | long.default) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | long.default) => boolean;
                            lt: (other: string | number | long.default) => boolean;
                            lessThanOrEqual: (other: string | number | long.default) => boolean;
                            lte: (other: string | number | long.default) => boolean;
                            le: (other: string | number | long.default) => boolean;
                            modulo: (other: string | number | long.default) => long.default;
                            mod: (other: string | number | long.default) => long.default;
                            rem: (other: string | number | long.default) => long.default;
                            multiply: (multiplier: string | number | long.default) => long.default;
                            mul: (multiplier: string | number | long.default) => long.default;
                            negate: () => long.default;
                            neg: () => long.default;
                            not: () => long.default;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | long.default) => boolean;
                            neq: (other: string | number | long.default) => boolean;
                            ne: (other: string | number | long.default) => boolean;
                            or: (other: string | number | long.default) => long.default;
                            shiftLeft: (numBits: number | long.default) => long.default;
                            shl: (numBits: number | long.default) => long.default;
                            shiftRight: (numBits: number | long.default) => long.default;
                            shr: (numBits: number | long.default) => long.default;
                            shiftRightUnsigned: (numBits: number | long.default) => long.default;
                            shru: (numBits: number | long.default) => long.default;
                            shr_u: (numBits: number | long.default) => long.default;
                            rotateLeft: (numBits: number | long.default) => long.default;
                            rotl: (numBits: number | long.default) => long.default;
                            rotateRight: (numBits: number | long.default) => long.default;
                            rotr: (numBits: number | long.default) => long.default;
                            subtract: (subtrahend: string | number | long.default) => long.default;
                            sub: (subtrahend: string | number | long.default) => long.default;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => long.default;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => long.default;
                            xor: (other: string | number | long.default) => long.default;
                        } & { [K_9 in Exclude<keyof I["v1"]["preKeys"][number]["timestamp"], keyof long.default>]: never; }) | undefined;
                        secp256k1?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_10 in Exclude<keyof I["v1"]["preKeys"][number]["secp256k1"], "bytes">]: never; }) | undefined;
                        publicKey?: ({
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_11 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_12 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_13 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_14 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_15 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_16 in Exclude<keyof I["v1"]["preKeys"][number]["publicKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                    } & { [K_17 in Exclude<keyof I["v1"]["preKeys"][number], keyof privateKey.PrivateKey>]: never; })[] & { [K_18 in Exclude<keyof I["v1"]["preKeys"], keyof {
                        timestamp?: string | number | long.default | undefined;
                        secp256k1?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                        publicKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                } & { [K_19 in Exclude<keyof I["v1"], keyof privateKey.PrivateKeyBundleV1>]: never; }) | undefined;
            } & { [K_20 in Exclude<keyof I, "v1">]: never; }>(object: I): keystore.InitKeystoreRequest;
        };
        res: {
            encode(message: keystore.InitKeystoreResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.InitKeystoreResponse;
            fromJSON(object: any): keystore.InitKeystoreResponse;
            toJSON(message: keystore.InitKeystoreResponse): unknown;
            fromPartial<I_1 extends {
                error?: {
                    message?: string | undefined;
                    code?: keystore.ErrorCode | undefined;
                } | undefined;
            } & {
                error?: ({
                    message?: string | undefined;
                    code?: keystore.ErrorCode | undefined;
                } & {
                    message?: string | undefined;
                    code?: keystore.ErrorCode | undefined;
                } & { [K_21 in Exclude<keyof I_1["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
            } & { [K_1_1 in Exclude<keyof I_1, "error">]: never; }>(object: I_1): keystore.InitKeystoreResponse;
        };
    };
    /**
     * Decrypt a batch of V1 messages
     */
    decryptV1: {
        req: {
            encode(message: keystore.DecryptV1Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptV1Request;
            fromJSON(object: any): keystore.DecryptV1Request;
            toJSON(message: keystore.DecryptV1Request): unknown;
            fromPartial<I_2 extends {
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                        } & { [K_22 in Exclude<keyof I_2["requests"][number]["payload"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                    } & { [K_1_2 in Exclude<keyof I_2["requests"][number]["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    peerKeys?: ({
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_2_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_3_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_4_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_5_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_6_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_7_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                        preKey?: ({
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_8_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["preKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_9_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_10_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_11_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_12_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_13_1 in Exclude<keyof I_2["requests"][number]["peerKeys"]["preKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                    } & { [K_14_1 in Exclude<keyof I_2["requests"][number]["peerKeys"], keyof publicKey.PublicKeyBundle>]: never; }) | undefined;
                    headerBytes?: Uint8Array | undefined;
                    isSender?: boolean | undefined;
                } & { [K_15_1 in Exclude<keyof I_2["requests"][number], keyof keystore.DecryptV1Request_Request>]: never; })[] & { [K_16_1 in Exclude<keyof I_2["requests"], keyof {
                    payload?: {
                        aes256GcmHkdfSha256?: {
                            hkdfSalt?: Uint8Array | undefined;
                            gcmNonce?: Uint8Array | undefined;
                            payload?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    peerKeys?: {
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
            } & { [K_17_1 in Exclude<keyof I_2, "requests">]: never; }>(object: I_2): keystore.DecryptV1Request;
        };
        res: {
            encode(message: keystore.DecryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptResponse;
            fromJSON(object: any): keystore.DecryptResponse;
            toJSON(message: keystore.DecryptResponse): unknown;
            fromPartial<I_3 extends {
                responses?: {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        decrypted?: Uint8Array | undefined;
                    } & {
                        decrypted?: Uint8Array | undefined;
                    } & { [K_23 in Exclude<keyof I_3["responses"][number]["result"], "decrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_3 in Exclude<keyof I_3["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_2 in Exclude<keyof I_3["responses"][number], keyof keystore.DecryptResponse_Response>]: never; })[] & { [K_3_2 in Exclude<keyof I_3["responses"], keyof {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_2 in Exclude<keyof I_3, "responses">]: never; }>(object: I_3): keystore.DecryptResponse;
        };
    };
    /**
     * Decrypt a batch of V2 messages
     */
    decryptV2: {
        req: {
            encode(message: keystore.DecryptV2Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptV2Request;
            fromJSON(object: any): keystore.DecryptV2Request;
            toJSON(message: keystore.DecryptV2Request): unknown;
            fromPartial<I_4 extends {
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
                        } & { [K_24 in Exclude<keyof I_4["requests"][number]["payload"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                    } & { [K_1_4 in Exclude<keyof I_4["requests"][number]["payload"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    headerBytes?: Uint8Array | undefined;
                    contentTopic?: string | undefined;
                } & { [K_2_3 in Exclude<keyof I_4["requests"][number], keyof keystore.DecryptV2Request_Request>]: never; })[] & { [K_3_3 in Exclude<keyof I_4["requests"], keyof {
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
            } & { [K_4_3 in Exclude<keyof I_4, "requests">]: never; }>(object: I_4): keystore.DecryptV2Request;
        };
        res: {
            encode(message: keystore.DecryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptResponse;
            fromJSON(object: any): keystore.DecryptResponse;
            toJSON(message: keystore.DecryptResponse): unknown;
            fromPartial<I_3 extends {
                responses?: {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        decrypted?: Uint8Array | undefined;
                    } & {
                        decrypted?: Uint8Array | undefined;
                    } & { [K_23 in Exclude<keyof I_3["responses"][number]["result"], "decrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_3 in Exclude<keyof I_3["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_2 in Exclude<keyof I_3["responses"][number], keyof keystore.DecryptResponse_Response>]: never; })[] & { [K_3_2 in Exclude<keyof I_3["responses"], keyof {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_2 in Exclude<keyof I_3, "responses">]: never; }>(object: I_3): keystore.DecryptResponse;
        };
    };
    /**
     * Encrypt a batch of V1 messages
     */
    encryptV1: {
        req: {
            encode(message: keystore.EncryptV1Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptV1Request;
            fromJSON(object: any): keystore.EncryptV1Request;
            toJSON(message: keystore.EncryptV1Request): unknown;
            fromPartial<I_5 extends {
                requests?: {
                    recipient?: {
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_25 in Exclude<keyof I_5["requests"][number]["recipient"]["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_1_5 in Exclude<keyof I_5["requests"][number]["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_2_4 in Exclude<keyof I_5["requests"][number]["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_3_4 in Exclude<keyof I_5["requests"][number]["recipient"]["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_4_4 in Exclude<keyof I_5["requests"][number]["recipient"]["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_5_2 in Exclude<keyof I_5["requests"][number]["recipient"]["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                        preKey?: ({
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_6_2 in Exclude<keyof I_5["requests"][number]["recipient"]["preKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_7_2 in Exclude<keyof I_5["requests"][number]["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_8_2 in Exclude<keyof I_5["requests"][number]["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_9_2 in Exclude<keyof I_5["requests"][number]["recipient"]["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                            secp256k1Uncompressed?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_10_2 in Exclude<keyof I_5["requests"][number]["recipient"]["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                        } & { [K_11_2 in Exclude<keyof I_5["requests"][number]["recipient"]["preKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                    } & { [K_12_2 in Exclude<keyof I_5["requests"][number]["recipient"], keyof publicKey.PublicKeyBundle>]: never; }) | undefined;
                    payload?: Uint8Array | undefined;
                    headerBytes?: Uint8Array | undefined;
                } & { [K_13_2 in Exclude<keyof I_5["requests"][number], keyof keystore.EncryptV1Request_Request>]: never; })[] & { [K_14_2 in Exclude<keyof I_5["requests"], keyof {
                    recipient?: {
                        identityKey?: {
                            timestamp?: string | number | long.default | undefined;
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
                            timestamp?: string | number | long.default | undefined;
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
            } & { [K_15_2 in Exclude<keyof I_5, "requests">]: never; }>(object: I_5): keystore.EncryptV1Request;
        };
        res: {
            encode(message: keystore.EncryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptResponse;
            fromJSON(object: any): keystore.EncryptResponse;
            toJSON(message: keystore.EncryptResponse): unknown;
            fromPartial<I_6 extends {
                responses?: {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                            } & { [K_26 in Exclude<keyof I_6["responses"][number]["result"]["encrypted"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                        } & { [K_1_6 in Exclude<keyof I_6["responses"][number]["result"]["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    } & { [K_2_5 in Exclude<keyof I_6["responses"][number]["result"], "encrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_3_5 in Exclude<keyof I_6["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_4_5 in Exclude<keyof I_6["responses"][number], keyof keystore.EncryptResponse_Response>]: never; })[] & { [K_5_3 in Exclude<keyof I_6["responses"], keyof {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_6_3 in Exclude<keyof I_6, "responses">]: never; }>(object: I_6): keystore.EncryptResponse;
        };
    };
    /**
     * Encrypt a batch of V2 messages
     */
    encryptV2: {
        req: {
            encode(message: keystore.EncryptV2Request, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptV2Request;
            fromJSON(object: any): keystore.EncryptV2Request;
            toJSON(message: keystore.EncryptV2Request): unknown;
            fromPartial<I_7 extends {
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
                } & { [K_27 in Exclude<keyof I_7["requests"][number], keyof keystore.EncryptV2Request_Request>]: never; })[] & { [K_1_7 in Exclude<keyof I_7["requests"], keyof {
                    payload?: Uint8Array | undefined;
                    headerBytes?: Uint8Array | undefined;
                    contentTopic?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2_6 in Exclude<keyof I_7, "requests">]: never; }>(object: I_7): keystore.EncryptV2Request;
        };
        res: {
            encode(message: keystore.EncryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.EncryptResponse;
            fromJSON(object: any): keystore.EncryptResponse;
            toJSON(message: keystore.EncryptResponse): unknown;
            fromPartial<I_6 extends {
                responses?: {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
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
                            } & { [K_26 in Exclude<keyof I_6["responses"][number]["result"]["encrypted"]["aes256GcmHkdfSha256"], keyof _brixbit_proto_ts_dist_types_message_contents_ciphertext_pb.Ciphertext_Aes256gcmHkdfsha256>]: never; }) | undefined;
                        } & { [K_1_6 in Exclude<keyof I_6["responses"][number]["result"]["encrypted"], "aes256GcmHkdfSha256">]: never; }) | undefined;
                    } & { [K_2_5 in Exclude<keyof I_6["responses"][number]["result"], "encrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_3_5 in Exclude<keyof I_6["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_4_5 in Exclude<keyof I_6["responses"][number], keyof keystore.EncryptResponse_Response>]: never; })[] & { [K_5_3 in Exclude<keyof I_6["responses"], keyof {
                    result?: {
                        encrypted?: {
                            aes256GcmHkdfSha256?: {
                                hkdfSalt?: Uint8Array | undefined;
                                gcmNonce?: Uint8Array | undefined;
                                payload?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_6_3 in Exclude<keyof I_6, "responses">]: never; }>(object: I_6): keystore.EncryptResponse;
        };
    };
    /**
     * Take a batch of invite messages and store the `TopicKeys` for later use in
     * decrypting messages
     */
    saveInvites: {
        req: {
            encode(message: keystore.SaveInvitesRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveInvitesRequest;
            fromJSON(object: any): keystore.SaveInvitesRequest;
            toJSON(message: keystore.SaveInvitesRequest): unknown;
            fromPartial<I_8 extends {
                requests?: {
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                requests?: ({
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                }[] & ({
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                } & {
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_28 in Exclude<keyof I_8["requests"][number]["timestampNs"], keyof long.default>]: never; }) | undefined;
                    payload?: Uint8Array | undefined;
                } & { [K_1_8 in Exclude<keyof I_8["requests"][number], keyof keystore.SaveInvitesRequest_Request>]: never; })[] & { [K_2_7 in Exclude<keyof I_8["requests"], keyof {
                    contentTopic?: string | undefined;
                    timestampNs?: string | number | long.default | undefined;
                    payload?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_3_6 in Exclude<keyof I_8, "requests">]: never; }>(object: I_8): keystore.SaveInvitesRequest;
        };
        res: {
            encode(message: keystore.SaveInvitesResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveInvitesResponse;
            fromJSON(object: any): keystore.SaveInvitesResponse;
            toJSON(message: keystore.SaveInvitesResponse): unknown;
            fromPartial<I_9 extends {
                responses?: {
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } & {
                        conversation?: ({
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } & {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | (long.default & {
                                high: number;
                                low: number;
                                unsigned: boolean;
                                add: (addend: string | number | long.default) => long.default;
                                and: (other: string | number | long.default) => long.default;
                                compare: (other: string | number | long.default) => number;
                                comp: (other: string | number | long.default) => number;
                                divide: (divisor: string | number | long.default) => long.default;
                                div: (divisor: string | number | long.default) => long.default;
                                equals: (other: string | number | long.default) => boolean;
                                eq: (other: string | number | long.default) => boolean;
                                getHighBits: () => number;
                                getHighBitsUnsigned: () => number;
                                getLowBits: () => number;
                                getLowBitsUnsigned: () => number;
                                getNumBitsAbs: () => number;
                                greaterThan: (other: string | number | long.default) => boolean;
                                gt: (other: string | number | long.default) => boolean;
                                greaterThanOrEqual: (other: string | number | long.default) => boolean;
                                gte: (other: string | number | long.default) => boolean;
                                ge: (other: string | number | long.default) => boolean;
                                isEven: () => boolean;
                                isNegative: () => boolean;
                                isOdd: () => boolean;
                                isPositive: () => boolean;
                                isZero: () => boolean;
                                eqz: () => boolean;
                                lessThan: (other: string | number | long.default) => boolean;
                                lt: (other: string | number | long.default) => boolean;
                                lessThanOrEqual: (other: string | number | long.default) => boolean;
                                lte: (other: string | number | long.default) => boolean;
                                le: (other: string | number | long.default) => boolean;
                                modulo: (other: string | number | long.default) => long.default;
                                mod: (other: string | number | long.default) => long.default;
                                rem: (other: string | number | long.default) => long.default;
                                multiply: (multiplier: string | number | long.default) => long.default;
                                mul: (multiplier: string | number | long.default) => long.default;
                                negate: () => long.default;
                                neg: () => long.default;
                                not: () => long.default;
                                countLeadingZeros: () => number;
                                clz: () => number;
                                countTrailingZeros: () => number;
                                ctz: () => number;
                                notEquals: (other: string | number | long.default) => boolean;
                                neq: (other: string | number | long.default) => boolean;
                                ne: (other: string | number | long.default) => boolean;
                                or: (other: string | number | long.default) => long.default;
                                shiftLeft: (numBits: number | long.default) => long.default;
                                shl: (numBits: number | long.default) => long.default;
                                shiftRight: (numBits: number | long.default) => long.default;
                                shr: (numBits: number | long.default) => long.default;
                                shiftRightUnsigned: (numBits: number | long.default) => long.default;
                                shru: (numBits: number | long.default) => long.default;
                                shr_u: (numBits: number | long.default) => long.default;
                                rotateLeft: (numBits: number | long.default) => long.default;
                                rotl: (numBits: number | long.default) => long.default;
                                rotateRight: (numBits: number | long.default) => long.default;
                                rotr: (numBits: number | long.default) => long.default;
                                subtract: (subtrahend: string | number | long.default) => long.default;
                                sub: (subtrahend: string | number | long.default) => long.default;
                                toInt: () => number;
                                toNumber: () => number;
                                toBytes: (le?: boolean | undefined) => number[];
                                toBytesLE: () => number[];
                                toBytesBE: () => number[];
                                toSigned: () => long.default;
                                toString: (radix?: number | undefined) => string;
                                toUnsigned: () => long.default;
                                xor: (other: string | number | long.default) => long.default;
                            } & { [K_29 in Exclude<keyof I_9["responses"][number]["result"]["conversation"]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                                } & { [K_1_9 in Exclude<keyof I_9["responses"][number]["result"]["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                            } & { [K_2_8 in Exclude<keyof I_9["responses"][number]["result"]["conversation"]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                        } & { [K_3_7 in Exclude<keyof I_9["responses"][number]["result"]["conversation"], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; }) | undefined;
                    } & { [K_4_6 in Exclude<keyof I_9["responses"][number]["result"], "conversation">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_5_4 in Exclude<keyof I_9["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_6_4 in Exclude<keyof I_9["responses"][number], keyof keystore.SaveInvitesResponse_Response>]: never; })[] & { [K_7_3 in Exclude<keyof I_9["responses"], keyof {
                    result?: {
                        conversation?: {
                            topic?: string | undefined;
                            peerAddress?: string | undefined;
                            createdNs?: string | number | long.default | undefined;
                            context?: {
                                conversationId?: string | undefined;
                                metadata?: {
                                    [x: string]: string | undefined;
                                } | undefined;
                            } | undefined;
                        } | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8_3 in Exclude<keyof I_9, "responses">]: never; }>(object: I_9): keystore.SaveInvitesResponse;
        };
    };
    /**
     * Create a sealed/encrypted invite and store the Topic keys in the Keystore
     * for later use. The returned invite payload must be sent to the network for
     * the other party to be able to communicate.
     */
    createInvite: {
        req: {
            encode(message: keystore.CreateInviteRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.CreateInviteRequest;
            fromJSON(object: any): keystore.CreateInviteRequest;
            toJSON(message: keystore.CreateInviteRequest): unknown;
            fromPartial<I_10 extends {
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
                createdNs?: string | number | long.default | undefined;
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
                    } & { [K_30 in Exclude<keyof I_10["context"]["metadata"], string | number>]: never; }) | undefined;
                } & { [K_1_10 in Exclude<keyof I_10["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
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
                            } & { [K_2_9 in Exclude<keyof I_10["recipient"]["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_3_8 in Exclude<keyof I_10["recipient"]["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_4_7 in Exclude<keyof I_10["recipient"]["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    } & { [K_5_5 in Exclude<keyof I_10["recipient"]["identityKey"], keyof publicKey.SignedPublicKey>]: never; }) | undefined;
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
                            } & { [K_6_5 in Exclude<keyof I_10["recipient"]["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_7_4 in Exclude<keyof I_10["recipient"]["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_8_4 in Exclude<keyof I_10["recipient"]["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    } & { [K_9_3 in Exclude<keyof I_10["recipient"]["preKey"], keyof publicKey.SignedPublicKey>]: never; }) | undefined;
                } & { [K_10_3 in Exclude<keyof I_10["recipient"], keyof publicKey.SignedPublicKeyBundle>]: never; }) | undefined;
                createdNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_11_3 in Exclude<keyof I_10["createdNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_12_3 in Exclude<keyof I_10, keyof keystore.CreateInviteRequest>]: never; }>(object: I_10): keystore.CreateInviteRequest;
        };
        res: {
            encode(message: keystore.CreateInviteResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.CreateInviteResponse;
            fromJSON(object: any): keystore.CreateInviteResponse;
            toJSON(message: keystore.CreateInviteResponse): unknown;
            fromPartial<I_11 extends {
                conversation?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                payload?: Uint8Array | undefined;
            } & {
                conversation?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_31 in Exclude<keyof I_11["conversation"]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_11 in Exclude<keyof I_11["conversation"]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_10 in Exclude<keyof I_11["conversation"]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_9 in Exclude<keyof I_11["conversation"], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; }) | undefined;
                payload?: Uint8Array | undefined;
            } & { [K_4_8 in Exclude<keyof I_11, keyof keystore.CreateInviteResponse>]: never; }>(object: I_11): keystore.CreateInviteResponse;
        };
    };
    /**
     * Create an BRIXBIT auth token to be used as a header on BRIXBIT API requests
     */
    createAuthToken: {
        req: {
            encode(message: keystore.CreateAuthTokenRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.CreateAuthTokenRequest;
            fromJSON(object: any): keystore.CreateAuthTokenRequest;
            toJSON(message: keystore.CreateAuthTokenRequest): unknown;
            fromPartial<I_12 extends {
                timestampNs?: string | number | long.default | undefined;
            } & {
                timestampNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_32 in Exclude<keyof I_12["timestampNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_1_12 in Exclude<keyof I_12, "timestampNs">]: never; }>(object: I_12): keystore.CreateAuthTokenRequest;
        };
        res: {
            encode(message: authn.Token, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): authn.Token;
            fromJSON(object: any): authn.Token;
            toJSON(message: authn.Token): unknown;
            fromPartial<I_13 extends {
                identityKey?: {
                    timestamp?: string | number | long.default | undefined;
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
                authDataBytes?: Uint8Array | undefined;
                authDataSignature?: {
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
                identityKey?: ({
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        /**
                         * Sets the time of a refresh job
                         */
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_33 in Exclude<keyof I_13["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_13 in Exclude<keyof I_13["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_2_11 in Exclude<keyof I_13["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_3_10 in Exclude<keyof I_13["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_4_9 in Exclude<keyof I_13["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_5_6 in Exclude<keyof I_13["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                authDataBytes?: Uint8Array | undefined;
                authDataSignature?: ({
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
                    } & { [K_6_6 in Exclude<keyof I_13["authDataSignature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                    walletEcdsaCompact?: ({
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        recovery?: number | undefined;
                    } & { [K_7_5 in Exclude<keyof I_13["authDataSignature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                } & { [K_8_5 in Exclude<keyof I_13["authDataSignature"], keyof signature.Signature>]: never; }) | undefined;
            } & { [K_9_4 in Exclude<keyof I_13, keyof authn.Token>]: never; }>(object: I_13): authn.Token;
        };
    };
    /**
     * Sign the provided digest with either the `IdentityKey` or a specified
     * `PreKey`
     */
    signDigest: {
        req: {
            encode(message: keystore.SignDigestRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SignDigestRequest;
            fromJSON(object: any): keystore.SignDigestRequest;
            toJSON(message: keystore.SignDigestRequest): unknown;
            fromPartial<I_14 extends {
                digest?: Uint8Array | undefined;
                identityKey?: boolean | undefined;
                prekeyIndex?: number | undefined;
            } & {
                digest?: Uint8Array | undefined;
                identityKey?: boolean | undefined;
                prekeyIndex?: number | undefined;
            } & { [K_34 in Exclude<keyof I_14, keyof keystore.SignDigestRequest>]: never; }>(object: I_14): keystore.SignDigestRequest;
        };
        res: {
            encode(message: signature.Signature, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): signature.Signature;
            fromJSON(object: any): signature.Signature;
            toJSON(message: signature.Signature): unknown;
            fromPartial<I_15 extends {
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
                } & { [K_35 in Exclude<keyof I_15["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                walletEcdsaCompact?: ({
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    recovery?: number | undefined;
                } & { [K_1_14 in Exclude<keyof I_15["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
            } & { [K_2_12 in Exclude<keyof I_15, keyof signature.Signature>]: never; }>(object: I_15): signature.Signature;
        };
    };
    /**
     * Get the `PublicKeyBundle` associated with the Keystore's private keys
     */
    getPublicKeyBundle: {
        req: null;
        res: {
            encode(message: publicKey.PublicKeyBundle, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): publicKey.PublicKeyBundle;
            fromJSON(object: any): publicKey.PublicKeyBundle;
            toJSON(message: publicKey.PublicKeyBundle): unknown;
            fromPartial<I_16 extends {
                identityKey?: {
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_36 in Exclude<keyof I_16["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_15 in Exclude<keyof I_16["identityKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_2_13 in Exclude<keyof I_16["identityKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_3_11 in Exclude<keyof I_16["identityKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_4_10 in Exclude<keyof I_16["identityKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_5_7 in Exclude<keyof I_16["identityKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                preKey?: ({
                    timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_6_7 in Exclude<keyof I_16["preKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_7_6 in Exclude<keyof I_16["preKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_8_6 in Exclude<keyof I_16["preKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_9_5 in Exclude<keyof I_16["preKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                    secp256k1Uncompressed?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_10_4 in Exclude<keyof I_16["preKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                } & { [K_11_4 in Exclude<keyof I_16["preKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
            } & { [K_12_4 in Exclude<keyof I_16, keyof publicKey.PublicKeyBundle>]: never; }>(object: I_16): publicKey.PublicKeyBundle;
        };
    };
    /**
     * Export the private keys. May throw an error if the keystore implementation
     * does not allow this operation
     */
    getPrivateKeyBundle: {
        req: null;
        res: {
            encode(message: privateKey.PrivateKeyBundleV1, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): privateKey.PrivateKeyBundleV1;
            fromJSON(object: any): privateKey.PrivateKeyBundleV1;
            toJSON(message: privateKey.PrivateKeyBundleV1): unknown;
            fromPartial<I_17 extends {
                identityKey?: {
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_37 in Exclude<keyof I_17["identityKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
                    secp256k1?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_1_16 in Exclude<keyof I_17["identityKey"]["secp256k1"], "bytes">]: never; }) | undefined;
                    publicKey?: ({
                        timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | (long.default & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | long.default) => long.default;
                            and: (other: string | number | long.default) => long.default;
                            compare: (other: string | number | long.default) => number;
                            comp: (other: string | number | long.default) => number;
                            divide: (divisor: string | number | long.default) => long.default;
                            div: (divisor: string | number | long.default) => long.default;
                            equals: (other: string | number | long.default) => boolean;
                            eq: (other: string | number | long.default) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | long.default) => boolean;
                            gt: (other: string | number | long.default) => boolean;
                            greaterThanOrEqual: (other: string | number | long.default) => boolean;
                            gte: (other: string | number | long.default) => boolean;
                            ge: (other: string | number | long.default) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | long.default) => boolean;
                            lt: (other: string | number | long.default) => boolean;
                            lessThanOrEqual: (other: string | number | long.default) => boolean;
                            lte: (other: string | number | long.default) => boolean;
                            le: (other: string | number | long.default) => boolean;
                            modulo: (other: string | number | long.default) => long.default;
                            mod: (other: string | number | long.default) => long.default;
                            rem: (other: string | number | long.default) => long.default;
                            multiply: (multiplier: string | number | long.default) => long.default;
                            mul: (multiplier: string | number | long.default) => long.default;
                            negate: () => long.default;
                            neg: () => long.default;
                            not: () => long.default;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | long.default) => boolean;
                            neq: (other: string | number | long.default) => boolean;
                            ne: (other: string | number | long.default) => boolean;
                            or: (other: string | number | long.default) => long.default;
                            shiftLeft: (numBits: number | long.default) => long.default;
                            shl: (numBits: number | long.default) => long.default;
                            shiftRight: (numBits: number | long.default) => long.default;
                            shr: (numBits: number | long.default) => long.default;
                            shiftRightUnsigned: (numBits: number | long.default) => long.default;
                            shru: (numBits: number | long.default) => long.default;
                            shr_u: (numBits: number | long.default) => long.default;
                            rotateLeft: (numBits: number | long.default) => long.default;
                            rotl: (numBits: number | long.default) => long.default;
                            rotateRight: (numBits: number | long.default) => long.default;
                            rotr: (numBits: number | long.default) => long.default;
                            subtract: (subtrahend: string | number | long.default) => long.default;
                            sub: (subtrahend: string | number | long.default) => long.default;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => long.default;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => long.default;
                            xor: (other: string | number | long.default) => long.default;
                        } & { [K_2_14 in Exclude<keyof I_17["identityKey"]["publicKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                            } & { [K_3_12 in Exclude<keyof I_17["identityKey"]["publicKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_4_11 in Exclude<keyof I_17["identityKey"]["publicKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_5_8 in Exclude<keyof I_17["identityKey"]["publicKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                        secp256k1Uncompressed?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_6_8 in Exclude<keyof I_17["identityKey"]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                    } & { [K_7_7 in Exclude<keyof I_17["identityKey"]["publicKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                } & { [K_8_7 in Exclude<keyof I_17["identityKey"], keyof privateKey.PrivateKey>]: never; }) | undefined;
                preKeys?: ({
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
                    timestamp?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_9_6 in Exclude<keyof I_17["preKeys"][number]["timestamp"], keyof long.default>]: never; }) | undefined;
                    secp256k1?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_10_5 in Exclude<keyof I_17["preKeys"][number]["secp256k1"], "bytes">]: never; }) | undefined;
                    publicKey?: ({
                        timestamp?: string | number | long.default | undefined;
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
                        timestamp?: string | number | (long.default & {
                            high: number;
                            low: number;
                            unsigned: boolean;
                            add: (addend: string | number | long.default) => long.default;
                            and: (other: string | number | long.default) => long.default;
                            compare: (other: string | number | long.default) => number;
                            comp: (other: string | number | long.default) => number;
                            divide: (divisor: string | number | long.default) => long.default;
                            div: (divisor: string | number | long.default) => long.default;
                            equals: (other: string | number | long.default) => boolean;
                            eq: (other: string | number | long.default) => boolean;
                            getHighBits: () => number;
                            getHighBitsUnsigned: () => number;
                            getLowBits: () => number;
                            getLowBitsUnsigned: () => number;
                            getNumBitsAbs: () => number;
                            greaterThan: (other: string | number | long.default) => boolean;
                            gt: (other: string | number | long.default) => boolean;
                            greaterThanOrEqual: (other: string | number | long.default) => boolean;
                            gte: (other: string | number | long.default) => boolean;
                            ge: (other: string | number | long.default) => boolean;
                            isEven: () => boolean;
                            isNegative: () => boolean;
                            isOdd: () => boolean;
                            isPositive: () => boolean;
                            isZero: () => boolean;
                            eqz: () => boolean;
                            lessThan: (other: string | number | long.default) => boolean;
                            lt: (other: string | number | long.default) => boolean;
                            lessThanOrEqual: (other: string | number | long.default) => boolean;
                            lte: (other: string | number | long.default) => boolean;
                            le: (other: string | number | long.default) => boolean;
                            modulo: (other: string | number | long.default) => long.default;
                            mod: (other: string | number | long.default) => long.default;
                            rem: (other: string | number | long.default) => long.default;
                            multiply: (multiplier: string | number | long.default) => long.default;
                            mul: (multiplier: string | number | long.default) => long.default;
                            negate: () => long.default;
                            neg: () => long.default;
                            not: () => long.default;
                            countLeadingZeros: () => number;
                            clz: () => number;
                            countTrailingZeros: () => number;
                            ctz: () => number;
                            notEquals: (other: string | number | long.default) => boolean;
                            neq: (other: string | number | long.default) => boolean;
                            ne: (other: string | number | long.default) => boolean;
                            or: (other: string | number | long.default) => long.default;
                            shiftLeft: (numBits: number | long.default) => long.default;
                            shl: (numBits: number | long.default) => long.default;
                            shiftRight: (numBits: number | long.default) => long.default;
                            shr: (numBits: number | long.default) => long.default;
                            shiftRightUnsigned: (numBits: number | long.default) => long.default;
                            shru: (numBits: number | long.default) => long.default;
                            shr_u: (numBits: number | long.default) => long.default;
                            rotateLeft: (numBits: number | long.default) => long.default;
                            rotl: (numBits: number | long.default) => long.default;
                            rotateRight: (numBits: number | long.default) => long.default;
                            rotr: (numBits: number | long.default) => long.default;
                            subtract: (subtrahend: string | number | long.default) => long.default;
                            sub: (subtrahend: string | number | long.default) => long.default;
                            toInt: () => number;
                            toNumber: () => number;
                            toBytes: (le?: boolean | undefined) => number[];
                            toBytesLE: () => number[];
                            toBytesBE: () => number[];
                            toSigned: () => long.default;
                            toString: (radix?: number | undefined) => string;
                            toUnsigned: () => long.default;
                            xor: (other: string | number | long.default) => long.default;
                        } & { [K_11_5 in Exclude<keyof I_17["preKeys"][number]["publicKey"]["timestamp"], keyof long.default>]: never; }) | undefined;
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
                            } & { [K_12_5 in Exclude<keyof I_17["preKeys"][number]["publicKey"]["signature"]["ecdsaCompact"], keyof signature.Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_13_3 in Exclude<keyof I_17["preKeys"][number]["publicKey"]["signature"]["walletEcdsaCompact"], keyof signature.Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_14_3 in Exclude<keyof I_17["preKeys"][number]["publicKey"]["signature"], keyof signature.Signature>]: never; }) | undefined;
                        secp256k1Uncompressed?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_15_3 in Exclude<keyof I_17["preKeys"][number]["publicKey"]["secp256k1Uncompressed"], "bytes">]: never; }) | undefined;
                    } & { [K_16_2 in Exclude<keyof I_17["preKeys"][number]["publicKey"], keyof publicKey.PublicKey>]: never; }) | undefined;
                } & { [K_17_2 in Exclude<keyof I_17["preKeys"][number], keyof privateKey.PrivateKey>]: never; })[] & { [K_18_1 in Exclude<keyof I_17["preKeys"], keyof {
                    timestamp?: string | number | long.default | undefined;
                    secp256k1?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    publicKey?: {
                        timestamp?: string | number | long.default | undefined;
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
            } & { [K_19_1 in Exclude<keyof I_17, keyof privateKey.PrivateKeyBundleV1>]: never; }>(object: I_17): privateKey.PrivateKeyBundleV1;
        };
    };
    /**
     * Save V1 Conversations
     */
    saveV1Conversations: {
        req: {
            encode(message: keystore.SaveV1ConversationsRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveV1ConversationsRequest;
            fromJSON(object: any): keystore.SaveV1ConversationsRequest;
            toJSON(message: keystore.SaveV1ConversationsRequest): unknown;
            fromPartial<I_18 extends {
                conversations?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                conversations?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] & ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_38 in Exclude<keyof I_18["conversations"][number]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_17 in Exclude<keyof I_18["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_15 in Exclude<keyof I_18["conversations"][number]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_13 in Exclude<keyof I_18["conversations"][number], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; })[] & { [K_4_12 in Exclude<keyof I_18["conversations"], keyof {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5_9 in Exclude<keyof I_18, "conversations">]: never; }>(object: I_18): keystore.SaveV1ConversationsRequest;
        };
        res: {
            encode(_: keystore.SaveV1ConversationsResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SaveV1ConversationsResponse;
            fromJSON(_: any): keystore.SaveV1ConversationsResponse;
            toJSON(_: keystore.SaveV1ConversationsResponse): unknown;
            fromPartial<I_19 extends { [K_39 in Exclude<keyof I_19, never>]: never; }>(_: I_19): keystore.SaveV1ConversationsResponse;
        };
    };
    /**
     * Get a list of V1 conversations
     */
    getV1Conversations: {
        req: null;
        res: {
            encode(message: keystore.GetConversationsResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetConversationsResponse;
            fromJSON(object: any): keystore.GetConversationsResponse;
            toJSON(message: keystore.GetConversationsResponse): unknown;
            fromPartial<I_20 extends {
                conversations?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                conversations?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] & ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_40 in Exclude<keyof I_20["conversations"][number]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_18 in Exclude<keyof I_20["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_16 in Exclude<keyof I_20["conversations"][number]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_14 in Exclude<keyof I_20["conversations"][number], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; })[] & { [K_4_13 in Exclude<keyof I_20["conversations"], keyof {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5_10 in Exclude<keyof I_20, "conversations">]: never; }>(object: I_20): keystore.GetConversationsResponse;
        };
    };
    /**
     * Get a list of V2 conversations
     */
    getV2Conversations: {
        req: null;
        res: {
            encode(message: keystore.GetConversationsResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetConversationsResponse;
            fromJSON(object: any): keystore.GetConversationsResponse;
            toJSON(message: keystore.GetConversationsResponse): unknown;
            fromPartial<I_20 extends {
                conversations?: {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                conversations?: ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[] & ({
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | (long.default & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | long.default) => long.default;
                        and: (other: string | number | long.default) => long.default;
                        compare: (other: string | number | long.default) => number;
                        comp: (other: string | number | long.default) => number;
                        divide: (divisor: string | number | long.default) => long.default;
                        div: (divisor: string | number | long.default) => long.default;
                        equals: (other: string | number | long.default) => boolean;
                        eq: (other: string | number | long.default) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | long.default) => boolean;
                        gt: (other: string | number | long.default) => boolean;
                        greaterThanOrEqual: (other: string | number | long.default) => boolean;
                        gte: (other: string | number | long.default) => boolean;
                        ge: (other: string | number | long.default) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | long.default) => boolean;
                        lt: (other: string | number | long.default) => boolean;
                        lessThanOrEqual: (other: string | number | long.default) => boolean;
                        lte: (other: string | number | long.default) => boolean;
                        le: (other: string | number | long.default) => boolean;
                        modulo: (other: string | number | long.default) => long.default;
                        mod: (other: string | number | long.default) => long.default;
                        rem: (other: string | number | long.default) => long.default;
                        multiply: (multiplier: string | number | long.default) => long.default;
                        mul: (multiplier: string | number | long.default) => long.default;
                        negate: () => long.default;
                        neg: () => long.default;
                        not: () => long.default;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | long.default) => boolean;
                        neq: (other: string | number | long.default) => boolean;
                        ne: (other: string | number | long.default) => boolean;
                        or: (other: string | number | long.default) => long.default;
                        shiftLeft: (numBits: number | long.default) => long.default;
                        shl: (numBits: number | long.default) => long.default;
                        shiftRight: (numBits: number | long.default) => long.default;
                        shr: (numBits: number | long.default) => long.default;
                        shiftRightUnsigned: (numBits: number | long.default) => long.default;
                        shru: (numBits: number | long.default) => long.default;
                        shr_u: (numBits: number | long.default) => long.default;
                        rotateLeft: (numBits: number | long.default) => long.default;
                        rotl: (numBits: number | long.default) => long.default;
                        rotateRight: (numBits: number | long.default) => long.default;
                        rotr: (numBits: number | long.default) => long.default;
                        subtract: (subtrahend: string | number | long.default) => long.default;
                        sub: (subtrahend: string | number | long.default) => long.default;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => long.default;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => long.default;
                        xor: (other: string | number | long.default) => long.default;
                    } & { [K_40 in Exclude<keyof I_20["conversations"][number]["createdNs"], keyof long.default>]: never; }) | undefined;
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
                        } & { [K_1_18 in Exclude<keyof I_20["conversations"][number]["context"]["metadata"], string | number>]: never; }) | undefined;
                    } & { [K_2_16 in Exclude<keyof I_20["conversations"][number]["context"], keyof _brixbit_proto_ts_dist_types_message_contents_invitation_pb.InvitationV1_Context>]: never; }) | undefined;
                } & { [K_3_14 in Exclude<keyof I_20["conversations"][number], keyof _brixbit_proto_ts_dist_types_message_contents_conversation_reference_pb.ConversationReference>]: never; })[] & { [K_4_13 in Exclude<keyof I_20["conversations"], keyof {
                    topic?: string | undefined;
                    peerAddress?: string | undefined;
                    createdNs?: string | number | long.default | undefined;
                    context?: {
                        conversationId?: string | undefined;
                        metadata?: {
                            [x: string]: string | undefined;
                        } | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5_10 in Exclude<keyof I_20, "conversations">]: never; }>(object: I_20): keystore.GetConversationsResponse;
        };
    };
    /**
     * Get a refresh job from the persistence
     */
    getRefreshJob: {
        req: {
            encode(message: keystore.GetRefreshJobRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetRefreshJobRequest;
            fromJSON(object: any): keystore.GetRefreshJobRequest;
            toJSON(message: keystore.GetRefreshJobRequest): unknown;
            fromPartial<I_21 extends {
                jobType?: keystore.JobType | undefined;
            } & {
                jobType?: keystore.JobType | undefined;
            } & { [K_41 in Exclude<keyof I_21, "jobType">]: never; }>(object: I_21): keystore.GetRefreshJobRequest;
        };
        res: {
            encode(message: keystore.GetRefreshJobResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetRefreshJobResponse;
            fromJSON(object: any): keystore.GetRefreshJobResponse;
            toJSON(message: keystore.GetRefreshJobResponse): unknown;
            fromPartial<I_22 extends {
                lastRunNs?: string | number | long.default | undefined;
            } & {
                lastRunNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_42 in Exclude<keyof I_22["lastRunNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_1_19 in Exclude<keyof I_22, "lastRunNs">]: never; }>(object: I_22): keystore.GetRefreshJobResponse;
        };
    };
    /**
     * Sets the time of a refresh job
     */
    setRefreshJob: {
        req: {
            encode(message: keystore.SetRefeshJobRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SetRefeshJobRequest;
            fromJSON(object: any): keystore.SetRefeshJobRequest;
            toJSON(message: keystore.SetRefeshJobRequest): unknown;
            fromPartial<I_23 extends {
                jobType?: keystore.JobType | undefined;
                lastRunNs?: string | number | long.default | undefined;
            } & {
                jobType?: keystore.JobType | undefined;
                lastRunNs?: string | number | (long.default & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | long.default) => long.default;
                    and: (other: string | number | long.default) => long.default;
                    compare: (other: string | number | long.default) => number;
                    comp: (other: string | number | long.default) => number;
                    divide: (divisor: string | number | long.default) => long.default;
                    div: (divisor: string | number | long.default) => long.default;
                    equals: (other: string | number | long.default) => boolean;
                    eq: (other: string | number | long.default) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | long.default) => boolean;
                    gt: (other: string | number | long.default) => boolean;
                    greaterThanOrEqual: (other: string | number | long.default) => boolean;
                    gte: (other: string | number | long.default) => boolean;
                    ge: (other: string | number | long.default) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | long.default) => boolean;
                    lt: (other: string | number | long.default) => boolean;
                    lessThanOrEqual: (other: string | number | long.default) => boolean;
                    lte: (other: string | number | long.default) => boolean;
                    le: (other: string | number | long.default) => boolean;
                    modulo: (other: string | number | long.default) => long.default;
                    mod: (other: string | number | long.default) => long.default;
                    rem: (other: string | number | long.default) => long.default;
                    multiply: (multiplier: string | number | long.default) => long.default;
                    mul: (multiplier: string | number | long.default) => long.default;
                    negate: () => long.default;
                    neg: () => long.default;
                    not: () => long.default;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | long.default) => boolean;
                    neq: (other: string | number | long.default) => boolean;
                    ne: (other: string | number | long.default) => boolean;
                    or: (other: string | number | long.default) => long.default;
                    shiftLeft: (numBits: number | long.default) => long.default;
                    shl: (numBits: number | long.default) => long.default;
                    shiftRight: (numBits: number | long.default) => long.default;
                    shr: (numBits: number | long.default) => long.default;
                    shiftRightUnsigned: (numBits: number | long.default) => long.default;
                    shru: (numBits: number | long.default) => long.default;
                    shr_u: (numBits: number | long.default) => long.default;
                    rotateLeft: (numBits: number | long.default) => long.default;
                    rotl: (numBits: number | long.default) => long.default;
                    rotateRight: (numBits: number | long.default) => long.default;
                    rotr: (numBits: number | long.default) => long.default;
                    subtract: (subtrahend: string | number | long.default) => long.default;
                    sub: (subtrahend: string | number | long.default) => long.default;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => long.default;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => long.default;
                    xor: (other: string | number | long.default) => long.default;
                } & { [K_43 in Exclude<keyof I_23["lastRunNs"], keyof long.default>]: never; }) | undefined;
            } & { [K_1_20 in Exclude<keyof I_23, keyof keystore.SetRefeshJobRequest>]: never; }>(object: I_23): keystore.SetRefeshJobRequest;
        };
        res: {
            encode(_: keystore.SetRefreshJobResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SetRefreshJobResponse;
            fromJSON(_: any): keystore.SetRefreshJobResponse;
            toJSON(_: keystore.SetRefreshJobResponse): unknown;
            fromPartial<I_24 extends { [K_44 in Exclude<keyof I_24, never>]: never; }>(_: I_24): keystore.SetRefreshJobResponse;
        };
    };
    /**
     * Encrypt a batch of messages to yourself
     */
    selfEncrypt: {
        req: {
            encode(message: keystore.SelfEncryptRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SelfEncryptRequest;
            fromJSON(object: any): keystore.SelfEncryptRequest;
            toJSON(message: keystore.SelfEncryptRequest): unknown;
            fromPartial<I_25 extends {
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
                } & { [K_45 in Exclude<keyof I_25["requests"][number], "payload">]: never; })[] & { [K_1_21 in Exclude<keyof I_25["requests"], keyof {
                    payload?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2_17 in Exclude<keyof I_25, "requests">]: never; }>(object: I_25): keystore.SelfEncryptRequest;
        };
        res: {
            encode(message: keystore.SelfEncryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SelfEncryptResponse;
            fromJSON(object: any): keystore.SelfEncryptResponse;
            toJSON(message: keystore.SelfEncryptResponse): unknown;
            fromPartial<I_26 extends {
                responses?: {
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        encrypted?: Uint8Array | undefined;
                    } & {
                        encrypted?: Uint8Array | undefined;
                    } & { [K_46 in Exclude<keyof I_26["responses"][number]["result"], "encrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_22 in Exclude<keyof I_26["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_18 in Exclude<keyof I_26["responses"][number], keyof keystore.SelfEncryptResponse_Response>]: never; })[] & { [K_3_15 in Exclude<keyof I_26["responses"], keyof {
                    result?: {
                        encrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_14 in Exclude<keyof I_26, "responses">]: never; }>(object: I_26): keystore.SelfEncryptResponse;
        };
    };
    /**
     * Decrypt a batch of messages to yourself
     */
    selfDecrypt: {
        req: {
            encode(message: keystore.SelfDecryptRequest, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.SelfDecryptRequest;
            fromJSON(object: any): keystore.SelfDecryptRequest;
            toJSON(message: keystore.SelfDecryptRequest): unknown;
            fromPartial<I_27 extends {
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
                } & { [K_47 in Exclude<keyof I_27["requests"][number], "payload">]: never; })[] & { [K_1_23 in Exclude<keyof I_27["requests"], keyof {
                    payload?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2_19 in Exclude<keyof I_27, "requests">]: never; }>(object: I_27): keystore.SelfDecryptRequest;
        };
        res: {
            encode(message: keystore.DecryptResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.DecryptResponse;
            fromJSON(object: any): keystore.DecryptResponse;
            toJSON(message: keystore.DecryptResponse): unknown;
            fromPartial<I_3 extends {
                responses?: {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] | undefined;
            } & {
                responses?: ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[] & ({
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                } & {
                    result?: ({
                        decrypted?: Uint8Array | undefined;
                    } & {
                        decrypted?: Uint8Array | undefined;
                    } & { [K_23 in Exclude<keyof I_3["responses"][number]["result"], "decrypted">]: never; }) | undefined;
                    error?: ({
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } & { [K_1_3 in Exclude<keyof I_3["responses"][number]["error"], keyof keystore.KeystoreError>]: never; }) | undefined;
                } & { [K_2_2 in Exclude<keyof I_3["responses"][number], keyof keystore.DecryptResponse_Response>]: never; })[] & { [K_3_2 in Exclude<keyof I_3["responses"], keyof {
                    result?: {
                        decrypted?: Uint8Array | undefined;
                    } | undefined;
                    error?: {
                        message?: string | undefined;
                        code?: keystore.ErrorCode | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4_2 in Exclude<keyof I_3, "responses">]: never; }>(object: I_3): keystore.DecryptResponse;
        };
    };
    /**
     * Get the private preferences topic identifier
     */
    getPrivatePreferencesTopicIdentifier: {
        req: null;
        res: {
            encode(message: keystore.GetPrivatePreferencesTopicIdentifierResponse, writer?: Writer | undefined): Writer;
            decode(input: Uint8Array | Reader, length?: number | undefined): keystore.GetPrivatePreferencesTopicIdentifierResponse;
            fromJSON(object: any): keystore.GetPrivatePreferencesTopicIdentifierResponse;
            toJSON(message: keystore.GetPrivatePreferencesTopicIdentifierResponse): unknown;
            fromPartial<I_28 extends {
                identifier?: string | undefined;
            } & {
                identifier?: string | undefined;
            } & { [K_48 in Exclude<keyof I_28, "identifier">]: never; }>(object: I_28): keystore.GetPrivatePreferencesTopicIdentifierResponse;
        };
    };
};
type SnapKeystoreApiDefs = typeof snapApiDefs;
type SnapKeystoreApiMethods = keyof SnapKeystoreApiDefs;
type SnapKeystoreInterface = ExtractInterface<SnapKeystoreApiDefs>;
type SnapKeystoreApiEntries = Entries<SnapKeystoreApiDefs>;
type SnapKeystoreApiRequestEncoders = ExtractInterfaceRequestEncoders<SnapKeystoreApiDefs>;
type SnapKeystoreApiResponseDecoders = ExtractInterfaceResponseDecoders<SnapKeystoreApiDefs>;
type SnapKeystoreInterfaceRequestValues = ExtractInterfaceRequestValues<SnapKeystoreInterface>;
type SnapKeystoreApiRequestValues = Values<SnapKeystoreInterfaceRequestValues>;
/**
 * A Keystore is responsible for holding the user's BRIXBIT private keys and using them to encrypt/decrypt/sign messages.
 * Keystores are instantiated using a `KeystoreProvider`
 */
type KeystoreInterfaces = KeystoreInterface | SnapKeystoreInterface;

interface Authenticator {
    createToken(timestamp?: Date): Promise<Token>;
}

declare class AuthCache {
    private authenticator;
    private token?;
    maxAgeMs: number;
    constructor(authenticator: Authenticator, cacheExpirySeconds?: number);
    getToken(): Promise<string>;
    refresh(): Promise<void>;
}

declare const MessageApi: typeof messageApi.MessageApi;
declare const SortDirection: typeof messageApi.SortDirection;
declare const ApiUrls: {
    readonly local: "http://localhost:5555";
    readonly dev: "https://dev.brixbit.network";
    readonly production: "https://production.brixbit.network";
};
type QueryParams = {
    startTime?: Date;
    endTime?: Date;
    contentTopic: string;
};
type QueryAllOptions = {
    direction?: messageApi.SortDirection;
    limit?: number;
};
type QueryStreamOptions = Flatten<Omit<QueryAllOptions, 'limit'> & {
    pageSize?: number;
}>;
type Query = Flatten<QueryParams & QueryStreamOptions>;
type PublishParams = {
    contentTopic: string;
    message: Uint8Array;
    timestamp?: Date;
};
type SubscribeParams = {
    contentTopics: string[];
};
type ApiClientOptions = {
    maxRetries?: number;
    appVersion?: string;
};
type SubscribeCallback = NotifyStreamEntityArrival<messageApi.Envelope>;
type UnsubscribeFn = () => Promise<void>;
type UpdateContentTopics = (topics: string[]) => Promise<void>;
type SubscriptionManager = {
    unsubscribe: UnsubscribeFn;
    updateContentTopics?: UpdateContentTopics;
};
type OnConnectionLostCallback = () => void;
interface ApiClient {
    query(params: QueryParams, options: QueryAllOptions): Promise<messageApi.Envelope[]>;
    queryIterator(params: QueryParams, options: QueryStreamOptions): AsyncGenerator<messageApi.Envelope>;
    queryIteratePages(params: QueryParams, options: QueryStreamOptions): AsyncGenerator<messageApi.Envelope[]>;
    subscribe(params: SubscribeParams, callback: SubscribeCallback, onConnectionLost?: OnConnectionLostCallback): SubscriptionManager;
    publish(messages: PublishParams[]): ReturnType<typeof MessageApi.Publish>;
    batchQuery(queries: Query[]): Promise<messageApi.Envelope[][]>;
    setAuthenticator(authenticator: Authenticator, cacheExpirySeconds?: number): void;
}
/**
 * ApiClient provides a wrapper for calling the GRPC Gateway generated code.
 * It adds some helpers for dealing with paginated data and automatically retries idempotent calls
 */
declare class HttpApiClient implements ApiClient {
    pathPrefix: string;
    maxRetries: number;
    private authCache?;
    appVersion: string | undefined;
    version: string;
    constructor(pathPrefix: string, opts?: ApiClientOptions);
    private _query;
    private _batchQuery;
    private _publish;
    private _subscribe;
    query(params: QueryParams, { direction, limit, }: QueryAllOptions): Promise<messageApi.Envelope[]>;
    queryIterator(params: QueryParams, options: QueryStreamOptions): AsyncGenerator<messageApi.Envelope>;
    queryIteratePages({ contentTopic, startTime, endTime }: QueryParams, { direction, pageSize }: QueryStreamOptions): AsyncGenerator<messageApi.Envelope[]>;
    batchQuery(queries: Query[]): Promise<messageApi.Envelope[][]>;
    publish(messages: PublishParams[]): ReturnType<typeof MessageApi.Publish>;
    subscribe(params: SubscribeParams, callback: SubscribeCallback, onConnectionLost?: OnConnectionLostCallback): SubscriptionManager;
    private getToken;
    setAuthenticator(authenticator: Authenticator, cacheExpirySeconds?: number): void;
    headers(): Headers;
}

declare const buildContentTopic: (name: string) => string;
declare const buildDirectMessageTopic: (sender: string, recipient: string) => string;
declare const buildDirectMessageTopicV2: (randomString: string) => string;
declare const buildUserContactTopic: (walletAddr: string) => string;
declare const buildUserIntroTopic: (walletAddr: string) => string;
declare const buildUserInviteTopic: (walletAddr: string) => string;
declare const buildUserPrivateStoreTopic: (addrPrefixedKey: string) => string;

type IsRetryable = (err?: Error) => boolean;
declare function retry<T extends (...arg0: any[]) => any>(fn: T, args: Parameters<T>, maxRetries: number, sleepTime: number, isRetryableFn?: IsRetryable, retryCount?: number): Promise<Awaited<ReturnType<T>>>;
type EnvelopeWithMessage = Flatten<messageApi.Envelope & Required<Pick<messageApi.Envelope, 'message'>>>;
type EnvelopeMapperWithMessage<Out> = (env: EnvelopeWithMessage) => Promise<Out>;
type EnvelopeMapper<Out> = (env: messageApi.Envelope) => Promise<Out>;
declare function mapPaginatedStream<Out>(gen: AsyncGenerator<messageApi.Envelope[]>, mapper: EnvelopeMapper<Out>): AsyncGenerator<Out[]>;

declare function dateToNs(date: Date): long__default;
declare function nsToDate(ns: long__default): Date;
declare const toNanoString: (d: Date | undefined) => undefined | string;
declare const fromNanoString: (s: string | undefined) => undefined | Date;

type InvitationContext = {
    conversationId: string;
    metadata: {
        [k: string]: string;
    };
};
/**
 * InvitationV1 is a protobuf message to be encrypted and used as the ciphertext in a SealedInvitationV1 message
 */
declare class InvitationV1 implements invitation.InvitationV1 {
    topic: string;
    context: InvitationContext | undefined;
    aes256GcmHkdfSha256: invitation.InvitationV1_Aes256gcmHkdfsha256;
    constructor({ topic, context, aes256GcmHkdfSha256, }: invitation.InvitationV1);
    static createRandom(context?: invitation.InvitationV1_Context): InvitationV1;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): InvitationV1;
}
/**
 * SealedInvitationHeaderV1 is a protobuf message to be used as the headerBytes in a SealedInvitationV1
 */
declare class SealedInvitationHeaderV1 implements invitation.SealedInvitationHeaderV1 {
    sender: SignedPublicKeyBundle;
    recipient: SignedPublicKeyBundle;
    createdNs: long__default;
    constructor({ sender, recipient, createdNs, }: invitation.SealedInvitationHeaderV1);
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): SealedInvitationHeaderV1;
}
declare class SealedInvitationV1 implements invitation.SealedInvitationV1 {
    headerBytes: Uint8Array;
    ciphertext: Ciphertext;
    private _header?;
    private _invitation?;
    constructor({ headerBytes, ciphertext }: invitation.SealedInvitationV1);
    /**
     * Accessor method for the full header object
     */
    get header(): SealedInvitationHeaderV1;
    /**
     * getInvitation decrypts and returns the InvitationV1 stored in the ciphertext of the Sealed Invitation
     */
    getInvitation(viewer: PrivateKeyBundleV2): Promise<InvitationV1>;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): SealedInvitationV1;
}
/**
 * Wrapper class for SealedInvitationV1 and any future iterations of SealedInvitation
 */
declare class SealedInvitation implements invitation.SealedInvitation {
    v1: SealedInvitationV1 | undefined;
    constructor({ v1 }: invitation.SealedInvitation);
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): SealedInvitation;
    static fromEnvelope(env: messageApi.Envelope): Promise<SealedInvitation>;
    /**
     * Create a SealedInvitation with a SealedInvitationV1 payload
     * Will encrypt all contents and validate inputs
     */
    static createV1({ sender, recipient, created, invitation, }: {
        sender: PrivateKeyBundleV2;
        recipient: SignedPublicKeyBundle;
        created: Date;
        invitation: InvitationV1;
    }): Promise<SealedInvitation>;
}

/**
 * Conversations allows you to view ongoing 1:1 messaging sessions with another wallet
 */
declare class Conversations<ContentTypes = any> {
    private client;
    private v1JobRunner;
    private v2JobRunner;
    constructor(client: Client<ContentTypes>);
    /**
     * List all conversations with the current wallet found in the network.
     */
    list(): Promise<Conversation<ContentTypes>[]>;
    /**
     * List all conversations stored in the client cache, which may not include
     * conversations on the network.
     */
    listFromCache(): Promise<Conversation<ContentTypes>[]>;
    private listV1Conversations;
    /**
     * List all V2 conversations
     */
    private listV2Conversations;
    private getV2ConversationsFromKeystore;
    private getV1ConversationsFromKeystore;
    updateV2Conversations(startTime?: Date): Promise<ConversationV2<ContentTypes>[]>;
    private decodeInvites;
    private saveInviteResponseToConversation;
    private conversationReferenceToV2;
    private conversationReferenceToV1;
    /**
     * Returns a stream of any newly created conversations.
     * Will dedupe to not return the same conversation twice in the same stream.
     * Does not dedupe any other previously seen conversations
     */
    stream(onConnectionLost?: OnConnectionLostCallback): Promise<Stream<Conversation<ContentTypes>, ContentTypes>>;
    /**
     * Streams messages from all conversations.
     *
     * When a new conversation is initiated with the client's address, this function will automatically register it and add it to the list of conversations to watch.
     * Callers should be aware the first messages in a newly created conversation are picked up on a best effort basis and there are other potential race conditions which may cause some newly created conversations to be missed.
     *
     */
    streamAllMessages(onConnectionLost?: OnConnectionLostCallback): Promise<AsyncGenerator<DecodedMessage<ContentTypes>>>;
    private getIntroductionPeers;
    /**
     * Creates a new conversation for the given address. Will throw an error if the peer is not found in the BRIXBIT network
     */
    newConversation(peerAddress: string, context?: InvitationContext): Promise<Conversation<ContentTypes>>;
    private createV2Convo;
    private getPeerAddress;
}

declare class ContentTypeId {
    authorityId: string;
    typeId: string;
    versionMajor: number;
    versionMinor: number;
    constructor(obj: content.ContentTypeId);
    toString(): string;
    static fromString(contentTypeString: string): ContentTypeId;
    sameAs(id: ContentTypeId): boolean;
}
interface EncodedContent<Parameters = Record<string, string>> {
    type: ContentTypeId;
    parameters: Parameters;
    fallback?: string;
    compression?: number;
    content: Uint8Array;
}
interface CodecRegistry {
    codecFor(contentType: ContentTypeId): ContentCodec<any> | undefined;
}
interface ContentCodec<T> {
    contentType: ContentTypeId;
    encode(content: T, registry: CodecRegistry): EncodedContent;
    decode(content: EncodedContent, registry: CodecRegistry): T;
    fallback(content: T): string | undefined;
}
declare const ContentTypeFallback: ContentTypeId;

declare const ContentTypeText: ContentTypeId;
declare class TextCodec implements ContentCodec<string> {
    get contentType(): ContentTypeId;
    encode(content: string): EncodedContent;
    decode(content: EncodedContent): string;
    fallback(content: string): string | undefined;
}

/**
 * Where message backups should be stored
 */
declare enum BackupType {
    none = 0,
    brixbitTopicStore = 1
}
interface BackupClient {
    get backupType(): BackupType;
}

interface Persistence {
    getItem(key: string): Promise<Uint8Array | null>;
    setItem(key: string, value: Uint8Array): Promise<void>;
}

declare class BrowserStoragePersistence implements Persistence {
    storage: Storage;
    constructor(storage: Storage);
    static create(): BrowserStoragePersistence;
    getItem(key: string): Promise<Uint8Array | null>;
    setItem(key: string, value: Uint8Array): Promise<void>;
}

declare class InMemoryPersistence extends BrowserStoragePersistence {
    static create(): BrowserStoragePersistence;
}

declare class PrefixedPersistence {
    prefix: string;
    persistence: Persistence;
    constructor(prefix: string, persistence: Persistence);
    getItem(key: string): Promise<Uint8Array | null>;
    setItem(key: string, value: Uint8Array): Promise<void>;
    private buildKey;
}

/**
 * EncryptedPersistence is a Persistence implementation that uses ECIES to encrypt all values
 * ECIES encryption protects against unauthorized reads, but not unauthorized writes.
 * A third party with access to the underlying store could write malicious data using the public key of the owner
 */
declare class EncryptedPersistence implements Persistence {
    private persistence;
    private privateKey;
    private privateKeyBytes;
    private publicKey;
    constructor(persistence: Persistence, privateKey: PrivateKey | SignedPrivateKey);
    getItem(key: string): Promise<Uint8Array | null>;
    setItem(key: string, value: Uint8Array): Promise<void>;
    private encrypt;
    private decrypt;
    private serializeEcies;
    private deserializeEcies;
}

type KeystoreProviderOptions = {
    env: BrixbitEnv;
    persistConversations: boolean;
    privateKeyOverride?: Uint8Array;
    basePersistence: Persistence;
    disablePersistenceEncryption: boolean;
} & PreEventCallbackOptions;
/**
 * A Keystore Provider is responsible for either creating a Keystore instance or throwing a KeystoreUnavailableError
 * It is typically used once on application startup to bootstrap the Keystore and load/decrypt the user's private keys
 */
interface KeystoreProvider<T extends KeystoreInterfaces = KeystoreInterface> {
    newKeystore(opts: KeystoreProviderOptions, apiClient: ApiClient, wallet?: Signer): Promise<T>;
}

/**
 * KeyGeneratorKeystoreProvider will create a new BRIXBIT `PrivateKeyBundle` and persist it to the network
 * This provider should always be specified last in the list of `keystoreProviders` on client creation,
 * as it will overwrite any BRIXBIT identities already on the network
 */
declare class KeyGeneratorKeystoreProvider implements KeystoreProvider {
    newKeystore(opts: KeystoreProviderOptions, apiClient: ApiClient, wallet?: Signer): Promise<KeystoreInterface>;
}

/**
 * NetworkKeystoreProvider will look on the BRIXBIT network for an `EncryptedPrivateKeyBundle`
 * on the user's private storage topic. If found, will decrypt the bundle using a wallet
 * signature and instantiate a Keystore instance using the decrypted value.
 */
declare class NetworkKeystoreProvider implements KeystoreProvider {
    newKeystore(opts: KeystoreProviderOptions, apiClient: ApiClient, wallet?: Signer): Promise<KeystoreInterface>;
}

/**
 * StaticKeystoreProvider will look for a `privateKeyOverride` in the provided options,
 * and bootstrap a Keystore using those options if provided.
 *
 * If no `privateKeyOverride` is supplied will throw a `KeystoreProviderUnavailableError` causing
 * the client to continue iterating through the `KeystoreProviders` list.
 */
declare class StaticKeystoreProvider implements KeystoreProvider {
    newKeystore(opts: KeystoreProviderOptions): Promise<KeystoreInterface>;
}

/**
 * The Snap keystore provider will:
 * 1. Check if the user is capable of using Snaps
 * 2. Check if the user has already setup the Snap with the appropriate keys
 * 3. If not, will get keys from the network or create new keys and store them in the Snap
 */
declare class SnapKeystoreProvider implements KeystoreProvider<SnapKeystoreInterface> {
    snapId: string;
    snapVersion?: string;
    constructor(snapId?: string, snapVersion?: string);
    newKeystore(opts: KeystoreProviderOptions, apiClient: ApiClient, wallet?: Signer): Promise<Flatten<{
        getKeystoreStatus: (req: keystore.GetKeystoreStatusRequest) => Promise<keystore.GetKeystoreStatusResponse>;
        initKeystore: (req: keystore.InitKeystoreRequest) => Promise<keystore.InitKeystoreResponse>;
        decryptV1: (req: keystore.DecryptV1Request) => Promise<keystore.DecryptResponse>;
        decryptV2: (req: keystore.DecryptV2Request) => Promise<keystore.DecryptResponse>;
        encryptV1: (req: keystore.EncryptV1Request) => Promise<keystore.EncryptResponse>;
        encryptV2: (req: keystore.EncryptV2Request) => Promise<keystore.EncryptResponse>;
        saveInvites: (req: keystore.SaveInvitesRequest) => Promise<keystore.SaveInvitesResponse>;
        createInvite: (req: keystore.CreateInviteRequest) => Promise<keystore.CreateInviteResponse>;
        createAuthToken: (req: keystore.CreateAuthTokenRequest) => Promise<_brixbit_proto_ts_dist_types_message_api_v1_authn_pb.Token>;
        signDigest: (req: keystore.SignDigestRequest) => Promise<_brixbit_proto_ts_dist_types_message_contents_signature_pb.Signature>;
        getPublicKeyBundle: () => Promise<_brixbit_proto_ts_dist_types_message_contents_public_key_pb.PublicKeyBundle>;
        getPrivateKeyBundle: () => Promise<_brixbit_proto_ts_dist_types_message_contents_private_key_pb.PrivateKeyBundleV1>;
        saveV1Conversations: (req: keystore.SaveV1ConversationsRequest) => Promise<keystore.SaveV1ConversationsResponse>;
        getV1Conversations: () => Promise<keystore.GetConversationsResponse>;
        getV2Conversations: () => Promise<keystore.GetConversationsResponse>;
        getRefreshJob: (req: keystore.GetRefreshJobRequest) => Promise<keystore.GetRefreshJobResponse>;
        setRefreshJob: (req: keystore.SetRefeshJobRequest) => Promise<keystore.SetRefreshJobResponse>;
        selfEncrypt: (req: keystore.SelfEncryptRequest) => Promise<keystore.SelfEncryptResponse>;
        selfDecrypt: (req: keystore.SelfDecryptRequest) => Promise<keystore.DecryptResponse>;
        getPrivatePreferencesTopicIdentifier: () => Promise<keystore.GetPrivatePreferencesTopicIdentifierResponse>;
    } & {
        getAccountAddress(): Promise<string>;
    }>>;
}

type GetMessageContentTypeFromClient<C> = C extends Client<infer T> ? T : never;
type ExtractDecodedType<C> = C extends ContentCodec<infer T> ? T : never;

type ConsentState = 'allowed' | 'denied' | 'unknown';
type ConsentListEntryType = 'address';
type PrivatePreferencesAction = privatePreferences.PrivatePreferencesAction;
declare class ConsentListEntry {
    value: string;
    entryType: ConsentListEntryType;
    permissionType: ConsentState;
    constructor(value: string, entryType: ConsentListEntryType, permissionType: ConsentState);
    get key(): string;
    static fromAddress(address: string, permissionType?: ConsentState): ConsentListEntry;
}
declare class Contacts {
    /**
     * Addresses that the client has connected to
     */
    addresses: Set<string>;
    /**
     * BRIXBIT client
     */
    client: Client;
    private consentList;
    private jobRunner;
    constructor(client: Client);
    loadConsentList(startTime?: Date): Promise<ConsentListEntry[]>;
    refreshConsentList(): Promise<ConsentListEntry[]>;
    streamConsentList(onConnectionLost?: OnConnectionLostCallback): Promise<Stream<privatePreferences.PrivatePreferencesAction, string>>;
    /**
     * The timestamp of the last entry in the consent list
     */
    get lastConsentListEntryTimestamp(): Date | undefined;
    setConsentListEntries(entries: ConsentListEntry[]): void;
    isAllowed(address: string): boolean;
    isDenied(address: string): boolean;
    consentState(address: string): ConsentState;
    allow(addresses: string[]): Promise<void>;
    deny(addresses: string[]): Promise<void>;
}

declare const Compression: typeof content.Compression;
type ListMessagesOptions = {
    checkAddresses?: boolean;
    startTime?: Date;
    endTime?: Date;
    limit?: number;
    direction?: messageApi.SortDirection;
};
type ListMessagesPaginatedOptions = {
    startTime?: Date;
    endTime?: Date;
    pageSize?: number;
    direction?: messageApi.SortDirection;
};
type SendOptions = {
    contentType?: ContentTypeId;
    compression?: content.Compression;
    timestamp?: Date;
    ephemeral?: boolean;
};

type BrixbitEnv = keyof typeof ApiUrls;
type PreEventCallback = () => Promise<void>;
/**
 * Network startup options
 */
type NetworkOptions = {
    /**
     * Specify which BRIXBIT environment to connect to. (default: `dev`)
     */
    env: BrixbitEnv;
    /**
     * apiUrl can be used to override the `env` flag and connect to a
     * specific endpoint
     */
    apiUrl: string | undefined;
    /**
     * identifier that's included with API requests.
     *
     * For example, you can use the following format:
     * `appVersion: APP_NAME + '/' + APP_VERSION`.
     * Setting this value provides telemetry that shows which apps are
     * using the BRIXBIT client SDK. This information can help BRIXBIT developers
     * provide app support, especially around communicating important
     * SDK updates, including deprecations and required upgrades.
     */
    appVersion?: string;
    /**
     * Skip publishing the user's contact bundle as part of Client startup.
     *
     * This flag should be used with caution, as we rely on contact publishing to
     * let other users know your public key and periodically run migrations on
     * this data with new SDK versions.
     *
     * Your application should have this flag set to `false` at least _some_ of the
     * time.
     *
     * The most common use-case for setting this to `true` is cases where the Client
     * instance is very short-lived. For example, spinning up a Client to decrypt
     * a push notification.
     */
    skipContactPublishing: boolean;
    apiClientFactory: (options: NetworkOptions) => ApiClient;
};
type ContentOptions = {
    /**
     * Allow configuring codecs for additional content types
     */
    codecs: ContentCodec<any>[];
    /**
     * Set the maximum content size in bytes that is allowed by the Client.
     * Currently only checked when decompressing compressed content.
     */
    maxContentSize: number;
};
type KeyStoreOptions = {
    /**
     * Provide an array of KeystoreProviders.
     * The client will attempt to use each one in sequence until one successfully
     * returns a Keystore instance
     */
    keystoreProviders: KeystoreProvider<KeystoreInterfaces>[];
    /**
     * Enable the Keystore to persist conversations in the provided storage interface
     */
    persistConversations: boolean;
    /**
     * Provide a BRIXBIT PrivateKeyBundle encoded as a Uint8Array.
     * A bundle can be retried using `Client.getKeys(...)`
     */
    privateKeyOverride?: Uint8Array;
    /**
     * Override the base persistence provider.
     * Defaults to LocalStoragePersistence, which is fine for most implementations
     */
    basePersistence: Persistence;
    /**
     * Whether or not the persistence provider should encrypt the values.
     * Only disable if you are using a secure datastore that already has encryption
     */
    disablePersistenceEncryption: boolean;
    /**
     * A single option to allow Metamask Snaps to be used as a keystore provider
     */
    useSnaps: boolean;
};
type LegacyOptions = {
    publishLegacyContact?: boolean;
};
type PreEventCallbackOptions = {
    /**
     * preCreateIdentityCallback will be called immediately before a Create Identity
     * wallet signature is requested from the user.
     *
     * The provided function must return a Promise and will be awaited, allowing the
     * developer to update the UI or insert a required delay before requesting a signature.
     */
    preCreateIdentityCallback?: PreEventCallback;
    /**
     * preEnableIdentityCallback will be called immediately before an Enable Identity
     * wallet signature is requested from the user.
     *
     * The provided function must return a Promise and will be awaited, allowing the
     * developer to update the UI or insert a required delay before requesting a signature.
     */
    preEnableIdentityCallback?: PreEventCallback;
};
/**
 * Aggregate type for client options. Optional properties are used when the default value is calculated on invocation, and are computed
 * as needed by each function. All other defaults are specified in defaultOptions.
 */
type ClientOptions = Flatten<NetworkOptions & KeyStoreOptions & ContentOptions & LegacyOptions & PreEventCallbackOptions>;
/**
 * Client class initiates connection to the BRIXBIT network.
 * Should be created with `await Client.create(options)`
 */
declare class Client<ContentTypes = any> {
    address: string;
    keystore: KeystoreInterfaces;
    apiClient: ApiClient;
    contacts: Contacts;
    publicKeyBundle: PublicKeyBundle;
    private knownPublicKeyBundles;
    private _backupClient;
    private readonly _conversations;
    private _codecs;
    private _maxContentSize;
    constructor(publicKeyBundle: PublicKeyBundle, apiClient: ApiClient, backupClient: BackupClient, keystore: KeystoreInterfaces);
    /**
     * @type {Conversations}
     */
    get conversations(): Conversations<ContentTypes>;
    get backupType(): BackupType;
    get signedPublicKeyBundle(): SignedPublicKeyBundle;
    /**
     * Create and start a client associated with given wallet.
     * @param wallet the wallet as a Signer instance
     * @param opts specify how to to connect to the network
     */
    static create<ContentCodecs extends ContentCodec<any>[] = []>(wallet: Signer | WalletClient | null, opts?: Partial<ClientOptions> & {
        codecs?: ContentCodecs;
    }): Promise<Client<ExtractDecodedType<[...ContentCodecs, TextCodec][number]> | undefined>>;
    /**
     * Export the BRIXBIT PrivateKeyBundle from the SDK as a `Uint8Array`.
     *
     * This bundle can then be provided as `privateKeyOverride` in a
     * subsequent call to `Client.create(...)`
     *
     * Be very careful with these keys, as they can be used to
     * impersonate a user on the BRIXBIT network and read the user's
     * messages.
     */
    static getKeys<U>(wallet: Signer | WalletClient | null, opts?: Partial<ClientOptions> & {
        codecs?: U;
    }): Promise<Uint8Array>;
    /**
     * Tells the caller whether the browser has a Snaps-compatible version of MetaMask installed
     */
    static isSnapsReady(): Promise<boolean>;
    private static setupBackupClient;
    private init;
    close(): Promise<void>;
    private ensureUserContactPublished;
    publishUserContact(legacy?: boolean): Promise<void>;
    /**
     * Returns the cached PublicKeyBundle if one is known for the given address or fetches
     * one from the network
     *
     * This throws if either the address is invalid or the contact is not published.
     * See also [#canMessage].
     */
    getUserContact(peerAddress: string): Promise<PublicKeyBundle | SignedPublicKeyBundle | undefined>;
    /**
     * Identical to getUserContact but for multiple peer addresses
     */
    getUserContacts(peerAddresses: string[]): Promise<(PublicKeyBundle | SignedPublicKeyBundle | undefined)[]>;
    /**
     * Used to force getUserContact fetch contact from the network.
     */
    forgetContact(peerAddress: string): void;
    canMessage(peerAddress: string): Promise<boolean>;
    canMessage(peerAddress: string[]): Promise<boolean[]>;
    static canMessage(peerAddress: string, opts?: Partial<NetworkOptions>): Promise<boolean>;
    static canMessage(peerAddress: string[], opts?: Partial<NetworkOptions>): Promise<boolean[]>;
    private validateEnvelope;
    /**
     * Low level method for publishing envelopes to the BRIXBIT network with
     * no pre-processing or encryption applied.
     *
     * Primarily used internally
     * @param envelopes PublishParams[]
     */
    publishEnvelopes(envelopes: PublishParams[]): Promise<void>;
    /**
     * Register a codec to be automatically used for encoding/decoding
     * messages of the given Content Type
     */
    registerCodec<Codec extends ContentCodec<any>>(codec: Codec): Client<ContentTypes | ExtractDecodedType<Codec>>;
    /**
     * Find a matching codec for a given `ContentTypeId` from the
     * client's codec registry
     */
    codecFor(contentType: ContentTypeId): ContentCodec<any> | undefined;
    /**
     * Convert arbitrary content into a serialized `EncodedContent` instance
     * with the given options
     */
    encodeContent(content: ContentTypes, options?: SendOptions): Promise<Uint8Array>;
    decodeContent(contentBytes: Uint8Array): Promise<{
        content: ContentTypes;
        contentType: ContentTypeId;
        error?: Error;
        contentFallback?: string;
    }>;
    listInvitations(opts?: ListMessagesOptions): Promise<messageApi.Envelope[]>;
    /**
     * List stored messages from the specified topic.
     *
     * A specified mapper function will be applied to each envelope.
     * If the mapper function throws an error during processing, the
     * envelope will be discarded.
     */
    listEnvelopes<Out>(topic: string, mapper: EnvelopeMapperWithMessage<Out>, opts?: ListMessagesOptions): Promise<Out[]>;
    /**
     * List messages on a given set of content topics, yielding one page at a time
     */
    listEnvelopesPaginated<Out>(contentTopic: string, mapper: EnvelopeMapper<Out>, opts?: ListMessagesPaginatedOptions): AsyncGenerator<Out[]>;
}
/**
 * Get the default list of `KeystoreProviders` used in the SDK
 *
 * Particularly useful if a developer wants to add their own
 * provider to the head of the list while falling back to the
 * default functionality
 */
declare function defaultKeystoreProviders(): KeystoreProvider[];

type MessageDecoder<M> = (env: messageApi.Envelope) => Promise<M | undefined>;
type ContentTopicUpdater<M> = (msg: M) => string[] | undefined;
/**
 * Stream implements an Asynchronous Iterable over messages received from a topic.
 * As such can be used with constructs like for-await-of, yield*, array destructing, etc.
 */
declare class Stream<T, ClientType = any> {
    topics: string[];
    client: Client<ClientType>;
    messages: T[];
    resolvers: ((value: IteratorResult<T>) => void)[];
    callback: ((env: messageApi.Envelope) => Promise<void>) | undefined;
    subscriptionManager?: SubscriptionManager;
    onConnectionLost?: OnConnectionLostCallback;
    constructor(client: Client<ClientType>, topics: string[], decoder: MessageDecoder<T>, contentTopicUpdater?: ContentTopicUpdater<T>, onConnectionLost?: OnConnectionLostCallback);
    private newMessageCallback;
    private start;
    static create<T, ClientType = string>(client: Client<ClientType>, topics: string[], decoder: MessageDecoder<T>, contentTopicUpdater?: ContentTopicUpdater<T>, onConnectionLost?: OnConnectionLostCallback): Promise<Stream<T, ClientType>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    return(): Promise<IteratorResult<T>>;
    next(): Promise<IteratorResult<T>>;
    private resubscribeToTopics;
}

declare class PreparedMessage {
    messageEnvelope: Envelope;
    onSend: () => Promise<DecodedMessage>;
    constructor(messageEnvelope: Envelope, onSend: () => Promise<DecodedMessage>);
    messageID(): Promise<string>;
    send(): Promise<DecodedMessage<any>>;
}

/**
 * Conversation represents either a V1 or V2 conversation with a common set of methods.
 */
interface Conversation<ContentTypes = any> {
    conversationVersion: 'v1' | 'v2';
    /**
     * The wallet address connected to the client
     */
    clientAddress: string;
    /**
     * A unique identifier for a conversation. Each conversation is stored on the network on one topic
     */
    topic: string;
    /**
     * A unique identifier for ephemeral envelopes for a conversation.
     */
    ephemeralTopic: string;
    /**
     * The wallet address of the other party in the conversation
     */
    peerAddress: string;
    /**
     * Timestamp the conversation was created at
     */
    createdAt: Date;
    /**
     * Optional field containing the `conversationId` and `metadata` for V2 conversations.
     * Will always be undefined on V1 conversations
     */
    context?: InvitationContext | undefined;
    /**
     * Add conversation peer address to allow list
     */
    allow(): Promise<void>;
    /**
     * Add conversation peer address to deny list
     */
    deny(): Promise<void>;
    /**
     * Returns true if conversation peer address is on the allow list
     */
    isAllowed: boolean;
    /**
     * Returns true if conversation peer address is on the deny list
     */
    isDenied: boolean;
    /**
     * Returns the consent state of the conversation peer address
     */
    consentState: ConsentState;
    /**
     * Retrieve messages in this conversation. Default to returning all messages.
     *
     * If only a subset is required, results can be narrowed by specifying a start/end
     * timestamp.
     *
     * ```ts
     * // Get all messages in the past 24 hours
     * const messages = await conversation.messages({
     *    startTime: new Date(+new Date() - 86_400)
     * })
     * ```
     */
    messages(opts?: ListMessagesOptions): Promise<DecodedMessage<ContentTypes>[]>;
    /**
     * @deprecated
     */
    messagesPaginated(opts?: ListMessagesPaginatedOptions): AsyncGenerator<DecodedMessage<ContentTypes>[]>;
    /**
     * Takes a BRIXBIT envelope as input and will decrypt and decode it
     * returning a `DecodedMessage` instance.
     */
    decodeMessage(env: messageApi.Envelope): Promise<DecodedMessage<ContentTypes>>;
    /**
     * Return a `Stream` of new messages in this conversation.
     *
     * Stream instances are async generators and can be used in
     * `for await` statements.
     *
     * ```ts
     * for await (const message of await conversation.stream()) {
     *    console.log(message.content)
     * }
     * ```
     */
    streamMessages(): Promise<Stream<DecodedMessage<ContentTypes>, ContentTypes>>;
    /**
     * Send a message into the conversation
     *
     * ## Example
     * ```ts
     * await conversation.send('Hello world') // returns a `DecodedMessage` instance
     * ```
     */
    send(content: Exclude<ContentTypes, undefined>, options?: SendOptions): Promise<DecodedMessage<ContentTypes>>;
    /**
     * Return a `PreparedMessage` that has contains the message ID
     * of the message that will be sent.
     */
    prepareMessage(content: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    options?: SendOptions): Promise<PreparedMessage>;
    /**
     * Return a `Stream` of new ephemeral messages from this conversation's
     * ephemeral topic.
     *
     * Stream instances are async generators and can be used in
     * `for await` statements.
     *
     * ```ts
     * for await (const message of await conversation.streamEphemeral()) {
     *    console.log(message.content)
     * }
     * ```
     */
    streamEphemeral(): Promise<Stream<DecodedMessage<ContentTypes>, ContentTypes>>;
}
/**
 * ConversationV1 allows you to view, stream, and send messages to/from a peer address
 */
declare class ConversationV1<ContentTypes> implements Conversation<ContentTypes> {
    conversationVersion: "v1";
    peerAddress: string;
    createdAt: Date;
    context: undefined;
    private client;
    constructor(client: Client<ContentTypes>, address: string, createdAt: Date);
    get clientAddress(): string;
    allow(): Promise<void>;
    deny(): Promise<void>;
    get isAllowed(): boolean;
    get isDenied(): boolean;
    get consentState(): ConsentState;
    get topic(): string;
    get ephemeralTopic(): string;
    /**
     * Returns a list of all messages to/from the peerAddress
     */
    messages(opts?: ListMessagesOptions): Promise<DecodedMessage<ContentTypes>[]>;
    messagesPaginated(opts?: ListMessagesPaginatedOptions): AsyncGenerator<DecodedMessage<ContentTypes>[]>;
    decodeMessage(env: messageApi.Envelope): Promise<DecodedMessage<ContentTypes>>;
    prepareMessage(content: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    options?: SendOptions): Promise<PreparedMessage>;
    /**
     * Returns a Stream of any new messages to/from the peerAddress
     */
    streamMessages(onConnectionLost?: OnConnectionLostCallback): Promise<Stream<DecodedMessage<ContentTypes>, ContentTypes>>;
    processEnvelope({ message, contentTopic, }: messageApi.Envelope): Promise<MessageV1>;
    streamEphemeral(onConnectionLost?: OnConnectionLostCallback): Promise<Stream<DecodedMessage<ContentTypes>, ContentTypes>>;
    /**
     * Send a message into the conversation.
     */
    send(content: Exclude<ContentTypes, undefined>, options?: SendOptions): Promise<DecodedMessage<ContentTypes>>;
    decryptBatch(messages: MessageV1[], topic: string, throwOnError?: boolean): Promise<DecodedMessage<ContentTypes>[]>;
    private buildDecodedMessage;
    createMessage(payload: Uint8Array, recipient: PublicKeyBundle, timestamp?: Date): Promise<MessageV1>;
}
/**
 * ConversationV2
 */
declare class ConversationV2<ContentTypes> implements Conversation<ContentTypes> {
    conversationVersion: "v2";
    client: Client<ContentTypes>;
    topic: string;
    peerAddress: string;
    createdAt: Date;
    context?: InvitationContext;
    constructor(client: Client<ContentTypes>, topic: string, peerAddress: string, createdAt: Date, context: InvitationContext | undefined);
    get clientAddress(): string;
    allow(): Promise<void>;
    deny(): Promise<void>;
    get isAllowed(): boolean;
    get isDenied(): boolean;
    get consentState(): ConsentState;
    /**
     * Returns a list of all messages to/from the peerAddress
     */
    messages(opts?: ListMessagesOptions): Promise<DecodedMessage<ContentTypes>[]>;
    messagesPaginated(opts?: ListMessagesPaginatedOptions): AsyncGenerator<DecodedMessage<ContentTypes>[]>;
    get ephemeralTopic(): string;
    streamEphemeral(onConnectionLost?: OnConnectionLostCallback): Promise<Stream<DecodedMessage<ContentTypes>, ContentTypes>>;
    /**
     * Returns a Stream of any new messages to/from the peerAddress
     */
    streamMessages(onConnectionLost?: OnConnectionLostCallback): Promise<Stream<DecodedMessage<ContentTypes>, ContentTypes>>;
    /**
     * Send a message into the conversation
     */
    send(content: Exclude<ContentTypes, undefined>, options?: SendOptions): Promise<DecodedMessage<ContentTypes>>;
    createMessage(payload: Uint8Array, timestamp?: Date): Promise<MessageV2>;
    private decryptBatch;
    private buildDecryptRequest;
    private encryptMessage;
    private buildDecodedMessage;
    prepareMessage(content: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    options?: SendOptions): Promise<PreparedMessage>;
    processEnvelope(env: messageApi.Envelope): Promise<MessageV2>;
    decodeMessage(env: messageApi.Envelope): Promise<DecodedMessage<ContentTypes>>;
}

declare class MessageBase {
    headerBytes: Uint8Array;
    ciphertext: Ciphertext;
    contentType?: ContentTypeId;
    error?: Error;
    /**
     * Identifier that is deterministically derived from the bytes of the message
     * header and ciphertext, where all those bytes are authenticated. This can
     * be used in determining uniqueness of messages.
     */
    id: string;
    private bytes;
    constructor(id: string, bytes: Uint8Array, obj: message.Message);
    toBytes(): Uint8Array;
}
declare class MessageV1 extends MessageBase implements message.MessageV1 {
    header: message.MessageHeaderV1;
    senderAddress: string | undefined;
    conversation: undefined;
    constructor(id: string, bytes: Uint8Array, obj: message.Message, header: message.MessageHeaderV1, senderAddress: string | undefined);
    static create(obj: message.Message, header: message.MessageHeaderV1, bytes: Uint8Array): Promise<MessageV1>;
    get sent(): Date;
    get recipientAddress(): string | undefined;
    decrypt(keystore: KeystoreInterfaces, myPublicKeyBundle: PublicKeyBundle): Promise<Uint8Array>;
    static fromBytes(bytes: Uint8Array): Promise<MessageV1>;
    static encode(keystore: KeystoreInterfaces, payload: Uint8Array, sender: PublicKeyBundle, recipient: PublicKeyBundle, timestamp: Date): Promise<MessageV1>;
}
declare class MessageV2 extends MessageBase implements message.MessageV2 {
    senderAddress: string | undefined;
    private header;
    constructor(id: string, bytes: Uint8Array, obj: message.Message, header: message.MessageHeaderV2);
    static create(obj: message.Message, header: message.MessageHeaderV2, bytes: Uint8Array): Promise<MessageV2>;
    get sent(): Date;
}
type Message = MessageV1 | MessageV2;
declare class DecodedMessage<ContentTypes = any> {
    id: string;
    messageVersion: 'v1' | 'v2';
    senderAddress: string;
    recipientAddress?: string;
    sent: Date;
    contentTopic: string;
    conversation: Conversation<ContentTypes>;
    contentType: ContentTypeId;
    content: ContentTypes;
    error?: Error;
    contentBytes: Uint8Array;
    contentFallback?: string;
    constructor({ id, messageVersion, senderAddress, recipientAddress, conversation, contentBytes, contentType, contentTopic, content, sent, error, contentFallback, }: Omit<DecodedMessage<ContentTypes>, 'toBytes'>);
    toBytes(): Uint8Array;
    static fromBytes<ContentTypes>(data: Uint8Array, client: Client<ContentTypes>): Promise<DecodedMessage<ContentTypes>>;
    static fromV1Message<ContentTypes>(message: MessageV1, content: ContentTypes, contentType: ContentTypeId, contentBytes: Uint8Array, contentTopic: string, conversation: Conversation<ContentTypes>, error?: Error, contentFallback?: string): DecodedMessage<ContentTypes>;
    static fromV2Message<ContentTypes>(message: MessageV2, content: ContentTypes, contentType: ContentTypeId, contentTopic: string, contentBytes: Uint8Array, conversation: Conversation<ContentTypes>, senderAddress: string, error?: Error, contentFallback?: string): DecodedMessage<ContentTypes>;
}
declare function decodeContent<ContentTypes>(contentBytes: Uint8Array, client: Client<ContentTypes>): Promise<{
    content: ContentTypes;
    contentType: ContentTypeId;
    error?: Error | undefined;
    contentFallback?: string | undefined;
}>;

declare const ContentTypeComposite: ContentTypeId;
type Composite = {
    type: ContentTypeId;
    content: any;
} | {
    parts: Composite[];
};
declare class CompositeCodec implements ContentCodec<Composite> {
    get contentType(): ContentTypeId;
    encode(content: Composite, codecs: CodecRegistry): EncodedContent;
    decode(content: EncodedContent, codecs: CodecRegistry): Composite;
    private toProto;
    private fromProto;
    fallback(content: Composite): string | undefined;
}

type AddRequest = {
    topic: string;
    createdNs: long__default;
    peerAddress: string;
    invitation: invitation.InvitationV1 | undefined;
};
/**
 * V2Store holds a simple map of topic -> TopicData and writes to the persistence layer on changes
 */
declare class V2Store {
    private readonly persistence;
    private readonly persistenceKey;
    private readonly mutex;
    private readonly topicMap;
    private revision;
    constructor(persistence: Persistence, persistenceKey: string, initialData?: Map<string, keystore.TopicMap_TopicData>);
    get revisionKey(): string;
    static create(persistence: Persistence): Promise<V2Store>;
    protected validate(topicData: AddRequest): boolean;
    refresh(): Promise<void>;
    getRevision(): Promise<number>;
    setRevision(number: number): Promise<void>;
    loadFromPersistence(): Promise<Map<string, keystore.TopicMap_TopicData>>;
    store(): Promise<void>;
    add(topicData: AddRequest[]): Promise<void>;
    get topics(): keystore.TopicMap_TopicData[];
    lookup(topic: string): keystore.TopicMap_TopicData | undefined;
    private toBytes;
}
declare class V1Store extends V2Store {
    static create(persistence: Persistence): Promise<V1Store>;
    protected validate(topicData: AddRequest): boolean;
}

declare class InMemoryKeystore implements KeystoreInterface {
    private v1Keys;
    private v2Keys;
    private v1Store;
    private v2Store;
    private authenticator;
    private accountAddress;
    private jobStatePersistence;
    constructor(keys: PrivateKeyBundleV1, v1Store: V1Store, v2Store: V2Store, persistence: Persistence);
    static create(keys: PrivateKeyBundleV1, persistence: Persistence): Promise<InMemoryKeystore>;
    get walletAddress(): string;
    decryptV1(req: keystore.DecryptV1Request): Promise<keystore.DecryptResponse>;
    decryptV2(req: keystore.DecryptV2Request): Promise<keystore.DecryptResponse>;
    encryptV1(req: keystore.EncryptV1Request): Promise<keystore.EncryptResponse>;
    createAuthToken({ timestampNs, }: keystore.CreateAuthTokenRequest): Promise<authn.Token>;
    selfEncrypt(req: keystore.SelfEncryptRequest): Promise<keystore.SelfEncryptResponse>;
    selfDecrypt(req: keystore.SelfDecryptRequest): Promise<keystore.DecryptResponse>;
    getPrivatePreferencesTopicIdentifier(): Promise<keystore.GetPrivatePreferencesTopicIdentifierResponse>;
    encryptV2(req: keystore.EncryptV2Request): Promise<keystore.EncryptResponse>;
    saveInvites(req: keystore.SaveInvitesRequest): Promise<keystore.SaveInvitesResponse>;
    createInvite(req: keystore.CreateInviteRequest): Promise<keystore.CreateInviteResponse>;
    signDigest(req: keystore.SignDigestRequest): Promise<signature.Signature>;
    saveV1Conversations({ conversations, }: keystore.SaveV1ConversationsRequest): Promise<keystore.SaveV1ConversationsResponse>;
    getV1Conversations(): Promise<keystore.GetConversationsResponse>;
    getV2Conversations(): Promise<keystore.GetConversationsResponse>;
    getPublicKeyBundle(): Promise<PublicKeyBundle>;
    getPrivateKeyBundle(): Promise<privateKey.PrivateKeyBundleV1>;
    getAccountAddress(): Promise<string>;
    getRefreshJob({ jobType, }: keystore.GetRefreshJobRequest): Promise<keystore.GetRefreshJobResponse>;
    setRefreshJob({ jobType, lastRunNs, }: keystore.SetRefeshJobRequest): Promise<keystore.SetRefreshJobResponse>;
    private topicDataToV1ConversationReference;
    private buildJobStorageKey;
    private getLastRunTime;
    lookupTopic(topic: string): keystore.TopicMap_TopicData | undefined;
}

/**
 * A Keystore is responsible for holding the user's BRIXBIT private keys and using them to encrypt/decrypt/sign messages.
 * Keystores are instantiated using a `KeystoreProvider`
 * @deprecated Use `KeystoreInterface` instead
 */
interface Keystore {
    /**
     * Decrypt a batch of V1 messages
     */
    decryptV1(req: keystore.DecryptV1Request): Promise<keystore.DecryptResponse>;
    /**
     * Decrypt a batch of V2 messages
     */
    decryptV2(req: keystore.DecryptV2Request): Promise<keystore.DecryptResponse>;
    /**
     * Encrypt a batch of V1 messages
     */
    encryptV1(req: keystore.EncryptV1Request): Promise<keystore.EncryptResponse>;
    /**
     * Encrypt a batch of V2 messages
     */
    encryptV2(req: keystore.EncryptV2Request): Promise<keystore.EncryptResponse>;
    /**
     * Take a batch of invite messages and store the `TopicKeys` for later use in decrypting messages
     */
    saveInvites(req: keystore.SaveInvitesRequest): Promise<keystore.SaveInvitesResponse>;
    /**
     * Create a sealed/encrypted invite and store the Topic keys in the Keystore for later use.
     * The returned invite payload must be sent to the network for the other party to be able to communicate.
     */
    createInvite(req: keystore.CreateInviteRequest): Promise<keystore.CreateInviteResponse>;
    /**
     * Create an BRIXBIT auth token to be used as a header on BRIXBIT API requests
     */
    createAuthToken(req: keystore.CreateAuthTokenRequest): Promise<authn.Token>;
    /**
     * Sign the provided digest with either the `IdentityKey` or a specified `PreKey`
     */
    signDigest(req: keystore.SignDigestRequest): Promise<signature.Signature>;
    /**
     * Get a refresh job from the persistence
     */
    getRefreshJob(req: keystore.GetRefreshJobRequest): Promise<keystore.GetRefreshJobResponse>;
    /**
     * Sets the time of a refresh job
     */
    setRefreshJob(req: keystore.SetRefeshJobRequest): Promise<keystore.SetRefreshJobResponse>;
    /**
     * Save V1 Conversations
     */
    saveV1Conversations(req: keystore.SaveV1ConversationsRequest): Promise<keystore.SaveV1ConversationsResponse>;
    /**
     * Get a list of V1 conversations
     */
    getV1Conversations(): Promise<keystore.GetConversationsResponse>;
    /**
     * Get a list of V2 conversations
     */
    getV2Conversations(): Promise<keystore.GetConversationsResponse>;
    /**
     * Get the `PublicKeyBundle` associated with the Keystore's private keys
     */
    getPublicKeyBundle(): Promise<publicKey.PublicKeyBundle>;
    /**
     * Export the private keys. May throw an error if the keystore implementation does not allow this operation
     */
    getPrivateKeyBundle(): Promise<privateKey.PrivateKeyBundleV1>;
    /**
     * Get the account address of the wallet used to create the Keystore
     */
    getAccountAddress(): Promise<string>;
    /**
     * Encrypt a batch of messages to yourself
     */
    selfEncrypt(req: keystore.SelfEncryptRequest): Promise<keystore.SelfEncryptResponse>;
    /**
     * Decrypt a batch of messages to yourself
     */
    selfDecrypt(req: keystore.SelfDecryptRequest): Promise<keystore.DecryptResponse>;
    /**
     * Get the private preferences topic identifier
     */
    getPrivatePreferencesTopicIdentifier(): Promise<keystore.GetPrivatePreferencesTopicIdentifierResponse>;
}
type TopicData = WithoutUndefined<keystore.TopicMap_TopicData>;

declare function decodeContactBundle(bytes: Uint8Array): PublicKeyBundle | SignedPublicKeyBundle;

export { type ApiClient, ApiUrls, AuthCache, type Authenticator, BrowserStoragePersistence, Ciphertext, Client, type ClientOptions, type CodecRegistry, type Composite, CompositeCodec, Compression, ConsentListEntry, type ConsentListEntryType, type ConsentState, type ContentCodec, type ContentOptions, ContentTypeComposite, ContentTypeFallback, ContentTypeId, ContentTypeText, type Conversation, ConversationV1, ConversationV2, Conversations, DecodedMessage, type EncodedContent, EncryptedPersistence, type ExtractDecodedType, type GetMessageContentTypeFromClient, HttpApiClient, InMemoryKeystore, InMemoryPersistence, type InvitationContext, InvitationV1, KeyGeneratorKeystoreProvider, type KeyStoreOptions, type Keystore, type KeystoreApiDefs, type KeystoreApiEntries, type KeystoreApiMethods, type KeystoreApiRequestEncoders, type KeystoreApiRequestValues, type KeystoreApiResponseDecoders, type KeystoreInterface, type KeystoreInterfaceRequestValues, type KeystoreInterfaces, type KeystoreProvider, type KeystoreRPC, type KeystoreRPCCodec, type LegacyOptions, type ListMessagesOptions, type ListMessagesPaginatedOptions, LocalAuthenticator, type Message, MessageV1, MessageV2, NetworkKeystoreProvider, type NetworkOptions, type OnConnectionLostCallback, type Persistence, PrefixedPersistence, PrivateKey, type PrivateKeyBundle, PrivateKeyBundleV1, PrivateKeyBundleV2, type PrivatePreferencesAction, PublicKey, PublicKeyBundle, type PublishParams, type Query, type QueryAllOptions, type QueryParams, type QueryStreamOptions, SealedInvitation, type SendOptions, Signature, SignedPublicKey, SignedPublicKeyBundle, type Signer, type SnapKeystoreApiDefs, type SnapKeystoreApiEntries, type SnapKeystoreApiMethods, type SnapKeystoreApiRequestEncoders, type SnapKeystoreApiRequestValues, type SnapKeystoreApiResponseDecoders, type SnapKeystoreInterface, type SnapKeystoreInterfaceRequestValues, SnapKeystoreProvider as SnapProvider, SortDirection, StaticKeystoreProvider, Stream, type SubscribeCallback, type SubscribeParams, type SubscriptionManager, TextCodec, type TopicData, type UnsubscribeFn, type BrixbitEnv, buildContentTopic, buildDirectMessageTopic, buildDirectMessageTopicV2, buildUserContactTopic, buildUserIntroTopic, buildUserInviteTopic, buildUserPrivateStoreTopic, dateToNs, decodeContactBundle, decodeContent, decrypt, defaultKeystoreProviders, encrypt, fromNanoString, apiDefs as keystoreApiDefs, mapPaginatedStream, nsToDate, retry, snapApiDefs as snapKeystoreApiDefs, toNanoString };
