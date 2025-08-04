import React from 'react';
import { Coins, Zap } from 'lucide-react';
import WalletButton from './WalletButton';

const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">NFT Staking</h1>
              <p className="text-sm text-white/70">Stake your NFTs and earn rewards</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-white/80">
              <Coins className="w-5 h-5" />
              <span className="text-sm font-medium">Powered by Solana</span>
            </div>
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;