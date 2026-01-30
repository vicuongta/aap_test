import React from 'react';
import { AnimatedSection } from './AnimatedComponents';

export default function AboutHero() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(45,106,79,0.25),transparent_60%)]" />
            </div>

            <AnimatedSection className="relative mx-auto max-w-4xl px-6 text-center">
                <h1 className="text-5xl font-bold text-white md:text-6xl">
                    Our Story
                </h1>
                <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                    QBtron was born from a simple belief: every student deserves the tools to transform
                    academic chaos into clarity. We're not just building software—we're building a
                    community that empowers students to achieve their dreams.
                </p>
            </AnimatedSection>
        </section>
    );
}
