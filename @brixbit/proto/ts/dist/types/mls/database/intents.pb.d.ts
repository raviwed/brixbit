import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.database";
/** Type of update to admin lists */
export declare enum AdminListUpdateType {
    ADMIN_LIST_UPDATE_TYPE_UNSPECIFIED = 0,
    ADMIN_LIST_UPDATE_TYPE_ADD_ADMIN = 1,
    ADMIN_LIST_UPDATE_TYPE_REMOVE_ADMIN = 2,
    ADMIN_LIST_UPDATE_TYPE_ADD_SUPER_ADMIN = 3,
    ADMIN_LIST_UPDATE_TYPE_REMOVE_SUPER_ADMIN = 4,
    UNRECOGNIZED = -1
}
export declare function adminListUpdateTypeFromJSON(object: any): AdminListUpdateType;
export declare function adminListUpdateTypeToJSON(object: AdminListUpdateType): string;
/** Type of Permission to Update */
export declare enum PermissionUpdateType {
    PERMISSION_UPDATE_TYPE_UNSPECIFIED = 0,
    PERMISSION_UPDATE_TYPE_ADD_MEMBER = 1,
    PERMISSION_UPDATE_TYPE_REMOVE_MEMBER = 2,
    PERMISSION_UPDATE_TYPE_ADD_ADMIN = 3,
    PERMISSION_UPDATE_TYPE_REMOVE_ADMIN = 4,
    PERMISSION_UPDATE_TYPE_UPDATE_METADATA = 5,
    UNRECOGNIZED = -1
}
export declare function permissionUpdateTypeFromJSON(object: any): PermissionUpdateType;
export declare function permissionUpdateTypeToJSON(object: PermissionUpdateType): string;
/** Permission Policy */
export declare enum PermissionPolicyOption {
    PERMISSION_POLICY_OPTION_UNSPECIFIED = 0,
    PERMISSION_POLICY_OPTION_ALLOW = 1,
    PERMISSION_POLICY_OPTION_DENY = 2,
    PERMISSION_POLICY_OPTION_ADMIN_ONLY = 3,
    PERMISSION_POLICY_OPTION_SUPER_ADMIN_ONLY = 4,
    UNRECOGNIZED = -1
}
export declare function permissionPolicyOptionFromJSON(object: any): PermissionPolicyOption;
export declare function permissionPolicyOptionToJSON(object: PermissionPolicyOption): string;
/** The data required to publish a message */
export interface SendMessageData {
    v1: SendMessageData_V1 | undefined;
}
/** V1 of SendMessagePublishData */
export interface SendMessageData_V1 {
    payloadBytes: Uint8Array;
}
/** Wrapper around a list af repeated EVM Account Addresses */
export interface AccountAddresses {
    accountAddresses: string[];
}
/** Wrapper around a list of repeated Installation IDs */
export interface InstallationIds {
    installationIds: Uint8Array[];
}
/** One of an EVM account address or Installation ID */
export interface AddressesOrInstallationIds {
    accountAddresses: AccountAddresses | undefined;
    installationIds: InstallationIds | undefined;
}
/** The data required to add members to a group */
export interface AddMembersData {
    v1: AddMembersData_V1 | undefined;
}
/** V1 of AddMembersPublishData */
export interface AddMembersData_V1 {
    addressesOrInstallationIds: AddressesOrInstallationIds | undefined;
}
/** The data required to remove members from a group */
export interface RemoveMembersData {
    v1: RemoveMembersData_V1 | undefined;
}
/** V1 of RemoveMembersPublishData */
export interface RemoveMembersData_V1 {
    addressesOrInstallationIds: AddressesOrInstallationIds | undefined;
}
/**
 * The data required to make a commit that updates group membership
 * Handles both Add and Remove actions
 */
