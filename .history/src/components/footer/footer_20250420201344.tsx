import type React from "react"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-slate-100 pt-16 pb-8 relative z-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Sobre nosotros */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Heart className="h-6 w-6 text-sky-400 fill-sky-400" />
                <Heart className="h-3 w-3 text-pink-300 fill-pink-300 absolute -top-1 -right-1" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">DonaVida</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Transformamos vidas a través de donaciones transparentes y proyectos de impacto social en comunidades
              vulnerables.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <SocialIcon icon={<Facebook className="h-4 w-4" />} color="bg-blue-600" />
              <SocialIcon icon={<Twitter className="h-4 w-4" />} color="bg-sky-500" />
              <SocialIcon icon={<Instagram className="h-4 w-4" />} color="bg-pink-500" />
              <SocialIcon icon={<Youtube className="h-4 w-4" />} color="bg-red-600" />
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <FooterLink href="/proyectos">Proyectos activos</FooterLink>
              <FooterLink href="/donaciones">Hacer una donación</FooterLink>
              <FooterLink href="/voluntariado">Voluntariado</FooterLink>
              <FooterLink href="/historias">Historias de impacto</FooterLink>
              <FooterLink href="/transparencia">Transparencia</FooterLink>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 text-sm">Av. Principal 123, Ciudad Ejemplo, País</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sky-500 flex-shrink-0" />
                <span className="text-slate-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sky-500 flex-shrink-0" />
                <span className="text-slate-600 text-sm">contacto@donavida.org</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Mantente informado</h3>
            <p className="text-slate-600 text-sm">
              Suscríbete para recibir actualizaciones sobre nuestros proyectos y el impacto de tus donaciones.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="border-slate-200 focus:border-sky-400 focus:ring-sky-200"
              />
              <Button className="bg-sky-500 hover:bg-sky-600 px-3">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-700">Certificación ONG</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-700">100% Transparente</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-700">Calificación A+</span>
            </div>
          </div>
        </div>

        {/* Copyright y enlaces legales */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} DonaVida. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link href="/terminos" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              Términos y condiciones
            </Link>
            <Link href="/privacidad" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              Política de privacidad
            </Link>
            <Link href="/cookies" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Componente para enlaces del footer
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-600 hover:text-sky-500 transition-colors text-sm flex items-center group">
        <span className="w-1 h-1 bg-slate-300 rounded-full mr-2 group-hover:bg-sky-400 group-hover:w-2 transition-all duration-300"></span>
        {children}
      </Link>
    </li>
  )
}

// Componente para iconos sociales
function SocialIcon({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <a
      href="#"
      className={`${color} text-white p-2 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
    >
      {icon}
    </a>
  )
}
