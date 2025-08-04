import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import type { NFT, NFTMetadata } from '../types/nft';

export const useNFTs = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = async () => {
    if (!publicKey) return;

    setLoading(true);
    setError(null);

    try {
      // Get all token accounts for the user
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );

      const nftPromises = tokenAccounts.value
        .filter(account => {
          const tokenAmount = account.account.data.parsed.info.tokenAmount;
          return tokenAmount.uiAmount === 1 && tokenAmount.decimals === 0;
        })
        .map(async (account) => {
          try {
            const mintAddress = account.account.data.parsed.info.mint;
            
            // Fetch metadata
            const metadataResponse = await fetch(
              `https://api.devnet.solana.com`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: 1,
                  method: 'getAccountInfo',
                  params: [
                    mintAddress,
                    { encoding: 'jsonParsed' }
                  ]
                })
              }
            );

            // For demo purposes, create mock NFT data
            const nft: NFT = {
              mint: mintAddress,
              name: `NFT #${mintAddress.slice(-4)}`,
              symbol: 'DEMO',
              image: `https://picsum.photos/400/400?random=${mintAddress.slice(-4)}`,
              description: 'Demo NFT for staking',
              attributes: [
                { trait_type: 'Rarity', value: 'Common' },
                { trait_type: 'Type', value: 'Demo' }
              ],
              isStaked: false,
            };

            return nft;
          } catch (err) {
            console.error('Error fetching NFT metadata:', err);
            return null;
          }
        });

      const fetchedNFTs = (await Promise.all(nftPromises)).filter(Boolean) as NFT[];
      setNfts(fetchedNFTs);
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      setError('Failed to fetch NFTs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [publicKey, connection]);

  return { nfts, loading, error, refetch: fetchNFTs };
};