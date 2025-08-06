import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const StatsCard = ({ title, value, subtitle, icon: Icon, gradient }) => {
    // Map gradient names to CSS classes
    const gradientClass = gradient === 'from-purple-600 to-purple-800' ? 'gradient-purple' :
        gradient === 'from-pink-500 to-fuchsia-600' ? 'gradient-pink' :
            gradient === 'from-indigo-500 to-blue-600' ? 'gradient-blue' :
                'gradient-purple'; // Default
    return (_jsxs("div", { className: "stats-card", children: [_jsx("div", { className: `w-12 h-12 ${gradientClass} rounded-full flex items-center justify-center mx-auto mb-4`, children: _jsx(Icon, { className: "w-6 h-6 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-1", children: value.toLocaleString() }), _jsx("p", { className: "text-lg font-semibold text-white mb-1", children: title }), _jsx("p", { className: "text-sm text-white-70", children: subtitle })] }));
};
export default StatsCard;
