import React from "react";
import AuthLayout from "../components/auth-layout";
import Link from "next/link";

export default function Logout() {
  return (
    <div>
      <AuthLayout
        title="You've been signed out"
        description="Your SentryShield session has ended securely"
      >
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Session ended successfully
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {"You've been securely signed out of SentryShield."}
          </p>
          <div className="mt-6">
            <Link href="/auth/login">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in again
              </a>
            </Link>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
