"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertTriangle,
  Copy,
  ExternalLink,
  Eye,
  Flag,
  type LucideIcon,
  MessageSquare,
  Shield,
  ThumbsDown,
  ThumbsUp,
  Users,
} from "lucide-react"
import { useParams } from "next/navigation"
import { TokenNetworkGraph } from "@/components/dashboard/token-network-graph"
import { cn } from "@/lib/utils"

type RiskTag = {
  name: string
  percentage: number
  votes: number
  color: string
  type: "positive" | "negative" | "neutral"
  icon: LucideIcon
}

export default function TokenDetail() {
  const params = useParams()
  const address = params.address as string

  const [activeTab, setActiveTab] = useState("overview")

  // Mock token data
  const token = {
    address: address || "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    name: "Uniswap V2 Router",
    symbol: "UNI-V2",
    price: "$5.32",
    priceChange: "+2.3%",
    marketCap: "$2.8B",
    holders: 124763,
    rugCheckScore: 92,
    ddxyzScore: 94,
    civicScore: 90,
    overallRisk: "Low",
    liquidityLocked: "86% locked for 12 months",
    createdAt: "May 5, 2021",
  }

  // Mock risk tags
  const riskTags: RiskTag[] = [
    {
      name: "Locked Liquidity",
      percentage: 92,
      votes: 1243,
      color: "bg-green-500",
      type: "positive",
      icon: Shield,
    },
    {
      name: "Fair Distribution",
      percentage: 87,
      votes: 1092,
      color: "bg-green-500",
      type: "positive",
      icon: Users,
    },
    {
      name: "Transparent Team",
      percentage: 65,
      votes: 843,
      color: "bg-yellow-500",
      type: "positive",
      icon: ThumbsUp,
    },
    {
      name: "Hidden Mint",
      percentage: 12,
      votes: 154,
      color: "bg-green-600",
      type: "negative",
      icon: ThumbsDown,
    },
    {
      name: "Honeypot Risk",
      percentage: 8,
      votes: 98,
      color: "bg-green-600",
      type: "negative",
      icon: AlertTriangle,
    },
    {
      name: "Community Trust",
      percentage: 89,
      votes: 1467,
      color: "bg-green-500",
      type: "neutral",
      icon: MessageSquare,
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Sidebar */}
      <Card className="col-span-12 md:col-span-3 h-fit">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{token.symbol}</CardTitle>
              <CardDescription>{token.name}</CardDescription>
            </div>
            <Badge variant="outline">{token.overallRisk} Risk</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Address</span>
              <div className="flex items-center gap-1">
                <span>
                  {token.address.substring(0, 6)}...{token.address.substring(token.address.length - 4)}
                </span>
                <button className="text-muted-foreground hover:text-primary">
                  <Copy className="h-3 w-3" />
                </button>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Current Price</span>
              <span>
                {token.price} <span className="text-green-500">{token.priceChange}</span>
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Market Cap</span>
              <span>{token.marketCap}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Holders</span>
              <span>{token.holders.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Created</span>
              <span>{token.createdAt}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Security Scores</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>RugCheck Score</span>
                  <span className={getScoreColor(token.rugCheckScore)}>{token.rugCheckScore}</span>
                </div>
                <Progress value={token.rugCheckScore} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>DD.xyz Score</span>
                  <span className={getScoreColor(token.ddxyzScore)}>{token.ddxyzScore}</span>
                </div>
                <Progress value={token.ddxyzScore} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>Civic Score</span>
                  <span className={getScoreColor(token.civicScore)}>{token.civicScore}</span>
                </div>
                <Progress value={token.civicScore} className="h-2" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button size="sm" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                Monitor Token
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Flag className="mr-2 h-4 w-4" />
                Report Issues
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="col-span-12 md:col-span-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Network Analysis</CardTitle>
            <CardDescription>Visualizing token transactions and holder relationships</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] relative">
            <TokenNetworkGraph />
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="holders">Holders</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Security Assessment</AlertTitle>
              <AlertDescription>
                {"This token has passed all security checks. The contract doesn't contain any known vulnerabilities."}
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Contract Analysis</CardTitle>
                <CardDescription>Key findings from code analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Liquidity Status</div>
                    <div className="text-sm text-muted-foreground">{token.liquidityLocked}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Ownership</div>
                    <div className="text-sm text-muted-foreground">Ownership renounced</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Mint Function</div>
                    <div className="text-sm text-muted-foreground">No mint function found</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Hidden Code</div>
                    <div className="text-sm text-muted-foreground">No hidden code detected</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Proxy Contract</div>
                    <div className="text-sm text-muted-foreground">No proxy implementation</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Sell Limitations</div>
                    <div className="text-sm text-muted-foreground">No trading restrictions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest token transfers and trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Transaction data loading...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Token Holders</CardTitle>
                <CardDescription>Token distribution among wallets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Holder data loading...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar */}
      <Card className="col-span-12 md:col-span-3 h-fit">
        <CardHeader>
          <CardTitle>Community Risk Assessment</CardTitle>
          <CardDescription>Crowdsourced security tags</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskTags.map((tag, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <tag.icon
                      className={cn(
                        "h-4 w-4",
                        tag.type === "positive"
                          ? "text-green-500"
                          : tag.type === "negative"
                            ? "text-red-500"
                            : "text-blue-500",
                      )}
                    />
                    <span className="text-sm font-medium">{tag.name}</span>
                  </div>
                  <div className="text-sm font-medium">{tag.percentage}%</div>
                </div>
                {/* <Progress
                  value={tag.percentage}
                  className={cn(
                    "h-1.5",
                    tag.type === "negative" ? (tag.percentage > 50 ? "bg-red-900" : "bg-green-900") : "bg-muted",
                  )}
                  indicatorClassName={cn(
                    tag.type === "negative"
                      ? tag.percentage > 50
                        ? "bg-red-500"
                        : "bg-green-500"
                      : tag.type === "positive"
                        ? tag.percentage > 50
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-blue-500",
                  )}
                /> */}
                <div className="text-xs text-muted-foreground text-right">{tag.votes} votes</div>
              </div>
            ))}

            <Separator className="my-2" />

            <div className="pt-2">
              <Button size="sm" className="w-full">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Add Your Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

