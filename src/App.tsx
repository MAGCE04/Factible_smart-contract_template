import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Coins, Trophy, Zap, Settings, Shield } from 'lucide-react';

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
import { useProgram } from './hooks/useProgram';
import { COLLECTION } from './utils/constants';

const AppContent: React.FC = () => {
  const { connected } = useWallet();
  const program = useProgram();
  const { nfts, loading: nftsLoading, error: nftsError, refetch: refetchNFTs } = useNFTs();
  const { loading: userLoading, exists: userExists, refetch: refetchUser } = useUserAccount();
  const { stakeNFT, unstakeNFT, loading: stakingLoading } = useStaking();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'collection' | 'staked'>('all');

  // Filter NFTs based on active tab
  const filteredNFTs = nfts.filter(nft => {
    if (activeTab === 'collection') return nft.isPartOfCollection;
    if (activeTab === 'staked') return nft.isStaked;
    return true; // 'all' tab
  });

  // Count collection NFTs
  const collectionCount = nfts.filter(nft => nft.isPartOfCollection).length;

  // Count staked NFTs
  const stakedCount = nfts.filter(nft => nft.isStaked).length;

  // Add a delay to ensure everything is properly initialized
  useEffect(() => {
    if (connected) {
      const timer = setTimeout(() => {
        setInitializing(false);
      }, 1000); // 1 second delay
      
      return () => clearTimeout(timer);
    }
  }, [connected]);

  const handleStake = async (mintAddress: string) => {
    try {
      const tx = await stakeNFT(mintAddress);
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

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 gradient-pink rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-12 h-12 text-white animate-bounce" />
          </div>
          <h2 className="text-4xl font-extrabold mb-3">Connect Your Wallet</h2>
          <p className="text-lg text-white-70 max-w-md mx-auto">
            Connect your Solana wallet to start staking your NFTs.
          </p>
        </div>
      </div>
    );
  }

  if (initializing || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white-70">
            {initializing ? 'Initializing application...' : 'Loading your account...'}
          </p>
          <p className="text-white-50 text-sm mt-2">
            Program status: {program ? 'Ready' : 'Initializing...'}
          </p>
        </div>
      </div>
    );
  }

  if (!userExists) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <InitializeUserButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container py-8">
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="btn-outline flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            <span>{showAdminPanel ? 'Hide' : 'Show'} Admin Panel</span>
          </button>
        </div>

        {showAdminPanel && (
          <div className="mb-8">
            <AdminPanel />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total NFTs"
            value={nfts.length}
            icon={Coins}
            subtitle="In your wallet"
            gradient="from-purple-600 to-purple-800"
          />
          <StatsCard
            title="NFTs Staked"
            value={stakedCount}
            icon={Trophy}
            subtitle="Currently staked"
            gradient="from-pink-500 to-fuchsia-600"
          />
          <StatsCard
            title={COLLECTION.METADATA.name}
            value={collectionCount}
            icon={Shield}
            subtitle="Verified NFTs"
            gradient="from-indigo-500 to-blue-600"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Your NFTs</h2>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-white-10 rounded-lg p-1">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${activeTab === 'all' ? 'bg-white-20 text-white' : 'text-white-70'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All ({nfts.length})
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${activeTab === 'collection' ? 'bg-white-20 text-white' : 'text-white-70'}`}
                  onClick={() => setActiveTab('collection')}
                >
                  {COLLECTION.METADATA.name} ({collectionCount})
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${activeTab === 'staked' ? 'bg-white-20 text-white' : 'text-white-70'}`}
                  onClick={() => setActiveTab('staked')}
                >
                  Staked ({stakedCount})
                </button>
              </div>
              
              <button
                onClick={refetchNFTs}
                disabled={nftsLoading}
                className="btn-outline text-sm"
              >
                {nftsLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          {nftsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mx-auto mb-4" />
                <p className="text-white-70">Loading your NFTs...</p>
              </div>
            </div>
          ) : nftsError ? (
            <div className="card text-center">
              <p className="text-red-400 mb-4">{nftsError}</p>
              <button onClick={refetchNFTs} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : filteredNFTs.length === 0 ? (
            <div className="card text-center">
              <div className="w-16 h-16 bg-white-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white-60" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No NFTs Found</h3>
              <p className="text-white-70">
                {activeTab === 'all' 
                  ? "You don't have any NFTs in your wallet yet." 
                  : activeTab === 'collection' 
                    ? `You don't have any ${COLLECTION.METADATA.name} NFTs in your wallet.` 
                    : "You don't have any staked NFTs."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map((nft) => (
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
      <div className="min-h-screen">
        <Header />
        <AppContent />
      </div>
    </WalletContextProvider>
  );
};

export default App;