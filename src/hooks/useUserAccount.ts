import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from './useProgram';
import { getUserPDA } from '../utils/pdas';
import type { UserAccount } from '../types/nft';
import BN from 'bn.js'; 

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
      const account = await (program.account as any).user.fetch(userPDA);

      // ✅ Aquí nos aseguramos de que siempre tenga valores válidos
      setUserAccount({
        points: account?.points ?? new BN(0),
        amountStaked: account?.amountStaked ?? new BN(0),
        bump: account?.bump ?? 0,
      });

      setExists(true);
      console.log('Cuenta de usuario:', account); // ✅ Debug útil
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
