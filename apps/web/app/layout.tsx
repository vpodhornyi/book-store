import { syne, unicaOne } from '../fonts';
import "../globals.css";
import { ThemeProvider } from "../providers/theme-provider";

export interface RootLayoutProps{
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" suppressHydrationWarning className={`${syne.variable} ${unicaOne.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}