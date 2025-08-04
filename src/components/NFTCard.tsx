import React from 'react';
import { Clock, Lock, Unlock } from 'lucide-react';
import type { NFT } from '../types/nft';
import { formatTime, calculateTimeElapsed } from '../utils/helpers';
import { cn } from '../utils/helpers';

interface NFTCardProps {
  nft: NFT;
  onStake?: () => void;
  onUnstake?: () => void;
  loading?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  onStake,
  onUnstake,
  loading = false
}) => {
  const timeElapsed = nft.stakedAt ? calculateTimeElapsed(nft.stakedAt) : 0;

  return (
    <div className={cn(
      'nft-card',
      nft.isStaked && 'staked'
    )}>
      <div className="relative">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/400/400?random=${nft.mint.slice(-4)}`;
          }}
        />
        
        {nft.isStaked && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Staked</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-white text-lg">{nft.name}</h3>
          <p className="text-white/70 text-sm">{nft.symbol}</p>
        </div>

        {nft.description && (
          <p className="text-white/60 text-sm line-clamp-2">{nft.description}</p>
        )}

        {nft.isStaked && nft.stakedAt && (
          <div className="bg-white/10 rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2 text-white/80">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Staked {timeElapsed} days ago</span>
            </div>
            <p className="text-xs text-white/60">
              Since: {formatTime(nft.stakedAt)}
            </p>
          </div>
        )}

        {nft.attributes && nft.attributes.length > 0 && (
          <div className="space-y-2">
            <p className="text-white/80 text-sm font-medium">Attributes</p>
            <div className="flex flex-wrap gap-2">
              {nft.attributes.slice(0, 3).map((attr, index) => (
                <span
                  key={index}
                  className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                >
                  {attr.trait_type}: {attr.value}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          {nft.isStaked ? (
            <button
              onClick={onUnstake}
              disabled={loading}
              className="btn-secondary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unstake</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onStake}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Stake</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;