'use strict';

var viem = require('viem');
var Long = require('long');
var proto = require('@brixbit/proto');
var secp = require('@noble/secp256k1');
var crypto$1 = require('crypto');
var asyncMutex = require('async-mutex');
var elliptic = require('elliptic');
var userPreferencesBindingsWasm = require('@brixbit/user-preferences-bindings-wasm');

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

const buildContentTopic = (name) => `/brixbit/0/${name}/proto`;
const buildDirectMessageTopic = (sender, recipient) => {
    // EIP55 normalize the address case.
    const members = [viem.getAddress(sender), viem.getAddress(recipient)];
    members.sort();
    return buildContentTopic(`dm-${members.join('-')}`);
};
const buildDirectMessageTopicV2 = (randomString) => {
    return buildContentTopic(`m-${randomString}`);
};
const buildUserContactTopic = (walletAddr) => {
    // EIP55 normalize the address case.
    return buildContentTopic(`contact-${viem.getAddress(walletAddr)}`);
};
const buildUserIntroTopic = (walletAddr) => {
    // EIP55 normalize the address case.
    return buildContentTopic(`intro-${viem.getAddress(walletAddr)}`);
};
const buildUserInviteTopic = (walletAddr) => {
    // EIP55 normalize the address case.
    return buildContentTopic(`invite-${viem.getAddress(walletAddr)}`);
};
const buildUserPrivateStoreTopic = (addrPrefixedKey) => {
    // e.g. "0x1111111111222222222233333333334444444444/key_bundle"
    return buildContentTopic(`privatestore-${addrPrefixedKey}`);
};
const buildUserPrivatePreferencesTopic = (identifier) => buildContentTopic(`userpreferences-${identifier}`);
// validate that a topic only contains ASCII characters 33-127
const isValidTopic = (topic) => {
    // eslint-disable-next-line no-control-regex
    const regex = /^[\x21-\x7F]+$/;
    const index = topic.indexOf('0/');
    if (index !== -1) {
        const unwrappedTopic = topic.substring(index + 2, topic.lastIndexOf('/proto'));
        return regex.test(unwrappedTopic);
    }
    return false;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const defaultIsRetryableFn = (err) => !!err;
// Implements type safe retries of arbitrary async functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function retry(fn, args, maxRetries, sleepTime, isRetryableFn = defaultIsRetryableFn, retryCount = 1) {
    const currRetry = typeof retryCount === 'number' ? retryCount : 1;
    try {
        const result = await fn(...args);
        return result;
    }
    catch (e) {
        if (!isRetryableFn(e) || currRetry > maxRetries) {
            throw e;
        }
        await sleep(sleepTime);
        return retry(fn, args, maxRetries, sleepTime, isRetryableFn, currRetry + 1);
    }
}
// Takes an async generator returning pages of envelopes and converts to an async
// generator returning pages of an arbitrary type using a mapper function
async function* mapPaginatedStream(gen, mapper) {
    for await (const page of gen) {
        const results = await Promise.allSettled(page.map(mapper));
        const out = [];
        for (const result of results) {
            if (result.status === 'fulfilled') {
                out.push(result.value);
            }
            else {
                console.warn('Failed to process envelope due to reason: ', result.reason);
            }
        }
        yield out;
    }
}

function dateToNs(date) {
    return Long.fromNumber(date.valueOf()).multiply(1000000);
}
function nsToDate(ns) {
    return new Date(ns.divide(1000000).toNumber());
}
const toNanoString = (d) => {
    return d && dateToNs(d).toString();
};
const fromNanoString = (s) => {
    if (!s) {
        return undefined;
    }
    return nsToDate(Long.fromString(s));
};

const { b64Decode, b64Encode } = proto.fetcher;
function concat(a, b) {
    const ab = new Uint8Array(a.length + b.length);
    ab.set(a);
    ab.set(b, a.length);
    return ab;
}
function numberToUint8Array(num) {
    // Create a buffer for a 32-bit integer
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    // Set the number in the buffer
    view.setInt32(0, num, true); // true for little-endian
    // Create Uint8Array from buffer
    return new Uint8Array(buffer);
}
function uint8ArrayToNumber(arr) {
    const buffer = arr.buffer;
    const view = new DataView(buffer);
    // Read the number from the buffer
    return view.getInt32(0, true); // true for little-endian
}

const isBrowser = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';

function semverParse(version) {
    const [major, minor, ...patch] = version.split('.');
    return {
        major: Number(major),
        minor: Number(minor),
        // Keep patch as a string so that it can support prerelease versions
        patch: patch.join('.'),
    };
}
function isSameMajorVersion(a, b) {
    // If no version is provided, assume it is the same
    if (!a || !b) {
        return true;
    }
    return semverParse(a).major === semverParse(b).major;
}
// Checks if A semver is greater than B semver
function semverGreaterThan(a, b) {
    if (!a || !b) {
        return false;
    }
    const aSemver = semverParse(a);
    const bSemver = semverParse(b);
    if (aSemver.major !== bSemver.major) {
        return aSemver.major > bSemver.major;
    }
    if (aSemver.minor !== bSemver.minor) {
        return aSemver.minor > bSemver.minor;
    }
    if (!aSemver.patch || !bSemver.patch) {
        return false;
    }
    return patchGreaterThan(aSemver.patch, bSemver.patch);
}
// Home-brewed attempt at comparing patch versions so we don't have to import semver package.
// Example full version might be "2.0.1-alpha.1", and this will be operating on the "1-alpha.1" portion
function patchGreaterThan(a, b) {
    const [aVersion, aExtra] = a.split('-');
    const [bVersion, bExtra] = b.split('-');
    if (Number(aVersion) !== Number(bVersion)) {
        return Number(aVersion) > Number(bVersion);
    }
    if (!aExtra || !bExtra) {
        return false;
    }
    const [aTag, aTagVersion] = aExtra.split('.');
    const [bTag, bTagVersion] = bExtra.split('.');
    if (aTag !== bTag) {
        return true;
    }
    return Number(aTagVersion) > Number(bTagVersion);
}

function getSigner(wallet) {
    if (!wallet) {
        return null;
    }
    if (isWalletClient(wallet)) {
        return convertWalletClientToSigner(wallet);
    }
    if (typeof wallet.getAddress !== 'function') {
        throw new Error('Unknown wallet type');
    }
    return wallet;
}
function isWalletClient(wallet) {
    return ('type' in wallet &&
        (wallet.type === 'walletClient' || wallet.type === 'base'));
}
function convertWalletClientToSigner(walletClient) {
    const { account } = walletClient;
    if (!account || !account.address) {
        throw new Error('WalletClient is not configured');
    }
    return {
        getAddress: async () => account.address,
        signMessage: async (message) => walletClient.signMessage({
            message: typeof message === 'string' ? message : { raw: message },
            account,
        }),
    };
}

/**
 * Stream implements an Asynchronous Iterable over messages received from a topic.
 * As such can be used with constructs like for-await-of, yield*, array destructing, etc.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Stream {
    constructor(client, topics, decoder, contentTopicUpdater, onConnectionLost) {
        this.messages = [];
        this.resolvers = [];
        this.topics = topics;
        this.client = client;
        this.callback = this.newMessageCallback(decoder, contentTopicUpdater);
        this.onConnectionLost = onConnectionLost;
    }
    // returns new closure to handle incoming messages
    newMessageCallback(decoder, contentTopicUpdater) {
        return async (env) => {
            if (!env.message) {
                return;
            }
            try {
                const msg = await decoder(env);
                // decoder can return undefined to signal a message to ignore/skip.
                if (!msg) {
                    return;
                }
                // Check to see if we should update the stream's content topic subscription
                if (contentTopicUpdater) {
                    const topics = contentTopicUpdater(msg);
                    if (topics) {
                        this.resubscribeToTopics(topics);
                    }
                }
                // is there a Promise already pending?
                const resolver = this.resolvers.pop();
                if (resolver) {
                    // yes, resolve it
                    resolver({ value: msg });
                }
                else {
                    // no, push the message into the queue
                    this.messages.unshift(msg);
                }
            }
            catch (e) {
                console.warn(e);
            }
        };
    }
    async start() {
        if (!this.callback) {
            throw new Error('Missing callback for stream');
        }
        this.subscriptionManager = this.client.apiClient.subscribe({
            contentTopics: this.topics,
        }, async (env) => {
            if (!this.callback)
                return;
            await this?.callback(env);
        }, this.onConnectionLost);
    }
    static async create(client, topics, decoder, contentTopicUpdater, onConnectionLost) {
        const stream = new Stream(client, topics, decoder, contentTopicUpdater, onConnectionLost);
        await stream.start();
        return stream;
    }
    // To make Stream proper Async Iterable
    [Symbol.asyncIterator]() {
        return this;
    }
    // return should be called if the interpreter detects that the stream won't be used anymore,
    // e.g. a for/of loop was exited via a break. It can also be called explicitly.
    // https://tc39.es/ecma262/#table-iterator-interface-optional-properties
    // Note that this means the Stream will be closed after it was used in a for-await-of or yield* or similar.
    async return() {
        if (this.subscriptionManager) {
            await this.subscriptionManager.unsubscribe();
        }
        if (!this.callback) {
            return { value: undefined, done: true };
        }
        this.callback = undefined;
        this.resolvers.forEach((resolve) => resolve({ value: undefined, done: true }));
        return { value: undefined, done: true };
    }
    // To make Stream proper Async Iterator
    // Note that next() will still provide whatever messages were already pending
    // even after the stream was closed via return().
    next() {
        // Is there a message already pending?
        const msg = this.messages.pop();
        if (msg) {
            // yes, return resolved promise
            return Promise.resolve({ value: msg });
        }
        if (!this.callback) {
            return Promise.resolve({ value: undefined, done: true });
        }
        // otherwise return empty Promise and queue its resolver
        return new Promise((resolve) => this.resolvers.unshift(resolve));
    }
    // Unsubscribe from the existing content topics and resubscribe to the given topics.
    async resubscribeToTopics(topics) {
        if (!this.callback || !this.subscriptionManager) {
            throw new Error('Missing callback for stream');
        }
        if (typeof this.subscriptionManager?.updateContentTopics === 'function') {
            return this.subscriptionManager.updateContentTopics(topics);
        }
        await this.subscriptionManager.unsubscribe();
        this.topics = topics;
        this.subscriptionManager = this.client.apiClient.subscribe({
            contentTopics: this.topics,
        }, async (env) => {
            if (!this.callback)
                return;
            await this?.callback(env);
        }, this.onConnectionLost);
    }
}

const KDFSaltSize = 32; // bytes
// AES-GCM defaults from https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
const AESGCMNonceSize = 12; // property iv
const AESGCMTagLength = 16; // property tagLength
// Ciphertext packages the encrypted ciphertext with the salt and nonce used to produce it.
// salt and nonce are not secret, and should be transmitted/stored along with the encrypted ciphertext.
class Ciphertext {
    constructor(obj) {
        if (!obj.aes256GcmHkdfSha256) {
            throw new Error('invalid ciphertext');
        }
        if (obj.aes256GcmHkdfSha256.payload.length < AESGCMTagLength) {
            throw new Error(`invalid ciphertext ciphertext length: ${obj.aes256GcmHkdfSha256.payload.length}`);
        }
        if (obj.aes256GcmHkdfSha256.hkdfSalt.length !== KDFSaltSize) {
            throw new Error(`invalid ciphertext salt length: ${obj.aes256GcmHkdfSha256.hkdfSalt.length}`);
        }
        if (obj.aes256GcmHkdfSha256.gcmNonce.length !== AESGCMNonceSize) {
            throw new Error(`invalid ciphertext nonce length: ${obj.aes256GcmHkdfSha256.gcmNonce.length}`);
        }
        this.aes256GcmHkdfSha256 = obj.aes256GcmHkdfSha256;
    }
    toBytes() {
        return proto.ciphertext.Ciphertext.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new Ciphertext(proto.ciphertext.Ciphertext.decode(bytes));
    }
}

// eslint-disable-next-line no-restricted-syntax
const crypto = crypto$1.webcrypto;

const hkdfNoInfo = new Uint8Array().buffer;
// This is a variation of https://github.com/paulmillr/noble-secp256k1/blob/main/index.ts#L1378-L1388
// that uses `digest('SHA-256', bytes)` instead of `digest('SHA-256', bytes.buffer)`
// which seems to produce different results.
async function sha256(bytes) {
    return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
}
// symmetric authenticated encryption of plaintext using the secret;
// additionalData is used to protect un-encrypted parts of the message (header)
// in the authentication scope of the encryption.
async function encrypt$1(plain, secret, additionalData) {
    const salt = crypto.getRandomValues(new Uint8Array(KDFSaltSize));
    const nonce = crypto.getRandomValues(new Uint8Array(AESGCMNonceSize));
    const key = await hkdf(secret, salt);
    const encrypted = await crypto.subtle.encrypt(aesGcmParams(nonce, additionalData), key, plain);
    return new Ciphertext({
        aes256GcmHkdfSha256: {
            payload: new Uint8Array(encrypted),
            hkdfSalt: salt,
            gcmNonce: nonce,
        },
    });
}
// symmetric authenticated decryption of the encrypted ciphertext using the secret and additionalData
async function decrypt$1(encrypted, secret, additionalData) {
    if (!encrypted.aes256GcmHkdfSha256) {
        throw new Error('invalid payload ciphertext');
    }
    const key = await hkdf(secret, encrypted.aes256GcmHkdfSha256.hkdfSalt);
    const decrypted = await crypto.subtle.decrypt(aesGcmParams(encrypted.aes256GcmHkdfSha256.gcmNonce, additionalData), key, encrypted.aes256GcmHkdfSha256.payload);
    return new Uint8Array(decrypted);
}
// helper for building Web Crypto API encryption parameter structure
function aesGcmParams(nonce, additionalData) {
    const spec = {
        name: 'AES-GCM',
        iv: nonce,
    };
    if (additionalData) {
        spec.additionalData = additionalData;
    }
    return spec;
}
// Derive AES-256-GCM key from a shared secret and salt.
// Returns crypto.CryptoKey suitable for the encrypt/decrypt API
async function hkdf(secret, salt) {
    const key = await crypto.subtle.importKey('raw', secret, 'HKDF', false, [
        'deriveKey',
    ]);
    return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt, info: hkdfNoInfo }, key, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

const bytesToHex = secp__namespace.utils.bytesToHex;
function equalBytes(b1, b2) {
    if (b1.length !== b2.length) {
        return false;
    }
    for (let i = 0; i < b1.length; i++) {
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Compute the Ethereum address from uncompressed PublicKey bytes
 */
function computeAddress(bytes) {
    const publicKey = viem.bytesToHex(bytes.slice(1));
    const hash = viem.keccak256(publicKey);
    const address = hash.substring(hash.length - 40);
    return viem.getAddress(`0x${address}`);
}
/**
 * Split an Ethereum signature hex string into bytes and a recovery bit
 */
function splitSignature(signature) {
    const eSig = viem.hexToSignature(signature);
    const r = viem.hexToBytes(eSig.r);
    const s = viem.hexToBytes(eSig.s);
    let v = Number(eSig.v);
    if (v === 0 || v === 1) {
        v += 27;
    }
    const recovery = 1 - (v % 2);
    const bytes = new Uint8Array(64);
    bytes.set(r);
    bytes.set(s, r.length);
    return { bytes, recovery };
}

// Validate SECP256k1 private key
function secp256k1Check(key) {
    if (key.bytes.length !== 32) {
        throw new Error(`invalid private key length: ${key.bytes.length}`);
    }
}
// A private key signed with another key pair or a wallet.
class SignedPrivateKey {
    constructor(obj) {
        if (!obj.secp256k1) {
            throw new Error('invalid private key');
        }
        secp256k1Check(obj.secp256k1);
        this.secp256k1 = obj.secp256k1;
        this.createdNs = obj.createdNs;
        if (!obj.publicKey) {
            throw new Error('missing public key');
        }
        this.publicKey = new SignedPublicKey(obj.publicKey);
    }
    // Create a random key pair signed by the signer.
    static async generate(signer) {
        const secp256k1 = {
            bytes: secp__namespace.utils.randomPrivateKey(),
        };
        const createdNs = Long.fromNumber(new Date().getTime()).mul(1000000);
        const unsigned = new UnsignedPublicKey({
            secp256k1Uncompressed: {
                bytes: secp__namespace.getPublicKey(secp256k1.bytes),
            },
            createdNs,
        });
        const signed = await signer.signKey(unsigned);
        return new SignedPrivateKey({
            secp256k1,
            createdNs,
            publicKey: signed,
        });
    }
    // Time the key was generated.
    generated() {
        return new Date(this.createdNs.div(1000000).toNumber());
    }
    // Sign provided digest.
    async sign(digest) {
        const [signature, recovery] = await secp__namespace.sign(digest, this.secp256k1.bytes, {
            recovered: true,
            der: false,
        });
        return new Signature({
            ecdsaCompact: { bytes: signature, recovery },
        });
    }
    // Sign provided public key.
    async signKey(pub) {
        const keyBytes = pub.toBytes();
        const digest = await sha256(keyBytes);
        const signature = await this.sign(digest);
        return new SignedPublicKey({
            keyBytes,
            signature,
        });
    }
    // Return public key of the signer of the provided signed key.
    static async signerKey(key, signature) {
        const digest = await sha256(key.bytesToSign());
        return ecdsaSignerKey(digest, signature);
    }
    // Derive shared secret from peer's PublicKey;
    // the peer can derive the same secret using their private key and our public key.
    sharedSecret(peer) {
        return secp__namespace.getSharedSecret(this.secp256k1.bytes, peer.secp256k1Uncompressed.bytes, false);
    }
    // encrypt plain bytes using a shared secret derived from peer's PublicKey;
    // additionalData allows including unencrypted parts of a Message in the authentication
    // protection provided by the encrypted part (to make the whole Message tamper evident)
    encrypt(plain, peer, additionalData) {
        const secret = this.sharedSecret(peer);
        return encrypt$1(plain, secret, additionalData);
    }
    // decrypt Ciphertext using a shared secret derived from peer's PublicKey;
    // throws if any part of Ciphertext or additionalData was tampered with
    decrypt(encrypted, peer, additionalData) {
        const secret = this.sharedSecret(peer);
        return decrypt$1(encrypted, secret, additionalData);
    }
    // Does the provided PublicKey correspond to this PrivateKey?
    matches(key) {
        return this.publicKey.equals(key);
    }
    // Is other the same/equivalent key?
    equals(other) {
        return (equalBytes(this.secp256k1.bytes, other.secp256k1.bytes) &&
            this.publicKey.equals(other.publicKey));
    }
    // Encode this key into bytes.
    toBytes() {
        return proto.privateKey.SignedPrivateKey.encode(this).finish();
    }
    validatePublicKey() {
        const generatedPublicKey = secp__namespace.getPublicKey(this.secp256k1.bytes);
        return equalBytes(generatedPublicKey, this.publicKey.secp256k1Uncompressed.bytes);
    }
    // Decode key from bytes.
    static fromBytes(bytes) {
        return new SignedPrivateKey(proto.privateKey.SignedPrivateKey.decode(bytes));
    }
    static fromLegacyKey(key, signedByWallet) {
        return new SignedPrivateKey({
            createdNs: key.timestamp.mul(1000000),
            secp256k1: key.secp256k1,
            publicKey: SignedPublicKey.fromLegacyKey(key.publicKey, signedByWallet),
        });
    }
}
// LEGACY: PrivateKey represents a secp256k1 private key.
class PrivateKey {
    constructor(obj) {
        if (!obj.secp256k1) {
            throw new Error('invalid private key');
        }
        secp256k1Check(obj.secp256k1);
        this.timestamp = obj.timestamp;
        this.secp256k1 = obj.secp256k1;
        if (!obj.publicKey) {
            throw new Error('missing public key');
        }
        this.publicKey = new PublicKey(obj.publicKey);
    }
    // create a random PrivateKey/PublicKey pair.
    static generate() {
        const secp256k1 = {
            bytes: secp__namespace.utils.randomPrivateKey(),
        };
        const timestamp = Long.fromNumber(new Date().getTime());
        return new PrivateKey({
            secp256k1,
            timestamp,
            publicKey: new PublicKey({
                secp256k1Uncompressed: {
                    bytes: secp__namespace.getPublicKey(secp256k1.bytes),
                },
                timestamp,
            }),
        });
    }
    generated() {
        return new Date(this.timestamp.toNumber());
    }
    // sign provided digest
    async sign(digest) {
        const [signature, recovery] = await secp__namespace.sign(digest, this.secp256k1.bytes, {
            recovered: true,
            der: false,
        });
        return new Signature({
            ecdsaCompact: { bytes: signature, recovery },
        });
    }
    // sign provided public key
    async signKey(pub) {
        const digest = await sha256(pub.bytesToSign());
        pub.signature = await this.sign(digest);
        return pub;
    }
    // derive shared secret from peer's PublicKey;
    // the peer can derive the same secret using their PrivateKey and our PublicKey
    sharedSecret(peer) {
        return secp__namespace.getSharedSecret(this.secp256k1.bytes, peer.secp256k1Uncompressed.bytes, false);
    }
    // encrypt plain bytes using a shared secret derived from peer's PublicKey;
    // additionalData allows including unencrypted parts of a Message in the authentication
    // protection provided by the encrypted part (to make the whole Message tamper evident)
    encrypt(plain, peer, additionalData) {
        const secret = this.sharedSecret(peer);
        return encrypt$1(plain, secret, additionalData);
    }
    // decrypt Ciphertext using a shared secret derived from peer's PublicKey;
    // throws if any part of Ciphertext or additionalData was tampered with
    decrypt(encrypted, peer, additionalData) {
        const secret = this.sharedSecret(peer);
        return decrypt$1(encrypted, secret, additionalData);
    }
    // Does the provided PublicKey correspond to this PrivateKey?
    matches(key) {
        return this.publicKey.equals(key);
    }
    validatePublicKey() {
        const generatedPublicKey = secp__namespace.getPublicKey(this.secp256k1.bytes);
        return equalBytes(generatedPublicKey, this.publicKey.secp256k1Uncompressed.bytes);
    }
    // Encode this key into bytes.
    toBytes() {
        return proto.privateKey.PrivateKey.encode(this).finish();
    }
    // Decode key from bytes.
    static fromBytes(bytes) {
        return new PrivateKey(proto.privateKey.PrivateKey.decode(bytes));
    }
}

