"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, X } from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { CATEGORIES, SCHEDULES, SESSIONS } from "@/lib/constants";

export default function CheckoutForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectCount, setRedirectCount] = useState(3);

  // Generate WA Link function to reuse
  const getAdminWaLink = () => {
    const waNumber = "6281511591935";
    const message = `Halo Admin, saya sudah melakukan pembayaran untuk kelas EFT Course.\n\nBerikut detail pesanan saya:\n- Nama: ${name}\n- Kelas: ${selectedCategory}\n- Jadwal: ${selectedSchedule}\n- Sesi: ${selectedSession}\n\nMohon bantuannya untuk memasukkan saya ke grup WhatsApp kelas ya. Terima kasih!`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

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

  const handlePayment = async () => {
    if (!selectedCategory || !selectedSchedule || !selectedSession) {
      setErrorMessage("Mohon pilih kategori kelas, jadwal, dan sesi terlebih dahulu.");
      setShowErrorModal(true);
      return;
    }
    if (!name || !email || !whatsapp) {
      setErrorMessage("Mohon lengkapi data diri Anda (Nama, Email, dan WhatsApp).");
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          category: selectedCategory,
          schedule: selectedSchedule,
          session: selectedSession,
        }),
      });

      const data = await response.json();

      if (data.token) {
        // Trigger Snap popup
        (window as any).snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log(result);
            setShowSuccessModal(true);
            
            // Countdown 3 detik lalu redirect
            let counter = 3;
            const timer = setInterval(() => {
              counter -= 1;
              setRedirectCount(counter);
              if (counter <= 0) {
                clearInterval(timer);
                window.location.href = getAdminWaLink();
              }
            }, 1000);
          },
          onPending: function (result: any) {
            alert("Menunggu pembayaran Anda.");
            console.log(result);
          },
          onError: function (result: any) {
            alert("Pembayaran gagal!");
            console.log(result);
          },
          onClose: function () {
            alert("Anda menutup halaman pembayaran sebelum menyelesaikannya.");
          },
        });
      } else {
        alert(data.error || "Gagal mendapatkan token pembayaran.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada sistem.");
    } finally {
      setIsLoading(false);
    }
  };

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
                  {SCHEDULES.find(s => s.id === selectedSchedule)?.days}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama..."
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh@email.com"
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Digunakan untuk mengirimkan bukti pembayaran (invoice).</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full py-5 rounded-2xl bg-indigo-950 hover:bg-indigo-900 disabled:bg-slate-400 text-white font-bold text-lg transition-all shadow-xl shadow-indigo-950/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? "Memproses..." : "Bayar Rp 50.000 & Masuk Grup WA"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
              <p className="text-center text-sm text-slate-500 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Pembayaran Aman via Midtrans
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pembayaran Berhasil!</h3>
            <p className="text-slate-600 mb-6">
              Terima kasih, <strong>{name}</strong>! Pendaftaran Anda untuk kelas <strong>{selectedCategory}</strong> telah kami terima.
            </p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
              <p className="text-sm text-slate-500">Anda akan diarahkan ke obrolan WhatsApp Admin dalam</p>
              <p className="text-3xl font-bold text-indigo-950 my-2">{redirectCount}</p>
              <p className="text-sm text-slate-500">detik</p>
            </div>

            <button
              onClick={() => window.location.href = getAdminWaLink()}
              className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-lg shadow-green-500/30"
            >
              Lanjutkan ke WhatsApp Sekarang
            </button>
          </motion.div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
          >
            <button 
              onClick={() => setShowErrorModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Form Belum Lengkap</h3>
            <p className="text-slate-600 mb-8">
              {errorMessage}
            </p>

            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-lg shadow-slate-900/20"
            >
              Mengerti & Lengkapi
            </button>
          </motion.div>
        </div>
      )}
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
