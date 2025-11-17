"use client";

import { motion } from "framer-motion";

export default function SectionDivider({
  from = "#ffffff",
  to = "#fcf8fe", // color base translúcido
  height = 100,
  opacity = 0.6,
}: {
  from?: string;
  to?: string;
  height?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full overflow-hidden z-40 pointer-events-none"
      style={{
        height: `${height}px`,
        marginTop: `-${height/2}px`,
        marginBottom: `-${height/2}px`,
      }}
    >
      {/* Gradiente principal translúcido */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${from} 0%, ${to} 50%, ${to} 100%)`,
          opacity,
          backdropFilter: 'blur(15px)',
        }}
      />
      
      {/* Overlay suave para transición */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${to}15 30%, ${to}25 70%, transparent 100%)`,
          backdropFilter: 'blur(10px)',
        }}
      />
      
      {/* Efecto de luz difusa */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${to}20 0%, transparent 70%)`,
          mixBlendMode: "soft-light",
        }}
      />
    </motion.div>
  );
}

