import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { PROGRAM_ID } from '../utils/constants';
import { IDL, type AnchorNftStacking } from '../types/anchor';

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

    return new Program<AnchorNftStacking>(
      IDL as Idl,
      PROGRAM_ID,
      provider
    );
  }, [connection, wallet]);

  return program;
};