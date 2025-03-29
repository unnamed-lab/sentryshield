"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { ConnectWallet } from "@/components/auth/connect-wallet";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAuth();
  const router = useRouter();

  // Redirect to the dashboard home if authenticated
  useEffect(() => {
    if (isConnected && window.location.pathname === "/dashboard/login") {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return <ConnectWallet />;
  }

  return (
    <div className="bg-background">
      <AppSidebar />
      <div className="relative flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
