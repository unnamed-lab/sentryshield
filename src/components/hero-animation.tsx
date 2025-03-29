"use client";

import { useEffect, useRef } from "react";

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle system
    const particles: Particle[] = [];
    const connections: Connection[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      type: string;

      constructor(canvas: HTMLCanvasElement) {
        this.x = (Math.random() * canvas.width) / window.devicePixelRatio;
        this.y = (Math.random() * canvas.height) / window.devicePixelRatio;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;

        // Random color from purple/blue palette
        const colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#a855f7"];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Random type
        const types = ["token", "wallet", "contract"];
        this.type = types[Math.floor(Math.random() * types.length)];
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width / window.devicePixelRatio || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height / window.devicePixelRatio || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Connection {
      particleA: Particle;
      particleB: Particle;
      distance: number;
      color: string;

      constructor(particleA: Particle, particleB: Particle) {
        this.particleA = particleA;
        this.particleB = particleB;
        this.distance = Math.hypot(
          particleA.x - particleB.x,
          particleA.y - particleB.y
        );
        this.color = "#8b5cf680"; // Semi-transparent purple
      }

      update() {
        this.distance = Math.hypot(
          this.particleA.x - this.particleB.x,
          this.particleA.y - this.particleB.y
        );
      }

      draw(ctx: CanvasRenderingContext2D) {
        const maxDistance = 100;
        if (this.distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(this.particleA.x, this.particleA.y);
          ctx.lineTo(this.particleB.x, this.particleB.y);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1 - this.distance / maxDistance;
          ctx.stroke();
        }
      }
    }

    // Initialize particles
    const initParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(canvas));
      }

      // Create connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          connections.push(new Connection(particles[i], particles[j]));
        }
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width / window.devicePixelRatio,
        canvas.height / window.devicePixelRatio
      );

      // Update and draw connections
      for (const connection of connections) {
        connection.update();
        connection.draw(ctx);
      }

      // Update and draw particles
      for (const particle of particles) {
        particle.update(canvas);
        particle.draw(ctx);
      }

      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
