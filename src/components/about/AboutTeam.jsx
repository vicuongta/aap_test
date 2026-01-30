import React from 'react';
import { Heart, Lightbulb, Rocket, Target, Users } from 'lucide-react';
import { AnimatedSection, AnimatedCard, GREEN } from './AnimatedComponents';

// Team members data
const teamMembers = [
    {
        name: "Alex Chen",
        role: "Founder & CEO",
        story: "As a first-generation college student, Alex struggled to balance academics, work, and personal life. After nearly burning out during sophomore year, Alex created the first version of QBtron to help manage overwhelming course loads. That personal tool became the foundation for what QBtron is today.",
        icon: Lightbulb,
    },
    {
        name: "Maya Rodriguez",
        role: "Head of Product",
        story: "Maya was a pre-med student juggling organic chemistry, MCAT prep, and volunteer hours. She joined QBtron after using an early beta and experiencing firsthand how it transformed her study habits. Now she's dedicated to making that transformation accessible to every student.",
        icon: Heart,
    },
    {
        name: "Jordan Williams",
        role: "Lead Developer",
        story: "Jordan built their first app to track homework assignments in high school. When they discovered QBtron's mission to help students succeed, they knew they'd found their calling. Jordan believes technology should adapt to how students actually learn, not the other way around.",
        icon: Rocket,
    },
    {
        name: "Sarah Kim",
        role: "UX Designer",
        story: "Sarah nearly dropped out of design school due to overwhelming project deadlines. She redesigned her own workflow system and her grades soared. Now she brings that same user-centered approach to QBtron, ensuring every interaction feels intuitive and stress-free.",
        icon: Target,
    },
    {
        name: "Marcus Thompson",
        role: "Community Lead",
        story: "As a peer tutor, Marcus saw countless students struggle not with the material, but with organization. He joined QBtron to build a community where students support each other. His mission: no student should ever feel alone in their academic journey.",
        icon: Users,
    },
];

export default function AboutTeam() {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
            <div className="mx-auto max-w-6xl">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        The People Behind QBtron
                    </h2>
                    <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
                        We're students, former students, and lifelong learners who understand the challenges you face—because we've been there.
                    </p>
                </AnimatedSection>

                <div className="flex flex-wrap justify-center gap-8">
                    {teamMembers.map((member, index) => {
                        const Icon = member.icon;
                        return (
                            <AnimatedCard
                                key={member.name}
                                index={index}
                                className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/[0.08] transition-all w-full md:w-[calc(33.333%-1.5rem)] md:max-w-[350px]"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${GREEN}30` }}>
                                        <Icon className="h-6 w-6" style={{ color: GREEN }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                                        <p className="text-sm text-white/50">{member.role}</p>
                                    </div>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed">{member.story}</p>
                            </AnimatedCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
