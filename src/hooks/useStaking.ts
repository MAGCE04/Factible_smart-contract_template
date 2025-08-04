import { useState, useCallback } from 'react';
//import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useProgram } from './useProgram';
import { 
  getConfigPDA, 
  getUserPDA, 
  getStakePDA, 
  getRewardsMintPDA, 
  getMetadataPDA, 
  getEditionPDA 
} from '../utils/pdas';
import { METADATA_PROGRAM_ID } from '../utils/constants';

export const useStaking = () => {
  //const { connection } = useConnection();
  //const { publicKey, sendTransaction } = useWallet();
  const { publicKey } = useWallet();
  const program = useProgram();
  const [loading, setLoading] = useState(false);

  const initializeUser = useCallback(async () => {
    if (!program || !publicKey) throw new Error('Wallet not connected');

    setLoading(true);
    try {
      const [userPDA] = getUserPDA(publicKey);

      const tx = await program.methods
        .initializeUser()
        .accounts({
          user: publicKey,
          userAccount: userPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey]);

  const stakeNFT = useCallback(async (
    mintAddress: string,
    collectionMint: string
  ) => {
    if (!program || !publicKey) throw new Error('Wallet not connected');

    setLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const collection = new PublicKey(collectionMint);
      const [configPDA] = getConfigPDA();
      const [userPDA] = getUserPDA(publicKey);
      const [stakePDA] = getStakePDA(mint, configPDA);
      const [metadataPDA] = getMetadataPDA(mint);
      const [editionPDA] = getEditionPDA(mint);

      const mintAta = getAssociatedTokenAddressSync(mint, publicKey);

      const tx = await program.methods
        .stake()
        .accounts({
          user: publicKey,
          mint,
          collectionMint: collection,
          mintAta,
          metadata: metadataPDA,
          edition: editionPDA,
          config: configPDA,
          stakeAccount: stakePDA,
          userAccount: userPDA,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadataProgram: METADATA_PROGRAM_ID,
        })
        .rpc();

      return tx;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey]);

  const unstakeNFT = useCallback(async (mintAddress: string) => {
    if (!program || !publicKey) throw new Error('Wallet not connected');

    setLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const [configPDA] = getConfigPDA();
      const [userPDA] = getUserPDA(publicKey);
      const [stakePDA] = getStakePDA(mint, configPDA);
      const [editionPDA] = getEditionPDA(mint);

      const mintAta = getAssociatedTokenAddressSync(mint, publicKey);

      const tx = await program.methods
        .unstake()
        .accounts({
          user: publicKey,
          mint,
          mintAta,
          edition: editionPDA,
          config: configPDA,
          stakeAccount: stakePDA,
          userAccount: userPDA,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadataProgram: METADATA_PROGRAM_ID,
        })
        .rpc();

      return tx;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey]);

  const claimRewards = useCallback(async () => {
    if (!program || !publicKey) throw new Error('Wallet not connected');

    setLoading(true);
    try {
      const [configPDA] = getConfigPDA();
      const [userPDA] = getUserPDA(publicKey);
      const [rewardsMintPDA] = getRewardsMintPDA(configPDA);

      const rewardsAta = getAssociatedTokenAddressSync(rewardsMintPDA, publicKey);

      const tx = await program.methods
        .claim()
        .accounts({
          user: publicKey,
          userAccount: userPDA,
          rewardsMint: rewardsMintPDA,
          config: configPDA,
          rewardsAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .rpc();

      return tx;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey]);

  return {
    initializeUser,
    stakeNFT,
    unstakeNFT,
    claimRewards,
    loading,
  };
};