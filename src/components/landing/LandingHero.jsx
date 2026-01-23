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
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-16 md:py-24 min-h-screen">
      {/* background vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_50%_0%,rgba(120,40,40,0.30),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_0%_100%,rgba(45,106,79,0.18),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur"
        >
          <div className="grid md:grid-cols-2">
            {/* LEFT PANEL */}
            <div className="relative p-10 md:p-14">
              {/* subtle left-panel glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_350px_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
              <div className="relative">
                <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.05]">
                  Your academic
                  <br />
                  life, organized
                </h1>

                <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
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

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
              className="relative min-h-[280px] md:min-h-[460px]"
            >
              <img
                // swap this URL with your own hero image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80"
                alt="QBtron hero"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* optional soft overlay to match the screenshot vibe */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/0 to-black/10" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
