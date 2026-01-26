// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FloatingWrapper from "@/components/ui/FloatingWrapper";

const GREEN = "#2d6a4f";

export default function LandingHero() {
  const navigate = useNavigate();

  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 min-h-[85vh] flex items-start justify-center" style={{ paddingTop: '6vh' }}>
      {/* background vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_50%_0%,rgba(120,40,40,0.30),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_0%_100%,rgba(45,106,79,0.18),transparent_60%)]" />
      </div>

      <div className="relative w-[90%] max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur"
        >
          <div className="grid md:grid-cols-2">
            {/* LEFT PANEL */}
            <div className="relative p-12 md:p-20 flex flex-col justify-center">
              {/* subtle left-panel glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_350px_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
              <div className="relative">
                <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl md:leading-[1.05]">
                  Your academic
                  <br />
                  life, organized
                </h1>

                <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                  QBtron brings order to the chaos of student life. Plan your week,
                  track your courses, and stay focused with AI that understands your schedule.
                </p>

                <div className="mt-8 flex items-center gap-5">
                  <Button
                    size="lg"
                    onClick={() => navigate(createPageUrl("Dashboard"))}
                    className="h-10 w-24 rounded-full text-center text-lg font-semibold text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    Start
                  </Button>

                  <Button
                    variant="outline"
                    onClick={scrollToDemo}
                    className="h-10 w-24 rounded-full border-white/20 bg-transparent px-5 text-center text-lg font-semibold text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Floating Cards with Blurred Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
              className="relative min-h-[450px] md:min-h-[680px] overflow-hidden"
            >
              {/* Blurred Background Image */}
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80"
                alt="Background"
                className="absolute inset-0 h-full w-full object-cover blur-sm scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />

              {/* Floating Card 1 - Study Plan (Green) */}
              <FloatingWrapper
                index={0}
                floatDistance={18}
                duration={4}
                className="absolute top-4 left-4 md:top-8 md:left-8 w-56 md:w-64 bg-white rounded-2xl shadow-2xl p-5 z-30 cursor-pointer hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-800">Study Plan</span>
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Active</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Review CS301 Notes</div>
                      <div className="text-xs text-gray-400">30 min</div>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Start</button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Practice Problems</div>
                      <div className="text-xs text-gray-400">45 min</div>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Start</button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Read Chapter 5</div>
                      <div className="text-xs text-gray-400">1 hr</div>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Start</button>
                  </div>
                </div>
              </FloatingWrapper>

              {/* Floating Card 2 - Deadlines (Orange) */}
              <FloatingWrapper
                index={1}
                floatDistance={14}
                duration={4.5}
                className="absolute top-1/4 right-4 md:right-8 w-56 md:w-64 bg-white rounded-2xl shadow-2xl p-5 z-20 cursor-pointer hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-800">Deadlines</span>
                  <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">3 Due</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <div className="text-sm font-medium text-gray-800">BST Assignment</div>
                      <div className="text-xs text-gray-400">CS301</div>
                    </div>
                    <span className="text-xs font-bold text-red-500">2 days</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Linear Algebra Quiz</div>
                      <div className="text-xs text-gray-400">MATH201</div>
                    </div>
                    <span className="text-xs font-bold text-red-500">5 days</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Essay Draft</div>
                      <div className="text-xs text-gray-400">ENG102</div>
                    </div>
                    <span className="text-xs font-bold text-red-500">7 days</span>
                  </div>
                </div>
              </FloatingWrapper>

              {/* Floating Card 3 - Calendar (Blue) */}
              <FloatingWrapper
                index={2}
                floatDistance={16}
                duration={5}
                className="absolute bottom-6 left-1/4 md:left-1/4 md:bottom-10 w-64 md:w-72 bg-white rounded-2xl shadow-2xl p-5 z-10 cursor-pointer hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-800">Today's Schedule</span>
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Mon 13</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 w-14">9:00 AM</div>
                    <div className="flex-1 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg p-2">
                      <div className="text-xs font-medium text-blue-700">CS301 Lecture</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 w-14">11:00 AM</div>
                    <div className="flex-1 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg p-2">
                      <div className="text-xs font-medium text-purple-700">MATH201 Quiz</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 w-14">2:00 PM</div>
                    <div className="flex-1 bg-green-100 border-l-4 border-green-500 rounded-r-lg p-2">
                      <div className="text-xs font-medium text-green-700">Study Session</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 w-14">4:30 PM</div>
                    <div className="flex-1 bg-orange-100 border-l-4 border-orange-500 rounded-r-lg p-2">
                      <div className="text-xs font-medium text-orange-700">Office Hours</div>
                    </div>
                  </div>
                </div>
              </FloatingWrapper>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}