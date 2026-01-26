// @ts-nocheck
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How does QBtron work?",
        answer: "QBtron gives you three integrated views of your academic life. Your fixed schedule shows recurring tasks and weekly goals. The flexible task panel holds AI-generated suggestions and manual tasks you create. The interactive calendar lets you drag tasks to schedule them exactly when you need them. Everything syncs in real time."
    },
    {
        question: "Can I use it on mobile?",
        answer: "QBtron is optimized for desktop and tablet use right now. We're building mobile apps for iOS and Android. For now, the responsive web design works well on phones for checking your schedule and quick updates."
    },
    {
        question: "Is there a free trial?",
        answer: "Yes. Start free with full access to all core features, no credit card required. You get 30 days to explore everything QBtron offers before deciding if a paid plan makes sense for you."
    },
    {
        question: "How does the AI assistant help?",
        answer: "The floating AI learns your study habits and schedule. It suggests optimal study times, recommends break intervals, and helps you plan your week based on your course load and deadlines. Think of it as a study coach that's always available."
    },
    {
        question: "Can I share my schedule?",
        answer: "You can export your schedule and share it with classmates or study groups. Collaboration features are coming soon. For now, you control what you share and with whom."
    },
];

export default function LandingFAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20 md:py-24 px-6 border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        FAQ
                    </h2>
                    <p className="text-gray-500">
                        Everything you need to know about getting started
                    </p>
                </motion.div>

                <div className="space-y-0">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="border-b border-gray-200"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center py-5 text-left hover:text-gray-600 transition-colors"
                            >
                                <span className="text-sm md:text-base font-semibold text-gray-900">
                                    {faq.question}
                                </span>
                                <span className="text-xl text-gray-400 ml-4">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-16"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Still have questions?
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Reach out to our team anytime
                    </p>
                    <a
                        href="mailto:contact@qbtron.com"
                        className="text-sm font-medium text-gray-900 hover:text-gray-600 underline transition-colors"
                    >
                        Contact
                    </a>
                </motion.div> */}
            </div>
        </section>
    );
}
