import React from 'react';
import { Coins, Zap } from 'lucide-react';
import WalletButton from './WalletButton';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <div className="logo">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">NFT Staking</h1>
            <p className="text-sm text-white-70">Stake your NFTs and earn rewards</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-white-80">
            <Coins className="w-5 h-5" />
            <span className="text-sm font-medium">Powered by Solana</span>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;