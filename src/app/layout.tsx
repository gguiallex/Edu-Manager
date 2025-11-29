//import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "./globals.css";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edu Manager",
  description: "Projeto utilizando React com Next.js e TypeScript",
};*/

//className={`${geistSans.variable} ${geistMono.variable} antialiased`}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        <Header/>

        {children}

        <Footer/>
      </body>
    </html>
  );
}
