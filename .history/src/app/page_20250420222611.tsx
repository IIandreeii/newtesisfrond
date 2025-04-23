import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LandingPage from "@/components/landing-page"

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="min-h-screen relative pt-16 pb-16">
        <LandingPage />
      </main>
      <Footer />
    </>
  )
}
