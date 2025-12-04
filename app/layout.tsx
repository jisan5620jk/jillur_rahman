import type { Metadata } from "next";
import { Poppins, Inter, Fira_Code } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const firacode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-firacode",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jillur Rahman — Web Developer Portfolio",
  description:
    "Personal portfolio of Jillur Rahman — showcasing clean, scalable, and user‑friendly web development projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${firacode.variable}`}
    >
      <Head>
        <meta
          name="google-site-verification"
          content="KBTjuj_LfHQjOibxyPcm_ZJbKH0NHGDEdUL3fRW4-0o"
        />
      </Head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
