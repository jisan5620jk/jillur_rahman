import type { Metadata } from "next";
import { Poppins, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

// Google Fonts
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

// ✅ Metadata config (SEO + Verification + Social)
export const metadata: Metadata = {
  title: {
    default: "Jillur Rahman — Web Developer Portfolio",
    template: "%s | Jillur Rahman",
  },
  description:
    "Portfolio of Jillur Rahman — showcasing clean, scalable, and user‑friendly web development projects with Next.js, Shopify themes, GSAP, and SCSS.",
  keywords: [
    "Jillur Rahman",
    "Frontend Developer",
    "Shopify themes",
    "GSAP",
    "SCSS",
    "Next.js",
    "Portfolio",
    "Web Developer Bangladesh",
  ],
  authors: [{ name: "Jillur Rahman", url: "https://jillur.vercel.app" }],
  creator: "Jillur Rahman",
  publisher: "Jillur Rahman",
  metadataBase: new URL("https://jillur.vercel.app"),
  alternates: {
    canonical: "https://jillur.vercel.app",
  },
  openGraph: {
    title: "Jillur Rahman — Web Developer Portfolio",
    description:
      "Frontend Developer specializing in Shopify themes, GSAP animations, SCSS architecture, and Next.js performance optimization.",
    url: "https://jillur.vercel.app",
    siteName: "Jillur Rahman Portfolio",
    images: [
      {
        url: "https://jillur.vercel.app/og-image.png", // 👉 /public/og-image.png বানাও
        width: 1200,
        height: 630,
        alt: "Jillur Rahman Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jillur Rahman — Web Developer Portfolio",
    description:
      "Clean, scalable web development projects by Jillur Rahman — Shopify, GSAP, SCSS, Next.js.",
    images: ["https://jillur.vercel.app/og-image.png"],
    creator: "@your_twitter_handle", // 👉 নিজের Twitter handle দাও
  },
  verification: {
    google: "KBTjuj_LfHQjOibxyPcm_ZJbKH0NHGDEdUL3fRW4-0o", // 👉 তোমার Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${firacode.variable}`}
    >
      <body className="antialiased">
        {children}

        {/* ✅ Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://jillur.vercel.app",
            name: "Jillur Rahman Portfolio",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://jillur.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jillur Rahman",
            url: "https://jillur.vercel.app",
            jobTitle: "Frontend Developer",
            knowsAbout: ["Shopify themes", "GSAP", "SCSS", "Next.js"],
            sameAs: [
              "https://github.com/jisan5620jk",
              "https://linkedin.com/in/তোমার-প্রোফাইল",
            ],
          })}
        </script>
      </body>
    </html>
  );
}
