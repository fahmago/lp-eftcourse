import { InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Left: Logo & Links */}
          <div className="flex flex-col items-start gap-4">
            <img src="/image/horizontal-white.webp" alt="EFT Course" className="h-15 w-auto mb-1" />
            <div className="flex items-center gap-6">
              <a 
                href="/terms-and-conditions" 
                className="text-sm font-medium hover:text-pink-400 transition-colors"
              >
                Syarat &amp; Ketentuan
              </a>
              <a 
                href="https://wa.me/6281511591935?text=Halo%20Min-Course%2C%20saya%20tertarik%20dengan%20program%20EFT%20Course%20dan%20ingin%20bertanya%20lebih%20lanjut." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium hover:text-pink-400 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right: Social Links */}
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

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-slate-800/50 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} EFT Course. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
