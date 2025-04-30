import { CivicAuthIframeContainer } from "@civic/auth/react";
import React from "react";
import AuthLayout from "../components/auth-layout";

export default function Login() {
  return (
    <div>
      <AuthLayout
        title="Sign in to SentryShield"
        description="Secure access to your monitoring dashboard"
      >
        <div>
          <CivicAuthIframeContainer />
        </div>

        {/* <div className="text-center">
          {loading ? (
            <div className="py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">
                Initializing Web3 authentication...
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign in with Civic Pass
              </button>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  New to Web3?{" "}
                  <a
                    href="https://docs.civic.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Learn about Civic Pass
                  </a>
                </p>
              </div>
            </>
          )}
        </div> */}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Contact support
            </a>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
}