// Validate signature.
function ecdsaCheck(sig) {
    if (sig.bytes.length !== 64) {
        throw new Error(`invalid signature length: ${sig.bytes.length}`);
    }
    if (sig.recovery !== 0 && sig.recovery !== 1) {
        throw new Error(`invalid recovery bit: ${sig.recovery}`);
    }
}
// Compare signatures.
function ecdsaEqual(a, b) {
    return a.recovery === b.recovery && equalBytes(a.bytes, b.bytes);
}
// Derive public key of the signer from the digest and the signature.
function ecdsaSignerKey(digest, signature) {
    const bytes = secp__namespace.recoverPublicKey(digest, signature.bytes, signature.recovery);
    return bytes
        ? new UnsignedPublicKey({
            secp256k1Uncompressed: { bytes },
            createdNs: Long.fromNumber(0),
        })
        : undefined;
}
class Signature {
    constructor(obj) {
        if (obj.ecdsaCompact) {
            ecdsaCheck(obj.ecdsaCompact);
            this.ecdsaCompact = obj.ecdsaCompact;
        }
        else if (obj.walletEcdsaCompact) {
            ecdsaCheck(obj.walletEcdsaCompact);
            this.walletEcdsaCompact = obj.walletEcdsaCompact;
        }
        else {
            throw new Error('invalid signature');
        }
    }
    // Return the public key that validates provided key's signature.
    async signerKey(key) {
        if (this.ecdsaCompact) {
            return SignedPrivateKey.signerKey(key, this.ecdsaCompact);
        }
        else if (this.walletEcdsaCompact) {
            return WalletSigner.signerKey(key, this.walletEcdsaCompact);
        }
        else {
            return undefined;
        }
    }
    // LEGACY: Return the public key that validates this signature given the provided digest.
    // Return undefined if the signature is malformed.
    getPublicKey(digest) {
        let bytes;
        if (this.ecdsaCompact) {
            bytes = secp__namespace.recoverPublicKey(digest, this.ecdsaCompact.bytes, this.ecdsaCompact.recovery);
        }
        else if (this.walletEcdsaCompact) {
            bytes = secp__namespace.recoverPublicKey(digest, this.walletEcdsaCompact.bytes, this.walletEcdsaCompact.recovery);
        }
        else {
            throw new Error('invalid v1 signature');
        }
        return bytes
            ? new PublicKey({
                secp256k1Uncompressed: { bytes },
                timestamp: Long.fromNumber(0),
            })
            : undefined;
    }
    // Is this the same/equivalent signature as other?
    equals(other) {
        if (this.ecdsaCompact && other.ecdsaCompact) {
            return ecdsaEqual(this.ecdsaCompact, other.ecdsaCompact);
        }
        if (this.walletEcdsaCompact && other.walletEcdsaCompact) {
            return ecdsaEqual(this.walletEcdsaCompact, other.walletEcdsaCompact);
        }
        return false;
    }
    toBytes() {
        return proto.signature.Signature.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new Signature(proto.signature.Signature.decode(bytes));
    }
}
var AccountLinkedRole;
(function (AccountLinkedRole) {
    AccountLinkedRole[AccountLinkedRole["INBOX_KEY"] = 0] = "INBOX_KEY";
    AccountLinkedRole[AccountLinkedRole["SEND_KEY"] = 1] = "SEND_KEY";
})(AccountLinkedRole || (AccountLinkedRole = {}));
// A wallet based KeySigner.
class WalletSigner {
    constructor(wallet) {
        this.wallet = wallet;
    }
    static identitySigRequestText(keyBytes) {
        // Note that an update to this signature request text will require
        // addition of backward compatibility for existing signatures
        // and/or a migration; otherwise clients will fail to verify previously
        // signed keys.
        return ('BRIXBIT : Create Identity\n' +
            `${bytesToHex(keyBytes)}\n` +
            '\n' +
            'For more info: https://brixbit.org/signatures/');
    }
    static signerKey(key, signature) {
        const digest = viem.hexToBytes(viem.hashMessage(this.identitySigRequestText(key.bytesToSign())));
        return ecdsaSignerKey(digest, signature);
    }
    async signKey(key) {
        const keyBytes = key.toBytes();
        const sigString = await this.wallet.signMessage(WalletSigner.identitySigRequestText(keyBytes));
        const { bytes, recovery } = splitSignature(sigString);
        const signature = new Signature({
            walletEcdsaCompact: {
                bytes,
                recovery,
            },
        });
        return new SignedPublicKey({ keyBytes, signature });
    }
}

// Validate a key.
function secp256k1UncompressedCheck(key) {
    if (key.bytes.length !== 65) {
        throw new Error(`invalid public key length: ${key.bytes.length}`);
    }
    if (key.bytes[0] !== 4) {
        throw new Error(`unrecognized public key prefix: ${key.bytes[0]}`);
    }
}
const MS_NS_TIMESTAMP_THRESHOLD = new Long(10 ** 9).mul(10 ** 9);
// Basic public key without a signature.
class UnsignedPublicKey {
    constructor(obj) {
        if (!obj?.secp256k1Uncompressed) {
            throw new Error('invalid public key');
        }
        secp256k1UncompressedCheck(obj.secp256k1Uncompressed);
        this.secp256k1Uncompressed = obj.secp256k1Uncompressed;
        this.createdNs = obj.createdNs.toUnsigned();
    }
    // The time the key was generated.
    generated() {
        return new Date(this.timestamp.toNumber());
    }
    isFromLegacyKey() {
        return this.createdNs.lessThan(MS_NS_TIMESTAMP_THRESHOLD);
    }
    // creation time in milliseconds
    get timestamp() {
        return (this.isFromLegacyKey() ? this.createdNs : this.createdNs.div(1000000)).toUnsigned();
    }
    // Verify that signature was created from the digest using matching private key.
    verify(signature, digest) {
        if (!signature.ecdsaCompact) {
            return false;
        }
        return secp__namespace.verify(signature.ecdsaCompact.bytes, digest, this.secp256k1Uncompressed.bytes);
    }
    // Verify that the provided public key was signed by matching private key.
    async verifyKey(pub) {
        if (!pub.signature) {
            return false;
        }
        const digest = await sha256(pub.bytesToSign());
        return this.verify(pub.signature, digest);
    }
    // Is other the same/equivalent public key?
    equals(other) {
        return equalBytes(this.secp256k1Uncompressed.bytes, other.secp256k1Uncompressed.bytes);
    }
    // Derive Ethereum address from this public key.
    getEthereumAddress() {
        return computeAddress(this.secp256k1Uncompressed.bytes);
    }
    // Encode public key into bytes.
    toBytes() {
        return proto.publicKey.UnsignedPublicKey.encode(this).finish();
    }
    // Decode public key from bytes.
    static fromBytes(bytes) {
        return new UnsignedPublicKey(proto.publicKey.UnsignedPublicKey.decode(bytes));
    }
}
// Public key signed by another key pair or a wallet.
class SignedPublicKey extends UnsignedPublicKey {
    constructor(obj) {
        if (!obj.keyBytes) {
            throw new Error('missing key bytes');
        }
        super(proto.publicKey.UnsignedPublicKey.decode(obj.keyBytes));
        this.keyBytes = obj.keyBytes;
        if (!obj.signature) {
            throw new Error('missing key signature');
        }
        this.signature = new Signature(obj.signature);
    }
    // Return the key without the signature.
    get unsignedKey() {
        return new UnsignedPublicKey({
            createdNs: this.createdNs,
            secp256k1Uncompressed: this.secp256k1Uncompressed,
        });
    }
    // Return public key of the signer of this key.
    signerKey() {
        return this.signature.signerKey(this);
    }
    // Assume the key was signed by a wallet and
    // return the wallet address that validates
    // the signature of this key.
    async walletSignatureAddress() {
        if (!this.signature.walletEcdsaCompact) {
            throw new Error('key was not signed by a wallet');
        }
        const pk = await this.signerKey();
        if (!pk) {
            throw new Error('key signature not valid');
        }
        return pk.getEthereumAddress();
    }
    // Is other the same/equivalent public key?
    equals(other) {
        return (this.unsignedKey.equals(other.unsignedKey) &&
            this.signature.equals(other.signature));
    }
    // Return bytes of the encoded unsigned key.
    bytesToSign() {
        return this.keyBytes;
    }
    // Encode signed key into bytes.
    toBytes() {
        return proto.publicKey.SignedPublicKey.encode(this).finish();
    }
    // Decode signed key from bytes.
    static fromBytes(bytes) {
        return new SignedPublicKey(proto.publicKey.SignedPublicKey.decode(bytes));
    }
    toLegacyKey() {
        if (!this.isFromLegacyKey()) {
            throw new Error('cannot be converted to legacy key');
        }
        let signature = this.signature;
        if (signature.walletEcdsaCompact) {
            signature = new Signature({
                ecdsaCompact: signature.walletEcdsaCompact,
            });
        }
        return new PublicKey({
            timestamp: this.timestamp,
            secp256k1Uncompressed: this.secp256k1Uncompressed,
            signature,
        });
    }
    static fromLegacyKey(legacyKey, signedByWallet) {
        if (!legacyKey.signature) {
            throw new Error('key is not signed');
        }
        let signature = legacyKey.signature;
        if (signedByWallet) {
            signature = new Signature({
                walletEcdsaCompact: signature.ecdsaCompact,
            });
        }
        return new SignedPublicKey({
            keyBytes: legacyKey.bytesToSign(),
            signature,
        });
    }
}
// LEGACY: PublicKey optionally signed with another trusted key pair or a wallet.
// PublicKeys can be generated through PrivateKey.generate()
class PublicKey extends UnsignedPublicKey {
    constructor(obj) {
        super({
            createdNs: obj.timestamp.mul(1000000),
            secp256k1Uncompressed: obj.secp256k1Uncompressed,
        });
        if (obj.signature) {
            // Handle a case where Flutter was publishing signatures with walletEcdsaCompact
            // instead of ecdsaCompact for v1 keys.
            if (!obj.signature.ecdsaCompact && obj.signature.walletEcdsaCompact) {
                this.signature = new Signature({
                    ecdsaCompact: {
                        bytes: obj.signature.walletEcdsaCompact.bytes,
                        recovery: obj.signature.walletEcdsaCompact.recovery,
                    },
                });
            }
            else {
                this.signature = new Signature(obj.signature);
            }
        }
    }
    get timestamp() {
        return this.createdNs.div(1000000);
    }
    bytesToSign() {
        return proto.publicKey.PublicKey.encode({
            timestamp: this.timestamp,
            secp256k1Uncompressed: this.secp256k1Uncompressed,
        }).finish();
    }
    // sign the key using a wallet
    async signWithWallet(wallet) {
        const sigString = await wallet.signMessage(WalletSigner.identitySigRequestText(this.bytesToSign()));
        const { bytes, recovery } = splitSignature(sigString);
        this.signature = new Signature({
            ecdsaCompact: {
                bytes,
                recovery,
            },
        });
    }
    // Assume the key was signed by a wallet and
    // return the wallet address that validates
    // the signature for this key.
    walletSignatureAddress() {
        if (!this.signature) {
            throw new Error('key is not signed');
        }
        const digest = viem.hexToBytes(viem.hashMessage(WalletSigner.identitySigRequestText(this.bytesToSign())));
        const pk = this.signature.getPublicKey(digest);
        if (!pk) {
            throw new Error('key signature is malformed');
        }
        return pk.getEthereumAddress();
    }
    toBytes() {
        return proto.publicKey.PublicKey.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new PublicKey(proto.publicKey.PublicKey.decode(bytes));
    }
}

// LEGACY: PublicKeyBundle packages all the keys that a participant should advertise.
// The PreKey must be signed by the IdentityKey.
// The IdentityKey must be signed by the wallet to authenticate it.
class SignedPublicKeyBundle {
    constructor(bundle) {
        if (!bundle.identityKey) {
            throw new Error('missing identity key');
        }
        if (!bundle.preKey) {
            throw new Error('missing pre-key');
        }
        this.identityKey = new SignedPublicKey(bundle.identityKey);
        this.preKey = new SignedPublicKey(bundle.preKey);
    }
    walletSignatureAddress() {
        return this.identityKey.walletSignatureAddress();
    }
    equals(other) {
        return (this.identityKey.equals(other.identityKey) &&
            this.preKey.equals(other.preKey));
    }
    toBytes() {
        return proto.publicKey.SignedPublicKeyBundle.encode(this).finish();
    }
    isFromLegacyBundle() {
        return this.identityKey.isFromLegacyKey() && this.preKey.isFromLegacyKey();
    }
    toLegacyBundle() {
        return new PublicKeyBundle({
            identityKey: this.identityKey.toLegacyKey(),
            preKey: this.preKey.toLegacyKey(),
        });
    }
    static fromBytes(bytes) {
        const decoded = proto.publicKey.SignedPublicKeyBundle.decode(bytes);
        return new SignedPublicKeyBundle(decoded);
    }
    static fromLegacyBundle(bundle) {
        return new SignedPublicKeyBundle({
            // Note: I am assuming all PublicKeyBundles passed into this have had their identity keys signed by a wallet
            // Maybe that is not universally true in the future
            identityKey: SignedPublicKey.fromLegacyKey(bundle.identityKey, true),
            preKey: SignedPublicKey.fromLegacyKey(bundle.preKey),
        });
    }
}
// LEGACY: PublicKeyBundle packages all the keys that a participant should advertise.
// The PreKey must be signed by the IdentityKey.
// The IdentityKey can be signed by the wallet to authenticate it.
class PublicKeyBundle {
    constructor(bundle) {
        if (!bundle.identityKey) {
            throw new Error('missing identity key');
        }
        if (!bundle.preKey) {
            throw new Error('missing pre-key');
        }
        this.identityKey = new PublicKey(bundle.identityKey);
        this.preKey = new PublicKey(bundle.preKey);
    }
    equals(other) {
        return (this.identityKey.equals(other.identityKey) &&
            this.preKey.equals(other.preKey));
    }
    walletSignatureAddress() {
        return this.identityKey.walletSignatureAddress();
    }
    toBytes() {
        return proto.publicKey.PublicKeyBundle.encode(this).finish();
    }
    static fromBytes(bytes) {
        const decoded = proto.publicKey.PublicKeyBundle.decode(bytes);
        return new PublicKeyBundle(decoded);
    }
}

class NoMatchingPreKeyError extends Error {
    constructor(preKey) {
        super(`no pre-key matches: ${bytesToHex(preKey.secp256k1Uncompressed.bytes)}`);
    }
}

// PrivateKeyBundle bundles the private keys corresponding to a PublicKeyBundle for convenience.
// This bundle must not be shared with anyone, although will have to be persisted
// somehow so that older messages can be decrypted again.
class PrivateKeyBundleV2 {
    constructor(bundle) {
        this.version = 2;
        if (!bundle.identityKey) {
            throw new Error('missing identity key');
        }
        this.identityKey = new SignedPrivateKey(bundle.identityKey);
        this.preKeys = (bundle.preKeys || []).map((k) => new SignedPrivateKey(k));
    }
    // Generate a new key bundle with the preKey signed byt the identityKey.
    // Optionally sign the identityKey with the provided wallet as well.
    static async generate(wallet) {
        const identityKey = await SignedPrivateKey.generate(new WalletSigner(wallet));
        const bundle = new PrivateKeyBundleV2({
            identityKey,
            preKeys: [],
        });
        await bundle.addPreKey();
        return bundle;
    }
    // Return the current (latest) pre-key (to be advertised).
    getCurrentPreKey() {
        return this.preKeys[0];
    }
    // Find pre-key matching the provided public key.
    findPreKey(which) {
        const preKey = this.preKeys.find((key) => key.matches(which));
        if (!preKey) {
            throw new NoMatchingPreKeyError(which);
        }
        return preKey;
    }
    // Generate a new pre-key to be used as the current pre-key.
    async addPreKey() {
        this._publicKeyBundle = undefined;
        const preKey = await SignedPrivateKey.generate(this.identityKey);
        this.preKeys.unshift(preKey);
    }
    // Return a key bundle with the current pre-key.
    getPublicKeyBundle() {
        if (!this._publicKeyBundle) {
            this._publicKeyBundle = new SignedPublicKeyBundle({
                identityKey: this.identityKey.publicKey,
                preKey: this.getCurrentPreKey().publicKey,
            });
        }
        return this._publicKeyBundle;
    }
    // sharedSecret derives a secret from peer's key bundles using a variation of X3DH protocol
    // where the sender's ephemeral key pair is replaced by the sender's pre-key.
    // @peer is the peer's public key bundle
    // @myPreKey indicates which of my preKeys should be used to derive the secret
    // @recipient indicates if this is the sending or receiving side.
    async sharedSecret(peer, myPreKey, isRecipient) {
        if (!peer.identityKey || !peer.preKey) {
            throw new Error('invalid peer key bundle');
        }
        if (!(await peer.identityKey.verifyKey(peer.preKey))) {
            throw new Error('peer preKey signature invalid');
        }
        if (!this.identityKey) {
            throw new Error('missing identity key');
        }
        let dh1, dh2, preKey;
        if (isRecipient) {
            preKey = this.findPreKey(myPreKey);
            dh1 = preKey.sharedSecret(peer.identityKey);
            dh2 = this.identityKey.sharedSecret(peer.preKey);
        }
        else {
            preKey = this.findPreKey(myPreKey);
            dh1 = this.identityKey.sharedSecret(peer.preKey);
            dh2 = preKey.sharedSecret(peer.identityKey);
        }
        const dh3 = preKey.sharedSecret(peer.preKey);
        const secret = new Uint8Array(dh1.length + dh2.length + dh3.length);
        secret.set(dh1, 0);
        secret.set(dh2, dh1.length);
        secret.set(dh3, dh1.length + dh2.length);
        return secret;
    }
    encode() {
        return proto.privateKey.PrivateKeyBundle.encode({
            v1: undefined,
            v2: this,
        }).finish();
    }
    validatePublicKeys() {
        if (!this.identityKey.validatePublicKey()) {
            return false;
        }
        return this.preKeys.every((key) => key.validatePublicKey());
    }
    equals(other) {
        if (this.preKeys.length !== other.preKeys.length) {
            return false;
        }
        for (let i = 0; i < this.preKeys.length; i++) {
            if (!this.preKeys[i].equals(other.preKeys[i])) {
                return false;
            }
        }
        return this.identityKey.equals(other.identityKey);
    }
    static fromLegacyBundle(bundle) {
        return new PrivateKeyBundleV2({
            identityKey: SignedPrivateKey.fromLegacyKey(bundle.identityKey, true),
            preKeys: bundle.preKeys.map((k) => SignedPrivateKey.fromLegacyKey(k)),
        });
    }
}
// PrivateKeyBundle bundles the private keys corresponding to a PublicKeyBundle for convenience.
// This bundle must not be shared with anyone, although will have to be persisted
// somehow so that older messages can be decrypted again.
class PrivateKeyBundleV1 {
    constructor(bundle) {
        this.version = 1;
        if (!bundle.identityKey) {
            throw new Error('missing identity key');
        }
        this.identityKey = new PrivateKey(bundle.identityKey);
        this.preKeys = (bundle.preKeys || []).map((k) => new PrivateKey(k));
    }
    // Generate a new key bundle with the preKey signed byt the identityKey.
    // Optionally sign the identityKey with the provided wallet as well.
    static async generate(wallet) {
        const identityKey = PrivateKey.generate();
        if (wallet) {
            await identityKey.publicKey.signWithWallet(wallet);
        }
        const bundle = new PrivateKeyBundleV1({
            identityKey,
            preKeys: [],
        });
        await bundle.addPreKey();
        return bundle;
    }
    // Return the current (latest) pre-key (to be advertised).
    getCurrentPreKey() {
        return this.preKeys[0];
    }
    // Find pre-key matching the provided public key.
    findPreKey(which) {
        const preKey = this.preKeys.find((key) => key.matches(which));
        if (!preKey) {
            throw new NoMatchingPreKeyError(which);
        }
        return preKey;
    }
    // Generate a new pre-key to be used as the current pre-key.
    async addPreKey() {
        this._publicKeyBundle = undefined;
        const preKey = PrivateKey.generate();
        await this.identityKey.signKey(preKey.publicKey);
        this.preKeys.unshift(preKey);
    }
    // Return a key bundle with the current pre-key.
    getPublicKeyBundle() {
        if (!this._publicKeyBundle) {
            this._publicKeyBundle = new PublicKeyBundle({
                identityKey: this.identityKey.publicKey,
                preKey: this.getCurrentPreKey().publicKey,
            });
        }
        return this._publicKeyBundle;
    }
    validatePublicKeys() {
        if (!this.identityKey.validatePublicKey()) {
            return false;
        }
        return this.preKeys.every((key) => key.validatePublicKey());
    }
    // sharedSecret derives a secret from peer's key bundles using a variation of X3DH protocol
    // where the sender's ephemeral key pair is replaced by the sender's pre-key.
    // @peer is the peer's public key bundle
    // @myPreKey indicates which of my preKeys should be used to derive the secret
    // @recipient indicates if this is the sending or receiving side.
    async sharedSecret(peer, myPreKey, isRecipient) {
        if (!peer.identityKey || !peer.preKey) {
            throw new Error('invalid peer key bundle');
        }
        if (!(await peer.identityKey.verifyKey(peer.preKey))) {
            throw new Error('peer preKey signature invalid');
        }
        if (!this.identityKey) {
            throw new Error('missing identity key');
        }
        let dh1, dh2, preKey;
        if (isRecipient) {
            preKey = this.findPreKey(myPreKey);
            dh1 = preKey.sharedSecret(peer.identityKey);
            dh2 = this.identityKey.sharedSecret(peer.preKey);
        }
        else {
            preKey = this.findPreKey(myPreKey);
            dh1 = this.identityKey.sharedSecret(peer.preKey);
            dh2 = preKey.sharedSecret(peer.identityKey);
        }
        const dh3 = preKey.sharedSecret(peer.preKey);
        const secret = new Uint8Array(dh1.length + dh2.length + dh3.length);
        secret.set(dh1, 0);
        secret.set(dh2, dh1.length);
        secret.set(dh3, dh1.length + dh2.length);
        return secret;
    }
    encode() {
        return proto.privateKey.PrivateKeyBundle.encode({
            v1: this,
            v2: undefined,
        }).finish();
    }
}
function decodePrivateKeyBundle(bytes) {
    const b = proto.privateKey.PrivateKeyBundle.decode(bytes);
    if (b.v1) {
        return new PrivateKeyBundleV1(b.v1);
    }
    if (b.v2) {
        return new PrivateKeyBundleV2(b.v2);
    }
    throw new Error('unknown private key bundle version');
}

const IV_LENGTH = 16;
const EPHEMERAL_PUBLIC_KEY_LENGTH = 65;
const MAC_LENGTH = 32;
const AES_BLOCK_SIZE = 16;
const assertEciesLengths = (ecies) => {
    if (ecies.iv.length !== IV_LENGTH) {
        throw new Error('Invalid iv length');
    }
    if (ecies.ephemeralPublicKey.length !== EPHEMERAL_PUBLIC_KEY_LENGTH) {
        throw new Error('Invalid ephemPublicKey length');
    }
    if (ecies.ciphertext.length < 1 ||
        ecies.ciphertext.length % AES_BLOCK_SIZE !== 0) {
        throw new Error('Invalid ciphertext length');
    }
    if (ecies.mac.length !== MAC_LENGTH) {
        throw new Error('Invalid mac length');
    }
};
class SignedEciesCiphertext {
    constructor({ eciesBytes, signature }) {
        if (!eciesBytes || !eciesBytes.length) {
            throw new Error('eciesBytes is empty');
        }
        if (!signature) {
            throw new Error('signature is undefined');
        }
        this.eciesBytes = eciesBytes;
        this.signature = new Signature(signature);
        this.ciphertext = proto.ciphertext.SignedEciesCiphertext_Ecies.decode(eciesBytes);
    }
    toBytes() {
        return proto.ciphertext.SignedEciesCiphertext.encode(this).finish();
    }
    async verify(pubKey) {
        return pubKey.verify(this.signature, await sha256(this.eciesBytes));
    }
    static fromBytes(data) {
        const obj = proto.ciphertext.SignedEciesCiphertext.decode(data);
        return new SignedEciesCiphertext(obj);
    }
    static async create(ecies, signer) {
        assertEciesLengths(ecies);
        const eciesBytes = proto.ciphertext.SignedEciesCiphertext_Ecies.encode(ecies).finish();
        const signature = await signer.sign(await sha256(eciesBytes));
        return new SignedEciesCiphertext({ eciesBytes, signature });
    }
}

class PreparedMessage {
    constructor(messageEnvelope, onSend) {
        this.messageEnvelope = messageEnvelope;
        this.onSend = onSend;
    }
    async messageID() {
        if (!this.messageEnvelope.message) {
            throw new Error('no envelope message');
        }
        return bytesToHex(await sha256(this.messageEnvelope.message));
    }
    async send() {
        return this.onSend();
    }
}

class KeystoreError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

// Validates the Keystore response. Throws on errors or missing fields.
// Returns a type with all possibly undefined fields required to be defined
const getResultOrThrow = (response) => {
    if (response.error) {
        throw new KeystoreError(response.error.code, response.error.message);
    }
    if (!response.result) {
        throw new KeystoreError(proto.keystore.ErrorCode.ERROR_CODE_UNSPECIFIED, 'No result from Keystore');
    }
    if ('encrypted' in response.result && !response.result.encrypted) {
        throw new Error('Missing ciphertext');
    }
    if ('decrypted' in response.result && !response.result.decrypted) {
        throw new Error('Missing decrypted result');
    }
    return response.result;
};
const buildDecryptV1Request = (messages, myPublicKeyBundle) => {
    return {
        requests: messages.map((m) => {
            const sender = new PublicKeyBundle({
                identityKey: m.header.sender?.identityKey,
                preKey: m.header.sender?.preKey,
            });
            const isSender = myPublicKeyBundle.equals(sender);
            return {
                payload: m.ciphertext,
                peerKeys: isSender
                    ? new PublicKeyBundle({
                        identityKey: m.header.recipient?.identityKey,
                        preKey: m.header.recipient?.preKey,
                    })
                    : sender,
                headerBytes: m.headerBytes,
                isSender,
            };
        }),
    };
};

