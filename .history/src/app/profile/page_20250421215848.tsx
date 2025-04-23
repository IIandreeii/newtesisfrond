import AnimatedBackground from "@/components/logind/animation";
import UserProfile from "@/components/profile/profile";
import { AuthProvider } from "@/context/AuthContext";

export default function ProfilePage() {
  return (
    <>
      <AuthProvider>
      <AnimatedBackground />
      <main className="min-h-screen relative pt-24 pb-16">
        <div className="container mx-auto max-w-6xl relative z-10 py-8">
          <UserProfile />
        </div>
      </main>
      </AuthProvider>
    </>
  )
}
