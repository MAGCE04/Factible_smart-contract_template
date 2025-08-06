import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
const WalletButton: React.FC = () => {
  return (
    <WalletMultiButton />
  );
};

export default WalletButton;
