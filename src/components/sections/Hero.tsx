"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { STUDENT_AVATAR_IDS } from "@/lib/constants";


export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold text-sm mb-6 border border-pink-200">
              <span className="animate-pulse">🔥</span> Promo: Cuma Rp 50.000 / Bulan!
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-indigo-950 mb-6 leading-[1.1]">
              Lancar Speaking <br />
              <span className="text-pink-500 relative">Nggak Perlu Mahal.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-pink-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
              Waktunya praktik ngobrol 3x seminggu! Sesi live interactive bareng expert tutor. Pilihan jadwal fleksibel buat Kids, Teen, &amp; Adult.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#checkout" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-all shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 group">
                Amankan Slot Mentoring
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-4">
                {STUDENT_AVATAR_IDS.map((i) => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                  +2k
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">4.9/5</span> dari ratusan siswa
              </div>
            </div>
          </motion.div>

          {/* Right — Image */}
          
          <motion.div
            className="relative lg:ml-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-indigo-950 rounded-[3rem] rotate-3 scale-105 opacity-10" />
              <img
                src="/ilustration/hero-section.webp"
                alt="Students learning online"
                className="relative z-10 rounded-[2.5rem] w-full h-[500px] object-cover shadow-2xl border-4 border-white"
              />

              {/* Floating Badge — Live Mentoring */}
              <motion.div
                className="absolute left-2 lg:-left-8 top-4 lg:top-20 z-20 bg-white p-2 lg:p-3 rounded-2xl shadow-xl flex items-center gap-2 lg:gap-4 border border-slate-100 max-w-[160px] lg:max-w-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 lg:w-14 lg:h-14 flex-shrink-0 flex items-center justify-center">
                  <img src="/icons/live-ilustration.webp" alt="Live Mentoring" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm font-bold text-slate-900 whitespace-nowrap">Live Mentoring</p>
                  <p className="text-[10px] lg:text-xs text-slate-500">3x Seminggu</p>
                </div>
              </motion.div>

              {/* Floating Badge — 1-on-1 Practice */}
              <motion.div
                className="absolute right-2 lg:-right-6 bottom-6 lg:bottom-32 z-20 bg-white p-2 lg:p-3 rounded-2xl shadow-xl flex items-center gap-2 lg:gap-4 border border-slate-100 max-w-[160px] lg:max-w-none"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-10 h-10 lg:w-14 lg:h-14 flex-shrink-0 flex items-center justify-center">
                  <img src="/icons/practice-ilustration.webp" alt="1-on-1 Practice" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm font-bold text-slate-900 whitespace-nowrap">1-on-1 Practice</p>
                  <p className="text-[10px] lg:text-xs text-slate-500">Feedback Langsung</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
