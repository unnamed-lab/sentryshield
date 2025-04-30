
import type React from "react";
import { Header } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { getUser } from "@civic/auth-web3/nextjs";
import { UserButton } from "@civic/auth-web3/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return (
      <div className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">
          Please log in to access this page.
        </p>
        <UserButton className="font-bold rounded py-2 hover:text-black" />
      </div>
    );
  }

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
