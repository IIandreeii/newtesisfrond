"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useLogout } from "./logout"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [animateHeart, setAnimateHeart] = useState(false)
  const { authToken } = useAuth();
  const { postLogout, loader } = useLogout();


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
            {authToken ? (
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

            {authToken ? (
          <Button 
          className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={postLogout}
          disabled={loader.loading && loader.action === "logout"}
        >
          {loader.loading && loader.action === "logout" ? 'Cerrando...' : 'Cerrar Sesión'}
        </Button>

            ) : (
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                <Link href="/logind">
                  Iniciar Sesión
                </Link>
              </Button>
            )}
            <Button className="bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 hover:scale-105 active:scale-95">
              Registrarse
            </Button>
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
                {authToken ? (
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
                <Button className="justify-center bg-sky-500 hover:bg-sky-600 text-white">Registrarse</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Componente para enlaces de navegación
function NavLink({
  href,
  children,
  isActive = false,
}: {
  href: string
  children: React.ReactNode
  isActive?: boolean
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative group ${isActive ? "text-sky-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 rounded-full transform origin-left"></span>
      )}
      {!isActive && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 rounded-full transform origin-left transition-all duration-300 group-hover:w-full"></span>
      )}
    </Link>
  )
}

// Componente para enlaces de navegación móvil
function MobileNavLink({
  href,
  children,
  isActive = false,
}: {
  href: string
  children: React.ReactNode
  isActive?: boolean
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-sky-600 bg-sky-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        }`}
    >
      {children}
    </Link>
  )
}

// Componente para dropdown en la navegación
function NavDropdown({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        {title}
        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 animate-in fade-in-50 slide-in-from-top-5 duration-200">
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
