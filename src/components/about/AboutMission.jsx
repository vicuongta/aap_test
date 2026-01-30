import React from 'react';
import { AnimatedSection, GREEN } from './AnimatedComponents';

export default function AboutMission() {
    return (
        <section className="py-16 px-6">
            <AnimatedSection className="mx-auto max-w-4xl">
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur">
                    <div className="absolute -top-4 left-8">
                        <div
                            className="rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wider"
                            style={{ backgroundColor: GREEN, color: 'white' }}
                        >
                            Our Mission
                        </div>
                    </div>
                    <p className="text-xl text-white/90 leading-relaxed italic mt-4">
                        "To democratize academic success by providing every student with intelligent,
                        intuitive tools that adapt to their unique learning journey—because your
                        potential shouldn't be limited by the tools available to you."
                    </p>
                </div>
            </AnimatedSection>
        </section>
    );
}
