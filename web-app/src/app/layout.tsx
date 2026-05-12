import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GemmPen - AI-Powered Exam Feedback",
  description:
    "Fine-tuned Gemma 4 for personalized, explainable exam feedback. Any rubric, any language, any subject.",
  openGraph: {
    title: "GemmPen - AI-Powered Exam Feedback",
    description:
      "Fine-tuned Gemma 4 for personalized, explainable exam feedback. Built by a teacher, for teachers.",
    url: "https://gemmpen.vercel.app",
    siteName: "GemmPen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "GemmPen - AI-Powered Exam Feedback",
    description:
      "Fine-tuned Gemma 4 for personalized, explainable exam feedback. Built by a teacher, for teachers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
