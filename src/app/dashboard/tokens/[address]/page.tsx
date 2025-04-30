"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  TrendingUp,
  BarChart3,
  History,
  Search,
} from "lucide-react";
import { useParams } from "next/navigation";
import { TokenNetworkGraph } from "@/components/dashboard/token-network-graph";
import { cn } from "@/lib/utils";
import { getTokenDetails } from "@/services/token-service";
import type { TokenCheck } from "@/types";
import { formatDistanceToNow } from "date-fns";

type RiskTag = {
  name: string;
  percentage: number;
  votes: number;
  color: string;
  type: "positive" | "negative" | "neutral";
  icon: LucideIcon;
};

export default function TokenDetail() {
  const params = useParams();
  const address = params.address as string;

  const [token, setToken] = useState<TokenCheck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchTokenDetails = async () => {
      setIsLoading(true);
      try {
        const tokenData = await getTokenDetails(address);
        setToken(tokenData);
      } catch (error) {
        console.error("Error fetching token details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenDetails();
  }, [address]);

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
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 h-[500px] rounded-lg bg-muted animate-pulse" />
        <div className="col-span-12 md:col-span-6 space-y-6">
          <div className="h-[400px] rounded-lg bg-muted animate-pulse" />
          <div className="h-[200px] rounded-lg bg-muted animate-pulse" />
        </div>
        <div className="col-span-12 md:col-span-3 h-[500px] rounded-lg bg-muted animate-pulse" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">Token Not Found</h3>
        <p className="text-muted-foreground max-w-sm">
          {`We couldn't find a token with the address ${address}. Please check the
          address and try again.`}
        </p>
        <Button className="mt-6">
          <Search className="mr-2 h-4 w-4" />
          Search for Tokens
        </Button>
      </div>
    );
  }

  // Format time ago
  const timeAgo = formatDistanceToNow(new Date(token.detectedAt), {
    addSuffix: true,
  });

  // Format address for display
  const shortAddress = `${token.mint.substring(0, 6)}...${token.mint.substring(
    token.mint.length - 4
  )}`;

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Sidebar */}
      <Card className="col-span-12 md:col-span-3 h-fit">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {token.tokenMeta.symbol}
              </CardTitle>
              <CardDescription>{token.tokenMeta.name}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className={
                token.score >= 90
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : token.score >= 70
                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  : token.score >= 50
                  ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                  : "bg-red-500/10 text-red-500 border-red-500/20"
              }
            >
              {token.score >= 90
                ? "Low"
                : token.score >= 70
                ? "Medium"
                : token.score >= 50
                ? "High"
                : "Very High"}{" "}
              Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Address</span>
              <div className="flex items-center gap-1">
                <span>{shortAddress}</span>
                <button className="text-muted-foreground hover:text-primary">
                  <Copy className="h-3 w-3" />
                </button>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Current Price</span>
              <span>
                ${token.price.toFixed(4)}{" "}
                <span className="text-green-500">+2.3%</span>
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Market Cap</span>
              <span>
                $
                {(
                  token.price *
                  (token.totalHolders || 0) *
                  1000
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Holders</span>
              <span>{token.totalHolders?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Created</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Security Scores</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>RugCheck Score</span>
                  <span className={getScoreColor(token.score)}>
                    {token.score}
                  </span>
                </div>
                <Progress value={token.score} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>DD.xyz Score</span>
                  <span className={getScoreColor(token.score - 2)}>
                    {token.score - 2}
                  </span>
                </div>
                <Progress value={token.score - 2} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>Civic Score</span>
                  <span className={getScoreColor(token.score - 4)}>
                    {token.score - 4}
                  </span>
                </div>
                <Progress value={token.score - 4} className="h-2" />
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
            <CardDescription>
              Visualizing token transactions and holder relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] relative">
            <TokenNetworkGraph />
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="holders">Holders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Security Assessment</AlertTitle>
              <AlertDescription>
                {token.score >= 90
                  ? "This token has passed all security checks. The contract doesn't contain any known vulnerabilities."
                  : token.score >= 70
                  ? "This token has passed most security checks with some minor concerns. Exercise normal caution."
                  : token.score >= 50
                  ? "This token has several security concerns. Exercise increased caution when interacting with it."
                  : "This token has significant security risks. We recommend avoiding interaction with this contract."}
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Contract Analysis</CardTitle>
                <CardDescription>
                  Key findings from code analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Liquidity Status</div>
                    <div className="text-sm text-muted-foreground">
                      {token.score >= 80
                        ? "86% locked for 12 months"
                        : "Partially locked (45%)"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Ownership</div>
                    <div className="text-sm text-muted-foreground">
                      {token.score >= 80
                        ? "Ownership renounced"
                        : "Ownership retained"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Mint Function</div>
                    <div className="text-sm text-muted-foreground">
                      {token.score >= 80
                        ? "No mint function found"
                        : "Mint function present"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Hidden Code</div>
                    <div className="text-sm text-muted-foreground">
                      {token.score >= 80
                        ? "No hidden code detected"
                        : "Potential hidden code"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Proxy Contract</div>
                    <div className="text-sm text-muted-foreground">
                      {token.score >= 80
                        ? "No proxy implementation"
                        : "Proxy implementation detected"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Sell Limitations</div>
                    <div className="text-sm text-muted-foreground">
                      {token.score >= 80
                        ? "No trading restrictions"
                        : "Trading restrictions detected"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Identified security concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {token.risks.map((risk, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          risk.level === "low"
                            ? "bg-green-500/10"
                            : risk.level === "medium"
                            ? "bg-yellow-500/10"
                            : "bg-red-500/10"
                        )}
                      >
                        <AlertTriangle
                          className={cn(
                            "h-4 w-4",
                            risk.level === "low"
                              ? "text-green-500"
                              : risk.level === "medium"
                              ? "text-yellow-500"
                              : "text-red-500"
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{risk.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {risk.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge
                          variant="outline"
                          className={cn(
                            risk.level === "low"
                              ? "border-green-500/20 bg-green-500/10 text-green-500"
                              : risk.level === "medium"
                              ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                              : "border-red-500/20 bg-red-500/10 text-red-500"
                          )}
                        >
                          {risk.level === "low"
                            ? "Low"
                            : risk.level === "medium"
                            ? "Medium"
                            : "High"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Latest token transfers and trades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {i % 2 === 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <History className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {i % 2 === 0 ? "Buy" : "Transfer"} Transaction
                          </p>
                          <p className="text-xs text-muted-foreground">
                            0x{Math.random().toString(16).substring(2, 10)}...
                            {Math.random().toString(16).substring(2, 6)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {(Math.random() * 1000).toFixed(2)}{" "}
                          {token.tokenMeta.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 60)} minutes ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Token Holders</CardTitle>
                <CardDescription>
                  Token distribution among wallets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {i}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            0x{Math.random().toString(16).substring(2, 10)}...
                            {Math.random().toString(16).substring(2, 6)}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            {i === 1 && (
                              <Badge
                                variant="outline"
                                className="text-xs mr-2 py-0 h-4"
                              >
                                Creator
                              </Badge>
                            )}
                            {i === 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs mr-2 py-0 h-4"
                              >
                                Contract
                              </Badge>
                            )}
                            {Math.floor(Math.random() * 100)} transactions
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {(Math.random() * 10).toFixed(2)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 100000)} tokens
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Token Analytics</CardTitle>
                <CardDescription>
                  Detailed metrics and performance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Price Performance</h3>
                    <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">24h Change</p>
                        <p className="font-medium text-green-500">
                          +{(Math.random() * 10).toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">7d Change</p>
                        <p className="font-medium text-green-500">
                          +{(Math.random() * 20).toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">30d Change</p>
                        <p className="font-medium text-red-500">
                          -{(Math.random() * 5).toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">All-time High</p>
                        <p className="font-medium">
                          ${(token.price * (1 + Math.random())).toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Liquidity Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Liquidity Locked</span>
                        <span className="font-medium">
                          {Math.floor(60 + Math.random() * 30)}%
                        </span>
                      </div>
                      <Progress
                        value={60 + Math.random() * 30}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          Total Liquidity: $
                          {(token.totalMarketLiquidity || 0).toLocaleString()}
                        </span>
                        <span>
                          Lock Expires: {Math.floor(1 + Math.random() * 11)}{" "}
                          months
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <h3 className="text-sm font-medium">Trading Volume</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">24h Volume</p>
                          <p className="font-medium">
                            $
                            {Math.floor(
                              10000 + Math.random() * 50000
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">7d Volume</p>
                          <p className="font-medium">
                            $
                            {Math.floor(
                              50000 + Math.random() * 200000
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <h3 className="text-sm font-medium">Token Metrics</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Circulating Supply
                          </p>
                          <p className="font-medium">
                            {Math.floor(
                              1000000 + Math.random() * 9000000
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Supply</p>
                          <p className="font-medium">
                            {Math.floor(
                              10000000 + Math.random() * 90000000
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          : "text-blue-500"
                      )}
                    />
                    <span className="text-sm font-medium">{tag.name}</span>
                  </div>
                  <div className="text-sm font-medium">{tag.percentage}%</div>
                </div>
                <Progress
                  value={tag.percentage}
                  className={cn(
                    "h-1.5",
                    tag.type === "negative"
                      ? tag.percentage > 50
                        ? "bg-red-900"
                        : "bg-green-900"
                      : "bg-muted"
                  )}
                  // indicatorClassName={cn(
                  //   tag.type === "negative"
                  //     ? tag.percentage > 50
                  //       ? "bg-red-500"
                  //       : "bg-green-500"
                  //     : tag.type === "positive"
                  //     ? tag.percentage > 50
                  //       ? "bg-green-500"
                  //       : "bg-red-500"
                  //     : "bg-blue-500"
                  // )}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {tag.votes} votes
                </div>
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
  );
}
