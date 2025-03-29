"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { TokenList } from "@/components/tokens/token-list";
import type { TokenCheck } from "@/types";
import {
  getNewTokens,
  getRecentTokens,
  getTrendingTokenDetails,
  getVerifiedTokenDetails,
} from "@/services/token-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TokenScanner() {
  const [newTokens, setNewTokens] = useState<TokenCheck[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<TokenCheck[]>([]);
  const [verifiedTokens, setVerifiedTokens] = useState<TokenCheck[]>([]);
  const [recentTokens, setRecentTokens] = useState<TokenCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [filterBy, setFilterBy] = useState("all");

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

  // Filter and sort tokens
  const filterTokens = (tokens: TokenCheck[]) => {
    let filtered = [...tokens];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (token) =>
          token.tokenMeta.name.toLowerCase().includes(query) ||
          token.tokenMeta.symbol.toLowerCase().includes(query) ||
          token.mint.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filterBy !== "all") {
      if (filterBy === "high_risk") {
        filtered = filtered.filter((token) => token.score < 70);
      } else if (filterBy === "medium_risk") {
        filtered = filtered.filter(
          (token) => token.score >= 70 && token.score < 90
        );
      } else if (filterBy === "low_risk") {
        filtered = filtered.filter((token) => token.score >= 90);
      } else if (filterBy === "verified") {
        filtered = filtered.filter((token) => token.verification?.jup_verified);
      }
    }

    // Apply sorting
    if (sortBy === "score") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.tokenMeta.name.localeCompare(b.tokenMeta.name));
    } else if (sortBy === "date") {
      filtered.sort(
        (a, b) =>
          new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime()
      );
    } else if (sortBy === "holders") {
      filtered.sort((a, b) => (b.totalHolders || 0) - (a.totalHolders || 0));
    } else if (sortBy === "liquidity") {
      filtered.sort(
        (a, b) => (b.totalMarketLiquidity || 0) - (a.totalMarketLiquidity || 0)
      );
    }

    return filtered;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Token Scanner
        </h1>
        <p className="text-muted-foreground">
          Analyze and monitor tokens for security risks
        </p>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by token name, symbol, or address..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Security Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="date">Creation Date</SelectItem>
                  <SelectItem value="holders">Holders</SelectItem>
                  <SelectItem value="liquidity">Liquidity</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="high_risk">High Risk</SelectItem>
                  <SelectItem value="medium_risk">Medium Risk</SelectItem>
                  <SelectItem value="low_risk">Low Risk</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Categories */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All Tokens</TabsTrigger>
          <TabsTrigger value="new">
            <Clock className="h-4 w-4 mr-2" />
            New
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

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Tokens</CardTitle>
              <CardDescription>
                Comprehensive list of all tokens in our database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenList
                tokens={[
                  ...filterTokens(newTokens),
                  ...filterTokens(trendingTokens),
                  ...filterTokens(verifiedTokens),
                ]}
                isLoading={isLoading}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>New Tokens</CardTitle>
              <CardDescription>
                Recently created tokens that require careful analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenList
                tokens={filterTokens(newTokens)}
                isLoading={isLoading}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Tokens</CardTitle>
              <CardDescription>
                Popular tokens with high community engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenList
                tokens={filterTokens(trendingTokens)}
                isLoading={isLoading}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verified Tokens</CardTitle>
              <CardDescription>
                Tokens that have passed verification checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenList
                tokens={filterTokens(verifiedTokens)}
                isLoading={isLoading}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Scanned</CardTitle>
              <CardDescription>
                Tokens that have been recently analyzed by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenList
                tokens={filterTokens(recentTokens)}
                isLoading={isLoading}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
