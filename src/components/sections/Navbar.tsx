import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/icons/icon-eft-course.webp" alt="EFT Course Logo" className="w-45 h-45 object-contain drop-shadow-sm" />
          </div>
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-slate-600 hover:text-pink-600 transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <a href="#checkout" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-indigo-950 hover:bg-indigo-900 transition-colors shadow-lg shadow-indigo-900/20">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
