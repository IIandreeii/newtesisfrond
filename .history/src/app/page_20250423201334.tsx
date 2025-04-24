import LandingPage from "@/components/Landing/landing";
import AnimatedBackground from "@/components/logind/animation";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/footer/footer";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <>
    <main className="min-h-screen relative pt-16 pb-16">
    <AuthProvider>
            <ToastProvider >
    <Navbar />
      <AnimatedBackground />
      
        <LandingPage />
      </main>
      <Footer />
      </ToastProvider>
      </AuthProvider>
      </main>
    </>

  )
}
