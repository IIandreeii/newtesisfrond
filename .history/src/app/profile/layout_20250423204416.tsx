import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { NavbarProfile } from "@/components/profile/nav/navbarprofile";
import "../globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perfil de Usuario - DonaVida",
  description: "Administra tu perfil y preferencias en la plataforma de donaciones DonaVida",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Navbarprofile/>
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {children}
    </div>
  );
}