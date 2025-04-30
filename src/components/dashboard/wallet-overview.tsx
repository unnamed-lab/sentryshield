"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Shield } from "lucide-react"
import { useState } from "react"

interface WalletOverviewProps {
  isLoading?: boolean
}

export function WalletOverview({ isLoading = false }: WalletOverviewProps) {
  const [copied, setCopied] = useState(false)

  // Mock wallet data - replace with actual data in production
  const walletAddress = "C89CN6hBQm4hLEEX5jeKgBpFXXJ6RnDSehqcnqUZL6yn"
  const walletBalance = 2726.65
  const walletNetwork = "Solana"

  const securityItems = [
    {
      name: "Contract Approvals",
      status: "Warning",
      statusColor: "bg-yellow-500",
      progress: 65,
      message: "12 active approvals found",
    },
    {
      name: "Phishing Protection",
      status: "Secure",
      statusColor: "bg-green-500",
      progress: 100,
      message: "Protection active",
    },
    {
      name: "Transaction Screening",
      status: "Secure",
      statusColor: "bg-green-500",
      progress: 100,
      message: "All transactions screened",
    },
    {
      name: "Exposure Risk",
      status: "Low Risk",
      statusColor: "bg-green-400",
      progress: 85,
      message: "3 low-risk interactions",
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Connected Wallet</h3>
            <Badge variant="outline" className="text-xs">
              {walletNetwork}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{walletAddress}</span>
            <button onClick={copyToClipboard} className="text-muted-foreground hover:text-primary">
              <Copy className="h-3 w-3" />
            </button>
            {copied && <span className="text-xs text-green-500">Copied!</span>}
            <a
              href={`https://solscan.io/account/${walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Shield className="h-4 w-4 mr-1" />
          Secure
        </Button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Total Balance</span>
          <span className="font-bold text-lg">${walletBalance.toLocaleString()}</span>
        </div>
        <Progress value={100} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>5 tokens</span>
          <span>Updated just now</span>
        </div>
      </div>

      <div className="space-y-4">
        {securityItems.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              <Badge className={item.statusColor}>{item.status}</Badge>
            </div>
            <Progress value={item.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
