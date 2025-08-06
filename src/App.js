import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Coins, Trophy, Clock, Zap, Settings, Shield } from 'lucide-react';
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
const AppContent = () => {
    const { connected } = useWallet();
    const program = useProgram();
    const { nfts, loading: nftsLoading, error: nftsError, refetch: refetchNFTs } = useNFTs();
    const { userAccount, loading: userLoading, exists: userExists, refetch: refetchUser } = useUserAccount();
    const { stakeNFT, unstakeNFT, loading: stakingLoading } = useStaking();
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    // Filter NFTs based on active tab
    const filteredNFTs = nfts.filter(nft => {
        if (activeTab === 'collection')
            return nft.isPartOfCollection;
        if (activeTab === 'staked')
            return nft.isStaked;
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
    const handleStake = async (mintAddress) => {
        try {
            const tx = await stakeNFT(mintAddress);
            console.log('NFT staked:', tx);
            await Promise.all([refetchNFTs(), refetchUser()]);
        }
        catch (error) {
            console.error('Error staking NFT:', error);
        }
    };
    const handleUnstake = async (mintAddress) => {
        try {
            const tx = await unstakeNFT(mintAddress);
            console.log('NFT unstaked:', tx);
            await Promise.all([refetchNFTs(), refetchUser()]);
        }
        catch (error) {
            console.error('Error unstaking NFT:', error);
        }
    };
    if (!connected) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center px-4", children: [_jsx("div", { className: "w-24 h-24 gradient-pink rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Zap, { className: "w-12 h-12 text-white animate-bounce" }) }), _jsx("h2", { className: "text-4xl font-extrabold mb-3", children: "Connect Your Wallet" }), _jsx("p", { className: "text-lg text-white-70 max-w-md mx-auto", children: "Connect your Solana wallet to start staking your NFTs." })] }) }));
    }
    if (initializing || userLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(LoadingSpinner, { size: "lg", className: "mx-auto mb-4" }), _jsx("p", { className: "text-white-70", children: initializing ? 'Initializing application...' : 'Loading your account...' }), _jsxs("p", { className: "text-white-50 text-sm mt-2", children: ["Program status: ", program ? 'Ready' : 'Initializing...'] })] }) }));
    }
    if (!userExists) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsx("div", { className: "max-w-md w-full", children: _jsx(InitializeUserButton, {}) }) }));
    }
    return (_jsx("div", { className: "min-h-screen", children: _jsxs("main", { className: "container py-8", children: [_jsx("div", { className: "mb-6 flex justify-end", children: _jsxs("button", { onClick: () => setShowAdminPanel(!showAdminPanel), className: "btn-outline flex items-center", children: [_jsx(Settings, { className: "w-4 h-4 mr-2" }), _jsxs("span", { children: [showAdminPanel ? 'Hide' : 'Show', " Admin Panel"] })] }) }), showAdminPanel && (_jsx("div", { className: "mb-8", children: _jsx(AdminPanel, {}) })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(StatsCard, { title: "Total NFTs", value: nfts.length, icon: Coins, subtitle: "In your wallet", gradient: "from-purple-600 to-purple-800" }), _jsx(StatsCard, { title: "NFTs Staked", value: stakedCount, icon: Trophy, subtitle: "Currently staked", gradient: "from-pink-500 to-fuchsia-600" }), _jsx(StatsCard, { title: COLLECTION.METADATA.name, value: collectionCount, icon: Shield, subtitle: "Verified NFTs", gradient: "from-indigo-500 to-blue-600" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Your NFTs" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex bg-white-10 rounded-lg p-1", children: [_jsxs("button", { className: `px-3 py-1 rounded-md text-sm ${activeTab === 'all' ? 'bg-white-20 text-white' : 'text-white-70'}`, onClick: () => setActiveTab('all'), children: ["All (", nfts.length, ")"] }), _jsxs("button", { className: `px-3 py-1 rounded-md text-sm ${activeTab === 'collection' ? 'bg-white-20 text-white' : 'text-white-70'}`, onClick: () => setActiveTab('collection'), children: [COLLECTION.METADATA.name, " (", collectionCount, ")"] }), _jsxs("button", { className: `px-3 py-1 rounded-md text-sm ${activeTab === 'staked' ? 'bg-white-20 text-white' : 'text-white-70'}`, onClick: () => setActiveTab('staked'), children: ["Staked (", stakedCount, ")"] })] }), _jsx("button", { onClick: refetchNFTs, disabled: nftsLoading, className: "btn-outline text-sm", children: nftsLoading ? 'Loading...' : 'Refresh' })] })] }), nftsLoading ? (_jsx("div", { className: "flex items-center justify-center py-12", children: _jsxs("div", { className: "text-center", children: [_jsx(LoadingSpinner, { size: "lg", className: "mx-auto mb-4" }), _jsx("p", { className: "text-white-70", children: "Loading your NFTs..." })] }) })) : nftsError ? (_jsxs("div", { className: "card text-center", children: [_jsx("p", { className: "text-red-400 mb-4", children: nftsError }), _jsx("button", { onClick: refetchNFTs, className: "btn-primary", children: "Try Again" })] })) : filteredNFTs.length === 0 ? (_jsxs("div", { className: "card text-center", children: [_jsx("div", { className: "w-16 h-16 bg-white-10 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Trophy, { className: "w-8 h-8 text-white-60" }) }), _jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "No NFTs Found" }), _jsx("p", { className: "text-white-70", children: activeTab === 'all'
                                        ? "You don't have any NFTs in your wallet yet."
                                        : activeTab === 'collection'
                                            ? `You don't have any ${COLLECTION.METADATA.name} NFTs in your wallet.`
                                            : "You don't have any staked NFTs." })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredNFTs.map((nft) => (_jsx(NFTCard, { nft: nft, onStake: () => handleStake(nft.mint), onUnstake: () => handleUnstake(nft.mint), loading: stakingLoading }, nft.mint))) }))] })] }) }));
};
const App = () => {
    return (_jsx(WalletContextProvider, { children: _jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsx(AppContent, {})] }) }));
};
export default App;
