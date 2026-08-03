"use client";

import styles from "./AuroraBackground.module.css";

export default function AuroraBackground() {
    return (
        <div className={styles.wrapper}>

            {/* Main Luxury Brown Glow */}
            <div className={`${styles.orb} ${styles.orbOne}`}></div>

            {/* Soft Golden Glow */}
            <div className={`${styles.orb} ${styles.orbTwo}`}></div>

            {/* Aurora Blue Accent */}
            <div className={`${styles.orb} ${styles.orbThree}`}></div>

            {/* Center Ambient Light */}
            <div className={styles.centerGlow}></div>

            {/* Top Ambient Fog */}
            <div className={styles.topFog}></div>

            {/* Bottom Ambient Fog */}
            <div className={styles.bottomFog}></div>

            {/* Dark Overlay */}
            <div className={styles.overlay}></div>

        </div>
    );
}