import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Coins, Trophy, Clock, Zap, Settings } from 'lucide-react';

import WalletContextProvider from './contexts/WalletContextProvider';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import NFTCard from './components/NFTCard';
import LoadingSpinner from './components/LoadingSpinner';
import InitializeUserButton from './components/InitializeUserButton';
import AdminPanel from './components/AdminPanel';

import { useNFTs } from './hooks/useNFTs';
import { useUserAccount } from './hooks/useUserAccount';
import { useStaking } from './hooks/useStaking';
import { DEFAULT_COLLECTION_MINT } from './utils/constants';

const AppContent: React.FC = () => {
  const { connected } = useWallet();
  const { nfts, loading: nftsLoading, error: nftsError, refetch: refetchNFTs } = useNFTs();
  const { userAccount, loading: userLoading, exists: userExists, refetch: refetchUser } = useUserAccount();
  const { stakeNFT, unstakeNFT, claimRewards, loading: stakingLoading } = useStaking();
  const [showAdminPanel, setShowAdminPanel] = React.useState(false);

  const handleStake = async (mintAddress: string) => {
    try {
      const tx = await stakeNFT(mintAddress, DEFAULT_COLLECTION_MINT);
      console.log('NFT staked:', tx);
      await Promise.all([refetchNFTs(), refetchUser()]);
    } catch (error) {
      console.error('Error staking NFT:', error);
    }
  };

  const handleUnstake = async (mintAddress: string) => {
    try {
      const tx = await unstakeNFT(mintAddress);
      console.log('NFT unstaked:', tx);
      await Promise.all([refetchNFTs(), refetchUser()]);
    } catch (error) {
      console.error('Error unstaking NFT:', error);
    }
  };

  const handleClaim = async () => {
    try {
      const tx = await claimRewards();
      console.log('Rewards claimed:', tx);
      await refetchUser();
    } catch (error) {
      console.error('Error claiming rewards:', error);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 text-white">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-12 h-12 text-white animate-bounce" />
          </div>
          <h2 className="text-4xl font-extrabold mb-3">Connect Your Wallet</h2>
          <p className="text-lg text-white/70 max-w-md mx-auto">
            Connect your Solana wallet to start staking your NFTs and earning exclusive rewards.
          </p>
        </div>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white/70">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!userExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="max-w-md w-full">
          <InitializeUserButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="btn-outline flex items-center space-x-2 text-white hover:text-purple-400"
          >
            <Settings className="w-4 h-4" />
            <span>{showAdminPanel ? 'Hide' : 'Show'} Admin Panel</span>
          </button>
        </div>

        {showAdminPanel && (
          <div className="mb-8">
            <AdminPanel />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Points" value={userAccount?.points || 0} icon={Coins} subtitle="Available to claim" gradient="from-purple-600 to-purple-800" />
          <StatsCard title="NFTs Staked" value={userAccount?.amountStaked || 0} icon={Trophy} subtitle="Currently earning rewards" gradient="from-pink-500 to-fuchsia-600" />
          <StatsCard title="Total NFTs" value={nfts.length} icon={Clock} subtitle="In your wallet" gradient="from-indigo-500 to-blue-600" />
        </div>

        {userAccount && userAccount.points > 0 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Claim Your Rewards</h3>
                <p className="text-white/70">
                  You have {userAccount.points} points ready to claim!
                </p>
              </div>
              <button
                onClick={handleClaim}
                disabled={stakingLoading}
                className="btn-primary flex items-center space-x-2"
              >
                {stakingLoading ? <LoadingSpinner size="sm" /> : (<><Coins className="w-5 h-5" /><span>Claim Rewards</span></>)}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Your NFTs</h2>
            <button
              onClick={refetchNFTs}
              disabled={nftsLoading}
              className="btn-outline text-sm"
            >
              {nftsLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {nftsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mx-auto mb-4" />
                <p className="text-white/70">Loading your NFTs...</p>
              </div>
            </div>
          ) : nftsError ? (
            <div className="card text-center">
              <p className="text-red-400 mb-4">{nftsError}</p>
              <button onClick={refetchNFTs} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : nfts.length === 0 ? (
            <div className="card text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No NFTs Found</h3>
              <p className="text-white/70">
                You don't have any NFTs in your wallet yet. Get some NFTs to start staking!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <NFTCard
                  key={nft.mint}
                  nft={nft}
                  onStake={() => handleStake(nft.mint)}
                  onUnstake={() => handleUnstake(nft.mint)}
                  loading={stakingLoading}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <Header />
        <AppContent />
      </div>
    </WalletContextProvider>
  );
};

export default App;
