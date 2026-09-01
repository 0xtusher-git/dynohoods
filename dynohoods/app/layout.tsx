import type { Metadata } from "next";
import {
  Anton,
  Inter,
  JetBrains_Mono,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";
import { SITE_METADATA } from "@/lib/theme";
import ButtonClickSound from "@/components/ButtonClickSound";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arcade = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = SITE_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${arcade.variable} ${anton.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ButtonClickSound />
        {children}
      </body>
    </html>
  );
}
