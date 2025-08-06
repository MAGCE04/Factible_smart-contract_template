export declare const useStaking: () => {
    initializeUser: () => Promise<any>;
    stakeNFT: (mintAddress: string) => Promise<any>;
    unstakeNFT: (mintAddress: string) => Promise<any>;
    loading: boolean;
    programReady: boolean;
};
