import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp } from 'lucide-react';

export default function LandingIntelligence() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Works in the background.
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            QBtron automatically organizes tasks, highlights priorities, and helps you plan realistically—without constant input or micromanagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-8"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-[#2d6a4f]" />
            </div>
            <div className="text-sm font-medium text-gray-900">Auto-organize</div>
            <div className="text-sm text-gray-600">Tasks sort by urgency and course</div>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-[#2d6a4f]" />
            </div>
            <div className="text-sm font-medium text-gray-900">Smart priorities</div>
            <div className="text-sm text-gray-600">See what needs attention now</div>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-[#2d6a4f]" />
            </div>
            <div className="text-sm font-medium text-gray-900">Realistic planning</div>
            <div className="text-sm text-gray-600">Balance workload across your week</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}