"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import React from "react";

export default function useBalance({ publicKey }: { publicKey: string }) {
  const [balance, setBalance] = React.useState<number>(0);

  const network = WalletAdapterNetwork.Mainnet; // or Devnet, Testnet
  const endpoint = clusterApiUrl(network);

  React.useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const connection = new Connection(endpoint);
        const newBalance = await connection.getBalance(
          publicKey as unknown as PublicKey
        );
        setBalance(newBalance / 1e9);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, balance, endpoint]);

  return balance;
}
