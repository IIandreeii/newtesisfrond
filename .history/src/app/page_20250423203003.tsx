import LandingPage from "@/components/Landing/landing";
import AnimatedBackground from "@/components/logind/animation";
import Navbar from "@/components/nav/navbar";
export default function Home() {
  return (
    <>
            <Navbar />
      <AnimatedBackground />
      <main className="min-h-screen relative pt-16 pb-16">
        <LandingPage />
      </main>
    </>
  )
}
