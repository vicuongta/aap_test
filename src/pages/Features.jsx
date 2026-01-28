// @ts-nocheck
// src/pages/Features.jsx
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { Bot, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper to render visuals for each feature
const FeatureVisual = ({ type }) => {
    if (type === 'ai') {
        return (
            <div className="relative w-full aspect-video bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm p-6 flex flex-col gap-4">
                {/* Chat Interface Mockup */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="bg-neutral-800 rounded-2xl rounded-tl-none p-4 max-w-[80%] border border-white/5">
                        <p className="text-sm text-neutral-300">How can I help you organize your schedule today?</p>
                    </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-neutral-700/50 shrink-0" />
                    <div className="bg-[#2d6a4f]/20 rounded-2xl rounded-tr-none p-4 max-w-[80%] border border-[#2d6a4f]/30">
                        <p className="text-sm text-neutral-200">I have a math quiz on Friday and need to study.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="bg-neutral-800 rounded-2xl rounded-tl-none p-4 max-w-[80%] border border-white/5">
                        <p className="text-sm text-neutral-300">I've blocked out 2 hours tomorrow morning for "Linear Algebra Review". Should I add a reminder?</p>
                    </div>
                </div>
            </div>
        );
    }
    if (type === 'tasks') {
        return (
            <div className="relative w-full aspect-video bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm p-6">
                {/* Task List Mockup */}
                <div className="space-y-3">
                    {[
                        { text: "Complete BST Assignment", tag: "High", color: "text-red-400 bg-red-400/10" },
                        { text: "Read Chapter 4 History", tag: "Medium", color: "text-orange-400 bg-orange-400/10" },
                        { text: "Email Professor", tag: "Low", color: "text-green-400 bg-green-400/10" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full border-2 border-neutral-600" />
                                <span className="text-sm text-neutral-200">{item.text}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full border border-white/5 ${item.color}`}>
                                {item.tag}
                            </span>
                        </div>
                    ))}
                    <div className="flex items-center justify-center mt-4">
                        <div className="h-8 w-8 rounded-full bg-[#2d6a4f] flex items-center justify-center cursor-pointer hover:bg-[#2d6a4f]/80 transition">
                            <span className="text-white text-lg">+</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (type === 'schedule') {
        return (
            <div className="relative w-full aspect-video bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm p-6">
                {/* Calendar Mockup */}
                <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <span key={d} className="text-xs text-neutral-500">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className={`aspect-square rounded-md flex items-center justify-center text-xs ${i === 4 ? 'bg-[#2d6a4f] text-white' : 'text-neutral-400 bg-neutral-800/30'}`}>
                            {10 + i}
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-3 bg-neutral-800/50 rounded-lg border-l-2 border-[#2d6a4f]">
                    <div className="text-xs text-neutral-400">10:00 AM - 11:30 AM</div>
                    <div className="text-sm font-medium text-white">Advanced Calculus</div>
                </div>
            </div>
        );
    }
    return null;
};


const features = [
    {
        title: 'AI Assistant',
        description: 'Your personal academic companion. Get smart, personalized study suggestions based on your workload, learning style, and schedule. It adapts to you, ensuring you are always working on what matters most.',
        id: 'ai-assistant',
        type: 'ai',
        icon: Bot,
    },
    {
        title: 'Task Tracking',
        description: 'Break down complex assignments into manageable steps. Prioritize due dates, tag subjects, and never lose track of a deadline again with our intelligent task management system.',
        id: 'task-tracking',
        type: 'tasks',
        icon: CheckCircle2,
    },
    {
        title: 'Schedule View',
        description: 'Visualize your week at a glance. Integrate classes, study blocks, and personal time into one cohesive view. Drag and drop events to reschedule instantly when life happens.',
        id: 'schedule-view',
        type: 'schedule',
        icon: Calendar,
    },
];

const Features = () => {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col">
            <Navbar />

            <main className="flex-grow relative">
                {/* Background Vignette */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(45,106,79,0.15),transparent_70%)]" />
                </div>

                <div className="max-w-6xl mx-auto px-6 pt-24 pb-2 relative z-10">
                    {/* Page Heading */}
                    <div className="text-center mb-20">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                            Smarter Tools for <br /> <span className="text-white/50">Smarter Students</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            QBtron helps you stay organized and on top of your studies with AI-powered planning tools designed for the modern student.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="flex flex-col gap-24">
                        {features.map((feature, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    id={feature.id}
                                    className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Visual Side */}
                                    <div className="w-full md:w-1/2">
                                        <FeatureVisual type={feature.type} />
                                    </div>

                                    {/* Text Side */}
                                    <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                                        <div className="bg-neutral-900/80 p-3 rounded-xl border border-white/10 inline-flex mb-6">
                                            <feature.icon className="w-6 h-6 text-[#40916c]" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                                        <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                                            {feature.description}
                                        </p>
                                        <Button variant="link" className="text-[#40916c] hover:text-[#2d6a4f] p-0 text-base">
                                            Learn more <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-24 py-16 border-t border-neutral-900">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to organize your academic life?</h2>
                        <div className="flex justify-center gap-4">
                            <Button className="bg-[#2d6a4f] hover:bg-[#2d6a4f]/90 text-white rounded-full px-8 py-6 text-lg">
                                Get Started Free
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Features;