import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

export interface RootLayoutProps{
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        {/* Атрибут "class" відповідає селектору .dark у CSS */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}