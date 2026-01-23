import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    tag: "Schedule",
    title: "Fixed schedule view",
    desc: "See your week at a glance with recurring tasks",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
    href: "#",
  },
  {
    tag: "Tasks",
    title: "Flexible task panel",
    desc: "AI-generated and manual tasks in one place",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&q=80",
    href: "#",
  },
  {
    tag: "Calendar",
    title: "Interactive calendar view",
    desc: "Drag tasks to schedule them exactly when you need",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
    href: "#",
  },
];

// add near top (inside file, above component)
const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      mass: 0.6,
    },
  },
};


export default function LandingFeatures() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:py-28">
      {/* background vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_50%_0%,rgba(120,40,40,0.25),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_10%_100%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-xl font-semibold tracking-wide text-neutral-950">
            Built
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Three ways to work
          </h2>
          <p className="mt-3 text-sm text-neutral-950 md:text-base">
            Everything you need in one place
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:gap-8 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <div className="h-44 w-full overflow-hidden md:h-48">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold tracking-wide text-neutral-950">
                  {c.tag}
                </div>

                <div className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  {c.title}
                </div>

                <div className="mt-3 text-sm leading-relaxed text-neutral-950">
                  {c.desc}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-950 transition-colors group-hover:text-white">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
