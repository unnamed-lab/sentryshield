"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { AlertTriangle, BarChart3, Download, FileText, Info, Search, Shield } from "lucide-react"
import { TokenRiskChart } from "@/components/dashboard/token-risk-chart"
import { cn } from "@/lib/utils"

export default function RiskAnalysis() {
  const overallStats = {
    scannedTokens: 376,
    riskAssessments: 892,
    communityReports: 145,
    highRiskDetections: 43,
  }

  const riskDistribution = [
    { name: "Critical", percentage: 5, color: "bg-red-600" },
    { name: "High", percentage: 12, color: "bg-red-500" },
    { name: "Medium", percentage: 23, color: "bg-yellow-500" },
    { name: "Low", percentage: 35, color: "bg-green-500" },
    { name: "Very Low", percentage: 25, color: "bg-green-600" },
  ]

  const recentReports = [
    {
      title: "Liquidity Pool Analysis",
      description: "Comprehensive risk assessment of top DEX liquidity pools",
      date: "1 day ago",
      type: "pdf",
      size: "4.2 MB",
    },
    {
      title: "DeFi Security Trends",
      description: "Monthly security trend analysis across DeFi protocols",
      date: "1 week ago",
      type: "pdf",
      size: "2.8 MB",
    },
    {
      title: "Top Scam Techniques",
      description: "Analysis of emerging token scam techniques",
      date: "2 weeks ago",
      type: "pdf",
      size: "3.5 MB",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Risk Analysis</h1>
        <p className="text-muted-foreground">Comprehensive security risk assessment and analytics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scanned Tokens</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.scannedTokens}</div>
            <p className="text-xs text-muted-foreground">+12 new tokens scanned today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Assessments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.riskAssessments}</div>
            <p className="text-xs text-muted-foreground">+87 in the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.communityReports}</div>
            <p className="text-xs text-muted-foreground">+24 new reports this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Detections</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.highRiskDetections}</div>
            <p className="text-xs text-muted-foreground">-7% from previous month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Token Risk Distribution</CardTitle>
            <CardDescription>Risk assessment across analyzed tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskDistribution.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", risk.color)} />
                      <span className="text-sm font-medium">{risk.name}</span>
                    </div>
                    <span className="text-sm font-medium">{risk.percentage}%</span>
                  </div>
                  <Progress value={risk.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Risk Analysis Reports</CardTitle>
              <CardDescription>Recent security analysis documents</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{report.title}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.type.toUpperCase()}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-1">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Token Risk Analysis Trends</CardTitle>
          <CardDescription>Historical risk distribution trends across tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <TokenRiskChart />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tokens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tokens">Token Risk Factors</TabsTrigger>
          <TabsTrigger value="wallets">Wallet Risk Factors</TabsTrigger>
          <TabsTrigger value="protocols">Protocol Risk Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Top Token Risk Factors</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Search factors..." className="w-full pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Unverified Contract",
                    severity: "Critical",
                    description: "Contract source code is not verified on block explorer",
                  },
                  {
                    name: "Honeypot Function",
                    severity: "Critical",
                    description: "Code contains functions that prevent selling tokens",
                  },
                  {
                    name: "Hidden Owner Functions",
                    severity: "High",
                    description: "Contract has hidden functions that only the owner can call",
                  },
                  {
                    name: "Excessive Transaction Tax",
                    severity: "High",
                    description: "Token has unusually high transaction fees",
                  },
                  {
                    name: "Centralized Ownership",
                    severity: "Medium",
                    description: "Ownership of contract is not renounced or multi-sig",
                  },
                  {
                    name: "Low Liquidity",
                    severity: "Medium",
                    description: "Token has limited liquidity in trading pools",
                  },
                ].map((factor, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{factor.name}</div>
                        <Badge
                          className={cn(
                            factor.severity === "Critical"
                              ? "bg-red-600"
                              : factor.severity === "High"
                                ? "bg-red-500"
                                : factor.severity === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500",
                          )}
                        >
                          {factor.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{factor.description}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Risk Factors</CardTitle>
              <CardDescription>Common risk factors for wallet security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Wallet risk factors loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Risk Factors</CardTitle>
              <CardDescription>Common risk factors for DeFi protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Protocol risk factors loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

