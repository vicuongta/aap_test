import React, { useEffect, useRef, useState } from 'react';

const GREEN = "#2d6a4f";

// Reusable animated section component (motion up)
export function AnimatedSection({ children, className = "", delay = 0 }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`transition-all duration-700 ease-out ${className} ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// Animated card with staggered delay
export function AnimatedCard({ children, className = "", index = 0 }) {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-600 ease-out ${className} ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {children}
        </div>
    );
}

export { GREEN };
