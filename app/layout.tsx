import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Opopsis — Software & Product Engineering",
  description: "We design and build digital products, software systems, and intelligent experiences for ambitious businesses.",
  metadataBase: new URL("https://opopsis.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
