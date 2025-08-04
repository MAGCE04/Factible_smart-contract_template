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
  collection?: string;
}

export interface StakeInfo {
  owner: string;
  mint: string;
  stakedAt: number;
  bump: number;
}

export interface UserAccount {
  points: number;
  amountStaked: number;
  bump: number;
}

export interface ConfigAccount {
  pointsPerStake: number;
  maxStake: number;
  freezePeriod: number;
  rewardsBump: number;
  bump: number;
}

export {};