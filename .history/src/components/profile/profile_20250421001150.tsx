"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Package, ClipboardCheck, Bell, Settings, LogOut, ChevronRight, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  // Datos simulados del usuario
  const user = {
    name: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    role: "Donante",
    memberSince: "Enero 2023",
    avatar: "/Landing.png?height=120&width=120&text=AM",
    stats: {
      totalDonations: 12,
      totalAmount: "$1,250",
      productDonations: 5,
      impactPoints: 850,
    },
  }

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
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
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

          {/* Información del usuario */}
          <div className="flex-1 text-center md:text-left">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
              <p className="text-slate-500">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                <Badge className="bg-sky-100 text-sky-700 border-sky-200">{user.role}</Badge>
                <span className="text-xs text-slate-500">Miembro desde {user.memberSince}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-slate-800">{user.stats.totalDonations}</p>
                <p className="text-xs text-slate-500">Donaciones</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-slate-800">{user.stats.totalAmount}</p>
                <p className="text-xs text-slate-500">Total donado</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-slate-800">{user.stats.productDonations}</p>
                <p className="text-xs text-slate-500">Productos</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-slate-800">{user.stats.impactPoints}</p>
                <p className="text-xs text-slate-500">Puntos de impacto</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones principales de navegación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ProfileNavButton
          icon={<Heart className="h-6 w-6 text-pink-500" />}
          title="Ver donaciones"
          description="Historial de tus donaciones monetarias"
          bgColor="bg-pink-50"
          href="/perfil/donaciones"
        />
        <ProfileNavButton
          icon={<Package className="h-6 w-6 text-green-500" />}
          title="Ver donaciones de productos"
          description="Productos que has donado a organizaciones"
          bgColor="bg-green-50"
          href="/perfil/productos"
        />
        <ProfileNavButton
          icon={<ClipboardCheck className="h-6 w-6 text-sky-500" />}
          title="Ver auditorías"
          description="Informes de transparencia y auditorías"
          bgColor="bg-sky-50"
          href="/perfil/auditorias"
        />
      </div>

      {/* Contenido principal */}
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
                <TabsTrigger
                  value="donations"
                  className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                    activeTab === "donations" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                  }`}
                >
                  Donaciones
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                    activeTab === "products" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                  }`}
                >
                  Productos
                </TabsTrigger>
                <TabsTrigger
                  value="audits"
                  className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 data-[state=active]:shadow-none ${
                    activeTab === "audits" ? "border-sky-500 text-sky-700" : "border-transparent text-slate-600"
                  }`}
                >
                  Auditorías
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="p-6">
            <div className="space-y-8">
              {/* Metas de impacto */}
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
                      <span className="text-sm text-slate-600">Productos donados</span>
                      <span className="text-sm font-medium text-slate-700">5 / 10</span>
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

              {/* Actividad reciente */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Actividad reciente</h3>
                <div className="space-y-4">
                  <ActivityItem
                    icon={<Heart className="h-5 w-5 text-pink-500" />}
                    title="Donación realizada"
                    description="Has donado $50 a Fundación Esperanza"
                    time="Hace 2 días"
                    iconBg="bg-pink-50"
                  />
                  <ActivityItem
                    icon={<Star className="h-5 w-5 text-amber-500" />}
                    title="Nivel de impacto aumentado"
                    description="Has alcanzado el nivel Plata de impacto"
                    time="Hace 1 semana"
                    iconBg="bg-amber-50"
                  />
                  <ActivityItem
                    icon={<MessageCircle className="h-5 w-5 text-green-500" />}
                    title="Nuevo mensaje"
                    description="Fundación Esperanza te ha enviado un mensaje"
                    time="Hace 1 semana"
                    iconBg="bg-green-50"
                  />
                  <ActivityItem
                    icon={<Package className="h-5 w-5 text-blue-500" />}
                    title="Donación de productos"
                    description="Has donado 3 productos a Manos Unidas"
                    time="Hace 2 semanas"
                    iconBg="bg-blue-50"
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button variant="ghost" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50">
                    Ver toda la actividad
                  </Button>
                </div>
              </div>

              {/* Organizaciones que apoyas */}
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
            </div>
          </TabsContent>

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
                <DonationItem
                  organization="Fundación Esperanza"
                  amount="$100.00"
                  date="15 de marzo, 2023"
                  status="Completada"
                  image="/placeholder.svg?height=40&width=40&text=FE"
                />
                <DonationItem
                  organization="Manos Unidas"
                  amount="$50.00"
                  date="1 de marzo, 2023"
                  status="Completada"
                  image="/placeholder.svg?height=40&width=40&text=MU"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline" className="text-slate-600">
                  Cargar más
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Donaciones de productos</h3>
                <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                  Donar productos
                </Button>
              </div>

              <div className="space-y-4">
                <ProductDonationItem
                  organization="Manos Unidas"
                  product="Kit de alimentos no perecederos"
                  quantity="2"
                  date="10 de abril, 2023"
                  status="Entregado"
                  image="/placeholder.svg?height=40&width=40&text=MU"
                />
                <ProductDonationItem
                  organization="Fundación Esperanza"
                  product="Útiles escolares"
                  quantity="1"
                  date="5 de abril, 2023"
                  status="En tránsito"
                  image="/placeholder.svg?height=40&width=40&text=FE"
                />
                <ProductDonationItem
                  organization="Planeta Verde"
                  product="Ropa de invierno"
                  quantity="5"
                  date="20 de marzo, 2023"
                  status="Entregado"
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

          <TabsContent value="audits" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Informes de auditoría</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                    Filtrar
                  </Button>
                  <Button variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                    Descargar todos
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <AuditItem
                  organization="Fundación Esperanza"
                  title="Informe de impacto Q1 2023"
                  date="15 de abril, 2023"
                  type="Impacto"
                  image="/placeholder.svg?height=40&width=40&text=FE"
                />
                <AuditItem
                  organization="Manos Unidas"
                  title="Auditoría financiera 2023"
                  date="10 de abril, 2023"
                  type="Financiera"
                  image="/placeholder.svg?height=40&width=40&text=MU"
                />
                <AuditItem
                  organization="Planeta Verde"
                  title="Reporte de transparencia Q1 2023"
                  date="5 de abril, 2023"
                  type="Transparencia"
                  image="/placeholder.svg?height=40&width=40&text=PV"
                />
                <AuditItem
                  organization="Fundación Esperanza"
                  title="Auditoría de proyectos 2022"
                  date="15 de marzo, 2023"
                  type="Proyectos"
                  image="/placeholder.svg?height=40&width=40&text=FE"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline" className="text-slate-600">
                  Cargar más
                </Button>
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

function ProductDonationItem({
  organization,
  product,
  quantity,
  date,
  status,
  image,
}: {
  organization: string
  product: string
  quantity: string
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
        <div className="flex items-center gap-2">
          <p className="font-medium text-slate-800">{product}</p>
          <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs">x{quantity}</Badge>
        </div>
        <p className="text-xs text-slate-500">
          {organization} • {date}
        </p>
      </div>
      <div>
        <Badge
          className={
            status === "Entregado"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-amber-100 text-amber-700 border-amber-200"
          }
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}

function AuditItem({
  organization,
  title,
  date,
  type,
  image,
}: {
  organization: string
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
      case "Proyectos":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={organization} width={40} height={40} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">
          {organization} • {date}
        </p>
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
