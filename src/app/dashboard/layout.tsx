"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { useUser } from "@civic/auth-web3/react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  // Redirect to the dashboard home if authenticated
  useEffect(() => {
    if (user && window.location.pathname === "/dashboard/login") {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <SidebarProvider defaultOpen={false} className="relative">
      <AppSidebar />
      <main className="flex-1">
        <Header />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
