import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewTokensTable } from "@/components/tokens/new-tokens-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would normally come from an API call
const newTokensData = [
  {
    mint: "4kuHNqqXPQmGYjfbdGSFvmTFs6xeQbDHt1hGJPoFpump",
    decimals: 6,
    symbol: "deal",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:13.034782426Z",
    updatedAt: "2025-04-01T09:42:13.034823614Z",
    events: null,
  },
  {
    mint: "9tBsqPQxiZUXYgeCncaqhezsAPinxN4yHrRqXeihpump",
    decimals: 6,
    symbol: "Pigeonify",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:09.9495869Z",
    updatedAt: "2025-04-01T09:42:09.949630316Z",
    events: null,
  },
  {
    mint: "GubKGjHaavRV2nNpAQZHZY4ngdjSQwyyxFcLbPSN9rN5",
    decimals: 6,
    symbol: "TOASTY",
    creator: "FvEszABhiLVXd43whCvEZUTSTq4TqV3T61agEMgUvo7Y",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:07.540064217Z",
    updatedAt: "2025-04-01T09:42:07.540104399Z",
    events: null,
  },
  {
    mint: "2Todo1ZehbJoHoWUURfsgtuxtEY6kj9Uhtp46FCwpump",
    decimals: 6,
    symbol: "TUB",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:07.256667911Z",
    updatedAt: "2025-04-01T09:42:07.256716374Z",
    events: null,
  },
  {
    mint: "5WJNMRACU5VpHC6bEVWY1WTLEDckFrbd8BRwo54apump",
    decimals: 6,
    symbol: "Ruptoski",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:01.31175838Z",
    updatedAt: "2025-04-01T09:42:01.311825021Z",
    events: null,
  },
]

export function NewTokensSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Tokens</CardTitle>
        <CardDescription>Monitor newly created tokens on the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="latest">
          <TabsList className="mb-4">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="suspicious">Suspicious</TabsTrigger>
          </TabsList>
          <TabsContent value="latest">
            <NewTokensTable tokens={newTokensData} />
          </TabsContent>
          <TabsContent value="trending">
            <NewTokensTable tokens={newTokensData.slice().sort(() => Math.random() - 0.5)} />
          </TabsContent>
          <TabsContent value="suspicious">
            <NewTokensTable tokens={newTokensData.filter((_, i) => i % 2 === 0)} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
