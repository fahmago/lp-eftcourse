"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { FAQS } from "@/lib/constants";

export default function Faq() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 {...fadeIn} className="text-4xl font-bold text-indigo-950 mb-4">
            Pertanyaan Seputar Kelas
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <span className="font-bold text-indigo-950 pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                  activeFaq === i ? "rotate-180" : ""
                }`} />
              </button>
              {activeFaq === i && (
                <div className="px-6 py-5 bg-white text-slate-600 border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
