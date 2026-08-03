"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AuroraBackground from "./AuroraBackground";
import FloatingParticles from "./FloatingParticles";

import styles from "./AuroraIntro.module.css";
import MouseGlow from "./MouseGlow";
import IntroTransition from "./IntroTransition";

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

    const handleEnter = () => {

        setTransition(true);

        setTimeout(() => {

            console.log("Homepage Ready");
            if (onComplete) onComplete();

        }, 1200);

    };

    return (

        <section className={styles.intro}>

            <AuroraBackground />

            <MouseGlow />


            <div className={styles.overlay}></div>

            <div className={styles.geometricContainer}>
                <div className={styles.triangle}></div>
            </div>

            <div className={styles.content}>

                <motion.h1

                    className={styles.title}

                    initial={{
                        opacity: 0,
                        filter: "blur(30px)",
                        scale: 1.15
                    }}

                    animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1
                    }}

                    transition={{
                        duration: 1.2
                    }}

                >

                    {displayText}

                </motion.h1>

                <AnimatePresence>

                    {

                        showContent && (

                            <motion.div 
                                className="flex flex-col items-center w-full"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: transition ? 0 : 1, scale: transition ? 0.9 : 1 }}
                                transition={{ duration: 0.3 }}
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
                                    className="group relative inline-flex items-center justify-center gap-2 md:gap-4 px-6 md:px-10 py-3 md:py-4 bg-[#030303] text-[#D2B48C] border border-[#8B5A2B]/40 uppercase tracking-[4px] md:tracking-[6px] text-xs md:text-sm font-black transition-all duration-700 hover:bg-[#8B5A2B]/10 overflow-hidden mt-12 md:mt-16 w-[90%] md:w-auto mx-auto max-w-sm"
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

            <IntroTransition active={transition} />

        </section>

    );

}