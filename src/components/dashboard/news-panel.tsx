"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface NewsPanelProps {
  isLoading?: boolean
  extended?: boolean
}

export function NewsPanel({ isLoading = false, extended = false }: NewsPanelProps) {
  // Mock news data - replace with actual data in production
  const newsItems = [
    {
      id: 1,
      title: "Solana Ecosystem Sees Surge in New Token Launches",
      source: "CryptoNews",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      category: "Market",
      related: ["SOL", "Tokens", "DeFi"],
      url: "https://example.com/news/1",
    },
    {
      id: 2,
      title: "COINIFY Token Announces Major Partnership with Leading Exchange",
      source: "TokenInsider",
      date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      category: "Projects",
      related: ["COINIFY", "Exchanges", "Partnerships"],
      url: "https://example.com/news/2",
    },
    {
      id: 3,
      title: "Regulatory Clarity Coming for Crypto Assets, Officials Say",
      source: "CryptoDaily",
      date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      category: "Regulation",
      related: ["Regulation", "Compliance", "Government"],
      url: "https://example.com/news/3",
    },
    {
      id: 4,
      title: "New Security Tool Helps Identify Risky Token Contracts",
      source: "BlockchainTimes",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      category: "Security",
      related: ["Security", "Smart Contracts", "Tools"],
      url: "https://example.com/news/4",
    },
    {
      id: 5,
      title: "RAGNAR Token Price Surges 35% Following Product Launch",
      source: "CoinMarketNews",
      date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
      category: "Price",
      related: ["RAGNAR", "Price Action", "Product Launch"],
      url: "https://example.com/news/5",
    },
  ]

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "market":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "projects":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "regulation":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "security":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "price":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(extended ? 3 : 2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  const displayedNews = extended ? newsItems : newsItems.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayedNews.map((item) => (
        <div key={item.id} className="flex gap-3 group">
          <div className="flex-shrink-0 w-12 h-12 rounded-md bg-muted flex items-center justify-center">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-start justify-between">
              <Badge variant="outline" className={getCategoryColor(item.category)}>
                {item.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {getTimeAgo(item.date)}
              </span>
            </div>
            <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.source}</span>
              <div className="flex gap-1">
                {item.related.slice(0, 2).map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button variant="outline" size="sm" className="gap-1">
          View All News
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
