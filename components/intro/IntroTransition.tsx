"use client";

import { AnimatePresence, motion } from "framer-motion";

type IntroTransitionProps = {
    active: boolean;
};

export default function IntroTransition({
    active,
}: IntroTransitionProps) {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ 
                        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                        WebkitClipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                        backgroundColor: "#8B5A2B"
                    }}
                    animate={{ 
                        clipPath: "polygon(50% -150%, 250% 50%, 50% 250%, -150% 50%)",
                        WebkitClipPath: "polygon(50% -150%, 250% 50%, 50% 250%, -150% 50%)",
                        backgroundColor: "#030303"
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 1.2, 
                        ease: [0.76, 0, 0.24, 1] 
                    }}
                    className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
                >
                    {/* Glowing Aura inside the expanding diamond */}
                    <motion.div 
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,90,43,0.3)_0%,transparent_60%)]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        transition={{ duration: 1.2 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}