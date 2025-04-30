import { Token } from "@/types";
import React from "react";

interface TokenRecentProps {
  token: Token;
}

export default function TokenRecent({ token }: TokenRecentProps) {
  return (
    <div className="border border-primary/30 rounded-2xl p-4 text-base">
          <div className="">{token.symbol} </div>
    </div>
  );
}
