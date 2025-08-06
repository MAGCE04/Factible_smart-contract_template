import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Coins, Zap } from 'lucide-react';
import WalletButton from './WalletButton';
const Header = () => {
    return (_jsx("header", { className: "header", children: _jsxs("div", { className: "header-container", children: [_jsxs("div", { className: "logo-container", children: [_jsx("div", { className: "logo", children: _jsx(Zap, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-white", children: "NFT Staking" }), _jsx("p", { className: "text-sm text-white-70", children: "Stake your NFTs and earn rewards" })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "hidden sm:flex items-center space-x-2 text-white-80", children: [_jsx(Coins, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm font-medium", children: "Powered by Solana" })] }), _jsx(WalletButton, {})] })] }) }));
};
export default Header;
