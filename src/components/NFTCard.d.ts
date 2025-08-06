import React from 'react';
import type { NFT } from '../types/nft';
interface NFTCardProps {
    nft: NFT;
    onStake?: () => void;
    onUnstake?: () => void;
    loading?: boolean;
}
declare const NFTCard: React.FC<NFTCardProps>;
export default NFTCard;
