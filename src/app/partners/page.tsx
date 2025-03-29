import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ExternalLink } from "lucide-react"
import Navbar from "../components/navbar"

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
            <Navbar />
      

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold bg-primary/10 text-primary">
                Industry Leaders
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Trusted Partners</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SentryShield collaborates with leading security providers to deliver the most comprehensive protection
                for your Web3 assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="aspect-[4/1] overflow-hidden rounded-lg bg-primary/10 p-6 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">RugCheck</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">RugCheck</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced token contract analysis and risk detection for the DeFi ecosystem.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">Integration Benefits:</h4>
                    <ul className="ml-4 list-disc text-sm space-y-1 text-muted-foreground">
                      <li>Detect rugpull signals in smart contracts</li>
                      <li>Identify token supply manipulation risks</li>
                      <li>Analyze liquidity pool security</li>
                    </ul>
                    <Link
                      href="https://example.com/rugcheck"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mt-2"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="aspect-[4/1] overflow-hidden rounded-lg bg-primary/10 p-6 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">DD.xyz</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">DD.xyz</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive risk scoring and analysis for tokens, wallets, and protocols.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">Integration Benefits:</h4>
                    <ul className="ml-4 list-disc text-sm space-y-1 text-muted-foreground">
                      <li>Real-time risk metric calculations</li>
                      <li>Historical behavior pattern analysis</li>
                      <li>Multi-chain security monitoring</li>
                    </ul>
                    <Link
                      href="https://example.com/ddxyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mt-2"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="aspect-[4/1] overflow-hidden rounded-lg bg-primary/10 p-6 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">Civic</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">Civic</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure authentication and embedded wallet technology for Web3 applications.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">Integration Benefits:</h4>
                    <ul className="ml-4 list-disc text-sm space-y-1 text-muted-foreground">
                      <li>Phishing-resistant wallet authentication</li>
                      <li>Secure key management and recovery</li>
                      <li>Privacy-preserving identity verification</li>
                    </ul>
                    <Link
                      href="https://example.com/civic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mt-2"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="aspect-[4/1] overflow-hidden rounded-lg bg-primary/10 p-6 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">Ethereum</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">Ethereum Foundation</h3>
                    <p className="text-sm text-muted-foreground">
                      Technical support and blockchain infrastructure for decentralized applications.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">Integration Benefits:</h4>
                    <ul className="ml-4 list-disc text-sm space-y-1 text-muted-foreground">
                      <li>Direct access to blockchain data</li>
                      <li>Smart contract security standards</li>
                      <li>Developer support and resources</li>
                    </ul>
                    <Link
                      href="https://ethereum.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mt-2"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="aspect-[4/1] overflow-hidden rounded-lg bg-primary/10 p-6 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">ChainGuard</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">ChainGuard</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time transaction monitoring and threat intelligence for DeFi users.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">Integration Benefits:</h4>
                    <ul className="ml-4 list-disc text-sm space-y-1 text-muted-foreground">
                      <li>Pre-transaction security analysis</li>
                      <li>Malicious address detection</li>
                      <li>Gas fee manipulation protection</li>
                    </ul>
                    <Link
                      href="https://example.com/chainguard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mt-2"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="aspect-[4/1] overflow-hidden rounded-lg bg-primary/10 p-6 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">BlockSentry</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">BlockSentry</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced visualizations and network analysis for blockchain transactions.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">Integration Benefits:</h4>
                    <ul className="ml-4 list-disc text-sm space-y-1 text-muted-foreground">
                      <li>Token flow visualization</li>
                      <li>Suspicious transaction pattern detection</li>
                      <li>Related address clustering</li>
                    </ul>
                    <Link
                      href="https://example.com/blocksentry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mt-2"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner with us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Become a Partner</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our ecosystem of security providers to help create a safer Web3 environment for all users.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/contact">
                <Button className="w-full">Contact Our Team</Button>
              </Link>
              <p className="text-xs text-muted-foreground">
                {"We're looking for partners in threat intelligence, security research, and identity verification."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SentryShield</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive DeFi security platform for the Web3 ecosystem.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 SentryShield. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Discord</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

