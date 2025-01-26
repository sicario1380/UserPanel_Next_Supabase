// src/pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/supabase/client";
import { SignUpUserData, SignUpResponse, SignUpError } from "@/hooks/useSignUp";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse | SignUpError>
) => {
  if (req.method === "POST") {
    try {
      const userData: SignUpUserData = req.body;

      const {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        username,
        profilePictureUrl,
        address,
        role,
      } = userData;

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        return res.status(400).json({ message: signUpError.message });
      }

      if (!signUpData.user) {
        return res.status(400).json({ message: "User creation failed." });
      }

      const { error: insertError } = await supabase.from("user_data").insert({
        user_id: signUpData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
        username,
        address,
        profile_picture_url: profilePictureUrl,
        role,
      });

      if (insertError) {
        return res.status(400).json({ message: insertError.message });
      }

      // Insert user data into SQL Server Identity
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        return res
          .status(400)
          .json({ message: "Failed to create user in SQL Server Identity." });
      }

      const responseData = await response.json();

      // Update user data in Supabase with additional SQL Server data if needed
      const { error: supabaseUpdateError } = await supabase
        .from("user_data")
        .update({
          sql_server_id: responseData.id, // Assuming SQL Server returns an 'id'
          // Update other fields from SQL Server if needed
        })
        .eq("user_id", signUpData.user.id);

      if (supabaseUpdateError) {
        return res.status(400).json({ message: supabaseUpdateError.message });
      }

      return res.status(200).json({
        id: signUpData.user.id,
        email,
        firstName,
        lastName,
        dateOfBirth,
        username,
        sqlServerId: responseData.id, // Assuming SQL Server returns an 'id'
        // Add other properties from SQL Server if needed
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      return res.status(500).json({ message: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
