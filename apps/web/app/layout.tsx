
import "./globals.css";

export const metadata = {
  title: "BookStore",
  description: "An online bookstore where you can discover and buy books for every taste",
};


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
