import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Settings, Plus } from 'lucide-react';
import { useProgram } from '../hooks/useProgram';
import { getConfigPDA, getRewardsMintPDA } from '../utils/pdas';
import { SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const AdminPanel: React.FC = () => {
  const { publicKey } = useWallet();
  const program = useProgram();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pointsPerStake: 10,
    maxStake: 10,
    freezePeriod: 0,
  });

  const initializeConfig = async () => {
    if (!program || !publicKey) return;

    setLoading(true);
    try {
      const [configPDA] = getConfigPDA();
      const [rewardsMintPDA] = getRewardsMintPDA(configPDA);

      const tx = await program.methods
        .initializeConfig(
          formData.pointsPerStake,
          formData.maxStake,
          formData.freezePeriod
        )
        .accounts({
          admin: publicKey,
          config: configPDA,
          rewardsMint: rewardsMintPDA,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      console.log('Config initialized:', tx);
      alert('Config initialized successfully!');
    } catch (error) {
      console.error('Error initializing config:', error);
      alert('Error initializing config. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Admin Panel</h3>
          <p className="text-white/70">Initialize staking configuration</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Points Per Stake
          </label>
          <input
            type="number"
            value={formData.pointsPerStake}
            onChange={(e) => setFormData({ ...formData, pointsPerStake: parseInt(e.target.value) || 0 })}
            className="input w-full"
            min="1"
            max="255"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Max Stake
          </label>
          <input
            type="number"
            value={formData.maxStake}
            onChange={(e) => setFormData({ ...formData, maxStake: parseInt(e.target.value) || 0 })}
            className="input w-full"
            min="1"
            max="255"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Freeze Period (days)
          </label>
          <input
            type="number"
            value={formData.freezePeriod}
            onChange={(e) => setFormData({ ...formData, freezePeriod: parseInt(e.target.value) || 0 })}
            className="input w-full"
            min="0"
          />
        </div>

        <button
          onClick={initializeConfig}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Initialize Config</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;