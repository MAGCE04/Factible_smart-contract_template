import React from 'react';
import { UserPlus } from 'lucide-react';
import { useStaking } from '../hooks/useStaking';
import { useUserAccount } from '../hooks/useUserAccount';

const InitializeUserButton: React.FC = () => {
  const { initializeUser, loading } = useStaking();
  const { refetch } = useUserAccount();

  const handleInitialize = async () => {
    try {
      const tx = await initializeUser();
      console.log('User initialized:', tx);
      await refetch();
    } catch (error) {
      console.error('Error initializing user:', error);
    }
  };

  return (
    <div className="card text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Welcome to NFT Staking!</h3>
        <p className="text-white/70">
          Initialize your account to start staking NFTs and earning rewards.
        </p>
      </div>
      
      <button
        onClick={handleInitialize}
        disabled={loading}
        className="btn-primary flex items-center justify-center space-x-2 mx-auto"
      >
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            <span>Initialize Account</span>
          </>
        )}
      </button>
    </div>
  );
};

export default InitializeUserButton;