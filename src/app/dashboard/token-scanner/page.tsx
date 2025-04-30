"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ChevronRight,
  Copy,
  ExternalLink,
  Info,
  Shield,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { RecentScans } from "@/components/dashboard/recent-scans";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TokenSearchForm } from "@/components/forms/token-search-form";
import type { TokenSearchFormValues } from "@/lib/validations/form-schemas";
import { Button } from "@/components/ui/button";

export default function TokenScanner() {
  const [hasSearched, setHasSearched] = useState(false);

  const mockTokens = [
    {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      name: "Uniswap V2 Router",
      symbol: "UNI-V2",
      risk: "Low",
      riskScore: 92,
      riskColor: "text-green-500",
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      name: "Uniswap Token",
      symbol: "UNI",
      risk: "Low",
      riskScore: 95,
      riskColor: "text-green-500",
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      name: "Tether USD",
      symbol: "USDT",
      risk: "Medium",
      riskScore: 72,
      riskColor: "text-yellow-500",
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "USD Coin",
      symbol: "USDC",
      risk: "Low",
      riskScore: 91,
      riskColor: "text-green-500",
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "Dai Stablecoin",
      symbol: "DAI",
      risk: "Low",
      riskScore: 90,
      riskColor: "text-green-500",
    },
  ];

  const handleSearch = async (data: TokenSearchFormValues) => {
    console.log("Searching for:", data.query);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Set search results
    setHasSearched(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Token Scanner
        </h1>
        <p className="text-muted-foreground">
          Scan tokens for potential security risks and analyze their behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scan Token</CardTitle>
          <CardDescription>
            Enter a token contract address to analyze its security and risk
            profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TokenSearchForm onSubmit={handleSearch} />

          <Separator className="my-6" />

          {hasSearched && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Results</h3>
              <div className="grid gap-4">
                {mockTokens.map((token, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{token.name}</h4>
                        <Badge variant="outline">{token.symbol}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {token.address.substring(0, 6)}...
                        {token.address.substring(token.address.length - 4)}
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
                          <span className="text-sm font-medium">
                            Risk Score:
                          </span>
                          <span className={cn("font-bold", token.riskColor)}>
                            {token.riskScore}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {token.risk} Risk
                        </span>
                      </div>
                      <Link href={`/dashboard/tokens/${token.address}`}>
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
                    <h3 className="font-medium mb-1">
                      How to use the Token Scanner
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {
                        "Enter a token contract address to analyze its security posture, including liquidity distribution, holder concentration, and potential malicious behavior. We'll provide a comprehensive risk assessment using data from RugCheck and DD.xyz."
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">
                  Recently Scanned Tokens
                </h3>
                <RecentScans />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      High Risk Token Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-8 w-8 text-red-500 mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Our scanner automatically identifies and flags
                          suspicious token behaviors including:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                          <li>Honeypot contracts that prevent selling</li>
                          <li>
                            Extreme transaction taxes or owner-only functions
                          </li>
                          <li>
                            Circular trading patterns between related wallets
                          </li>
                          <li>Hidden minting capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Community Security Layer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Shield className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          SentryShield combines automated analysis with
                          community reporting to provide multiple security
                          layers:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                          <li>
                            Crowdsourced risk reports from security researchers
                          </li>
                          <li>Aggregated on-chain threat intelligence</li>
                          <li>Continuous monitoring of token behavior</li>
                          <li>Historical risk pattern recognition</li>
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

      <Tabs defaultValue="tokens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tokens">Popular Tokens</TabsTrigger>
          <TabsTrigger value="reported">Recently Reported</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTokens.map((token, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{token.name}</CardTitle>
                      <CardDescription>{token.symbol}</CardDescription>
                    </div>
                    <Badge
                      className={cn(
                        token.risk === "Low"
                          ? "bg-green-500"
                          : token.risk === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      )}
                    >
                      {token.risk}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {token.address.substring(0, 8)}...
                      {token.address.substring(token.address.length - 6)}
                    </div>
                    <Link href={`/dashboard/tokens/${token.address}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 text-xs"
                      >
                        View Details
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reported">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            No recently reported tokens
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            No trending tokens
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
