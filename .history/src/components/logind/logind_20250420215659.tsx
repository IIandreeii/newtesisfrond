"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, Loader2, Users, Gift, Star, Coffee, CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/context/ToastContext"
import { useLogin } from "@/service/login.service"
import { get } from "http"


interface LogindFormInput{
  email: string
  password: string
}

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [animateHeart, setAnimateHeart] = useState(false)
  const [isLoadingView, setIsLoginView] = useState(false)
  const toast = useToast()
  const [showToast, setShowToast] = useState(false);
   const { postLogin, getResponse, loader } = useLogin()
   

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateHeart(true)
      setTimeout(() => setAnimateHeart(false), 1000)
    }, 3000)
    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    if (getResponse && getResponse.statusCode ) {
      toast.showSuccess("¡Bienvenido de nuevo!")
    }
  }, [showToast, toast])

  const validateForm = () => {
    const newErrors = { email: "", password: "" }
    let isValid = true

    if (!email) {
      newErrors.email = "El correo electrónico es requerido"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Correo electrónico inválido"
      isValid = false
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  

  const handleSubmit = async (data: LogindFormInput) => {
    
    setShowToast(false)
    setIsLoginView(true)

    if (!validateForm()) return

    setIsLoading(true)

    // Simulación de login
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      await postLogin(data)
      setShowToast(true)
    } catch (error) {
      setErrors({ email: "", password: "Credenciales incorrectas" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Columna izquierda - Información */}
        <div className="w-full lg:w-1/2 space-y-8 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart
                  className={`h-10 w-10 text-sky-400 fill-sky-400 transition-all duration-500 ${
                    animateHeart ? "scale-125" : ""
                  }`}
                />
                <Heart
                  className={`h-6 w-6 text-pink-300 fill-pink-300 absolute -top-2 -right-2 transition-all duration-500 ${
                    animateHeart ? "scale-150 rotate-12" : ""
                  }`}
                />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 animate-in slide-in-from-left duration-700">DonaVida</h1>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-600 border-green-200 animate-in fade-in duration-1000"
              >
                Plataforma de Donaciones
              </Badge>
            </div>
            <h2 className="text-4xl font-bold text-slate-800 leading-tight animate-in slide-in-from-bottom duration-700">
              Haz la diferencia <span className="text-sky-500">hoy</span>
            </h2>
            <p className="text-slate-600 text-lg animate-in fade-in duration-1000 delay-300">
              Únete a nuestra comunidad de donantes y ayuda a transformar vidas con cada contribución.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 hover:-translate-y-1">
              <Users className="h-6 w-6 text-sky-500 mt-1" />
              <div>
                <h3 className="font-medium text-slate-700">+10,000</h3>
                <p className="text-sm text-slate-500">Donantes activos</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <Gift className="h-6 w-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-medium text-slate-700">$2.5M</h3>
                <p className="text-sm text-slate-500">Donaciones totales</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
              <Star className="h-6 w-6 text-pink-400 mt-1" />
              <div>
                <h3 className="font-medium text-slate-700">+50</h3>
                <p className="text-sm text-slate-500">Proyectos activos</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 hover:-translate-y-1">
              <Coffee className="h-6 w-6 text-sky-500 mt-1" />
              <div>
                <h3 className="font-medium text-slate-700">100%</h3>
                <p className="text-sm text-slate-500">Transparencia</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-700">¿Por qué unirte?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
                <CheckCircle2 className="h-5 w-5 text-sky-500" />
                <p className="text-slate-600">Impacto directo en comunidades necesitadas</p>
              </div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="text-slate-600">Seguimiento transparente de tus donaciones</p>
              </div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
                <CheckCircle2 className="h-5 w-5 text-pink-400" />
                <p className="text-slate-600">Comunidad de donantes comprometidos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="w-full lg:w-1/2 p-4">
          <Card className="border-slate-100 shadow-lg transition-all duration-500 hover:shadow-xl bg-white/90 backdrop-blur-sm relative overflow-hidden animate-in fade-in-50 duration-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50 animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-32 h-32 bg-green-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <CardHeader className="space-y-1 relative z-10">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-slate-700">Bienvenido</CardTitle>
                <Lock className="h-5 w-5 text-sky-500 animate-pulse" />
              </div>
              <CardDescription className="text-slate-500">Inicia sesión para continuar con tu donación</CardDescription>
            </CardHeader>

            <CardContent className="relative z-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit({ email, password });
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-600">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border-slate-200 focus:border-sky-400 focus:ring-sky-200 transition-all duration-300 ${
                      errors.email ? "border-red-300 animate-shake" : ""
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 animate-in fade-in-50">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-600">
                      Contraseña
                    </Label>
                    <a href="#" className="text-xs text-sky-500 hover:text-sky-600 transition-colors hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`border-slate-200 focus:border-sky-400 focus:ring-sky-200 transition-all duration-300 ${
                      errors.password ? "border-red-300 animate-shake" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1 animate-in fade-in-50">{errors.password}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-500">
                    Recordarme
                  </Label>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 relative z-10">
              <Button
                onClick={() => handleSubmit({ email, password })}
                disabled={isLoading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">O continúa con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-slate-500">
              ¿No tienes una cuenta?{" "}
              <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors hover:underline">
                Regístrate ahora
              </a>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors hover:underline">
              Términos y condiciones
            </a>
            <span className="text-slate-300">•</span>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors hover:underline">
              Política de privacidad
            </a>
            <span className="text-slate-300">•</span>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors hover:underline">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


