import AnimatedBackground from "@/components/logind/animation";
import LoginForm from "@/components/logind/logind";
import Navbar from "@/components/nav/navbar";
export default function Logind() {
    return (
        <>
        <Navbar />
            <AnimatedBackground />
            <main className="min-h-screen relative pt-24 pb-16">
                <div className="container mx-auto max-w-6xl relative z-10 py-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <LoginForm />
                    </div>
                </div>
            </main>
            
        </>
    )
}
