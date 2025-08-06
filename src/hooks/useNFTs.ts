import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useProgram } from './useProgram';
import { getStakePDA, getMetadataPDA } from '../utils/pdas';
import type { NFT } from '../types/nft';
import { COLLECTION } from '../utils/constants';

// Define a type for the collection creator
interface CollectionCreator {
  address: string;
  share: number;
}

export const useNFTs = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const program = useProgram();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = async () => {
    if (!publicKey) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching NFTs for wallet:", publicKey.toString());
      
      // Get all token accounts for the user
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );

      console.log(`Found ${tokenAccounts.value.length} token accounts`);

      const nftPromises = tokenAccounts.value
        .filter(account => {
          const tokenAmount = account.account.data.parsed.info.tokenAmount;
          return tokenAmount.uiAmount === 1 && tokenAmount.decimals === 0;
        })
        .map(async (account) => {
          try {
            const mintAddress = account.account.data.parsed.info.mint;
            const mint = new PublicKey(mintAddress);
            console.log("Processing NFT with mint:", mintAddress);
            
            // Check if this NFT is staked
            let isStaked = false;
            let stakedAt = undefined;
            
            if (program) {
              try {
                const [stakePDA] = getStakePDA(mint, publicKey);
                // Use type assertion to access stakeAccount
                const stakeAccount = await (program as any).account.stakeAccount.fetch(stakePDA);
                isStaked = stakeAccount.isInitialized;
                stakedAt = Number(stakeAccount.stakeTime);
                console.log(`NFT ${mintAddress} is staked since ${stakedAt}`);
              } catch (e) {
                // Not staked or stake account doesn't exist
                console.log(`NFT ${mintAddress} is not staked`);
              }
            }
            
            // Try to fetch metadata from the Metaplex metadata program
            try {
              // Get the metadata PDA
              const [metadataPDA] = getMetadataPDA(mint);

              // Fetch the metadata account
              const metadataAccount = await connection.getAccountInfo(metadataPDA);
              
              if (metadataAccount) {
                // Parse the metadata (this is a simplified version)
                // In a real app, you'd use proper decoding of the metadata format
                const data = metadataAccount.data;
                const name = data.slice(33, 65).toString().replace(/\0/g, '');
                const symbol = data.slice(65, 73).toString().replace(/\0/g, '');
                
                // Try to extract URI and fetch JSON metadata
                let uri = '';
                let description = '';
                let image = '';
                let attributes: Array<{trait_type: string, value: string | number}> = [];
                let collection = null;
                let collectionHash = null;
                let creators: Array<{address: string, share: number, verified?: boolean}> = [];
                let isPartOfCollection = false;
                
                try {
                  // This is a very simplified approach - in a real app you'd use proper decoding
                  const uriLength = data[73];
                  uri = data.slice(74, 74 + uriLength).toString();
                  
                  // Fetch the JSON metadata
                  if (uri) {
                    const response = await fetch(uri);
                    const json = await response.json();
                    description = json.description || '';
                    image = json.image || '';
                    attributes = json.attributes || [];
                    
                    // Check collection information
                    if (json.collection) {
                      collection = json.collection.name || json.collection.key || '';
                      
                      // Check if this is part of your collection
                      if (json.collection.key === COLLECTION.MINT.toString()) {
                        isPartOfCollection = true;
                      }
                    }
                    
                    // Check collection hash
                    if (json.collection_hash) {
                      collectionHash = json.collection_hash;
                      
                      // Check if hash matches your collection
                      if (collectionHash === COLLECTION.HASH) {
                        isPartOfCollection = true;
                      }
                    }
                    
                    // Check creators
                    if (json.properties && json.properties.creators) {
                      creators = json.properties.creators as Array<{address: string, share: number, verified?: boolean}>;
                      
                      // Check if creators match your collection
                      // This is a simplified check - you might want to do more thorough verification
                      const collectionCreators = COLLECTION.METADATA.creators as CollectionCreator[];
                      if (collectionCreators && collectionCreators.length > 0) {
                        const creatorMatch = collectionCreators.some(collectionCreator => 
                          creators.some(nftCreator => 
                            nftCreator.address === collectionCreator.address
                          )
                        );
                        
                        if (creatorMatch) {
                          isPartOfCollection = true;
                        }
                      }
                    }
                    
                    // Check name and symbol
                    if (name.toLowerCase().includes(COLLECTION.METADATA.name.toLowerCase()) || 
                        symbol.toLowerCase().includes(COLLECTION.METADATA.symbol.toLowerCase())) {
                      isPartOfCollection = true;
                    }
                  }
                } catch (e) {
                  console.error("Error fetching NFT metadata JSON:", e);
                }

                const nft: NFT = {
                  mint: mintAddress,
                  name: name || `NFT #${mintAddress.slice(-4)}`,
                  symbol: symbol || 'UNKNOWN',
                  image: image || `https://picsum.photos/400/400?random=${mintAddress.slice(-4)}`,
                  description: description || 'No description available',
                  attributes: attributes,
                  isStaked: isStaked,
                  stakedAt: stakedAt,
                  collection: collection,
                  collectionHash: collectionHash,
                  creators: creators,
                  isPartOfCollection: isPartOfCollection,
                  tokenAccount: account.pubkey.toString()
                };

                console.log("Successfully processed NFT:", nft.name, "Is part of collection:", isPartOfCollection);
                return nft;
              }
            } catch (metadataError) {
              console.error("Error fetching NFT metadata:", metadataError);
            }

            // Fallback if metadata fetch fails
            return {
              mint: mintAddress,
              name: `NFT #${mintAddress.slice(-4)}`,
              symbol: 'UNKNOWN',
              image: `https://picsum.photos/400/400?random=${mintAddress.slice(-4)}`,
              description: 'Unknown NFT',
              attributes: [],
              isStaked: isStaked,
              stakedAt: stakedAt,
              isPartOfCollection: false,
              tokenAccount: account.pubkey.toString()
            };
          } catch (err) {
            console.error('Error processing NFT:', err);
            return null;
          }
        });

      const fetchedNFTs = (await Promise.all(nftPromises)).filter(Boolean) as NFT[];
      
      console.log(`Found ${fetchedNFTs.length} NFTs`);
      setNfts(fetchedNFTs);
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      setError('Failed to fetch NFTs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchNFTs();
    }
  }, [publicKey, connection, program]);

  return { nfts, loading, error, refetch: fetchNFTs };
};