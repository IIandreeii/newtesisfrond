"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  ClipboardCheck,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  MessageCircle,
  Users,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useProfileService } from "./service/profile"

export default function UserProfile() {
  const [userType, setUserType] = useState<"donor" | "charity">("donor")
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  interface ProfileData {
    nombre?: string;
    apellido?: string;
    email?: string;
    dni?: string;
    avatar?: string;
    descripcion?: string;
    direccion?: string;
    telefono?: string;
    userType?: "donor" | "charity";
    [key: string]: unknown; // Para propiedades adicionales que puedan existir
  }

  const { getProfile, loader, getResponse } = useProfileService()
 
  // Añadir useEffect para cargar datos solo una vez al montar el componente
  useEffect(() => {
    const loadProfile = async () => {
      try {
        await getProfile();
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array de dependencias vacío para ejecutar solo al montar

  useEffect(() => {
    if (getResponse) {
      const userData = getResponse.charity || getResponse.user || getResponse;
      if (userData && typeof userData === 'object' && 'userType' in userData && (userData.userType === 'donor' || userData.userType === 'charity')) {
        setUserType(userData.userType);
      }
      setProfileData(userData as ProfileData);
    }
  }, [getResponse]);


  if (loading || loader.loading || !profileData) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Encabezado del perfil */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar y acciones rápidas */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center bg-white">
                {profileData.avatar ? (
                  <Image
                    src={profileData.avatar}
                    alt={profileData.nombre || "Usuario"}
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-slate-800">
                    {profileData.nombre?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>
              <Badge className="absolute bottom-0 right-0 bg-green-100 text-green-700 border-green-200">
                Verificado
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                <Bell className="h-4 w-4 text-slate-600" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                <Settings className="h-4 w-4 text-slate-600" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                <LogOut className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
          </div>

          {/* Información del usuario/organización */}
          <div className="flex-1 text-center md:text-left">
            <div className="space-y-1">
              {userType === "donor" ? (
                <>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {profileData.nombre} {profileData.apellido}
                  </h1>
                  <p className="text-slate-500">{profileData.email}</p>
                  <p className="text-slate-500">DNI: {profileData.dni}</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-slate-800">{profileData.nombre}</h1>
                  <p className="text-slate-600 italic">{profileData.descripcion}</p>
                  <p className="text-slate-500">{profileData.email}</p>
                  <p className="text-slate-500">
                    {profileData.direccion} • {profileData.telefono}
                  </p>
                </>
              )}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                <Badge className="bg-sky-100 text-sky-700 border-sky-200">
                  {userType === "donor" ? "Donante" : "Organización"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones principales de navegación - Solo para organizaciones */}
      {userType === "charity" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ProfileNavButton
            icon={<Users className="h-6 w-6 text-sky-500" />}
            title="Donaciones recibidas"
            description="Historial de donaciones recibidas"
            bgColor="bg-sky-50"
            href="/perfil/donaciones-recibidas"
          />
          <ProfileNavButton
            icon={<FileText className="h-6 w-6 text-green-500" />}
            title="Gestión de proyectos"
            description="Administra tus proyectos activos"
            bgColor="bg-green-50"
            href="/perfil/proyectos"
          />
          <ProfileNavButton
            icon={<ClipboardCheck className="h-6 w-6 text-purple-500" />}
            title="Auditorías y reportes"
            description="Informes de transparencia y auditorías"
            bgColor="bg-purple-50"
            href="/perfil/auditorias"
          />
        </div>
      )}

      {/* Botones principales de navegación - Solo para donantes */}
      {userType === "donor" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ProfileNavButton
            icon={<Heart className="h-6 w-6 text-pink-500" />}
            title="Mis donaciones"
            description="Historial de tus donaciones monetarias"
            bgColor="bg-pink-50"
            href="/perfil/donaciones"
          />
          <ProfileNavButton
            icon={<MessageCircle className="h-6 w-6 text-sky-500" />}
            title="Mis mensajes"
            description="Comunicación con organizaciones"
            bgColor="bg-sky-50"
            href="/perfil/mensajes"
          />
          <ProfileNavButton
            icon={<Settings className="h-6 w-6 text-slate-500" />}
            title="Configuración"
            description="Ajustes de tu cuenta"
            bgColor="bg-slate-50"
            href="/perfil/configuracion"
          />
        </div>
      )}

      {/* Tarjeta de información adicional */}
      <Card className="border-slate-100 shadow-sm bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              {userType === "donor" ? "Información del donante" : "Información de la organización"}
            </h3>
            <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
              Editar perfil
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userType === "donor" ? (
                <>

                  <InfoItem label="Nombre completo" value={`${profileData.nombre || ""} ${profileData.apellido || ""}`} />
                  <InfoItem label="Correo electrónico" value={profileData.email || ""} />
                  <InfoItem label="DNI" value={profileData.dni || ""} />
                  <InfoItem label="Tipo de usuario" value="Donante" />
                </>
              ) : (
                <>

                  <InfoItem label="Nombre" value={profileData.nombre || ""} />
                  <InfoItem label="Correo electrónico" value={profileData.email || ""} />
                  <InfoItem label="Dirección" value={profileData.direccion || ""} />
                  <InfoItem label="Teléfono" value={profileData.telefono || ""} />
                  <InfoItem label="Tipo de usuario" value="Organización" />
                </>
              )}
            </div>

            {userType === "charity" && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="font-medium text-slate-700 mb-2">Descripción</h4>
                <p className="text-slate-600">{profileData.descripcion || "Sin descripción disponible."}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

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

