// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";

/**
 * FloatingWrapper - Creates a smooth, organic anti-gravity floating effect
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to wrap
 * @param {number} props.index - Index for desynchronization (0, 1, 2, etc.)
 * @param {number} props.floatDistance - How far to float in pixels (default: 15)
 * @param {number} props.duration - Animation duration in seconds (default: 4)
 * @param {string} props.className - Additional CSS classes
 */
export default function FloatingWrapper({
    children,
    index = 0,
    floatDistance = 15,
    duration = 4,
    className = "",
}) {
    // Desynchronize each card with staggered delay based on index
    const delay = index * 0.7;

    // Vary duration slightly per card for more organic feel
    const cardDuration = duration + (index * 0.3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: [0, -floatDistance, 0]
            }}
            transition={{
                opacity: {
                    duration: 0.6,
                    delay: delay * 0.5,
                    ease: "easeOut"
                },
                y: {
                    duration: cardDuration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: delay,
                },
            }}
            whileHover={{
                scale: 1.02,
                y: -floatDistance / 2,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
