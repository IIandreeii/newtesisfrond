"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  BarChart3,
  Zap,
  Globe,
  ChevronRight,
} from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    stats: false,
    features: false,
    howItWorks: false,
    testimonials: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const stats = document.getElementById("stats")
      const features = document.getElementById("features")
      const howItWorks = document.getElementById("how-it-works")
      const testimonials = document.getElementById("testimonials")

      if (stats) {
        setIsVisible((prev) => ({
          ...prev,
          stats: window.scrollY > stats.offsetTop - window.innerHeight * 0.8,
        }))
      }

      if (features) {
        setIsVisible((prev) => ({
          ...prev,
          features: window.scrollY > features.offsetTop - window.innerHeight * 0.8,
        }))
      }

      if (howItWorks) {
        setIsVisible((prev) => ({
          ...prev,
          howItWorks: window.scrollY > howItWorks.offsetTop - window.innerHeight * 0.8,
        }))
      }

      if (testimonials) {
        setIsVisible((prev) => ({
          ...prev,
          testimonials: window.scrollY > testimonials.offsetTop - window.innerHeight * 0.8,
        }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 px-3 py-1 text-sm">
                Plataforma de Donaciones Transparente
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Conectamos <span className="text-sky-500">donantes</span> con{" "}
                <span className="text-green-500">organizaciones</span> que cambian vidas
              </h1>
              <p className="text-lg text-slate-600">
                DonaVida es la plataforma que garantiza transparencia total en donaciones, conectando organizaciones
                benéficas verificadas con donantes comprometidos a través de herramientas innovadoras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
                  Comenzar ahora
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50 text-slate-700 text-lg px-8 py-6 rounded-xl"
                >
                  Conocer más <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">+10,000</span> usuarios ya confían en nosotros
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-50 rounded-full blur-3xl opacity-70"></div>
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <Image
                  src="/L?height=500&width=600&text=Plataforma+DonaVida"
                  alt="Plataforma DonaVida"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-full shadow-md">
                        <Heart className="h-6 w-6 text-pink-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Donación recibida</p>
                        <p className="text-xs text-slate-500">Hace 2 minutos</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">$250 USD</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section id="stats" className="py-16 bg-slate-50/50 backdrop-blur-sm relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 bg-white/80 ${
              isVisible.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <StatCard
              icon={<Users className="h-8 w-8 text-sky-500" />}
              value="+500"
              label="Organizaciones verificadas"
              color="bg-sky-50"
            />
            <StatCard
              icon={<Heart className="h-8 w-8 text-pink-500" />}
              value="$2.5M"
              label="Donaciones procesadas"
              color="bg-pink-50"
            />
            <StatCard
              icon={<Calendar className="h-8 w-8 text-green-500"  />}
              value="+1,200"
              label="Eventos publicados"
              color="bg-green-50"
            />
            <StatCard
              icon={<MessageCircle className="h-8 w-8 text-purple-500" />}
              value="+50K"
              label="Mensajes intercambiados"
              color="bg-purple-50"
            />
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="features" className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 text-sm mb-4">
              Características principales
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Todo lo que necesitas en una sola plataforma
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              DonaVida ofrece herramientas completas tanto para organizaciones benéficas como para donantes,
              garantizando transparencia y facilitando la colaboración.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 bg-white/80 ${
              isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 "
            }`}
          >
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-sky-500" />}
              title="Auditorías transparentes"
              description="Verificamos y auditamos todas las organizaciones para garantizar que tus donaciones lleguen a quienes más lo necesitan."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-green-500" />}
              title="Publicación de eventos"
              description="Crea y difunde eventos para recaudar fondos, conseguir voluntarios o dar visibilidad a tus causas."
            />
            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-pink-500" />}
              title="Chat integrado"
              description="Comunícate directamente entre organizaciones y donantes para resolver dudas o coordinar acciones."
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10 text-purple-500" />}
              title="Donaciones con Mercado Pago"
              description="Procesa donaciones de forma segura y sencilla a través de la plataforma de pagos más utilizada en Latinoamérica."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-amber-500" />}
              title="Informes detallados"
              description="Accede a estadísticas e informes sobre el impacto de tus donaciones o el rendimiento de tus campañas."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-blue-500" />}
              title="Seguimiento de impacto"
              description="Visualiza cómo tus donaciones están generando cambios positivos con métricas de impacto real."
            />
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="how-it-works" className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <Badge className="bg-sky-100 text-sky-700 border-sky-200 px-3 py-1 text-sm mb-4">Proceso simple</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Cómo funciona DonaVida?</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nuestra plataforma está diseñada para ser intuitiva y eficiente, tanto para organizaciones como para
              donantes.
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="organizations" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-slate-100/70 p-1">
                  <TabsTrigger value="organizations" className="px-6 py-2 text-base">
                    Para organizaciones
                  </TabsTrigger>
                  <TabsTrigger value="donors" className="px-6 py-2 text-base">
                    Para donantes
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="organizations"
                className={`transition-all duration-1000 bg-white/80 ${
                  isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StepCard
                    number="01"
                    title="Regístrate y verifica tu organización"
                    description="Crea una cuenta y proporciona la documentación necesaria para verificar la legitimidad de tu organización."
                    icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
                  />
                  <StepCard
                    number="02"
                    title="Crea tu perfil y campañas"
                    description="Personaliza tu perfil, añade información sobre tu causa y crea campañas para recaudar fondos."
                    icon={<Zap className="h-6 w-6 text-amber-500" />}
                  />
                  <StepCard
                    number="03"
                    title="Recibe donaciones y genera informes"
                    description="Recibe fondos a través de Mercado Pago y genera informes transparentes sobre su uso e impacto."
                    icon={<BarChart3 className="h-6 w-6 text-sky-500" />}
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="donors"
                className={`transition-all duration-1000 bg-white/80 ${
                  isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StepCard
                    number="01"
                    title="Explora organizaciones verificadas"
                    description="Navega por nuestra plataforma y descubre organizaciones verificadas que trabajan en causas que te importan."
                    icon={<Globe className="h-6 w-6 text-blue-500" />}
                  />
                  <StepCard
                    number="02"
                    title="Elige tu causa y dona"
                    description="Selecciona la organización o campaña que deseas apoyar y realiza tu donación de forma segura con Mercado Pago."
                    icon={<Heart className="h-6 w-6 text-pink-500" />}
                  />
                  <StepCard
                    number="03"
                    title="Sigue el impacto de tu donación"
                    description="Recibe actualizaciones y visualiza el impacto real que tu donación está generando en la comunidad."
                    icon={<TrendingUp className="h-6 w-6 text-green-500" />}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-3 py-1 text-sm mb-4">Testimonios</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Descubre cómo DonaVida está transformando la forma en que organizaciones y donantes colaboran para generar
              un impacto positivo.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 bg-white/80 ${
              isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <TestimonialCard
              quote="DonaVida ha transformado nuestra forma de conectar con donantes. La transparencia que ofrece la plataforma ha aumentado la confianza en nuestra organización."
              name="María González"
              role="Directora de Fundación Esperanza"
              image="/placeholder.svg?height=60&width=60&text=MG"
            />
            <TestimonialCard
              quote="Como donante, valoro enormemente poder ver exactamente cómo se utilizan mis donaciones y el impacto que generan. DonaVida hace que todo sea transparente y sencillo."
              name="Carlos Rodríguez"
              role="Donante recurrente"
              image="/placeholder.svg?height=60&width=60&text=CR"
            />
            <TestimonialCard
              quote="La función de chat nos ha permitido establecer relaciones más cercanas con nuestros donantes, respondiendo sus dudas y mostrándoles el impacto de su apoyo."
              name="Laura Martínez"
              role="Coordinadora de Manos Unidas"
              image="/placeholder.svg?height=60&width=60&text=LM"
            />
          </div>
        </div>
      </section>



      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="px-8 py-16 md:p-16 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Únete a DonaVida y comienza a generar impacto hoy mismo
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Ya sea que representes a una organización benéfica o quieras donar a causas importantes, DonaVida te
                  ofrece las herramientas para hacerlo de forma transparente y efectiva.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-sky-600 hover:bg-sky-50 text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
                    Registrar organización
                  </Button>
                  <Button className="bg-sky-700 text-white hover:bg-sky-800 text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
                    Comenzar a donar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <Badge className="bg-slate-200 text-slate-700 border-slate-300 px-3 py-1 text-sm mb-4">
              Preguntas frecuentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Resolvemos tus dudas</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre DonaVida y cómo funciona nuestra plataforma.
            </p>
          </div>

          <div className="space-y-6">
            <FaqItem
              question="¿Cómo se verifica la legitimidad de las organizaciones?"
              answer="Realizamos un proceso riguroso de verificación que incluye revisión de documentación legal, historial de actividades, referencias y auditorías periódicas para garantizar la transparencia y legitimidad de todas las organizaciones en nuestra plataforma."
            />
            <FaqItem
              question="¿Qué comisión cobra DonaVida por las donaciones?"
              answer="DonaVida cobra una comisión mínima del 2.5% para mantener la plataforma y sus servicios. Esta comisión es transparente y se muestra claramente antes de realizar cualquier donación. El 97.5% restante va directamente a la organización seleccionada."
            />
            <FaqItem
              question="¿Cómo puedo saber en qué se utilizó mi donación?"
              answer="Todas las organizaciones en DonaVida están obligadas a proporcionar informes periódicos sobre el uso de los fondos recibidos. Como donante, recibirás actualizaciones y podrás acceder a informes detallados que muestran cómo tu donación está generando impacto."
            />
            <FaqItem
              question="¿Es seguro realizar donaciones a través de Mercado Pago?"
              answer="Sí, Mercado Pago es una plataforma de pagos segura y confiable que cumple con los más altos estándares de seguridad en la industria. Tus datos financieros están protegidos y las transacciones se realizan de forma encriptada."
            />
            <FaqItem
              question="¿Puedo donar de forma recurrente?"
              answer="Sí, DonaVida ofrece la opción de configurar donaciones recurrentes (mensuales, trimestrales o anuales) para apoyar de forma continua a las organizaciones que te importan. Puedes modificar o cancelar tu donación recurrente en cualquier momento."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

// Componentes auxiliares

function StatCard({
  icon,
  value,
  label,
  color,
}: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-600">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 space-y-4">
        <div className="bg-slate-50 p-3 rounded-xl w-fit">{icon}</div>
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <p className="text-slate-600">{description}</p>
        <Link href="#" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium text-sm group">
          Saber más <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-4xl font-bold dark:text-slate-200 ">{number}</span>
          <div className="bg-slate-50 p-2 rounded-full">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({
  quote,
  name,
  role,
  image,
}: {
  quote: string
  name: string
  role: string
  image: string
}) {
  return (
    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-start">
          <svg className="h-8 w-8 black:text-slate-300" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>

        <p className="text-slate-600 italic">{quote}</p>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} width={48} height={48} />
          </div>
          <div>
            <h4 className="font-medium text-slate-800">{name}</h4>
            <p className="text-sm text-slate-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-slate-800">{question}</h3>
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </div>
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <p className="text-slate-600">{answer}</p>
        </div>
      )}
    </div>
  )
}
