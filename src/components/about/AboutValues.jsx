import React from 'react';
import { GraduationCap, Clock, Target } from 'lucide-react';
import { AnimatedSection, AnimatedCard } from './AnimatedComponents';

// Core values data
const values = [
    {
        title: "Student-First Design",
        description: "Every feature is built with real student challenges in mind. We listen, iterate, and improve based on what actually helps you succeed.",
        icon: GraduationCap,
    },
    {
        title: "Mindful Productivity",
        description: "We don't believe in hustle culture. QBtron promotes balanced workflows, strategic breaks, and sustainable study habits.",
        icon: Clock,
    },
    {
        title: "Accessible Excellence",
        description: "Great tools shouldn't require a premium. We're committed to keeping QBtron accessible to all students, regardless of background.",
        icon: Target,
    },
];

export default function AboutValues() {
    return (
        <section className="py-20 px-6">
            <div className="mx-auto max-w-5xl">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        What We Stand For
                    </h2>
                    <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
                        Our values guide every decision we make and every feature we build.
                    </p>
                </AnimatedSection>

                <div className="grid gap-6 md:grid-cols-3">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <AnimatedCard key={value.title} index={index} className="text-center p-6">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                                    <Icon className="h-7 w-7 text-white/80" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                            </AnimatedCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
