"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Heart, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLogout } from "./logout"
import Cookies from 'js-cookie';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [animateHeart, setAnimateHeart] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { postLogout, loader } = useLogout();

  // Función para verificar la autenticación
  const checkAuth = useCallback(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Función mejorada de logout
  const handleLogout = useCallback(async () => {
    await postLogout();
    checkAuth(); // Verificar autenticación inmediatamente después del logout
  }, [postLogout, checkAuth]);

  // Verificar estado de autenticación y configurar un listener para cambios en cookies
  useEffect(() => {
    // Verificar inicialmente
    checkAuth();

    // Configurar un intervalo para verificar cambios en cookies
    const interval = setInterval(checkAuth, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [checkAuth]);

  // Efecto para controlar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Efecto para animar el corazón periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateHeart(true)
      setTimeout(() => setAnimateHeart(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Heart
                className={`h-8 w-8 text-sky-400 fill-sky-400 transition-all duration-500 group-hover:scale-110 ${animateHeart ? "scale-125" : ""
                  }`}
              />
              <Heart
                className={`h-5 w-5 text-pink-300 fill-pink-300 absolute -top-2 -right-2 transition-all duration-500 group-hover:rotate-12 ${animateHeart ? "scale-150 rotate-12" : ""
                  }`}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">DonaVida</h1>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                Plataforma de Donaciones
              </Badge>
            </div>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" isActive>
              Inicio
            </NavLink>
            <NavDropdown
              title="Proyectos"
              items={[
                { label: "Educación", href: "/proyectos/educacion" },
                { label: "Salud", href: "/proyectos/salud" },
                { label: "Medio Ambiente", href: "/proyectos/ambiente" },
                { label: "Comunidades", href: "/proyectos/comunidades" },
              ]}
            />
            <NavLink href="/donaciones">Donaciones</NavLink>
            <NavLink href="/sobre-nosotros">Sobre Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                <Link href="/profile">
                  Perfil
                </Link>
              </Button>

            ) : (
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                <Link href="/logind">
                  Iniciar Sesión
                </Link>
              </Button>
            )}

            {isAuthenticated ? (
              <Button
                className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={handleLogout}
                disabled={loader.loading && loader.action === "logout"}
              >
                {loader.loading && loader.action === "logout" ? 'Cerrando...' : 'Cerrar Sesión'}
              </Button>

            ) : (
              <Button className="bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 hover:scale-105 active:scale-95">
                <Link href="/register">Registrarse</Link>
              </Button>
            )}

          </div>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden text-slate-700 hover:text-slate-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-3 px-4">
              <MobileNavLink href="/" isActive>
                Inicio
              </MobileNavLink>
              <MobileNavLink href="/proyectos">Proyectos</MobileNavLink>
              <MobileNavLink href="/donaciones">Donaciones</MobileNavLink>
              <MobileNavLink href="/sobre-nosotros">Sobre Nosotros</MobileNavLink>
              <MobileNavLink href="/contacto">Contacto</MobileNavLink>
              <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2">
                {isAuthenticated ? (
                  <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                    <Link href="/profile">
                      Perfil
                    </Link>
                  </Button>
                ) : (
                  <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                    <Link href="/logind">
                      Iniciar Sesión
                    </Link>
                  </Button>
                )}
                {isAuthenticated ? (
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={handleLogout}
                    disabled={loader.loading && loader.action === "logout"}
                  >
                    {loader.loading && loader.action === "logout" ? 'Cerrando...' : 'Cerrar Sesión'}
                  </Button>

                ) : (
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 hover:scale-105 active:scale-95">
                    <Link href="/register">Registrarse</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Resto del código sin cambios...

// Componentes auxiliares
function ProfileNavButton({
  icon,
  title,
  description,
  bgColor,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
        <CardContent className="p-6 flex items-center gap-4">
          <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </CardContent>
      </Card>
    </Link>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  )
}







