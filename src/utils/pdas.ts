import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, METADATA_PROGRAM_ID, SEEDS } from './constants';

/**
 * Derives the PDA for a user account
 */
export const getUserPDA = (owner: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SEEDS.USER),
      owner.toBuffer()
    ],
    PROGRAM_ID
  );
};

/**
 * Derives the PDA for a stake account
 */
export const getStakePDA = (mint: PublicKey, owner: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SEEDS.STAKE),
      mint.toBuffer(),
      owner.toBuffer()
    ],
    PROGRAM_ID
  );
};

/**
 * Derives the PDA for a config account
 */
export const getConfigPDA = (): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('config')
    ],
    PROGRAM_ID
  );
};

/**
 * Derives the PDA for a rewards mint account
 */
export const getRewardsMintPDA = (configPDA: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('rewards'),
      configPDA.toBuffer()
    ],
    PROGRAM_ID
  );
};

/**
 * Derives the PDA for a metadata account
 */
export const getMetadataPDA = (mint: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer()
    ],
    METADATA_PROGRAM_ID
  );
};

/**
 * Derives the PDA for an edition account
 */
export const getEditionPDA = (mint: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition')
    ],
    METADATA_PROGRAM_ID
  );
};