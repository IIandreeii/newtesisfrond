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
import { Progress } from "@/components/ui/progress"

import { profileService } from "@/components/profile/service/profile"
import { get } from "http"



export default function UserProfile() {



  const { getProfile, getResponse, loader } = profileService()
  const [userType, setUserType] = useState<"donor" | "charity">("donor")


  useEffect(() => {
    profileService()
  }
    , [get])

  console.log("getResponse", getResponse)



  const donorData = {
    id: "68046ab1d8d5bef3e1b700bb",
    email: "andree45x45@gmail.com",
    dni: "73103510",
    apellido: "qweqwe",
    nombre: "qwdeqw",
    userType: "donor",
    avatar: "/placeholder.svg?height=120&width=120&text=U",
  }

  const charityData = {
    id: "680469ffd8d5bef3e1b70089",
    nombre: "andree Vh",
    descripcion: "asdasdsada",
    email: "wilman1538@hotmail.com",
    direccion: "Cajamarca",
    telefono: "966424365",
    userType: "charity",
    avatar: "/placeholder.svg?height=120&width=120&text=O",
  }

  // Efecto para simular la carga del tipo de usuario desde una API
  useEffect(() => {
    // Aquí se haría una llamada a la API para obtener el tipo de usuario
    // Por ahora, usamos un toggle para demostración
    const urlParams = new URLSearchParams(window.location.search)
    const typeParam = urlParams.get("type")
    if (typeParam === "charity") {
      setUserType("charity")
    } else {
      setUserType("donor")
    }
  }, [])

  // Determinar qué datos mostrar según el tipo de usuario
  const profileData = userType === "donor" ? donorData : charityData

  return (
    <div className="w-full">
      {/* Encabezado del perfil */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar y acciones rápidas */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={profileData.avatar || "/placeholder.svg"}
                  alt={userType === "donor" ? profileData.nombre : profileData.nombre}
                  width={120}
                  height={120}
                  className="object-cover"
                />
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
                    {donorData.nombre} {donorData.apellido}
                  </h1>
                  <p className="text-slate-500">{donorData.email}</p>
                  <p className="text-slate-500">DNI: {donorData.dni}</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-slate-800">{charityData.nombre}</h1>
                  <p className="text-slate-600 italic">{charityData.descripcion}</p>
                  <p className="text-slate-500">{charityData.email}</p>
                  <p className="text-slate-500">
                    {charityData.direccion} • {charityData.telefono}
                  </p>
                </>
              )}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                <Badge className="bg-sky-100 text-sky-700 border-sky-200">
                  {userType === "donor" ? "Donante" : "Organización"}
                </Badge>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  ID: {profileData.id.substring(0, 8)}...
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones principales de navegación - Diferentes según el tipo de usuario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {userType === "donor" ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

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
                  <InfoItem label="ID" value={donorData.id} />
                  <InfoItem label="Nombre completo" value={`${donorData.nombre} ${donorData.apellido}`} />
                  <InfoItem label="Correo electrónico" value={donorData.email} />
                  <InfoItem label="DNI" value={donorData.dni} />
                  <InfoItem label="Tipo de usuario" value="Donante" />
                </>
              ) : (
                <>
                  <InfoItem label="ID" value={charityData.id} />
                  <InfoItem label="Nombre" value={charityData.nombre} />
                  <InfoItem label="Correo electrónico" value={charityData.email} />
                  <InfoItem label="Dirección" value={charityData.direccion} />
                  <InfoItem label="Teléfono" value={charityData.telefono} />
                  <InfoItem label="Tipo de usuario" value="Organización" />
                </>
              )}
            </div>

            {userType === "charity" && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="font-medium text-slate-700 mb-2">Descripción</h4>
                <p className="text-slate-600">{charityData.descripcion || "Sin descripción disponible."}</p>
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

function ActivityItem({
  icon,
  title,
  description,
  time,
  iconBg,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
  iconBg: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="text-xs text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  )
}

function OrganizationCard({
  name,
  category,
  image,
  donationAmount,
}: {
  name: string
  category: string
  image: string
  donationAmount: string
}) {
  return (
    <Card className="border-slate-100">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={name} width={40} height={40} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-slate-800">{name}</h4>
          <p className="text-xs text-slate-500">{category}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-slate-800">{donationAmount}</p>
          <p className="text-xs text-slate-500">Total donado</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DonationItem({
  organization,
  amount,
  date,
  status,
  image,
}: {
  organization: string
  amount: string
  date: string
  status: string
  image: string
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={organization} width={40} height={40} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{organization}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-slate-800">{amount}</p>
        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">{status}</Badge>
      </div>
    </div>
  )
}

function FavoriteOrgCard({
  name,
  category,
  description,
  image,
}: {
  name: string
  category: string
  description: string
  image: string
}) {
  return (
    <Card className="border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} width={60} height={60} />
          </div>
          <div>
            <h4 className="font-medium text-slate-800">{name}</h4>
            <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs">{category}</Badge>
          </div>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
        <div className="flex justify-between pt-2">
          <Button variant="ghost" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 text-sm">
            Ver perfil
          </Button>
          <Button variant="outline" className="text-pink-600 border-pink-200 hover:bg-pink-50 text-sm">
            Donar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCard({
  name,
  category,
  progress,
  goal,
  raised,
}: {
  name: string
  category: string
  progress: number
  goal: string
  raised: string
}) {
  return (
    <Card className="border-slate-100">
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="font-medium text-slate-800">{name}</h4>
          <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs">{category}</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Recaudado: {raised}</span>
            <span className="text-slate-600">Meta: {goal}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right text-slate-500">{progress}% completado</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ReceivedDonationItem({
  donor,
  amount,
  date,
  project,
  image,
}: {
  donor: string
  amount: string
  date: string
  project: string
  image: string
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={donor} width={40} height={40} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{donor}</p>
        <p className="text-xs text-slate-500">
          {date} • Proyecto: <span className="text-sky-600">{project}</span>
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium text-slate-800">{amount}</p>
        <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 text-xs h-6 px-2">
          Agradecer
        </Button>
      </div>
    </div>
  )
}

function ProjectManagementCard({
  name,
  description,
  progress,
  goal,
  raised,
  startDate,
  endDate,
  status,
}: {
  name: string
  description: string
  progress: number
  goal: string
  raised: string
  startDate: string
  endDate: string
  status: string
}) {
  return (
    <Card className="border-slate-100">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-slate-800">{name}</h4>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">{status}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Recaudado: {raised}</span>
            <span className="text-slate-600">Meta: {goal}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right text-slate-500">{progress}% completado</p>
        </div>

        <div className="flex justify-between text-xs text-slate-500">
          <span>Inicio: {startDate}</span>
          <span>Fin: {endDate}</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" className="text-slate-600 hover:text-slate-700 hover:bg-slate-50">
            Editar
          </Button>
          <Button variant="outline" size="sm" className="text-sky-600 border-sky-200 hover:bg-sky-50">
            Ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AuditItem({
  title,
  date,
  type,
  image,
}: {
  title: string
  date: string
  type: string
  image: string
}) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Financiera":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Impacto":
        return "bg-green-100 text-green-700 border-green-200"
      case "Transparencia":
        return "bg-sky-100 text-sky-700 border-sky-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} width={40} height={40} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={getBadgeColor(type)}>{type}</Badge>
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}

function MessageItem({
  sender,
  preview,
  date,
  unread,
  image,
}: {
  sender: string
  preview: string
  date: string
  unread: boolean
  image: string
}) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border ${unread ? "bg-sky-50/50 border-sky-100" : "bg-white border-slate-100"
        } hover:border-slate-200 transition-colors cursor-pointer`}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={sender} width={40} height={40} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className={`font-medium ${unread ? "text-sky-700" : "text-slate-800"}`}>{sender}</p>
          <p className="text-xs text-slate-500">{date}</p>
        </div>
        <p className={`text-sm truncate ${unread ? "text-sky-600" : "text-slate-600"}`}>{preview}</p>
      </div>
      {unread && <div className="w-2 h-2 rounded-full bg-sky-500 mt-2"></div>}
    </div>
  )
}
