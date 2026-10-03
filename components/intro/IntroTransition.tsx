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
                    {/* GPU-accelerated Diamond expanding smoothly without polygon clip-path glitches */}
                    <motion.div
                        initial={{ 
                            scale: 0,
                            opacity: 0,
                            rotate: 45
                        }}
                        animate={{ 
                            scale: [0, 0.8, 4.5],
                            opacity: [0.9, 1, 1]
                        }}
                        transition={{ 
                            duration: 0.9, 
                            ease: [0.76, 0, 0.24, 1] 
                        }}
                        className="w-[120vmax] h-[120vmax] bg-[#030303] border-4 border-[#8B5A2B] shadow-[0_0_120px_rgba(210,180,140,0.6)] flex items-center justify-center"
                    >
                        {/* Golden Illuminati glow aura inside expanding diamond */}
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,90,43,0.45)_0%,rgba(3,3,3,0.95)_70%)]" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}