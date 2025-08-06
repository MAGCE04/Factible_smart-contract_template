import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

// ⚠️ Asegúrate de tener "resolveJsonModule": true en tu tsconfig
import idl from '../anchor_nft_stacking.json';

const PROGRAM_ID = new PublicKey(idl.metadata.address);

export const useProgram = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const program = useMemo(() => {
    // Verificación de que la cartera está conectada.
    // Solo necesitamos que la publicKey esté presente.
    if (!wallet.publicKey) {
      return null;
    }

    try {
      // 1. Creación del objeto wallet compatible con Anchor.
      //    Utilizamos type assertion para asegurar a TypeScript que
      //    el objeto 'wallet' cumple con la interfaz 'Wallet' de Anchor.
      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions!, // El '!' le dice a TypeScript que estas propiedades están definidas
        signTransaction: wallet.signTransaction!,
      } as Wallet;

      // 2. Pasamos el objeto 'anchorWallet' al constructor de AnchorProvider.
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        { commitment: 'processed' }
      );

      // 3. Creamos la instancia del programa.
      return new Program(idl as any, PROGRAM_ID, provider);
    } catch (error) {
      console.error("Error creating program:", error);
      return null;
    }
  }, [connection, wallet]);

  return program;
};