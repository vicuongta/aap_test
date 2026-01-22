import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, CheckSquare, Clock } from 'lucide-react';

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#0f172a] pt-24 pb-32 px-6 lg:px-12">
      {/* Full background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=80"
          alt="Student studying"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#0f172a]/70 to-[#1b4332]/30"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Plan your academic life—your way.
            </h1>
            <p className="text-xl text-white/85 mb-8 leading-relaxed">
              QBtron helps students organize schedules, deadlines, and study time in one clear workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate(createPageUrl('Dashboard'))}
                className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-8 py-6 text-lg rounded-xl"
              >
                Get started free
              </Button>
              <Button
                variant="outline"
                className="bg-white text-gray-900 border-2 border-white hover:bg-gray-50 px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                See how it works
              </Button>
            </div>
          </motion.div>

          {/* Right: Dynamic Product Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Layered cards with depth */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[340px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Today's Schedule</div>
                  <div className="text-xs text-gray-500">Monday, Jan 13</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-[#e0e7ff] border border-[#c7d2fe] rounded-lg p-3">
                  <div className="text-sm font-medium text-[#4338ca]">CS301 Lecture</div>
                  <div className="text-xs text-[#4338ca]/70 mt-1">9:00 AM - 10:30 AM</div>
                </div>
                <div className="bg-[#dbeafe] border border-[#bfdbfe] rounded-lg p-3">
                  <div className="text-sm font-medium text-[#1e40af]">Study Session</div>
                  <div className="text-xs text-[#1e40af]/70 mt-1">2:00 PM - 4:00 PM</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-32 left-0 w-[320px] bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Upcoming Deadlines</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <div className="text-sm text-gray-900">BST Assignment</div>
                    <div className="text-xs text-gray-500">CS301</div>
                  </div>
                  <div className="text-xs font-medium text-red-600">2 days</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <div className="text-sm text-gray-900">Linear Algebra Quiz</div>
                    <div className="text-xs text-gray-500">MATH201</div>
                  </div>
                  <div className="text-xs font-medium text-amber-600">5 days</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 right-8 w-[280px] bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#2d6a4f]" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Focus Timer</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">25:00</div>
                <div className="text-xs text-gray-500">Study mode</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}