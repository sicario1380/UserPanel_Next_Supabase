import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/supabase/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        return res.status(400).json({ message: signInError.message });
      }

      if (!signInData.user) {
        return res.status(400).json({ message: "Authentication failed." });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        return res
          .status(400)
          .json({ message: "Failed to fetch user data from SQL Server." });
      }

      const userData = await response.json();

      // Return combined user data
      return res.status(200).json({
        ...signInData,
        ...userData,
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
