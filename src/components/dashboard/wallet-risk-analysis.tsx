"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, CheckCircle, ExternalLink, Lock, Shield, ThumbsUp, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface WalletRiskAnalysisProps {
  isLoading?: boolean
}

export function WalletRiskAnalysis({ isLoading = false }: WalletRiskAnalysisProps) {
  // Mock data - replace with actual data in production
  const approvals = [
    {
      program: "Jupiter Aggregator",
      address: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
      risk: "Low",
      approved: "2025-03-15T10:23:45Z",
      limit: "Unlimited",
      riskScore: 85,
    },
    {
      program: "Raydium Swap",
      address: "RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr",
      risk: "Low",
      approved: "2025-03-10T14:12:30Z",
      limit: "Unlimited",
      riskScore: 82,
    },
    {
      program: "Unknown Program",
      address: "Unk1111111111111111111111111111111111111111",
      risk: "High",
      approved: "2025-04-01T08:45:12Z",
      limit: "Unlimited",
      riskScore: 35,
    },
  ]

  const exposures = [
    {
      category: "Meme Tokens",
      percentage: 5.2,
      risk: "Medium",
      tokens: 2,
      value: 140.75,
      riskScore: 65,
    },
    {
      category: "New Tokens (<30 days)",
      percentage: 3.9,
      risk: "High",
      tokens: 1,
      value: 106.25,
      riskScore: 45,
    },
    {
      category: "Verified Tokens",
      percentage: 90.9,
      risk: "Low",
      tokens: 3,
      value: 2479.65,
      riskScore: 92,
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="approvals">
        <TabsList className="mb-4">
          <TabsTrigger value="approvals">
            <Lock className="mr-2 h-4 w-4" />
            Contract Approvals
          </TabsTrigger>
          <TabsTrigger value="exposures">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Risk Exposures
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Shield className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals.map((approval, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">{approval.program}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          {`${approval.address.substring(0, 6)}...${approval.address.substring(approval.address.length - 4)}`}
                          <a
                            href={`https://solscan.io/account/${approval.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary ml-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(approval.risk)}>{approval.risk}</Badge>
                        <span className={cn("text-sm", getRiskScoreColor(approval.riskScore))}>
                          {approval.riskScore}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(approval.approved).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-yellow-500 bg-yellow-500/10 border-yellow-500/20">
                        {approval.limit}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-500">Security Recommendation</h4>
                <p className="text-sm">
                  We detected 3 contract approvals with unlimited spending allowance. Consider revoking these
                  permissions to improve your wallet security.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="exposures" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Exposure</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Tokens</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exposures.map((exposure, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{exposure.category}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(exposure.risk)}>{exposure.risk}</Badge>
                        <span className={cn("text-sm", getRiskScoreColor(exposure.riskScore))}>
                          {exposure.riskScore}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className={cn("h-2 rounded-full", {
                              "bg-green-500": exposure.risk === "Low",
                              "bg-yellow-500": exposure.risk === "Medium",
                              "bg-red-500": exposure.risk === "High",
                            })}
                            style={{ width: `${Math.min(100, exposure.percentage)}%` }}
                          />
                        </div>
                        <span>{exposure.percentage.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>${exposure.value.toLocaleString()}</TableCell>
                    <TableCell>{exposure.tokens}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-500">Portfolio Assessment</h4>
                <p className="text-sm">
                  Your portfolio is well-diversified with 90.9% in verified tokens. Consider reducing exposure to
                  high-risk categories for improved security.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-500">Revoke Unnecessary Approvals</h4>
                  <p className="text-sm">
                    We detected 3 contract approvals with unlimited spending allowance. Consider revoking these
                    permissions to improve your wallet security.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Shield className="mr-2 h-4 w-4" />
                    Revoke Approvals
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-500">Reduce High-Risk Exposure</h4>
                  <p className="text-sm">
                    Your wallet has 3.9% exposure to new tokens less than 30 days old. Consider reducing this exposure
                    to less than 2% of your portfolio.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    View Recommendations
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-500">Good Portfolio Diversification</h4>
                  <p className="text-sm">
                    Your portfolio is well-diversified with 90.9% in verified tokens. This is a good security practice
                    that reduces overall risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-500">Regular Security Scans</h4>
                  <p className="text-sm">
                    {`You've been running regular security scans on your wallet. Continue this practice to maintain good security hygiene.`}
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
