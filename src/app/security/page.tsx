import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  LockIcon as ServerLock,
  Code,
  FileCheck,
  ArrowRight,
  Key,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Navbar from "../components/navbar";

export default function SecurityPage() {
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
                Enterprise-Grade Security
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Security Approach
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SentryShield takes a comprehensive approach to protecting your
                assets and data with industry-leading security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Security Pillars
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is built on these foundational security principles
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <CardContent className="flex flex-col space-y-4 p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <ServerLock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Data Protection</h3>
                </div>
                <p className="text-muted-foreground">
                  All user data is encrypted both in transit and at rest. We use
                  industry-standard encryption algorithms and secure storage
                  practices.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Secure data storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Regular security audits
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardContent className="flex flex-col space-y-4 p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Authentication</h3>
                </div>
                <p className="text-muted-foreground">
                  We implement multiple layers of authentication to ensure only
                  authorized users can access sensitive information.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Secure wallet authentication (Civic)
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Multi-factor authentication
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Anti-phishing protection
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardContent className="flex flex-col space-y-4 p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Secure Code</h3>
                </div>
                <p className="text-muted-foreground">
                  Our development practices follow industry best standards with
                  multiple layers of code review and testing.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Regular security testing
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    External penetration testing
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Continuous vulnerability scanning
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Certifications */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-semibold">
                <FileCheck className="mr-1 h-4 w-4" /> Certifications &
                Compliance
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Industry Standards
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SentryShield adheres to the highest security standards in the
                industry and is regularly audited by third-party security firms.
              </p>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="font-medium">SOC 2 Type II Compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="font-medium">GDPR Compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="font-medium">ISO 27001 Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="font-medium">CCPA Compliant</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4 shadow-sm">
                  <div className="text-center text-xl font-bold">Quarterly</div>
                  <div className="text-center text-sm text-muted-foreground">
                    Security Audits
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4 shadow-sm">
                  <div className="text-center text-xl font-bold">99.99%</div>
                  <div className="text-center text-sm text-muted-foreground">
                    Platform Uptime
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4 shadow-sm">
                  <div className="text-center text-xl font-bold">256-bit</div>
                  <div className="text-center text-sm text-muted-foreground">
                    Encryption
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4 shadow-sm">
                  <div className="text-center text-xl font-bold">24/7</div>
                  <div className="text-center text-sm text-muted-foreground">
                    Security Monitoring
                  </div>
                </div>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="mt-0.5 h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-bold leading-none tracking-tight">
                        Bug Bounty Program
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        We maintain an active bug bounty program to encourage
                        security researchers to help us identify and fix
                        potential vulnerabilities.
                      </p>
                      <Link
                        href="#"
                        className="text-primary hover:underline text-sm inline-flex items-center mt-2"
                      >
                        Learn more about our bounty program
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security FAQ */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Security FAQs
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Common questions about our security practices
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 py-12">
            <div className="space-y-2">
              <h3 className="font-bold">
                How does SentryShield protect my wallet information?
              </h3>
              <p className="text-muted-foreground">
                SentryShield never requires or stores your private keys. Our
                platform uses secure wallet connection methods like Civic that
                maintain your ownership of keys. We only access public on-chain
                data related to your wallet address.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">
                Can my data be accessed by third parties?
              </h3>
              <p className="text-muted-foreground">
                We never sell or share your personal data with third parties. We
                maintain strict data access controls and encryption protocols to
                ensure that only authorized personnel can access information
                necessary for providing our services.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">
                How are security vulnerabilities handled?
              </h3>
              <p className="text-muted-foreground">
                We maintain a dedicated security team that continuously monitors
                for vulnerabilities. We also run a bug bounty program and
                conduct regular third-party security audits to identify and
                remediate potential issues before they affect our users.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">
                {"What happens if there's a security breach?"}
              </h3>
              <p className="text-muted-foreground">
                In the unlikely event of a security breach, we have an incident
                response plan that includes immediate security measures,
                stakeholder notification, and transparent communication about
                the impact and resolution.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">
                How can I report a security concern?
              </h3>
              <p className="text-muted-foreground">
                We encourage responsible disclosure of security issues. If you
                identify a potential vulnerability, please email
                security@sentryshield.com with details. Our security team will
                promptly investigate all reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
