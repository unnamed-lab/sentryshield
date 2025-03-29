"use client"

import { useState } from "react"
import { Shield, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ConnectWallet() {
  const { connectWallet, isConnecting } = useAuth()
  const [activeTab, setActiveTab] = useState("civic")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to SentryShield</h1>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to access the dashboard and security features
          </p>
        </div>

        <Tabs defaultValue="civic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="civic">Civic</TabsTrigger>
            <TabsTrigger value="others">Other Wallets</TabsTrigger>
          </TabsList>

          <TabsContent value="civic" className="mt-4">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Connect with Civic</CardTitle>
                <CardDescription>Secure authentication with enhanced privacy</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-4">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <LockKeyhole className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center text-sm text-muted-foreground mb-4">
                  <p>Civic provides:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Secure wallet authentication</li>
                    <li>• Privacy-preserving verification</li>
                    <li>• Phishing-resistant login</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={connectWallet} disabled={isConnecting}>
                  {isConnecting ? "Connecting..." : "Connect with Civic"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="others" className="mt-4">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Other Wallets</CardTitle>
                <CardDescription>Connect using your preferred wallet</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 py-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <img src="/wallets/metamask.svg" alt="MetaMask" className="mr-2 h-5 w-5" />
                  MetaMask
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <img src="/wallets/walletconnect.svg" alt="WalletConnect" className="mr-2 h-5 w-5" />
                  WalletConnect
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <img src="/wallets/coinbase.svg" alt="Coinbase" className="mr-2 h-5 w-5" />
                  Coinbase Wallet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground">
          By connecting, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

