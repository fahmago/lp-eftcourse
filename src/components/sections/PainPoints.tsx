"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { PAIN_POINTS } from "@/lib/constants";

export default function PainPoints() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Images */}
          <motion.div className="relative order-2 lg:order-1" {...fadeIn}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/ilustration/struggle-1.webp"
                className="rounded-3xl w-full h-64 object-cover"
                alt="Frustrated person"
              />
              <img
                src="/ilustration/struggle-2.webp"
                className="rounded-3xl w-full h-64 object-cover mt-8"
                alt="Nervous interview"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-pink-100 text-center max-w-[200px]">
              <p className="text-3xl font-black text-pink-500 mb-1">80%</p>
              <p className="text-sm font-semibold text-slate-700">Orang gagal karena takut salah bicara</p>
            </div>
          </motion.div>

          {/* Right — Copy */}
          <motion.div className="order-1 lg:order-2" {...fadeIn}>
            <h2 className="text-4xl font-bold text-indigo-950 mb-6">
              Pernah Ngalamin Ini Waktu Mau Ngomong Inggris?
            </h2>
            <div className="space-y-6 mt-10">
              {PAIN_POINTS.map((point, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-pink-200 hover:bg-pink-50/30 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <p className="text-slate-700 font-medium text-lg pt-1.5">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
