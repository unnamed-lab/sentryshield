"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  AlertTriangle,
  Search,
  BarChart3,
  Zap,
} from "lucide-react";
import HeroAnimation from "@/components/hero-animation";
import PartnerLogos from "@/components/partner-logos";
import FeatureCard from "@/components/feature-card";
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "./components/navbar";

export default function Home() {
  const { connected, connecting, connect } = useWallet();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80 justify-center">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="container py-16 md:py-24 flex flex-col md:flex-row  gap-8">
        <div className="flex-1 space-y-6">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Comprehensive DeFi Security
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Protect Your <span className="text-primary">Web3</span> Assets with
            Confidence
          </h1>
          <p className="text-xl text-muted-foreground">
            SentryShield combines advanced token analysis, risk scoring, and
            secure authentication to protect you from DeFi scams before they
            happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {connected ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={connect}
                disabled={connecting}
              >
                {connecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
            <Link href="/features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative h-[400px] w-full">
          <HeroAnimation />
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Powered By Industry Leaders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SentryShield integrates with the most trusted security providers in
            the Web3 space
          </p>
        </div>
        <PartnerLogos />
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Comprehensive Security Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our all-in-one platform combines the best security tools to keep
            your assets safe
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="h-10 w-10 text-primary" />}
            title="Token Analysis"
            description="Advanced network visualization and wallet profiling to detect suspicious tokens before you invest."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title="Risk Scoring"
            description="Real-time threat scoring for tokens and wallets using DD.xyz's comprehensive API."
          />
          <FeatureCard
            icon={<Lock className="h-10 w-10 text-primary" />}
            title="Secure Authentication"
            description="Protect your wallet with Civic's secure authentication and embedded wallet technology."
          />
          <FeatureCard
            icon={<AlertTriangle className="h-10 w-10 text-primary" />}
            title="Community Alerts"
            description="Crowdsourced reporting system to flag suspicious tokens and warn other users."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Transaction Pre-Screening"
            description="Verify contract safety before signing any transaction to prevent scams."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Real-Time Monitoring"
            description="Continuous monitoring of your wallet for exposure to malicious contracts."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="rounded-2xl bg-primary/10 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to secure your DeFi investments?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of users who trust SentryShield to protect their
              Web3 assets from scams and malicious contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {connected ? (
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={connect}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
              <Link href="#contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
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
                  <Link
                    href="/features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 SentryShield. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
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
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
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
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
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
  );
}
