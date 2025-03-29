"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  AlertTriangle,
  BarChart3,
  Wallet,
  Settings,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Image from "next/image";
import Link from "next/link";
export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, openMobile, state, toggleSidebar } = useSidebar();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Token Scanner",
      icon: Search,
      href: "/dashboard/token-scanner",
      active:
        pathname === "/dashboard/token-scanner" ||
        pathname.startsWith("/dashboard/tokens/"),
    },
    {
      label: "Wallet Profiler",
      icon: Wallet,
      href: "/dashboard/wallet-profiler",
      active:
        pathname === "/dashboard/wallet-profiler" ||
        pathname.startsWith("/dashboard/wallets/"),
    },
    {
      label: "Risk Analysis",
      icon: AlertTriangle,
      href: "/dashboard/risk-analysis",
      active: pathname === "/dashboard/risk-analysis",
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports",
    },
    {
      label: "Alerts",
      icon: Bell,
      href: "/dashboard/alerts",
      active: pathname === "/dashboard/alerts",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="flex flex-col gap-4 items-center">
        {state !== "collapsed" ? (
          <div className="flex flex-row justify-end pt-5 w-full">
            <Link href="/" className="block">
              <Image
                src="/logo-white.svg"
                alt="Logo"
                className="w-40 h-auto"
                width={140}
                height={36}
                priority
              />
            </Link>
          </div>
        ) : (
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              alt="Logo"
              className="w-6 h-6"
              width={32}
              height={32}
              priority
            />
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarMenu className="px-1 gap-3">
          {routes.map((project) => (
            <SidebarMenuItem key={project.label}>
              <SidebarMenuButton
                className={cn(
                  "p-2 hover:bg-white/5 hover:text-primary",
                  pathname === project.href
                    ? "border border-primary/10 bg-white/5"
                    : ""
                )}
                asChild
              >
                <Link href={project.href} className="text-white text-sm">
                  <project.icon />
                  <span>{project.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
