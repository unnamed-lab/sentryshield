"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Search,
  Shield,
  AlertTriangle,
  TrendingUp,
  Wallet,
  ExternalLink,
  Info,
  Clock,
  CheckCircle,
} from "lucide-react";
import { TokenRiskChart } from "@/components/dashboard/token-risk-chart";
import { WalletNetworkGraph } from "@/components/dashboard/wallet-network-graph";
import { RecentScans } from "@/components/dashboard/recent-scans";
import { RiskScoreCard } from "@/components/dashboard/risk-score-card";
import { WalletOverview } from "@/components/dashboard/wallet-overview";
import { SecurityAlerts } from "@/components/dashboard/security-alerts";
import { TokenList } from "@/components/tokens/token-list";
import { useEffect, useState } from "react";
import type { TokenCheck } from "@/types";
import {
  getNewTokens,
  getRecentTokens,
  getTrendingTokenDetails,
  getVerifiedTokenDetails,
} from "@/services/token-service";

export default function Dashboard() {
  const [newTokens, setNewTokens] = useState<TokenCheck[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<TokenCheck[]>([]);
  const [verifiedTokens, setVerifiedTokens] = useState<TokenCheck[]>([]);
  const [recentTokens, setRecentTokens] = useState<TokenCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          newTokensData,
          trendingTokensData,
          verifiedTokensData,
          recentTokensData,
        ] = await Promise.all([
          getNewTokens(),
          getTrendingTokenDetails(),
          getVerifiedTokenDetails(),
          getRecentTokens(),
        ]);

        setNewTokens(newTokensData);
        setTrendingTokens(trendingTokensData);
        setVerifiedTokens(verifiedTokensData);
        setRecentTokens(recentTokensData);
      } catch (error) {
        console.error("Error fetching token data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your wallet security and scan tokens for potential risks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Run Security Scan
          </Button>
          <Button size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Suspicious Token
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="grid gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by token address, wallet address, or ENS name..."
                className="w-full bg-background pl-8 pr-24"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="sm" className="absolute right-1 top-1 h-7">
                Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RiskScoreCard
          title="Wallet Risk Score"
          score={92}
          status="Safe"
          icon={<Shield className="h-4 w-4" />}
          trend="+5%"
          description="Your wallet security is strong"
        />
        <RiskScoreCard
          title="Exposure Risk"
          score={3}
          status="Low"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend="-2%"
          description="3 low-risk interactions detected"
        />
        <RiskScoreCard
          title="Approval Risk"
          score={12}
          status="Medium"
          icon={<Wallet className="h-4 w-4" />}
          trend="+8%"
          description="12 active contract approvals"
        />
        <RiskScoreCard
          title="Community Trust"
          score={87}
          status="High"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="+3%"
          description="Based on 1,240 community reports"
        />
      </div>

      {/* Token Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Token Overview</CardTitle>
          <CardDescription>
            Explore new, trending, and verified tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" className="space-y-4">
            <TabsList>
              <TabsTrigger value="new">
                <Clock className="h-4 w-4 mr-2" />
                New Tokens
              </TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="verified">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verified
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" />
                Recently Scanned
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4">
              <TokenList tokens={newTokens} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              <TokenList tokens={trendingTokens} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="verified" className="space-y-4">
              <TokenList tokens={verifiedTokens} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <TokenList tokens={recentTokens} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="token-analysis">Token Analysis</TabsTrigger>
          <TabsTrigger value="wallet-profiling">Wallet Profiling</TabsTrigger>
          <TabsTrigger value="approvals">Contract Approvals</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Token Risk Analysis</CardTitle>
                  <CardDescription>
                    Risk assessment of recently scanned tokens
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <TokenRiskChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>
                    Recent security notifications
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <SecurityAlerts />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Wallet Overview</CardTitle>
                <CardDescription>
                  Security status of connected wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WalletOverview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>
                  Your recently analyzed tokens and wallets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentScans />
              </CardContent>
            </Card>
          </div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Security Recommendation</AlertTitle>
            <AlertDescription>
              We detected 3 contract approvals with unlimited spending
              allowance. Consider revoking these permissions to improve your
              wallet security.
            </AlertDescription>
          </Alert>
        </TabsContent>
        <TabsContent value="token-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Network Analysis</CardTitle>
              <CardDescription>
                Visualize token flows and detect circular transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              <WalletNetworkGraph />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wallet-profiling">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Profiling</CardTitle>
              <CardDescription>
                Detailed analysis of wallet behavior and risk factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-24">
                <p className="text-muted-foreground">
                  Enter a wallet address to analyze
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Contract Approvals</CardTitle>
              <CardDescription>
                Manage your active contract approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-24">
                <p className="text-muted-foreground">
                  Connect your wallet to view approvals
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
