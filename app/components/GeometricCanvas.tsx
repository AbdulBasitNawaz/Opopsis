"use client";

import { useEffect, useRef } from "react";

export default function GeometricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    // Attach to window so movement is captured across the viewport
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Setup geometric system
    const gridSpacing = 80;
    let rotationAngle = 0;
    
    // Technical nodes
    const nodesCount = 12;
    const nodes: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      phase: number;
    }> = [];

    for (let i = 0; i < nodesCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawGrid = () => {
      if (!ctx) return;
      ctx.strokeStyle = "rgba(39, 39, 42, 0.15)";
      ctx.lineWidth = 1;

      // Draw grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Small tick marks
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.fillStyle = "rgba(108, 99, 255, 0.2)";
          ctx.fillRect(x - 1, y - 1, 3, 3);
        }
      }

      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawTechnicalCircles = () => {
      if (!ctx) return;
      // Precision engineering rings in the center of the canvas
      const cx = width * 0.5;
      const cy = height * 0.5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotationAngle);

      // Outer thin ring
      ctx.strokeStyle = "rgba(39, 39, 42, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Outer dashed/dotted ring
      ctx.strokeStyle = "rgba(108, 99, 255, 0.15)";
      ctx.setLineDash([2, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 184, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner ring with crosshairs
      ctx.strokeStyle = "rgba(39, 39, 42, 0.2)";
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(-200, 0);
      ctx.lineTo(200, 0);
      ctx.moveTo(0, -200);
      ctx.lineTo(0, 200);
      ctx.stroke();

      // Precision tick angles
      ctx.fillStyle = "rgba(161, 161, 170, 0.3)";
      ctx.font = "8px 'Space Grotesk'";
      ctx.fillText("00°", 210, 3);
      ctx.fillText("90°", -10, 220);
      ctx.fillText("180°", -230, 3);
      ctx.fillText("270°", -15, -210);

      ctx.restore();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates smoothly
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update rotation
      rotationAngle += 0.0003;

      // Render layers
      drawGrid();
      drawTechnicalCircles();

      // Draw interactive node lines
      ctx.strokeStyle = "rgba(108, 99, 255, 0.08)";
      ctx.lineWidth = 1;

      // Update nodes position and draw them
      nodes.forEach((node) => {
        // Drift movement
        node.phase += 0.005;
        const driftX = Math.sin(node.phase) * 10;
        const driftY = Math.cos(node.phase) * 10;
        
        node.x = node.baseX + driftX;
        node.y = node.baseY + driftY;

        // Mouse proximity reaction
        if (mouse.isHovering) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const force = (220 - dist) / 220;
            // Pull nodes slightly towards cursor
            node.x += dx * force * 0.08;
            node.y += dy * force * 0.08;
          }
        }

        // Draw node dot
        ctx.fillStyle = "rgba(161, 161, 170, 0.4)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection lines between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.15;
            ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    />
  );
}
