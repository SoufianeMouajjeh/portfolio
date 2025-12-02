import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
// We import Doto via CSS below if next/font/google fails, 
// but try standard import first if available in your version.
import "./globals.css";

const figtree = Figtree({ 
  subsets: ["latin"], 
  variable: "--font-figtree",
  display: "swap",
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap",
});

// If Doto is not found in next/font/google yet, add this to globals.css:
// @import url('[https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap](https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap)');
// And remove the import here. 

export const metadata: Metadata = {
  title: "Soufiane El Mouajjeh - Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // We apply the variables here. 
        // Note: If using CSS import for Doto, use 'font-[family-name:Doto]' in Tailwind
        className={`${figtree.variable} ${mono.variable} antialiased bg-[#C5CBD7] text-black font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
