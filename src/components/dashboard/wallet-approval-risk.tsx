"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertTriangle, Clock, Wallet, ExternalLink } from "lucide-react"

export function WalletApprovalRisk() {
  // Mock approvals data
  const approvals = [
    {
      tokenName: "Uniswap V2",
      tokenSymbol: "UNI-V2",
      tokenAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      spenderName: "Uniswap Router",
      risk: "Low",
      riskScore: 92,
      allowance: "Unlimited",
      lastInteraction: "2 days ago",
    },
    {
      tokenName: "USD Coin",
      tokenSymbol: "USDC",
      tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      spenderName: "Compound",
      risk: "Low",
      riskScore: 95,
      allowance: "1,000 USDC",
      lastInteraction: "1 week ago",
    },
    {
      tokenName: "Dai Stablecoin",
      tokenSymbol: "DAI",
      tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      spenderName: "Aave",
      risk: "Low",
      riskScore: 90,
      allowance: "500 DAI",
      lastInteraction: "2 weeks ago",
    },
    {
      tokenName: "ChainLink Token",
      tokenSymbol: "LINK",
      tokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      spenderName: "Unknown Contract",
      risk: "High",
      riskScore: 35,
      allowance: "Unlimited",
      lastInteraction: "3 days ago",
    },
    {
      tokenName: "Wrapped Bitcoin",
      tokenSymbol: "WBTC",
      tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      spenderName: "SushiSwap",
      risk: "Medium",
      riskScore: 75,
      allowance: "0.1 WBTC",
      lastInteraction: "5 days ago",
    },
  ]

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="space-y-4">
      {approvals.map((approval, index) => (
        <div key={index} className="flex flex-col space-y-3 border-b pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{approval.tokenName}</span>
                <Badge variant="outline">{approval.tokenSymbol}</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                {approval.tokenAddress.substring(0, 6)}...
                {approval.tokenAddress.substring(approval.tokenAddress.length - 4)}
                <a href="#" className="hover:text-primary">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <Badge className={getRiskBadgeColor(approval.risk)}>{approval.risk} Risk</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground">Spender</div>
              <div>{approval.spenderName}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Allowance</div>
              <div className={cn(approval.allowance === "Unlimited" && "text-yellow-500 font-medium")}>
                {approval.allowance}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Last Active</div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {approval.lastInteraction}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            {approval.risk === "High" && (
              <Button size="sm" className="h-8">
                <AlertTriangle className="mr-2 h-3 w-3" />
                Revoke
              </Button>
            )}
            {approval.risk !== "High" && (
              <Button size="sm" variant="outline" className="h-8">
                <Wallet className="mr-2 h-3 w-3" />
                Revoke
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

