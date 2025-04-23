import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import UserProfile from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="min-h-screen relative pt-24 pb-16">
        <div className="container mx-auto max-w-6xl relative z-10 py-8">
          <UserProfile />
        </div>
      </main>
      <Footer />
    </>
  )
}
