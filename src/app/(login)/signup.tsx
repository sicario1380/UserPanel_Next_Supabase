"use client";

import Link from "next/link";
import "@/styles/globals.css";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter for redirection
import { Button } from "@/components/loginUi/button";
import { Input } from "@/components/loginUi/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import SVGLogo from "@/components/loginUi/svg-logo";
import useSignUp, { SignUpUserData } from "@/hooks/useSignUp"; // Adjust the import path as necessary
import { supabase } from "@/supabase/client";

export function SignUp({ mode = "signup" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize router for redirection
  const redirect = searchParams.get("redirect"); // Get redirect parameter

  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // Use state for date of birth as string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(""); // Optional field
  const [role, setRole] = useState<"user" | "admin">("user"); // Default role with correct type

  const signUpMutation = useSignUp();
  const { mutate: signUp, isPending, isError, error } = signUpMutation;

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData: SignUpUserData = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      profilePictureUrl,
      role,
      username,
      dateOfBirth: new Date(dateOfBirth),
      sqlServerId: "",
    };

    signUp(userData, {
      onSuccess: async (data) => {
        // Update the user data in Supabase with sqlServerId returned from SQL Server
        const { sqlServerId } = data;
        await supabase
          .from("user_data")
          .update({
            sql_server_id: sqlServerId,
          })
          .eq("email", email);

        router.push("/sign-in");
      },
    });
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <SVGLogo />
        </div>

        <h1 className="mt-10 text-2xl font-semibold tracking-tight text-center text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Get started with your new account
        </p>

        <div className="mt-10">
          {mode === "signup" && (
            <form onSubmit={handleSubmitSignUp} className="space-y-4">
              <input
                type="hidden"
                name="inviteId"
                value={searchParams.get("inviteId") || ""} // Get inviteId from URL if available
              />

              {/* Username */}
              <Input
                name="username"
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Date of Birth */}
              <Input
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* First Name */}
              <Input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Last Name */}
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Email */}
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Password */}
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Phone Number */}
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Address */}
              <Input
                name="address"
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Profile Picture URL */}
              <Input
                name="profilePictureUrl"
                type="url"
                placeholder="Profile Picture URL (optional)"
                value={profilePictureUrl}
                onChange={(e) => setProfilePictureUrl(e.target.value)}
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
              />

              {/* Role Selection */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "user" | "admin")} // Ensure correct type
                className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 w-full"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full h-12 font-medium text-white ${
                  isPending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          )}
          {/* Error Handling */}
          {isError && (
            <div className="mt-4 text-sm text-red-600">{error.message}</div>
          )}

          {/* Redirect Link */}
          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
