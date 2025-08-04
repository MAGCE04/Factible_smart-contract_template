import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletButton: React.FC = () => {
  return (
    <WalletMultiButton className="!bg-gradient-to-r !from-primary-500 !to-primary-600 hover:!from-primary-600 hover:!to-primary-700 !rounded-lg !font-semibold !transition-all !duration-200" />
  );
};

export default WalletButton;