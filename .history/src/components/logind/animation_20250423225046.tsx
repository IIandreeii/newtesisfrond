"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas para que ocupe toda la pantalla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Seguimiento del cursor
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Colores minimalistas pero más vibrantes
    const colors = {
      primary: "#38bdf8", // Azul cielo más vibrante
      secondary: "#4ade80", // Verde menta más vibrante
      accent: "#f472b6", // Rosa más vibrante
      background: "#f8fafc", // Blanco grisáceo
    }

    // Crear diferentes tipos de formas
    const shapes: Shape[] = []
    const shapeCount = 25 // Más formas para mayor dinamismo

    // Crear círculos
    for (let i = 0; i < shapeCount * 0.6; i++) {
      const radius = Math.random() * 120 + 40
      shapes.push({
        type: "circle",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: radius,
        color: Object.values(colors)[Math.floor(Math.random() * 3)], // Excluye el color de fondo
        speedX: (Math.random() - 0.5) * 1.2, // Velocidad aumentada
        speedY: (Math.random() - 0.5) * 1.2, // Velocidad aumentada
        opacity: Math.random() * 0.3 + 0.15, // Opacidad entre 0.15 y 0.45
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseDirection: 1,
        originalSize: radius,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    // Crear cuadrados
    for (let i = 0; i < shapeCount * 0.2; i++) {
      const size = Math.random() * 100 + 30
      shapes.push({
        type: "square",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        color: Object.values(colors)[Math.floor(Math.random() * 3)],
        speedX: (Math.random() - 0.5) * 1.0,
        speedY: (Math.random() - 0.5) * 1.0,
        opacity: Math.random() * 0.3 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseDirection: 1,
        originalSize: size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    // Crear triángulos
    for (let i = 0; i < shapeCount * 0.2; i++) {
      const size = Math.random() * 80 + 40
      shapes.push({
        type: "triangle",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        color: Object.values(colors)[Math.floor(Math.random() * 3)],
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.3 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseDirection: 1,
        originalSize: size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
      })
    }

    // Función para dibujar un círculo
    const drawCircle = (shape: Shape) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2)
      ctx.fillStyle = `${shape.color}${Math.round(shape.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fill()

      // Añadir brillo/resplandor
      ctx.beginPath()
      ctx.arc(shape.x, shape.y, shape.size / 2 + 10, 0, Math.PI * 2)
      ctx.fillStyle = `${shape.color}${Math.round(shape.opacity * 0.3 * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fill()
    }

    // Función para dibujar un cuadrado
    const drawSquare = (shape: Shape) => {
      if (!ctx) return
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)
      ctx.fillStyle = `${shape.color}${Math.round(shape.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)

      // Añadir brillo/resplandor
      ctx.strokeStyle = `${shape.color}${Math.round(shape.opacity * 0.5 * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.lineWidth = 8
      ctx.strokeRect(-shape.size / 2 - 5, -shape.size / 2 - 5, shape.size + 10, shape.size + 10)
      ctx.restore()
    }

    // Función para dibujar un triángulo
    const drawTriangle = (shape: Shape) => {
      if (!ctx) return
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)
      ctx.beginPath()
      ctx.moveTo(0, -shape.size / 2)
      ctx.lineTo(shape.size / 2, shape.size / 2)
      ctx.lineTo(-shape.size / 2, shape.size / 2)
      ctx.closePath()
      ctx.fillStyle = `${shape.color}${Math.round(shape.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fill()

      // Añadir brillo/resplandor
      ctx.beginPath()
      ctx.moveTo(0, -shape.size / 2 - 10)
      ctx.lineTo(shape.size / 2 + 10, shape.size / 2 + 10)
      ctx.lineTo(-shape.size / 2 - 10, shape.size / 2 + 10)
      ctx.closePath()
      ctx.strokeStyle = `${shape.color}${Math.round(shape.opacity * 0.4 * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.restore()
    }

    // Función de animación
    const animate = () => {
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar y mover formas
      shapes.forEach((shape) => {
        // Código de dibujo sin cambios...

        // Interacción con el cursor - ahora usando mousePositionRef.current
        const dx = mousePositionRef.current.x - shape.x
        const dy = mousePositionRef.current.y - shape.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx)
          const force = (maxDistance - distance) / maxDistance
          shape.x -= Math.cos(angle) * force * 2
          shape.y -= Math.sin(angle) * force * 2
        }

        // Resto del código sin cambios...
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [canvasRef]) // Ahora solo depende de canvasRef

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

interface Shape {
  type: "circle" | "square" | "triangle"
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  opacity: number
  pulseSpeed: number
  pulseDirection: number
  originalSize: number
  rotation: number
  rotationSpeed: number
}
