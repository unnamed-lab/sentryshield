"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";

export default function CopyBtn({ text }: { text: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    };
    
  return (
    <Button
      onClick={copyToClipboard}
      className="text-slate-300 hover:text-white flex-shrink-0"
    >
      <Copy className="h-3.5 w-3.5" />
    </Button>
  );
}
