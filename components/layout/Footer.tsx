import React from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';
import { FaInstagram, FaPinterest } from 'react-icons/fa';

interface FooterProps {
  compact?: boolean;
}

const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  return (
    <footer className={`relative bg-[#030303] border-t border-[#8B5A2B]/20 ${compact ? 'pt-8 pb-8' : 'pt-20 pb-10'} overflow-hidden`}>
      {/* Abstract Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#8B5A2B]/10 blur-[100px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16 justify-items-center md:justify-items-start">

            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Logo className="mb-6 scale-110" />
              <p className="text-[#808080] text-sm tracking-widest leading-relaxed mb-6 italic max-w-sm">
                "Only the chosen ones enter The Vault."
              </p>
              <p className="text-[#8B5A2B]/60 text-xs tracking-wider max-w-xs">
                Exclusive artifacts, curated from the shadows. Procure what the world desires, but only a few possess.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-center md:items-start w-full md:pl-16">
              <h4 className="text-white font-black uppercase tracking-widest mb-6 border-b border-[#8B5A2B]/30 pb-2">The Vault</h4>
              <ul className="flex flex-col gap-4 text-[#808080] text-sm font-medium tracking-wide">
                <li><Link href="/" className="hover:text-[#D2B48C] transition-colors">Home</Link></li>
                <li><Link href="/?category=Women" className="hover:text-[#D2B48C] transition-colors">Women's Collection</Link></li>
                <li><Link href="/?category=Men" className="hover:text-[#D2B48C] transition-colors">Men's Collection</Link></li>
                <li><Link href="/?category=Accessories" className="hover:text-[#D2B48C] transition-colors">Accessories</Link></li>
                <li><Link href="/?category=Electronics" className="hover:text-[#D2B48C] transition-colors">Electronics</Link></li>
                <li><a href="mailto:aurorasociety666@gmail.com" className="hover:text-[#D2B48C] transition-colors border-t border-[#8B5A2B]/10 pt-2 mt-2 block w-max">Contact Us / Request Artifact</a></li>
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center md:items-start lg:items-end w-full">
              <h4 className="text-white font-black uppercase tracking-widest mb-6 border-b border-[#8B5A2B]/30 pb-2 lg:border-none">Network</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0a0a0a] border border-[#8B5A2B]/30 text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-[#030303] transition-all transform hover:scale-110">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0a0a0a] border border-[#8B5A2B]/30 text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-[#030303] transition-all transform hover:scale-110">
                  <FaPinterest size={18} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Copyright */}
        <div className={`flex flex-col md:flex-row justify-between items-center ${compact ? '' : 'pt-8 border-t border-[#8B5A2B]/10'} text-xs text-[#808080] tracking-widest uppercase gap-4`}>
          <p>© 2026 Aurora. All Secrets Reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="mailto:aurorasociety666@gmail.com" className="hover:text-[#D2B48C] transition-colors">Contact Us</a>
            <Link href="/privacy" className="hover:text-[#D2B48C] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#D2B48C] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
