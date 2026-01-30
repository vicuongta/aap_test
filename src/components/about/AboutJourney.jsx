import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Users, Brain, Award } from 'lucide-react';
import { GREEN } from './AnimatedComponents';

// Milestone data
const milestones = [
    {
        year: "2022",
        title: "The Spark",
        description: "QBtron began as a simple notion template, created by a struggling student who needed a better way to track assignments. What started as a personal tool quickly gained attention from classmates.",
        icon: Sparkles,
    },
    {
        year: "2023",
        title: "Growing Together",
        description: "Our first 1,000 users joined the platform. Their feedback shaped every feature we built. We learned that students don't just need organization—they need motivation, support, and smart tools that understand their unique challenges.",
        icon: Users,
    },
    {
        year: "2024",
        title: "AI-Powered Learning",
        description: "We introduced our AI assistant, trained to understand academic workflows. Suddenly, students could get personalized study recommendations, deadline predictions, and task breakdowns tailored to their learning style.",
        icon: Brain,
    },
    {
        year: "2025",
        title: "Empowering Success",
        description: "Today, QBtron helps thousands of students transform stress into success. Our community reports 40% less academic anxiety and 60% better assignment completion rates. This is just the beginning.",
        icon: Award,
    },
];

// Animated milestone card component
function MilestoneCard({ milestone, Icon, isLeft }) {
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
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Content */}
            <div
                className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} transition-all duration-700 ease-out ${isVisible
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${isLeft ? 'md:-translate-x-16' : 'md:translate-x-16'}`
                    }`}
            >
                <div className="inline-block rounded-lg border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3" style={{ flexDirection: isLeft ? 'row-reverse' : 'row' }}>
                        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: GREEN }}>
                            {milestone.year}
                        </span>
                        <Icon className="h-5 w-5 text-white/60" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{milestone.description}</p>
                </div>
            </div>

            {/* Center dot */}
            <div className={`hidden md:flex h-4 w-4 rounded-full border-2 border-white/30 bg-neutral-950 z-10 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`} />

            {/* Spacer */}
            <div className="flex-1 hidden md:block" />
        </div>
    );
}

export default function AboutJourney() {
    return (
        <section className="py-20 px-6">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-white text-center mb-4">
                    Our Journey
                </h2>
                <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
                    From a stressed student's side project to a platform helping thousands—every step has been guided by our community.
                </p>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => {
                            const Icon = milestone.icon;
                            const isLeft = index % 2 === 0;

                            return (
                                <MilestoneCard
                                    key={milestone.year}
                                    milestone={milestone}
                                    Icon={Icon}
                                    isLeft={isLeft}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
