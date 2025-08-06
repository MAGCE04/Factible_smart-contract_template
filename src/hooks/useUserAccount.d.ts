import type { UserAccount } from '../types/nft';
export declare const useUserAccount: () => {
    userAccount: UserAccount | null;
    loading: boolean;
    exists: boolean;
    refetch: () => Promise<void>;
};
