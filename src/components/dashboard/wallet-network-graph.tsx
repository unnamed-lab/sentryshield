/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"

export function WalletNetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node types
    const nodeTypes = ["wallet", "token", "contract"]
    const nodeColors = {
      wallet: "#8b5cf6", // Purple
      token: "#3b82f6", // Blue
      contract: "#10b981", // Green
    }

    // Create nodes
    const nodes: any[] = []
    const edges: any[] = []

    // Create a central node (the analyzed token/wallet)
    const centralNode = {
      id: "central",
      x: canvas.width / (2 * window.devicePixelRatio),
      y: canvas.height / (2 * window.devicePixelRatio),
      radius: 15,
      type: "token",
      label: "0x1234...5678",
      fixed: true,
    }
    nodes.push(centralNode)

    // Create surrounding nodes
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      const distance = 100 + Math.random() * 100
      const node = {
        id: `node-${i}`,
        x: centralNode.x + Math.cos(angle) * distance,
        y: centralNode.y + Math.sin(angle) * distance,
        radius: 5 + Math.random() * 8,
        type: nodeTypes[Math.floor(Math.random() * nodeTypes.length)],
        label: `0x${Math.floor(Math.random() * 10000).toString(16)}...${Math.floor(Math.random() * 10000).toString(16)}`,
        vx: 0,
        vy: 0,
      }
      nodes.push(node)

      // Connect to central node
      if (Math.random() > 0.3) {
        edges.push({
          source: "central",
          target: node.id,
          value: Math.random() * 10,
        })
      }
    }

    // Connect some nodes to each other
    for (let i = 1; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.85) {
          edges.push({
            source: nodes[i].id,
            target: nodes[j].id,
            value: Math.random() * 5,
          })
        }
      }
    }

    // Force simulation
    const simulation = () => {
      // Apply forces
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].fixed) continue

        // Gravity towards center
        const dx = centralNode.x - nodes[i].x
        const dy = centralNode.y - nodes[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        nodes[i].vx += (dx / distance) * 0.1
        nodes[i].vy += (dy / distance) * 0.1

        // Repulsion between nodes
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue

          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 0 && distance < 100) {
            const force = 1 / distance
            nodes[i].vx += dx * force * 0.2
            nodes[i].vy += dy * force * 0.2
          }
        }

        // Edge forces
        for (const edge of edges) {
          if (edge.source === nodes[i].id || edge.target === nodes[i].id) {
            const sourceNode = nodes.find((n) => n.id === edge.source)
            const targetNode = nodes.find((n) => n.id === edge.target)

            if (sourceNode && targetNode) {
              const dx = targetNode.x - sourceNode.x
              const dy = targetNode.y - sourceNode.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance > 0) {
                const force = ((distance - 50) / distance) * 0.05

                if (edge.source === nodes[i].id) {
                  nodes[i].vx += dx * force
                  nodes[i].vy += dy * force
                } else {
                  nodes[i].vx -= dx * force
                  nodes[i].vy -= dy * force
                }
              }
            }
          }
        }

        // Apply velocity with damping
        nodes[i].x += nodes[i].vx
        nodes[i].y += nodes[i].vy
        nodes[i].vx *= 0.9
        nodes[i].vy *= 0.9

        // Boundary constraints
        const padding = 50
        const minX = padding
        const maxX = canvas.width / window.devicePixelRatio - padding
        const minY = padding
        const maxY = canvas.height / window.devicePixelRatio - padding

        if (nodes[i].x < minX) {
          nodes[i].x = minX
          nodes[i].vx = -nodes[i].vx * 0.5
        }
        if (nodes[i].x > maxX) {
          nodes[i].x = maxX
          nodes[i].vx = -nodes[i].vx * 0.5
        }
        if (nodes[i].y < minY) {
          nodes[i].y = minY
          nodes[i].vy = -nodes[i].vy * 0.5
        }
        if (nodes[i].y > maxY) {
          nodes[i].y = maxY
          nodes[i].vy = -nodes[i].vy * 0.5
        }
      }
    }

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Draw edges
      for (const edge of edges) {
        const sourceNode = nodes.find((n) => n.id === edge.source)
        const targetNode = nodes.find((n) => n.id === edge.target)

        if (sourceNode && targetNode) {
          ctx.beginPath()
          ctx.moveTo(sourceNode.x, sourceNode.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${edge.value / 10})`
          ctx.lineWidth = edge.value / 3
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColors[node.type as keyof typeof nodeColors]
        ctx.fill()

        // Draw label for central node
        if (node.id === "central") {
          ctx.font = "12px sans-serif"
          ctx.fillStyle = "#fff"
          ctx.textAlign = "center"
          ctx.fillText(node.label, node.x, node.y + node.radius + 15)
        }
      }
    }

    // Animation loop
    const animate = () => {
      simulation()
      draw()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
