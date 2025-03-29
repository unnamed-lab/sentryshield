"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, ChevronRight, Copy, ExternalLink, Info, Shield } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function WalletProfiler() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 1500)
  }

  const mockWallets = [
    {
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      type: "EOA", // Externally Owned Account
      firstSeen: "2021-05-12",
      risk: "Low",
      riskScore: 92,
      riskColor: "text-green-500",
      tokens: 12,
      transactions: 247,
    },
    {
      address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
      type: "EOA",
      firstSeen: "2020-08-03",
      risk: "Low",
      riskScore: 95,
      riskColor: "text-green-500",
      tokens: 56,
      transactions: 1258,
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      type: "Contract",
      firstSeen: "2019-11-22",
      risk: "Medium",
      riskScore: 72,
      riskColor: "text-yellow-500",
      tokens: 3,
      transactions: 10542,
    },
    {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      type: "Contract",
      firstSeen: "2022-01-15",
      risk: "High",
      riskScore: 35,
      riskColor: "text-red-500",
      tokens: 0,
      transactions: 78,
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      type: "EOA",
      firstSeen: "2021-07-08",
      risk: "Low",
      riskScore: 89,
      riskColor: "text-green-500",
      tokens: 32,
      transactions: 563,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Wallet Profiler</h1>
        <p className="text-muted-foreground">Analyze wallet addresses for security risks and behavioral patterns.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Wallet</CardTitle>
          <CardDescription>Enter a wallet address to analyze its activity and security profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter wallet address or ENS name..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Analyzing..." : "Analyze"}
            </Button>
          </form>

          <Separator className="my-6" />

          {hasSearched && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Results</h3>
              <div className="grid gap-4">
                {mockWallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{wallet.type} Wallet</h4>
                        <Badge variant="outline">{wallet.firstSeen}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                        <button className="hover:text-primary">
                          <Copy className="h-3 w-3" />
                        </button>
                        <a href="#" className="hover:text-primary">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Risk Score:</span>
                          <span className={cn("font-bold", wallet.riskColor)}>{wallet.riskScore}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{wallet.risk} Risk</span>
                      </div>
                      <Link href={`/dashboard/wallets/${wallet.address}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <span>Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasSearched && (
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">How to use the Wallet Profiler</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter any wallet address to analyze its transaction history, token holdings, and behavioral
                      patterns. Our system will identify risky interactions and provide a comprehensive security
                      assessment using data from DD.xyz and RugCheck.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Wallet Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-8 w-8 text-yellow-500 mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Our wallet profiler automatically checks for security risks including:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                          <li>Interactions with high-risk contracts</li>
                          <li>Unlimited token approvals</li>
                          <li>Suspected phishing attempts</li>
                          <li>Connection to known scams</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Approval Risk Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Shield className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          SentryShield identifies potentially risky token approvals:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                          <li>Detects unlimited spending allowances</li>
                          <li>Flags contracts with excessive permissions</li>
                          <li>Provides one-click approval revocation</li>
                          <li>Monitors approvals for suspicious activity</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

