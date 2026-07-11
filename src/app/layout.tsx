import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resume Roast 🔥 | Get Your Resume Brutally Roasted by AI",
  description: "Upload your resume and get emotionally damaged by our AI recruiter. Savage roasts, brutal honesty, and actually useful career advice. Warning: your ego may not survive.",
  keywords: ["resume roast", "resume review", "AI resume", "career advice", "resume feedback"],
  openGraph: {
    title: "Resume Roast 🔥 | Get Your Resume Brutally Roasted by AI",
    description: "Upload your resume. Get emotionally damaged. Our AI recruiter has zero empathy and unlimited sass.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
