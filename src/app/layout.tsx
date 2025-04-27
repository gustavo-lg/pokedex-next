import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Pokédex NextJS | Descubra e explore Pokémon',
  description: 'Uma Pokédex moderna feita com Next.js, onde você pode buscar, visualizar e aprender mais sobre todos os Pokémon!',
  keywords: ['Pokédex', 'Next.js', 'Pokémon', 'API Pokémon', 'React', 'Typescript'],
  authors: [{ name: 'Seu Nome', url: 'https://github.com/seuusuario' }],
  openGraph: {
    title: 'Pokédex NextJS',
    description: 'Explore todos os Pokémon em uma Pokédex feita com Next.js!',
    siteName: 'Pokédex NextJS',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
