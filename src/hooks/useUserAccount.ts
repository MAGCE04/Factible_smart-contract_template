import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from './useProgram';
import { getUserPDA } from '../utils/pdas';
import type { UserAccount } from '../types/nft';

export const useUserAccount = () => {
  const { publicKey } = useWallet();
  const program = useProgram();
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);

  const fetchUserAccount = async () => {
    if (!program || !publicKey) return;

    setLoading(true);
    try {
      const [userPDA] = getUserPDA(publicKey);
      const account = await program.account.user.fetch(userPDA);
      
      setUserAccount({
        points: account.points,
        amountStaked: account.amountStaked,
        bump: account.bump,
      });
      setExists(true);
    } catch (error) {
      console.log('User account not found:', error);
      setUserAccount(null);
      setExists(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAccount();
  }, [program, publicKey]);

  return {
    userAccount,
    loading,
    exists,
    refetch: fetchUserAccount,
  };
};