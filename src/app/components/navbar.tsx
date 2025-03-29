import { Button } from "@/components/ui/button";
import { AuthStatus } from "@civic/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";

const navbarItems = [
  { title: "Features", href: "/features" },
  { title: "Partners", href: "/partners" },
  { title: "Security", href: "/security" },
  { title: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const userContext = useUser();
  const { authStatus, signIn } = useUser();
  const connected = authStatus === AuthStatus.AUTHENTICATED;

  const handleConnect = React.useCallback(async () => {
    const afterLogin = async () => {
      if (userContext.user && !userHasWallet(userContext)) {
        await userContext.createWallet();
      }
    };
    await signIn().then(afterLogin);
  }, [signIn, userContext]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <Image
          src={"/logo-white.svg"}
          alt="SentryShield Logo"
          width={200}
          height={30}
        />
        <nav className="hidden md:flex items-center gap-6">
          {navbarItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-sm transition-color ease font-medium hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {connected ? (
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <Button
              variant={"default"}
              size="sm"
              onClick={handleConnect}
              // disabled={authStatus === AuthStatus.AUTHENTICATING ? false : true}
            >
              {connected ? "Connecting..." : "Connect"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
