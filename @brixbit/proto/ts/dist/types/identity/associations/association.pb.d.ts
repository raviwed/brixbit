import Long from "long";
import { Signature } from "./signature.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.identity.associations";
/** Payloads to be signed for identity associations */
/** The identifier for a member of an XID */
export interface MemberIdentifier {
    address: string | undefined;
    installationPublicKey: Uint8Array | undefined;
}
/** single member that optionally indicates the member that added them */
export interface Member {
    identifier: MemberIdentifier | undefined;
    addedByEntity?: MemberIdentifier | undefined;
}
/**
 * The first entry of any XID log. The XID must be deterministically derivable
 * from the address and nonce.
 * The recovery address defaults to the initial associated_address unless
 * there is a subsequent ChangeRecoveryAddress in the log.
 */
export interface CreateInbox {
    initialAddress: string;
    nonce: Long;
    /** Must be an addressable member */
    initialAddressSignature: Signature | undefined;
}
/**
 * Adds a new member for an XID - either an addressable member such as a
 * wallet, or an installation acting on behalf of an address.
 * A key-pair that has been associated with one role MUST not be permitted to be
 * associated with a different role.
 */
export interface AddAssociation {
    newMemberIdentifier: MemberIdentifier | undefined;
    existingMemberSignature: Signature | undefined;
    newMemberSignature: Signature | undefined;
}
/** Revokes a member from an XID. The recovery address must sign the revocation. */
export interface RevokeAssociation {
    memberToRevoke: MemberIdentifier | undefined;
    recoveryAddressSignature: Signature | undefined;
}
/**
 * Changes the recovery address for an XID. The recovery address is not required
 * to be a member of the XID. In addition to being able to add members, the
 * recovery address can also revoke members.
 */
export interface ChangeRecoveryAddress {
    newRecoveryAddress: string;
    existingRecoveryAddressSignature: Signature | undefined;
}
/** A single identity operation */
export interface IdentityAction {
    createInbox: CreateInbox | undefined;
    add: AddAssociation | undefined;
    revoke: RevokeAssociation | undefined;
    changeRecoveryAddress: ChangeRecoveryAddress | undefined;
}
/**
 * One or more identity actions that were signed together.
 * Example: [CreateXid, AddAssociation, ChangeRecoveryAddress]
 * 1. The batched signature text is created by concatenating the signature text
 *    of each association together with a separator, '\n\n\n'.
 * 2. The user signs this concatenated result.
 * 3. The resulting signature is added to each association proto where relevant.
 *    The same signature may be used for multiple associations in the array.
 */
