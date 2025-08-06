import { PublicKey } from '@solana/web3.js';

// Program ID from your Anchor.toml
export const PROGRAM_ID = new PublicKey('DSoaKmysRydnwr15J3k33vEReSh81pvGA8RWXTKcSRBj');

// Metaplex Token Metadata Program ID (estándar para Solana)
export const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// System Program ID
export const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111');

// Token Program ID
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Associated Token Program ID
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

// Collection NFT metadata (basado en tu NFT de Solscan)
export const COLLECTION = {
  // Mint address de tu NFT principal
  MINT: new PublicKey('2e1mbLNEm87WzsN1EN9mcGDJ92ttZzwi6JxFxGhyotmq'),
  
  // Si no tienes un hash de colección verificada, déjalo vacío
  HASH: '',

  // Metadata básica del NFT
  METADATA: {
    name: 'KD',
    symbol: 'KD',
    creators: [
      {
        address: '2T8stzM836NucYbVfJL7K2MVyRU52XTN3o3yM75Lo6b5', // Dirección que aparece en la transferencia
        share: 100
      }
    ] as Array<{ address: string; share: number }>
  }
};

// Seeds utilizados para las PDA
export const SEEDS = {
  USER: 'user',
  STAKE: 'stake'
};