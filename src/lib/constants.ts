// ─── Navigation ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { href: "#program", label: "Program" },
  { href: "#mentors", label: "Mentors" },
  { href: "#how-it-works", label: "Cara Kerja" },
] as const;

// ─── Hero ───────────────────────────────────────────────────────────────────────
export const STUDENT_AVATAR_IDS = [1, 2, 3, 4];

// ─── Pain Points ────────────────────────────────────────────────────────────────
export const PAIN_POINTS = [
  "Sering nge-blank dan kaku pas diajak ngobrol langsung.",
  "Pusing mikirin grammar sampai akhirnya takut salah ngomong.",
  "Insecure saat interview kerja karena requirement harus Full English.",
];

// ─── Programs ───────────────────────────────────────────────────────────────────
export const PROGRAMS = [
  {
    title: "Makin Pede & Berani Speak Up",
    desc: "Mental block dihancurkan sejak dini dengan metode fun learning.",
    img: "/ilustration/kids-leveling.webp",
  },
  {
    title: "Ngobrol Lancar Tanpa Nge-Lag",
    desc: "Respons natural, perbanyak kosakata gaul & daily conversation.",
    img: "/ilustration/teen-leveling.webp",
  },
  {
    title: "Siap Hadapi Dunia Kerja",
    desc: "Simulasi interview, presentasi & negosiasi dalam bahasa Inggris.",
    img: "/ilustration/adult-leveling.webp",
  },
] as const;

// ─── Mentors ─────────────────────────────────────────────────────────────────────
export const MENTORS = [
  {
    name: "Sayusni Tri Irawan",
    role: "Founder / Mentor",
    img: "/image/mentor-tri.webp",
    objectPosition: "object-[center_35%]",
  },
  {
    name: "Erray Eryandi",
    role: "Founder / Mentor",
    img: "/image/mentor-ery.webp",
    objectPosition: "object-[center_22%]",
  },
] as const;

export const MENTOR_FEATURES = [
  "Bukan sekadar teori grammar, tapi 100% fokus ke praktik berbicara.",
  "Lingkungan suportif yang bikin kamu nggak takut salah.",
] as const;

// ─── How It Works ────────────────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
  {
    img: "/icons/leveling.webp",
    title: "1. Isi Data Singkat",
    desc: "Pilih kategori & jadwal yang cocok buatmu.",
  },
  {
    img: "/icons/payment.webp",
    title: "2. Bayar Instan",
    desc: "Selesaikan pembayaran otomatis via Midtrans.",
  },
  {
    img: "/icons/mentoring.webp",
    title: "3. Mulai Mentoring",
    desc: "Langsung masuk ke Grup WhatsApp VIP kelasmu.",
  },
] as const;

// ─── Checkout ────────────────────────────────────────────────────────────────────
export const CATEGORIES = ["KIDS", "TEEN", "ADULT"] as const;

export const SCHEDULES = [
  { id: "A", name: "Paket A", days: "Senin - Selasa - Rabu" },
  { id: "B", name: "Paket B", days: "Kamis - Jumat - Sabtu" },
] as const;

export type SessionItem = { label: string; group: string };

export const SESSIONS: Record<string, SessionItem[]> = {
  A: [
    { label: "08.00 - 09.00", group: "Pagi" },
    { label: "09.30 - 10.30", group: "Pagi" },
    { label: "11.00 - 12.00", group: "Pagi" },
    { label: "13.00 - 14.00", group: "Siang" },
    { label: "14.30 - 15.30", group: "Siang" },
    { label: "16.00 - 17.00", group: "Siang" },
  ],
  B: [
    { label: "19.00 - 20.00", group: "Malam" },
    { label: "20.30 - 21.30", group: "Malam" },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "Kok bisa cuma 50 ribu sebulan dapat 3x seminggu live mentoring?",
    a: "Visi kami adalah membuat pendidikan bahasa Inggris yang berkualitas bisa diakses oleh siapa saja tanpa harus mahal. Subsidi silang dan efisiensi operasional memungkinkan kami memberikan harga ini khusus promo bulan ini!",
  },
  {
    q: "Apakah jadwal ini sudah pasti atau bisa diubah?",
    a: "Jadwal blok sudah paten (Paket A atau B). Namun untuk detail jam pastinya (pagi/sore/malam), akan disepakati bersama dalam grup kelas agar mengakomodasi mayoritas peserta.",
  },
  {
    q: "Apa bedanya kelas Kids, Teen, dan Adult?",
    a: "Pendekatan metode pembelajarannya! Kids fokus pada fun & vocabulary building, Teen pada confidence & daily conversation, dan Adult lebih ke professional speaking & interview simulation.",
  },
] as const;
