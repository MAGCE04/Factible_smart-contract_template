import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : '';
    return (_jsx("div", { className: `loading-spinner ${sizeClass} ${className}`, role: "status", children: _jsx("span", { className: "sr-only", children: "Loading..." }) }));
};
export default LoadingSpinner;