export interface UpdateGroupMembershipData {
    v1: UpdateGroupMembershipData_V1 | undefined;
}
/** V1 of UpdateGroupMembershipPublishData */
export interface UpdateGroupMembershipData_V1 {
    /** Contains delta of membership updates that need to be applied */
    membershipUpdates: {
        [key: string]: Long;
    };
    /** Contains the list of members that will be removed */
    removedMembers: string[];
}
export interface UpdateGroupMembershipData_V1_MembershipUpdatesEntry {
    key: string;
    value: Long;
}
/** The data required to update group metadata */
export interface UpdateMetadataData {
    v1: UpdateMetadataData_V1 | undefined;
}
/** V1 of UpdateMetadataPublishData */
export interface UpdateMetadataData_V1 {
    fieldName: string;
    fieldValue: string;
}
/** The data required to update group admin/super admin lists */
export interface UpdateAdminListsData {
    v1: UpdateAdminListsData_V1 | undefined;
}
/** V1 of UpdateAdminListsPublishData */
export interface UpdateAdminListsData_V1 {
    adminListUpdateType: AdminListUpdateType;
    inboxId: string;
}
/** The data required to update permissions */
export interface UpdatePermissionData {
    v1: UpdatePermissionData_V1 | undefined;
}
/** V1 of UpdatePermissionData */
export interface UpdatePermissionData_V1 {
    permissionUpdateType: PermissionUpdateType;
    permissionPolicyOption: PermissionPolicyOption;
    /** Metadata permissions update specify which field permission they are updating */
    metadataFieldName?: string | undefined;
}
/** Generic data-type for all post-commit actions */
export interface PostCommitAction {
    sendWelcomes: PostCommitAction_SendWelcomes | undefined;
}
/** An installation */
export interface PostCommitAction_Installation {
    installationKey: Uint8Array;
    hpkePublicKey: Uint8Array;
}
/** SendWelcome message */
export interface PostCommitAction_SendWelcomes {
    installations: PostCommitAction_Installation[];
    welcomeMessage: Uint8Array;
}
export declare const SendMessageData: {
    encode(message: SendMessageData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SendMessageData;
    fromJSON(object: any): SendMessageData;
    toJSON(message: SendMessageData): unknown;
    fromPartial<I extends {
        v1?: {
            payloadBytes?: Uint8Array | undefined;
        } | undefined;
    } & {
        v1?: ({
            payloadBytes?: Uint8Array | undefined;
        } & {
            payloadBytes?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["v1"], "payloadBytes">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "v1">]: never; }>(object: I): SendMessageData;
};
export declare const SendMessageData_V1: {
    encode(message: SendMessageData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SendMessageData_V1;
    fromJSON(object: any): SendMessageData_V1;
    toJSON(message: SendMessageData_V1): unknown;
    fromPartial<I extends {
        payloadBytes?: Uint8Array | undefined;
    } & {
        payloadBytes?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "payloadBytes">]: never; }>(object: I): SendMessageData_V1;
};
export declare const AccountAddresses: {
    encode(message: AccountAddresses, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountAddresses;
    fromJSON(object: any): AccountAddresses;
    toJSON(message: AccountAddresses): unknown;
    fromPartial<I extends {
        accountAddresses?: string[] | undefined;
    } & {
        accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["accountAddresses"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "accountAddresses">]: never; }>(object: I): AccountAddresses;
};
export declare const InstallationIds: {
    encode(message: InstallationIds, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): InstallationIds;
    fromJSON(object: any): InstallationIds;
    toJSON(message: InstallationIds): unknown;
    fromPartial<I extends {
        installationIds?: Uint8Array[] | undefined;
    } & {
        installationIds?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "installationIds">]: never; }>(object: I): InstallationIds;
};
export declare const AddressesOrInstallationIds: {
    encode(message: AddressesOrInstallationIds, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddressesOrInstallationIds;
    fromJSON(object: any): AddressesOrInstallationIds;
    toJSON(message: AddressesOrInstallationIds): unknown;
    fromPartial<I extends {
        accountAddresses?: {
            accountAddresses?: string[] | undefined;
        } | undefined;
        installationIds?: {
            installationIds?: Uint8Array[] | undefined;
        } | undefined;
    } & {
        accountAddresses?: ({
            accountAddresses?: string[] | undefined;
        } & {
            accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["accountAddresses"]["accountAddresses"], keyof string[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["accountAddresses"], "accountAddresses">]: never; }) | undefined;
        installationIds?: ({
            installationIds?: Uint8Array[] | undefined;
        } & {
            installationIds?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I["installationIds"]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["installationIds"], "installationIds">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof AddressesOrInstallationIds>]: never; }>(object: I): AddressesOrInstallationIds;
};
export declare const AddMembersData: {
    encode(message: AddMembersData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddMembersData;
    fromJSON(object: any): AddMembersData;
    toJSON(message: AddMembersData): unknown;
    fromPartial<I extends {
        v1?: {
            addressesOrInstallationIds?: {
                accountAddresses?: {
                    accountAddresses?: string[] | undefined;
                } | undefined;
                installationIds?: {
                    installationIds?: Uint8Array[] | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        v1?: ({
            addressesOrInstallationIds?: {
                accountAddresses?: {
                    accountAddresses?: string[] | undefined;
                } | undefined;
                installationIds?: {
                    installationIds?: Uint8Array[] | undefined;
                } | undefined;
            } | undefined;
        } & {
            addressesOrInstallationIds?: ({
                accountAddresses?: {
                    accountAddresses?: string[] | undefined;
                } | undefined;
                installationIds?: {
                    installationIds?: Uint8Array[] | undefined;
                } | undefined;
            } & {
                accountAddresses?: ({
                    accountAddresses?: string[] | undefined;
                } & {
                    accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["accountAddresses"]["accountAddresses"], keyof string[]>]: never; }) | undefined;
                } & { [K_1 in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["accountAddresses"], "accountAddresses">]: never; }) | undefined;
                installationIds?: ({
                    installationIds?: Uint8Array[] | undefined;
                } & {
                    installationIds?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["installationIds"]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["installationIds"], "installationIds">]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["v1"]["addressesOrInstallationIds"], keyof AddressesOrInstallationIds>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["v1"], "addressesOrInstallationIds">]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "v1">]: never; }>(object: I): AddMembersData;
};
export declare const AddMembersData_V1: {
    encode(message: AddMembersData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddMembersData_V1;
    fromJSON(object: any): AddMembersData_V1;
    toJSON(message: AddMembersData_V1): unknown;
    fromPartial<I extends {
        addressesOrInstallationIds?: {
            accountAddresses?: {
                accountAddresses?: string[] | undefined;
            } | undefined;
            installationIds?: {
                installationIds?: Uint8Array[] | undefined;
            } | undefined;
        } | undefined;
    } & {
        addressesOrInstallationIds?: ({
            accountAddresses?: {
                accountAddresses?: string[] | undefined;
            } | undefined;
            installationIds?: {
                installationIds?: Uint8Array[] | undefined;
            } | undefined;
        } & {
            accountAddresses?: ({
                accountAddresses?: string[] | undefined;
            } & {
                accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["addressesOrInstallationIds"]["accountAddresses"]["accountAddresses"], keyof string[]>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["addressesOrInstallationIds"]["accountAddresses"], "accountAddresses">]: never; }) | undefined;
            installationIds?: ({
                installationIds?: Uint8Array[] | undefined;
            } & {
                installationIds?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I["addressesOrInstallationIds"]["installationIds"]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["addressesOrInstallationIds"]["installationIds"], "installationIds">]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["addressesOrInstallationIds"], keyof AddressesOrInstallationIds>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "addressesOrInstallationIds">]: never; }>(object: I): AddMembersData_V1;
};
export declare const RemoveMembersData: {
    encode(message: RemoveMembersData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RemoveMembersData;
    fromJSON(object: any): RemoveMembersData;
    toJSON(message: RemoveMembersData): unknown;
    fromPartial<I extends {
        v1?: {
            addressesOrInstallationIds?: {
                accountAddresses?: {
                    accountAddresses?: string[] | undefined;
                } | undefined;
                installationIds?: {
                    installationIds?: Uint8Array[] | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } & {
        v1?: ({
            addressesOrInstallationIds?: {
                accountAddresses?: {
                    accountAddresses?: string[] | undefined;
                } | undefined;
                installationIds?: {
                    installationIds?: Uint8Array[] | undefined;
                } | undefined;
            } | undefined;
        } & {
            addressesOrInstallationIds?: ({
                accountAddresses?: {
                    accountAddresses?: string[] | undefined;
                } | undefined;
                installationIds?: {
                    installationIds?: Uint8Array[] | undefined;
                } | undefined;
            } & {
                accountAddresses?: ({
                    accountAddresses?: string[] | undefined;
                } & {
                    accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["accountAddresses"]["accountAddresses"], keyof string[]>]: never; }) | undefined;
                } & { [K_1 in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["accountAddresses"], "accountAddresses">]: never; }) | undefined;
                installationIds?: ({
                    installationIds?: Uint8Array[] | undefined;
                } & {
                    installationIds?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["installationIds"]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["v1"]["addressesOrInstallationIds"]["installationIds"], "installationIds">]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["v1"]["addressesOrInstallationIds"], keyof AddressesOrInstallationIds>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["v1"], "addressesOrInstallationIds">]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "v1">]: never; }>(object: I): RemoveMembersData;
};
export declare const RemoveMembersData_V1: {
    encode(message: RemoveMembersData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RemoveMembersData_V1;
    fromJSON(object: any): RemoveMembersData_V1;
    toJSON(message: RemoveMembersData_V1): unknown;
    fromPartial<I extends {
        addressesOrInstallationIds?: {
            accountAddresses?: {
                accountAddresses?: string[] | undefined;
            } | undefined;
            installationIds?: {
                installationIds?: Uint8Array[] | undefined;
            } | undefined;
        } | undefined;
    } & {
        addressesOrInstallationIds?: ({
            accountAddresses?: {
                accountAddresses?: string[] | undefined;
            } | undefined;
            installationIds?: {
                installationIds?: Uint8Array[] | undefined;
            } | undefined;
        } & {
            accountAddresses?: ({
                accountAddresses?: string[] | undefined;
            } & {
                accountAddresses?: (string[] & string[] & { [K in Exclude<keyof I["addressesOrInstallationIds"]["accountAddresses"]["accountAddresses"], keyof string[]>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["addressesOrInstallationIds"]["accountAddresses"], "accountAddresses">]: never; }) | undefined;
            installationIds?: ({
                installationIds?: Uint8Array[] | undefined;
            } & {
                installationIds?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I["addressesOrInstallationIds"]["installationIds"]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["addressesOrInstallationIds"]["installationIds"], "installationIds">]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["addressesOrInstallationIds"], keyof AddressesOrInstallationIds>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "addressesOrInstallationIds">]: never; }>(object: I): RemoveMembersData_V1;
};
export declare const UpdateGroupMembershipData: {
    encode(message: UpdateGroupMembershipData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateGroupMembershipData;
    fromJSON(object: any): UpdateGroupMembershipData;
    toJSON(message: UpdateGroupMembershipData): unknown;
    fromPartial<I extends {
        v1?: {
            membershipUpdates?: {
                [x: string]: string | number | Long | undefined;
            } | undefined;
            removedMembers?: string[] | undefined;
        } | undefined;
    } & {
        v1?: ({
            membershipUpdates?: {
                [x: string]: string | number | Long | undefined;
            } | undefined;
            removedMembers?: string[] | undefined;
        } & {
            membershipUpdates?: ({
                [x: string]: string | number | Long | undefined;
            } & {
                [x: string]: string | number | (Long & {
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
                } & { [K in Exclude<keyof I["v1"]["membershipUpdates"][string], keyof Long>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["v1"]["membershipUpdates"], string | number>]: never; }) | undefined;
            removedMembers?: (string[] & string[] & { [K_2 in Exclude<keyof I["v1"]["removedMembers"], keyof string[]>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["v1"], keyof UpdateGroupMembershipData_V1>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "v1">]: never; }>(object: I): UpdateGroupMembershipData;
};
export declare const UpdateGroupMembershipData_V1: {
    encode(message: UpdateGroupMembershipData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateGroupMembershipData_V1;
    fromJSON(object: any): UpdateGroupMembershipData_V1;
    toJSON(message: UpdateGroupMembershipData_V1): unknown;
    fromPartial<I extends {
        membershipUpdates?: {
            [x: string]: string | number | Long | undefined;
        } | undefined;
        removedMembers?: string[] | undefined;
    } & {
        membershipUpdates?: ({
            [x: string]: string | number | Long | undefined;
        } & {
            [x: string]: string | number | (Long & {
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
            } & { [K in Exclude<keyof I["membershipUpdates"][string], keyof Long>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["membershipUpdates"], string | number>]: never; }) | undefined;
        removedMembers?: (string[] & string[] & { [K_2 in Exclude<keyof I["removedMembers"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof UpdateGroupMembershipData_V1>]: never; }>(object: I): UpdateGroupMembershipData_V1;
};
export declare const UpdateGroupMembershipData_V1_MembershipUpdatesEntry: {
    encode(message: UpdateGroupMembershipData_V1_MembershipUpdatesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateGroupMembershipData_V1_MembershipUpdatesEntry;
    fromJSON(object: any): UpdateGroupMembershipData_V1_MembershipUpdatesEntry;
    toJSON(message: UpdateGroupMembershipData_V1_MembershipUpdatesEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: string | number | Long | undefined;
    } & {
        key?: string | undefined;
        value?: string | number | (Long & {
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
        } & { [K in Exclude<keyof I["value"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof UpdateGroupMembershipData_V1_MembershipUpdatesEntry>]: never; }>(object: I): UpdateGroupMembershipData_V1_MembershipUpdatesEntry;
};
export declare const UpdateMetadataData: {
    encode(message: UpdateMetadataData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateMetadataData;
    fromJSON(object: any): UpdateMetadataData;
    toJSON(message: UpdateMetadataData): unknown;
    fromPartial<I extends {
        v1?: {
            fieldName?: string | undefined;
            fieldValue?: string | undefined;
        } | undefined;
    } & {
        v1?: ({
            fieldName?: string | undefined;
            fieldValue?: string | undefined;
        } & {
            fieldName?: string | undefined;
            fieldValue?: string | undefined;
        } & { [K in Exclude<keyof I["v1"], keyof UpdateMetadataData_V1>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "v1">]: never; }>(object: I): UpdateMetadataData;
};
export declare const UpdateMetadataData_V1: {
    encode(message: UpdateMetadataData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateMetadataData_V1;
    fromJSON(object: any): UpdateMetadataData_V1;
    toJSON(message: UpdateMetadataData_V1): unknown;
    fromPartial<I extends {
        fieldName?: string | undefined;
        fieldValue?: string | undefined;
    } & {
        fieldName?: string | undefined;
        fieldValue?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateMetadataData_V1>]: never; }>(object: I): UpdateMetadataData_V1;
};
export declare const UpdateAdminListsData: {
    encode(message: UpdateAdminListsData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateAdminListsData;
    fromJSON(object: any): UpdateAdminListsData;
    toJSON(message: UpdateAdminListsData): unknown;
    fromPartial<I extends {
        v1?: {
            adminListUpdateType?: AdminListUpdateType | undefined;
            inboxId?: string | undefined;
        } | undefined;
    } & {
        v1?: ({
            adminListUpdateType?: AdminListUpdateType | undefined;
            inboxId?: string | undefined;
        } & {
            adminListUpdateType?: AdminListUpdateType | undefined;
            inboxId?: string | undefined;
        } & { [K in Exclude<keyof I["v1"], keyof UpdateAdminListsData_V1>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "v1">]: never; }>(object: I): UpdateAdminListsData;
};
export declare const UpdateAdminListsData_V1: {
    encode(message: UpdateAdminListsData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateAdminListsData_V1;
    fromJSON(object: any): UpdateAdminListsData_V1;
    toJSON(message: UpdateAdminListsData_V1): unknown;
    fromPartial<I extends {
        adminListUpdateType?: AdminListUpdateType | undefined;
        inboxId?: string | undefined;
    } & {
        adminListUpdateType?: AdminListUpdateType | undefined;
        inboxId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateAdminListsData_V1>]: never; }>(object: I): UpdateAdminListsData_V1;
};
export declare const UpdatePermissionData: {
    encode(message: UpdatePermissionData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdatePermissionData;
    fromJSON(object: any): UpdatePermissionData;
    toJSON(message: UpdatePermissionData): unknown;
    fromPartial<I extends {
        v1?: {
            permissionUpdateType?: PermissionUpdateType | undefined;
            permissionPolicyOption?: PermissionPolicyOption | undefined;
            metadataFieldName?: string | undefined;
        } | undefined;
    } & {
        v1?: ({
            permissionUpdateType?: PermissionUpdateType | undefined;
            permissionPolicyOption?: PermissionPolicyOption | undefined;
            metadataFieldName?: string | undefined;
        } & {
            permissionUpdateType?: PermissionUpdateType | undefined;
            permissionPolicyOption?: PermissionPolicyOption | undefined;
            metadataFieldName?: string | undefined;
        } & { [K in Exclude<keyof I["v1"], keyof UpdatePermissionData_V1>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "v1">]: never; }>(object: I): UpdatePermissionData;
};
export declare const UpdatePermissionData_V1: {
    encode(message: UpdatePermissionData_V1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdatePermissionData_V1;
    fromJSON(object: any): UpdatePermissionData_V1;
    toJSON(message: UpdatePermissionData_V1): unknown;
    fromPartial<I extends {
        permissionUpdateType?: PermissionUpdateType | undefined;
        permissionPolicyOption?: PermissionPolicyOption | undefined;
        metadataFieldName?: string | undefined;
    } & {
        permissionUpdateType?: PermissionUpdateType | undefined;
        permissionPolicyOption?: PermissionPolicyOption | undefined;
        metadataFieldName?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdatePermissionData_V1>]: never; }>(object: I): UpdatePermissionData_V1;
};
export declare const PostCommitAction: {
    encode(message: PostCommitAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PostCommitAction;
    fromJSON(object: any): PostCommitAction;
    toJSON(message: PostCommitAction): unknown;
    fromPartial<I extends {
        sendWelcomes?: {
            installations?: {
                installationKey?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            }[] | undefined;
            welcomeMessage?: Uint8Array | undefined;
        } | undefined;
    } & {
        sendWelcomes?: ({
            installations?: {
                installationKey?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            }[] | undefined;
            welcomeMessage?: Uint8Array | undefined;
        } & {
            installations?: ({
                installationKey?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            }[] & ({
                installationKey?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } & {
                installationKey?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["sendWelcomes"]["installations"][number], keyof PostCommitAction_Installation>]: never; })[] & { [K_1 in Exclude<keyof I["sendWelcomes"]["installations"], keyof {
                installationKey?: Uint8Array | undefined;
                hpkePublicKey?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
            welcomeMessage?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["sendWelcomes"], keyof PostCommitAction_SendWelcomes>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "sendWelcomes">]: never; }>(object: I): PostCommitAction;
};
export declare const PostCommitAction_Installation: {
    encode(message: PostCommitAction_Installation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PostCommitAction_Installation;
    fromJSON(object: any): PostCommitAction_Installation;
    toJSON(message: PostCommitAction_Installation): unknown;
    fromPartial<I extends {
        installationKey?: Uint8Array | undefined;
        hpkePublicKey?: Uint8Array | undefined;
    } & {
        installationKey?: Uint8Array | undefined;
        hpkePublicKey?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof PostCommitAction_Installation>]: never; }>(object: I): PostCommitAction_Installation;
};
export declare const PostCommitAction_SendWelcomes: {
    encode(message: PostCommitAction_SendWelcomes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PostCommitAction_SendWelcomes;
    fromJSON(object: any): PostCommitAction_SendWelcomes;
    toJSON(message: PostCommitAction_SendWelcomes): unknown;
    fromPartial<I extends {
        installations?: {
            installationKey?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        }[] | undefined;
        welcomeMessage?: Uint8Array | undefined;
    } & {
        installations?: ({
            installationKey?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        }[] & ({
            installationKey?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } & {
            installationKey?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["installations"][number], keyof PostCommitAction_Installation>]: never; })[] & { [K_1 in Exclude<keyof I["installations"], keyof {
            installationKey?: Uint8Array | undefined;
            hpkePublicKey?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
        welcomeMessage?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof PostCommitAction_SendWelcomes>]: never; }>(object: I): PostCommitAction_SendWelcomes;
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
