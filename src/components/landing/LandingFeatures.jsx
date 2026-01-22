import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    text: "See your week clearly",
    description: "Every class, deadline, and task—organized in a single view you can trust."
  },
  {
    text: "Know what matters today",
    description: "Priorities surface automatically so you focus on what's urgent, not overwhelming."
  },
  {
    text: "Plan without stress",
    description: "Build a schedule that fits your energy, not just your calendar."
  },
  {
    text: "Make steady progress",
    description: "Track completion and momentum across all your courses in real time."
  }
];

export default function LandingFeatures() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {feature.text}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="aspect-[4/3] rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
                  <img
                    src={[
                      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
                      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
                      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
                      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
                    ][index]}
                    alt="Student workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}