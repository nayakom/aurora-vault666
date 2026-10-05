"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AuroraBackground from "./AuroraBackground";
import FloatingParticles from "./FloatingParticles";

import styles from "./AuroraIntro.module.css";
import MouseGlow from "./MouseGlow";

const LOGO = "AURORA";

interface AuroraIntroProps {
    onComplete?: () => void;
}

export default function AuroraIntro({ onComplete }: AuroraIntroProps) {

    const [displayText, setDisplayText] = useState("");
    const [taglineText, setTaglineText] = useState("");

    const [showContent, setShowContent] = useState(false);

    const [transition, setTransition] = useState(false);

    useEffect(() => {

        let current = 0;

        const timer = setInterval(() => {

            current++;

            setDisplayText(LOGO.slice(0, current));

            if (current >= LOGO.length) {

                clearInterval(timer);

                setTimeout(() => {

                    setShowContent(true);

                }, 800);

            }

        }, 260);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {
        if (showContent) {
            let current = 0;
            const TAGLINE = "Discover Smarter.\nShop Better.";
            const timer = setInterval(() => {
                current++;
                setTaglineText(TAGLINE.slice(0, current));
                if (current >= TAGLINE.length) {
                    clearInterval(timer);
                }
            }, 40); // Faster speed for smaller letters
            return () => clearInterval(timer);
        }
    }, [showContent]);

    const [isEntering, setIsEntering] = useState(false);
    type TransitionStage = "idle" | "collapse" | "eye_blink" | "portal_zoom";
    const [stage, setStage] = useState<TransitionStage>("idle");

    const LOGO_LETTERS = ["A", "U", "R", "O", "R", "A"];

    const handleEnter = () => {
        if (isEntering) return;
        setIsEntering(true);
        setStage("collapse");

        // Step 2: Letters collapse into last "A" in the center (550ms)
        setTimeout(() => {
            setStage("eye_blink");
        }, 550);

        // Step 3: Illuminati Logo appears & eye blinks (600ms)
        setTimeout(() => {
            setStage("portal_zoom");
        }, 1150);

        // Step 4: Portal zoom into Hero section
        setTimeout(() => {
            console.log("Homepage Ready");
            if (onComplete) onComplete();
        }, 1800);
    };

    return (

        <section className={`${styles.intro} touch-none select-none overscroll-none`}>

            <AuroraBackground />

            <MouseGlow />

            <div className={styles.overlay}></div>

            {/* Background Geometric Triangle: gently fades out when entering */}
            <motion.div 
                className={styles.geometricContainer}
                animate={{ opacity: stage === "idle" ? 0.4 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.triangle}></div>
            </motion.div>

            <div className={styles.content}>

                {/* Main Logo / Letters & Illuminati Portal Container */}
                <div className="relative flex items-center justify-center min-h-[160px] md:min-h-[220px]">
                    
                    {/* Aurora Individual Letters */}
                    <div className={`relative flex items-center justify-center overflow-visible ${styles.title} ${stage === 'idle' ? styles.titleFloating : ''}`}>
                        {LOGO_LETTERS.map((char, index) => {
                            const isVisible = index < displayText.length;
                            const isLastA = index === 5;
                            const isCollapsing = stage !== "idle";

                            if (!isVisible) return null;

                            return (
                                <motion.span
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        filter: "blur(20px)",
                                        scale: 1.15
                                    }}
                                    animate={
                                        isCollapsing
                                            ? isLastA
                                                ? {
                                                    scale: stage === "collapse" ? [1, 1.25, 1] : 0.8,
                                                    opacity: stage === "collapse" ? 1 : 0,
                                                    filter: "drop-shadow(0 0 35px rgba(210,180,140,0.95))",
                                                    transition: { duration: 0.5, ease: "easeInOut" }
                                                }
                                                : {
                                                    width: 0,
                                                    opacity: 0,
                                                    scale: 0.2,
                                                    x: 25,
                                                    filter: "blur(8px)",
                                                    paddingLeft: 0,
                                                    paddingRight: 0,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                                                }
                                            : {
                                                opacity: 1,
                                                filter: "blur(0px)",
                                                scale: 1,
                                                transition: { duration: 0.4 }
                                            }
                                    }
                                    className="inline-flex items-center justify-center font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] via-[#D2B48C] to-[#8B5A2B] px-1 sm:px-2 md:px-3 select-none"
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </div>

                    {/* Illuminati Pyramid Eye Logo (Stage: eye_blink and portal_zoom) */}
                    <AnimatePresence>
                        {(stage === "eye_blink" || stage === "portal_zoom") && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={
                                    stage === "portal_zoom"
                                        ? {
                                            scale: [1, 2, 4.5],
                                            opacity: [1, 1, 0],
                                            transition: {
                                                duration: 0.65,
                                                times: [0, 0.45, 1],
                                                ease: [0.76, 0, 0.24, 1]
                                            }
                                        }
                                        : {
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                duration: 0.25,
                                                ease: "easeOut"
                                            }
                                        }
                                }
                                style={{ willChange: "transform, opacity" }}
                                className="absolute z-30 flex items-center justify-center pointer-events-none"
                            >
                                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center">
                                    {/* Golden Ambient Glow */}
                                    <div className="absolute inset-0 bg-[#8B5A2B]/30 blur-2xl rounded-full" />

                                    {/* Expanding Golden Portal Ring during zoom */}
                                    {stage === "portal_zoom" && (
                                        <motion.div
                                            initial={{ scale: 0.6, opacity: 1 }}
                                            animate={{ scale: 5, opacity: 0 }}
                                            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                                            className="absolute inset-0 rounded-full border-2 border-[#D2B48C] shadow-[0_0_60px_rgba(210,180,140,0.8)] pointer-events-none"
                                        />
                                    )}

                                    <svg
                                        viewBox="0 0 100 100"
                                        fill="none"
                                        className="w-full h-full text-[#D2B48C] filter drop-shadow-[0_0_20px_rgba(210,180,140,0.7)] relative z-10"
                                    >
                                        {/* Outer Occult Ring */}
                                        <circle cx="50" cy="55" r="42" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />

                                        {/* Solid dark interior fill for the pyramid */}
                                        <polygon points="50,8 12,85 88,85" fill="#030303" />

                                        {/* Main Pyramid Triangle */}
                                        <path d="M50 8 L12 85 L88 85 Z" stroke="#D2B48C" strokeWidth="2.5" strokeLinejoin="round" />

                                        {/* Capstone Separation */}
                                        <path d="M33 39 L67 39" stroke="#D2B48C" strokeWidth="2" strokeLinecap="round" />

                                        {/* Animated Blinking Eye */}
                                        <motion.g
                                            style={{ transformOrigin: "50px 64px" }}
                                            initial={{ scaleY: 1 }}
                                            animate={{ scaleY: [1, 0.05, 1] }}
                                            transition={{
                                                duration: 0.26,
                                                delay: 0.18,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            {/* Eye Outline */}
                                            <path d="M25 64 Q50 42 75 64 Q50 86 25 64 Z" stroke="#D2B48C" strokeWidth="2" fill="#030303" />

                                            {/* Iris & Pupil */}
                                            <circle cx="50" cy="64" r="7" stroke="#D2B48C" strokeWidth="1.5" fill="#8B5A2B" />
                                            <circle cx="50" cy="64" r="3" fill="#FFF2D6" />
                                        </motion.g>

                                        {/* Golden Eye Flash Flare upon blink */}
                                        <motion.circle
                                            cx="50"
                                            cy="64"
                                            r="14"
                                            fill="url(#eyeFlareGleam)"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 2.5, 0]
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.22,
                                                ease: "easeOut"
                                            }}
                                        />

                                        {/* Mystical Rays emitting from capstone */}
                                        <path d="M50 31 L50 14" stroke="#D2B48C" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
                                        <path d="M43 35 L35 22" stroke="#D2B48C" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
                                        <path d="M57 35 L65 22" stroke="#D2B48C" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />

                                        <defs>
                                            <radialGradient id="eyeFlareGleam" cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stopColor="#FFF2D6" stopOpacity="1" />
                                                <stop offset="50%" stopColor="#D2B48C" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#8B5A2B" stopOpacity="0" />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                <AnimatePresence>

                    {

                        showContent && (

                            <motion.div 
                                className="flex flex-col items-center w-full"
                                initial={{ opacity: 1 }}
                                animate={{ 
                                    opacity: stage === "idle" ? 1 : 0, 
                                    scale: stage === "idle" ? 1 : 0.95,
                                    y: stage === "idle" ? 0 : 25
                                }}
                                transition={{ duration: 0.25 }}
                            >

                                <motion.p

                                    className={styles.tagline}

                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                        filter: "blur(10px)"
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)"
                                    }}

                                    transition={{
                                        duration: .8
                                    }}

                                >

                                    {taglineText.split('\n').map((line, i, arr) => (
                                        <span key={i}>
                                            {line}
                                            {i < arr.length - 1 && <br />}
                                        </span>
                                    ))}

                                </motion.p>

                                <motion.button
                                    className="group relative inline-flex items-center justify-center gap-2 md:gap-4 px-6 md:px-10 py-3 md:py-4 bg-[#030303] text-[#D2B48C] border border-[#8B5A2B]/40 uppercase tracking-[4px] md:tracking-[6px] text-xs md:text-sm font-black transition-all duration-300 hover:bg-[#8B5A2B]/10 overflow-hidden mt-12 md:mt-16 w-[90%] md:w-auto mx-auto max-w-sm cursor-pointer touch-manipulation active:scale-95"
                                    initial={{
                                        opacity: 0,
                                        scale: .75,
                                        y: 40
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay: .25,
                                        duration: .7,
                                        type: "spring",
                                        stiffness: 130
                                    }}
                                    whileTap={{
                                        scale: .95
                                    }}
                                    onClick={handleEnter}
                                >
                                    {/* Shimmer Effect and Light Corners */}
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#8B5A2B]/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#D2B48C] transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-opacity-30" />
                                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#D2B48C] transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-opacity-30" />

                                    {/* Illuminati Eye/Triangle SVG */}
                                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 md:w-5 md:h-5 text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-500 group-hover:rotate-180 flex-shrink-0">
                                        <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>

                                    <span className="relative z-10 drop-shadow-[0_0_8px_rgba(210,180,140,0.8)] whitespace-nowrap text-center">ENTER AURORA</span>

                                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 md:w-5 md:h-5 text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-500 group-hover:-rotate-180 flex-shrink-0">
                                        <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </motion.button>

                            </motion.div>

                        )

                    }

                </AnimatePresence>

            </div>

        </section>

    );

}