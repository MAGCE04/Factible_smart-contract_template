import { PublicKey } from '@solana/web3.js';

// Program ID from your Anchor.toml
export const PROGRAM_ID = new PublicKey('DSoaKmysRydnwr15J3k33vEReSh81pvGA8RWXTKcSRBj');

// Metaplex Token Metadata Program ID
export const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// System Program ID
export const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111');

// Token Program ID
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Associated Token Program ID
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

// RPC Endpoints
export const RPC_ENDPOINTS = {
  mainnet: 'https://api.mainnet-beta.solana.com',
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  localhost: 'http://127.0.0.1:8899',
};

// Default collection mint (you'll need to update this with your actual collection)
export const DEFAULT_COLLECTION_MINT = 'YOUR_COLLECTION_MINT_HERE';

// Seeds for PDAs
export const SEEDS = {
  CONFIG: 'config',
  USER: 'user',
  STAKE: 'stake',
  REWARDS: 'rewards',
  METADATA: 'metadata',
  EDITION: 'edition',
} as const;