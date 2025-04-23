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
  Star,
  MessageCircle,
  Users,
  FileText,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

import { getProfile, getResponse, loader } from "./service/profile"


export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userType, setUserType] = useState<"user" | "organization">("user") 






  

  const userData = {
    id: "user123",
    email: "ana.martinez@ejemplo.com",
    dni: "12345678A",
    apellido: "Martínez",
    nombre: "Ana",
    role: "Donante",
    userType: "user",
    memberSince: "Enero 2023",
    avatar: "/placeholder.svg?height=120&width=120&text=AM",
    stats: {
      totalDonations: 12,
      totalAmount: "$1,250",
      productDonations: 5,
      impactPoints: 850,
    },
  }

  const organizationData = {
    id: "org123",
    nombre: "Fundación Esperanza",
    descripcion: "Ayudamos a niños en situación de vulnerabilidad",
    email: "contacto@fundacionesperanza.org",
    direccion: "Av. Principal 123, Ciudad",
    telefono: "+1234567890",
    userType: "organization",
    accessToken: "token123",
    memberSince: "Marzo 2020",
    avatar: "/placeholder.svg?height=120&width=120&text=FE",
    stats: {
      totalProjects: 15,
      totalDonationsReceived: "$25,000",
      totalBeneficiaries: 500,
      activeProjects: 8,
    },
  }

  // Determinar qué datos mostrar según el tipo de usuario
  const profileData = userType === "user" ? userData : organizationData

  // Efecto para simular la carga del tipo de usuario desde una API
  useEffect(() => {
    // Aquí se haría una llamada a la API para obtener el tipo de usuario
    // Por ahora, usamos un toggle para demostración
    const urlParams = new URLSearchParams(window.location.search)
    const typeParam = urlParams.get("type")
    if (typeParam === "organization") {
      setUserType("organization")
    } else {
      setUserType("user")
    }
  }, [])

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
                  alt={userType === "user" ? profileData.nombre : profileData.nombre}
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
              <h1 className="text-2xl font-bold text-slate-800">
                {userType === "user" && 'apellido' in profileData ? `${profileData.nombre} ${profileData.apellido}` : profileData.nombre}
              </h1>
              <p className="text-slate-500">{profileData.email}</p>
              {userType === "organization" && (
                <p className="text-slate-500">
                  {userType === "organization" && 'direccion' in profileData && `${profileData.direccion} • ${profileData.telefono}`}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                <Badge className="bg-sky-100 text-sky-700 border-sky-200">
                  {userType === "user" ? "Donante" : "Organización"}
                </Badge>
                <span className="text-xs text-slate-500">Miembro desde {profileData.memberSince}</span>
              </div>
            </div>

            {/* Estadísticas según tipo de usuario */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {userType === "user" ? (
                <>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{userData.stats.totalDonations}</p>
                    <p className="text-xs text-slate-500">Donaciones</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{userData.stats.totalAmount}</p>
                    <p className="text-xs text-slate-500">Total donado</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{userData.stats.productDonations}</p>
                    <p className="text-xs text-slate-500">Productos</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{userData.stats.impactPoints}</p>
                    <p className="text-xs text-slate-500">Puntos de impacto</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{organizationData.stats.totalProjects}</p>
                    <p className="text-xs text-slate-500">Proyectos</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{organizationData.stats.totalDonationsReceived}</p>
                    <p className="text-xs text-slate-500">Donaciones recibidas</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{organizationData.stats.totalBeneficiaries}</p>
                    <p className="text-xs text-slate-500">Beneficiarios</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-slate-800">{organizationData.stats.activeProjects}</p>
                    <p className="text-xs text-slate-500">Proyectos activos</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botones principales de navegación - Diferentes según el tipo de usuario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {userType === "user" ? (
          <>
            <ProfileNavButton
              icon={<Heart className="h-6 w-6 text-pink-500" />}
              title="Mis donaciones"
              description="Historial de tus donaciones monetarias"
              bgColor="bg-pink-50"
              href="/perfil/donaciones"
            />
            <ProfileNavButton
              icon={<Star className="h-6 w-6 text-amber-500" />}
              title="Organizaciones favoritas"
              description="Organizaciones que sigues y apoyas"
              bgColor="bg-amber-50"
              href="/perfil/favoritos"
            />
            <ProfileNavButton
              icon={<MessageCircle className="h-6 w-6 text-sky-500" />}
              title="Mis mensajes"
              description="Comunicación con organizaciones"
              bgColor="bg-sky-50"
              href="/perfil/mensajes"
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

      {/* Contenido principal - Tabs diferentes según el tipo de usuario */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b border-slate-100">
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="overview"
                  className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                    activeTab === "overview" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                  }`}
                >
                  Resumen
                </TabsTrigger>

                {userType === "user" ? (
                  <>
                    <TabsTrigger
                      value="donations"
                      className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                        activeTab === "donations" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                      }`}
                    >
                      Mis Donaciones
                    </TabsTrigger>
                    <TabsTrigger
                      value="favorites"
                      className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                        activeTab === "favorites" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                      }`}
                    >
                      Favoritos
                    </TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger
                      value="received"
                      className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                        activeTab === "received" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                      }`}
                    >
                      Donaciones Recibidas
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                        activeTab === "projects" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                      }`}
                    >
                      Proyectos
                    </TabsTrigger>
                    <TabsTrigger
                      value="audits"
                      className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                        activeTab === "audits" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                      }`}
                    >
                      Auditorías
                    </TabsTrigger>
                  </>
                )}

                <TabsTrigger
                  value="messages"
                  className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                    activeTab === "messages" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                  }`}
                >
                  Mensajes
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Contenido de las pestañas */}
          <TabsContent value="overview" className="p-6">
            <div className="space-y-8">
              {userType === "user" ? (
                <>
                  {/* Metas de impacto - Solo para usuarios */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Tus metas de impacto</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Meta mensual de donación</span>
                          <span className="text-sm font-medium text-slate-700">$250 / $500</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Organizaciones apoyadas</span>
                          <span className="text-sm font-medium text-slate-700">3 / 5</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Estadísticas de proyectos - Solo para organizaciones */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Estadísticas de proyectos</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Meta de recaudación anual</span>
                          <span className="text-sm font-medium text-slate-700">$25,000 / $50,000</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Beneficiarios alcanzados</span>
                          <span className="text-sm font-medium text-slate-700">500 / 1000</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Proyectos completados</span>
                          <span className="text-sm font-medium text-slate-700">7 / 15</span>
                        </div>
                        <Progress value={47} className="h-2" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Actividad reciente - Para ambos tipos de usuario */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Actividad reciente</h3>
                <div className="space-y-4">
                  {userType === "user" ? (
                    <>
                      <ActivityItem
                        icon={<Heart className="h-5 w-5 text-pink-500" />}
                        title="Donación realizada"
                        description="Has donado $50 a Fundación Esperanza"
                        time="Hace 2 días"
                        iconBg="bg-pink-50"
                      />
                      <ActivityItem
                        icon={<Star className="h-5 w-5 text-amber-500" />}
                        title="Nueva organización favorita"
                        description="Has añadido Manos Unidas a tus favoritos"
                        time="Hace 5 días"
                        iconBg="bg-amber-50"
                      />
                    </>
                  ) : (
                    <>
                      <ActivityItem
                        icon={<Heart className="h-5 w-5 text-pink-500" />}
                        title="Donación recibida"
                        description="Has recibido $150 de Ana Martínez"
                        time="Hace 1 día"
                        iconBg="bg-pink-50"
                      />
                      <ActivityItem
                        icon={<Calendar className="h-5 w-5 text-green-500" />}
                        title="Nuevo proyecto creado"
                        description="Has creado el proyecto 'Educación para todos'"
                        time="Hace 3 días"
                        iconBg="bg-green-50"
                      />
                    </>
                  )}
                  <ActivityItem
                    icon={<MessageCircle className="h-5 w-5 text-sky-500" />}
                    title="Nuevo mensaje"
                    description={
                      userType === "user"
                        ? "Fundación Esperanza te ha enviado un mensaje"
                        : "Ana Martínez te ha enviado un mensaje"
                    }
                    time="Hace 1 semana"
                    iconBg="bg-sky-50"
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button variant="ghost" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50">
                    Ver toda la actividad
                  </Button>
                </div>
              </div>

              {/* Contenido específico según tipo de usuario */}
              {userType === "user" ? (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Organizaciones que apoyas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OrganizationCard
                      name="Fundación Esperanza"
                      category="Educación"
                      image="/placeholder.svg?height=40&width=40&text=FE"
                      donationAmount="$150"
                    />
                    <OrganizationCard
                      name="Manos Unidas"
                      category="Salud"
                      image="/placeholder.svg?height=40&width=40&text=MU"
                      donationAmount="$75"
                    />
                    <OrganizationCard
                      name="Planeta Verde"
                      category="Medio Ambiente"
                      image="/placeholder.svg?height=40&width=40&text=PV"
                      donationAmount="$25"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Proyectos activos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProjectCard
                      name="Educación para todos"
                      category="Educación"
                      progress={75}
                      goal="$10,000"
                      raised="$7,500"
                    />
                    <ProjectCard
                      name="Agua potable"
                      category="Infraestructura"
                      progress={30}
                      goal="$15,000"
                      raised="$4,500"
                    />
                    <ProjectCard
                      name="Comedor comunitario"
                      category="Alimentación"
                      progress={90}
                      goal="$5,000"
                      raised="$4,500"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Pestañas específicas para usuarios */}
          {userType === "user" && (
            <>
              <TabsContent value="donations" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Historial de donaciones</h3>
                    <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                      Exportar historial
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <DonationItem
                      organization="Fundación Esperanza"
                      amount="$50.00"
                      date="15 de abril, 2023"
                      status="Completada"
                      image="/placeholder.svg?height=40&width=40&text=FE"
                    />
                    <DonationItem
                      organization="Manos Unidas"
                      amount="$75.00"
                      date="2 de abril, 2023"
                      status="Completada"
                      image="/placeholder.svg?height=40&width=40&text=MU"
                    />
                    <DonationItem
                      organization="Planeta Verde"
                      amount="$25.00"
                      date="28 de marzo, 2023"
                      status="Completada"
                      image="/placeholder.svg?height=40&width=40&text=PV"
                    />
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button variant="outline" className="text-slate-600">
                      Cargar más
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800">Organizaciones favoritas</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FavoriteOrgCard
                      name="Fundación Esperanza"
                      category="Educación"
                      description="Ayudamos a niños en situación de vulnerabilidad a acceder a educación de calidad."
                      image="/placeholder.svg?height=60&width=60&text=FE"
                    />
                    <FavoriteOrgCard
                      name="Manos Unidas"
                      category="Salud"
                      description="Brindamos atención médica a comunidades sin acceso a servicios de salud básicos."
                      image="/placeholder.svg?height=60&width=60&text=MU"
                    />
                    <FavoriteOrgCard
                      name="Planeta Verde"
                      category="Medio Ambiente"
                      description="Trabajamos por la conservación de ecosistemas y la educación ambiental."
                      image="/placeholder.svg?height=60&width=60&text=PV"
                    />
                  </div>
                </div>
              </TabsContent>
            </>
          )}

          {/* Pestañas específicas para organizaciones */}
          {userType === "organization" && (
            <>
              <TabsContent value="received" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Donaciones recibidas</h3>
                    <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                      Exportar informe
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <ReceivedDonationItem
                      donor="Ana Martínez"
                      amount="$150.00"
                      date="20 de abril, 2023"
                      project="Educación para todos"
                      image="/placeholder.svg?height=40&width=40&text=AM"
                    />
                    <ReceivedDonationItem
                      donor="Carlos Rodríguez"
                      amount="$75.00"
                      date="15 de abril, 2023"
                      project="Agua potable"
                      image="/placeholder.svg?height=40&width=40&text=CR"
                    />
                    <ReceivedDonationItem
                      donor="Laura Gómez"
                      amount="$200.00"
                      date="10 de abril, 2023"
                      project="Comedor comunitario"
                      image="/placeholder.svg?height=40&width=40&text=LG"
                    />
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button variant="outline" className="text-slate-600">
                      Cargar más
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Gestión de proyectos</h3>
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white">Nuevo proyecto</Button>
                  </div>

                  <div className="space-y-6">
                    <ProjectManagementCard
                      name="Educación para todos"
                      description="Programa de becas para estudiantes de escasos recursos"
                      progress={75}
                      goal="$10,000"
                      raised="$7,500"
                      startDate="01/01/2023"
                      endDate="31/12/2023"
                      status="Activo"
                    />
                    <ProjectManagementCard
                      name="Agua potable"
                      description="Instalación de sistemas de agua potable en comunidades rurales"
                      progress={30}
                      goal="$15,000"
                      raised="$4,500"
                      startDate="01/03/2023"
                      endDate="28/02/2024"
                      status="Activo"
                    />
                    <ProjectManagementCard
                      name="Comedor comunitario"
                      description="Alimentación diaria para familias en situación de vulnerabilidad"
                      progress={90}
                      goal="$5,000"
                      raised="$4,500"
                      startDate="15/02/2023"
                      endDate="15/12/2023"
                      status="Activo"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audits" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Informes de auditoría</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                        Subir informe
                      </Button>
                      <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                        Descargar todos
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <AuditItem
                      title="Informe de impacto Q1 2023"
                      date="15 de abril, 2023"
                      type="Impacto"
                      image="/placeholder.svg?height=40&width=40&text=FE"
                    />
                    <AuditItem
                      title="Auditoría financiera 2023"
                      date="10 de abril, 2023"
                      type="Financiera"
                      image="/placeholder.svg?height=40&width=40&text=FE"
                    />
                    <AuditItem
                      title="Reporte de transparencia Q1 2023"
                      date="5 de abril, 2023"
                      type="Transparencia"
                      image="/placeholder.svg?height=40&width=40&text=FE"
                    />
                  </div>
                </div>
              </TabsContent>
            </>
          )}

          {/* Pestaña de mensajes - Común para ambos tipos de usuario */}
          <TabsContent value="messages" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Mensajes</h3>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">Nuevo mensaje</Button>
              </div>

              <div className="space-y-4">
                {userType === "user" ? (
                  <>
                    <MessageItem
                      sender="Fundación Esperanza"
                      preview="Gracias por tu donación. Queremos compartir contigo el impacto que está generando..."
                      date="Hace 2 días"
                      unread={true}
                      image="/placeholder.svg?height=40&width=40&text=FE"
                    />
                    <MessageItem
                      sender="Manos Unidas"
                      preview="Hola Ana, te invitamos a nuestro próximo evento de recaudación de fondos..."
                      date="Hace 1 semana"
                      unread={false}
                      image="/placeholder.svg?height=40&width=40&text=MU"
                    />
                  </>
                ) : (
                  <>
                    <MessageItem
                      sender="Ana Martínez"
                      preview="Me gustaría saber más sobre el proyecto de Educación para todos..."
                      date="Hace 3 días"
                      unread={true}
                      image="/placeholder.svg?height=40&width=40&text=AM"
                    />
                    <MessageItem
                      sender="Carlos Rodríguez"
                      preview="¿Cómo puedo participar como voluntario en el proyecto de Agua potable?"
                      date="Hace 5 días"
                      unread={false}
                      image="/placeholder.svg?height=40&width=40&text=CR"
                    />
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
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
      className={`flex items-start gap-4 p-4 rounded-lg border ${
        unread ? "bg-sky-50/50 border-sky-100" : "bg-white border-slate-100"
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
