// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const GREEN = "#2d6a4f";

export default function LandingHero() {
  const navigate = useNavigate();

  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 min-h-[85vh] flex items-start justify-center" style={{ paddingTop: '9vh' }}>
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

                <div className="mt-8 flex items-center gap-3">
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

              {/* Floating Card 1 - Today's Schedule (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                }}
                className="absolute top-6 right-4 md:top-10 md:right-8 w-52 md:w-60 bg-white rounded-xl shadow-2xl p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-lg">📅</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Today's Schedule</div>
                    <div className="text-xs text-gray-400">Monday, Jan 13</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-2">
                    <div className="text-sm font-medium text-green-700">CS301 Lecture</div>
                    <div className="text-xs text-gray-500">9:00 AM - 10:30 AM</div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-2">
                    <div className="text-sm font-medium text-blue-700">Study Session</div>
                    <div className="text-xs text-gray-500">2:00 PM - 4:00 PM</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 - Upcoming Deadlines (Left Middle) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.35 },
                  x: { duration: 0.6, delay: 0.35 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute top-1/3 left-2 md:left-6 w-56 md:w-64 bg-white rounded-xl shadow-2xl p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">☑️</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Upcoming Deadlines</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-blue-600">BST Assignment</div>
                      <div className="text-xs text-gray-400">CS301</div>
                    </div>
                    <span className="text-xs font-semibold text-orange-500">2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-blue-600">Linear Algebra Quiz</div>
                      <div className="text-xs text-gray-400">MATH201</div>
                    </div>
                    <span className="text-xs font-semibold text-green-500">5 days</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 - Focus Timer (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                }}
                className="absolute bottom-10 right-8 md:bottom-16 md:right-12 w-44 md:w-52 bg-white rounded-xl shadow-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm">⏱️</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Focus Timer</span>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 tracking-tight">25:00</div>
                  <div className="text-xs text-gray-400 mt-1">Study mode</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
