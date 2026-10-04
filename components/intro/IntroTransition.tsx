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
                <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
                    {/* GPU-accelerated Luxury Diamond expanding smoothly with zero flicker */}
                    <motion.div
                        initial={{ 
                            scale: 0,
                            opacity: 0,
                            rotate: 45
                        }}
                        animate={{ 
                            scale: [0, 0.7, 4],
                            opacity: [1, 1, 1]
                        }}
                        transition={{ 
                            duration: 0.85, 
                            ease: [0.76, 0, 0.24, 1] 
                        }}
                        style={{ willChange: "transform" }}
                        className="w-[120vmax] h-[120vmax] bg-[#030303] border-2 border-[#D2B48C]/90 shadow-[0_0_100px_rgba(210,180,140,0.5),inset_0_0_80px_rgba(139,90,43,0.3)] flex items-center justify-center"
                    />
                </div>
            )}
        </AnimatePresence>
    );
}