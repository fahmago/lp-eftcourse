"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 {...fadeIn} className="text-4xl font-bold text-indigo-950 mb-4">
            Mulai Dalam 3 Langkah Mudah
          </motion.h2>
          <p className="text-slate-600 text-lg">Proses pendaftaran instan, tanpa ribet bikin akun.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 mb-6 relative">
                <img src={step.img} alt={step.title} className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold text-indigo-950 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
