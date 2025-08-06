import { PublicKey } from '@solana/web3.js';
/**
 * Derives the PDA for a user account
 */
export declare const getUserPDA: (owner: PublicKey) => [PublicKey, number];
/**
 * Derives the PDA for a stake account
 */
export declare const getStakePDA: (mint: PublicKey, owner: PublicKey) => [PublicKey, number];
/**
 * Derives the PDA for a config account
 */
export declare const getConfigPDA: () => [PublicKey, number];
/**
 * Derives the PDA for a rewards mint account
 */
export declare const getRewardsMintPDA: (configPDA: PublicKey) => [PublicKey, number];
/**
 * Derives the PDA for a metadata account
 */
export declare const getMetadataPDA: (mint: PublicKey) => [PublicKey, number];
/**
 * Derives the PDA for an edition account
 */
export declare const getEditionPDA: (mint: PublicKey) => [PublicKey, number];
