// src/pages/api/updateProfile.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/supabase/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        user_id,
        firstName,
        lastName,
        phoneNumber,
        address,
        profilePictureUrl,
      } = req.body;

      // Update user data in Supabase
      const { error: supabaseError } = await supabase
        .from("user_data")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          address,
          profile_picture_url: profilePictureUrl,
        })
        .eq("user_id", user_id);

      if (supabaseError) {
        return res.status(400).json({ message: supabaseError.message });
      }

      // Sync with SQL Server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/identity/updateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!response.ok) {
        return res
          .status(400)
          .json({ message: "Failed to update user in SQL Server." });
      }

      return res
        .status(200)
        .json({ message: "User profile updated successfully." });
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
