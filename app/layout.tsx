import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Alt text generator ",
  description: "Upload any image and AI will describe it in seconds!",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="files/homepage.png"/>
        <meta property="twitter:image" content="files/homepage.png" />

      </head>
      <body className={inter.className}>
        
        {children}
        <div className="z-100">
        <Footer/>
        </div>
      </body>
     
     
    </html>
  );
}
