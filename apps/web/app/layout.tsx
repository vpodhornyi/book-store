import React from "react";

import { syne, unicaOne } from '@/fonts';
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";

interface RootLayoutProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
}

export default function RootLayout({ children, overlay }: RootLayoutProps ) {
  return (
    <html lang="uk" suppressHydrationWarning className={`${syne.variable} ${unicaOne.variable}`}>
    <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
        {overlay}
      </AuthProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}