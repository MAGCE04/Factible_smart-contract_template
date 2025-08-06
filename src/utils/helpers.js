export const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
};
export const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
export const calculateTimeElapsed = (stakedAt) => {
    const now = Math.floor(Date.now() / 1000);
    return Math.floor((now - stakedAt) / 86400); // Days elapsed
};
export const shortenAddress = (address, chars = 4) => {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
