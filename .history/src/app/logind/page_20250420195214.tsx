
export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto max-w-6xl relative z-10 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
