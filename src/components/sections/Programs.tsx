"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { PROGRAMS, CATEGORIES } from "@/lib/constants";

export default function Programs() {
  const handleSelectProgram = (index: number) => {
    const category = CATEGORIES[index];
    window.dispatchEvent(new CustomEvent("selectCategory", { detail: category }));
    
    // Slight delay to ensure state updates smoothly, though native scroll can handle it directly
    setTimeout(() => {
      document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="program" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 {...fadeIn} className="text-4xl font-bold text-indigo-950 mb-6">
            Materi Disesuaikan 100% Dengan <span className="text-pink-500">Level &amp; Usiamu</span>
          </motion.h2>
          <motion.p {...fadeIn} className="text-lg text-slate-600">
            Pilih kelas yang paling sesuai. Kami pastikan setiap sesi relevan dengan kebutuhanmu.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid md:grid-cols-3 gap-8"
        >
          {PROGRAMS.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              onClick={() => handleSelectProgram(i)}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-slate-50 flex items-center justify-center">
                <img src={card.img} alt={card.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold text-indigo-950 mb-3">{card.title}</h3>
              <p className="text-slate-600 mb-4">{card.desc}</p>
              <div className="flex items-center text-pink-500 font-semibold text-sm group-hover:gap-2 transition-all">
                Join Kelas Ini <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
