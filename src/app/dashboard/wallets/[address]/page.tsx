"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Clock, Copy, ExternalLink, Eye, Flag, Shield, Wallet } from "lucide-react"
import { useParams } from "next/navigation"
import { WalletApprovalRisk } from "@/components/dashboard/wallet-approval-risk"
import { WalletActivityChart } from "@/components/dashboard/wallet-activity-chart"
import { WalletExposureChart } from "@/components/dashboard/wallet-exposure-chart"
import { cn } from "@/lib/utils"

export default function WalletDetail() {
  const params = useParams()
  const address = params.address as string

  const [activeTab, setActiveTab] = useState("overview")

  // Mock wallet data
  const wallet = {
    address: address || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    type: "EOA", // Externally Owned Account
    firstSeen: "2021-05-12",
    lastActive: "2 hours ago",
    ddxyzScore: 92,
    rugCheckScore: 88,
    civicScore: 95,
    overallRisk: "Low",
    tokensHeld: 24,
    totalTransactions: 347,
    exposureRisk: {
      high: 2,
      medium: 5,
      low: 15,
    },
    approvalRisk: {
      high: 1,
      medium: 3,
      low: 8,
    },
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Hero section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{wallet.type} Wallet</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-muted-foreground flex items-center">
                      {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 8)}
                      <button className="ml-1 hover:text-primary">
                        <Copy className="h-4 w-4" />
                      </button>
                      <a href="#" className="ml-1 hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      <Clock className="mr-1 h-3 w-3" />
                      {wallet.lastActive}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end justify-center">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className={cn("text-3xl font-bold", getScoreColor(wallet.ddxyzScore))}>{wallet.ddxyzScore}</div>
                  <div className="text-xs text-muted-foreground">DD.xyz Score</div>
                </div>
                <div className="h-10 w-px bg-border"></div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-lg font-medium">Civic Verified</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Authentication Active</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main content */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Approval Risk</CardTitle>
            <CardDescription>Token approvals and risk levels</CardDescription>
          </CardHeader>
          <CardContent>
            <WalletApprovalRisk />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Exposure Risk</CardTitle>
            <CardDescription>Risk distribution of interacted contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <WalletExposureChart />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {wallet.approvalRisk.high > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Risk Approvals Detected</AlertTitle>
              <AlertDescription>
                This wallet has {wallet.approvalRisk.high} high-risk approval{wallet.approvalRisk.high > 1 ? "s" : ""}{" "}
                that should be revoked immediately.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Activity</CardTitle>
                <CardDescription>30-day transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <WalletActivityChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>Key security metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">First Seen</span>
                    <span>{wallet.firstSeen}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Tokens Held</span>
                    <span>{wallet.tokensHeld}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total Transactions</span>
                    <span>{wallet.totalTransactions}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">Security Scores</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>DD.xyz Score</span>
                        <span className={getScoreColor(wallet.ddxyzScore)}>{wallet.ddxyzScore}</span>
                      </div>
                      <Progress value={wallet.ddxyzScore} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>RugCheck Score</span>
                        <span className={getScoreColor(wallet.rugCheckScore)}>{wallet.rugCheckScore}</span>
                      </div>
                      <Progress value={wallet.rugCheckScore} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Civic Score</span>
                        <span className={getScoreColor(wallet.civicScore)}>{wallet.civicScore}</span>
                      </div>
                      <Progress value={wallet.civicScore} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Transaction data loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Holdings</CardTitle>
              <CardDescription>Tokens held by this wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Token data loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Approvals</CardTitle>
              <CardDescription>Active contract approvals for spending tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Approval data loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Scan Another Wallet</h3>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Flag className="mr-2 h-4 w-4" />
                Report Wallet
              </Button>
              <Button size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Monitor Wallet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

