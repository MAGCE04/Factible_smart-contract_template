import type { NFT } from '../types/nft';
export declare const useNFTs: () => {
    nfts: NFT[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};
