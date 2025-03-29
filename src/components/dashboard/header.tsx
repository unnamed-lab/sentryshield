"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Shield, User, PanelLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/ui/notifications";
import { useNotifications } from "@/hooks/use-notifications";
import { useSidebar } from "../ui/sidebar";
import { useUser } from "@civic/auth-web3/react";

export function Header({ className }: { className?: string }) {
  const { toggleSidebar, isMobile } = useSidebar();
  const { user, signOut } = useUser();
  const { notifications, markAsRead, markAllAsRead, clearAllNotifications } =
    useNotifications();

  const disconnectWallet = () => signOut();

  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6 transition-all duration-300",
        className
      )}
    >
      {isMobile ? (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      )}

      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4 lg:gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-background pl-8 md:max-w-md"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <NotificationDropdown
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAllNotifications}
        />
        <Button variant="outline" size="icon" className="rounded-full">
          <Shield className="h-4 w-4" />
          <span className="sr-only">Security Status</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user?.given_name || "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings?tab=security">
                Security Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings?tab=wallets">
                Wallet Connections
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={disconnectWallet}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
