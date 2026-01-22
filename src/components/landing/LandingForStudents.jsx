import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Users, Heart } from 'lucide-react';

const studentNeeds = [
  {
    icon: BookOpen,
    label: "Classes",
    description: "Track lectures, labs, and office hours"
  },
  {
    icon: Briefcase,
    label: "Work",
    description: "Balance part-time jobs and internships"
  },
  {
    icon: Users,
    label: "Projects",
    description: "Coordinate group work and deadlines"
  },
  {
    icon: Heart,
    label: "Life",
    description: "Make time for what matters outside school"
  }
];

export default function LandingForStudents() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#f6f8f6]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Designed for how students actually live.
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            QBtron adapts to classes, work, deadlines, and personal time—so your schedule works for you, not against you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentNeeds.map((need, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-4">
                <need.icon className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{need.label}</h3>
              <p className="text-sm text-gray-600">{need.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}