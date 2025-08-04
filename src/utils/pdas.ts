import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, METADATA_PROGRAM_ID, SEEDS } from './constants';

export const getConfigPDA = (): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.CONFIG)],
    PROGRAM_ID
  );
};

export const getUserPDA = (userPublicKey: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.USER), userPublicKey.toBuffer()],
    PROGRAM_ID
  );
};

export const getStakePDA = (
  mintPublicKey: PublicKey,
  configPublicKey: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SEEDS.STAKE),
      mintPublicKey.toBuffer(),
      configPublicKey.toBuffer(),
    ],
    PROGRAM_ID
  );
};

export const getRewardsMintPDA = (configPublicKey: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.REWARDS), configPublicKey.toBuffer()],
    PROGRAM_ID
  );
};

export const getMetadataPDA = (mintPublicKey: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SEEDS.METADATA),
      METADATA_PROGRAM_ID.toBuffer(),
      mintPublicKey.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );
};

export const getEditionPDA = (mintPublicKey: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SEEDS.METADATA),
      METADATA_PROGRAM_ID.toBuffer(),
      mintPublicKey.toBuffer(),
      Buffer.from(SEEDS.EDITION),
    ],
    METADATA_PROGRAM_ID
  );
};