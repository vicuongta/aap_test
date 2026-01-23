import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function LandingFocusTimer() {
    return (
        <section className="py-20 md:py-24 px-6 bg-[#fafafa] border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
                {/* Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">
                        Focus
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        Built-in focus timer
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Work in focused intervals with the Pomodoro timer
                    </p>
                </motion.div>

                {/* Feature Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                >
                    <div className="grid lg:grid-cols-2 items-center">
                        {/* Left Content */}
                        <div className="p-8 lg:p-12">
                            <span className="text-xs uppercase tracking-widest text-gray-400 mb-4 block">
                                Timer
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Pomodoro-style focus<br />sessions
                            </h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
                                Study better by working smarter. The timer keeps you accountable and your mind alert by every session.
                            </p>

                            {/* Links */}
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-gray-900 hover:underline">
                                    Start
                                </a>
                                <a href="#" className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-900">
                                    Explore <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-full min-h-[300px] lg:min-h-[350px]">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop"
                                alt="Students working with focus"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