export interface IdentityUpdate {
    actions: IdentityAction[];
    clientTimestampNs: Long;
    inboxId: string;
}
/** Map of members belonging to an inbox_id */
export interface MemberMap {
    key: MemberIdentifier | undefined;
    value: Member | undefined;
}
/** A final association state resulting from multiple `IdentityUpdates` */
export interface AssociationState {
    inboxId: string;
    members: MemberMap[];
    recoveryAddress: string;
    seenSignatures: Uint8Array[];
}
/** / state diff between two final AssociationStates */
export interface AssociationStateDiff {
    newMembers: MemberIdentifier[];
    removedMembers: MemberIdentifier[];
}
export declare const MemberIdentifier: {
    encode(message: MemberIdentifier, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MemberIdentifier;
    fromJSON(object: any): MemberIdentifier;
    toJSON(message: MemberIdentifier): unknown;
    fromPartial<I extends {
        address?: string | undefined;
        installationPublicKey?: Uint8Array | undefined;
    } & {
        address?: string | undefined;
        installationPublicKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof MemberIdentifier>]: never; }>(object: I): MemberIdentifier;
};
export declare const Member: {
    encode(message: Member, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Member;
    fromJSON(object: any): Member;
    toJSON(message: Member): unknown;
    fromPartial<I extends {
        identifier?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } | undefined;
        addedByEntity?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } | undefined;
    } & {
        identifier?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["identifier"], keyof MemberIdentifier>]: never; }) | undefined;
        addedByEntity?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K_1 in Exclude<keyof I["addedByEntity"], keyof MemberIdentifier>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Member>]: never; }>(object: I): Member;
};
export declare const CreateInbox: {
    encode(message: CreateInbox, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CreateInbox;
    fromJSON(object: any): CreateInbox;
    toJSON(message: CreateInbox): unknown;
    fromPartial<I extends {
        initialAddress?: string | undefined;
        nonce?: string | number | Long | undefined;
        initialAddressSignature?: {
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        initialAddress?: string | undefined;
        nonce?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["nonce"], keyof Long>]: never; }) | undefined;
        initialAddressSignature?: ({
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            erc191?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
            erc6492?: ({
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & {
                accountId?: string | undefined;
                blockNumber?: string | number | (Long & {
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
                } & { [K_2 in Exclude<keyof I["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & { [K_3 in Exclude<keyof I["initialAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
            installationKey?: ({
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["initialAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
            delegatedErc191?: ({
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                delegatedKey?: ({
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
                        } & { [K_5 in Exclude<keyof I["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_6 in Exclude<keyof I["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_7 in Exclude<keyof I["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_8 in Exclude<keyof I["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                signature?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_9 in Exclude<keyof I["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["initialAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["initialAddressSignature"], keyof Signature>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof CreateInbox>]: never; }>(object: I): CreateInbox;
};
export declare const AddAssociation: {
    encode(message: AddAssociation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddAssociation;
    fromJSON(object: any): AddAssociation;
    toJSON(message: AddAssociation): unknown;
    fromPartial<I extends {
        newMemberIdentifier?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } | undefined;
        existingMemberSignature?: {
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        newMemberSignature?: {
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        newMemberIdentifier?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["newMemberIdentifier"], keyof MemberIdentifier>]: never; }) | undefined;
        existingMemberSignature?: ({
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            erc191?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
            erc6492?: ({
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & {
                accountId?: string | undefined;
                blockNumber?: string | number | (Long & {
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
                } & { [K_2 in Exclude<keyof I["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & { [K_3 in Exclude<keyof I["existingMemberSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
            installationKey?: ({
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["existingMemberSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
            delegatedErc191?: ({
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                delegatedKey?: ({
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
                        } & { [K_5 in Exclude<keyof I["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_6 in Exclude<keyof I["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_7 in Exclude<keyof I["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_8 in Exclude<keyof I["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                signature?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_9 in Exclude<keyof I["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["existingMemberSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["existingMemberSignature"], keyof Signature>]: never; }) | undefined;
        newMemberSignature?: ({
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            erc191?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_12 in Exclude<keyof I["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
            erc6492?: ({
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & {
                accountId?: string | undefined;
                blockNumber?: string | number | (Long & {
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
                } & { [K_13 in Exclude<keyof I["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & { [K_14 in Exclude<keyof I["newMemberSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
            installationKey?: ({
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & { [K_15 in Exclude<keyof I["newMemberSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
            delegatedErc191?: ({
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                delegatedKey?: ({
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
                        } & { [K_16 in Exclude<keyof I["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_17 in Exclude<keyof I["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_18 in Exclude<keyof I["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_19 in Exclude<keyof I["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                signature?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_20 in Exclude<keyof I["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
            } & { [K_21 in Exclude<keyof I["newMemberSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
        } & { [K_22 in Exclude<keyof I["newMemberSignature"], keyof Signature>]: never; }) | undefined;
    } & { [K_23 in Exclude<keyof I, keyof AddAssociation>]: never; }>(object: I): AddAssociation;
};
export declare const RevokeAssociation: {
    encode(message: RevokeAssociation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RevokeAssociation;
    fromJSON(object: any): RevokeAssociation;
    toJSON(message: RevokeAssociation): unknown;
    fromPartial<I extends {
        memberToRevoke?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } | undefined;
        recoveryAddressSignature?: {
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        memberToRevoke?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["memberToRevoke"], keyof MemberIdentifier>]: never; }) | undefined;
        recoveryAddressSignature?: ({
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            erc191?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
            erc6492?: ({
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & {
                accountId?: string | undefined;
                blockNumber?: string | number | (Long & {
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
                } & { [K_2 in Exclude<keyof I["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & { [K_3 in Exclude<keyof I["recoveryAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
            installationKey?: ({
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["recoveryAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
            delegatedErc191?: ({
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                delegatedKey?: ({
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
                        } & { [K_5 in Exclude<keyof I["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_6 in Exclude<keyof I["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_7 in Exclude<keyof I["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_8 in Exclude<keyof I["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                signature?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_9 in Exclude<keyof I["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["recoveryAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["recoveryAddressSignature"], keyof Signature>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof RevokeAssociation>]: never; }>(object: I): RevokeAssociation;
};
export declare const ChangeRecoveryAddress: {
    encode(message: ChangeRecoveryAddress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChangeRecoveryAddress;
    fromJSON(object: any): ChangeRecoveryAddress;
    toJSON(message: ChangeRecoveryAddress): unknown;
    fromPartial<I extends {
        newRecoveryAddress?: string | undefined;
        existingRecoveryAddressSignature?: {
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        newRecoveryAddress?: string | undefined;
        existingRecoveryAddressSignature?: ({
            erc191?: {
                bytes?: Uint8Array | undefined;
            } | undefined;
            erc6492?: {
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } | undefined;
            installationKey?: {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } | undefined;
            delegatedErc191?: {
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            erc191?: ({
                bytes?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
            erc6492?: ({
                accountId?: string | undefined;
                blockNumber?: string | number | Long | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & {
                accountId?: string | undefined;
                blockNumber?: string | number | (Long & {
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
                } & { [K_1 in Exclude<keyof I["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                signature?: Uint8Array | undefined;
                chainRpcUrl?: string | undefined;
            } & { [K_2 in Exclude<keyof I["existingRecoveryAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
            installationKey?: ({
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                publicKey?: Uint8Array | undefined;
            } & { [K_3 in Exclude<keyof I["existingRecoveryAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
            delegatedErc191?: ({
                delegatedKey?: {
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
                signature?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
            } & {
                delegatedKey?: ({
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
                        } & { [K_4 in Exclude<keyof I["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                        walletEcdsaCompact?: ({
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            recovery?: number | undefined;
                        } & { [K_5 in Exclude<keyof I["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                    } & { [K_6 in Exclude<keyof I["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_7 in Exclude<keyof I["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                signature?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_8 in Exclude<keyof I["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
            } & { [K_9 in Exclude<keyof I["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
        } & { [K_10 in Exclude<keyof I["existingRecoveryAddressSignature"], keyof Signature>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, keyof ChangeRecoveryAddress>]: never; }>(object: I): ChangeRecoveryAddress;
};
export declare const IdentityAction: {
    encode(message: IdentityAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): IdentityAction;
    fromJSON(object: any): IdentityAction;
    toJSON(message: IdentityAction): unknown;
    fromPartial<I extends {
        createInbox?: {
            initialAddress?: string | undefined;
            nonce?: string | number | Long | undefined;
            initialAddressSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        add?: {
            newMemberIdentifier?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            existingMemberSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            newMemberSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        revoke?: {
            memberToRevoke?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            recoveryAddressSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        changeRecoveryAddress?: {
            newRecoveryAddress?: string | undefined;
            existingRecoveryAddressSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        createInbox?: ({
            initialAddress?: string | undefined;
            nonce?: string | number | Long | undefined;
            initialAddressSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            initialAddress?: string | undefined;
            nonce?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["createInbox"]["nonce"], keyof Long>]: never; }) | undefined;
            initialAddressSignature?: ({
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                erc191?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_1 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
                erc6492?: ({
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & {
                    accountId?: string | undefined;
                    blockNumber?: string | number | (Long & {
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
                    } & { [K_2 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & { [K_3 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                installationKey?: ({
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & { [K_4 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                delegatedErc191?: ({
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    delegatedKey?: ({
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
                            } & { [K_5 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_6 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_7 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_8 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                    signature?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_9 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                } & { [K_10 in Exclude<keyof I["createInbox"]["initialAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
            } & { [K_11 in Exclude<keyof I["createInbox"]["initialAddressSignature"], keyof Signature>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I["createInbox"], keyof CreateInbox>]: never; }) | undefined;
        add?: ({
            newMemberIdentifier?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            existingMemberSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            newMemberSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            newMemberIdentifier?: ({
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & { [K_13 in Exclude<keyof I["add"]["newMemberIdentifier"], keyof MemberIdentifier>]: never; }) | undefined;
            existingMemberSignature?: ({
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                erc191?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_14 in Exclude<keyof I["add"]["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
                erc6492?: ({
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & {
                    accountId?: string | undefined;
                    blockNumber?: string | number | (Long & {
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
                    } & { [K_15 in Exclude<keyof I["add"]["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & { [K_16 in Exclude<keyof I["add"]["existingMemberSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                installationKey?: ({
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & { [K_17 in Exclude<keyof I["add"]["existingMemberSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                delegatedErc191?: ({
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    delegatedKey?: ({
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
                            } & { [K_18 in Exclude<keyof I["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_19 in Exclude<keyof I["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_21 in Exclude<keyof I["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                    signature?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_22 in Exclude<keyof I["add"]["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["add"]["existingMemberSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
            } & { [K_24 in Exclude<keyof I["add"]["existingMemberSignature"], keyof Signature>]: never; }) | undefined;
            newMemberSignature?: ({
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                erc191?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_25 in Exclude<keyof I["add"]["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
                erc6492?: ({
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & {
                    accountId?: string | undefined;
                    blockNumber?: string | number | (Long & {
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
                    } & { [K_26 in Exclude<keyof I["add"]["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & { [K_27 in Exclude<keyof I["add"]["newMemberSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                installationKey?: ({
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & { [K_28 in Exclude<keyof I["add"]["newMemberSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                delegatedErc191?: ({
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    delegatedKey?: ({
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
                            } & { [K_29 in Exclude<keyof I["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_30 in Exclude<keyof I["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_31 in Exclude<keyof I["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_32 in Exclude<keyof I["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                    signature?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_33 in Exclude<keyof I["add"]["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                } & { [K_34 in Exclude<keyof I["add"]["newMemberSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
            } & { [K_35 in Exclude<keyof I["add"]["newMemberSignature"], keyof Signature>]: never; }) | undefined;
        } & { [K_36 in Exclude<keyof I["add"], keyof AddAssociation>]: never; }) | undefined;
        revoke?: ({
            memberToRevoke?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            recoveryAddressSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            memberToRevoke?: ({
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & { [K_37 in Exclude<keyof I["revoke"]["memberToRevoke"], keyof MemberIdentifier>]: never; }) | undefined;
            recoveryAddressSignature?: ({
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                erc191?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_38 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
                erc6492?: ({
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & {
                    accountId?: string | undefined;
                    blockNumber?: string | number | (Long & {
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
                    } & { [K_39 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & { [K_40 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                installationKey?: ({
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & { [K_41 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                delegatedErc191?: ({
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    delegatedKey?: ({
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
                            } & { [K_42 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_43 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_44 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_45 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                    signature?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_46 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                } & { [K_47 in Exclude<keyof I["revoke"]["recoveryAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
            } & { [K_48 in Exclude<keyof I["revoke"]["recoveryAddressSignature"], keyof Signature>]: never; }) | undefined;
        } & { [K_49 in Exclude<keyof I["revoke"], keyof RevokeAssociation>]: never; }) | undefined;
        changeRecoveryAddress?: ({
            newRecoveryAddress?: string | undefined;
            existingRecoveryAddressSignature?: {
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            newRecoveryAddress?: string | undefined;
            existingRecoveryAddressSignature?: ({
                erc191?: {
                    bytes?: Uint8Array | undefined;
                } | undefined;
                erc6492?: {
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } | undefined;
                installationKey?: {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } | undefined;
                delegatedErc191?: {
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
            } & {
                erc191?: ({
                    bytes?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                } & { [K_50 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
                erc6492?: ({
                    accountId?: string | undefined;
                    blockNumber?: string | number | Long | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & {
                    accountId?: string | undefined;
                    blockNumber?: string | number | (Long & {
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
                    } & { [K_51 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                    signature?: Uint8Array | undefined;
                    chainRpcUrl?: string | undefined;
                } & { [K_52 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                installationKey?: ({
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & {
                    bytes?: Uint8Array | undefined;
                    publicKey?: Uint8Array | undefined;
                } & { [K_53 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                delegatedErc191?: ({
                    delegatedKey?: {
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
                    signature?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    delegatedKey?: ({
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
                            } & { [K_54 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                            walletEcdsaCompact?: ({
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                recovery?: number | undefined;
                            } & { [K_55 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                        } & { [K_56 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_57 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                    signature?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_58 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                } & { [K_59 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
            } & { [K_60 in Exclude<keyof I["changeRecoveryAddress"]["existingRecoveryAddressSignature"], keyof Signature>]: never; }) | undefined;
        } & { [K_61 in Exclude<keyof I["changeRecoveryAddress"], keyof ChangeRecoveryAddress>]: never; }) | undefined;
    } & { [K_62 in Exclude<keyof I, keyof IdentityAction>]: never; }>(object: I): IdentityAction;
};
export declare const IdentityUpdate: {
    encode(message: IdentityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): IdentityUpdate;
    fromJSON(object: any): IdentityUpdate;
    toJSON(message: IdentityUpdate): unknown;
    fromPartial<I extends {
        actions?: {
            createInbox?: {
                initialAddress?: string | undefined;
                nonce?: string | number | Long | undefined;
                initialAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            add?: {
                newMemberIdentifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                existingMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                newMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            revoke?: {
                memberToRevoke?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                recoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            changeRecoveryAddress?: {
                newRecoveryAddress?: string | undefined;
                existingRecoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        clientTimestampNs?: string | number | Long | undefined;
        inboxId?: string | undefined;
    } & {
        actions?: ({
            createInbox?: {
                initialAddress?: string | undefined;
                nonce?: string | number | Long | undefined;
                initialAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            add?: {
                newMemberIdentifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                existingMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                newMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            revoke?: {
                memberToRevoke?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                recoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            changeRecoveryAddress?: {
                newRecoveryAddress?: string | undefined;
                existingRecoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        }[] & ({
            createInbox?: {
                initialAddress?: string | undefined;
                nonce?: string | number | Long | undefined;
                initialAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            add?: {
                newMemberIdentifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                existingMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                newMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            revoke?: {
                memberToRevoke?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                recoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            changeRecoveryAddress?: {
                newRecoveryAddress?: string | undefined;
                existingRecoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } & {
            createInbox?: ({
                initialAddress?: string | undefined;
                nonce?: string | number | Long | undefined;
                initialAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } & {
                initialAddress?: string | undefined;
                nonce?: string | number | (Long & {
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
                } & { [K in Exclude<keyof I["actions"][number]["createInbox"]["nonce"], keyof Long>]: never; }) | undefined;
                initialAddressSignature?: ({
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    erc191?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_1 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
                    erc6492?: ({
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & {
                        accountId?: string | undefined;
                        blockNumber?: string | number | (Long & {
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
                        } & { [K_2 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & { [K_3 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                    installationKey?: ({
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & { [K_4 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                    delegatedErc191?: ({
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        delegatedKey?: ({
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
                                } & { [K_5 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_6 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_7 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                        } & { [K_8 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                        signature?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_9 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                    } & { [K_10 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                } & { [K_11 in Exclude<keyof I["actions"][number]["createInbox"]["initialAddressSignature"], keyof Signature>]: never; }) | undefined;
            } & { [K_12 in Exclude<keyof I["actions"][number]["createInbox"], keyof CreateInbox>]: never; }) | undefined;
            add?: ({
                newMemberIdentifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                existingMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                newMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } & {
                newMemberIdentifier?: ({
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & { [K_13 in Exclude<keyof I["actions"][number]["add"]["newMemberIdentifier"], keyof MemberIdentifier>]: never; }) | undefined;
                existingMemberSignature?: ({
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    erc191?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_14 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
                    erc6492?: ({
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & {
                        accountId?: string | undefined;
                        blockNumber?: string | number | (Long & {
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
                        } & { [K_15 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & { [K_16 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                    installationKey?: ({
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & { [K_17 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                    delegatedErc191?: ({
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        delegatedKey?: ({
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
                                } & { [K_18 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_19 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_20 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                        } & { [K_21 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                        signature?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_22 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                    } & { [K_23 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                } & { [K_24 in Exclude<keyof I["actions"][number]["add"]["existingMemberSignature"], keyof Signature>]: never; }) | undefined;
                newMemberSignature?: ({
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    erc191?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_25 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
                    erc6492?: ({
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & {
                        accountId?: string | undefined;
                        blockNumber?: string | number | (Long & {
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
                        } & { [K_26 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & { [K_27 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                    installationKey?: ({
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & { [K_28 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                    delegatedErc191?: ({
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        delegatedKey?: ({
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
                                } & { [K_29 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_30 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_31 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                        } & { [K_32 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                        signature?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_33 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                    } & { [K_34 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                } & { [K_35 in Exclude<keyof I["actions"][number]["add"]["newMemberSignature"], keyof Signature>]: never; }) | undefined;
            } & { [K_36 in Exclude<keyof I["actions"][number]["add"], keyof AddAssociation>]: never; }) | undefined;
            revoke?: ({
                memberToRevoke?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                recoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } & {
                memberToRevoke?: ({
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & { [K_37 in Exclude<keyof I["actions"][number]["revoke"]["memberToRevoke"], keyof MemberIdentifier>]: never; }) | undefined;
                recoveryAddressSignature?: ({
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    erc191?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_38 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
                    erc6492?: ({
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & {
                        accountId?: string | undefined;
                        blockNumber?: string | number | (Long & {
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
                        } & { [K_39 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & { [K_40 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                    installationKey?: ({
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & { [K_41 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                    delegatedErc191?: ({
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        delegatedKey?: ({
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
                                } & { [K_42 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_43 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_44 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                        } & { [K_45 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                        signature?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_46 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                    } & { [K_47 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                } & { [K_48 in Exclude<keyof I["actions"][number]["revoke"]["recoveryAddressSignature"], keyof Signature>]: never; }) | undefined;
            } & { [K_49 in Exclude<keyof I["actions"][number]["revoke"], keyof RevokeAssociation>]: never; }) | undefined;
            changeRecoveryAddress?: ({
                newRecoveryAddress?: string | undefined;
                existingRecoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } & {
                newRecoveryAddress?: string | undefined;
                existingRecoveryAddressSignature?: ({
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    erc191?: ({
                        bytes?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                    } & { [K_50 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
                    erc6492?: ({
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & {
                        accountId?: string | undefined;
                        blockNumber?: string | number | (Long & {
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
                        } & { [K_51 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } & { [K_52 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"], keyof import("./signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                    installationKey?: ({
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } & { [K_53 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["installationKey"], keyof import("./signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
                    delegatedErc191?: ({
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        delegatedKey?: ({
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
                                } & { [K_54 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                walletEcdsaCompact?: ({
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                    recovery?: number | undefined;
                                } & { [K_55 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                            } & { [K_56 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                        } & { [K_57 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                        signature?: ({
                            bytes?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                        } & { [K_58 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                    } & { [K_59 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("./signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                } & { [K_60 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"], keyof Signature>]: never; }) | undefined;
            } & { [K_61 in Exclude<keyof I["actions"][number]["changeRecoveryAddress"], keyof ChangeRecoveryAddress>]: never; }) | undefined;
        } & { [K_62 in Exclude<keyof I["actions"][number], keyof IdentityAction>]: never; })[] & { [K_63 in Exclude<keyof I["actions"], keyof {
            createInbox?: {
                initialAddress?: string | undefined;
                nonce?: string | number | Long | undefined;
                initialAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            add?: {
                newMemberIdentifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                existingMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                newMemberSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            revoke?: {
                memberToRevoke?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                recoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            changeRecoveryAddress?: {
                newRecoveryAddress?: string | undefined;
                existingRecoveryAddressSignature?: {
                    erc191?: {
                        bytes?: Uint8Array | undefined;
                    } | undefined;
                    erc6492?: {
                        accountId?: string | undefined;
                        blockNumber?: string | number | Long | undefined;
                        signature?: Uint8Array | undefined;
                        chainRpcUrl?: string | undefined;
                    } | undefined;
                    installationKey?: {
                        bytes?: Uint8Array | undefined;
                        publicKey?: Uint8Array | undefined;
                    } | undefined;
                    delegatedErc191?: {
                        delegatedKey?: {
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
                        signature?: {
                            bytes?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        clientTimestampNs?: string | number | (Long & {
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
        } & { [K_64 in Exclude<keyof I["clientTimestampNs"], keyof Long>]: never; }) | undefined;
        inboxId?: string | undefined;
    } & { [K_65 in Exclude<keyof I, keyof IdentityUpdate>]: never; }>(object: I): IdentityUpdate;
};
export declare const MemberMap: {
    encode(message: MemberMap, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MemberMap;
    fromJSON(object: any): MemberMap;
    toJSON(message: MemberMap): unknown;
    fromPartial<I extends {
        key?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } | undefined;
        value?: {
            identifier?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            addedByEntity?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
    } & {
        key?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["key"], keyof MemberIdentifier>]: never; }) | undefined;
        value?: ({
            identifier?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            addedByEntity?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
        } & {
            identifier?: ({
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["value"]["identifier"], keyof MemberIdentifier>]: never; }) | undefined;
            addedByEntity?: ({
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["value"]["addedByEntity"], keyof MemberIdentifier>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["value"], keyof Member>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof MemberMap>]: never; }>(object: I): MemberMap;
};
export declare const AssociationState: {
    encode(message: AssociationState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AssociationState;
    fromJSON(object: any): AssociationState;
    toJSON(message: AssociationState): unknown;
    fromPartial<I extends {
        inboxId?: string | undefined;
        members?: {
            key?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            value?: {
                identifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                addedByEntity?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        recoveryAddress?: string | undefined;
        seenSignatures?: Uint8Array[] | undefined;
    } & {
        inboxId?: string | undefined;
        members?: ({
            key?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            value?: {
                identifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                addedByEntity?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        }[] & ({
            key?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            value?: {
                identifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                addedByEntity?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        } & {
            key?: ({
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["members"][number]["key"], keyof MemberIdentifier>]: never; }) | undefined;
            value?: ({
                identifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                addedByEntity?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
            } & {
                identifier?: ({
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & { [K_1 in Exclude<keyof I["members"][number]["value"]["identifier"], keyof MemberIdentifier>]: never; }) | undefined;
                addedByEntity?: ({
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["members"][number]["value"]["addedByEntity"], keyof MemberIdentifier>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["members"][number]["value"], keyof Member>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["members"][number], keyof MemberMap>]: never; })[] & { [K_5 in Exclude<keyof I["members"], keyof {
            key?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            } | undefined;
            value?: {
                identifier?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
                addedByEntity?: {
                    address?: string | undefined;
                    installationPublicKey?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        recoveryAddress?: string | undefined;
        seenSignatures?: (Uint8Array[] & Uint8Array[] & { [K_6 in Exclude<keyof I["seenSignatures"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof AssociationState>]: never; }>(object: I): AssociationState;
};
export declare const AssociationStateDiff: {
    encode(message: AssociationStateDiff, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AssociationStateDiff;
    fromJSON(object: any): AssociationStateDiff;
    toJSON(message: AssociationStateDiff): unknown;
    fromPartial<I extends {
        newMembers?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        }[] | undefined;
        removedMembers?: {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        newMembers?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        }[] & ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["newMembers"][number], keyof MemberIdentifier>]: never; })[] & { [K_1 in Exclude<keyof I["newMembers"], keyof {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
        removedMembers?: ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        }[] & ({
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["removedMembers"][number], keyof MemberIdentifier>]: never; })[] & { [K_3 in Exclude<keyof I["removedMembers"], keyof {
            address?: string | undefined;
            installationPublicKey?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof AssociationStateDiff>]: never; }>(object: I): AssociationStateDiff;
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
