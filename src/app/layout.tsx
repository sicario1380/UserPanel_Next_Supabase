"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { store } from "@/store";
import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { NavbarProvider } from "../contexts/NavbarContext";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import Div from "@/components/Div";
import localFont from "next/font/local";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className={inter.className}>
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <NavbarProvider>
            <Navbar />
            <Container className={`content bg-background`}>
              <Div id="dashboard" className="dashboard">
                <QueryClientProvider client={queryClient}>
                  {children}
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>{" "}
              </Div>
            </Container>
          </NavbarProvider>
        </Provider>
      </body>
    </html>
  );
}
