export interface NFTMetadata {
    name: string;
    symbol: string;
    description?: string;
    image: string;
    attributes?: Array<{
        trait_type: string;
        value: string | number;
    }>;
}
export interface NFT {
    mint: string;
    name: string;
    symbol: string;
    image: string;
    description?: string;
    attributes?: Array<{
        trait_type: string;
        value: string | number;
    }>;
    isStaked: boolean;
    stakedAt?: number;
    collection?: string | null;
    collectionHash?: string | null;
    creators?: Array<{
        address: string;
        share: number;
        verified?: boolean;
    }>;
    isPartOfCollection?: boolean;
    tokenAccount?: string;
}
export interface StakeAccount {
    owner: string;
    mint: string;
    tokenAccount: string;
    stakeTime: number;
    isInitialized: boolean;
}
export interface UserAccount {
    owner: string;
    stakeCount: number;
    isInitialized: boolean;
}
