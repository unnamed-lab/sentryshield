"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowUpRight, Brain, CheckCircle, MessageSquare } from "lucide-react"

interface TokenInsightsPanelProps {
  isLoading?: boolean
}

export function TokenInsightsPanel({ isLoading = false }: TokenInsightsPanelProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="ai">
        <TabsList className="mb-4">
          <TabsTrigger value="ai">
            <Brain className="mr-2 h-4 w-4" />
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="social">
            <MessageSquare className="mr-2 h-4 w-4" />
            Social Signals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4">
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  COINIFY
                </Badge>
                <Badge className="bg-green-500">Low Risk</Badge>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Full Report
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm">
              COINIFY shows strong fundamentals with good liquidity and a growing holder base. The token has passed our
              security checks and shows no signs of malicious code.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Contract code verified and audited</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Liquidity locked for 12 months</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Team tokens vested with transparent schedule</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  DEAL
                </Badge>
                <Badge className="bg-yellow-500">Medium Risk</Badge>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Full Report
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm">
              DEAL is a new token with limited history. While no malicious code was detected, the token has low
              liquidity and a concentrated holder base.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Contract code verified</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <p className="text-sm">Top 10 holders control 78% of supply</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <p className="text-sm">Limited liquidity ($45K)</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  Social Sentiment
                </Badge>
              </div>
              <Badge className="bg-green-500">Positive</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Twitter Mentions</span>
                <span className="text-sm font-medium">1,245 (↑12%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Reddit Discussions</span>
                <span className="text-sm font-medium">87 (↑5%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Telegram Activity</span>
                <span className="text-sm font-medium">High (↑8%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Discord Members</span>
                <span className="text-sm font-medium">12,450 (↑3%)</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                  KOL Mentions
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs">KOL</span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">CryptoAnalyst</span>
                    <Badge variant="outline" className="text-xs">
                      Neutral
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {`"COINIFY shows promise but needs to deliver on roadmap milestones..."`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs">KOL</span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">TokenMaster</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                      Bullish
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {`"RAGNAR is one of my top picks for Q2 2025. The team is solid and..."`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