// Represents proto.ContentTypeId
class ContentTypeId {
    constructor(obj) {
        this.authorityId = obj.authorityId;
        this.typeId = obj.typeId;
        this.versionMajor = obj.versionMajor;
        this.versionMinor = obj.versionMinor;
    }
    toString() {
        return `${this.authorityId}/${this.typeId}:${this.versionMajor}.${this.versionMinor}`;
    }
    static fromString(contentTypeString) {
        const [idString, versionString] = contentTypeString.split(':');
        const [authorityId, typeId] = idString.split('/');
        const [major, minor] = versionString.split('.');
        return new ContentTypeId({
            authorityId,
            typeId,
            versionMajor: Number(major),
            versionMinor: Number(minor),
        });
    }
    sameAs(id) {
        return this.authorityId === id.authorityId && this.typeId === id.typeId;
    }
}
// brixbit.org/fallback
//
// This is not a real content type, it is used to signal to the recipient
// that the content in the message is the fallback description (if present)
// in case the original content type is not supported.
// This content type MUST NOT be used to send content.
const ContentTypeFallback = new ContentTypeId({
    authorityId: 'brixbit.org',
    typeId: 'fallback',
    versionMajor: 1,
    versionMinor: 0,
});

// brixbit.org/text
//
// This content type is used for a plain text content represented by a simple string
const ContentTypeText = new ContentTypeId({
    authorityId: 'brixbit.org',
    typeId: 'text',
    versionMajor: 1,
    versionMinor: 0,
});
var Encoding;
(function (Encoding) {
    Encoding["utf8"] = "UTF-8";
})(Encoding || (Encoding = {}));
class TextCodec {
    get contentType() {
        return ContentTypeText;
    }
    encode(content) {
        return {
            type: ContentTypeText,
            parameters: { encoding: Encoding.utf8 },
            content: new TextEncoder().encode(content),
        };
    }
    decode(content) {
        const encoding = content.parameters.encoding;
        if (encoding && encoding !== Encoding.utf8) {
            throw new Error(`unrecognized encoding ${encoding}`);
        }
        return new TextDecoder().decode(content.content);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fallback(content) {
        return undefined;
    }
}

/**
 * ConversationV1 allows you to view, stream, and send messages to/from a peer address
 */
class ConversationV1 {
    constructor(client, address, createdAt) {
        this.conversationVersion = 'v1';
        this.context = undefined;
        this.peerAddress = viem.getAddress(address);
        this.client = client;
        this.createdAt = createdAt;
    }
    get clientAddress() {
        return this.client.address;
    }
    async allow() {
        await this.client.contacts.allow([this.peerAddress]);
    }
    async deny() {
        await this.client.contacts.deny([this.peerAddress]);
    }
    get isAllowed() {
        return this.client.contacts.isAllowed(this.peerAddress);
    }
    get isDenied() {
        return this.client.contacts.isDenied(this.peerAddress);
    }
    get consentState() {
        return this.client.contacts.consentState(this.peerAddress);
    }
    get topic() {
        return buildDirectMessageTopic(this.peerAddress, this.client.address);
    }
    get ephemeralTopic() {
        return buildDirectMessageTopic(this.peerAddress, this.client.address).replace('/brixbit/0/dm-', '/brixbit/0/dmE-');
    }
    /**
     * Returns a list of all messages to/from the peerAddress
     */
    async messages(opts) {
        const topic = buildDirectMessageTopic(this.peerAddress, this.client.address);
        const messages = await this.client.listEnvelopes(topic, this.processEnvelope.bind(this), opts);
        return this.decryptBatch(messages, topic, false);
    }
    messagesPaginated(opts) {
        return this.client.listEnvelopesPaginated(this.topic, 
        // This won't be performant once we start supporting a remote keystore
        // TODO: Either better batch support or we ditch this under-utilized feature
        this.decodeMessage.bind(this), opts);
    }
    // decodeMessage takes an envelope and either returns a `DecodedMessage` or throws if an error occurs
    async decodeMessage(env) {
        if (!env.contentTopic) {
            throw new Error('Missing content topic');
        }
        const msg = await this.processEnvelope(env);
        const decryptResults = await this.decryptBatch([msg], env.contentTopic, true);
        if (!decryptResults.length) {
            throw new Error('No results');
        }
        return decryptResults[0];
    }
    async prepareMessage(content, // eslint-disable-line @typescript-eslint/no-explicit-any
    options) {
        let topics;
        let recipient = await this.client.getUserContact(this.peerAddress);
        if (!recipient) {
            throw new Error(`recipient ${this.peerAddress} is not registered`);
        }
        if (!(recipient instanceof PublicKeyBundle)) {
            recipient = recipient.toLegacyBundle();
        }
        const topic = options?.ephemeral ? this.ephemeralTopic : this.topic;
        if (!this.client.contacts.addresses.has(this.peerAddress)) {
            topics = [
                buildUserIntroTopic(this.peerAddress),
                buildUserIntroTopic(this.client.address),
                topic,
            ];
            this.client.contacts.addresses.add(this.peerAddress);
        }
        else {
            topics = [topic];
        }
        const payload = await this.client.encodeContent(content, options);
        const msg = await this.createMessage(payload, recipient, options?.timestamp);
        const msgBytes = msg.toBytes();
        const env = {
            contentTopic: topic,
            message: msgBytes,
            timestampNs: toNanoString(msg.sent),
        };
        return new PreparedMessage(env, async () => {
            await this.client.publishEnvelopes(topics.map((topic) => ({
                contentTopic: topic,
                message: msgBytes,
                timestamp: msg.sent,
            })));
            return DecodedMessage.fromV1Message(msg, content, options?.contentType || ContentTypeText, payload, topic, this);
        });
    }
    /**
     * Returns a Stream of any new messages to/from the peerAddress
     */
    streamMessages(onConnectionLost) {
        return Stream.create(this.client, [this.topic], async (env) => this.decodeMessage(env), undefined, onConnectionLost);
    }
    async processEnvelope({ message, contentTopic, }) {
        if (!message || !message.length) {
            throw new Error('empty envelope');
        }
        const decoded = await MessageV1.fromBytes(message);
        const { senderAddress, recipientAddress } = decoded;
        // Filter for topics
        if (!senderAddress ||
            !recipientAddress ||
            !contentTopic ||
            buildDirectMessageTopic(senderAddress, recipientAddress) !== this.topic) {
            throw new Error('Headers do not match intended recipient');
        }
        return decoded;
    }
    streamEphemeral(onConnectionLost) {
        return Stream.create(this.client, [this.ephemeralTopic], this.decodeMessage.bind(this), undefined, onConnectionLost);
    }
    /**
     * Send a message into the conversation.
     */
    async send(content, options) {
        let topics;
        let recipient = await this.client.getUserContact(this.peerAddress);
        if (!recipient) {
            throw new Error(`recipient ${this.peerAddress} is not registered`);
        }
        if (!(recipient instanceof PublicKeyBundle)) {
            recipient = recipient.toLegacyBundle();
        }
        const topic = options?.ephemeral ? this.ephemeralTopic : this.topic;
        if (!this.client.contacts.addresses.has(this.peerAddress)) {
            topics = [
                buildUserIntroTopic(this.peerAddress),
                buildUserIntroTopic(this.client.address),
                topic,
            ];
            this.client.contacts.addresses.add(this.peerAddress);
        }
        else {
            topics = [topic];
        }
        const contentType = options?.contentType || ContentTypeText;
        const payload = await this.client.encodeContent(content, options);
        const msg = await this.createMessage(payload, recipient, options?.timestamp);
        await this.client.publishEnvelopes(topics.map((topic) => ({
            contentTopic: topic,
            message: msg.toBytes(),
            timestamp: msg.sent,
        })));
        // if the conversation consent state is unknown, we assume the user has
        // consented to the conversation by sending a message into it
        if (this.consentState === 'unknown') {
            // add conversation to the allow list
            await this.allow();
        }
        return DecodedMessage.fromV1Message(msg, content, contentType, payload, topic, this);
    }
    async decryptBatch(messages, topic, throwOnError = false) {
        const responses = (await this.client.keystore.decryptV1(buildDecryptV1Request(messages, this.client.publicKeyBundle))).responses;
        const out = [];
        for (let i = 0; i < responses.length; i++) {
            const result = responses[i];
            const message = messages[i];
            try {
                const { decrypted } = getResultOrThrow(result);
                out.push(await this.buildDecodedMessage(message, decrypted, topic));
            }
            catch (e) {
                if (throwOnError) {
                    throw e;
                }
                console.warn('Error decoding content', e);
            }
        }
        return out;
    }
    async buildDecodedMessage(message, decrypted, topic) {
        const { content, contentType, error, contentFallback } = await this.client.decodeContent(decrypted);
        return DecodedMessage.fromV1Message(message, content, contentType, decrypted, topic, this, error, contentFallback);
    }
    async createMessage(
    // Payload is expected to be the output of `client.encodeContent`
    payload, recipient, timestamp) {
        timestamp = timestamp || new Date();
        return MessageV1.encode(this.client.keystore, payload, this.client.publicKeyBundle, recipient, timestamp);
    }
}
/**
 * ConversationV2
 */
class ConversationV2 {
    constructor(client, topic, peerAddress, createdAt, context) {
        this.conversationVersion = 'v2';
        this.topic = topic;
        this.createdAt = createdAt;
        this.context = context;
        this.client = client;
        this.peerAddress = peerAddress;
    }
    get clientAddress() {
        return this.client.address;
    }
    async allow() {
        await this.client.contacts.allow([this.peerAddress]);
    }
    async deny() {
        await this.client.contacts.deny([this.peerAddress]);
    }
    get isAllowed() {
        return this.client.contacts.isAllowed(this.peerAddress);
    }
    get isDenied() {
        return this.client.contacts.isDenied(this.peerAddress);
    }
    get consentState() {
        return this.client.contacts.consentState(this.peerAddress);
    }
    /**
     * Returns a list of all messages to/from the peerAddress
     */
    async messages(opts) {
        const messages = await this.client.listEnvelopes(this.topic, this.processEnvelope.bind(this), opts);
        return this.decryptBatch(messages, false);
    }
    messagesPaginated(opts) {
        return this.client.listEnvelopesPaginated(this.topic, this.decodeMessage.bind(this), opts);
    }
    get ephemeralTopic() {
        return this.topic.replace('/brixbit/0/m', '/brixbit/0/mE');
    }
    streamEphemeral(onConnectionLost) {
        return Stream.create(this.client, [this.ephemeralTopic], this.decodeMessage.bind(this), undefined, onConnectionLost);
    }
    /**
     * Returns a Stream of any new messages to/from the peerAddress
     */
    streamMessages(onConnectionLost) {
        return Stream.create(this.client, [this.topic], this.decodeMessage.bind(this), undefined, onConnectionLost);
    }
    /**
     * Send a message into the conversation
     */
    async send(content, options) {
        const payload = await this.client.encodeContent(content, options);
        const msg = await this.createMessage(payload, options?.timestamp);
        const topic = options?.ephemeral ? this.ephemeralTopic : this.topic;
        await this.client.publishEnvelopes([
            {
                contentTopic: topic,
                message: msg.toBytes(),
                timestamp: msg.sent,
            },
        ]);
        const contentType = options?.contentType || ContentTypeText;
        // if the conversation consent state is unknown, we assume the user has
        // consented to the conversation by sending a message into it
        if (this.consentState === 'unknown') {
            // add conversation to the allow list
            await this.allow();
        }
        return DecodedMessage.fromV2Message(msg, content, contentType, topic, payload, this, this.client.address);
    }
    async createMessage(
    // Payload is expected to have already gone through `client.encodeContent`
    payload, timestamp) {
        const header = {
            topic: this.topic,
            createdNs: dateToNs(timestamp || new Date()),
        };
        const headerBytes = proto.message.MessageHeaderV2.encode(header).finish();
        const digest = await sha256(concat(headerBytes, payload));
        const signed = {
            payload,
            sender: this.client.signedPublicKeyBundle,
            signature: await this.client.keystore.signDigest({
                digest,
                prekeyIndex: 0,
                identityKey: undefined,
            }),
        };
        const signedBytes = proto.content.SignedContent.encode(signed).finish();
        const ciphertext = await this.encryptMessage(signedBytes, headerBytes);
        const protoMsg = {
            v1: undefined,
            v2: { headerBytes, ciphertext },
        };
        const bytes = proto.message.Message.encode(protoMsg).finish();
        return MessageV2.create(protoMsg, header, bytes);
    }
    async decryptBatch(messages, throwOnError = false) {
        const responses = (await this.client.keystore.decryptV2(this.buildDecryptRequest(messages))).responses;
        const out = [];
        for (let i = 0; i < responses.length; i++) {
            const result = responses[i];
            const message = messages[i];
            try {
                const { decrypted } = getResultOrThrow(result);
                out.push(await this.buildDecodedMessage(message, decrypted));
            }
            catch (e) {
                if (throwOnError) {
                    throw e;
                }
                console.warn('Error decoding content', e);
            }
        }
        return out;
    }
    buildDecryptRequest(messages) {
        return {
            requests: messages.map((m) => {
                return {
                    payload: m.ciphertext,
                    headerBytes: m.headerBytes,
                    contentTopic: this.topic,
                };
            }),
        };
    }
    async encryptMessage(payload, headerBytes) {
        const { responses } = await this.client.keystore.encryptV2({
            requests: [
                {
                    payload,
                    headerBytes,
                    contentTopic: this.topic,
                },
            ],
        });
        if (responses.length !== 1) {
            throw new Error('Invalid response length');
        }
        const { encrypted } = getResultOrThrow(responses[0]);
        return encrypted;
    }
    async buildDecodedMessage(msg, decrypted) {
        // Decode the decrypted bytes into SignedContent
        const signed = proto.content.SignedContent.decode(decrypted);
        if (!signed.sender?.identityKey ||
            !signed.sender?.preKey ||
            !signed.signature) {
            throw new Error('incomplete signed content');
        }
        await validatePrekeys(signed);
        // Verify the signature
        const digest = await sha256(concat(msg.headerBytes, signed.payload));
        if (!new SignedPublicKey(signed.sender?.preKey).verify(new Signature(signed.signature), digest)) {
            throw new Error('invalid signature');
        }
        // Derive the sender address from the valid signature
        const senderAddress = await new SignedPublicKeyBundle(signed.sender).walletSignatureAddress();
        const { content, contentType, error, contentFallback } = await this.client.decodeContent(signed.payload);
        return DecodedMessage.fromV2Message(msg, content, contentType, this.topic, signed.payload, this, senderAddress, error, contentFallback);
    }
    async prepareMessage(content, // eslint-disable-line @typescript-eslint/no-explicit-any
    options) {
        const payload = await this.client.encodeContent(content, options);
        const msg = await this.createMessage(payload, options?.timestamp);
        const msgBytes = msg.toBytes();
        const topic = options?.ephemeral ? this.ephemeralTopic : this.topic;
        const env = {
            contentTopic: topic,
            message: msgBytes,
            timestampNs: toNanoString(msg.sent),
        };
        return new PreparedMessage(env, async () => {
            await this.client.publishEnvelopes([
                {
                    contentTopic: topic,
                    message: msgBytes,
                    timestamp: msg.sent,
                },
            ]);
            return DecodedMessage.fromV2Message(msg, content, options?.contentType || ContentTypeText, topic, payload, this, this.client.address);
        });
    }
    async processEnvelope(env) {
        if (!env.message || !env.contentTopic) {
            throw new Error('empty envelope');
        }
        const msg = proto.message.Message.decode(env.message);
        if (!msg.v2) {
            throw new Error('unknown message version');
        }
        const header = proto.message.MessageHeaderV2.decode(msg.v2.headerBytes);
        if (header.topic !== this.topic) {
            throw new Error('topic mismatch');
        }
        return MessageV2.create(msg, header, env.message);
    }
    async decodeMessage(env) {
        if (!env.contentTopic) {
            throw new Error('Missing content topic');
        }
        const msg = await this.processEnvelope(env);
        const decryptResults = await this.decryptBatch([msg], true);
        if (!decryptResults.length) {
            throw new Error('No results');
        }
        return decryptResults[0];
    }
}
async function validatePrekeys(signed) {
    // Check that the pre key is signed by the identity key
    // this is required to chain the prekey-signed message to the identity key
    // and finally to the user's wallet address
    const senderPreKey = signed.sender?.preKey;
    if (!senderPreKey || !senderPreKey.signature || !senderPreKey.keyBytes) {
        throw new Error('missing pre-key or pre-key signature');
    }
    const senderIdentityKey = signed.sender?.identityKey;
    if (!senderIdentityKey) {
        throw new Error('missing identity key in bundle');
    }
    const isValidPrekey = await new SignedPublicKey(senderIdentityKey).verifyKey(new SignedPublicKey(senderPreKey));
    if (!isValidPrekey) {
        throw new Error('pre key not signed by identity key');
    }
}

const headerBytesAndCiphertext = (msg) => {
    if (msg.v1?.ciphertext) {
        return [msg.v1.headerBytes, new Ciphertext(msg.v1.ciphertext)];
    }
    if (msg.v2?.ciphertext) {
        return [msg.v2.headerBytes, new Ciphertext(msg.v2.ciphertext)];
    }
    throw new Error('unknown message version');
};
// Message is basic unit of communication on the network.
// Message timestamp is set by the sender.
class MessageBase {
    constructor(id, bytes, obj) {
        [this.headerBytes, this.ciphertext] = headerBytesAndCiphertext(obj);
        this.id = id;
        this.bytes = bytes;
    }
    toBytes() {
        return this.bytes;
    }
}
// Message header carries the sender and recipient keys used to protect message.
// Message timestamp is set by the sender.
class MessageV1 extends MessageBase {
    constructor(id, bytes, obj, header, senderAddress) {
        super(id, bytes, obj);
        this.conversation = undefined;
        this.senderAddress = senderAddress;
        this.header = header;
    }
    static async create(obj, header, bytes) {
        if (!header.sender) {
            throw new Error('missing message sender');
        }
        const senderAddress = new PublicKeyBundle(header.sender).walletSignatureAddress();
        const id = bytesToHex(await sha256(bytes));
        return new MessageV1(id, bytes, obj, header, senderAddress);
    }
    get sent() {
        return new Date(this.header.timestamp.toNumber());
    }
    // wallet address derived from the signature of the message recipient
    get recipientAddress() {
        if (!this.header?.recipient?.identityKey) {
            return undefined;
        }
        return new PublicKey(this.header.recipient.identityKey).walletSignatureAddress();
    }
    async decrypt(keystore, myPublicKeyBundle) {
        const responses = (await keystore.decryptV1(buildDecryptV1Request([this], myPublicKeyBundle))).responses;
        if (!responses.length) {
            throw new Error('No response from Keystore');
        }
        const { decrypted } = getResultOrThrow(responses[0]);
        return decrypted;
    }
    static fromBytes(bytes) {
        const message = proto.message.Message.decode(bytes);
        const [headerBytes] = headerBytesAndCiphertext(message);
        const header = proto.message.MessageHeaderV1.decode(headerBytes);
        if (!header) {
            throw new Error('missing message header');
        }
        if (!header.sender) {
            throw new Error('missing message sender');
        }
        if (!header.sender.identityKey) {
            throw new Error('missing message sender identity key');
        }
        if (!header.sender.preKey) {
            throw new Error('missing message sender pre-key');
        }
        if (!header.recipient) {
            throw new Error('missing message recipient');
        }
        if (!header.recipient.identityKey) {
            throw new Error('missing message recipient identity-key');
        }
        if (!header.recipient.preKey) {
            throw new Error('missing message recipient pre-key');
        }
        return MessageV1.create(message, header, bytes);
    }
    static async encode(keystore, payload, sender, recipient, timestamp) {
        const header = {
            sender,
            recipient,
            timestamp: Long.fromNumber(timestamp.getTime()),
        };
        const headerBytes = proto.message.MessageHeaderV1.encode(header).finish();
        const results = await keystore.encryptV1({
            requests: [
                {
                    recipient,
                    headerBytes,
                    payload,
                },
            ],
        });
        if (!results.responses.length) {
            throw new Error('No response from Keystore');
        }
        const { encrypted: ciphertext } = getResultOrThrow(results.responses[0]);
        const protoMsg = {
            v1: { headerBytes, ciphertext },
            v2: undefined,
        };
        const bytes = proto.message.Message.encode(protoMsg).finish();
        return MessageV1.create(protoMsg, header, bytes);
    }
}
class MessageV2 extends MessageBase {
    constructor(id, bytes, obj, header) {
        super(id, bytes, obj);
        this.header = header;
    }
    static async create(obj, header, bytes) {
        const id = bytesToHex(await sha256(bytes));
        return new MessageV2(id, bytes, obj, header);
    }
    get sent() {
        return nsToDate(this.header.createdNs);
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class DecodedMessage {
    constructor({ id, messageVersion, senderAddress, recipientAddress, conversation, contentBytes, contentType, contentTopic, content, sent, error, contentFallback, }) {
        this.id = id;
        this.messageVersion = messageVersion;
        this.senderAddress = senderAddress;
        this.recipientAddress = recipientAddress;
        this.conversation = conversation;
        this.contentType = contentType;
        this.sent = sent;
        this.error = error;
        this.content = content;
        this.contentTopic = contentTopic;
        this.contentBytes = contentBytes;
        this.contentFallback = contentFallback;
    }
    toBytes() {
        return proto.message.DecodedMessage.encode({
            ...this,
            conversation: {
                topic: this.conversation.topic,
                context: this.conversation.context ?? undefined,
                createdNs: dateToNs(this.conversation.createdAt),
                peerAddress: this.conversation.peerAddress,
            },
            sentNs: dateToNs(this.sent),
        }).finish();
    }
    static async fromBytes(data, client) {
        const protoVal = proto.message.DecodedMessage.decode(data);
        const messageVersion = protoVal.messageVersion;
        if (messageVersion !== 'v1' && messageVersion !== 'v2') {
            throw new Error('Invalid message version');
        }
        if (!protoVal.conversation) {
            throw new Error('No conversation reference found');
        }
        const { content, contentType, error, contentFallback } = await client.decodeContent(protoVal.contentBytes);
        return new DecodedMessage({
            ...protoVal,
            content,
            contentType,
            error,
            messageVersion,
            sent: nsToDate(protoVal.sentNs),
            conversation: conversationReferenceToConversation(protoVal.conversation, client, messageVersion),
            contentFallback,
        });
    }
    static fromV1Message(message, content, contentType, contentBytes, contentTopic, conversation, error, contentFallback) {
        const { id, senderAddress, recipientAddress, sent } = message;
        if (!senderAddress) {
            throw new Error('Sender address is required');
        }
        return new DecodedMessage({
            id,
            messageVersion: 'v1',
            senderAddress,
            recipientAddress,
            sent,
            content,
            contentBytes,
            contentType,
            contentTopic,
            conversation,
            error,
            contentFallback,
        });
    }
    static fromV2Message(message, content, contentType, contentTopic, contentBytes, conversation, senderAddress, error, contentFallback) {
        const { id, sent } = message;
        return new DecodedMessage({
            id,
            messageVersion: 'v2',
            senderAddress,
            sent,
            content,
            contentBytes,
            contentType,
            contentTopic,
            conversation,
            error,
            contentFallback,
        });
    }
}
function conversationReferenceToConversation(reference, client, version) {
    if (version === 'v1') {
        return new ConversationV1(client, reference.peerAddress, nsToDate(reference.createdNs));
    }
    if (version === 'v2') {
        return new ConversationV2(client, reference.topic, reference.peerAddress, nsToDate(reference.createdNs), reference.context);
    }
    throw new Error(`Unknown conversation version ${version}`);
}
function decodeContent(contentBytes, client) {
    return client.decodeContent(contentBytes);
}

// Default to 10 seconds less than expected expiry to give some wiggle room near the end
// https://github.com/brixbit/brixbit-node-go/blob/main/pkg/api/authentication.go#L18
const DEFAULT_MAX_AGE_SECONDS = 60 * 60 - 10;
class AuthCache {
    constructor(authenticator, cacheExpirySeconds = DEFAULT_MAX_AGE_SECONDS) {
        this.authenticator = authenticator;
        this.maxAgeMs = cacheExpirySeconds * 1000;
    }
    async getToken() {
        if (!this.token || this.token.ageMs > this.maxAgeMs) {
            await this.refresh();
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.token.toBase64();
    }
    async refresh() {
        this.token = await this.authenticator.createToken();
    }
}

const version$1 = "11.4.1";

const BRIXBIT_DEV_WARNING = `
XX    XX MM    MM TTTTTT PPPPPP   DDDDD   EEEEEEE VV     VV 
 XX  XX  MMM  MMM   TT   PP   PP  DD  DD  EE      VV     VV 
  XXXX   MM MM MM   TT   PPPPPP   DD   DD EEEEE    VV   VV  
 XX  XX  MM    MM   TT   PP       DD   DD EE        VV VV   
XX    XX MM    MM   TT   PP       DDDDDD  EEEEEEE    VVV    

Connected to the BRIXBIT 'dev' network. Use 'production' for production messages.
https://github.com/brixbit/brixbit-js#brixbit-production-and-dev-network-environments
`;

const { MessageApi, SortDirection } = proto.messageApi;
const RETRY_SLEEP_TIME = 100;
const ERR_CODE_UNAUTHENTICATED = 16;
const clientVersionHeaderKey = 'X-Client-Version';
const appVersionHeaderKey = 'X-App-Version';
const ApiUrls = {
    local: 'http://localhost:5555',
    dev: 'https://dev.brixbit.network',
    production: 'https://production.brixbit.network',
};
var GrpcStatus;
(function (GrpcStatus) {
    GrpcStatus[GrpcStatus["OK"] = 0] = "OK";
    GrpcStatus[GrpcStatus["CANCELLED"] = 1] = "CANCELLED";
    GrpcStatus[GrpcStatus["UNKNOWN"] = 2] = "UNKNOWN";
    GrpcStatus[GrpcStatus["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
    GrpcStatus[GrpcStatus["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
    GrpcStatus[GrpcStatus["NOT_FOUND"] = 5] = "NOT_FOUND";
    GrpcStatus[GrpcStatus["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
    GrpcStatus[GrpcStatus["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    GrpcStatus[GrpcStatus["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
    GrpcStatus[GrpcStatus["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
    GrpcStatus[GrpcStatus["ABORTED"] = 10] = "ABORTED";
    GrpcStatus[GrpcStatus["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
    GrpcStatus[GrpcStatus["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
    GrpcStatus[GrpcStatus["INTERNAL"] = 13] = "INTERNAL";
    GrpcStatus[GrpcStatus["UNAVAILABLE"] = 14] = "UNAVAILABLE";
    GrpcStatus[GrpcStatus["DATA_LOSS"] = 15] = "DATA_LOSS";
    GrpcStatus[GrpcStatus["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
})(GrpcStatus || (GrpcStatus = {}));
class GrpcError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
    static fromObject(err) {
        return new GrpcError(err.message, err.code);
    }
}
const isAbortError = (err) => {
    if (!err) {
        return false;
    }
    if (err.name === 'AbortError' || err.message.includes('aborted')) {
        return true;
    }
    return false;
};
const isAuthError = (err) => {
    if (err && 'code' in err && err.code === ERR_CODE_UNAUTHENTICATED) {
        return true;
    }
    return false;
};
const isNotAuthError = (err) => !isAuthError(err);
const normalizeEnvelope = (env) => {
    if (!env.message || !env.message.length) {
        return env;
    }
    if (typeof env.message === 'string') {
        env.message = b64Decode(env.message);
    }
    return env;
};
/**
 * ApiClient provides a wrapper for calling the GRPC Gateway generated code.
 * It adds some helpers for dealing with paginated data and automatically retries idempotent calls
 */
class HttpApiClient {
    constructor(pathPrefix, opts) {
        this.pathPrefix = pathPrefix;
        this.maxRetries = opts?.maxRetries || 5;
        this.appVersion = opts?.appVersion;
        this.version = 'brixbit-js/' + version$1;
        if (pathPrefix === ApiUrls.dev) {
            console.info(BRIXBIT_DEV_WARNING);
        }
    }
    // Raw method for querying the API
    async _query(req) {
        try {
            return await retry(MessageApi.Query, [
                req,
                {
                    pathPrefix: this.pathPrefix,
                    mode: 'cors',
                    headers: this.headers(),
                },
            ], this.maxRetries, RETRY_SLEEP_TIME);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            throw GrpcError.fromObject(e);
        }
    }
    // Raw method for batch-querying the API
    _batchQuery(req) {
        return retry(MessageApi.BatchQuery, [
            req,
            {
                pathPrefix: this.pathPrefix,
                mode: 'cors',
                headers: this.headers(),
            },
        ], this.maxRetries, RETRY_SLEEP_TIME);
    }
    // Raw method for publishing to the API
    async _publish(req, attemptNumber = 0) {
        const authToken = await this.getToken();
        const headers = this.headers();
        headers.set('Authorization', `Bearer ${authToken}`);
        try {
            return await retry(MessageApi.Publish, [
                req,
                {
                    pathPrefix: this.pathPrefix,
                    mode: 'cors',
                    headers,
                },
            ], this.maxRetries, RETRY_SLEEP_TIME, 
            // Do not retry UnauthenticatedErrors
            isNotAuthError);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            // Try at most 2X. If refreshing the auth token doesn't work the first time, it won't work the second time
            if (isNotAuthError(e) || attemptNumber >= 1) {
                throw GrpcError.fromObject(e);
            }
            await this.authCache?.refresh();
            return this._publish(req, attemptNumber + 1);
        }
    }
    // Raw method for subscribing
    _subscribe(req, cb, onConnectionLost) {
        const abortController = new AbortController();
        const doSubscribe = async () => {
            while (true) {
                const startTime = new Date().getTime();
                try {
                    await MessageApi.Subscribe(req, cb, {
                        pathPrefix: this.pathPrefix,
                        signal: abortController.signal,
                        mode: 'cors',
                        headers: this.headers(),
                    });
                    if (abortController.signal.aborted) {
                        return;
                    }
                    console.info('Stream connection closed. Resubscribing');
                    if (new Date().getTime() - startTime < 1000) {
                        await sleep(1000);
                    }
                    onConnectionLost?.();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }
                catch (err) {
                    if (isAbortError(err) || abortController.signal.aborted) {
                        return;
                    }
                    console.info('Stream connection closed. Resubscribing');
                    if (new Date().getTime() - startTime < 1000) {
                        await sleep(1000);
                    }
                    onConnectionLost?.();
                }
            }
        };
        doSubscribe();
        return {
            unsubscribe: async () => {
                abortController?.abort();
            },
        };
    }
    // Use the Query API to return the full contents of any specified topics
    async query(params, { direction = SortDirection.SORT_DIRECTION_ASCENDING, limit, }) {
        const out = [];
        // Use queryIteratePages for better performance. 1/100th the number of Promises to resolve compared to queryStream
        for await (const page of this.queryIteratePages(params, {
            direction,
            // If there is a limit of < 100, use that as the page size. Otherwise use 100 and stop if/when limit reached.
            pageSize: limit && limit < 100 ? limit : 100,
        })) {
            for (const envelope of page) {
                out.push(envelope);
                if (limit && out.length === limit) {
                    return out;
                }
            }
        }
        return out;
    }
    // Will produce an AsyncGenerator of Envelopes
    // Uses queryStreamPages under the hood
    async *queryIterator(params, options) {
        for await (const page of this.queryIteratePages(params, options)) {
            for (const envelope of page) {
                yield envelope;
            }
        }
    }
    // Creates an async generator that will paginate through the Query API until it reaches the end
    // Will yield each page of results as needed
    async *queryIteratePages({ contentTopic, startTime, endTime }, { direction, pageSize = 10 }) {
        if (!contentTopic || !contentTopic.length) {
            throw new Error('Must specify content topics');
        }
        const startTimeNs = toNanoString(startTime);
        const endTimeNs = toNanoString(endTime);
        let cursor;
        while (true) {
            const pagingInfo = {
                limit: pageSize,
                direction,
                cursor,
            };
            const result = await this._query({
                contentTopics: [contentTopic],
                startTimeNs,
                endTimeNs,
                pagingInfo,
            });
            if (result.envelopes?.length) {
                yield result.envelopes.map(normalizeEnvelope);
            }
            else {
                return;
            }
            if (result.pagingInfo?.cursor) {
                cursor = result.pagingInfo?.cursor;
            }
            else {
                return;
            }
        }
    }
    // Take a list of queries and execute them in batches
    async batchQuery(queries) {
        // Group queries into batches of 50 (implicit server-side limit) and then perform BatchQueries
        const BATCH_SIZE = 50;
        // Keep a list of BatchQueryRequests to execute all at once later
        const batchRequests = [];
        // Assemble batches
        for (let i = 0; i < queries.length; i += BATCH_SIZE) {
            const queriesInBatch = queries.slice(i, i + BATCH_SIZE);
            // Perform batch query by first compiling a list of repeated individual QueryRequests
            // then populating a BatchQueryRequest with that list
            const constructedQueries = [];
            for (const queryParams of queriesInBatch) {
                constructedQueries.push({
                    contentTopics: [queryParams.contentTopic],
                    startTimeNs: toNanoString(queryParams.startTime),
                    endTimeNs: toNanoString(queryParams.endTime),
                    pagingInfo: {
                        limit: queryParams.pageSize || 10,
                        direction: queryParams.direction || SortDirection.SORT_DIRECTION_ASCENDING,
                    },
                });
            }
            const batchQueryRequest = {
                requests: constructedQueries,
            };
            batchRequests.push(batchQueryRequest);
        }
        // Execute batches
        const batchQueryResponses = await Promise.all(batchRequests.map(async (batch) => this._batchQuery(batch)));
        // For every batch, read all responses within the batch, and add to a list of lists of envelopes
        // one top-level list for every original query
        const allEnvelopes = [];
        for (const batchResponse of batchQueryResponses) {
            if (!batchResponse.responses) {
                // An error on any of the batch query is propagated to the caller
                // for simplicity, rather than trying to return partial results
                throw new Error('BatchQueryResponse missing responses');
            }
            for (const queryResponse of batchResponse.responses) {
                if (queryResponse.envelopes) {
                    allEnvelopes.push(queryResponse.envelopes.map(normalizeEnvelope));
                }
                else {
                    // If no envelopes provided, then add an empty list
                    allEnvelopes.push([]);
                }
            }
        }
        return allEnvelopes;
    }
    // Publish a message to the network
    // Will convert timestamps to the appropriate format expected by the network
    async publish(messages) {
        const toSend = [];
        for (const { contentTopic, message, timestamp } of messages) {
            if (!contentTopic.length) {
                throw new Error('Content topic cannot be empty string');
            }
            if (!message.length) {
                throw new Error('0 length messages not allowed');
            }
            const dt = timestamp || new Date();
            toSend.push({
                contentTopic,
                timestampNs: toNanoString(dt),
                message: Uint8Array.from(message),
            });
        }
        return this._publish({ envelopes: toSend });
    }
    // Subscribe to a list of topics.
    // Provided callback function will be called on each new message
    // Returns an unsubscribe function that can be used to end the subscription
    subscribe(params, callback, onConnectionLost) {
        if (!params.contentTopics.length) {
            throw new Error('Must provide list of contentTopics to subscribe to');
        }
        return this._subscribe(params, (env) => callback(normalizeEnvelope(env)), onConnectionLost);
    }
    getToken() {
        if (!this.authCache) {
            throw new Error('AuthCache is not set on API Client');
        }
        return this.authCache.getToken();
    }
    setAuthenticator(authenticator, cacheExpirySeconds) {
        this.authCache = new AuthCache(authenticator, cacheExpirySeconds);
    }
    headers() {
        const headers = new Headers();
        headers.set(clientVersionHeaderKey, this.version);
        if (this.appVersion) {
            headers.set(appVersionHeaderKey, this.appVersion);
        }
        return headers;
    }
}

const CLOCK_SKEW_OFFSET_MS = 10000;
class JobRunner {
    constructor(jobType, keystore) {
        this.disableOffset = false;
        this.jobType = jobType;
        this.mutex = new asyncMutex.Mutex();
        this.keystore = keystore;
    }
    get protoJobType() {
        return getProtoJobType(this.jobType);
    }
    async run(callback) {
        return this.mutex.runExclusive(async () => {
            const lastRun = await this.getLastRunTime();
            const startTime = new Date();
            const result = await callback(lastRun
                ? !this.disableOffset
                    ? new Date(lastRun.getTime() - CLOCK_SKEW_OFFSET_MS)
                    : lastRun
                : undefined);
            await this.setLastRunTime(startTime);
            return result;
        });
    }
    async resetLastRunTime() {
        await this.keystore.setRefreshJob({
            jobType: this.protoJobType,
            lastRunNs: dateToNs(new Date(0)),
        });
    }
    async getLastRunTime() {
        const { lastRunNs } = await this.keystore.getRefreshJob(proto.keystore.GetRefreshJobRequest.fromPartial({
            jobType: this.protoJobType,
        }));
        if (lastRunNs.equals(Long.fromNumber(0))) {
            return undefined;
        }
        return nsToDate(lastRunNs);
    }
    async setLastRunTime(lastRun) {
        await this.keystore.setRefreshJob({
            jobType: this.protoJobType,
            lastRunNs: dateToNs(lastRun),
        });
    }
}
function getProtoJobType(jobType) {
    const protoJobType = {
        v1: proto.keystore.JobType.JOB_TYPE_REFRESH_V1,
        v2: proto.keystore.JobType.JOB_TYPE_REFRESH_V2,
        'user-preferences': proto.keystore.JobType.JOB_TYPE_REFRESH_PPPP,
    }[jobType];
    if (!protoJobType) {
        throw new Error(`unknown job type: ${jobType}`);
    }
    return protoJobType;
}

const messageHasHeaders = (msg) => {
    return Boolean(msg.recipientAddress && msg.senderAddress);
};
/**
 * Conversations allows you to view ongoing 1:1 messaging sessions with another wallet
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Conversations {
    constructor(client) {
        this.client = client;
        this.v1JobRunner = new JobRunner('v1', client.keystore);
        this.v2JobRunner = new JobRunner('v2', client.keystore);
    }
    /**
     * List all conversations with the current wallet found in the network.
     */
    async list() {
        const [v1Convos, v2Convos] = await Promise.all([
            this.listV1Conversations(),
            this.listV2Conversations(),
        ]);
        const conversations = v1Convos.concat(v2Convos);
        conversations.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return conversations;
    }
    /**
     * List all conversations stored in the client cache, which may not include
     * conversations on the network.
     */
    async listFromCache() {
        const [v1Convos, v2Convos] = await Promise.all([
            this.getV1ConversationsFromKeystore(),
            this.getV2ConversationsFromKeystore(),
        ]);
        const conversations = v1Convos.concat(v2Convos);
        conversations.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return conversations;
    }
    async listV1Conversations() {
        return this.v1JobRunner.run(async (latestSeen) => {
            const seenPeers = await this.getIntroductionPeers({
                startTime: latestSeen,
                direction: SortDirection.SORT_DIRECTION_ASCENDING,
            });
            await this.client.keystore.saveV1Conversations({
                conversations: Array.from(seenPeers)
                    .map(([peerAddress, createdAt]) => ({
                    peerAddress,
                    createdNs: dateToNs(createdAt),
                    topic: buildDirectMessageTopic(peerAddress, this.client.address),
                    context: undefined,
                }))
                    .filter((c) => isValidTopic(c.topic)),
            });
            return (await this.client.keystore.getV1Conversations()).conversations.map(this.conversationReferenceToV1.bind(this));
        });
    }
    /**
     * List all V2 conversations
     */
    async listV2Conversations() {
        return this.v2JobRunner.run(async (lastRun) => {
            // Get all conversations already in the KeyStore
            const existing = await this.getV2ConversationsFromKeystore();
            // Load all conversations started after the newest conversation found
            const newConversations = await this.updateV2Conversations(lastRun);
            // Create a Set of all the existing topics to ensure no duplicates are added
            const existingTopics = new Set(existing.map((c) => c.topic));
            // Add all new conversations to the existing list
            for (const convo of newConversations) {
                if (!existingTopics.has(convo.topic)) {
                    existing.push(convo);
                    existingTopics.add(convo.topic);
                }
            }
            // Sort the result set by creation time in ascending order
            existing.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            return existing;
        });
    }
    async getV2ConversationsFromKeystore() {
        return (await this.client.keystore.getV2Conversations()).conversations.map(this.conversationReferenceToV2.bind(this));
    }
    async getV1ConversationsFromKeystore() {
        return (await this.client.keystore.getV1Conversations()).conversations.map(this.conversationReferenceToV1.bind(this));
    }
    // Called in listV2Conversations and in newConversation
    async updateV2Conversations(startTime) {
        const envelopes = await this.client.listInvitations({
            startTime,
            direction: SortDirection.SORT_DIRECTION_ASCENDING,
        });
        return this.decodeInvites(envelopes);
    }
    async decodeInvites(envelopes, shouldThrow = false) {
        const { responses } = await this.client.keystore.saveInvites({
            requests: envelopes
                .map((env) => ({
                payload: env.message,
                timestampNs: Long.fromString(env.timestampNs),
                contentTopic: env.contentTopic,
            }))
                .filter((req) => isValidTopic(req.contentTopic)),
        });
        const out = [];
        for (const response of responses) {
            try {
                out.push(this.saveInviteResponseToConversation(response));
            }
            catch (e) {
                console.warn('Error saving invite response to conversation: ', e);
                if (shouldThrow) {
                    throw e;
                }
            }
        }
        return out;
    }
    saveInviteResponseToConversation({ result, error, }) {
        if (error || !result || !result.conversation) {
            throw new Error(`Error from keystore: ${error?.code} ${error?.message}}`);
        }
        return this.conversationReferenceToV2(result.conversation);
    }
    conversationReferenceToV2(convoRef) {
        return new ConversationV2(this.client, convoRef.topic, convoRef.peerAddress, nsToDate(convoRef.createdNs), convoRef.context);
    }
    conversationReferenceToV1(convoRef) {
        return new ConversationV1(this.client, convoRef.peerAddress, nsToDate(convoRef.createdNs));
    }
    /**
     * Returns a stream of any newly created conversations.
     * Will dedupe to not return the same conversation twice in the same stream.
     * Does not dedupe any other previously seen conversations
     */
    async stream(onConnectionLost) {
        const seenPeers = new Set();
        const introTopic = buildUserIntroTopic(this.client.address);
        const inviteTopic = buildUserInviteTopic(this.client.address);
        const newPeer = (peerAddress) => {
            // Check if we have seen the peer already in this stream
            if (seenPeers.has(peerAddress)) {
                return false;
            }
            seenPeers.add(peerAddress);
            return true;
        };
        const decodeConversation = async (env) => {
            if (env.contentTopic === introTopic) {
                if (!env.message) {
                    throw new Error('empty envelope');
                }
                const msg = await MessageV1.fromBytes(env.message);
                const peerAddress = this.getPeerAddress(msg);
                if (!newPeer(peerAddress)) {
                    return undefined;
                }
                await msg.decrypt(this.client.keystore, this.client.publicKeyBundle);
                return new ConversationV1(this.client, peerAddress, msg.sent);
            }
            if (env.contentTopic === inviteTopic) {
                const results = await this.decodeInvites([env], true);
                if (results.length) {
                    return results[0];
                }
            }
            throw new Error('unrecognized invite topic');
        };
        const topics = [introTopic, inviteTopic];
        return Stream.create(this.client, topics, decodeConversation.bind(this), undefined, onConnectionLost);
    }
    /**
     * Streams messages from all conversations.
     *
     * When a new conversation is initiated with the client's address, this function will automatically register it and add it to the list of conversations to watch.
     * Callers should be aware the first messages in a newly created conversation are picked up on a best effort basis and there are other potential race conditions which may cause some newly created conversations to be missed.
     *
     */
    async streamAllMessages(onConnectionLost) {
        const introTopic = buildUserIntroTopic(this.client.address);
        const inviteTopic = buildUserInviteTopic(this.client.address);
        const topics = new Set([introTopic, inviteTopic]);
        const convoMap = new Map();
        for (const conversation of await this.list()) {
            topics.add(conversation.topic);
            convoMap.set(conversation.topic, conversation);
        }
        const decodeMessage = async (env) => {
            const contentTopic = env.contentTopic;
            if (!contentTopic || !env.message) {
                return null;
            }
            if (contentTopic === introTopic) {
                const msg = await MessageV1.fromBytes(env.message);
                if (!messageHasHeaders(msg)) {
                    return null;
                }
                const peerAddress = this.getPeerAddress(msg);
                // Temporarily create a convo to decrypt the message
                const convo = new ConversationV1(this.client, peerAddress, msg.sent);
                // TODO: This duplicates the proto deserialization unnecessarily
                // Refactor to avoid duplicate work
                return convo.decodeMessage(env);
            }
            // Decode as an invite and return the envelope
            // This gives the contentTopicUpdater everything it needs to add to the topic list
            if (contentTopic === inviteTopic) {
                const results = await this.decodeInvites([env], true);
                return results[0];
            }
            const convo = convoMap.get(contentTopic);
            // Decode as a V1 message if the topic matches a V1 convo
            if (convo instanceof ConversationV1) {
                return convo.decodeMessage(env);
            }
            // Decode as a V2 message if the topic matches a V2 convo
            if (convo instanceof ConversationV2) {
                return convo.decodeMessage(env);
            }
            console.log('Unknown topic');
            throw new Error('Unknown topic');
        };
        const addConvo = (topic, conversation) => {
            if (topics.has(topic)) {
                return false;
            }
            convoMap.set(topic, conversation);
            topics.add(topic);
            return true;
        };
        const contentTopicUpdater = (msg) => {
            // If we have a V1 message from the introTopic, store the conversation in our mapping
            if (msg instanceof DecodedMessage && msg.contentTopic === introTopic) {
                const convo = new ConversationV1(this.client, msg.recipientAddress?.toLowerCase() ===
                    this.client.address.toLowerCase()
                    ? msg.senderAddress
                    : msg.recipientAddress, msg.sent);
                const isNew = addConvo(convo.topic, convo);
                return isNew ? Array.from(topics.values()) : undefined;
            }
            if (msg instanceof ConversationV2) {
                const isNew = addConvo(msg.topic, msg);
                return isNew ? Array.from(topics.values()) : undefined;
            }
            return undefined;
        };
        const str = await Stream.create(this.client, Array.from(topics.values()), decodeMessage, contentTopicUpdater, onConnectionLost);
        const gen = (async function* generate() {
            for await (const val of str) {
                if (val instanceof DecodedMessage) {
                    yield val;
                }
                // For conversation V2, we may have messages in the new topic before we started streaming.
                // To be safe, we fetch all messages
                if (val instanceof ConversationV2) {
                    for (const convoMessage of await val.messages()) {
                        yield convoMessage;
                    }
                }
            }
        })();
        // Overwrite the generator's return method to close the underlying stream
        // Generators by default need to wait until the next yield to return.
        // In this case, that's only when the next message arrives...which could be a long time
        gen.return = async () => {
            // Returning the stream will cause the iteration to end inside the generator
            // The generator will then return on its own
            await str?.return();
            return { value: undefined, done: true };
        };
        return gen;
    }
    async getIntroductionPeers(opts) {
        const topic = buildUserIntroTopic(this.client.address);
        const messages = await this.client.listEnvelopes(topic, (env) => {
            if (!env.message) {
                throw new Error('empty envelope');
            }
            return MessageV1.fromBytes(env.message);
        }, opts);
        const seenPeers = new Map();
        for (const message of messages) {
            // Ignore all messages without sender or recipient address headers
            // Makes getPeerAddress safe
            if (!messageHasHeaders(message)) {
                continue;
            }
            const peerAddress = this.getPeerAddress(message);
            if (peerAddress) {
                const have = seenPeers.get(peerAddress);
                if (!have || have > message.sent) {
                    try {
                        // Verify that the message can be decrypted before treating the intro as valid
                        await message.decrypt(this.client.keystore, this.client.publicKeyBundle);
                        seenPeers.set(peerAddress, message.sent);
                    }
                    catch (e) {
                        continue;
                    }
                }
            }
        }
        return seenPeers;
    }
    /**
     * Creates a new conversation for the given address. Will throw an error if the peer is not found in the BRIXBIT network
     */
    async newConversation(peerAddress, context) {
        let contact = await this.client.getUserContact(peerAddress);
        if (!contact) {
            throw new Error(`Recipient ${peerAddress} is not on the BRIXBIT network`);
        }
        if (peerAddress.toLowerCase() === this.client.address.toLowerCase()) {
            throw new Error('self messaging not supported');
        }
        // If this is a V1 conversation continuation
        if (contact instanceof PublicKeyBundle && !context?.conversationId) {
            return new ConversationV1(this.client, peerAddress, new Date());
        }
        // If no conversationId, check and see if we have an existing V1 conversation
        if (!context?.conversationId) {
            const v1Convos = await this.listV1Conversations();
            const matchingConvo = v1Convos.find((convo) => convo.peerAddress.toLowerCase() === peerAddress.toLowerCase());
            // If intro already exists, return V1 conversation
            // if both peers have V1 compatible key bundles
            if (matchingConvo) {
                if (!this.client.signedPublicKeyBundle.isFromLegacyBundle()) {
                    throw new Error('cannot resume pre-existing V1 conversation; client keys not compatible');
                }
                if (!(contact instanceof PublicKeyBundle) &&
                    !contact.isFromLegacyBundle()) {
                    throw new Error('cannot resume pre-existing V1 conversation; peer keys not compatible');
                }
                return matchingConvo;
            }
        }
        // Coerce the contact into a V2 bundle
        if (contact instanceof PublicKeyBundle) {
            contact = SignedPublicKeyBundle.fromLegacyBundle(contact);
        }
        // Define a function for matching V2 conversations
        const matcherFn = (convo) => convo.peerAddress.toLowerCase() === peerAddress.toLowerCase() &&
            isMatchingContext(context, convo.context ?? undefined);
        const existing = await this.getV2ConversationsFromKeystore();
        const existingMatch = existing.find(matcherFn);
        if (existingMatch) {
            return existingMatch;
        }
        return this.v2JobRunner.run(async (lastRun) => {
            const newItems = await this.updateV2Conversations(lastRun);
            const newItemMatch = newItems.find(matcherFn);
            // If one of those matches, return it to update the cache
            if (newItemMatch) {
                return newItemMatch;
            }
            return this.createV2Convo(contact, context);
        });
    }
    async createV2Convo(recipient, context) {
        const timestamp = new Date();
        const { payload, conversation } = await this.client.keystore.createInvite({
            recipient,
            context,
            createdNs: dateToNs(timestamp),
        });
        if (!payload || !conversation) {
            throw new Error('Required field not returned from Keystore');
        }
        const peerAddress = await recipient.walletSignatureAddress();
        await this.client.publishEnvelopes([
            {
                contentTopic: buildUserInviteTopic(peerAddress),
                message: payload,
                timestamp,
            },
            {
                contentTopic: buildUserInviteTopic(this.client.address),
                message: payload,
                timestamp,
            },
        ]);
        // add peer address to allow list
        await this.client.contacts.allow([peerAddress]);
        return this.conversationReferenceToV2(conversation);
    }
    getPeerAddress(message) {
        const peerAddress = message.recipientAddress?.toLowerCase() ===
            this.client.address.toLowerCase()
            ? message.senderAddress
            : message.recipientAddress;
        // This assertion is safe, so long as messages have been through the filter
        return peerAddress;
    }
}
function isMatchingContext(contextA, contextB) {
    // Use == to allow null and undefined to be equivalent
    return contextA?.conversationId === contextB?.conversationId;
}

// This import has to come first so that the polyfills are registered before the stream polyfills
//
// Compression
//
async function decompress(encoded, maxSize) {
    if (encoded.compression === undefined) {
        return;
    }
    const sink = { bytes: new Uint8Array(encoded.content.length) };
    await readStreamFromBytes(encoded.content)
        .pipeThrough(new DecompressionStream(compressionIdFromCode(encoded.compression)))
        .pipeTo(writeStreamToBytes(sink, maxSize));
    encoded.content = sink.bytes;
}
async function compress(encoded) {
    if (encoded.compression === undefined) {
        return;
    }
    const sink = { bytes: new Uint8Array(encoded.content.length / 10) };
    await readStreamFromBytes(encoded.content)
        .pipeThrough(new CompressionStream(compressionIdFromCode(encoded.compression)))
        .pipeTo(writeStreamToBytes(sink, encoded.content.length + 1000));
    encoded.content = sink.bytes;
}
function compressionIdFromCode(code) {
    if (code === proto.content.Compression.COMPRESSION_GZIP) {
        return 'gzip';
    }
    if (code === proto.content.Compression.COMPRESSION_DEFLATE) {
        return 'deflate';
    }
    throw new Error('unrecognized compression algorithm');
}
function readStreamFromBytes(bytes, chunkSize = 1024) {
    let position = 0;
    return new ReadableStream({
        pull(controller) {
            if (position >= bytes.length) {
                return controller.close();
            }
            let end = position + chunkSize;
            end = end <= bytes.length ? end : bytes.length;
            controller.enqueue(bytes.subarray(position, end));
            position = end;
        },
    });
}
function writeStreamToBytes(sink, maxSize) {
    let position = 0;
    return new WritableStream({
        write(chunk) {
            const end = position + chunk.length;
            if (end > maxSize) {
                throw new Error('maximum output size exceeded');
            }
            while (sink.bytes.length < end) {
                sink.bytes = growBytes(sink.bytes, maxSize);
            }
            sink.bytes.set(chunk, position);
            position = end;
        },
        close() {
            if (position < sink.bytes.length) {
                sink.bytes = sink.bytes.subarray(0, position);
            }
        },
    });
}
function growBytes(bytes, maxSize) {
    let newSize = bytes.length * 2;
    if (newSize > maxSize) {
        newSize = maxSize;
    }
    const bigger = new Uint8Array(newSize);
    bigger.set(bytes);
    return bigger;
}

// Decodes contact bundles from the contact topic.
function decodeContactBundle(bytes) {
    let cb;
    try {
        cb = proto.contact.ContactBundle.decode(bytes);
    }
    catch (e) {
        const pb = proto.publicKey.PublicKeyBundle.decode(bytes);
        cb = { v1: { keyBundle: new PublicKeyBundle(pb) }, v2: undefined };
    }
    if (cb.v1?.keyBundle) {
        return new PublicKeyBundle(cb.v1.keyBundle);
    }
    if (cb.v2?.keyBundle) {
        return new SignedPublicKeyBundle(cb.v2.keyBundle);
    }
    throw new Error('unknown or invalid contact bundle');
}
// Encodes public key bundle for the contact topic.
function encodeContactBundle(bundle) {
    if (bundle instanceof PublicKeyBundle) {
        return proto.contact.ContactBundle.encode({
            v1: { keyBundle: bundle },
            v2: undefined,
        }).finish();
    }
    else {
        return proto.contact.ContactBundle.encode({
            v1: undefined,
            v2: { keyBundle: bundle },
        }).finish();
    }
}

class AuthData {
    constructor({ walletAddr, createdNs }) {
        this.walletAddr = walletAddr;
        this.createdNs = createdNs;
    }
    static create(walletAddr, timestamp) {
        timestamp = timestamp || new Date();
        return new AuthData({
            walletAddr,
            createdNs: dateToNs(timestamp),
        });
    }
    static fromBytes(bytes) {
        const res = proto.authn.AuthData.decode(bytes);
        return new AuthData(res);
    }
    toBytes() {
        return proto.authn.AuthData.encode(this).finish();
    }
}

class Token {
    constructor({ identityKey, authDataBytes, authDataSignature }) {
        if (!identityKey) {
            throw new Error('Missing identity key in token');
        }
        if (!authDataSignature) {
            throw new Error('Missing authDataSignature in token');
        }
        this.identityKey = identityKey;
        this.authDataBytes = authDataBytes;
        this.authDataSignature = authDataSignature;
    }
    // Get AuthData, generating from bytes and cacheing the first time it is accessed
    get authData() {
        if (!this._authData) {
            this._authData = AuthData.fromBytes(this.authDataBytes);
        }
        return this._authData;
    }
    get ageMs() {
        const now = new Date().valueOf();
        const authData = this.authData;
        const createdAt = authData.createdNs.div(1000000).toNumber();
        return now - createdAt;
    }
    toBytes() {
        return proto.authn.Token.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new Token(proto.authn.Token.decode(bytes));
    }
    toBase64() {
        return Buffer.from(this.toBytes()).toString('base64');
    }
}

class LocalAuthenticator {
    constructor(identityKey) {
        if (!identityKey.publicKey.signature) {
            throw new Error('Provided public key is not signed');
        }
        this.identityKey = identityKey;
    }
    async createToken(timestamp) {
        const authData = AuthData.create(this.identityKey.publicKey.walletSignatureAddress(), timestamp || new Date());
        const authDataBytes = authData.toBytes();
        const digest = viem.keccak256(authDataBytes);
        const authSig = await this.identityKey.sign(viem.hexToBytes(digest));
        return new Token(proto.authn.Token.fromPartial({
            identityKey: proto.publicKey.PublicKey.fromPartial(
            // The generated types are overly strict and don't like our additional methods
            // eslint-disable-next-line
            // @ts-ignore
            this.identityKey.publicKey),
            authDataBytes,
            // The generated types are overly strict and don't like our additional methods
            // eslint-disable-next-line
            // @ts-ignore
            authDataSignature: proto.signature.Signature.fromPartial(authSig),
        }));
    }
}

const wrapToken = (token) => {
    if (token instanceof Token) {
        return token;
    }
    return new Token(token);
};
class KeystoreAuthenticator {
    constructor(keystore) {
        this.keystore = keystore;
    }
    async createToken(timestamp) {
        const token = await this.keystore.createAuthToken({
            timestampNs: timestamp ? dateToNs(timestamp) : undefined,
        });
        return wrapToken(token);
    }
}

/**
 * Where message backups should be stored
 */
var BackupType;
(function (BackupType) {
    BackupType[BackupType["none"] = 0] = "none";
    BackupType[BackupType["brixbitTopicStore"] = 1] = "brixbitTopicStore";
})(BackupType || (BackupType = {}));

const BACKUP_TYPE$1 = BackupType.none;
class NoBackupClient {
    static createConfiguration() {
        return {
            type: BACKUP_TYPE$1,
            version: 0,
        };
    }
    constructor(configuration) {
        this.configuration = configuration;
    }
    get backupType() {
        return BACKUP_TYPE$1;
    }
}

const BACKUP_TYPE = BackupType.brixbitTopicStore;
class TopicStoreBackupClient {
    static createConfiguration(walletAddress) {
        // TODO: randomly generate topic and encryption key
        return {
            type: BACKUP_TYPE,
            version: 0,
            topic: 'history-v0:' + walletAddress,
        };
    }
    constructor(configuration) {
        this.configuration = configuration;
    }
    get backupType() {
        return BACKUP_TYPE;
    }
}

/**
 * Creates a backup client of the correct provider type (e.g. brixbit backup, no backup, etc).
 * Uses an existing user preference from the backend if it exists, else prompts for a new
 * one using the `providerSelector`
 * @param walletAddress The public address of the user's wallet
 * @param selectBackupProvider A callback for determining the provider to use, in the event there is no
 * existing user preference. The app can define the policy to use here (e.g. prompt the user,
 * or default to a certain provider type).
 * @returns {Promise<BackupClient>} A backup client of the correct type
 */
async function createBackupClient(walletAddress, selectBackupProvider) {
    const configuration = await fetchOrCreateConfiguration(walletAddress, selectBackupProvider);
    switch (configuration.type) {
        case BackupType.none:
            return new NoBackupClient(configuration);
        case BackupType.brixbitTopicStore:
            return new TopicStoreBackupClient(configuration);
    }
}
async function fetchOrCreateConfiguration(walletAddress, selectBackupProvider) {
    // TODO: return existing configuration from the backend if it exists
    let backupConfiguration;
    const provider = await selectBackupProvider();
    switch (provider.type) {
        case BackupType.none:
            backupConfiguration = NoBackupClient.createConfiguration();
            break;
        case BackupType.brixbitTopicStore:
            backupConfiguration =
                TopicStoreBackupClient.createConfiguration(walletAddress);
            break;
    }
    // TODO: Persist new configuration to backend
    return backupConfiguration;
}

class KeystoreProviderUnavailableError extends Error {
}

/**
 * InvitationV1 is a protobuf message to be encrypted and used as the ciphertext in a SealedInvitationV1 message
 */
class InvitationV1 {
    constructor({ topic, context, aes256GcmHkdfSha256, }) {
        if (!topic || !topic.length) {
            throw new Error('Missing topic');
        }
        if (!aes256GcmHkdfSha256 ||
            !aes256GcmHkdfSha256.keyMaterial ||
            !aes256GcmHkdfSha256.keyMaterial.length) {
            throw new Error('Missing key material');
        }
        this.topic = topic;
        this.context = context;
        this.aes256GcmHkdfSha256 = aes256GcmHkdfSha256;
    }
    static createRandom(context) {
        const topic = buildDirectMessageTopicV2(Buffer.from(crypto.getRandomValues(new Uint8Array(32)))
            .toString('base64')
            .replace(/=*$/g, '')
            // Replace slashes with dashes so that the topic is still easily split by /
            // We do not treat this as needing to be valid Base64 anywhere
            .replace(/\//g, '-'));
        const keyMaterial = crypto.getRandomValues(new Uint8Array(32));
        return new InvitationV1({
            topic,
            aes256GcmHkdfSha256: { keyMaterial },
            context,
        });
    }
    toBytes() {
        return proto.invitation.InvitationV1.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new InvitationV1(proto.invitation.InvitationV1.decode(bytes));
    }
}
/**
 * SealedInvitationHeaderV1 is a protobuf message to be used as the headerBytes in a SealedInvitationV1
 */
class SealedInvitationHeaderV1 {
    constructor({ sender, recipient, createdNs, }) {
        if (!sender) {
            throw new Error('Missing sender');
        }
        if (!recipient) {
            throw new Error('Missing recipient');
        }
        this.sender = new SignedPublicKeyBundle(sender);
        this.recipient = new SignedPublicKeyBundle(recipient);
        this.createdNs = createdNs;
    }
    toBytes() {
        return proto.invitation.SealedInvitationHeaderV1.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new SealedInvitationHeaderV1(proto.invitation.SealedInvitationHeaderV1.decode(bytes));
    }
}
class SealedInvitationV1 {
    constructor({ headerBytes, ciphertext }) {
        if (!headerBytes || !headerBytes.length) {
            throw new Error('Missing header bytes');
        }
        if (!ciphertext) {
            throw new Error('Missing ciphertext');
        }
        this.headerBytes = headerBytes;
        this.ciphertext = new Ciphertext(ciphertext);
    }
    /**
     * Accessor method for the full header object
     */
    get header() {
        // Use cached value if already exists
        if (this._header) {
            return this._header;
        }
        this._header = SealedInvitationHeaderV1.fromBytes(this.headerBytes);
        return this._header;
    }
    /**
     * getInvitation decrypts and returns the InvitationV1 stored in the ciphertext of the Sealed Invitation
     */
    async getInvitation(viewer) {
        // Use cached value if already exists
        if (this._invitation) {
            return this._invitation;
        }
        // The constructors for child classes will validate that this is complete
        const header = this.header;
        let secret;
        if (viewer.identityKey.matches(this.header.sender.identityKey)) {
            secret = await viewer.sharedSecret(header.recipient, header.sender.preKey, false);
        }
        else {
            secret = await viewer.sharedSecret(header.sender, header.recipient.preKey, true);
        }
        const decryptedBytes = await decrypt$1(this.ciphertext, secret, this.headerBytes);
        this._invitation = InvitationV1.fromBytes(decryptedBytes);
        return this._invitation;
    }
    toBytes() {
        return proto.invitation.SealedInvitationV1.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new SealedInvitationV1(proto.invitation.SealedInvitationV1.decode(bytes));
    }
}
/**
 * Wrapper class for SealedInvitationV1 and any future iterations of SealedInvitation
 */
class SealedInvitation {
    constructor({ v1 }) {
        if (v1) {
            this.v1 = new SealedInvitationV1(v1);
        }
        else {
            throw new Error('Missing v1 or v2 invitation');
        }
    }
    toBytes() {
        return proto.invitation.SealedInvitation.encode(this).finish();
    }
    static fromBytes(bytes) {
        return new SealedInvitation(proto.invitation.SealedInvitation.decode(bytes));
    }
    static async fromEnvelope(env) {
        if (!env.message || !env.timestampNs) {
            throw new Error('invalid invitation envelope');
        }
        const sealed = SealedInvitation.fromBytes(env.message);
        const envelopeTime = Long.fromString(env.timestampNs);
        const headerTime = sealed.v1?.header.createdNs;
        if (!headerTime || !headerTime.equals(envelopeTime)) {
            throw new Error('envelope and header timestamp mistmatch');
        }
        return sealed;
    }
    /**
     * Create a SealedInvitation with a SealedInvitationV1 payload
     * Will encrypt all contents and validate inputs
     */
    static async createV1({ sender, recipient, created, invitation, }) {
        const headerBytes = new SealedInvitationHeaderV1({
            sender: sender.getPublicKeyBundle(),
            recipient,
            createdNs: dateToNs(created),
        }).toBytes();
        const secret = await sender.sharedSecret(recipient, sender.getCurrentPreKey().publicKey, false);
        const invitationBytes = invitation.toBytes();
        const ciphertext = await encrypt$1(invitationBytes, secret, headerBytes);
        return new SealedInvitation({
            v1: { headerBytes, ciphertext },
        });
    }
}

const decryptV1 = async (myKeys, peerKeys, ciphertext, headerBytes, isSender) => {
    const secret = await myKeys.sharedSecret(peerKeys, myKeys.getCurrentPreKey().publicKey, // assumes that the current preKey is what was used to encrypt
    !isSender);
    return decrypt$1(ciphertext, secret, headerBytes);
};
const encryptV1 = async (keys, recipient, message, headerBytes) => {
    const secret = await keys.sharedSecret(recipient, keys.getCurrentPreKey().publicKey, false // assumes that the sender is the party doing the encrypting
    );
    return encrypt$1(message, secret, headerBytes);
};
const decryptV2 = (ciphertext, secret, headerBytes) => decrypt$1(ciphertext, secret, headerBytes);
const encryptV2 = (payload, secret, headerBytes) => encrypt$1(payload, secret, headerBytes);

const convertError = (e, 
// Default error code to apply to errors that don't have one
errorCode) => {
    if (e instanceof KeystoreError) {
        return e;
    }
    return new KeystoreError(errorCode, e.message);
};
const wrapResult = (result) => ({ result });
// Map an array of items to an array of results or errors
// Transform any errors thrown into `KeystoreError`s
const mapAndConvertErrors = (input, mapper, 
// Default error code to apply to errors that don't have one
errorCode) => {
    return Promise.all(input.map(async (item) => {
        try {
            // Be sure to await mapper result to catch errors
            return wrapResult(await mapper(item));
        }
        catch (e) {
            return { error: convertError(e, errorCode) };
        }
    }));
};
// Wrap the bundle in our class if not already wrapped
const toPublicKeyBundle = (bundle) => {
    if (bundle instanceof PublicKeyBundle) {
        return bundle;
    }
    return new PublicKeyBundle(bundle);
};
// Wrap the bundle in our class if not already wrapped
const toSignedPublicKeyBundle = (bundle) => {
    if (bundle instanceof SignedPublicKeyBundle) {
        return bundle;
    }
    return new SignedPublicKeyBundle(bundle);
};
// Takes object and returns true if none of the `objectFields` are null or undefined and none of the `arrayFields` are empty
const validateObject = (obj, objectFields, arrayFields) => {
    for (const field of objectFields) {
        if (!obj[field]) {
            throw new KeystoreError(proto.keystore.ErrorCode.ERROR_CODE_INVALID_INPUT, `Missing field ${String(field)}`);
        }
    }
    for (const field of arrayFields) {
        const val = obj[field];
        // @ts-expect-error does not know it's an array
        if (!val || !val?.length) {
            throw new KeystoreError(proto.keystore.ErrorCode.ERROR_CODE_INVALID_INPUT, `Missing field ${String(field)}`);
        }
    }
    return true;
};
const getKeyMaterial = (invite) => {
    if (!invite?.aes256GcmHkdfSha256?.keyMaterial) {
        throw new KeystoreError(proto.keystore.ErrorCode.ERROR_CODE_INVALID_INPUT, 'Missing key material');
    }
    return invite.aes256GcmHkdfSha256.keyMaterial;
};
const topicDataToV2ConversationReference = ({ invitation, createdNs, peerAddress, }) => ({
    context: invitation.context,
    topic: invitation.topic,
    peerAddress,
    createdNs,
});
const isCompleteTopicData = (obj) => !!obj.invitation;
const topicDataToMap = (topicMap) => {
    const out = new Map();
    for (const [k, v] of Object.entries(topicMap.topics)) {
        out.set(k, v);
    }
    return out;
};
const buildPersistenceKey = (env, walletAddress) => `brixbit/${env}/${walletAddress}/`;

const INVITE_STORAGE_KEY = 'invitations/v1';
const V1_STORAGE_KEY = 'conversation-v1/v1';
/**
 * V2Store holds a simple map of topic -> TopicData and writes to the persistence layer on changes
 */
class V2Store {
    constructor(persistence, persistenceKey, initialData = new Map()) {
        this.persistenceKey = persistenceKey;
        this.persistence = persistence;
        this.revision = 0;
        this.mutex = new asyncMutex.Mutex();
        this.topicMap = initialData;
    }
    get revisionKey() {
        return this.persistenceKey + '/revision';
    }
    static async create(persistence) {
        const persistenceKey = INVITE_STORAGE_KEY;
        const v2Store = new V2Store(persistence, persistenceKey);
        await v2Store.refresh();
        return v2Store;
    }
    validate(topicData) {
        return (!!topicData.topic &&
            topicData.topic.length > 0 &&
            isCompleteTopicData(topicData));
    }
    async refresh() {
        const currentRevision = await this.getRevision();
        if (currentRevision > this.revision) {
            for (const [topic, data] of await this.loadFromPersistence()) {
                this.topicMap.set(topic, data);
            }
        }
        this.revision = currentRevision;
    }
    async getRevision() {
        const data = await this.persistence.getItem(this.revisionKey);
        if (!data) {
            return 0;
        }
        return uint8ArrayToNumber(data);
    }
    async setRevision(number) {
        await this.persistence.setItem(this.revisionKey, numberToUint8Array(number));
    }
    async loadFromPersistence() {
        const rawData = await this.persistence.getItem(this.persistenceKey);
        if (!rawData) {
            return new Map();
        }
        return topicDataToMap(proto.keystore.TopicMap.decode(rawData));
    }
    async store() {
        await this.persistence.setItem(this.persistenceKey, this.toBytes());
        this.revision++;
        await this.setRevision(this.revision);
    }
    async add(topicData) {
        await this.mutex.runExclusive(async () => {
            await this.refresh();
            let isDirty = false;
            for (const row of topicData) {
                if (!this.validate(row)) {
                    console.warn('Invalid topic data', row.topic);
                    continue;
                }
                const { topic, ...data } = row;
                // This will not overwrite any existing values. First invite found in the store for a given topic will always be used
                // Duplicates do not throw errors
                if (!this.topicMap.has(topic)) {
                    this.topicMap.set(topic, data);
                    isDirty = true;
                }
            }
            // Only write to persistence once, and only if we have added new invites
            if (isDirty) {
                await this.store();
            }
        });
    }
    get topics() {
        return [...this.topicMap.values()];
    }
    lookup(topic) {
        return this.topicMap.get(topic);
    }
    toBytes() {
        return proto.keystore.TopicMap.encode({
            topics: Object.fromEntries(this.topicMap),
        }).finish();
    }
}
class V1Store extends V2Store {
    static async create(persistence) {
        const persistenceKey = V1_STORAGE_KEY;
        const v1Store = new V1Store(persistence, persistenceKey);
        await v1Store.refresh();
        return v1Store;
    }
    validate(topicData) {
        return !!(topicData.topic &&
            topicData.topic.length &&
            topicData.peerAddress?.length > 0);
    }
}

// This file is taken from `bitchan/eccrypto` and ported to TS. All references to `nodeCrypto` have been replaced with `browserCrypto`
/**
 * `elliptic` is a CommonJS module and has issues with named imports
 * DO NOT CHANGE THIS TO A NAMED IMPORT
 */
const EC = elliptic.ec;
const ec = new EC('secp256k1');
const subtle = crypto.subtle;
const EC_GROUP_ORDER = Buffer.from('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 'hex');
const ZERO32 = Buffer.alloc(32, 0);
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}
function isScalar(x) {
    return Buffer.isBuffer(x) && x.length === 32;
}
function isValidPrivateKey(privateKey) {
    if (!isScalar(privateKey)) {
        return false;
    }
    return (privateKey.compare(ZERO32) > 0 && // > 0
        privateKey.compare(EC_GROUP_ORDER) < 0); // < G
}
// Compare two buffers in constant time to prevent timing attacks.
function equalConstTime(b1, b2) {
    if (b1.length !== b2.length) {
        return false;
    }
    let res = 0;
    for (let i = 0; i < b1.length; i++) {
        res |= b1[i] ^ b2[i]; // jshint ignore:line
    }
    return res === 0;
}
function randomBytes(size) {
    const arr = new Uint8Array(size);
    crypto.getRandomValues(arr);
    return Buffer.from(arr);
}
async function sha512(msg) {
    const digest = await subtle.digest('SHA-512', msg);
    return Buffer.from(digest);
}
function getAes(op) {
    return function (iv, key, data) {
        return new Promise(function (resolve) {
            const importAlgorithm = { name: 'AES-CBC' };
            const keyp = subtle.importKey('raw', key, importAlgorithm, false, [op]);
            return keyp
                .then(function (cryptoKey) {
                const encAlgorithm = { name: 'AES-CBC', iv };
                return subtle[op](encAlgorithm, cryptoKey, data);
            })
                .then(function (result) {
                resolve(Buffer.from(new Uint8Array(result)));
            });
        });
    };
}
const aesCbcEncrypt = getAes('encrypt');
const aesCbcDecrypt = getAes('decrypt');
async function hmacSha256Sign(key, msg) {
    const newKey = await subtle.importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
    return Buffer.from(await subtle.sign({ name: 'HMAC', hash: 'SHA-256' }, newKey, msg));
}
async function hmacSha256Verify(key, msg, sig) {
    const expectedSig = await hmacSha256Sign(key, msg);
    return equalConstTime(expectedSig, sig);
}
function getPublic(privateKey) {
    // This function has sync API so we throw an error immediately.
    assert(privateKey.length === 32, 'Bad private key');
    assert(isValidPrivateKey(privateKey), 'Bad private key');
    // XXX(Kagami): `elliptic.utils.encode` returns array for every
    // encoding except `hex`.
    return Buffer.from(ec.keyFromPrivate(privateKey).getPublic('array'));
}
function derive(privateKeyA, publicKeyB) {
    return new Promise(function (resolve) {
        assert(Buffer.isBuffer(privateKeyA), 'Bad private key');
        assert(Buffer.isBuffer(publicKeyB), 'Bad public key');
        assert(privateKeyA.length === 32, 'Bad private key');
        assert(isValidPrivateKey(privateKeyA), 'Bad private key');
        assert(publicKeyB.length === 65 || publicKeyB.length === 33, 'Bad public key');
        if (publicKeyB.length === 65) {
            assert(publicKeyB[0] === 4, 'Bad public key');
        }
        if (publicKeyB.length === 33) {
            assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, 'Bad public key');
        }
        const keyA = ec.keyFromPrivate(privateKeyA);
        const keyB = ec.keyFromPublic(publicKeyB);
        const Px = keyA.derive(keyB.getPublic()); // BN instance
        resolve(Buffer.from(Px.toArray()));
    });
}
async function encrypt(publicKeyTo, msg, opts) {
    opts = opts || {};
    // Take IV from opts or generate randomly
    const iv = opts?.iv || randomBytes(16);
    let ephemPrivateKey = opts?.ephemPrivateKey || randomBytes(32);
    // There is a very unlikely possibility that it is not a valid key
    while (!isValidPrivateKey(ephemPrivateKey)) {
        if (opts?.ephemPrivateKey) {
            throw new Error('ephemPrivateKey is not valid');
        }
        ephemPrivateKey = randomBytes(32);
    }
    // Get the public key from the ephemeral private key
    const ephemeralPublicKey = getPublic(ephemPrivateKey);
    const hash = await sha512(await derive(ephemPrivateKey, publicKeyTo));
    const encryptionKey = hash.slice(0, 32);
    const macKey = hash.slice(32);
    const ciphertext = await aesCbcEncrypt(iv, encryptionKey, msg);
    // Get a MAC
    const dataToMac = Buffer.concat([iv, ephemeralPublicKey, ciphertext]);
    const mac = await hmacSha256Sign(macKey, dataToMac);
    // Return the payload
    return {
        iv,
        ephemeralPublicKey,
        ciphertext,
        mac,
    };
}
async function decrypt(privateKey, opts) {
    const px = await derive(privateKey, opts.ephemeralPublicKey);
    const hash = await sha512(px);
    const encryptionKey = hash.slice(0, 32);
    const macKey = hash.slice(32);
    const dataToMac = Buffer.concat([
        opts.iv,
        opts.ephemeralPublicKey,
        opts.ciphertext,
    ]);
    assert(await hmacSha256Verify(macKey, dataToMac, opts.mac), 'Bad mac');
    return aesCbcDecrypt(opts.iv, encryptionKey, opts.ciphertext);
}

async function userPreferencesEncrypt(identityKey, payload) {
    const publicKey = identityKey.publicKey.secp256k1Uncompressed.bytes;
    const privateKey = identityKey.secp256k1.bytes;
    // eslint-disable-next-line camelcase
    return userPreferencesBindingsWasm.user_preferences_encrypt(publicKey, privateKey, payload);
}
async function userPreferencesDecrypt(identityKey, payload) {
    const publicKey = identityKey.publicKey.secp256k1Uncompressed.bytes;
    const privateKey = identityKey.secp256k1.bytes;
    // eslint-disable-next-line camelcase
    return userPreferencesBindingsWasm.user_preferences_decrypt(publicKey, privateKey, payload);
}
async function generateUserPreferencesTopic(identityKey) {
    const privateKey = identityKey.secp256k1.bytes;
    // eslint-disable-next-line camelcase
    return userPreferencesBindingsWasm.generate_private_preferences_topic(privateKey);
}

const { ErrorCode } = proto.keystore;
// Constant, 32 byte salt
// DO NOT CHANGE
const INVITE_SALT = new TextEncoder().encode('__BRIXBIT__INVITATION__SALT__BRIXBIT__');
async function deriveKey(secret, info) {
    const key = await crypto.subtle.importKey('raw', secret, 'HKDF', false, [
        'deriveKey',
    ]);
    return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: INVITE_SALT, info }, key, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}
class InMemoryKeystore {
    constructor(keys, v1Store, v2Store, persistence) {
        this.v1Keys = keys;
        this.v2Keys = PrivateKeyBundleV2.fromLegacyBundle(keys);
        this.v1Store = v1Store;
        this.v2Store = v2Store;
        this.authenticator = new LocalAuthenticator(keys.identityKey);
        this.jobStatePersistence = persistence;
    }
    static async create(keys, persistence) {
        return new InMemoryKeystore(keys, await V1Store.create(persistence), await V2Store.create(persistence), persistence);
    }
    get walletAddress() {
        return this.v1Keys.identityKey.publicKey.walletSignatureAddress();
    }
    async decryptV1(req) {
        const responses = await mapAndConvertErrors(req.requests, async (req) => {
            if (!validateObject(req, ['payload', 'peerKeys'], ['headerBytes'])) ;
            const { payload, peerKeys, headerBytes, isSender } = req;
            const decrypted = await decryptV1(this.v1Keys, toPublicKeyBundle(peerKeys), payload, headerBytes, isSender);
            return {
                decrypted,
            };
        }, proto.keystore.ErrorCode.ERROR_CODE_UNSPECIFIED);
        return proto.keystore.DecryptResponse.fromPartial({
            responses,
        });
    }
    async decryptV2(req) {
        const responses = await mapAndConvertErrors(req.requests, async (req) => {
            if (!validateObject(req, ['payload'], ['headerBytes'])) ;
            const { payload, headerBytes, contentTopic } = req;
            const topicData = this.v2Store.lookup(contentTopic);
            if (!topicData) {
                // This is the wrong error type. Will add to the proto repo later
                throw new KeystoreError(proto.keystore.ErrorCode.ERROR_CODE_NO_MATCHING_PREKEY, 'no topic key');
            }
            const decrypted = await decryptV2(payload, getKeyMaterial(topicData.invitation), headerBytes);
            return { decrypted };
        }, ErrorCode.ERROR_CODE_UNSPECIFIED);
        return proto.keystore.DecryptResponse.fromPartial({
            responses,
        });
    }
    async encryptV1(req) {
        const responses = await mapAndConvertErrors(req.requests, async (req) => {
            if (!validateObject(req, ['payload', 'recipient'], ['headerBytes'])) ;
            const { recipient, payload, headerBytes } = req;
            return {
                encrypted: await encryptV1(this.v1Keys, toPublicKeyBundle(recipient), payload, headerBytes),
            };
        }, ErrorCode.ERROR_CODE_UNSPECIFIED);
        return proto.keystore.EncryptResponse.fromPartial({
            responses,
        });
    }
    async createAuthToken({ timestampNs, }) {
        return this.authenticator.createToken(timestampNs ? nsToDate(timestampNs) : undefined);
    }
    async selfEncrypt(req) {
        const responses = await mapAndConvertErrors(req.requests, async (req) => {
            const { payload } = req;
            if (!payload) {
                throw new KeystoreError(ErrorCode.ERROR_CODE_INVALID_INPUT, 'Missing field payload');
            }
            return {
                encrypted: await userPreferencesEncrypt(this.v1Keys.identityKey, payload),
            };
        }, ErrorCode.ERROR_CODE_INVALID_INPUT);
        return proto.keystore.SelfEncryptResponse.fromPartial({
            responses,
        });
    }
    async selfDecrypt(req) {
        const responses = await mapAndConvertErrors(req.requests, async (req) => {
            const { payload } = req;
            if (!payload) {
                throw new KeystoreError(ErrorCode.ERROR_CODE_INVALID_INPUT, 'Missing field payload');
            }
            return {
                decrypted: await userPreferencesDecrypt(this.v1Keys.identityKey, payload),
            };
        }, ErrorCode.ERROR_CODE_INVALID_INPUT);
        return proto.keystore.DecryptResponse.fromPartial({
            responses,
        });
    }
    async getPrivatePreferencesTopicIdentifier() {
        const identifier = await generateUserPreferencesTopic(this.v1Keys.identityKey);
        return proto.keystore.GetPrivatePreferencesTopicIdentifierResponse.fromPartial({
            identifier,
        });
    }
    async encryptV2(req) {
        const responses = await mapAndConvertErrors(req.requests, async (req) => {
            if (!validateObject(req, ['payload'], ['headerBytes'])) ;
            const { payload, headerBytes, contentTopic } = req;
            const topicData = this.v2Store.lookup(contentTopic);
            if (!topicData) {
                throw new KeystoreError(ErrorCode.ERROR_CODE_NO_MATCHING_PREKEY, 'no topic key');
            }
            return {
                encrypted: await encryptV2(payload, getKeyMaterial(topicData.invitation), headerBytes),
            };
        }, ErrorCode.ERROR_CODE_INVALID_INPUT);
        return proto.keystore.EncryptResponse.fromPartial({
            responses,
        });
    }
    async saveInvites(req) {
        const toAdd = [];
        const responses = await mapAndConvertErrors(req.requests, async ({ payload, timestampNs }) => {
            const sealed = SealedInvitation.fromBytes(payload);
            if (sealed.v1) {
                const headerTime = sealed.v1.header.createdNs;
                if (!headerTime.equals(timestampNs)) {
                    throw new Error('envelope and header timestamp mismatch');
                }
                const isSender = sealed.v1.header.sender.equals(this.v2Keys.getPublicKeyBundle());
                const invitation = await sealed.v1.getInvitation(this.v2Keys);
                const topicData = {
                    invitation,
                    createdNs: sealed.v1.header.createdNs,
                    peerAddress: isSender
                        ? await sealed.v1.header.recipient.walletSignatureAddress()
                        : await sealed.v1.header.sender.walletSignatureAddress(),
                };
                toAdd.push({ ...topicData, topic: invitation.topic });
                return {
                    conversation: topicDataToV2ConversationReference(topicData),
                };
            }
        }, ErrorCode.ERROR_CODE_INVALID_INPUT);
        await this.v2Store.add(toAdd);
        return proto.keystore.SaveInvitesResponse.fromPartial({
            responses,
        });
    }
    async createInvite(req) {
        try {
            if (!validateObject(req, ['recipient'], [])) ;
            const created = nsToDate(req.createdNs);
            const recipient = toSignedPublicKeyBundle(req.recipient);
            const myAddress = await this.getAccountAddress();
            const theirAddress = await recipient.walletSignatureAddress();
            const secret = await this.v2Keys.sharedSecret(recipient, this.v2Keys.getCurrentPreKey().publicKey, myAddress < theirAddress);
            const sortedAddresses = [myAddress, theirAddress].sort();
            const msgString = (req.context?.conversationId || '') + sortedAddresses.join();
            const msgBytes = new TextEncoder().encode(msgString);
            const topic = bytesToHex(await hmacSha256Sign(Buffer.from(secret), Buffer.from(msgBytes)));
            const infoString = [
                '0', // sequence number
                ...sortedAddresses,
            ].join('|');
            const info = new TextEncoder().encode(infoString);
            const derivedKey = await deriveKey(secret, info);
            const keyMaterial = new Uint8Array(await crypto.subtle.exportKey('raw', derivedKey));
            const invitation = new InvitationV1({
                topic: buildDirectMessageTopicV2(topic),
                aes256GcmHkdfSha256: { keyMaterial },
                context: req.context,
            });
            const sealed = await SealedInvitation.createV1({
                sender: this.v2Keys,
                recipient,
                created,
                invitation,
            });
            const topicData = {
                invitation,
                topic: invitation.topic,
                createdNs: req.createdNs,
                peerAddress: await recipient.walletSignatureAddress(),
            };
            await this.v2Store.add([topicData]);
            return proto.keystore.CreateInviteResponse.fromPartial({
                conversation: topicDataToV2ConversationReference(topicData),
                payload: sealed.toBytes(),
            });
        }
        catch (e) {
            throw convertError(e, ErrorCode.ERROR_CODE_INVALID_INPUT);
        }
    }
    async signDigest(req) {
        if (!validateObject(req, ['digest'], [])) ;
        const { digest, identityKey, prekeyIndex } = req;
        let key;
        if (identityKey) {
            key = this.v1Keys.identityKey;
        }
        else if (typeof prekeyIndex !== 'undefined' &&
            Number.isInteger(prekeyIndex)) {
            key = this.v1Keys.preKeys[prekeyIndex];
            if (!key) {
                throw new KeystoreError(ErrorCode.ERROR_CODE_NO_MATCHING_PREKEY, 'no prekey found');
            }
        }
        else {
            throw new KeystoreError(ErrorCode.ERROR_CODE_INVALID_INPUT, 'must specifify identityKey or prekeyIndex');
        }
        return key.sign(digest);
    }
    async saveV1Conversations({ conversations, }) {
        await this.v1Store.add(conversations.map((convo) => ({
            topic: buildDirectMessageTopic(convo.peerAddress, this.walletAddress),
            peerAddress: convo.peerAddress,
            createdNs: convo.createdNs,
            invitation: undefined,
        })));
        return {};
    }
    async getV1Conversations() {
        const convos = this.v1Store.topics.map(this.topicDataToV1ConversationReference.bind(this));
        return { conversations: convos };
    }
    async getV2Conversations() {
        const convos = this.v2Store.topics.map((invite) => topicDataToV2ConversationReference(invite));
        convos.sort((a, b) => a.createdNs.div(1000000).sub(b.createdNs.div(1000000)).toNumber());
        return proto.keystore.GetConversationsResponse.fromPartial({
            conversations: convos,
        });
    }
    async getPublicKeyBundle() {
        return this.v1Keys.getPublicKeyBundle();
    }
    async getPrivateKeyBundle() {
        return this.v1Keys;
    }
    async getAccountAddress() {
        if (!this.accountAddress) {
            this.accountAddress = await this.v2Keys
                .getPublicKeyBundle()
                .walletSignatureAddress();
        }
        return this.accountAddress;
    }
    async getRefreshJob({ jobType, }) {
        if (jobType === proto.keystore.JobType.JOB_TYPE_UNSPECIFIED) {
            throw new KeystoreError(ErrorCode.ERROR_CODE_INVALID_INPUT, 'invalid job type');
        }
        const lastRunTime = await this.getLastRunTime(jobType);
        return proto.keystore.GetRefreshJobResponse.fromPartial({
            lastRunNs: lastRunTime || Long.fromNumber(0),
        });
    }
    async setRefreshJob({ jobType, lastRunNs, }) {
        const key = await this.buildJobStorageKey(jobType);
        await this.jobStatePersistence.setItem(key, Uint8Array.from(lastRunNs.toBytes()));
        return {};
    }
    topicDataToV1ConversationReference(data) {
        return {
            peerAddress: data.peerAddress,
            createdNs: data.createdNs,
            topic: buildDirectMessageTopic(data.peerAddress, this.walletAddress),
            context: undefined,
        };
    }
    buildJobStorageKey(jobType) {
        return `refreshJob/${jobType.toString()}`;
    }
    async getLastRunTime(jobType) {
        const bytes = await this.jobStatePersistence.getItem(this.buildJobStorageKey(jobType));
        if (!bytes || !bytes.length) {
            return;
        }
        return Long.fromBytes([...bytes]);
    }
    // This method is not defined as part of the standard Keystore API, but is available
    // on the InMemoryKeystore to support legacy use-cases.
    lookupTopic(topic) {
        return this.v2Store.lookup(topic);
    }
}

class TopicPersistence {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    // Returns the first record in a topic if it is present.
    async getItem(key) {
        for await (const env of this.apiClient.queryIterator({ contentTopic: this.buildTopic(key) }, {
            pageSize: 1,
            direction: proto.messageApi.SortDirection.SORT_DIRECTION_DESCENDING,
        })) {
            if (!env.message)
                continue;
            try {
                return Uint8Array.from(env.message);
            }
            catch (e) {
                console.log(e);
            }
        }
        return null;
    }
    async setItem(key, value) {
        const keys = Uint8Array.from(value);
        await this.apiClient.publish([
            {
                contentTopic: this.buildTopic(key),
                message: keys,
            },
        ]);
    }
    setAuthenticator(authenticator) {
        this.apiClient.setAuthenticator(authenticator);
    }
    buildTopic(key) {
        return buildUserPrivateStoreTopic(key);
    }
}

class BrowserStoragePersistence {
    constructor(storage) {
        this.storage = storage;
    }
    static create() {
        if (typeof localStorage === 'undefined') {
            throw new Error('Missing LocalStorage. Use ephemeralPersistence instead');
        }
        return new BrowserStoragePersistence(localStorage);
    }
    async getItem(key) {
        const value = this.storage.getItem(key);
        if (value === null) {
            return null;
        }
        return Uint8Array.from(Buffer.from(value, 'binary'));
    }
    async setItem(key, value) {
        this.storage.setItem(key, Buffer.from(value).toString('binary'));
    }
}

// Fully in-memory polyfill for the browser storage API.
// Borrowed from https://github.com/MitchellCash/node-storage-polyfill but implemented as a ponyfill instead of a polyfill
class LocalStoragePonyfill {
    constructor() {
        this.store = new Map();
    }
    get length() {
        return this.store.size;
    }
    clear() {
        this.store = new Map();
    }
    getItem(key) {
        this.validateString(key);
        if (this.store.has(key)) {
            return String(this.store.get(key));
        }
        return null;
    }
    key(index) {
        if (index === undefined) {
            // This is the TypeError implemented in Chrome, Firefox throws "Storage.key: At least 1
            // argument required, but only 0 passed".
            throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.");
        }
        const keys = [...this.store.keys()];
        if (index >= keys.length) {
            return null;
        }
        return keys[index];
    }
    removeItem(key) {
        this.validateString(key);
        this.store.delete(key);
    }
    setItem(key, value) {
        this.validateString(key);
        this.validateString(value);
        this.store.set(String(key), String(value));
    }
    validateString(val) {
        if (!(typeof val === 'string')) {
            throw new TypeError('Key must be a string');
        }
    }
}

class InMemoryPersistence extends BrowserStoragePersistence {
    static create() {
        return new BrowserStoragePersistence(new LocalStoragePonyfill());
    }
}

class PrefixedPersistence {
    constructor(prefix, persistence) {
        this.prefix = prefix;
        this.persistence = persistence;
    }
    getItem(key) {
        return this.persistence.getItem(this.buildKey(key));
    }
    setItem(key, value) {
        return this.persistence.setItem(this.buildKey(key), value);
    }
    buildKey(key) {
        return this.prefix + key;
    }
}

/**
 * EncryptedPersistence is a Persistence implementation that uses ECIES to encrypt all values
 * ECIES encryption protects against unauthorized reads, but not unauthorized writes.
 * A third party with access to the underlying store could write malicious data using the public key of the owner
 */
class EncryptedPersistence {
    constructor(persistence, privateKey) {
        this.persistence = persistence;
        this.privateKey = privateKey;
        this.privateKeyBytes = Buffer.from(privateKey.secp256k1.bytes);
        this.publicKey = getPublic(this.privateKeyBytes);
    }
    async getItem(key) {
        const encrypted = await this.persistence.getItem(key);
        if (encrypted) {
            return this.decrypt(encrypted);
        }
        return null;
    }
    async setItem(key, value) {
        const encrypted = await this.encrypt(value);
        await this.persistence.setItem(key, encrypted);
    }
    async encrypt(value) {
        const ecies = await encrypt(this.publicKey, Buffer.from(value));
        return this.serializeEcies(ecies);
    }
    async decrypt(value) {
        const ecies = await this.deserializeEcies(value);
        const result = await decrypt(this.privateKeyBytes, ecies);
        return Uint8Array.from(result);
    }
    async serializeEcies(data) {
        // This will create and sign a `SignedEciesCiphertext` payload based on the provided data
        const protoVal = await SignedEciesCiphertext.create(data, this.privateKey);
        return protoVal.toBytes();
    }
    async deserializeEcies(data) {
        const protoVal = SignedEciesCiphertext.fromBytes(data);
        // Verify the signature upon deserializing
        if (!(await protoVal.verify(this.privateKey.publicKey))) {
            throw new Error('signature validation failed');
        }
        const ecies = protoVal.ciphertext;
        return {
            ciphertext: Buffer.from(ecies.ciphertext),
            mac: Buffer.from(ecies.mac),
            iv: Buffer.from(ecies.iv),
            ephemeralPublicKey: Buffer.from(ecies.ephemeralPublicKey),
        };
    }
}

const buildPersistenceFromOptions = async (opts, keys) => {
    if (!opts.persistConversations) {
        return InMemoryPersistence.create();
    }
    const address = await keys.identityKey.publicKey.walletSignatureAddress();
    const prefix = buildPersistenceKey(opts.env, address);
    const basePersistence = opts.basePersistence;
    const shouldEncrypt = !opts.disablePersistenceEncryption;
    return new PrefixedPersistence(prefix, shouldEncrypt
        ? new EncryptedPersistence(basePersistence, keys.identityKey)
        : basePersistence);
};

const KEY_BUNDLE_NAME = 'key_bundle';
/**
 * EncryptedKeyStore wraps Store to enable encryption of private key bundles
 * using a wallet signature.
 */
class NetworkKeyManager {
    constructor(signer, persistence, preEnableIdentityCallback) {
        this.signer = signer;
        this.persistence = persistence;
        this.preEnableIdentityCallback = preEnableIdentityCallback;
    }
    async getStorageAddress(name) {
        // I think we want to namespace the storage address by wallet
        // This will allow us to support switching between multiple wallets in the same browser
        let walletAddress = await this.signer.getAddress();
        walletAddress = viem.getAddress(walletAddress);
        return `${walletAddress}/${name}`;
    }
    // Retrieve a private key bundle for the active wallet address in the signer
    async loadPrivateKeyBundle() {
        const storageBuffer = await this.persistence.getItem(await this.getStorageAddress(KEY_BUNDLE_NAME));
        if (!storageBuffer) {
            return null;
        }
        const [bundle, needsUpdate] = await this.fromEncryptedBytes(this.signer, Uint8Array.from(storageBuffer));
        // If a versioned bundle is not found, the legacy bundle needs to be resaved to the store in
        // the new format. Once all bundles have been upgraded, this migration code can be removed.
        if (needsUpdate) {
            await this.storePrivateKeyBundle(bundle);
        }
        return bundle;
    }
    // Store the private key bundle at an address generated based on the active wallet in the signer
    async storePrivateKeyBundle(bundle) {
        const keyAddress = await this.getStorageAddress(KEY_BUNDLE_NAME);
        const encodedBundle = await this.toEncryptedBytes(bundle, this.signer);
        // We need to setup the Authenticator so that the underlying store can publish messages without error
        if (typeof this.persistence.setAuthenticator === 'function') {
            this.persistence.setAuthenticator(new LocalAuthenticator(bundle.identityKey));
        }
        await this.persistence.setItem(keyAddress, encodedBundle);
    }
    // encrypts/serializes the bundle for storage
    async toEncryptedBytes(bundle, wallet) {
        // serialize the contents
        const bytes = bundle.encode();
        const wPreKey = crypto.getRandomValues(new Uint8Array(32));
        const input = storageSigRequestText(wPreKey);
        const walletAddr = await wallet.getAddress();
        if (this.preEnableIdentityCallback) {
            await this.preEnableIdentityCallback();
        }
        const sig = await wallet.signMessage(input);
        // Check that the signature is correct, was created using the expected
        // input, and retry if not. This mitigates a bug in interacting with
        // LedgerLive for iOS, where the previous signature response is
        // returned in some cases.
        const valid = viem.verifyMessage({
            address: walletAddr,
            message: input,
            signature: sig,
        });
        if (!valid) {
            throw new Error('invalid signature');
        }
        const secret = viem.hexToBytes(sig);
        const ciphertext = await encrypt$1(bytes, secret);
        return proto.privateKey.EncryptedPrivateKeyBundle.encode({
            v1: {
                walletPreKey: wPreKey,
                ciphertext,
            },
        }).finish();
    }
    // decrypts/deserializes the bundle from storage bytes
    async fromEncryptedBytes(wallet, bytes) {
        const [eBundle, needsUpdate] = getEncryptedBundle(bytes);
        if (!eBundle.walletPreKey) {
            throw new Error('missing wallet pre-key');
        }
        if (!eBundle.ciphertext?.aes256GcmHkdfSha256) {
            throw new Error('missing bundle ciphertext');
        }
        if (this.preEnableIdentityCallback) {
            await this.preEnableIdentityCallback();
        }
        const secret = viem.hexToBytes((await wallet.signMessage(storageSigRequestText(eBundle.walletPreKey))));
        // Ledger uses the last byte = v=[0,1,...] but Metamask and other wallets generate with
        // v+27 as the last byte. We need to support both for interoperability. Doing this
        // on the decryption side provides an immediate retroactive fix.
        // Ledger is using the canonical way, whereas Ethereum adds 27 due to some legacy stuff
        // https://github.com/ethereum/go-ethereum/issues/19751#issuecomment-504900739
        try {
            // Try the original version of the signature first
            const ciphertext = new Ciphertext(eBundle.ciphertext);
            const decrypted = await decrypt$1(ciphertext, secret);
            const [bundle, needsUpdate2] = getPrivateBundle(decrypted);
            return [bundle, needsUpdate || needsUpdate2];
        }
        catch (e) {
            // Assert that the secret is length 65 (encoded signature + recovery byte)
            if (secret.length !== 65) {
                throw new Error('Expected 65 bytes before trying a different recovery byte');
            }
            // Try the other version of recovery byte, either +27 or -27
            const lastByte = secret[secret.length - 1];
            let newSecret = secret.slice(0, secret.length - 1);
            if (lastByte < 27) {
                // This is a canonical signature, so we need to add 27 to the recovery byte and try again
                newSecret = new Uint8Array([...newSecret, lastByte + 27]);
            }
            else {
                // This canocalizes v to 0 or 1 (or maybe 2 or 3 but very unlikely)
                newSecret = new Uint8Array([...newSecret, lastByte - 27]);
            }
            const ciphertext = new Ciphertext(eBundle.ciphertext);
            const decrypted = await decrypt$1(ciphertext, newSecret);
            const [bundle, needsUpdate2] = getPrivateBundle(decrypted);
            return [bundle, needsUpdate || needsUpdate2];
        }
    }
}
// getEncryptedV1Bundle returns the decoded bundle from the provided bytes. If there is an error decoding the bundle it attempts
// to decode the bundle as a legacy bundle. Additionally return whether the bundle is in the expected format.
function getEncryptedBundle(bytes) {
    try {
        const b = proto.privateKey.EncryptedPrivateKeyBundle.decode(bytes);
        if (b.v1) {
            return [b.v1, false];
        }
    }
    catch (e) {
        return [proto.privateKey.EncryptedPrivateKeyBundleV1.decode(bytes), true];
    }
    throw new Error('unrecognized encrypted private key bundle version');
}
// getPrivateV1Bundle returns the decoded bundle from the provided bytes. If there is an error decoding the bundle it attempts
// to decode the bundle as a legacy bundle. Additionally return whether the bundle is in the expected format.
function getPrivateBundle(bytes) {
    try {
        // TODO: add support for V2
        const b = decodePrivateKeyBundle(bytes);
        if (b instanceof PrivateKeyBundleV2) {
            throw new Error('V2 bundles not supported yet');
        }
        return [b, false];
    }
    catch (e) {
        // Adds a default fallback for older versions of the proto
        const b = proto.privateKey.PrivateKeyBundleV1.decode(bytes);
        return [new PrivateKeyBundleV1(b), true];
    }
}
function storageSigRequestText(preKey) {
    // Note that an update to this signature request text will require
    // addition of backward compatibility for existing encrypted bundles
    // and/or a migration; otherwise clients will no longer be able to
    // decrypt those bundles.
    return ('BRIXBIT : Enable Identity\n' +
        `${bytesToHex(preKey)}\n` +
        '\n' +
        'For more info: https://brixbit.org/signatures/');
}

/**
 * KeyGeneratorKeystoreProvider will create a new BRIXBIT `PrivateKeyBundle` and persist it to the network
 * This provider should always be specified last in the list of `keystoreProviders` on client creation,
 * as it will overwrite any BRIXBIT identities already on the network
 */
class KeyGeneratorKeystoreProvider {
    async newKeystore(opts, apiClient, wallet) {
        if (!wallet) {
            throw new KeystoreProviderUnavailableError('Wallet required to generate new keys');
        }
        if (opts.preCreateIdentityCallback) {
            await opts.preCreateIdentityCallback();
        }
        const bundle = await PrivateKeyBundleV1.generate(wallet);
        const manager = new NetworkKeyManager(wallet, new TopicPersistence(apiClient), opts.preEnableIdentityCallback);
        await manager.storePrivateKeyBundle(bundle);
        return InMemoryKeystore.create(bundle, await buildPersistenceFromOptions(opts, bundle));
    }
}

/**
 * NetworkKeystoreProvider will look on the BRIXBIT network for an `EncryptedPrivateKeyBundle`
 * on the user's private storage topic. If found, will decrypt the bundle using a wallet
 * signature and instantiate a Keystore instance using the decrypted value.
 */
class NetworkKeystoreProvider {
    async newKeystore(opts, apiClient, wallet) {
        if (!wallet) {
            throw new KeystoreProviderUnavailableError('No wallet provided');
        }
        const loader = new NetworkKeyManager(wallet, new TopicPersistence(apiClient), opts.preEnableIdentityCallback);
        const keys = await loader.loadPrivateKeyBundle();
        if (!keys) {
            throw new KeystoreProviderUnavailableError('No keys found');
        }
        return InMemoryKeystore.create(keys, await buildPersistenceFromOptions(opts, keys));
    }
}

/**
 * StaticKeystoreProvider will look for a `privateKeyOverride` in the provided options,
 * and bootstrap a Keystore using those options if provided.
 *
 * If no `privateKeyOverride` is supplied will throw a `KeystoreProviderUnavailableError` causing
 * the client to continue iterating through the `KeystoreProviders` list.
 */
class StaticKeystoreProvider {
    async newKeystore(opts) {
        const { privateKeyOverride } = opts;
        if (!privateKeyOverride) {
            throw new KeystoreProviderUnavailableError('No private key override provided');
        }
        const bundle = decodePrivateKeyBundle(privateKeyOverride);
        if (bundle instanceof PrivateKeyBundleV2) {
            throw new Error('V2 private key bundle found. Only V1 supported');
        }
        return InMemoryKeystore.create(bundle, await buildPersistenceFromOptions(opts, bundle));
    }
}

function getEthereum() {
    return window.ethereum;
}

const { GetKeystoreStatusResponse_KeystoreStatus: KeystoreStatus$1, InitKeystoreRequest, InitKeystoreResponse, GetKeystoreStatusRequest, GetKeystoreStatusResponse, } = proto.keystore;
async function snapRPC(method, rpc, req, meta, snapId) {
    let reqParam = null;
    if (rpc.req) {
        const encoder = rpc.req.encode;
        const reqBytes = encoder(req).finish();
        reqParam = b64Encode(reqBytes, 0, reqBytes.length);
    }
    const responseString = await snapRequest(method, reqParam, meta, snapId);
    if (Array.isArray(responseString)) {
        throw new Error('Unexpected array response');
    }
    return rpc.res.decode(b64Decode(responseString));
}
async function snapRequest(method, req, meta, snapId) {
    const params = { meta };
    if (typeof req === 'string') {
        params.req = req;
    }
    const response = await getEthereum()?.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId,
            request: {
                method,
                params,
            },
        },
    });
    if (!response || typeof response !== 'object') {
        throw new Error('No response value');
    }
    return response.res;
}
// If a browser has multiple providers, but one of them supports MetaMask flask
// this function will ensure that Flask is being used and return true.
// Designed to be resistant to provider clobbering by Phantom and CBW
// Inspired by https://github.com/Montoya/snap-connect-test/blob/main/index.html
async function hasMetamaskWithSnaps() {
    const ethereum = getEthereum();
    // Naive way of detecting snaps support
    if (ethereum?.isMetaMask) {
        try {
            await ethereum.request({
                method: 'wallet_getSnaps',
            });
            return true;
        }
        catch {
            // no-op
        }
    }
    if (typeof ethereum?.detected !== 'undefined' &&
        Array.isArray(ethereum.detected)) {
        for (const provider of ethereum.detected) {
            try {
                // Detect snaps support
                await provider.request({
                    method: 'wallet_getSnaps',
                });
                // enforces MetaMask as provider
                ethereum?.setProvider?.(provider);
                return true;
            }
            catch {
                // no-op
            }
        }
    }
    if (typeof ethereum?.providers !== 'undefined' &&
        Array.isArray(ethereum.providers)) {
        for (const provider of ethereum.providers) {
            try {
                // Detect snaps support
                await provider.request({
                    method: 'wallet_getSnaps',
                });
                window.ethereum = provider;
                return true;
            }
            catch {
                // no-op
            }
        }
    }
    return false;
}
async function getSnaps() {
    return await getEthereum()?.request({
        method: 'wallet_getSnaps',
    });
}
async function getSnap(snapId, version) {
    try {
        const snaps = await getSnaps();
        if (snaps) {
            return Object.values(snaps).find((snap) => snap &&
                snap.id === snapId &&
                (!version || isSameMajorVersion(snap.version, version)));
        }
        return undefined;
    }
    catch (e) {
        console.warn('Failed to obtain installed snap', e);
        return undefined;
    }
}
async function connectSnap(snapId, params = {}) {
    await getEthereum()?.request({
        method: 'wallet_requestSnaps',
        params: {
            [snapId]: params,
        },
    });
}
const getWalletStatusCodec = {
    req: GetKeystoreStatusRequest,
    res: GetKeystoreStatusResponse,
};
async function getWalletStatus(meta, snapId) {
    const response = await snapRPC('getKeystoreStatus', getWalletStatusCodec, {
        walletAddress: meta.walletAddress,
    }, meta, snapId);
    if ([
        KeystoreStatus$1.KEYSTORE_STATUS_UNSPECIFIED,
        KeystoreStatus$1.UNRECOGNIZED,
    ].includes(response.status)) {
        throw new Error('No status specified in response');
    }
    return response.status;
}
const initKeystoreCodec = {
    req: InitKeystoreRequest,
    res: InitKeystoreResponse,
};
async function initSnap(bundle, env, snapId) {
    const walletAddress = bundle.identityKey.publicKey.walletSignatureAddress();
    const response = await snapRPC('initKeystore', initKeystoreCodec, {
        v1: bundle,
    }, { walletAddress, env }, snapId);
    if (response.error) {
        throw new KeystoreError(response.error.code, response.error.message);
    }
}

const apiDefs = {
    /**
     * Decrypt a batch of V1 messages
     */
    decryptV1: {
        req: proto.keystore.DecryptV1Request,
        res: proto.keystore.DecryptResponse,
    },
    /**
     * Decrypt a batch of V2 messages
     */
    decryptV2: {
        req: proto.keystore.DecryptV2Request,
        res: proto.keystore.DecryptResponse,
    },
    /**
     * Encrypt a batch of V1 messages
     */
    encryptV1: {
        req: proto.keystore.EncryptV1Request,
        res: proto.keystore.EncryptResponse,
    },
    /**
     * Encrypt a batch of V2 messages
     */
    encryptV2: {
        req: proto.keystore.EncryptV2Request,
        res: proto.keystore.EncryptResponse,
    },
    /**
     * Take a batch of invite messages and store the `TopicKeys` for later use in
     * decrypting messages
     */
    saveInvites: {
        req: proto.keystore.SaveInvitesRequest,
        res: proto.keystore.SaveInvitesResponse,
    },
    /**
     * Create a sealed/encrypted invite and store the Topic keys in the Keystore
     * for later use. The returned invite payload must be sent to the network for
     * the other party to be able to communicate.
     */
    createInvite: {
        req: proto.keystore.CreateInviteRequest,
        res: proto.keystore.CreateInviteResponse,
    },
    /**
     * Create an BRIXBIT auth token to be used as a header on BRIXBIT API requests
     */
    createAuthToken: {
        req: proto.keystore.CreateAuthTokenRequest,
        res: proto.authn.Token,
    },
    /**
     * Sign the provided digest with either the `IdentityKey` or a specified
     * `PreKey`
     */
    signDigest: {
        req: proto.keystore.SignDigestRequest,
        res: proto.signature.Signature,
    },
    /**
     * Get the `PublicKeyBundle` associated with the Keystore's private keys
     */
    getPublicKeyBundle: {
        req: null,
        res: proto.publicKey.PublicKeyBundle,
    },
    /**
     * Export the private keys. May throw an error if the keystore implementation
     * does not allow this operation
     */
    getPrivateKeyBundle: {
        req: null,
        res: proto.privateKey.PrivateKeyBundleV1,
    },
    /**
     * Save V1 Conversations
     */
    saveV1Conversations: {
        req: proto.keystore.SaveV1ConversationsRequest,
        res: proto.keystore.SaveV1ConversationsResponse,
    },
    /**
     * Get a list of V1 conversations
     */
    getV1Conversations: {
        req: null,
        res: proto.keystore.GetConversationsResponse,
    },
    /**
     * Get a list of V2 conversations
     */
    getV2Conversations: {
        req: null,
        res: proto.keystore.GetConversationsResponse,
    },
    /**
     * Get a refresh job from the persistence
     */
    getRefreshJob: {
        req: proto.keystore.GetRefreshJobRequest,
        res: proto.keystore.GetRefreshJobResponse,
    },
    /**
     * Sets the time of a refresh job
     */
    setRefreshJob: {
        req: proto.keystore.SetRefeshJobRequest,
        res: proto.keystore.SetRefreshJobResponse,
    },
    /**
     * Encrypt a batch of messages to yourself
     */
    selfEncrypt: {
        req: proto.keystore.SelfEncryptRequest,
        res: proto.keystore.SelfEncryptResponse,
    },
    /**
     * Decrypt a batch of messages to yourself
     */
    selfDecrypt: {
        req: proto.keystore.SelfDecryptRequest,
        res: proto.keystore.DecryptResponse,
    },
    /**
     * Get the private preferences topic identifier
     */
    getPrivatePreferencesTopicIdentifier: {
        req: null,
        res: proto.keystore.GetPrivatePreferencesTopicIdentifierResponse,
    },
};
const snapApiDefs = {
    ...apiDefs,
    getKeystoreStatus: {
        req: proto.keystore.GetKeystoreStatusRequest,
        res: proto.keystore.GetKeystoreStatusResponse,
    },
    initKeystore: {
        req: proto.keystore.InitKeystoreRequest,
        res: proto.keystore.InitKeystoreResponse,
    },
};

function SnapKeystore(walletAddress, env, snapId) {
    const generatedMethods = {};
    const snapMeta = {
        walletAddress,
        env,
    };
    for (const [method, rpc] of Object.entries(snapApiDefs)) {
        generatedMethods[method] = async (req) => {
            if (!rpc.req) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return snapRPC(method, rpc, undefined, snapMeta, snapId);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return snapRPC(method, rpc, req, snapMeta, snapId);
        };
    }
    return {
        ...generatedMethods,
        // Don't bother calling the keystore, since we already have the wallet address
        async getAccountAddress() {
            return walletAddress;
        },
    };
}

const { GetKeystoreStatusResponse_KeystoreStatus: KeystoreStatus } = proto.keystore;
const SNAP_LOCAL_ORIGIN = 'local:http://localhost:8080';
/**
 * The Snap keystore provider will:
 * 1. Check if the user is capable of using Snaps
 * 2. Check if the user has already setup the Snap with the appropriate keys
 * 3. If not, will get keys from the network or create new keys and store them in the Snap
 */
class SnapKeystoreProvider {
    constructor(snapId = SNAP_LOCAL_ORIGIN, snapVersion) {
        this.snapId = snapId;
        this.snapVersion = snapVersion;
    }
    async newKeystore(opts, apiClient, wallet) {
        if (!wallet) {
            throw new KeystoreProviderUnavailableError('No wallet provided');
        }
        if (!(await hasMetamaskWithSnaps())) {
            throw new KeystoreProviderUnavailableError('MetaMask with Snaps not detected');
        }
        const walletAddress = await wallet.getAddress();
        const env = opts.env;
        const hasSnap = await getSnap(this.snapId, this.snapVersion);
        if (!hasSnap || semverGreaterThan(this.snapVersion, hasSnap.version)) {
            await connectSnap(this.snapId, this.snapVersion ? { version: this.snapVersion } : {});
        }
        if (!(await checkSnapLoaded(walletAddress, env, this.snapId))) {
            const bundle = await bundleFromOptions(opts, apiClient, wallet);
            await initSnap(bundle, env, this.snapId);
        }
        return SnapKeystore(walletAddress, env, this.snapId);
    }
}
async function createBundle(opts, apiClient, wallet) {
    const tmpProvider = new KeyGeneratorKeystoreProvider();
    const tmpKeystore = await tmpProvider.newKeystore(opts, apiClient, wallet);
    return new PrivateKeyBundleV1(await tmpKeystore.getPrivateKeyBundle());
}
async function bundleFromOptions(opts, apiClient, wallet) {
    if (opts.privateKeyOverride) {
        const bundle = decodePrivateKeyBundle(opts.privateKeyOverride);
        if (!(bundle instanceof PrivateKeyBundleV1)) {
            throw new Error('Unsupported private key bundle version');
        }
        return bundle;
    }
    if (!wallet) {
        throw new Error('No privateKeyOverride or wallet');
    }
    return getOrCreateBundle(opts, apiClient, wallet);
}
async function getOrCreateBundle(opts, apiClient, wallet) {
    // I really don't love using other providers inside a provider. Feels like too much indirection
    // TODO: Refactor keystore providers to better support the weird Snap flow
    const networkProvider = new NetworkKeystoreProvider();
    try {
        const tmpKeystore = await networkProvider.newKeystore(opts, apiClient, wallet);
        return new PrivateKeyBundleV1(await tmpKeystore.getPrivateKeyBundle());
    }
    catch (e) {
        if (e instanceof KeystoreProviderUnavailableError) {
            return createBundle(opts, apiClient, wallet);
        }
        throw e;
    }
}
async function checkSnapLoaded(walletAddress, env, snapId) {
    const status = await getWalletStatus({ walletAddress, env }, snapId);
    if (status === KeystoreStatus.KEYSTORE_STATUS_INITIALIZED) {
        return true;
    }
    return false;
}

const version = "1.3.6";
const packageName = "@brixbit/snap";

class ConsentListEntry {
    constructor(value, entryType, permissionType) {
        this.value = value;
        this.entryType = entryType;
        this.permissionType = permissionType;
    }
    get key() {
        return `${this.entryType}-${this.value}`;
    }
    static fromAddress(address, permissionType = 'unknown') {
        return new ConsentListEntry(address, 'address', permissionType);
    }
}
class ConsentList {
    constructor(client) {
        this.entries = new Map();
        this.client = client;
    }
    allow(address) {
        const entry = ConsentListEntry.fromAddress(address, 'allowed');
        this.entries.set(entry.key, 'allowed');
        return entry;
    }
    deny(address) {
        const entry = ConsentListEntry.fromAddress(address, 'denied');
        this.entries.set(entry.key, 'denied');
        return entry;
    }
    state(address) {
        const entry = ConsentListEntry.fromAddress(address);
        return this.entries.get(entry.key) ?? 'unknown';
    }
    async getIdentifier() {
        if (!this._identifier) {
            const { identifier } = await this.client.keystore.getPrivatePreferencesTopicIdentifier();
            this._identifier = identifier;
        }
        return this._identifier;
    }
    async decodeMessages(messages) {
        // decrypt messages
        const { responses } = await this.client.keystore.selfDecrypt({
            requests: messages.map((message) => ({ payload: message })),
        });
        // decoded actions
        const actions = responses.reduce((result, response) => {
            return response.result?.decrypted
                ? result.concat(proto.privatePreferences.PrivatePreferencesAction.decode(response.result.decrypted))
                : result;
        }, []);
        return actions;
    }
    processActions(actions, lastTimestampNs) {
        const entries = [];
        actions.forEach((action) => {
            action.allow?.walletAddresses.forEach((address) => {
                entries.push(this.allow(address));
            });
            action.block?.walletAddresses.forEach((address) => {
                entries.push(this.deny(address));
            });
        });
        if (lastTimestampNs) {
            this.lastEntryTimestamp = fromNanoString(lastTimestampNs);
        }
        return entries;
    }
    async stream(onConnectionLost) {
        const identifier = await this.getIdentifier();
        const contentTopic = buildUserPrivatePreferencesTopic(identifier);
        return Stream.create(this.client, [contentTopic], async (envelope) => {
            if (!envelope.message) {
                return undefined;
            }
            const actions = await this.decodeMessages([envelope.message]);
            // update consent list
            this.processActions(actions, envelope.timestampNs);
            return actions[0];
        }, undefined, onConnectionLost);
    }
    reset() {
        // clear existing entries
        this.entries.clear();
    }
    async load(startTime) {
        const identifier = await this.getIdentifier();
        const contentTopic = buildUserPrivatePreferencesTopic(identifier);
        let lastTimestampNs;
        const messages = await this.client.listEnvelopes(contentTopic, async ({ message, timestampNs }) => {
            if (timestampNs) {
                lastTimestampNs = timestampNs;
            }
            return message;
        }, {
            startTime,
        });
        const actions = await this.decodeMessages(messages);
        // update consent list
        return this.processActions(actions, lastTimestampNs);
    }
    async publish(entries) {
        const identifier = await this.getIdentifier();
        // encoded actions
        const actions = entries.reduce((result, entry) => {
            // only handle address entries for now
            if (entry.entryType === 'address') {
                const action = {
                    allow: entry.permissionType === 'allowed'
                        ? {
                            walletAddresses: [entry.value],
                        }
                        : undefined,
                    block: entry.permissionType === 'denied'
                        ? {
                            walletAddresses: [entry.value],
                        }
                        : undefined,
                };
                return result.concat(proto.privatePreferences.PrivatePreferencesAction.encode(action).finish());
            }
            return result;
        }, []);
        const { responses } = await this.client.keystore.selfEncrypt({
            requests: actions.map((action) => ({ payload: action })),
        });
        // encrypted messages
        const messages = responses.reduce((result, response) => {
            return response.result?.encrypted
                ? result.concat(response.result?.encrypted)
                : result;
        }, []);
        const contentTopic = buildUserPrivatePreferencesTopic(identifier);
        const timestamp = new Date();
        // envelopes to publish
        const envelopes = messages.map((message) => ({
            contentTopic,
            message,
            timestamp,
        }));
        // publish entries
        await this.client.publishEnvelopes(envelopes);
        // update local entries after publishing
        entries.forEach((entry) => {
            this.entries.set(entry.key, entry.permissionType);
        });
    }
}
class Contacts {
    constructor(client) {
        this.addresses = new Set();
        this.consentList = new ConsentList(client);
        this.client = client;
        this.jobRunner = new JobRunner('user-preferences', client.keystore);
    }
    async loadConsentList(startTime) {
        return this.jobRunner.run(async (lastRun) => {
            // allow for override of startTime
            return this.consentList.load(startTime ?? lastRun);
        });
    }
    async refreshConsentList() {
        // clear existing consent list
        this.consentList.reset();
        // reset last run time to the epoch
        await this.jobRunner.resetLastRunTime();
        // reload the consent list
        return this.loadConsentList();
    }
    async streamConsentList(onConnectionLost) {
        return this.consentList.stream(onConnectionLost);
    }
    /**
     * The timestamp of the last entry in the consent list
     */
    get lastConsentListEntryTimestamp() {
        return this.consentList.lastEntryTimestamp;
    }
    setConsentListEntries(entries) {
        if (!entries.length) {
            return;
        }
        this.consentList.reset();
        entries.forEach((entry) => {
            if (entry.permissionType === 'allowed') {
                this.consentList.allow(entry.value);
            }
            if (entry.permissionType === 'denied') {
                this.consentList.deny(entry.value);
            }
        });
    }
    isAllowed(address) {
        return this.consentList.state(address) === 'allowed';
    }
    isDenied(address) {
        return this.consentList.state(address) === 'denied';
    }
    consentState(address) {
        return this.consentList.state(address);
    }
    async allow(addresses) {
        await this.consentList.publish(addresses.map((address) => ConsentListEntry.fromAddress(address, 'allowed')));
    }
    async deny(addresses) {
        await this.consentList.publish(addresses.map((address) => ConsentListEntry.fromAddress(address, 'denied')));
    }
}

const { Compression } = proto.content;
// eslint-disable @typescript-eslint/explicit-module-boundary-types
// eslint-disable @typescript-eslint/no-explicit-any
// Default maximum allowed content size
const MaxContentSize = 100 * 1024 * 1024; // 100M
/**
 * Provide a default client configuration. These settings can be used on their own, or as a starting point for custom configurations
 * @param opts additional options to override the default settings
 */
function defaultOptions(opts) {
    const _defaultOptions = {
        privateKeyOverride: undefined,
        env: 'dev',
        apiUrl: undefined,
        codecs: [new TextCodec()],
        maxContentSize: MaxContentSize,
        persistConversations: true,
        skipContactPublishing: false,
        useSnaps: false,
        basePersistence: isBrowser()
            ? BrowserStoragePersistence.create()
            : InMemoryPersistence.create(),
        disablePersistenceEncryption: false,
        keystoreProviders: defaultKeystoreProviders(),
        apiClientFactory: createHttpApiClientFromOptions,
    };
    if (opts?.codecs) {
        opts.codecs = _defaultOptions.codecs.concat(opts.codecs);
    }
    if (opts?.useSnaps) {
        opts.keystoreProviders = [
            new SnapKeystoreProvider(`npm:${packageName}`, version),
            ..._defaultOptions.keystoreProviders,
        ];
    }
    return { ..._defaultOptions, ...opts };
}
/**
 * Client class initiates connection to the BRIXBIT network.
 * Should be created with `await Client.create(options)`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Client {
    constructor(publicKeyBundle, apiClient, backupClient, keystore) {
        this.knownPublicKeyBundles = new Map();
        // TODO: Remove keys and legacyKeys
        this.keystore = keystore;
        this.publicKeyBundle = publicKeyBundle;
        this.address = publicKeyBundle.walletSignatureAddress();
        this._conversations = new Conversations(this);
        this._codecs = new Map();
        this._maxContentSize = MaxContentSize;
        this.apiClient = apiClient;
        this._backupClient = backupClient;
        this.contacts = new Contacts(this);
    }
    /**
     * @type {Conversations}
     */
    get conversations() {
        return this._conversations;
    }
    get backupType() {
        return this._backupClient.backupType;
    }
    get signedPublicKeyBundle() {
        return SignedPublicKeyBundle.fromLegacyBundle(this.publicKeyBundle);
    }
    /**
     * Create and start a client associated with given wallet.
     * @param wallet the wallet as a Signer instance
     * @param opts specify how to to connect to the network
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async create(wallet, opts) {
        const signer = getSigner(wallet);
        const options = defaultOptions(opts);
        const apiClient = options.apiClientFactory(options);
        const keystore = await bootstrapKeystore(options, apiClient, signer);
        const publicKeyBundle = new PublicKeyBundle(await keystore.getPublicKeyBundle());
        const address = publicKeyBundle.walletSignatureAddress();
        apiClient.setAuthenticator(new KeystoreAuthenticator(keystore));
        const backupClient = await Client.setupBackupClient(address, options.env);
        const client = new Client(publicKeyBundle, apiClient, backupClient, keystore);
        await client.init(options);
        return client;
    }
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
    static async getKeys(wallet, opts) {
        const client = await Client.create(getSigner(wallet), opts);
        const keys = await client.keystore.getPrivateKeyBundle();
        return new PrivateKeyBundleV1(keys).encode();
    }
    /**
     * Tells the caller whether the browser has a Snaps-compatible version of MetaMask installed
     */
    static isSnapsReady() {
        return hasMetamaskWithSnaps();
    }
    static async setupBackupClient(walletAddress, env) {
        // Hard-code the provider to use for now
        const selectBackupProvider = async () => {
            return Promise.resolve({
                type: env === 'local' ? BackupType.brixbitTopicStore : BackupType.none,
            });
        };
        return createBackupClient(walletAddress, selectBackupProvider);
    }
    async init(options) {
        options.codecs.forEach((codec) => {
            this.registerCodec(codec);
        });
        this._maxContentSize = options.maxContentSize;
        if (!options.skipContactPublishing) {
            await this.ensureUserContactPublished(options.publishLegacyContact);
        }
    }
    // gracefully shut down the client
    async close() {
        return undefined;
    }
    async ensureUserContactPublished(legacy = false) {
        const bundle = await getUserContactFromNetwork(this.apiClient, this.address);
        if (bundle &&
            bundle instanceof SignedPublicKeyBundle &&
            this.signedPublicKeyBundle.equals(bundle)) {
            return;
        }
        // TEMPORARY: publish V1 contact to make sure there is one in the topic
        // in order to preserve compatibility with pre-v7 clients.
        // Remove when pre-v7 clients are deprecated
        await this.publishUserContact(true);
        if (!legacy) {
            await this.publishUserContact(legacy);
        }
    }
    // PRIVATE: publish the key bundle into the contact topic
    // left public for testing purposes
    async publishUserContact(legacy = false) {
        const bundle = legacy ? this.publicKeyBundle : this.signedPublicKeyBundle;
        await this.publishEnvelopes([
            {
                contentTopic: buildUserContactTopic(this.address),
                message: encodeContactBundle(bundle),
            },
        ]);
    }
    /**
     * Returns the cached PublicKeyBundle if one is known for the given address or fetches
     * one from the network
     *
     * This throws if either the address is invalid or the contact is not published.
     * See also [#canMessage].
     */
    async getUserContact(peerAddress) {
        peerAddress = viem.getAddress(peerAddress); // EIP55 normalize the address case.
        const existingBundle = this.knownPublicKeyBundles.get(peerAddress);
        if (existingBundle) {
            return existingBundle;
        }
        const newBundle = await getUserContactFromNetwork(this.apiClient, peerAddress);
        if (newBundle) {
            this.knownPublicKeyBundles.set(peerAddress, newBundle);
        }
        return newBundle;
    }
    /**
     * Identical to getUserContact but for multiple peer addresses
     */
    async getUserContacts(peerAddresses) {
        // EIP55 normalize all peer addresses
        const normalizedAddresses = peerAddresses.map((address) => viem.getAddress(address));
        // The logic here is tricky because we need to do a batch query for any uncached bundles,
        // then interleave back into an ordered array. So we create a map<string, keybundle|undefined>
        // and fill it with cached values, then take any undefined entries and form a BatchQuery from those.
        const addressToBundle = new Map();
        const uncachedAddresses = [];
        for (const address of normalizedAddresses) {
            const existingBundle = this.knownPublicKeyBundles.get(address);
            if (existingBundle) {
                addressToBundle.set(address, existingBundle);
            }
            else {
                addressToBundle.set(address, undefined);
                uncachedAddresses.push(address);
            }
        }
        // Now do a getUserContactsFromNetwork call
        const newBundles = await getUserContactsFromNetwork(this.apiClient, uncachedAddresses);
        // Now merge the newBundles into the addressToBundle map
        for (let i = 0; i < newBundles.length; i++) {
            const address = uncachedAddresses[i];
            const bundle = newBundles[i];
            addressToBundle.set(address, bundle);
            // If the bundle is not undefined, cache it
            if (bundle) {
                this.knownPublicKeyBundles.set(address, bundle);
            }
        }
        // Finally return the bundles in the same order as the input addresses
        return normalizedAddresses.map((address) => addressToBundle.get(address));
    }
    /**
     * Used to force getUserContact fetch contact from the network.
     */
    forgetContact(peerAddress) {
        peerAddress = viem.getAddress(peerAddress); // EIP55 normalize the address case.
        this.knownPublicKeyBundles.delete(peerAddress);
    }
    /**
     * Check if @peerAddress can be messaged, specifically
     * it checks that a PublicKeyBundle can be found for the given address
     */
    async canMessage(peerAddress) {
        try {
            if (Array.isArray(peerAddress)) {
                const contacts = await this.getUserContacts(peerAddress);
                return contacts.map((contact) => !!contact);
            }
            // Else do the single address case
            const keyBundle = await this.getUserContact(peerAddress);
            return keyBundle !== undefined;
        }
        catch (e) {
            // Instead of throwing, a bad address should just return false.
            return false;
        }
    }
    static async canMessage(peerAddress, opts) {
        const apiUrl = opts?.apiUrl || ApiUrls[opts?.env || 'dev'];
        const apiClient = new HttpApiClient(apiUrl, {
            appVersion: opts?.appVersion,
        });
        if (Array.isArray(peerAddress)) {
            const rawPeerAddresses = peerAddress;
            // Try to normalize each of the peer addresses
            const normalizedPeerAddresses = rawPeerAddresses.map((address) => viem.getAddress(address));
            // The getUserContactsFromNetwork will return false instead of throwing
            // on invalid envelopes
            const contacts = await getUserContactsFromNetwork(apiClient, normalizedPeerAddresses);
            return contacts.map((contact) => !!contact);
        }
        try {
            peerAddress = viem.getAddress(peerAddress); // EIP55 normalize the address case.
        }
        catch (e) {
            return false;
        }
        const keyBundle = await getUserContactFromNetwork(apiClient, peerAddress);
        return keyBundle !== undefined;
    }
    validateEnvelope(env) {
        const bytes = env.message;
        if (!env.contentTopic) {
            throw new Error('Missing content topic');
        }
        if (!bytes || !bytes.length) {
            throw new Error('Cannot publish empty message');
        }
    }
    /**
     * Low level method for publishing envelopes to the BRIXBIT network with
     * no pre-processing or encryption applied.
     *
     * Primarily used internally
     * @param envelopes PublishParams[]
     */
    async publishEnvelopes(envelopes) {
        for (const env of envelopes) {
            this.validateEnvelope(env);
        }
        await this.apiClient.publish(envelopes);
    }
    /**
     * Register a codec to be automatically used for encoding/decoding
     * messages of the given Content Type
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerCodec(codec) {
        const id = codec.contentType;
        const key = `${id.authorityId}/${id.typeId}`;
        this._codecs.set(key, codec);
        return this;
    }
    /**
     * Find a matching codec for a given `ContentTypeId` from the
     * client's codec registry
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    codecFor(contentType) {
        const key = `${contentType.authorityId}/${contentType.typeId}`;
        const codec = this._codecs.get(key);
        if (!codec) {
            return undefined;
        }
        if (contentType.versionMajor > codec.contentType.versionMajor) {
            return undefined;
        }
        return codec;
    }
    /**
     * Convert arbitrary content into a serialized `EncodedContent` instance
     * with the given options
     */
    async encodeContent(content, options) {
        const contentType = options?.contentType || ContentTypeText;
        const codec = this.codecFor(contentType);
        if (!codec) {
            throw new Error('unknown content type ' + contentType);
        }
        const encoded = codec.encode(content, this);
        const fallback = codec.fallback(content);
        if (fallback) {
            encoded.fallback = fallback;
        }
        if (typeof options?.compression === 'number' &&
            // do not compress content less than 10 bytes
            encoded.content.length >= 10) {
            encoded.compression = options.compression;
        }
        await compress(encoded);
        return proto.content.EncodedContent.encode(encoded).finish();
    }
    async decodeContent(contentBytes) {
        const encodedContent = proto.content.EncodedContent.decode(contentBytes);
        if (!encodedContent.type) {
            throw new Error('missing content type');
        }
        let content; // eslint-disable-line @typescript-eslint/no-explicit-any
        const contentType = new ContentTypeId(encodedContent.type);
        let error;
        await decompress(encodedContent, 1000);
        const codec = this.codecFor(contentType);
        if (codec) {
            content = codec.decode(encodedContent, this);
        }
        else {
            error = new Error('unknown content type ' + contentType);
        }
        return {
            content,
            contentType,
            error,
            contentFallback: encodedContent.fallback,
        };
    }
    listInvitations(opts) {
        return this.listEnvelopes(buildUserInviteTopic(this.address), async (env) => env, opts);
    }
    /**
     * List stored messages from the specified topic.
     *
     * A specified mapper function will be applied to each envelope.
     * If the mapper function throws an error during processing, the
     * envelope will be discarded.
     */
    async listEnvelopes(topic, mapper, opts) {
        if (!opts) {
            opts = {};
        }
        const { startTime, endTime, limit } = opts;
        const envelopes = await this.apiClient.query({ contentTopic: topic, startTime, endTime }, {
            direction: opts.direction || proto.messageApi.SortDirection.SORT_DIRECTION_ASCENDING,
            limit,
        });
        const results = [];
        for (const env of envelopes) {
            if (!env.message)
                continue;
            try {
                const res = await mapper(env);
                results.push(res);
            }
            catch (e) {
                console.warn('Error in listEnvelopes mapper', e);
            }
        }
        return results;
    }
    /**
     * List messages on a given set of content topics, yielding one page at a time
     */
    listEnvelopesPaginated(contentTopic, mapper, opts) {
        return mapPaginatedStream(this.apiClient.queryIteratePages({
            contentTopic,
            startTime: opts?.startTime,
            endTime: opts?.endTime,
        }, { direction: opts?.direction, pageSize: opts?.pageSize || 100 }), mapper);
    }
}
function createHttpApiClientFromOptions(options) {
    const apiUrl = options.apiUrl || ApiUrls[options.env];
    return new HttpApiClient(apiUrl, { appVersion: options.appVersion });
}
/**
 * Retrieve a key bundle from given user's contact topic
 */
async function getUserContactFromNetwork(apiClient, peerAddress) {
    const stream = apiClient.queryIterator({ contentTopic: buildUserContactTopic(peerAddress) }, { pageSize: 5, direction: SortDirection.SORT_DIRECTION_DESCENDING });
    for await (const env of stream) {
        if (!env.message)
            continue;
        const keyBundle = decodeContactBundle(env.message);
        let address;
        try {
            address = await keyBundle?.walletSignatureAddress();
        }
        catch (e) {
            address = undefined;
        }
        if (address?.toLowerCase() === peerAddress.toLowerCase()) {
            return keyBundle;
        }
    }
    return undefined;
}
/**
 * Retrieve a list of key bundles given a list of user addresses
 */
async function getUserContactsFromNetwork(apiClient, peerAddresses) {
    const userContactTopics = peerAddresses.map(buildUserContactTopic);
    const topicToEnvelopes = await apiClient.batchQuery(userContactTopics.map((topic) => ({
        contentTopic: topic,
        pageSize: 5,
        direction: SortDirection.SORT_DIRECTION_DESCENDING,
    })));
    // Transform topicToEnvelopes into a list of PublicKeyBundles or undefined
    // by going through each message and attempting to decode
    return Promise.all(peerAddresses.map(async (address, index) => {
        const envelopes = topicToEnvelopes[index];
        if (!envelopes) {
            return undefined;
        }
        for (const env of envelopes) {
            if (!env.message)
                continue;
            try {
                const keyBundle = decodeContactBundle(env.message);
                const signingAddress = await keyBundle?.walletSignatureAddress();
                if (address.toLowerCase() === signingAddress.toLowerCase()) {
                    return keyBundle;
                }
                else {
                    console.info('Received contact bundle with incorrect address');
                }
            }
            catch (e) {
                console.info('Invalid contact bundle', e);
            }
        }
        return undefined;
    }));
}
/**
 * Get the default list of `KeystoreProviders` used in the SDK
 *
 * Particularly useful if a developer wants to add their own
 * provider to the head of the list while falling back to the
 * default functionality
 */
function defaultKeystoreProviders() {
    return [
        // First check to see if a `privateKeyOverride` is provided and use that
        new StaticKeystoreProvider(),
        // Next check to see if a EncryptedPrivateKeyBundle exists on the network for the wallet
        new NetworkKeystoreProvider(),
        // If the first two failed with `KeystoreProviderUnavailableError`, then generate a new key and write it to the network
        new KeyGeneratorKeystoreProvider(),
    ];
}
/**
 * Take an array of KeystoreProviders from the options and try them until one succeeds
 */
async function bootstrapKeystore(opts, apiClient, wallet) {
    for (const provider of opts.keystoreProviders) {
        try {
            return await provider.newKeystore(opts, apiClient, wallet ?? undefined);
        }
        catch (err) {
            if (err instanceof KeystoreProviderUnavailableError) {
                continue;
            }
            throw err;
        }
    }
    throw new Error('No keystore providers available');
}

/* eslint-disable camelcase */
// brixbit.org/composite
//
// Composite is a generic sequence of multiple parts of arbitrary content type.
// It can be nested arbitrarily (composite of composites).
const ContentTypeComposite = new ContentTypeId({
    authorityId: 'brixbit.org',
    typeId: 'composite',
    versionMajor: 1,
    versionMinor: 0,
});
// CompositeCodec implements encoding/decoding of Composite values.
// Register this codec with the Client if you want support for Composite content.
class CompositeCodec {
    get contentType() {
        return ContentTypeComposite;
    }
    encode(content, codecs) {
        const part = this.toProto(content, codecs);
        let composite;
        if (part.composite) {
            composite = part.composite;
        }
        else {
            composite = { parts: [part] };
        }
        const bytes = proto.composite.Composite.encode(composite).finish();
        return {
            type: ContentTypeComposite,
            parameters: {},
            content: bytes,
        };
    }
    decode(content, codecs) {
        return this.fromProto({ composite: proto.composite.Composite.decode(content.content), part: undefined }, codecs);
    }
    toProto(content, codecs) {
        if ('type' in content) {
            const codec = codecs.codecFor(content.type);
            if (!codec) {
                throw new Error(`missing codec for part type ${content.type}`);
            }
            return {
                part: codec.encode(content.content, codecs),
                composite: undefined,
            };
        }
        const parts = new Array();
        for (const part of content.parts) {
            parts.push(this.toProto(part, codecs));
        }
        return { composite: { parts }, part: undefined };
    }
    fromProto(content, codecs) {
        if (content.part) {
            if (!content.part.type) {
                throw new Error('missing part content type');
            }
            const contentType = new ContentTypeId(content.part.type);
            const codec = codecs.codecFor(contentType);
            if (!codec) {
                throw new Error(`missing codec for part type ${contentType}`);
            }
            return {
                type: contentType,
                content: codec.decode(content.part, codecs),
            };
        }
        if (!content.composite) {
            throw new Error('invalid composite');
        }
        const parts = new Array();
        for (const part of content.composite.parts) {
            parts.push(this.fromProto(part, codecs));
        }
        return { parts };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fallback(content) {
        return undefined;
    }
}

exports.ApiUrls = ApiUrls;
exports.AuthCache = AuthCache;
exports.BrowserStoragePersistence = BrowserStoragePersistence;
exports.Ciphertext = Ciphertext;
exports.Client = Client;
exports.CompositeCodec = CompositeCodec;
exports.Compression = Compression;
exports.ConsentListEntry = ConsentListEntry;
exports.ContentTypeComposite = ContentTypeComposite;
exports.ContentTypeFallback = ContentTypeFallback;
exports.ContentTypeId = ContentTypeId;
exports.ContentTypeText = ContentTypeText;
exports.ConversationV1 = ConversationV1;
exports.ConversationV2 = ConversationV2;
exports.Conversations = Conversations;
exports.DecodedMessage = DecodedMessage;
exports.EncryptedPersistence = EncryptedPersistence;
exports.HttpApiClient = HttpApiClient;
exports.InMemoryKeystore = InMemoryKeystore;
exports.InMemoryPersistence = InMemoryPersistence;
exports.InvitationV1 = InvitationV1;
exports.KeyGeneratorKeystoreProvider = KeyGeneratorKeystoreProvider;
exports.LocalAuthenticator = LocalAuthenticator;
exports.MessageV1 = MessageV1;
exports.MessageV2 = MessageV2;
exports.NetworkKeystoreProvider = NetworkKeystoreProvider;
exports.PrefixedPersistence = PrefixedPersistence;
exports.PrivateKey = PrivateKey;
exports.PrivateKeyBundleV1 = PrivateKeyBundleV1;
exports.PrivateKeyBundleV2 = PrivateKeyBundleV2;
exports.PublicKey = PublicKey;
exports.PublicKeyBundle = PublicKeyBundle;
exports.SealedInvitation = SealedInvitation;
exports.Signature = Signature;
exports.SignedPublicKey = SignedPublicKey;
exports.SignedPublicKeyBundle = SignedPublicKeyBundle;
exports.SnapProvider = SnapKeystoreProvider;
exports.SortDirection = SortDirection;
exports.StaticKeystoreProvider = StaticKeystoreProvider;
exports.Stream = Stream;
exports.TextCodec = TextCodec;
exports.buildContentTopic = buildContentTopic;
exports.buildDirectMessageTopic = buildDirectMessageTopic;
exports.buildDirectMessageTopicV2 = buildDirectMessageTopicV2;
exports.buildUserContactTopic = buildUserContactTopic;
exports.buildUserIntroTopic = buildUserIntroTopic;
exports.buildUserInviteTopic = buildUserInviteTopic;
exports.buildUserPrivateStoreTopic = buildUserPrivateStoreTopic;
exports.dateToNs = dateToNs;
exports.decodeContactBundle = decodeContactBundle;
exports.decodeContent = decodeContent;
exports.decrypt = decrypt$1;
exports.defaultKeystoreProviders = defaultKeystoreProviders;
exports.encrypt = encrypt$1;
exports.fromNanoString = fromNanoString;
exports.keystoreApiDefs = apiDefs;
exports.mapPaginatedStream = mapPaginatedStream;
exports.nsToDate = nsToDate;
exports.retry = retry;
exports.snapKeystoreApiDefs = snapApiDefs;
exports.toNanoString = toNanoString;
//# sourceMappingURL=index.cjs.map
