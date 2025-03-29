"use client";

import { usePathname } from "next/navigation";
import {
  Shield,
  Home,
  Search,
  AlertTriangle,
  BarChart3,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        <div
          className={cn(
            "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity",
            openMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={toggleSidebar}
        />
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out md:hidden",
            openMobile ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-6 py-4 border-b">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SentryShield</span>
            </div>
            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={toggleSidebar}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    route.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="space-y-1">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <Sidebar collapsible="icon" className="border-none z-30">
      <SidebarHeader className="flex flex-col gap-4">
        {state === "collapsed" ? (
          <div className="flex flex-row justify-end pt-5 w-full">
            <Link href="/" className="block">
              <Image
                src="./logo-white.svg"
                alt="Logo"
                className="w-6 h-6"
                width={140}
                height={36}
                priority
              />
            </Link>
          </div>
        ) : (
          <Link href={"/"}>
            <Image
              src={"./logo.svg"}
              alt="Logo"
              width={60}
              height={34}
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
