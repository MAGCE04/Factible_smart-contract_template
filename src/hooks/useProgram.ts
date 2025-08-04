import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { PROGRAM_ID } from '../utils/constants';
import { IDL } from '../types/anchor';
import type { AnchorNftStacking } from '../types/anchor';

export const useProgram = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const program = useMemo(() => {
    if (!wallet.publicKey) return null;

    const provider = new AnchorProvider(
      connection,
      wallet as any,
      AnchorProvider.defaultOptions()
    );

    return new Program(
      IDL,
      PROGRAM_ID,
      provider
    ) as Program<AnchorNftStacking>;
  }, [connection, wallet]);

  return program;
};