"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Download, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

function QRISContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [grossAmount, setGrossAmount] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "ready" | "paid" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectCount, setRedirectCount] = useState(5);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch QR code on mount
  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      setErrorMessage("Order ID tidak ditemukan.");
      return;
    }

    // Read QR code URL from sessionStorage (stored by CheckoutForm)
    const storedQrUrl = sessionStorage.getItem("eft_qr_code_url");
    const storedAmount = sessionStorage.getItem("eft_gross_amount");

    if (storedQrUrl) {
      setQrCodeUrl(storedQrUrl);
      setGrossAmount(Number(storedAmount) || 5000);
      setStatus("ready");
    } else {
      setStatus("error");
      setErrorMessage("QR code tidak ditemukan. Silakan kembali dan coba lagi.");
    }
  }, [orderId]);

  // Poll transaction status
  useEffect(() => {
    if (status !== "ready" || !orderId) return;

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/midtrans/qris/status?order_id=${orderId}`);
        const data = await res.json();

        if (data.transaction_status === "capture" || data.transaction_status === "settlement") {
          setStatus("paid");
          if (pollingRef.current) clearInterval(pollingRef.current);
        }
      } catch {
        // Silently retry
      }
    }, 5000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [status, orderId]);

  // Redirect to WhatsApp after payment
  useEffect(() => {
    if (status !== "paid") return;

    const stored = getStoredCheckoutData();
    const waNumber = "6281511591935";
    const message = `Halo Admin, saya sudah melakukan pembayaran untuk kelas EFT Course.\n\nBerikut detail pesanan saya:\n- Nama: ${stored.name}\n- Kelas: ${stored.category}\n- Jadwal: ${stored.schedule}\n- Sesi: ${stored.session}\n\nMohon bantuannya untuk memasukkan saya ke grup WhatsApp kelas ya. Terima kasih!`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    let counter = 5;
    setRedirectCount(counter);

    const timer = setInterval(() => {
      counter -= 1;
      setRedirectCount(counter);
      if (counter <= 0) {
        clearInterval(timer);
        window.location.href = waLink;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Download QR code as PNG
  const handleDownload = useCallback(() => {
    if (!qrCodeUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const padding = 40;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2 + 60;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code
      ctx.drawImage(img, padding, padding);

      // Draw text
      ctx.fillStyle = "#1e1b4b";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Order: ${orderId}`, canvas.width / 2, img.height + padding + 30);

      // Trigger download
      const link = document.createElement("a");
      link.download = `QRIS-EFT-${orderId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = qrCodeUrl;
  }, [qrCodeUrl, orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="/icons/payment.webp" alt="QRIS" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-indigo-950">Pembayaran QRIS</h1>
          <p className="text-slate-500 mt-1">
            Scan QR code di bawah menggunakan aplikasi e-wallet Anda
          </p>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Membuat QR code...</p>
          </div>
        )}

        {/* QR Code Ready */}
        {status === "ready" && qrCodeUrl && (
          <div className="space-y-6">
            {/* Amount */}
            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
              <p className="text-sm text-slate-500">Total Pembayaran</p>
              <p className="text-3xl font-bold text-indigo-950">
                Rp {grossAmount.toLocaleString("id-ID")}
              </p>
            </div>

            {/* QR Code Image */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
                <img
                  src={qrCodeUrl}
                  alt="QRIS QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
              <p className="text-sm text-pink-800 font-medium mb-2">Cara Bayar:</p>
              <ol className="text-sm text-pink-700 space-y-1 list-decimal list-inside">
                <li>Buka aplikasi GoPay, Dana, OVO, atau ShopeePay</li>
                <li>Pilih menu <strong>Scan / Bayar</strong></li>
                <li>Arahkan kamera ke QR code di atas</li>
                <li>Konfirmasi pembayaran</li>
              </ol>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-2xl bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-lg transition-all shadow-xl shadow-indigo-950/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download QR Code
            </button>

            {/* Waiting indicator */}
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Menunggu pembayaran...</span>
            </div>
          </div>
        )}

        {/* Payment Success */}
        {status === "paid" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Pembayaran Berhasil!</h2>
              <p className="text-slate-600 mt-2 text-center">
                Terima kasih! Pendaftaran Anda telah kami terima.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <p className="text-sm text-slate-500">Anda akan diarahkan ke WhatsApp Admin dalam</p>
              <p className="text-3xl font-bold text-indigo-950 my-2">{redirectCount}</p>
              <p className="text-sm text-slate-500">detik</p>
            </div>

            <button
              onClick={() => {
                const stored = getStoredCheckoutData();
                const waNumber = "6281511591935";
                const message = `Halo Admin, saya sudah melakukan pembayaran untuk kelas EFT Course.\n\nBerikut detail pesanan saya:\n- Nama: ${stored.name}\n- Kelas: ${stored.category}\n- Jadwal: ${stored.schedule}\n- Sesi: ${stored.session}\n\nMohon bantuannya untuk memasukkan saya ke grup WhatsApp kelas ya. Terima kasih!`;
                window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
              }}
              className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-lg shadow-green-500/30"
            >
              Lanjutkan ke WhatsApp Sekarang
            </button>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Terjadi Kesalahan</h2>
              <p className="text-slate-600 mt-2 text-center">{errorMessage}</p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-lg"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </div>
  );
}

// Helper to get stored checkout data
function getStoredCheckoutData() {
  if (typeof window === "undefined") return { name: "", email: "", whatsapp: "", category: "", schedule: "", session: "" };
  const stored = sessionStorage.getItem("eft_checkout");
  return stored ? JSON.parse(stored) : { name: "", email: "", whatsapp: "", category: "", schedule: "", session: "" };
}

export default function QRISPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    }>
      <QRISContent />
    </Suspense>
  );
}
