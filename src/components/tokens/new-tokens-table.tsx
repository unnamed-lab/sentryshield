/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Copy, ExternalLink, Shield } from "lucide-react"
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

interface NewTokensTableProps {
  tokens: Token[]
  maxItems?: number
}

export function NewTokensTable({ tokens, maxItems = 5 }: NewTokensTableProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const displayedTokens = tokens.slice(0, maxItems)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Mint</TableHead>
              <TableHead>Decimals</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Program</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTokens.map((token) => {
              // Format time ago
              const timeAgo = formatDistanceToNow(new Date(token.createAt), { addSuffix: true })

              // Format addresses for display
              const shortMint = `${token.mint.substring(0, 6)}...${token.mint.substring(token.mint.length - 4)}`

              // Determine token program type
              const isProgramToken = token.program === "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
              const programType = isProgramToken ? "SPL Token" : "Token 2022"

              return (
                <TableRow key={token.mint}>
                  <TableCell className="font-medium">{token.symbol || "Unnamed Token"}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{shortMint}</span>
                      <button
                        onClick={() => copyToClipboard(token.mint)}
                        className="ml-1 text-muted-foreground hover:text-primary"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                      {copied === token.mint && <span className="text-xs ml-1 text-green-500">Copied!</span>}
                    </div>
                  </TableCell>
                  <TableCell>{token.decimals}</TableCell>
                  <TableCell>{timeAgo}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/tokens/${token.mint}`}>
                          <Shield className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://solscan.io/token/${token.mint}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/new-tokens">View All</Link>
        </Button>
      </div>
    </div>
  )
}
