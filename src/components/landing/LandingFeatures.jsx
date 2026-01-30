// @ts-nocheck
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ListTodo, CalendarDays, Sparkles } from "lucide-react";

// Import feature images
import StudyPlanImg from "@/assets/features/study-plan.png";
import TaskTrackingImg from "@/assets/features/task-tracking.png";
import CalendarImg from "@/assets/features/calendar.png";

const GREEN = "#2d6a4f";

const features = [
  {
    id: "study-plan",
    label: "Study Plan",
    icon: Sparkles,
    title: "Plan your studies intelligently",
    subtitle: "with QBtron's AI-powered recommendations",
    description: "QBtron analyzes your task list and deadlines to suggest what to do today. Get AI-generated study recommendations based on priority, due dates, and estimated time.",
    secondaryText: "That way, you can focus on studying instead of deciding what to study next. Start each day with clarity and purpose.",
    image: StudyPlanImg,
  },
  {
    id: "task-tracking",
    label: "Task Tracking",
    icon: ListTodo,
    title: "Track every task",
    subtitle: "from assignment to completion",
    description: "Break down large assignments into manageable steps. Check off tasks as you complete them and watch your progress grow.",
    secondaryText: "Organize by course, priority, or due date. QBtron adapts to how you like to work.",
    image: TaskTrackingImg,
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
    title: "Visualize your schedule",
    subtitle: "with an integrated calendar view",
    description: "See your fixed schedule, events, and deadlines in one unified calendar. Drag and drop tasks to plan your week with precision.",
    secondaryText: "Balance your classes, study sessions, and personal life with a calendar designed for students.",
    image: CalendarImg,
  },
];

export default function LandingFeatures() {
  const [activeTab, setActiveTab] = useState("study-plan");
  const activeFeature = features.find((f) => f.id === activeTab) || features[0];

  return (
    <section id="features" className="relative overflow-hidden bg-neutral-100 px-6 py-20 md:py-28">
      {/* Gradient transition from hero */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 via-neutral-800/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Tools built for student success
          </h2>
          <p className="mt-4 text-neutral-600 md:text-lg">
            Everything you need to stay organized and ace your semester
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`group flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-all duration-300 ${isActive
                  ? "text-white shadow-lg"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                style={isActive ? { backgroundColor: GREEN } : {}}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-700"}`} />
                {feature.label}
              </button>
            );
          })}
        </motion.div>

        {/* Feature Content */}
        <div className="mt-14 md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid items-center gap-12 md:grid-cols-2 md:gap-24"
            >
              {/* Text Content */}
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl lg:text-4xl">
                  {activeFeature.title}
                  <br />
                  <span className="text-neutral-500">{activeFeature.subtitle}</span>
                </h3>

                <p className="mt-6 text-neutral-600 leading-relaxed md:text-lg">
                  {activeFeature.description}
                </p>

                <p className="mt-4 text-neutral-500 leading-relaxed md:text-lg">
                  {activeFeature.secondaryText}
                </p>

                {/* <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="/SignUp"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: GREEN }}
                  >
                    Get started
                  </a>
                  <a
                    href="/Features"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </div> */}
              </div>

              {/* Image */}
              <div className="order-1 md:order-2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative max-w-[450px]"
                >
                  {/* Shadow/glow effect */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neutral-200/50 to-transparent blur-2xl" />

                  <img
                    src={activeFeature.image}
                    alt={activeFeature.label}
                    className="relative rounded-2xl shadow-2xl border border-neutral-200/50 w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
