import Long from "long";
import { MlsCredential } from "../../identity/credential.pb";
import { IdentityUpdate, AssociationState, AssociationStateDiff } from "../../identity/associations/association.pb";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls_validation.v1";
/** Message API */
/** Validates a Inbox-ID Key Package Type */
export interface ValidateInboxIdKeyPackagesResponse {
    responses: ValidateInboxIdKeyPackagesResponse_Response[];
}
/** one response corresponding to information about one key package */
export interface ValidateInboxIdKeyPackagesResponse_Response {
    isOk: boolean;
    errorMessage: string;
    credential: MlsCredential | undefined;
    installationPublicKey: Uint8Array;
    expiration: Long;
}
/** Contains a batch of serialized Key Packages */
export interface ValidateKeyPackagesRequest {
    keyPackages: ValidateKeyPackagesRequest_KeyPackage[];
}
/** Wrapper for each key package */
export interface ValidateKeyPackagesRequest_KeyPackage {
    keyPackageBytesTlsSerialized: Uint8Array;
    isInboxIdCredential: boolean;
}
/** Response to ValidateKeyPackagesRequest */
export interface ValidateKeyPackagesResponse {
    responses: ValidateKeyPackagesResponse_ValidationResponse[];
}
/** An individual response to one key package */
export interface ValidateKeyPackagesResponse_ValidationResponse {
    isOk: boolean;
    errorMessage: string;
    installationId: Uint8Array;
    accountAddress: string;
    credentialIdentityBytes: Uint8Array;
    expiration: Long;
}
/** Contains a batch of serialized Group Messages */
export interface ValidateGroupMessagesRequest {
    groupMessages: ValidateGroupMessagesRequest_GroupMessage[];
}
/** Wrapper for each message */
export interface ValidateGroupMessagesRequest_GroupMessage {
    groupMessageBytesTlsSerialized: Uint8Array;
}
/** Response to ValidateGroupMessagesRequest */
export interface ValidateGroupMessagesResponse {
    responses: ValidateGroupMessagesResponse_ValidationResponse[];
}
/** An individual response to one message */
export interface ValidateGroupMessagesResponse_ValidationResponse {
    isOk: boolean;
    errorMessage: string;
    groupId: string;
}
/** Request to get a final association state for identity updates */
export interface GetAssociationStateRequest {
    /** List of identity updates */
    oldUpdates: IdentityUpdate[];
    newUpdates: IdentityUpdate[];
}
/**
 * Response to GetAssociationStateRequest, containing the final association state
 * for an InboxID
 */
