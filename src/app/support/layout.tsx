"use client";

import { Inter } from "next/font/google";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/globals.css";
import React, { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface SupportLayoutProps {
  children: ReactNode;
}

export default function SupportLayout({ children }: SupportLayoutProps) {
  return (
    <div className={inter.className}>
      <Provider store={store}>
        <NavbarProvider>
          <React.Fragment>{children}</React.Fragment>
        </NavbarProvider>
      </Provider>
    </div>
  );
}
