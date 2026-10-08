import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "OrbitDev | Telegram Automation",
  description: "Автоматизация платных подписок в Telegram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased bg-white text-zinc-900 selection:bg-blue-100`}>
        {children}
      </body>
    </html>
  );
}
