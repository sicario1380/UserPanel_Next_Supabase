"use client";

import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/globals.css";
import { NavbarProvider } from "@/contexts/NavbarContext";

const inter = Inter({ subsets: ["latin"] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={inter.className}>
      <Provider store={store}>
        <NavbarProvider>
          {children}
        </NavbarProvider>
      </Provider>
    </div>
  );
}

