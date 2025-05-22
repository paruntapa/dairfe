import type { Metadata } from "next";
import "./globals.css";
import ParticleBackground from "./components/particle-background";

export const metadata: Metadata = {
  title: "Dair",
  description: "Decentralized Air Quality Indexer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ParticleBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
