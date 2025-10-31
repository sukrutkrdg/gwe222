// app/layout.tsx (DÜZELTİLMİŞ - Geist fontları kaldırıldı)

import type { Metadata } from "next";
// Geist import'larını sildik
import "./globals.css"; // globals.css dosyasını hala kullanıyoruz

export const metadata: Metadata = {
  title: "/onchain-lab Gas Tracker",
  description: "Farcaster Frame for tracking gas prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Geist fontuyla ilgili 'className'leri sildik
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}