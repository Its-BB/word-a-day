"use client";

import React from "react";
import Image from "next/image";

const icons = [
    { src: "/globe.svg", style: { top: "10%", left: "5%", width: 48, animationDelay: "0s" } },
    { src: "/file.svg", style: { top: "60%", left: "10%", width: 36, animationDelay: "2s" } },
    { src: "/window.svg", style: { top: "30%", left: "80%", width: 40, animationDelay: "1s" } },
    { src: "/next.svg", style: { top: "75%", left: "70%", width: 60, animationDelay: "3s" } },
    { src: "/vercel.svg", style: { top: "15%", left: "60%", width: 54, animationDelay: "1.5s" } },
];

export default function FloatingIcons() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {icons.map((icon, i) => (
                <Image
                    key={i}
                    src={icon.src}
                    alt="floating icon"
                    width={icon.style.width}
                    height={icon.style.width}
                    style={{
                        position: "absolute",
                        ...icon.style,
                        opacity: 0.08,
                        filter: "none",
                        animation: `floatIcon 16s ease-in-out infinite alternate ${icon.style.animationDelay}`,
                        willChange: 'transform',
                        transition: 'filter 0.3s',
                    }}
                    className="floating-icon"
                />
            ))}
            <style jsx global>{`
        @keyframes floatIcon {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          20% { transform: translateY(-24px) scale(1.07) rotate(-10deg); }
          50% { transform: translateY(12px) scale(0.97) rotate(10deg); }
          80% { transform: translateY(-18px) scale(1.04) rotate(-6deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
      `}</style>
        </div>
    );
} 