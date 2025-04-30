/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";
import { TokenList } from "@/components/tokens/token-list";

import TokenRecent from "@/components/tokens/token-recent";

interface TokenSection {
  trending: any[];
  verified: any[];
  recent: any[];
  newToken: any[];
  isLoading: boolean;
}

export default function TokenSection({
  newToken,
  isLoading = false,
}: Readonly<TokenSection>) {
  return (
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
            <TokenList isLoading={isLoading}>
              {newToken.map((el, i) => (
                <TokenRecent key={i} token={el} />
              ))}
            </TokenList>
          </TabsContent>

          {/* <TabsContent value="trending" className="space-y-4">
            <TokenList tokens={trending} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            <TokenList tokens={verified} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <TokenList tokens={recent} isLoading={isLoading} />
          </TabsContent> */}
        </Tabs>
      </CardContent>
    </Card>
  );
}
