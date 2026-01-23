// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";

const stats = [
    { value: "45%", label: "More time studying" },
    { value: "72%", label: "Less stress overall" },
    { value: "89%", label: "Better course tracking" },
];

export default function LandingStats() {
    return (
        <section className="bg-white py-20 md:py-24 px-6 border-t border-gray-100">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-12"
                >
                    Students get more done with QBtron
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-8"
                        >
                            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
