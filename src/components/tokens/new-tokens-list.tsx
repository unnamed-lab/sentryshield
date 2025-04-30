/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { format, formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Copy, ExternalLink, Info, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Token {
  mint: string
  decimals: number
  symbol: string
  creator: string
  mintAuthority: string
  freezeAuthority: string
  program: string
  createAt: string
  updatedAt: string
  events: any[] | null
}

interface NewTokensListProps {
  tokens: Token[]
  title?: string
  description?: string
  maxItems?: number
}

export function NewTokensList({
  tokens,
  title = "New Tokens",
  description = "Recently created tokens on the blockchain",
  maxItems = 10,
}: NewTokensListProps) {
  const [visibleTokens, setVisibleTokens] = useState(maxItems)

  const handleLoadMore = () => {
    setVisibleTokens((prev) => prev + maxItems)
  }

  const displayedTokens = tokens.slice(0, visibleTokens)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/token-scanner">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedTokens.map((token) => (
          <NewTokenCard key={token.mint} token={token} />
        ))}
      </div>

      {visibleTokens < tokens.length && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

function NewTokenCard({ token }: { token: Token }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format time ago
  const timeAgo = formatDistanceToNow(new Date(token.createAt), { addSuffix: true })
  const formattedDate = format(new Date(token.createAt), "PPP")

  // Format addresses for display
  const shortMint = `${token.mint.substring(0, 6)}...${token.mint.substring(token.mint.length - 4)}`
  const shortCreator = token.creator
    ? `${token.creator.substring(0, 6)}...${token.creator.substring(token.creator.length - 4)}`
    : "Unknown"

  // Determine token program type
  const isProgramToken = token.program === "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  const programType = isProgramToken ? "SPL Token" : "Token 2022"

  // Generate random risk score for demo purposes
  const randomScore = Math.floor(Math.random() * 100)
  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{token.symbol || "Unnamed Token"}</CardTitle>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  isProgramToken
                    ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    : "bg-purple-500/10 text-purple-500 border-purple-500/20",
                )}
              >
                {programType}
              </Badge>
            </div>
            <CardDescription className="flex items-center mt-1">
              <span className="truncate max-w-[180px]">{shortMint}</span>
              <button
                onClick={() => copyToClipboard(token.mint)}
                className="ml-1 text-muted-foreground hover:text-primary"
              >
                <Copy className="h-3 w-3" />
              </button>
              {copied && <span className="text-xs ml-1 text-green-500">Copied!</span>}
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className={`${getRiskColor(randomScore)} text-white`}>{randomScore}/100</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated risk score</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Decimals</div>
              <div className="font-medium">{token.decimals}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Creator</div>
              <div className="font-medium flex items-center">
                <span className="truncate">{shortCreator}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{token.creator}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="text-sm">
            <div className="text-muted-foreground">Created</div>
            <div className="font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{timeAgo}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{formattedDate}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {token.mintAuthority && (
              <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                Mint Authority Set
              </Badge>
            )}
            {token.freezeAuthority && (
              <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">
                Freeze Authority Set
              </Badge>
            )}
            {!token.symbol && (
              <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500/20">
                No Symbol
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/tokens/${token.mint}`}>
              <Shield className="h-4 w-4 mr-2" />
              Analyze
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => window.open(`https://solscan.io/token/${token.mint}`, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
