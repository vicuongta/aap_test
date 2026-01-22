import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LandingFinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-12">
            Clarity beats hustle.
          </h2>
          <Button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-12 py-7 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Create your schedule
          </Button>
          <p className="text-sm text-gray-500 mt-6">
            Free to start. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}