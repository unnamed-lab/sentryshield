import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { TokenCheck, VerifiedTokenSimple } from "@/types"
import { AlertTriangle, CheckCircle, Clock, ExternalLink, Shield } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface TokenCardProps {
  token: TokenCheck | VerifiedTokenSimple
  variant?: "default" | "compact"
  showActions?: boolean
}

export function TokenCard({ token, variant = "default", showActions = true }: TokenCardProps) {
  // Check if token is TokenCheck or VerifiedTokenSimple
  const isTokenCheck = "tokenMeta" in token

  const name = isTokenCheck ? token.tokenMeta.name : token.name
  const symbol = isTokenCheck ? token.tokenMeta.symbol : token.symbol
  const mint = token.mint
  const createdAt = token.createdAt

  // Only available in TokenCheck
  const score = isTokenCheck ? token.score : null
  const price = isTokenCheck ? token.price : null
  const totalHolders = isTokenCheck ? token.totalHolders : null
  const totalMarketLiquidity = isTokenCheck ? token.totalMarketLiquidity : null
  const risks = isTokenCheck ? token.risks : null

  // Determine risk level
  const getRiskLevel = () => {
    if (!isTokenCheck) return { color: "bg-gray-500", label: "Unknown" }

    if (score >= 90) return { color: "bg-green-500", label: "Low Risk" }
    if (score >= 70) return { color: "bg-yellow-500", label: "Medium Risk" }
    if (score >= 50) return { color: "bg-orange-500", label: "High Risk" }
    return { color: "bg-red-500", label: "Very High Risk" }
  }

  const riskLevel = getRiskLevel()

  // Format time ago
  const timeAgo = (() => {
    try {
      if (!createdAt) return "Unknown date"
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Unknown date"
    }
  })()

  // Format address for display
  const shortAddress = `${mint.substring(0, 6)}...${mint.substring(mint.length - 4)}`

  // Determine if token is verified
  const isVerified = isTokenCheck ? token.verification?.jup_verified : true

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{name}</CardTitle>
              {isVerified && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <CardDescription>{symbol}</CardDescription>
          </div>
          {isTokenCheck && score !== null && <Badge className={`${riskLevel.color} text-white`}>{score}/100</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {variant === "default" && isTokenCheck && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground">Price</div>
                <div className="font-medium">${price?.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Holders</div>
                <div className="font-medium">{totalHolders?.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Liquidity</div>
                <div className="font-medium">${totalMarketLiquidity?.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Created</div>
                <div className="font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeAgo}
                </div>
              </div>
            </div>

            {score !== null && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Security Score</span>
                  <span className={score >= 70 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500"}>
                    {score}/100
                  </span>
                </div>
                <Progress
                  value={score}
                  className="h-2"
                  indicatorClassName={score >= 70 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"}
                />
              </div>
            )}

            {risks && risks.length > 0 && (
              <div className="space-y-1">
                <div className="text-sm font-medium">Risk Factors</div>
                <div className="flex flex-wrap gap-1">
                  {risks.map((risk, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={
                        risk.level === "low"
                          ? "border-green-500/20 bg-green-500/10 text-green-500"
                          : risk.level === "medium"
                            ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                            : "border-red-500/20 bg-red-500/10 text-red-500"
                      }
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {risk.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {variant === "compact" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="text-muted-foreground">{shortAddress}</div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{timeAgo}</span>
              </div>
            </div>
            {isTokenCheck && score !== null && (
              <Progress
                value={score}
                className="h-1.5"
                indicatorClassName={score >= 70 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"}
              />
            )}
          </div>
        )}
      </CardContent>
      {showActions && (
        <CardFooter className="pt-2">
          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/tokens/${mint}`}>
                <Shield className="h-4 w-4 mr-2" />
                Analyze
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
