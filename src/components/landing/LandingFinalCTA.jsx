// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LandingFinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#1b4332] py-20 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get organized?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Start free today. No credit card needed. See what QBtron can do.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate(createPageUrl('Dashboard'))}
              className="bg-white text-[#1b4332] hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-lg"
            >
              Start free now
            </Button>
          </div>
        </motion.div>

        {/* Student Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Students studying"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b4332]/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}