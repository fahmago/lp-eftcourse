"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { CATEGORIES, SCHEDULES, SESSIONS } from "@/lib/constants";

export default function CheckoutForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (CATEGORIES.includes(customEvent.detail as any)) {
        setSelectedCategory(customEvent.detail);
      }
    };
    window.addEventListener("selectCategory", handleSelectCategory);
    return () => window.removeEventListener("selectCategory", handleSelectCategory);
  }, []);

  return (
    <section id="checkout" className="py-24 bg-pink-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeIn}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-indigo-500" />

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-sm mb-4">
              DAFTAR SEKARANG
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-4">Amankan Kursi Anda!</h2>
            <p className="text-xl font-bold text-slate-700">Cuma Rp 50.000 / Bulan</p>
          </div>

          <form className="space-y-10">
            {/* Step 1 — Kategori */}
            <div>
              <StepLabel number={1} title="Pilih Kategori" />
              <div className="grid grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-4 rounded-2xl border-2 font-bold text-center transition-all ${
                      selectedCategory === cat
                        ? "border-pink-500 bg-pink-50 text-pink-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-pink-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Jadwal Blok */}
            <div>
              <StepLabel number={2} title="Pilih Paket Sesi" />
              <div className="grid sm:grid-cols-2 gap-4">
                {SCHEDULES.map((schedule) => (
                  <button
                    key={schedule.id}
                    type="button"
                    onClick={() => { setSelectedSchedule(schedule.id); setSelectedSession(null); }}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      selectedSchedule === schedule.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-slate-200 bg-white hover:border-pink-200"
                    }`}
                  >
                    <p className={`font-bold ${
                      selectedSchedule === schedule.id ? "text-pink-700" : "text-indigo-950"
                    }`}>
                      {schedule.name}
                    </p>
                    <p className={`text-sm mt-1 ${
                      selectedSchedule === schedule.id ? "text-pink-600" : "text-slate-500"
                    }`}>
                      <Clock className="w-4 h-4 inline mr-1 -mt-0.5" />
                      {schedule.days}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 — Sesi (conditional) */}
            {selectedSchedule && (
              <div>
                <StepLabel number={3} title="Pilih Sesi" />
                <p className="text-sm text-slate-500 mb-4 ml-10">
                  {selectedSchedule === "A" ? "Senin – Selasa – Rabu" : "Kamis – Jumat – Sabtu"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SESSIONS[selectedSchedule].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSelectedSession(s.label)}
                      className={`flex flex-col items-center justify-center gap-1 py-4 px-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
                        selectedSession === s.label
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-pink-200"
                      }`}
                    >
                      <Clock className={`w-4 h-4 ${
                        selectedSession === s.label ? "text-pink-500" : "text-slate-400"
                      }`} />
                      <span>{s.label}</span>
                      <span className={`text-xs font-normal ${
                        selectedSession === s.label ? "text-pink-400" : "text-slate-400"
                      }`}>{s.group}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 — Data Diri */}
            <div>
              <StepLabel number={4} title="Data Diri" />
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama..."
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="button"
                className="w-full py-5 rounded-2xl bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-lg transition-all shadow-xl shadow-indigo-950/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Bayar Rp 50.000 &amp; Masuk Grup WA
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-sm text-slate-500 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Pembayaran Aman via Midtrans
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sub-component ──────────────────────────────────────────────────────────────
function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <h3 className="text-lg font-bold text-indigo-950 mb-4 flex items-center gap-2">
      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
        {number}
      </span>
      {title}
    </h3>
  );
}
