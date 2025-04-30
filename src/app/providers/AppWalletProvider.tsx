"use client";

import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import { clusterApiUrl } from "@solana/web3.js";

// Wrap the content with the necessary providers to give access to hooks: solana wallet adapter & civic auth provider
export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const network = WalletAdapterNetwork.Mainnet; // or Devnet, Testnet
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <CivicAuthProvider>{children}</CivicAuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

// A simple hook to get the wallet's balance in lamports
export const useBalance = () => {
  const [balance, setBalance] = React.useState<number>();
  // The Solana Wallet Adapter hooks
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  if (publicKey) {
    connection.getBalance(publicKey).then(setBalance);
  }

  return balance;
};
