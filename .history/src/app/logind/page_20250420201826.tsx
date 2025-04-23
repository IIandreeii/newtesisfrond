import AnimatedBackground from "@/components/logind/animation";
import LoginForm from "@/components/logind/logind";

export default function Logind() {
    return (
        <main className="min-h-screen relative pt-24 pb-16">      <AnimatedBackground />
            <div className="container mx-auto max-w-6xl relative z-10 py-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}



import LoginForm from "@/components/login-form"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <main className="min-h-screen relative pt-24 pb-16">
                <div className="container mx-auto max-w-6xl relative z-10 py-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <LoginForm />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
