import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "brixbit.mls.message_contents";
/** Message content encoding structures */
/** A group member and affected installation IDs */
export interface MembershipChange {
    installationIds: Uint8Array[];
    accountAddress: string;
    initiatedByAccountAddress: string;
}
/** The group membership change proto */
export interface GroupMembershipChanges {
    /** Members that have been added in the commit */
    membersAdded: MembershipChange[];
    /** Members that have been removed in the commit */
    membersRemoved: MembershipChange[];
    /** Installations that have been added in the commit, grouped by member */
    installationsAdded: MembershipChange[];
    /** Installations removed in the commit, grouped by member */
    installationsRemoved: MembershipChange[];
}
/**
 * A summary of the changes in a commit.
 * Includes added/removed inboxes and changes to metadata
 */
export interface GroupUpdated {
    initiatedByInboxId: string;
    /** The inboxes added in the commit */
    addedInboxes: GroupUpdated_Inbox[];
    /** The inboxes removed in the commit */
    removedInboxes: GroupUpdated_Inbox[];
    /** The metadata changes in the commit */
    metadataFieldChanges: GroupUpdated_MetadataFieldChange[];
}
/** An inbox that was added or removed in this commit */
export interface GroupUpdated_Inbox {
    inboxId: string;
}
/** A summary of a change to the mutable metadata */
export interface GroupUpdated_MetadataFieldChange {
    /** The field that was changed */
    fieldName: string;
    /** The previous value */
    oldValue?: string | undefined;
    /** The updated value */
    newValue?: string | undefined;
}
export declare const MembershipChange: {
    encode(message: MembershipChange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MembershipChange;
    fromJSON(object: any): MembershipChange;
    toJSON(message: MembershipChange): unknown;
    fromPartial<I extends {
        installationIds?: Uint8Array[] | undefined;
        accountAddress?: string | undefined;
        initiatedByAccountAddress?: string | undefined;
    } & {
        installationIds?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
        accountAddress?: string | undefined;
        initiatedByAccountAddress?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof MembershipChange>]: never; }>(object: I): MembershipChange;
};
export declare const GroupMembershipChanges: {
    encode(message: GroupMembershipChanges, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupMembershipChanges;
    fromJSON(object: any): GroupMembershipChanges;
    toJSON(message: GroupMembershipChanges): unknown;
    fromPartial<I extends {
        membersAdded?: {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] | undefined;
        membersRemoved?: {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] | undefined;
        installationsAdded?: {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] | undefined;
        installationsRemoved?: {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] | undefined;
    } & {
        membersAdded?: ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] & ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & {
            installationIds?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["membersAdded"][number]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & { [K_1 in Exclude<keyof I["membersAdded"][number], keyof MembershipChange>]: never; })[] & { [K_2 in Exclude<keyof I["membersAdded"], keyof {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[]>]: never; }) | undefined;
        membersRemoved?: ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] & ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & {
            installationIds?: (Uint8Array[] & Uint8Array[] & { [K_3 in Exclude<keyof I["membersRemoved"][number]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & { [K_4 in Exclude<keyof I["membersRemoved"][number], keyof MembershipChange>]: never; })[] & { [K_5 in Exclude<keyof I["membersRemoved"], keyof {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[]>]: never; }) | undefined;
        installationsAdded?: ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] & ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & {
            installationIds?: (Uint8Array[] & Uint8Array[] & { [K_6 in Exclude<keyof I["installationsAdded"][number]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & { [K_7 in Exclude<keyof I["installationsAdded"][number], keyof MembershipChange>]: never; })[] & { [K_8 in Exclude<keyof I["installationsAdded"], keyof {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[]>]: never; }) | undefined;
        installationsRemoved?: ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[] & ({
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & {
            installationIds?: (Uint8Array[] & Uint8Array[] & { [K_9 in Exclude<keyof I["installationsRemoved"][number]["installationIds"], keyof Uint8Array[]>]: never; }) | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        } & { [K_10 in Exclude<keyof I["installationsRemoved"][number], keyof MembershipChange>]: never; })[] & { [K_11 in Exclude<keyof I["installationsRemoved"], keyof {
            installationIds?: Uint8Array[] | undefined;
            accountAddress?: string | undefined;
            initiatedByAccountAddress?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof GroupMembershipChanges>]: never; }>(object: I): GroupMembershipChanges;
};
export declare const GroupUpdated: {
    encode(message: GroupUpdated, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupUpdated;
    fromJSON(object: any): GroupUpdated;
    toJSON(message: GroupUpdated): unknown;
    fromPartial<I extends {
        initiatedByInboxId?: string | undefined;
        addedInboxes?: {
            inboxId?: string | undefined;
        }[] | undefined;
        removedInboxes?: {
            inboxId?: string | undefined;
        }[] | undefined;
        metadataFieldChanges?: {
            fieldName?: string | undefined;
            oldValue?: string | undefined;
            newValue?: string | undefined;
        }[] | undefined;
    } & {
        initiatedByInboxId?: string | undefined;
        addedInboxes?: ({
            inboxId?: string | undefined;
        }[] & ({
            inboxId?: string | undefined;
        } & {
            inboxId?: string | undefined;
        } & { [K in Exclude<keyof I["addedInboxes"][number], "inboxId">]: never; })[] & { [K_1 in Exclude<keyof I["addedInboxes"], keyof {
            inboxId?: string | undefined;
        }[]>]: never; }) | undefined;
        removedInboxes?: ({
            inboxId?: string | undefined;
        }[] & ({
            inboxId?: string | undefined;
        } & {
            inboxId?: string | undefined;
        } & { [K_2 in Exclude<keyof I["removedInboxes"][number], "inboxId">]: never; })[] & { [K_3 in Exclude<keyof I["removedInboxes"], keyof {
            inboxId?: string | undefined;
        }[]>]: never; }) | undefined;
        metadataFieldChanges?: ({
            fieldName?: string | undefined;
            oldValue?: string | undefined;
            newValue?: string | undefined;
        }[] & ({
            fieldName?: string | undefined;
            oldValue?: string | undefined;
            newValue?: string | undefined;
        } & {
            fieldName?: string | undefined;
            oldValue?: string | undefined;
            newValue?: string | undefined;
        } & { [K_4 in Exclude<keyof I["metadataFieldChanges"][number], keyof GroupUpdated_MetadataFieldChange>]: never; })[] & { [K_5 in Exclude<keyof I["metadataFieldChanges"], keyof {
            fieldName?: string | undefined;
            oldValue?: string | undefined;
            newValue?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof GroupUpdated>]: never; }>(object: I): GroupUpdated;
};
export declare const GroupUpdated_Inbox: {
    encode(message: GroupUpdated_Inbox, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupUpdated_Inbox;
    fromJSON(object: any): GroupUpdated_Inbox;
    toJSON(message: GroupUpdated_Inbox): unknown;
    fromPartial<I extends {
        inboxId?: string | undefined;
    } & {
        inboxId?: string | undefined;
    } & { [K in Exclude<keyof I, "inboxId">]: never; }>(object: I): GroupUpdated_Inbox;
};
export declare const GroupUpdated_MetadataFieldChange: {
    encode(message: GroupUpdated_MetadataFieldChange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupUpdated_MetadataFieldChange;
    fromJSON(object: any): GroupUpdated_MetadataFieldChange;
    toJSON(message: GroupUpdated_MetadataFieldChange): unknown;
    fromPartial<I extends {
        fieldName?: string | undefined;
        oldValue?: string | undefined;
        newValue?: string | undefined;
    } & {
        fieldName?: string | undefined;
        oldValue?: string | undefined;
        newValue?: string | undefined;
    } & { [K in Exclude<keyof I, keyof GroupUpdated_MetadataFieldChange>]: never; }>(object: I): GroupUpdated_MetadataFieldChange;
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
