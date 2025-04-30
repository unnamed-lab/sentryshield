import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { getUser, getWallets } from "@civic/auth-web3/nextjs";
import Link from "next/link";
// import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import CopyBtn from "./copy-btn";
// import useBalance from "@/hooks/get-balance";

export default async function AccountInfo() {
  const user = await getUser();
  const wallets = await getWallets();
  const solanaWallet = wallets?.find((wallet) => wallet.type === "solana");
  const walletAddress = solanaWallet?.walletAddress || "N/A";
  const walletNetwork = solanaWallet?.type === "solana" ? "Solana" : "N/A";

  // const walletBalance = useBalance(walletAddress);

  return (
    <Card className="bg-gradient-to-r from-slate-900 to-primary text-white border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <Avatar className="h-16 w-16 border-2 border-blue-500">
              <AvatarImage
                src={user?.picture + "?height=64&width=64"}
                alt="Wallet"
              />
              <AvatarFallback>
                <Wallet className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  {walletNetwork}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-blue-300 border-blue-400/30"
                >
                  System Account
                </Badge>
              </div>
              <h1 className="text-2xl font-bold mt-1">
                {/* ${walletBalance.toLocaleString()} */}
              </h1>
              <div className="flex items-center gap-5 mt-1 max-w-full overflow-hidden">
                <span className="text-base font-medium text-slate-300 truncate">
                  {walletAddress}
                </span>

                <CopyBtn text={walletAddress} />

                <Link
                  href={`https://solscan.io/account/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white flex-shrink-0 bg-slate-800 p-3 rounded-md"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
