/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface TokenHoldingsListProps {
  holdings: any[]
  isLoading?: boolean
  showPagination?: boolean
  compact?: boolean
}

export function TokenHoldingsList({
  holdings = [],
  isLoading = false,
  showPagination = false,
  compact = false,
}: TokenHoldingsListProps) {
  const [page, setPage] = useState(1)
  const itemsPerPage = compact ? 5 : 10
  const totalPages = Math.ceil(holdings.length / itemsPerPage)

  const paginatedHoldings = holdings.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500"
    if (change < 0) return "text-red-500"
    return "text-muted-foreground"
  }

  if (isLoading) {
    return compact ? (
      <div className="space-y-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-3 w-12 ml-auto" />
              </div>
            </div>
          ))}
      </div>
    ) : (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Allocation</TableHead>
              <TableHead></TableHead>
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
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-9 w-9" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!holdings.length) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <p>No token holdings found</p>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="space-y-3">
        {paginatedHoldings.map((holding) => (
          <div key={holding.token.mint} className="flex items-center justify-between py-2 group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {holding.token.symbol.substring(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium truncate">{holding.token.symbol}</span>
                  {holding.token.verified && <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {holding.balance.toLocaleString(undefined, {
                    maximumFractionDigits: holding.token.decimals > 6 ? 4 : 2,
                  })}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-medium">
                ${holding.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={cn("text-xs", getChangeColor(holding.change24h))}>
                {holding.change24h > 0 ? "+" : ""}
                {holding.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead className="hidden sm:table-cell">Balance</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden sm:table-cell">24h Change</TableHead>
              <TableHead className="hidden lg:table-cell">Allocation</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedHoldings.map((holding) => (
              <TableRow key={holding.token.mint}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{holding.token.symbol}</span>
                      {holding.token.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {`${holding.token.mint.substring(0, 6)}...${holding.token.mint.substring(holding.token.mint.length - 4)}`}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {holding.balance.toLocaleString(undefined, {
                    maximumFractionDigits: holding.token.decimals > 6 ? 4 : 2,
                  })}
                </TableCell>
                <TableCell>${holding.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                <TableCell className="hidden md:table-cell">
                  ${holding.price.toLocaleString(undefined, { maximumFractionDigits: holding.price < 0.01 ? 6 : 2 })}
                </TableCell>
                <TableCell className={cn("hidden sm:table-cell", getChangeColor(holding.change24h))}>
                  {holding.change24h > 0 ? "+" : ""}
                  {holding.change24h.toFixed(2)}%
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${Math.min(100, holding.allocation)}%` }}
                      />
                    </div>
                    <span>{holding.allocation.toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    onClick={() => window.open(`https://solscan.io/token/${holding.token.mint}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, holdings.length)} of{" "}
            {holdings.length} tokens
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex-1 sm:flex-initial"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex-1 sm:flex-initial"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
