import { PublicKey } from '@solana/web3.js';
export declare const PROGRAM_ID: PublicKey;
export declare const METADATA_PROGRAM_ID: PublicKey;
export declare const SYSTEM_PROGRAM_ID: PublicKey;
export declare const TOKEN_PROGRAM_ID: PublicKey;
export declare const ASSOCIATED_TOKEN_PROGRAM_ID: PublicKey;
export declare const COLLECTION: {
    MINT: PublicKey;
    HASH: string;
    METADATA: {
        name: string;
        symbol: string;
        creators: Array<{
            address: string;
            share: number;
        }>;
    };
};
export declare const SEEDS: {
    USER: string;
    STAKE: string;
};
