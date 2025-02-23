import Long from "long";
import { Signature } from "../../../message_contents/signature.pb";
import { Empty } from "../../../google/protobuf/empty.pb";
import { Observable } from "rxjs";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.api.v1";
/** Message API */
/** Sort direction for queries */
export declare enum SortDirection {
    SORT_DIRECTION_UNSPECIFIED = 0,
    SORT_DIRECTION_ASCENDING = 1,
    SORT_DIRECTION_DESCENDING = 2,
    UNRECOGNIZED = -1
}
export declare function sortDirectionFromJSON(object: any): SortDirection;
export declare function sortDirectionToJSON(object: SortDirection): string;
/** Full representation of a welcome message */
export interface WelcomeMessage {
    v1: WelcomeMessage_V1 | undefined;
}
/** Version 1 of the WelcomeMessage format */
export interface WelcomeMessage_V1 {
    id: Long;
    createdNs: Long;
    installationKey: Uint8Array;
    data: Uint8Array;
    hpkePublicKey: Uint8Array;
}
/** Input type for a welcome message */
export interface WelcomeMessageInput {
    v1: WelcomeMessageInput_V1 | undefined;
}
/** Version 1 of the WelcomeMessageInput format */
export interface WelcomeMessageInput_V1 {
    installationKey: Uint8Array;
    data: Uint8Array;
    hpkePublicKey: Uint8Array;
}
/** Full representation of a group message */
export interface GroupMessage {
    v1: GroupMessage_V1 | undefined;
}
/** Version 1 of the GroupMessage format */
export interface GroupMessage_V1 {
    id: Long;
    createdNs: Long;
    groupId: Uint8Array;
    data: Uint8Array;
    senderHmac: Uint8Array;
}
/** Input type for a group message */
export interface GroupMessageInput {
    v1: GroupMessageInput_V1 | undefined;
}
/** Version 1 of the GroupMessageInput payload format */
export interface GroupMessageInput_V1 {
    data: Uint8Array;
    senderHmac: Uint8Array;
}
/** Send a batch of MLS messages */
export interface SendGroupMessagesRequest {
    messages: GroupMessageInput[];
}
/** Send a batch of welcome messages */
export interface SendWelcomeMessagesRequest {
    messages: WelcomeMessageInput[];
}
/** A wrapper around the Key Package bytes */
export interface KeyPackageUpload {
    /**
     * The owner's wallet address would be extracted from the identity
     * credential in the key package, and all signatures would be validated.
     */
    keyPackageTlsSerialized: Uint8Array;
}
/** Register a new installation */
export interface RegisterInstallationRequest {
    /** The Key Package contains all information needed to register an installation */
    keyPackage: KeyPackageUpload | undefined;
    isInboxIdCredential: boolean;
}
/** The response to a RegisterInstallationRequest */
export interface RegisterInstallationResponse {
    installationKey: Uint8Array;
}
/** Upload a new key packages */
export interface UploadKeyPackageRequest {
    /** An individual key package upload request */
    keyPackage: KeyPackageUpload | undefined;
    isInboxIdCredential: boolean;
}
/** Fetch one or more key packages */
export interface FetchKeyPackagesRequest {
    /**
     * The caller can provide an array of installation keys, and the API
     * will return one key package for each installation associated with each
     * installation key
     */
    installationKeys: Uint8Array[];
}
/** The response to a FetchKeyPackagesRequest */
export interface FetchKeyPackagesResponse {
    /**
     * Returns one key package per installation in the original order of the
     * request. If any installations are missing key packages, an empty entry is
     * left in their respective spots in the array.
     */
    keyPackages: FetchKeyPackagesResponse_KeyPackage[];
}
/** An individual key package */
export interface FetchKeyPackagesResponse_KeyPackage {
    keyPackageTlsSerialized: Uint8Array;
}
/** Revoke an installation */
export interface RevokeInstallationRequest {
    installationKey: Uint8Array;
    /**
     * All revocations must be validated with a wallet signature over the
     * installation_id being revoked (and some sort of standard prologue)
     */
    walletSignature: Signature | undefined;
}
/** Get all updates for an identity since the specified time */
export interface GetIdentityUpdatesRequest {
    accountAddresses: string[];
    startTimeNs: Long;
}
/** Used to get any new or revoked installations for a list of wallet addresses */
export interface GetIdentityUpdatesResponse {
    /**
     * A list of updates (or empty objects if no changes) in the original order
     * of the request
     */
    updates: GetIdentityUpdatesResponse_WalletUpdates[];
}
/** A new installation key was seen for the first time by the nodes */
export interface GetIdentityUpdatesResponse_NewInstallationUpdate {
    installationKey: Uint8Array;
    credentialIdentity: Uint8Array;
}
/** An installation was revoked */
export interface GetIdentityUpdatesResponse_RevokedInstallationUpdate {
    installationKey: Uint8Array;
}
/** A wrapper for any update to the wallet */
export interface GetIdentityUpdatesResponse_Update {
    timestampNs: Long;
    newInstallation: GetIdentityUpdatesResponse_NewInstallationUpdate | undefined;
    revokedInstallation: GetIdentityUpdatesResponse_RevokedInstallationUpdate | undefined;
}
/** A wrapper for the updates for a single wallet */
export interface GetIdentityUpdatesResponse_WalletUpdates {
    updates: GetIdentityUpdatesResponse_Update[];
}
/** Pagination config for queries */
export interface PagingInfo {
    direction: SortDirection;
    limit: number;
    idCursor: Long;
}
/** Request for group message queries */
export interface QueryGroupMessagesRequest {
    groupId: Uint8Array;
    pagingInfo: PagingInfo | undefined;
}
/** Response for group message queries */
export interface QueryGroupMessagesResponse {
    messages: GroupMessage[];
    pagingInfo: PagingInfo | undefined;
}
/** Request for welcome message queries */
export interface QueryWelcomeMessagesRequest {
    installationKey: Uint8Array;
    pagingInfo: PagingInfo | undefined;
}
/** Response for welcome message queries */
export interface QueryWelcomeMessagesResponse {
    messages: WelcomeMessage[];
    pagingInfo: PagingInfo | undefined;
}
/** Request for subscribing to group messages */
export interface SubscribeGroupMessagesRequest {
    filters: SubscribeGroupMessagesRequest_Filter[];
}
/** Subscription filter */
export interface SubscribeGroupMessagesRequest_Filter {
    groupId: Uint8Array;
    idCursor: Long;
}
/** Request for subscribing to welcome messages */
export interface SubscribeWelcomeMessagesRequest {
    filters: SubscribeWelcomeMessagesRequest_Filter[];
}
/** Subscription filter */
export interface SubscribeWelcomeMessagesRequest_Filter {
    installationKey: Uint8Array;
    idCursor: Long;
}
export declare const WelcomeMessage: {
    encode(message: WelcomeMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WelcomeMessage;
    fromJSON(object: any): WelcomeMessage;
    toJSON(message: WelcomeMessage): unknown;
    fromPartial<I extends {
        v1?: {
            id?: string | number | Long | undefined;
            createdNs?: string | number | Long | undefined;
            installationKey?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } | undefined;
    } & {
        v1?: ({
            id?: string | number | Long | undefined;
            createdNs?: string | number | Long | undefined;
            installationKey?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } & {
            id?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["v1"]["id"], keyof Long>]: never; }) | undefined;
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
            } & { [K_1 in Exclude<keyof I["v1"]["createdNs"], keyof Long>]: never; }) | undefined;
            installationKey?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["v1"], keyof WelcomeMessage_V1>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "v1">]: never; }>(object: I): WelcomeMessage;
};
export declare const WelcomeMessage_V1: {
    encode(message: WelcomeMessage_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WelcomeMessage_V1;
    fromJSON(object: any): WelcomeMessage_V1;
    toJSON(message: WelcomeMessage_V1): unknown;
    fromPartial<I extends {
        id?: string | number | Long | undefined;
        createdNs?: string | number | Long | undefined;
        installationKey?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        hpkePublicKey?: Uint8Array | undefined;
    } & {
        id?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["id"], keyof Long>]: never; }) | undefined;
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
        } & { [K_1 in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
        installationKey?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        hpkePublicKey?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof WelcomeMessage_V1>]: never; }>(object: I): WelcomeMessage_V1;
};
export declare const WelcomeMessageInput: {
    encode(message: WelcomeMessageInput, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WelcomeMessageInput;
    fromJSON(object: any): WelcomeMessageInput;
    toJSON(message: WelcomeMessageInput): unknown;
    fromPartial<I extends {
        v1?: {
            installationKey?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } | undefined;
    } & {
        v1?: ({
            installationKey?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } & {
            installationKey?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["v1"], keyof WelcomeMessageInput_V1>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "v1">]: never; }>(object: I): WelcomeMessageInput;
};
export declare const WelcomeMessageInput_V1: {
    encode(message: WelcomeMessageInput_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WelcomeMessageInput_V1;
    fromJSON(object: any): WelcomeMessageInput_V1;
    toJSON(message: WelcomeMessageInput_V1): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        hpkePublicKey?: Uint8Array | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        hpkePublicKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof WelcomeMessageInput_V1>]: never; }>(object: I): WelcomeMessageInput_V1;
};
export declare const GroupMessage: {
    encode(message: GroupMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMessage;
    fromJSON(object: any): GroupMessage;
    toJSON(message: GroupMessage): unknown;
    fromPartial<I extends {
        v1?: {
            id?: string | number | Long | undefined;
            createdNs?: string | number | Long | undefined;
            groupId?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            senderHmac?: Uint8Array | undefined;
        } | undefined;
    } & {
        v1?: ({
            id?: string | number | Long | undefined;
            createdNs?: string | number | Long | undefined;
            groupId?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            senderHmac?: Uint8Array | undefined;
        } & {
            id?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["v1"]["id"], keyof Long>]: never; }) | undefined;
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
            } & { [K_1 in Exclude<keyof I["v1"]["createdNs"], keyof Long>]: never; }) | undefined;
            groupId?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
            senderHmac?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["v1"], keyof GroupMessage_V1>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "v1">]: never; }>(object: I): GroupMessage;
};
export declare const GroupMessage_V1: {
    encode(message: GroupMessage_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMessage_V1;
    fromJSON(object: any): GroupMessage_V1;
    toJSON(message: GroupMessage_V1): unknown;
    fromPartial<I extends {
        id?: string | number | Long | undefined;
        createdNs?: string | number | Long | undefined;
        groupId?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        senderHmac?: Uint8Array | undefined;
    } & {
        id?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["id"], keyof Long>]: never; }) | undefined;
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
        } & { [K_1 in Exclude<keyof I["createdNs"], keyof Long>]: never; }) | undefined;
        groupId?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        senderHmac?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof GroupMessage_V1>]: never; }>(object: I): GroupMessage_V1;
};
export declare const GroupMessageInput: {
    encode(message: GroupMessageInput, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMessageInput;
    fromJSON(object: any): GroupMessageInput;
    toJSON(message: GroupMessageInput): unknown;
    fromPartial<I extends {
        v1?: {
            data?: Uint8Array | undefined;
            senderHmac?: Uint8Array | undefined;
        } | undefined;
    } & {
        v1?: ({
            data?: Uint8Array | undefined;
            senderHmac?: Uint8Array | undefined;
        } & {
            data?: Uint8Array | undefined;
            senderHmac?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["v1"], keyof GroupMessageInput_V1>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "v1">]: never; }>(object: I): GroupMessageInput;
};
export declare const GroupMessageInput_V1: {
    encode(message: GroupMessageInput_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMessageInput_V1;
    fromJSON(object: any): GroupMessageInput_V1;
    toJSON(message: GroupMessageInput_V1): unknown;
    fromPartial<I extends {
        data?: Uint8Array | undefined;
        senderHmac?: Uint8Array | undefined;
    } & {
        data?: Uint8Array | undefined;
        senderHmac?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof GroupMessageInput_V1>]: never; }>(object: I): GroupMessageInput_V1;
};
export declare const SendGroupMessagesRequest: {
    encode(message: SendGroupMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SendGroupMessagesRequest;
    fromJSON(object: any): SendGroupMessagesRequest;
    toJSON(message: SendGroupMessagesRequest): unknown;
    fromPartial<I extends {
        messages?: {
            v1?: {
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        messages?: ({
            v1?: {
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        }[] & ({
            v1?: {
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        } & {
            v1?: ({
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } & {
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["messages"][number]["v1"], keyof GroupMessageInput_V1>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["messages"][number], "v1">]: never; })[] & { [K_2 in Exclude<keyof I["messages"], keyof {
            v1?: {
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "messages">]: never; }>(object: I): SendGroupMessagesRequest;
};
export declare const SendWelcomeMessagesRequest: {
    encode(message: SendWelcomeMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SendWelcomeMessagesRequest;
    fromJSON(object: any): SendWelcomeMessagesRequest;
    toJSON(message: SendWelcomeMessagesRequest): unknown;
    fromPartial<I extends {
        messages?: {
            v1?: {
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        messages?: ({
            v1?: {
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        }[] & ({
            v1?: {
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        } & {
            v1?: ({
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } & {
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["messages"][number]["v1"], keyof WelcomeMessageInput_V1>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["messages"][number], "v1">]: never; })[] & { [K_2 in Exclude<keyof I["messages"], keyof {
            v1?: {
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "messages">]: never; }>(object: I): SendWelcomeMessagesRequest;
};
export declare const KeyPackageUpload: {
    encode(message: KeyPackageUpload, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): KeyPackageUpload;
    fromJSON(object: any): KeyPackageUpload;
    toJSON(message: KeyPackageUpload): unknown;
    fromPartial<I extends {
        keyPackageTlsSerialized?: Uint8Array | undefined;
    } & {
        keyPackageTlsSerialized?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "keyPackageTlsSerialized">]: never; }>(object: I): KeyPackageUpload;
};
export declare const RegisterInstallationRequest: {
    encode(message: RegisterInstallationRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RegisterInstallationRequest;
    fromJSON(object: any): RegisterInstallationRequest;
    toJSON(message: RegisterInstallationRequest): unknown;
    fromPartial<I extends {
        keyPackage?: {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } | undefined;
        isInboxIdCredential?: boolean | undefined;
    } & {
        keyPackage?: ({
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } & {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["keyPackage"], "keyPackageTlsSerialized">]: never; }) | undefined;
        isInboxIdCredential?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, keyof RegisterInstallationRequest>]: never; }>(object: I): RegisterInstallationRequest;
};
export declare const RegisterInstallationResponse: {
    encode(message: RegisterInstallationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RegisterInstallationResponse;
    fromJSON(object: any): RegisterInstallationResponse;
    toJSON(message: RegisterInstallationResponse): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "installationKey">]: never; }>(object: I): RegisterInstallationResponse;
};
export declare const UploadKeyPackageRequest: {
    encode(message: UploadKeyPackageRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UploadKeyPackageRequest;
    fromJSON(object: any): UploadKeyPackageRequest;
    toJSON(message: UploadKeyPackageRequest): unknown;
    fromPartial<I extends {
        keyPackage?: {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } | undefined;
        isInboxIdCredential?: boolean | undefined;
    } & {
        keyPackage?: ({
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } & {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["keyPackage"], "keyPackageTlsSerialized">]: never; }) | undefined;
        isInboxIdCredential?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, keyof UploadKeyPackageRequest>]: never; }>(object: I): UploadKeyPackageRequest;
};
export declare const FetchKeyPackagesRequest: {
    encode(message: FetchKeyPackagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FetchKeyPackagesRequest;
    fromJSON(object: any): FetchKeyPackagesRequest;
    toJSON(message: FetchKeyPackagesRequest): unknown;
    fromPartial<I extends {
        installationKeys?: Uint8Array[] | undefined;
    } & {
        installationKeys?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["installationKeys"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "installationKeys">]: never; }>(object: I): FetchKeyPackagesRequest;
};
export declare const FetchKeyPackagesResponse: {
    encode(message: FetchKeyPackagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FetchKeyPackagesResponse;
    fromJSON(object: any): FetchKeyPackagesResponse;
    toJSON(message: FetchKeyPackagesResponse): unknown;
    fromPartial<I extends {
        keyPackages?: {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        keyPackages?: ({
            keyPackageTlsSerialized?: Uint8Array | undefined;
        }[] & ({
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } & {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["keyPackages"][number], "keyPackageTlsSerialized">]: never; })[] & { [K_1 in Exclude<keyof I["keyPackages"], keyof {
            keyPackageTlsSerialized?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "keyPackages">]: never; }>(object: I): FetchKeyPackagesResponse;
};
export declare const FetchKeyPackagesResponse_KeyPackage: {
    encode(message: FetchKeyPackagesResponse_KeyPackage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FetchKeyPackagesResponse_KeyPackage;
    fromJSON(object: any): FetchKeyPackagesResponse_KeyPackage;
    toJSON(message: FetchKeyPackagesResponse_KeyPackage): unknown;
    fromPartial<I extends {
        keyPackageTlsSerialized?: Uint8Array | undefined;
    } & {
        keyPackageTlsSerialized?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "keyPackageTlsSerialized">]: never; }>(object: I): FetchKeyPackagesResponse_KeyPackage;
};
export declare const RevokeInstallationRequest: {
    encode(message: RevokeInstallationRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RevokeInstallationRequest;
    fromJSON(object: any): RevokeInstallationRequest;
    toJSON(message: RevokeInstallationRequest): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        walletSignature?: {
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
        installationKey?: Uint8Array | undefined;
        walletSignature?: ({
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
            } & { [K in Exclude<keyof I["walletSignature"]["ecdsaCompact"], keyof import("../../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
            walletEcdsaCompact?: ({
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & {
                bytes?: Uint8Array | undefined;
                recovery?: number | undefined;
            } & { [K_1 in Exclude<keyof I["walletSignature"]["walletEcdsaCompact"], keyof import("../../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["walletSignature"], keyof Signature>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof RevokeInstallationRequest>]: never; }>(object: I): RevokeInstallationRequest;
};
export declare const GetIdentityUpdatesRequest: {
    encode(message: GetIdentityUpdatesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetIdentityUpdatesRequest;
    fromJSON(object: any): GetIdentityUpdatesRequest;
    toJSON(message: GetIdentityUpdatesRequest): unknown;
    fromPartial<I extends {
        accountAddresses?: string[] | undefined;
        startTimeNs?: string | number | Long | undefined;
    } & {
        accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["accountAddresses"], keyof string[]>]: never; }) | undefined;
        startTimeNs?: string | number | (Long & {
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
        } & { [K_1 in Exclude<keyof I["startTimeNs"], keyof Long>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof GetIdentityUpdatesRequest>]: never; }>(object: I): GetIdentityUpdatesRequest;
};
export declare const GetIdentityUpdatesResponse: {
    encode(message: GetIdentityUpdatesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetIdentityUpdatesResponse;
    fromJSON(object: any): GetIdentityUpdatesResponse;
    toJSON(message: GetIdentityUpdatesResponse): unknown;
    fromPartial<I extends {
        updates?: {
            updates?: {
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        updates?: ({
            updates?: {
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
        }[] & ({
            updates?: {
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
        } & {
            updates?: ({
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
            }[] & ({
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
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
                } & { [K in Exclude<keyof I["updates"][number]["updates"][number]["timestampNs"], keyof Long>]: never; }) | undefined;
                newInstallation?: ({
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } & {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } & { [K_1 in Exclude<keyof I["updates"][number]["updates"][number]["newInstallation"], keyof GetIdentityUpdatesResponse_NewInstallationUpdate>]: never; }) | undefined;
                revokedInstallation?: ({
                    installationKey?: Uint8Array | undefined;
                } & {
                    installationKey?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["updates"][number]["updates"][number]["revokedInstallation"], "installationKey">]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["updates"][number]["updates"][number], keyof GetIdentityUpdatesResponse_Update>]: never; })[] & { [K_4 in Exclude<keyof I["updates"][number]["updates"], keyof {
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["updates"][number], "updates">]: never; })[] & { [K_6 in Exclude<keyof I["updates"], keyof {
            updates?: {
                timestampNs?: string | number | Long | undefined;
                newInstallation?: {
                    installationKey?: Uint8Array | undefined;
                    credentialIdentity?: Uint8Array | undefined;
                } | undefined;
                revokedInstallation?: {
                    installationKey?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, "updates">]: never; }>(object: I): GetIdentityUpdatesResponse;
};
export declare const GetIdentityUpdatesResponse_NewInstallationUpdate: {
    encode(message: GetIdentityUpdatesResponse_NewInstallationUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetIdentityUpdatesResponse_NewInstallationUpdate;
    fromJSON(object: any): GetIdentityUpdatesResponse_NewInstallationUpdate;
    toJSON(message: GetIdentityUpdatesResponse_NewInstallationUpdate): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        credentialIdentity?: Uint8Array | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
        credentialIdentity?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof GetIdentityUpdatesResponse_NewInstallationUpdate>]: never; }>(object: I): GetIdentityUpdatesResponse_NewInstallationUpdate;
};
export declare const GetIdentityUpdatesResponse_RevokedInstallationUpdate: {
    encode(message: GetIdentityUpdatesResponse_RevokedInstallationUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetIdentityUpdatesResponse_RevokedInstallationUpdate;
    fromJSON(object: any): GetIdentityUpdatesResponse_RevokedInstallationUpdate;
    toJSON(message: GetIdentityUpdatesResponse_RevokedInstallationUpdate): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "installationKey">]: never; }>(object: I): GetIdentityUpdatesResponse_RevokedInstallationUpdate;
};
export declare const GetIdentityUpdatesResponse_Update: {
    encode(message: GetIdentityUpdatesResponse_Update, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetIdentityUpdatesResponse_Update;
    fromJSON(object: any): GetIdentityUpdatesResponse_Update;
    toJSON(message: GetIdentityUpdatesResponse_Update): unknown;
    fromPartial<I extends {
        timestampNs?: string | number | Long | undefined;
        newInstallation?: {
            installationKey?: Uint8Array | undefined;
            credentialIdentity?: Uint8Array | undefined;
        } | undefined;
        revokedInstallation?: {
            installationKey?: Uint8Array | undefined;
        } | undefined;
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
        newInstallation?: ({
            installationKey?: Uint8Array | undefined;
            credentialIdentity?: Uint8Array | undefined;
        } & {
            installationKey?: Uint8Array | undefined;
            credentialIdentity?: Uint8Array | undefined;
        } & { [K_1 in Exclude<keyof I["newInstallation"], keyof GetIdentityUpdatesResponse_NewInstallationUpdate>]: never; }) | undefined;
        revokedInstallation?: ({
            installationKey?: Uint8Array | undefined;
        } & {
            installationKey?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["revokedInstallation"], "installationKey">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof GetIdentityUpdatesResponse_Update>]: never; }>(object: I): GetIdentityUpdatesResponse_Update;
};
export declare const GetIdentityUpdatesResponse_WalletUpdates: {
    encode(message: GetIdentityUpdatesResponse_WalletUpdates, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetIdentityUpdatesResponse_WalletUpdates;
    fromJSON(object: any): GetIdentityUpdatesResponse_WalletUpdates;
    toJSON(message: GetIdentityUpdatesResponse_WalletUpdates): unknown;
    fromPartial<I extends {
        updates?: {
            timestampNs?: string | number | Long | undefined;
            newInstallation?: {
                installationKey?: Uint8Array | undefined;
                credentialIdentity?: Uint8Array | undefined;
            } | undefined;
            revokedInstallation?: {
                installationKey?: Uint8Array | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        updates?: ({
            timestampNs?: string | number | Long | undefined;
            newInstallation?: {
                installationKey?: Uint8Array | undefined;
                credentialIdentity?: Uint8Array | undefined;
            } | undefined;
            revokedInstallation?: {
                installationKey?: Uint8Array | undefined;
            } | undefined;
        }[] & ({
            timestampNs?: string | number | Long | undefined;
            newInstallation?: {
                installationKey?: Uint8Array | undefined;
                credentialIdentity?: Uint8Array | undefined;
            } | undefined;
            revokedInstallation?: {
                installationKey?: Uint8Array | undefined;
            } | undefined;
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
            } & { [K in Exclude<keyof I["updates"][number]["timestampNs"], keyof Long>]: never; }) | undefined;
            newInstallation?: ({
                installationKey?: Uint8Array | undefined;
                credentialIdentity?: Uint8Array | undefined;
            } & {
                installationKey?: Uint8Array | undefined;
                credentialIdentity?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["updates"][number]["newInstallation"], keyof GetIdentityUpdatesResponse_NewInstallationUpdate>]: never; }) | undefined;
            revokedInstallation?: ({
                installationKey?: Uint8Array | undefined;
            } & {
                installationKey?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["updates"][number]["revokedInstallation"], "installationKey">]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["updates"][number], keyof GetIdentityUpdatesResponse_Update>]: never; })[] & { [K_4 in Exclude<keyof I["updates"], keyof {
            timestampNs?: string | number | Long | undefined;
            newInstallation?: {
                installationKey?: Uint8Array | undefined;
                credentialIdentity?: Uint8Array | undefined;
            } | undefined;
            revokedInstallation?: {
                installationKey?: Uint8Array | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "updates">]: never; }>(object: I): GetIdentityUpdatesResponse_WalletUpdates;
};
export declare const PagingInfo: {
    encode(message: PagingInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PagingInfo;
    fromJSON(object: any): PagingInfo;
    toJSON(message: PagingInfo): unknown;
    fromPartial<I extends {
        direction?: SortDirection | undefined;
        limit?: number | undefined;
        idCursor?: string | number | Long | undefined;
    } & {
        direction?: SortDirection | undefined;
        limit?: number | undefined;
        idCursor?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["idCursor"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PagingInfo>]: never; }>(object: I): PagingInfo;
};
export declare const QueryGroupMessagesRequest: {
    encode(message: QueryGroupMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGroupMessagesRequest;
    fromJSON(object: any): QueryGroupMessagesRequest;
    toJSON(message: QueryGroupMessagesRequest): unknown;
    fromPartial<I extends {
        groupId?: Uint8Array | undefined;
        pagingInfo?: {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } | undefined;
    } & {
        groupId?: Uint8Array | undefined;
        pagingInfo?: ({
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } & {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["pagingInfo"]["idCursor"], keyof Long>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["pagingInfo"], keyof PagingInfo>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof QueryGroupMessagesRequest>]: never; }>(object: I): QueryGroupMessagesRequest;
};
export declare const QueryGroupMessagesResponse: {
    encode(message: QueryGroupMessagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGroupMessagesResponse;
    fromJSON(object: any): QueryGroupMessagesResponse;
    toJSON(message: QueryGroupMessagesResponse): unknown;
    fromPartial<I extends {
        messages?: {
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                groupId?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        }[] | undefined;
        pagingInfo?: {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } | undefined;
    } & {
        messages?: ({
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                groupId?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        }[] & ({
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                groupId?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        } & {
            v1?: ({
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                groupId?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } & {
                id?: string | number | (Long & {
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
                } & { [K in Exclude<keyof I["messages"][number]["v1"]["id"], keyof Long>]: never; }) | undefined;
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
                } & { [K_1 in Exclude<keyof I["messages"][number]["v1"]["createdNs"], keyof Long>]: never; }) | undefined;
                groupId?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["messages"][number]["v1"], keyof GroupMessage_V1>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["messages"][number], "v1">]: never; })[] & { [K_4 in Exclude<keyof I["messages"], keyof {
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                groupId?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                senderHmac?: Uint8Array | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        pagingInfo?: ({
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } & {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | (Long & {
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
            } & { [K_5 in Exclude<keyof I["pagingInfo"]["idCursor"], keyof Long>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["pagingInfo"], keyof PagingInfo>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof QueryGroupMessagesResponse>]: never; }>(object: I): QueryGroupMessagesResponse;
};
export declare const QueryWelcomeMessagesRequest: {
    encode(message: QueryWelcomeMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryWelcomeMessagesRequest;
    fromJSON(object: any): QueryWelcomeMessagesRequest;
    toJSON(message: QueryWelcomeMessagesRequest): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        pagingInfo?: {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
        pagingInfo?: ({
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } & {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["pagingInfo"]["idCursor"], keyof Long>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["pagingInfo"], keyof PagingInfo>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof QueryWelcomeMessagesRequest>]: never; }>(object: I): QueryWelcomeMessagesRequest;
};
export declare const QueryWelcomeMessagesResponse: {
    encode(message: QueryWelcomeMessagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryWelcomeMessagesResponse;
    fromJSON(object: any): QueryWelcomeMessagesResponse;
    toJSON(message: QueryWelcomeMessagesResponse): unknown;
    fromPartial<I extends {
        messages?: {
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        }[] | undefined;
        pagingInfo?: {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } | undefined;
    } & {
        messages?: ({
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        }[] & ({
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        } & {
            v1?: ({
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } & {
                id?: string | number | (Long & {
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
                } & { [K in Exclude<keyof I["messages"][number]["v1"]["id"], keyof Long>]: never; }) | undefined;
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
                } & { [K_1 in Exclude<keyof I["messages"][number]["v1"]["createdNs"], keyof Long>]: never; }) | undefined;
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["messages"][number]["v1"], keyof WelcomeMessage_V1>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["messages"][number], "v1">]: never; })[] & { [K_4 in Exclude<keyof I["messages"], keyof {
            v1?: {
                id?: string | number | Long | undefined;
                createdNs?: string | number | Long | undefined;
                installationKey?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        pagingInfo?: ({
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | Long | undefined;
        } & {
            direction?: SortDirection | undefined;
            limit?: number | undefined;
            idCursor?: string | number | (Long & {
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
            } & { [K_5 in Exclude<keyof I["pagingInfo"]["idCursor"], keyof Long>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["pagingInfo"], keyof PagingInfo>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof QueryWelcomeMessagesResponse>]: never; }>(object: I): QueryWelcomeMessagesResponse;
};
export declare const SubscribeGroupMessagesRequest: {
    encode(message: SubscribeGroupMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribeGroupMessagesRequest;
    fromJSON(object: any): SubscribeGroupMessagesRequest;
    toJSON(message: SubscribeGroupMessagesRequest): unknown;
    fromPartial<I extends {
        filters?: {
            groupId?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        }[] | undefined;
    } & {
        filters?: ({
            groupId?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        }[] & ({
            groupId?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        } & {
            groupId?: Uint8Array | undefined;
            idCursor?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["filters"][number]["idCursor"], keyof Long>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["filters"][number], keyof SubscribeGroupMessagesRequest_Filter>]: never; })[] & { [K_2 in Exclude<keyof I["filters"], keyof {
            groupId?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "filters">]: never; }>(object: I): SubscribeGroupMessagesRequest;
};
export declare const SubscribeGroupMessagesRequest_Filter: {
    encode(message: SubscribeGroupMessagesRequest_Filter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribeGroupMessagesRequest_Filter;
    fromJSON(object: any): SubscribeGroupMessagesRequest_Filter;
    toJSON(message: SubscribeGroupMessagesRequest_Filter): unknown;
    fromPartial<I extends {
        groupId?: Uint8Array | undefined;
        idCursor?: string | number | Long | undefined;
    } & {
        groupId?: Uint8Array | undefined;
        idCursor?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["idCursor"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SubscribeGroupMessagesRequest_Filter>]: never; }>(object: I): SubscribeGroupMessagesRequest_Filter;
};
export declare const SubscribeWelcomeMessagesRequest: {
    encode(message: SubscribeWelcomeMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribeWelcomeMessagesRequest;
    fromJSON(object: any): SubscribeWelcomeMessagesRequest;
    toJSON(message: SubscribeWelcomeMessagesRequest): unknown;
    fromPartial<I extends {
        filters?: {
            installationKey?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        }[] | undefined;
    } & {
        filters?: ({
            installationKey?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        }[] & ({
            installationKey?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        } & {
            installationKey?: Uint8Array | undefined;
            idCursor?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["filters"][number]["idCursor"], keyof Long>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["filters"][number], keyof SubscribeWelcomeMessagesRequest_Filter>]: never; })[] & { [K_2 in Exclude<keyof I["filters"], keyof {
            installationKey?: Uint8Array | undefined;
            idCursor?: string | number | Long | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "filters">]: never; }>(object: I): SubscribeWelcomeMessagesRequest;
};
export declare const SubscribeWelcomeMessagesRequest_Filter: {
    encode(message: SubscribeWelcomeMessagesRequest_Filter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribeWelcomeMessagesRequest_Filter;
    fromJSON(object: any): SubscribeWelcomeMessagesRequest_Filter;
    toJSON(message: SubscribeWelcomeMessagesRequest_Filter): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        idCursor?: string | number | Long | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
        idCursor?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["idCursor"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SubscribeWelcomeMessagesRequest_Filter>]: never; }>(object: I): SubscribeWelcomeMessagesRequest_Filter;
};
/** RPCs for the new MLS API */
export interface MlsApi {
    /**
     * Send a MLS payload, that would be validated before being stored to the
     * network
     */
    SendGroupMessages(request: SendGroupMessagesRequest): Promise<Empty>;
    /** Send a batch of welcome messages */
    SendWelcomeMessages(request: SendWelcomeMessagesRequest): Promise<Empty>;
    /** Register a new installation, which would be validated before storage */
    RegisterInstallation(request: RegisterInstallationRequest): Promise<RegisterInstallationResponse>;
    /** Upload a new KeyPackage, which would be validated before storage */
    UploadKeyPackage(request: UploadKeyPackageRequest): Promise<Empty>;
    /** Get one or more Key Packages by installation_id */
    FetchKeyPackages(request: FetchKeyPackagesRequest): Promise<FetchKeyPackagesResponse>;
    /**
     * Would delete all key packages associated with the installation and mark
     * the installation as having been revoked
     */
    RevokeInstallation(request: RevokeInstallationRequest): Promise<Empty>;
    /**
     * Used to check for changes related to members of a group.
     * Would return an array of any new installations associated with the wallet
     * address, and any revocations that have happened.
     */
    GetIdentityUpdates(request: GetIdentityUpdatesRequest): Promise<GetIdentityUpdatesResponse>;
    /** Query stored group messages */
    QueryGroupMessages(request: QueryGroupMessagesRequest): Promise<QueryGroupMessagesResponse>;
    /** Query stored group messages */
    QueryWelcomeMessages(request: QueryWelcomeMessagesRequest): Promise<QueryWelcomeMessagesResponse>;
    /** Subscribe stream of new group messages */
    SubscribeGroupMessages(request: SubscribeGroupMessagesRequest): Observable<GroupMessage>;
    /** Subscribe stream of new welcome messages */
    SubscribeWelcomeMessages(request: SubscribeWelcomeMessagesRequest): Observable<WelcomeMessage>;
}
export declare class MlsApiClientImpl implements MlsApi {
    private readonly rpc;
    constructor(rpc: Rpc);
    SendGroupMessages(request: SendGroupMessagesRequest): Promise<Empty>;
    SendWelcomeMessages(request: SendWelcomeMessagesRequest): Promise<Empty>;
    RegisterInstallation(request: RegisterInstallationRequest): Promise<RegisterInstallationResponse>;
    UploadKeyPackage(request: UploadKeyPackageRequest): Promise<Empty>;
    FetchKeyPackages(request: FetchKeyPackagesRequest): Promise<FetchKeyPackagesResponse>;
    RevokeInstallation(request: RevokeInstallationRequest): Promise<Empty>;
    GetIdentityUpdates(request: GetIdentityUpdatesRequest): Promise<GetIdentityUpdatesResponse>;
    QueryGroupMessages(request: QueryGroupMessagesRequest): Promise<QueryGroupMessagesResponse>;
    QueryWelcomeMessages(request: QueryWelcomeMessagesRequest): Promise<QueryWelcomeMessagesResponse>;
    SubscribeGroupMessages(request: SubscribeGroupMessagesRequest): Observable<GroupMessage>;
    SubscribeWelcomeMessages(request: SubscribeWelcomeMessagesRequest): Observable<WelcomeMessage>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
    clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
    serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
    bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}
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
