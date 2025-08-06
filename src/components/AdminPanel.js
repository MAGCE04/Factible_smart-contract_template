import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Settings, Plus } from 'lucide-react';
import { useProgram } from '../hooks/useProgram';
import { getConfigPDA, getRewardsMintPDA } from '../utils/pdas';
import { SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
const AdminPanel = () => {
    const { publicKey } = useWallet();
    const program = useProgram();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        pointsPerStake: 10,
        maxStake: 10,
        freezePeriod: 0,
    });
    const initializeConfig = async () => {
        if (!program || !publicKey)
            return;
        setLoading(true);
        try {
            const [configPDA] = getConfigPDA();
            const [rewardsMintPDA] = getRewardsMintPDA(configPDA);
            const tx = await program.methods
                .initializeConfig(formData.pointsPerStake, formData.maxStake, formData.freezePeriod)
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
        }
        catch (error) {
            console.error('Error initializing config:', error);
            alert('Error initializing config. Check console for details.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "card", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600", children: _jsx(Settings, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: "Admin Panel" }), _jsx("p", { className: "text-white/70", children: "Initialize staking configuration" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white/80 text-sm font-medium mb-2", children: "Points Per Stake" }), _jsx("input", { type: "number", value: formData.pointsPerStake, onChange: (e) => setFormData({ ...formData, pointsPerStake: parseInt(e.target.value) || 0 }), className: "input w-full", min: "1", max: "255" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/80 text-sm font-medium mb-2", children: "Max Stake" }), _jsx("input", { type: "number", value: formData.maxStake, onChange: (e) => setFormData({ ...formData, maxStake: parseInt(e.target.value) || 0 }), className: "input w-full", min: "1", max: "255" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/80 text-sm font-medium mb-2", children: "Freeze Period (days)" }), _jsx("input", { type: "number", value: formData.freezePeriod, onChange: (e) => setFormData({ ...formData, freezePeriod: parseInt(e.target.value) || 0 }), className: "input w-full", min: "0" })] }), _jsx("button", { onClick: initializeConfig, disabled: loading, className: "btn-primary w-full flex items-center justify-center space-x-2", children: loading ? (_jsx("div", { className: "loading-spinner" })) : (_jsxs(_Fragment, { children: [_jsx(Plus, { className: "w-5 h-5" }), _jsx("span", { children: "Initialize Config" })] })) })] })] }));
};
export default AdminPanel;
