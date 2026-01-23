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

              {/* Floating Card 1 - Top Left */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-8 left-4 md:top-12 md:left-8 w-48 md:w-56 bg-white rounded-xl shadow-2xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Q</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Today's Tasks</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-green-200 rounded w-5/6" />
                  <div className="h-2 bg-gray-200 rounded w-2/3" />
                </div>
              </motion.div>

              {/* Floating Card 2 - Center */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-52 md:w-64 bg-white rounded-xl shadow-2xl p-4 border border-orange-100"
                style={{ boxShadow: '0 25px 50px -12px rgba(234, 88, 12, 0.25)' }}
              >
                <div className="text-xs font-semibold text-orange-500 mb-2">Coming Up</div>
                <div className="text-sm font-semibold text-gray-800 mb-3">Class Schedule</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Math 101</span>
                    <span className="text-xs text-orange-500 font-medium">Tomorrow</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Physics Lab</span>
                    <span className="text-xs text-orange-500 font-medium">Tomorrow</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Essay Due</span>
                    <span className="text-xs text-red-500 font-medium">3 days</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-12 right-4 md:bottom-16 md:right-8 w-44 md:w-52 bg-white rounded-xl shadow-2xl p-4 border border-gray-100"
              >
                <div className="text-xs font-semibold text-gray-500 mb-2">Calendar</div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-gray-400 font-medium">{d}</div>
                  ))}
                  {[...Array(31)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 flex items-center justify-center rounded text-xs ${i === 14 ? 'bg-green-600 text-white font-bold' :
                          i === 18 ? 'bg-red-500 text-white font-bold' : 'text-gray-600'
                        }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
