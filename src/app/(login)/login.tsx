"use client";

import Link from "next/link";
import "@/styles/globals.css";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/loginUi/button";
import { Input } from "@/components/loginUi/input";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";
import { ActionState } from "@/lib/auth/middleware";
import SVGLogo from "@/components/loginUi/svg-logo";

import {
  signInWithMagicLink,
  signInWithGoogle,
  signInWithGithub,
  signIn,
} from "./actions";

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInState, signInAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(signIn, { error: "", success: "" });
  const [magicLinkState, magicLinkAction, pending] = useActionState<
    ActionState,
    FormData
  >(signInWithMagicLink, { error: "", success: "" });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <SVGLogo />
        </div>

        <h1 className="mt-10 text-2xl font-semibold tracking-tight text-center text-gray-900">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {mode === "signin"
            ? "Sign in to continue to your account"
            : "Get started with your new account"}
        </p>

        <div className="mt-10">
          {magicLinkState?.success ? (
            <div className="p-6 text-center bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">
                Check your email
              </h3>
              <p className="mt-2 text-sm text-green-700">
                We&apos;ve sent you a magic link to sign in to your account.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Magic Link Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append("email", email);
                  magicLinkAction(formData);
                }}
                className="space-y-4"
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                />

                <Button
                  type="submit"
                  className="w-full h-12 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {pending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Continue with Email"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="flex absolute inset-0 items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="flex relative justify-center">
                  <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-white to-gray-50">
                    or
                  </span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <Button
                onClick={handleGoogleSignIn}
                className="w-full h-12 font-medium text-gray-700 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex justify-center items-center">
                    {/* Google SVG Icon */}
                    Continue with Google
                  </div>
                )}
              </Button>

              {/* GitHub Sign In Button */}
              <Button
                onClick={handleGithubSignIn}
                className="w-full h-12 font-medium text-gray-700 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h=5 animate-spin" />
                ) : (
                  <div className="flex justify-center items-center">
                    {/* GitHub SVG Icon */}
                    Continue with GitHub
                  </div>
                )}
              </Button>
            </div>
          )}

          {magicLinkState?.error && (
            <div className="mt-4 text-sm text-red-600">
              {magicLinkState.error}
            </div>
          )}

          {/* Sign In Form */}
          {mode === "signin" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("email", email);
                formData.append("password", password);
                signInAction(formData);
              }}
              className="space-y-4 mt-6"
            >
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="submit"
                className="w-full h-12 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {signInPending ? (
                  <Loader2 className="w-5 h=5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          )}

          {/* Redirect Link */}
          <p className="mt8 text-sm text-center text-gray600">
            {mode === "signin"
              ? "You Just Arrived Amigo? "
              : "Already have an account? "}
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }`}
              className="font-medium text-blue600 hover:text-blue500"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
