import { InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-bold text-xl text-white">EFT Course</span>
          </div>

          {/* Copyright */}
          <div className="text-sm">
            &copy; {new Date().getFullYear()} EFT Course. All rights reserved.
          </div>

          {/* Contact & Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/6281511591935" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold hover:text-pink-400 transition-colors"
            >
              Contact Us
            </a>
            <div className="flex gap-4">
              {[
              { Icon: InstagramIcon, label: "Instagram", url: "https://instagram.com/eftcourse" },
              { Icon: YoutubeIcon, label: "YouTube", url: "https://www.youtube.com/channel/UCe0mnax0u-gfPPk3U68xm0w" },
            ].map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
