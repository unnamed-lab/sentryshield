import type { TokenCheck, TrendingToken, VerifiedTokenSimple } from "@/types";
import { TokenCard } from "./token-card";

interface TokenListProps {
  tokens: (TokenCheck | VerifiedTokenSimple | TrendingToken)[];
  variant?: "default" | "compact";
  showActions?: boolean;
  columns?: number;
  isLoading?: boolean;
}

export function TokenList({
  tokens,
  variant = "default",
  showActions = true,
  columns = 3,
  isLoading = false,
}: TokenListProps) {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4`}
      >
        {Array(columns)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-[250px] rounded-lg bg-muted animate-pulse"
            />
          ))}
      </div>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tokens found
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4`}
    >
      {tokens.map((token) => {
        // Handle TrendingToken type by providing a placeholder
        if (token as TrendingToken) {
          return (
            <div
              key={token.mint}
              className="h-[250px] rounded-lg bg-muted flex items-center justify-center"
            >
              Trending Token: {token.mint}
            </div>
          );
        }

        return (
          <TokenCard
            key={token.mint}
            token={token as TokenCheck | VerifiedTokenSimple}
            variant={variant}
            showActions={showActions}
          />
        );
      })}
    </div>
  );
}
