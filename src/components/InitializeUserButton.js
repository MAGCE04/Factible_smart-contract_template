import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useStaking } from '../hooks/useStaking';
import { useUserAccount } from '../hooks/useUserAccount';
import LoadingSpinner from './LoadingSpinner';
const InitializeUserButton = () => {
    const { initializeUser, loading } = useStaking();
    const { refetch } = useUserAccount();
    const [error, setError] = useState(null);
    const handleInitialize = async () => {
        setError(null);
        try {
            console.log("Initializing user account...");
            const tx = await initializeUser();
            console.log('User initialized:', tx);
            await refetch();
        }
        catch (error) {
            console.error('Error initializing user:', error);
            setError(error instanceof Error ? error.message : 'Failed to initialize user account');
        }
    };
    return (_jsxs("div", { className: "card text-center", children: [_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "w-16 h-16 gradient-pink rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(UserPlus, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Welcome to NFT Staking!" }), _jsx("p", { className: "text-white-70 mb-2", children: "Initialize your account to start staking NFTs." })] }), _jsx("button", { onClick: handleInitialize, disabled: loading, className: "btn-primary mx-auto", children: loading ? (_jsx(LoadingSpinner, { size: "sm" })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "w-5 h-5 mr-2" }), _jsx("span", { children: "Initialize Account" })] })) }), error && (_jsx("div", { className: "mt-4 p-3 bg-red-500-20 border border-red-500-30 rounded-lg text-red-300 text-sm", children: error }))] }));
};
export default InitializeUserButton;
