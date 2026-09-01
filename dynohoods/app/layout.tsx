import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Playfair_Display,
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

const playfair = Playfair_Display({
  weight: ["600", "700", "800"],
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
        className={`${inter.variable} ${arcade.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ButtonClickSound />
        {children}
      </body>
    </html>
  );
}
