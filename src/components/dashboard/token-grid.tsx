/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpDown, CheckCircle, ChevronLeft, ChevronRight, Copy, ExternalLink, Shield } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TokenGridProps {
  tokens: any[]
  isLoading?: boolean
  viewMode?: "grid" | "list"
  emptyMessage?: string
  showPagination?: boolean
}

export function TokenGrid({
  tokens = [],
  isLoading = false,
  viewMode = "grid",
  emptyMessage = "No tokens found",
  showPagination = false,
}: TokenGridProps) {
  const [page, setPage] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)
  const itemsPerPage = viewMode === "grid" ? 12 : 10
  const totalPages = Math.ceil(tokens.length / itemsPerPage)

  const paginatedTokens = tokens.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getRiskColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-green-400"
    if (score >= 50) return "bg-yellow-500"
    if (score >= 30) return "bg-orange-500"
    return "bg-red-500"
  }

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown date"
    }
  }

  if (isLoading) {
    return viewMode === "grid" ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-9" />
              </CardFooter>
            </Card>
          ))}
      </div>
    ) : (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Volume (24h)</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex flex-col">
                      <Skeleton className="h-5 w-16 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-9 w-20" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!tokens.length) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedTokens.map((token) => (
            <Card key={token.mint} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{token.symbol}</h3>
                        {token.verified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verified Token</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="truncate max-w-[140px]">{formatAddress(token.mint)}</span>
                        <button
                          onClick={() => copyToClipboard(token.mint)}
                          className="ml-1 text-muted-foreground hover:text-primary"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        {copied === token.mint && <span className="text-xs ml-1 text-green-500">Copied!</span>}
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={cn("text-white", getRiskColor(token.riskScore))}>
                            {token.riskScore}/100
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Risk Score</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Price</div>
                      <div className="font-medium">${token.price?.toFixed(4) || "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Market Cap</div>
                      <div className="font-medium">
                        $
                        {token.marketCap
                          ? token.marketCap >= 1000000
                            ? `${(token.marketCap / 1000000).toFixed(1)}M`
                            : `${(token.marketCap / 1000).toFixed(1)}K`
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Volume (24h)</div>
                      <div className="font-medium">
                        $
                        {token.volume24h
                          ? token.volume24h >= 1000000
                            ? `${(token.volume24h / 1000000).toFixed(1)}M`
                            : `${(token.volume24h / 1000).toFixed(1)}K`
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Created</div>
                      <div className="font-medium">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">{getTimeAgo(token.createAt)}</TooltipTrigger>
                            <TooltipContent>
                              <p>{new Date(token.createAt).toLocaleString()}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/tokens/${token.mint}`}>
                    <Shield className="mr-2 h-4 w-4" />
                    Analyze
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={() => window.open(`https://solscan.io/token/${token.mint}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Token</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Risk Score
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Market Cap
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Volume (24h)
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Created
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTokens.map((token) => (
                <TableRow key={token.mint}>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{token.symbol}</span>
                        {token.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{formatAddress(token.mint)}</span>
                        <button
                          onClick={() => copyToClipboard(token.mint)}
                          className="ml-1 text-muted-foreground hover:text-primary"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        {copied === token.mint && <span className="text-xs ml-1 text-green-500">Copied!</span>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${token.price?.toFixed(4) || "N/A"}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-white", getRiskColor(token.riskScore))}>{token.riskScore}</Badge>
                  </TableCell>
                  <TableCell>
                    $
                    {token.marketCap
                      ? token.marketCap >= 1000000
                        ? `${(token.marketCap / 1000000).toFixed(1)}M`
                        : `${(token.marketCap / 1000).toFixed(1)}K`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    $
                    {token.volume24h
                      ? token.volume24h >= 1000000
                        ? `${(token.volume24h / 1000000).toFixed(1)}M`
                        : `${(token.volume24h / 1000).toFixed(1)}K`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">{getTimeAgo(token.createAt)}</TooltipTrigger>
                        <TooltipContent>
                          <p>{new Date(token.createAt).toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/tokens/${token.mint}`}>
                          <Shield className="mr-2 h-4 w-4" />
                          Analyze
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => window.open(`https://solscan.io/token/${token.mint}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, tokens.length)} of {tokens.length}{" "}
            tokens
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
