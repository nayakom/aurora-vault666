"use client";

import { useEffect, useState } from "react";

type Particle = {
    left: number;
    top: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    color: string;
};

export default function FloatingParticles() {

    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {

        const colors = [
            "#8B5A2B", // Premium Gold
            "#D2B48C", // Light Gold
            "#5C4033", // Dark Goldenrod
            "#00ffcc", // Neon Cyan (mysterious touch)
            "#111111", // Dark dust
        ];

        const generated: Particle[] = Array.from({ length: 90 }, () => ({

            left: Math.random() * 100,

            top: Math.random() * 100,

            size: 2 + Math.random() * 5,

            duration: 10 + Math.random() * 12,

            delay: Math.random() * 8,

            opacity: 0.2 + Math.random() * 0.7,

            color: colors[Math.floor(Math.random() * colors.length)],

        }));

        setParticles(generated);

    }, []);

    return (

        <div
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 2,
            }}
        >

            {particles.map((particle, index) => (

                <span
                    key={index}
                    style={{
                        position: "absolute",
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: particle.size,
                        height: particle.size,
                        borderRadius: "50%",
                        opacity: particle.opacity,
                        background: particle.color,
                        boxShadow: `0 0 ${particle.size * 5}px ${particle.color}`,
                        animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
                    }}
                />

            ))}

            <style jsx>{`

                @keyframes floatParticle{

                    0%{

                        transform:
                            translate3d(0,0,0)
                            scale(.9);

                    }

                    25%{

                        transform:
                            translate3d(-18px,-35px,0)
                            scale(1);

                    }

                    50%{

                        transform:
                            translate3d(12px,-70px,0)
                            scale(1.2);

                    }

                    75%{

                        transform:
                            translate3d(-10px,-110px,0)
                            scale(.95);

                    }

                    100%{

                        transform:
                            translate3d(20px,-150px,0)
                            scale(1.1);

                    }

                }

            `}</style>

        </div>

    );

}