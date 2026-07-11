"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { MENTORS, MENTOR_FEATURES } from "@/lib/constants";

export default function Mentors() {
  return (
    <section id="mentors" className="py-24 bg-indigo-950  text-white relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full border-[40px] border-indigo-900/50 opacity-20" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full border-[60px] border-pink-900/20 opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div className="lg:col-span-5" {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
            <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
              Mentor kami adalah praktisi bahasa yang berdedikasi tinggi, siap memberikan feedback jujur dan membangun rasa percaya dirimu.
            </p>
            <div className="space-y-4">
              {MENTOR_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <p className="text-indigo-100">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Mentor Cards */}
          <motion.div className="lg:col-span-7" {...fadeIn}>
            <div className="grid sm:grid-cols-2 gap-6 relative">
              {/* Live Interactive Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <div className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 animate-bounce">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                  </span>
                  Live Interactive
                </div>
              </div>

              {MENTORS.map((mentor, i) => (
                <div
                  key={mentor.name}
                  className={`bg-indigo-900/50 backdrop-blur-sm rounded-3xl p-4 border border-indigo-800/50 relative overflow-hidden group ${
                    i === 1 ? "sm:mt-12" : ""
                  }`}
                >
                  <img
                    src={mentor.img}
                    alt={mentor.name}
                    className={`w-full h-64 object-cover ${mentor.objectPosition || 'object-[center_22%]'} rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-500`}
                  />
                  <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                  <p className="text-pink-400 font-medium">{mentor.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
