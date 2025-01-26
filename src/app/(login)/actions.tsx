"use server";
import { z } from "zod";
import { validatedAction } from "@/lib/auth/middleware";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import config from "/home/erfan/React/Projects/user-panel/config";
//@config

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  role: z.enum(["user", "admin"]),
});

export const signIn = validatedAction(signInSchema, async (data) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid credentials. Please try again." };
  }
  const { error: userDataError } = await supabase
    .from("user_data")
    .select("*")
    .eq("user_id", signInData.user?.id)
    .single();

  if (userDataError && userDataError.code === "PGRST116") {
    // No user_data entry found, create one
    const { error: insertError } = await supabase
      .from("user_data")
      .insert({ user_id: signInData.user?.id });
    if (insertError) {
      console.error("Error creating user_data entry:", insertError);
      // Consider how you want to handle this error
    }
  }
  // If sign-in is successful, redirect to dashboard
  redirect("/app");
});

export const signUp = validatedAction(signUpSchema, async (data) => {
  const supabase = await createClient();
  const email = data.email as string;
  const password = data.password as string;
  const firstName = data.firstName as string;
  const lastName = data.lastName as string;
  const phoneNumber = data.phoneNumber as string;
  const address = data.address as string;
  const profilePictureUrl = data.profilePictureUrl as string;
  const role = data.role as string;

  // Create user in Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { error: signUpError.message }; // Return error message
  }

  if (!signUpData.user) {
    return { error: "User creation failed." }; // Handle null user case
  }

  // Insert additional user data into a separate table
  const { error: insertError } = await supabase.from("user_data").insert({
    user_id: signUpData.user.id,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    address: address,
    profile_picture_url: profilePictureUrl,
    role: role,
  });

  if (insertError && insertError.code === "PGRST116") {
    const { error: insertError } = await supabase
      .from("user_data")
      .insert({ user_id: signUpData.user?.id });
    if (insertError) {
      console.error("Error creating user_data entry:", insertError);
      // Consider how you want to handle this error
    }
  }

  redirect("/app");
});

export const signInWithMagicLink = validatedAction(
  z.object({
    email: z.string().email(),
    redirect: z.string().optional(),
  }),
  async (data) => {
    const supabase = await createClient();
    const { email } = data;
    const redirectTo = `${config.domainName}/api/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${redirectTo}?redirect=${encodeURIComponent("/app")}`,
      },
    });
    if (error) {
      console.error("Error sending magic link:", error);
      return { error: error.message };
    }

    return { success: "Magic link sent to your email." };
  }
);
export const signInWithGoogle = async (
  event: React.FormEvent<HTMLFormElement> | null = null
) => {
  if (event) event.preventDefault(); // Prevent default if event is present
  try {
    const supabase = await createClient();

    const redirectTo = `${config.domainName}/api/auth/callback`;
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectTo}?redirect=/app`,
      },
    });
    if (signInError) {
      return { error: "Failed to sign in with Google. Please try again." };
    }
  } catch (error) {
    return { error: "Failed to sign in with Google. Please try again." };
  }
};

export const signInWithGithub = async (
  event: React.FormEvent<HTMLFormElement> | null = null
) => {
  if (event) event.preventDefault(); // Prevent default if event is present
  try {
    const supabase = await createClient();

    const redirectTo = `${config.domainName}/api/auth/callback`;
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${redirectTo}?redirect=/app`,
      },
    });
    if (signInError) {
      return { error: "Failed to sign in with GITHUB. Please try again." };
    }
  } catch (error) {
    return { error: "Failed to sign in with GITHUB. Please try again." };
  }
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
};
