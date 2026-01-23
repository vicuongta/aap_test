// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        stars: 5,
        text: "QBtron made my chaotic schedule feel manageable. I actually know what I'm doing each week now!",
        name: "Sarah Chen",
        role: "Engineering student",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
        stars: 5,
        text: "The color-coded views are my favorite from study candidates. I'm more organized now than I've ever been!",
        name: "Marcus Webb",
        role: "Business major",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
        stars: 5,
        text: "The focus timer keeps me honest. I actually finish what I set out to do instead of stressing my school.",
        name: "Emily Rodriguez",
        role: "Pre-med student",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
];

export default function LandingTestimonials() {
    return (
        <section className="bg-white py-20 md:py-24 px-6 border-t border-gray-100">
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Real stories
                    </h2>
                    <p className="text-sm text-gray-500 mb-10">
                        From students who took control
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 text-left"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-sm">★</span>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
