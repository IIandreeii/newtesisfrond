import AnimatedBackground from "@/components/logind/animation";
import LoginForm from "@/components/logind/logind";

export default function Logind() {
  return (
    <main className="min-h-screen relative overflow-hidden">

      <div className="container mx-auto max-w-6xl relative z-10 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
