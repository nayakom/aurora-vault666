import React from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';
import { FaInstagram, FaPinterest } from 'react-icons/fa';

interface FooterProps {
  compact?: boolean;
}

const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  return (
    <footer className={`relative bg-[#030303] border-t border-[#8B5A2B]/20 ${compact ? 'pt-8 pb-8' : 'pt-12 pb-8'} overflow-hidden`}>
      {/* Abstract Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#8B5A2B]/5 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 justify-items-center md:justify-items-start">

            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Logo className="mb-4 scale-100 origin-center md:origin-left" />
              <p className="text-[#808080] text-xs tracking-widest leading-relaxed mb-4 italic">
                "Only the chosen ones enter The Vault."
              </p>
              <p className="text-[#8B5A2B]/60 text-[10px] tracking-wider max-w-xs uppercase">
                Exclusive artifacts, curated from the shadows. Procure what the world desires, but only a few possess.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-col items-center md:items-start w-full">
              <h4 className="text-white font-black uppercase tracking-widest mb-6 border-b border-[#8B5A2B]/30 pb-2 inline-block">The Vault</h4>
              <ul className="flex flex-col gap-3 text-[#808080] text-xs font-medium tracking-wide">
                <li><Link href="/" className="hover:text-[#D2B48C] transition-colors relative group">Home<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
                <li><Link href="/?category=Women" className="hover:text-[#D2B48C] transition-colors relative group">Women's Collection<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
                <li><Link href="/?category=Men" className="hover:text-[#D2B48C] transition-colors relative group">Men's Collection<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
                <li><Link href="/?category=Accessories" className="hover:text-[#D2B48C] transition-colors relative group">Accessories<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
                <li><Link href="/?category=Electronics" className="hover:text-[#D2B48C] transition-colors relative group">Electronics<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
              </ul>
            </div>

            {/* Support / Legal */}
            <div className="flex flex-col items-center md:items-start w-full">
              <h4 className="text-white font-black uppercase tracking-widest mb-6 border-b border-[#8B5A2B]/30 pb-2 inline-block">Support</h4>
              <ul className="flex flex-col gap-3 text-[#808080] text-xs font-medium tracking-wide">
                <li><a href="mailto:aurorasociety666@gmail.com" className="hover:text-[#D2B48C] transition-colors relative group">Contact Us<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></a></li>
                <li><Link href="/privacy" className="hover:text-[#D2B48C] transition-colors relative group">Privacy Policy<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
                <li><Link href="/terms" className="hover:text-[#D2B48C] transition-colors relative group">Terms of Service<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D2B48C] transition-all group-hover:w-full"></span></Link></li>
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center md:items-start w-full">
              <h4 className="text-white font-black uppercase tracking-widest mb-6 border-b border-[#8B5A2B]/30 pb-2 inline-block">Network</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#0a0a0a] border border-[#8B5A2B]/30 text-[#8B5A2B] hover:bg-[#D2B48C] hover:border-[#D2B48C] hover:shadow-[0_0_15px_rgba(210,180,140,0.3)] transition-all transform hover:-translate-y-1">
                  <FaInstagram size={16} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#0a0a0a] border border-[#8B5A2B]/30 text-[#8B5A2B] hover:bg-[#D2B48C] hover:border-[#D2B48C] hover:shadow-[0_0_15px_rgba(210,180,140,0.3)] transition-all transform hover:-translate-y-1">
                  <FaPinterest size={16} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Copyright */}
        <div className={`flex flex-col items-center justify-center ${compact ? '' : 'pt-6 border-t border-[#8B5A2B]/10'} text-[10px] text-[#808080] tracking-[4px] uppercase`}>
          <p>© 2026 AURORA. ALL SECRETS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
