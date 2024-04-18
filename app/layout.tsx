import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"

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
        <meta property="og:image" content="https://aialttag.vercel.app/files/homepage.png"/>
      </head>
      <body className={inter.className}>
        
        {children}
        <Analytics />
  
        <Footer/>
       
      </body>
     
     
    </html>
  );
}
