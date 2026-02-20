import React from "react";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 md:pr-17.5 md:pl-17.5 pr-3.75 pl-3.75 ">{children}</main>

      <Footer />
    </div>
  );
}
