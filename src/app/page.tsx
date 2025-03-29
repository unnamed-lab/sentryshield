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
import Footer from "./components/footer";

export default function Home() {
  const { connected, connecting, connect } = useWallet();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80 w-full">
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
      <Footer />
    </div>
  );
}
