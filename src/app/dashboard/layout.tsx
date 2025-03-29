"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { useUser } from "@civic/auth-web3/react";

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
    <div className="bg-background">
        <Header />
      <div className="relative flex flex-col flex-1">
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <AppSidebar />
    </div>
  );
}