export interface GetAssociationStateResponse {
    associationState: AssociationState | undefined;
    stateDiff: AssociationStateDiff | undefined;
}
/** Request to validate an InboxID with the backend service. Ensures an Inbox Id <> Installation key are valid. */
export interface ValidateInboxIdsRequest {
    /** list of validation requests */
    requests: ValidateInboxIdsRequest_ValidationRequest[];
}
/** a single validation request */
export interface ValidateInboxIdsRequest_ValidationRequest {
    credential: MlsCredential | undefined;
    installationPublicKey: Uint8Array;
    identityUpdates: IdentityUpdate[];
}
/** Response to ValidateInboxIdRequest */
export interface ValidateInboxIdsResponse {
    /** List of validation responses */
    responses: ValidateInboxIdsResponse_ValidationResponse[];
}
/** a single validation response */
export interface ValidateInboxIdsResponse_ValidationResponse {
    isOk: boolean;
    errorMessage: string;
    inboxId: string;
}
export declare const ValidateInboxIdKeyPackagesResponse: {
    encode(message: ValidateInboxIdKeyPackagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateInboxIdKeyPackagesResponse;
    fromJSON(object: any): ValidateInboxIdKeyPackagesResponse;
    toJSON(message: ValidateInboxIdKeyPackagesResponse): unknown;
    fromPartial<I extends {
        responses?: {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        }[] & ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        } & {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            credential?: ({
                inboxId?: string | undefined;
            } & {
                inboxId?: string | undefined;
            } & { [K in Exclude<keyof I["responses"][number]["credential"], "inboxId">]: never; }) | undefined;
            installationPublicKey?: Uint8Array | undefined;
            expiration?: string | number | (Long & {
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
            } & { [K_1 in Exclude<keyof I["responses"][number]["expiration"], keyof Long>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["responses"][number], keyof ValidateInboxIdKeyPackagesResponse_Response>]: never; })[] & { [K_3 in Exclude<keyof I["responses"], keyof {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "responses">]: never; }>(object: I): ValidateInboxIdKeyPackagesResponse;
};
export declare const ValidateInboxIdKeyPackagesResponse_Response: {
    encode(message: ValidateInboxIdKeyPackagesResponse_Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateInboxIdKeyPackagesResponse_Response;
    fromJSON(object: any): ValidateInboxIdKeyPackagesResponse_Response;
    toJSON(message: ValidateInboxIdKeyPackagesResponse_Response): unknown;
    fromPartial<I extends {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        credential?: {
            inboxId?: string | undefined;
        } | undefined;
        installationPublicKey?: Uint8Array | undefined;
        expiration?: string | number | Long | undefined;
    } & {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        credential?: ({
            inboxId?: string | undefined;
        } & {
            inboxId?: string | undefined;
        } & { [K in Exclude<keyof I["credential"], "inboxId">]: never; }) | undefined;
        installationPublicKey?: Uint8Array | undefined;
        expiration?: string | number | (Long & {
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
        } & { [K_1 in Exclude<keyof I["expiration"], keyof Long>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ValidateInboxIdKeyPackagesResponse_Response>]: never; }>(object: I): ValidateInboxIdKeyPackagesResponse_Response;
};
export declare const ValidateKeyPackagesRequest: {
    encode(message: ValidateKeyPackagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateKeyPackagesRequest;
    fromJSON(object: any): ValidateKeyPackagesRequest;
    toJSON(message: ValidateKeyPackagesRequest): unknown;
    fromPartial<I extends {
        keyPackages?: {
            keyPackageBytesTlsSerialized?: Uint8Array | undefined;
            isInboxIdCredential?: boolean | undefined;
        }[] | undefined;
    } & {
        keyPackages?: ({
            keyPackageBytesTlsSerialized?: Uint8Array | undefined;
            isInboxIdCredential?: boolean | undefined;
        }[] & ({
            keyPackageBytesTlsSerialized?: Uint8Array | undefined;
            isInboxIdCredential?: boolean | undefined;
        } & {
            keyPackageBytesTlsSerialized?: Uint8Array | undefined;
            isInboxIdCredential?: boolean | undefined;
        } & { [K in Exclude<keyof I["keyPackages"][number], keyof ValidateKeyPackagesRequest_KeyPackage>]: never; })[] & { [K_1 in Exclude<keyof I["keyPackages"], keyof {
            keyPackageBytesTlsSerialized?: Uint8Array | undefined;
            isInboxIdCredential?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "keyPackages">]: never; }>(object: I): ValidateKeyPackagesRequest;
};
export declare const ValidateKeyPackagesRequest_KeyPackage: {
    encode(message: ValidateKeyPackagesRequest_KeyPackage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateKeyPackagesRequest_KeyPackage;
    fromJSON(object: any): ValidateKeyPackagesRequest_KeyPackage;
    toJSON(message: ValidateKeyPackagesRequest_KeyPackage): unknown;
    fromPartial<I extends {
        keyPackageBytesTlsSerialized?: Uint8Array | undefined;
        isInboxIdCredential?: boolean | undefined;
    } & {
        keyPackageBytesTlsSerialized?: Uint8Array | undefined;
        isInboxIdCredential?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidateKeyPackagesRequest_KeyPackage>]: never; }>(object: I): ValidateKeyPackagesRequest_KeyPackage;
};
export declare const ValidateKeyPackagesResponse: {
    encode(message: ValidateKeyPackagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateKeyPackagesResponse;
    fromJSON(object: any): ValidateKeyPackagesResponse;
    toJSON(message: ValidateKeyPackagesResponse): unknown;
    fromPartial<I extends {
        responses?: {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            installationId?: Uint8Array | undefined;
            accountAddress?: string | undefined;
            credentialIdentityBytes?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            installationId?: Uint8Array | undefined;
            accountAddress?: string | undefined;
            credentialIdentityBytes?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        }[] & ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            installationId?: Uint8Array | undefined;
            accountAddress?: string | undefined;
            credentialIdentityBytes?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        } & {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            installationId?: Uint8Array | undefined;
            accountAddress?: string | undefined;
            credentialIdentityBytes?: Uint8Array | undefined;
            expiration?: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["responses"][number]["expiration"], keyof Long>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["responses"][number], keyof ValidateKeyPackagesResponse_ValidationResponse>]: never; })[] & { [K_2 in Exclude<keyof I["responses"], keyof {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            installationId?: Uint8Array | undefined;
            accountAddress?: string | undefined;
            credentialIdentityBytes?: Uint8Array | undefined;
            expiration?: string | number | Long | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "responses">]: never; }>(object: I): ValidateKeyPackagesResponse;
};
export declare const ValidateKeyPackagesResponse_ValidationResponse: {
    encode(message: ValidateKeyPackagesResponse_ValidationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateKeyPackagesResponse_ValidationResponse;
    fromJSON(object: any): ValidateKeyPackagesResponse_ValidationResponse;
    toJSON(message: ValidateKeyPackagesResponse_ValidationResponse): unknown;
    fromPartial<I extends {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        installationId?: Uint8Array | undefined;
        accountAddress?: string | undefined;
        credentialIdentityBytes?: Uint8Array | undefined;
        expiration?: string | number | Long | undefined;
    } & {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        installationId?: Uint8Array | undefined;
        accountAddress?: string | undefined;
        credentialIdentityBytes?: Uint8Array | undefined;
        expiration?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["expiration"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ValidateKeyPackagesResponse_ValidationResponse>]: never; }>(object: I): ValidateKeyPackagesResponse_ValidationResponse;
};
export declare const ValidateGroupMessagesRequest: {
    encode(message: ValidateGroupMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateGroupMessagesRequest;
    fromJSON(object: any): ValidateGroupMessagesRequest;
    toJSON(message: ValidateGroupMessagesRequest): unknown;
    fromPartial<I extends {
        groupMessages?: {
            groupMessageBytesTlsSerialized?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        groupMessages?: ({
            groupMessageBytesTlsSerialized?: Uint8Array | undefined;
        }[] & ({
            groupMessageBytesTlsSerialized?: Uint8Array | undefined;
        } & {
            groupMessageBytesTlsSerialized?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["groupMessages"][number], "groupMessageBytesTlsSerialized">]: never; })[] & { [K_1 in Exclude<keyof I["groupMessages"], keyof {
            groupMessageBytesTlsSerialized?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "groupMessages">]: never; }>(object: I): ValidateGroupMessagesRequest;
};
export declare const ValidateGroupMessagesRequest_GroupMessage: {
    encode(message: ValidateGroupMessagesRequest_GroupMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateGroupMessagesRequest_GroupMessage;
    fromJSON(object: any): ValidateGroupMessagesRequest_GroupMessage;
    toJSON(message: ValidateGroupMessagesRequest_GroupMessage): unknown;
    fromPartial<I extends {
        groupMessageBytesTlsSerialized?: Uint8Array | undefined;
    } & {
        groupMessageBytesTlsSerialized?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "groupMessageBytesTlsSerialized">]: never; }>(object: I): ValidateGroupMessagesRequest_GroupMessage;
};
export declare const ValidateGroupMessagesResponse: {
    encode(message: ValidateGroupMessagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateGroupMessagesResponse;
    fromJSON(object: any): ValidateGroupMessagesResponse;
    toJSON(message: ValidateGroupMessagesResponse): unknown;
    fromPartial<I extends {
        responses?: {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            groupId?: string | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            groupId?: string | undefined;
        }[] & ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            groupId?: string | undefined;
        } & {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            groupId?: string | undefined;
        } & { [K in Exclude<keyof I["responses"][number], keyof ValidateGroupMessagesResponse_ValidationResponse>]: never; })[] & { [K_1 in Exclude<keyof I["responses"], keyof {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            groupId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "responses">]: never; }>(object: I): ValidateGroupMessagesResponse;
};
export declare const ValidateGroupMessagesResponse_ValidationResponse: {
    encode(message: ValidateGroupMessagesResponse_ValidationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateGroupMessagesResponse_ValidationResponse;
    fromJSON(object: any): ValidateGroupMessagesResponse_ValidationResponse;
    toJSON(message: ValidateGroupMessagesResponse_ValidationResponse): unknown;
    fromPartial<I extends {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        groupId?: string | undefined;
    } & {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        groupId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ValidateGroupMessagesResponse_ValidationResponse>]: never; }>(object: I): ValidateGroupMessagesResponse_ValidationResponse;
};
export declare const GetAssociationStateRequest: {
    encode(message: GetAssociationStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetAssociationStateRequest;
    fromJSON(object: any): GetAssociationStateRequest;
    toJSON(message: GetAssociationStateRequest): unknown;
    fromPartial<I extends {
        oldUpdates?: {
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
        }[] | undefined;
        newUpdates?: {
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
        }[] | undefined;
    } & {
        oldUpdates?: ({
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
        }[] & ({
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
                    } & { [K in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["nonce"], keyof Long>]: never; }) | undefined;
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
                        } & { [K_1 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_2 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_3 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_4 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_5 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_6 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_7 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_8 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_9 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_10 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_11 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_12 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["createInbox"], keyof import("../../identity/associations/association.pb").CreateInbox>]: never; }) | undefined;
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
                    } & { [K_13 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberIdentifier"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                        } & { [K_14 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_15 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_16 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_17 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_18 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_19 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_20 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_21 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_22 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_23 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_24 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["existingMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
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
                        } & { [K_25 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_26 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_27 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_28 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_29 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_30 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_31 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_32 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_33 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_34 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_35 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"]["newMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_36 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["add"], keyof import("../../identity/associations/association.pb").AddAssociation>]: never; }) | undefined;
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
                    } & { [K_37 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["memberToRevoke"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                        } & { [K_38 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_39 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_40 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_41 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_42 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_43 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_44 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_45 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_46 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_47 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_48 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_49 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["revoke"], keyof import("../../identity/associations/association.pb").RevokeAssociation>]: never; }) | undefined;
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
                        } & { [K_50 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_51 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_52 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_53 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_54 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_55 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_56 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_57 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_58 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_59 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_60 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_61 in Exclude<keyof I["oldUpdates"][number]["actions"][number]["changeRecoveryAddress"], keyof import("../../identity/associations/association.pb").ChangeRecoveryAddress>]: never; }) | undefined;
            } & { [K_62 in Exclude<keyof I["oldUpdates"][number]["actions"][number], keyof import("../../identity/associations/association.pb").IdentityAction>]: never; })[] & { [K_63 in Exclude<keyof I["oldUpdates"][number]["actions"], keyof {
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
            } & { [K_64 in Exclude<keyof I["oldUpdates"][number]["clientTimestampNs"], keyof Long>]: never; }) | undefined;
            inboxId?: string | undefined;
        } & { [K_65 in Exclude<keyof I["oldUpdates"][number], keyof IdentityUpdate>]: never; })[] & { [K_66 in Exclude<keyof I["oldUpdates"], keyof {
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
        }[]>]: never; }) | undefined;
        newUpdates?: ({
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
        }[] & ({
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
                    } & { [K_67 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["nonce"], keyof Long>]: never; }) | undefined;
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
                        } & { [K_68 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_69 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_70 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_71 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_72 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_73 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_74 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_75 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_76 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_77 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_78 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_79 in Exclude<keyof I["newUpdates"][number]["actions"][number]["createInbox"], keyof import("../../identity/associations/association.pb").CreateInbox>]: never; }) | undefined;
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
                    } & { [K_80 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberIdentifier"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                        } & { [K_81 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_82 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_83 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_84 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_85 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_86 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_87 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_88 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_89 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_90 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_91 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["existingMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
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
                        } & { [K_92 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_93 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_94 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_95 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_96 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_97 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_98 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_99 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_100 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_101 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_102 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"]["newMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_103 in Exclude<keyof I["newUpdates"][number]["actions"][number]["add"], keyof import("../../identity/associations/association.pb").AddAssociation>]: never; }) | undefined;
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
                    } & { [K_104 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["memberToRevoke"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                        } & { [K_105 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_106 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_107 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_108 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_109 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_110 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_111 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_112 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_113 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_114 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_115 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_116 in Exclude<keyof I["newUpdates"][number]["actions"][number]["revoke"], keyof import("../../identity/associations/association.pb").RevokeAssociation>]: never; }) | undefined;
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
                        } & { [K_117 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_118 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_119 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_120 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_121 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_122 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_123 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_124 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_125 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_126 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_127 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_128 in Exclude<keyof I["newUpdates"][number]["actions"][number]["changeRecoveryAddress"], keyof import("../../identity/associations/association.pb").ChangeRecoveryAddress>]: never; }) | undefined;
            } & { [K_129 in Exclude<keyof I["newUpdates"][number]["actions"][number], keyof import("../../identity/associations/association.pb").IdentityAction>]: never; })[] & { [K_130 in Exclude<keyof I["newUpdates"][number]["actions"], keyof {
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
            } & { [K_131 in Exclude<keyof I["newUpdates"][number]["clientTimestampNs"], keyof Long>]: never; }) | undefined;
            inboxId?: string | undefined;
        } & { [K_132 in Exclude<keyof I["newUpdates"][number], keyof IdentityUpdate>]: never; })[] & { [K_133 in Exclude<keyof I["newUpdates"], keyof {
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
        }[]>]: never; }) | undefined;
    } & { [K_134 in Exclude<keyof I, keyof GetAssociationStateRequest>]: never; }>(object: I): GetAssociationStateRequest;
};
export declare const GetAssociationStateResponse: {
    encode(message: GetAssociationStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetAssociationStateResponse;
    fromJSON(object: any): GetAssociationStateResponse;
    toJSON(message: GetAssociationStateResponse): unknown;
    fromPartial<I extends {
        associationState?: {
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
        } | undefined;
        stateDiff?: {
            newMembers?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            }[] | undefined;
            removedMembers?: {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        associationState?: ({
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
                } & { [K in Exclude<keyof I["associationState"]["members"][number]["key"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                    } & { [K_1 in Exclude<keyof I["associationState"]["members"][number]["value"]["identifier"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
                    addedByEntity?: ({
                        address?: string | undefined;
                        installationPublicKey?: Uint8Array | undefined;
                    } & {
                        address?: string | undefined;
                        installationPublicKey?: Uint8Array | undefined;
                    } & { [K_2 in Exclude<keyof I["associationState"]["members"][number]["value"]["addedByEntity"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["associationState"]["members"][number]["value"], keyof import("../../identity/associations/association.pb").Member>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["associationState"]["members"][number], keyof import("../../identity/associations/association.pb").MemberMap>]: never; })[] & { [K_5 in Exclude<keyof I["associationState"]["members"], keyof {
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
            seenSignatures?: (Uint8Array[] & Uint8Array[] & { [K_6 in Exclude<keyof I["associationState"]["seenSignatures"], keyof Uint8Array[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["associationState"], keyof AssociationState>]: never; }) | undefined;
        stateDiff?: ({
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
            } & { [K_8 in Exclude<keyof I["stateDiff"]["newMembers"][number], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; })[] & { [K_9 in Exclude<keyof I["stateDiff"]["newMembers"], keyof {
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
            } & { [K_10 in Exclude<keyof I["stateDiff"]["removedMembers"][number], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; })[] & { [K_11 in Exclude<keyof I["stateDiff"]["removedMembers"], keyof {
                address?: string | undefined;
                installationPublicKey?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I["stateDiff"], keyof AssociationStateDiff>]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I, keyof GetAssociationStateResponse>]: never; }>(object: I): GetAssociationStateResponse;
};
export declare const ValidateInboxIdsRequest: {
    encode(message: ValidateInboxIdsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateInboxIdsRequest;
    fromJSON(object: any): ValidateInboxIdsRequest;
    toJSON(message: ValidateInboxIdsRequest): unknown;
    fromPartial<I extends {
        requests?: {
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            identityUpdates?: {
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
            }[] | undefined;
        }[] | undefined;
    } & {
        requests?: ({
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            identityUpdates?: {
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
            }[] | undefined;
        }[] & ({
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            identityUpdates?: {
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
            }[] | undefined;
        } & {
            credential?: ({
                inboxId?: string | undefined;
            } & {
                inboxId?: string | undefined;
            } & { [K in Exclude<keyof I["requests"][number]["credential"], "inboxId">]: never; }) | undefined;
            installationPublicKey?: Uint8Array | undefined;
            identityUpdates?: ({
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
            }[] & ({
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
                        } & { [K_1 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["nonce"], keyof Long>]: never; }) | undefined;
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
                            } & { [K_2 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                                } & { [K_3 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                                signature?: Uint8Array | undefined;
                                chainRpcUrl?: string | undefined;
                            } & { [K_4 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                            installationKey?: ({
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & { [K_5 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                        } & { [K_6 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                        walletEcdsaCompact?: ({
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & {
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & { [K_7 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                    } & { [K_8 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                                } & { [K_9 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                                signature?: ({
                                    bytes?: Uint8Array | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                } & { [K_10 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                            } & { [K_11 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                        } & { [K_12 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_13 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["createInbox"], keyof import("../../identity/associations/association.pb").CreateInbox>]: never; }) | undefined;
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
                        } & { [K_14 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberIdentifier"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                            } & { [K_15 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                                } & { [K_16 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                                signature?: Uint8Array | undefined;
                                chainRpcUrl?: string | undefined;
                            } & { [K_17 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                            installationKey?: ({
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & { [K_18 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                        } & { [K_19 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                        walletEcdsaCompact?: ({
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & {
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & { [K_20 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                    } & { [K_21 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                                } & { [K_22 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                                signature?: ({
                                    bytes?: Uint8Array | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                } & { [K_23 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                            } & { [K_24 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                        } & { [K_25 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
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
                            } & { [K_26 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                                } & { [K_27 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                                signature?: Uint8Array | undefined;
                                chainRpcUrl?: string | undefined;
                            } & { [K_28 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                            installationKey?: ({
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & { [K_29 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                        } & { [K_30 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                        walletEcdsaCompact?: ({
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & {
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & { [K_31 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                    } & { [K_32 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                                } & { [K_33 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                                signature?: ({
                                    bytes?: Uint8Array | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                } & { [K_34 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                            } & { [K_35 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                        } & { [K_36 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_37 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["add"], keyof import("../../identity/associations/association.pb").AddAssociation>]: never; }) | undefined;
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
                        } & { [K_38 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["memberToRevoke"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                            } & { [K_39 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                                } & { [K_40 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                                signature?: Uint8Array | undefined;
                                chainRpcUrl?: string | undefined;
                            } & { [K_41 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                            installationKey?: ({
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & { [K_42 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                        } & { [K_43 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                        walletEcdsaCompact?: ({
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & {
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & { [K_44 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                    } & { [K_45 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                                } & { [K_46 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                                signature?: ({
                                    bytes?: Uint8Array | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                } & { [K_47 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                            } & { [K_48 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                        } & { [K_49 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_50 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["revoke"], keyof import("../../identity/associations/association.pb").RevokeAssociation>]: never; }) | undefined;
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
                            } & { [K_51 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                                } & { [K_52 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                                signature?: Uint8Array | undefined;
                                chainRpcUrl?: string | undefined;
                            } & { [K_53 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                            installationKey?: ({
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                                publicKey?: Uint8Array | undefined;
                            } & { [K_54 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                        } & { [K_55 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                        walletEcdsaCompact?: ({
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & {
                                            bytes?: Uint8Array | undefined;
                                            recovery?: number | undefined;
                                        } & { [K_56 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                    } & { [K_57 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                                } & { [K_58 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                                signature?: ({
                                    bytes?: Uint8Array | undefined;
                                } & {
                                    bytes?: Uint8Array | undefined;
                                } & { [K_59 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                            } & { [K_60 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                        } & { [K_61 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                    } & { [K_62 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"], keyof import("../../identity/associations/association.pb").ChangeRecoveryAddress>]: never; }) | undefined;
                } & { [K_63 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"][number], keyof import("../../identity/associations/association.pb").IdentityAction>]: never; })[] & { [K_64 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["actions"], keyof {
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
                } & { [K_65 in Exclude<keyof I["requests"][number]["identityUpdates"][number]["clientTimestampNs"], keyof Long>]: never; }) | undefined;
                inboxId?: string | undefined;
            } & { [K_66 in Exclude<keyof I["requests"][number]["identityUpdates"][number], keyof IdentityUpdate>]: never; })[] & { [K_67 in Exclude<keyof I["requests"][number]["identityUpdates"], keyof {
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
            }[]>]: never; }) | undefined;
        } & { [K_68 in Exclude<keyof I["requests"][number], keyof ValidateInboxIdsRequest_ValidationRequest>]: never; })[] & { [K_69 in Exclude<keyof I["requests"], keyof {
            credential?: {
                inboxId?: string | undefined;
            } | undefined;
            installationPublicKey?: Uint8Array | undefined;
            identityUpdates?: {
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
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_70 in Exclude<keyof I, "requests">]: never; }>(object: I): ValidateInboxIdsRequest;
};
export declare const ValidateInboxIdsRequest_ValidationRequest: {
    encode(message: ValidateInboxIdsRequest_ValidationRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateInboxIdsRequest_ValidationRequest;
    fromJSON(object: any): ValidateInboxIdsRequest_ValidationRequest;
    toJSON(message: ValidateInboxIdsRequest_ValidationRequest): unknown;
    fromPartial<I extends {
        credential?: {
            inboxId?: string | undefined;
        } | undefined;
        installationPublicKey?: Uint8Array | undefined;
        identityUpdates?: {
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
        }[] | undefined;
    } & {
        credential?: ({
            inboxId?: string | undefined;
        } & {
            inboxId?: string | undefined;
        } & { [K in Exclude<keyof I["credential"], "inboxId">]: never; }) | undefined;
        installationPublicKey?: Uint8Array | undefined;
        identityUpdates?: ({
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
        }[] & ({
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
                    } & { [K_1 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["nonce"], keyof Long>]: never; }) | undefined;
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
                        } & { [K_2 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_3 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_4 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_5 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_6 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_7 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_8 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_9 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_10 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_11 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_12 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"]["initialAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_13 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["createInbox"], keyof import("../../identity/associations/association.pb").CreateInbox>]: never; }) | undefined;
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
                    } & { [K_14 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberIdentifier"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                        } & { [K_15 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_16 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_17 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_18 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_19 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_20 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_21 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_22 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_23 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_24 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_25 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["existingMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
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
                        } & { [K_26 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_27 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_28 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_29 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_30 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_31 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_32 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_33 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_34 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_35 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_36 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"]["newMemberSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_37 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["add"], keyof import("../../identity/associations/association.pb").AddAssociation>]: never; }) | undefined;
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
                    } & { [K_38 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["memberToRevoke"], keyof import("../../identity/associations/association.pb").MemberIdentifier>]: never; }) | undefined;
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
                        } & { [K_39 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_40 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_41 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_42 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_43 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_44 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_45 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_46 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_47 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_48 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_49 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"]["recoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_50 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["revoke"], keyof import("../../identity/associations/association.pb").RevokeAssociation>]: never; }) | undefined;
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
                        } & { [K_51 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc191"], "bytes">]: never; }) | undefined;
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
                            } & { [K_52 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"]["blockNumber"], keyof Long>]: never; }) | undefined;
                            signature?: Uint8Array | undefined;
                            chainRpcUrl?: string | undefined;
                        } & { [K_53 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["erc6492"], keyof import("../../identity/associations/signature.pb").SmartContractWalletSignature>]: never; }) | undefined;
                        installationKey?: ({
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & {
                            bytes?: Uint8Array | undefined;
                            publicKey?: Uint8Array | undefined;
                        } & { [K_54 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["installationKey"], keyof import("../../identity/associations/signature.pb").RecoverableEd25519Signature>]: never; }) | undefined;
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
                                    } & { [K_55 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["ecdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_ECDSACompact>]: never; }) | undefined;
                                    walletEcdsaCompact?: ({
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & {
                                        bytes?: Uint8Array | undefined;
                                        recovery?: number | undefined;
                                    } & { [K_56 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"]["walletEcdsaCompact"], keyof import("../../message_contents/signature.pb").Signature_WalletECDSACompact>]: never; }) | undefined;
                                } & { [K_57 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"]["signature"], keyof import("../../message_contents/signature.pb").Signature>]: never; }) | undefined;
                            } & { [K_58 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["delegatedKey"], keyof import("../../message_contents/public_key.pb").SignedPublicKey>]: never; }) | undefined;
                            signature?: ({
                                bytes?: Uint8Array | undefined;
                            } & {
                                bytes?: Uint8Array | undefined;
                            } & { [K_59 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"]["signature"], "bytes">]: never; }) | undefined;
                        } & { [K_60 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"]["delegatedErc191"], keyof import("../../identity/associations/signature.pb").LegacyDelegatedSignature>]: never; }) | undefined;
                    } & { [K_61 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"]["existingRecoveryAddressSignature"], keyof import("../../identity/associations/signature.pb").Signature>]: never; }) | undefined;
                } & { [K_62 in Exclude<keyof I["identityUpdates"][number]["actions"][number]["changeRecoveryAddress"], keyof import("../../identity/associations/association.pb").ChangeRecoveryAddress>]: never; }) | undefined;
            } & { [K_63 in Exclude<keyof I["identityUpdates"][number]["actions"][number], keyof import("../../identity/associations/association.pb").IdentityAction>]: never; })[] & { [K_64 in Exclude<keyof I["identityUpdates"][number]["actions"], keyof {
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
            } & { [K_65 in Exclude<keyof I["identityUpdates"][number]["clientTimestampNs"], keyof Long>]: never; }) | undefined;
            inboxId?: string | undefined;
        } & { [K_66 in Exclude<keyof I["identityUpdates"][number], keyof IdentityUpdate>]: never; })[] & { [K_67 in Exclude<keyof I["identityUpdates"], keyof {
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
        }[]>]: never; }) | undefined;
    } & { [K_68 in Exclude<keyof I, keyof ValidateInboxIdsRequest_ValidationRequest>]: never; }>(object: I): ValidateInboxIdsRequest_ValidationRequest;
};
export declare const ValidateInboxIdsResponse: {
    encode(message: ValidateInboxIdsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateInboxIdsResponse;
    fromJSON(object: any): ValidateInboxIdsResponse;
    toJSON(message: ValidateInboxIdsResponse): unknown;
    fromPartial<I extends {
        responses?: {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            inboxId?: string | undefined;
        }[] | undefined;
    } & {
        responses?: ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            inboxId?: string | undefined;
        }[] & ({
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            inboxId?: string | undefined;
        } & {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            inboxId?: string | undefined;
        } & { [K in Exclude<keyof I["responses"][number], keyof ValidateInboxIdsResponse_ValidationResponse>]: never; })[] & { [K_1 in Exclude<keyof I["responses"], keyof {
            isOk?: boolean | undefined;
            errorMessage?: string | undefined;
            inboxId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "responses">]: never; }>(object: I): ValidateInboxIdsResponse;
};
export declare const ValidateInboxIdsResponse_ValidationResponse: {
    encode(message: ValidateInboxIdsResponse_ValidationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidateInboxIdsResponse_ValidationResponse;
    fromJSON(object: any): ValidateInboxIdsResponse_ValidationResponse;
    toJSON(message: ValidateInboxIdsResponse_ValidationResponse): unknown;
    fromPartial<I extends {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        inboxId?: string | undefined;
    } & {
        isOk?: boolean | undefined;
        errorMessage?: string | undefined;
        inboxId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ValidateInboxIdsResponse_ValidationResponse>]: never; }>(object: I): ValidateInboxIdsResponse_ValidationResponse;
};
/** RPCs for the new MLS API */
export interface ValidationApi {
    /** Validates and parses a batch of key packages and returns relevant details */
    ValidateKeyPackages(request: ValidateKeyPackagesRequest): Promise<ValidateKeyPackagesResponse>;
    /** Validates and parses a group message and returns relevant details */
    ValidateGroupMessages(request: ValidateGroupMessagesRequest): Promise<ValidateGroupMessagesResponse>;
    /** Gets the final association state for a batch of identity updates */
    GetAssociationState(request: GetAssociationStateRequest): Promise<GetAssociationStateResponse>;
    /**
     * Validates InboxID key packages and returns credential information for them, without checking
     * whether an InboxId <> InstallationPublicKey pair is really valid.
     */
    ValidateInboxIdKeyPackages(request: ValidateKeyPackagesRequest): Promise<ValidateInboxIdKeyPackagesResponse>;
    /**
     * Validate an InboxID Key Package
     * need public key possibly
     */
    ValidateInboxIds(request: ValidateInboxIdsRequest): Promise<ValidateInboxIdsResponse>;
}
export declare class ValidationApiClientImpl implements ValidationApi {
    private readonly rpc;
    constructor(rpc: Rpc);
    ValidateKeyPackages(request: ValidateKeyPackagesRequest): Promise<ValidateKeyPackagesResponse>;
    ValidateGroupMessages(request: ValidateGroupMessagesRequest): Promise<ValidateGroupMessagesResponse>;
    GetAssociationState(request: GetAssociationStateRequest): Promise<GetAssociationStateResponse>;
    ValidateInboxIdKeyPackages(request: ValidateKeyPackagesRequest): Promise<ValidateInboxIdKeyPackagesResponse>;
    ValidateInboxIds(request: ValidateInboxIdsRequest): Promise<ValidateInboxIdsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
