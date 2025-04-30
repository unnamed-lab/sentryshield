/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"

export function TokenNetworkGraph() {
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

    // Node types and colors
    const nodeTypes = ["token", "wallet", "contract"]
    const nodeColors = {
      token: "#8b5cf6", // Purple
      wallet: "#3b82f6", // Blue
      contract: "#10b981", // Green
    }

    // Concentric circles data (3 layers)
    const centerX = canvas.width / (2 * window.devicePixelRatio)
    const centerY = canvas.height / (2 * window.devicePixelRatio)
    const radiuses = [80, 150, 220]

    // Create nodes
    const nodes: any[] = []
    const edges: any[] = []

    // Create a central token node
    const centralNode = {
      id: "central",
      x: centerX,
      y: centerY,
      radius: 15,
      type: "token",
      label: "Token",
      fixed: true,
      circle: 0, // Center
    }
    nodes.push(centralNode)

    // Create nodes on concentric circles
    for (let circle = 0; circle < radiuses.length; circle++) {
      const radius = radiuses[circle]
      const circleNodeCount = 6 + circle * 6 // More nodes in outer circles
      const nodeType =
        circle === 0 ? "wallet" : circle === 1 ? "contract" : nodeTypes[Math.floor(Math.random() * nodeTypes.length)]

      for (let i = 0; i < circleNodeCount; i++) {
        const angle = (i / circleNodeCount) * Math.PI * 2
        // Add some randomness to positions
        const distVariation = (Math.random() - 0.5) * 20
        const angleVariation = (Math.random() - 0.5) * 0.2
        const finalAngle = angle + angleVariation
        const finalDist = radius + distVariation

        const node = {
          id: `node-${circle}-${i}`,
          x: centerX + Math.cos(finalAngle) * finalDist,
          y: centerY + Math.sin(finalAngle) * finalDist,
          radius: 5 + Math.random() * 3,
          type: nodeType,
          label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} ${circle}-${i}`,
          fixed: true,
          circle: circle + 1,
        }
        nodes.push(node)

        // Connect to central node if in inner circle
        if (circle === 0) {
          edges.push({
            source: "central",
            target: node.id,
            value: 3,
          })
        }
        // Connect to a random node in the previous circle
        else {
          const previousCircleNodes = nodes.filter((n) => n.circle === circle)
          if (previousCircleNodes.length > 0) {
            const targetNode = previousCircleNodes[Math.floor(Math.random() * previousCircleNodes.length)]
            edges.push({
              source: targetNode.id,
              target: node.id,
              value: 1 + Math.random() * 2,
            })
          }
        }

        // Add some random connections within the same circle
        if (Math.random() > 0.7 && i > 0) {
          const sameCircleNodes = nodes.filter((n) => n.circle === circle + 1)
          if (sameCircleNodes.length > 1) {
            const targetIndex = Math.floor(Math.random() * (sameCircleNodes.length - 1))
            edges.push({
              source: node.id,
              target: sameCircleNodes[targetIndex].id,
              value: 1 + Math.random(),
            })
          }
        }
      }
    }

    // Add more random edges to create a more connected graph
    for (let i = 0; i < 15; i++) {
      const sourceIndex = 1 + Math.floor(Math.random() * (nodes.length - 1))
      let targetIndex = 1 + Math.floor(Math.random() * (nodes.length - 1))
      // Ensure not connecting to self
      while (targetIndex === sourceIndex) {
        targetIndex = 1 + Math.floor(Math.random() * (nodes.length - 1))
      }

      edges.push({
        source: nodes[sourceIndex].id,
        target: nodes[targetIndex].id,
        value: Math.random() * 1.5,
      })
    }

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Draw concentric circles (layers)
      for (const radius of radiuses) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.stroke()
      }

      // Draw edges
      for (const edge of edges) {
        const sourceNode = nodes.find((n) => n.id === edge.source)
        const targetNode = nodes.find((n) => n.id === edge.target)

        if (sourceNode && targetNode) {
          ctx.beginPath()
          ctx.moveTo(sourceNode.x, sourceNode.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${edge.value / 3})`
          ctx.lineWidth = edge.value / 2
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
          ctx.fillText("Token", node.x, node.y + node.radius + 15)
        }
      }

      // Draw legend
      const legendX = 20
      let legendY = 20
      const legendSpacing = 25

      for (const type of nodeTypes) {
        ctx.beginPath()
        ctx.arc(legendX, legendY, 6, 0, Math.PI * 2)
        ctx.fillStyle = nodeColors[type as keyof typeof nodeColors]
        ctx.fill()

        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#fff"
        ctx.textAlign = "left"
        ctx.fillText(type.charAt(0).toUpperCase() + type.slice(1), legendX + 15, legendY + 4)

        legendY += legendSpacing
      }
    }

    // Animation loop - just draw once for now as nodes are fixed
    draw()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
