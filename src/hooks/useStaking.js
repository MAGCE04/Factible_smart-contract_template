import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useProgram } from './useProgram';
import { getStakePDA, getUserPDA } from '../utils/pdas';
export const useStaking = () => {
    const { publicKey } = useWallet();
    const program = useProgram();
    const [loading, setLoading] = useState(false);
    const initializeUser = useCallback(async () => {
        if (!program || !publicKey) {
            throw new Error('Wallet not connected or program not initialized');
        }
        setLoading(true);
        try {
            console.log("Initializing user account...");
            // Get the user PDA
            const [userPDA] = getUserPDA(publicKey);
            console.log("User PDA:", userPDA.toString());
            // Call the initialize_user instruction
            // Use type assertion to access methods
            const tx = await program.methods
                .initializeUser()
                .accounts({
                owner: publicKey,
                userAccount: userPDA,
                systemProgram: SystemProgram.programId,
            })
                .rpc();
            console.log("User initialized with tx:", tx);
            return tx;
        }
        catch (error) {
            console.error("Error initializing user:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [program, publicKey]);
    const stakeNFT = useCallback(async (mintAddress) => {
        if (!program || !publicKey) {
            throw new Error('Wallet not connected or program not initialized');
        }
        setLoading(true);
        try {
            console.log(`Staking NFT with mint ${mintAddress}...`);
            // Convert string address to PublicKey
            const mint = new PublicKey(mintAddress);
            // Get PDAs
            const [userPDA] = getUserPDA(publicKey);
            const [stakePDA] = getStakePDA(mint, publicKey);
            // Get the token account for this NFT
            const tokenAccount = new PublicKey(mintAddress); // This should be the actual token account, not the mint
            console.log("User PDA:", userPDA.toString());
            console.log("Stake PDA:", stakePDA.toString());
            console.log("Token Account:", tokenAccount.toString());
            // Call the stake_nft instruction
            // Use type assertion to access methods
            const tx = await program.methods
                .stakeNft()
                .accounts({
                owner: publicKey,
                mint,
                tokenAccount,
                userAccount: userPDA,
                stakeAccount: stakePDA,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
                .rpc();
            console.log("NFT staked with tx:", tx);
            return tx;
        }
        catch (error) {
            console.error("Error staking NFT:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [program, publicKey]);
    const unstakeNFT = useCallback(async (mintAddress) => {
        if (!program || !publicKey) {
            throw new Error('Wallet not connected or program not initialized');
        }
        setLoading(true);
        try {
            console.log(`Unstaking NFT with mint ${mintAddress}...`);
            // Convert string address to PublicKey
            const mint = new PublicKey(mintAddress);
            // Get PDAs
            const [userPDA] = getUserPDA(publicKey);
            const [stakePDA] = getStakePDA(mint, publicKey);
            // Get the token account for this NFT
            const tokenAccount = new PublicKey(mintAddress); // This should be the actual token account, not the mint
            console.log("User PDA:", userPDA.toString());
            console.log("Stake PDA:", stakePDA.toString());
            console.log("Token Account:", tokenAccount.toString());
            // Call the unstake_nft instruction
            // Use type assertion to access methods
            const tx = await program.methods
                .unstakeNft()
                .accounts({
                owner: publicKey,
                mint,
                tokenAccount,
                userAccount: userPDA,
                stakeAccount: stakePDA,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
                .rpc();
            console.log("NFT unstaked with tx:", tx);
            return tx;
        }
        catch (error) {
            console.error("Error unstaking NFT:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [program, publicKey]);
    return {
        initializeUser,
        stakeNFT,
        unstakeNFT,
        loading,
        programReady: !!program
    };
};
