import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useStaking } from '../hooks/useStaking';
import { useUserAccount } from '../hooks/useUserAccount';
import LoadingSpinner from './LoadingSpinner';

const InitializeUserButton: React.FC = () => {
  const { initializeUser, loading } = useStaking();
  const { refetch } = useUserAccount();
  const [error, setError] = useState<string | null>(null);

  const handleInitialize = async () => {
    setError(null);
    
    try {
      console.log("Initializing user account...");
      const tx = await initializeUser();
      console.log('User initialized:', tx);
      await refetch();
    } catch (error) {
      console.error('Error initializing user:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize user account');
    }
  };

  return (
    <div className="card text-center">
      <div className="mb-6">
        <div className="w-16 h-16 gradient-pink rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Welcome to NFT Staking!</h3>
        <p className="text-white-70 mb-2">
          Initialize your account to start staking NFTs.
        </p>
      </div>
      
      <button
        onClick={handleInitialize}
        disabled={loading}
        className="btn-primary mx-auto"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <UserPlus className="w-5 h-5 mr-2" />
            <span>Initialize Account</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-500-20 border border-red-500-30 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default InitializeUserButton;