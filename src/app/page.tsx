"use client";

import React, { useEffect, useState } from "react";
import Div from "@/components/Div";
import Container from "@/components/Container";
import MemoDashboard from "@/components/dashboard/MemoDashboard";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        if (!session) {
          // If there is no session, redirect to sign-in page
          router.push("/sign-in");
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError("An error occurred while checking the session.");
        setLoading(false);
      }
    };

    checkUserSession();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className={`content bg-background`}>
      <Div id="dashboard" className="dashboard">
        <Div id="items" className="items">
          <MemoDashboard />
        </Div>
      </Div>
    </Container>
  );
}
