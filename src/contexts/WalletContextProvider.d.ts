import type { FC, ReactNode } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
interface Props {
    children: ReactNode;
}
declare const WalletContextProvider: FC<Props>;
export default WalletContextProvider;
