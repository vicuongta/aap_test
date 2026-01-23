import React from 'react';
import { motion } from 'framer-motion';
import { Square, BarChart3, ChevronRight } from 'lucide-react';

export default function LandingColorCoded() {
    return (
        <section className="py-20 md:py-24 px-6 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">
                            Organize
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            Color-coded tasks and<br />course tracking
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
                            Visual organization makes everything clearer. Track your courses and see your progress at a glance with color-coded tasks that match your academic life.
                        </p>

                        {/* Feature Icons */}
                        <div className="flex gap-12 mb-8">
                            <div className="flex flex-col items-start">
                                <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center mb-2">
                                    <Square className="w-5 h-5 text-gray-700" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Visual</span>
                                <span className="text-xs text-gray-500 mt-1 max-w-[120px]">
                                    Color codes help you identify tasks by course effortlessly
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center mb-2">
                                    <BarChart3 className="w-5 h-5 text-gray-700" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Progress</span>
                                <span className="text-xs text-gray-500 mt-1 max-w-[120px]">
                                    Monitor your academic performance across all your courses
                                </span>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-gray-900 hover:underline">
                                Learn
                            </a>
                            <a href="#" className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-900">
                                Explore <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="rounded-2xl overflow-hidden bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                alt="Students collaborating"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
