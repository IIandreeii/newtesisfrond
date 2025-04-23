"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

       
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        
        const colors = {
            primary: "#e0f2fe", // Azul claro
            secondary: "#dcfce7", // Verde menta
            accent: "#fce7f3", // Rosa pálido
            background: "#f8fafc", // Blanco grisáceo
        }

        // Crear círculos con diferentes colores y tamaños
        const circles: Circle[] = []
        const circleCount = 15

        for (let i = 0; i < circleCount; i++) {
            const radius = Math.random() * 150 + 50
            circles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius,
                color: Object.values(colors)[Math.floor(Math.random() * 3)], // Excluye el color de fondo
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.2 + 0.1, // Opacidad entre 0.1 y 0.3
            })
        }

        // Función de animación
        const animate = () => {
            ctx.fillStyle = colors.background
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Dibujar y mover círculos
            circles.forEach((circle) => {
                ctx.beginPath()
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
                ctx.fillStyle = `${circle.color}${Math.round(circle.opacity * 255)
                    .toString(16)
                    .padStart(2, "0")}`
                ctx.fill()

                // Mover círculo
                circle.x += circle.speedX
                circle.y += circle.speedY

                // Rebotar en los bordes
                if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
                    circle.speedX = -circle.speedX
                }
                if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
                    circle.speedY = -circle.speedY
                }
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

interface Circle {
    x: number
    y: number
    radius: number
    color: string
    speedX: number
    speedY: number
    opacity: number
}
