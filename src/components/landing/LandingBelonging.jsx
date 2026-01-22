import React from 'react';
import { motion } from 'framer-motion';

const identities = [
  "Built for students juggling heavy course loads",
  "Made for planners, overthinkers, and busy weeks",
  "Used across multiple majors and schedules"
];

export default function LandingBelonging() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#f6f8f6]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {identities.map((identity, index) => (
            <div
              key={index}
              className="text-2xl lg:text-3xl font-medium text-gray-700 text-center"
            >
              {identity}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}