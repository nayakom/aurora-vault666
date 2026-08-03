"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const move = (event: MouseEvent) => {
            if (glowRef.current) {
                // Using transform translate3d instead of left/top forces GPU acceleration
                // and avoids triggering layout recalculations (which causes lag).
                glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        window.addEventListener("mousemove", move, { passive: true });
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div
            ref={glowRef}
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: 260,
                height: 260,
                transform: "translate3d(-500px, -500px, 0) translate(-50%, -50%)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 3,

                background:
                    "radial-gradient(circle, rgba(210,180,140,0.15) 0%, rgba(139,90,43,0.05) 30%, transparent 60%)",
            }}
        />

    );

}