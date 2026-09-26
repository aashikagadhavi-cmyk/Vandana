import React, { useState } from 'react';
import { PlusCircle, Globe, Menu, X, FolderUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenPostModal: () => void;
  onOpenBatchUploader?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenPostModal,
  onOpenBatchUploader,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navLinks = [
    { href: '#works', label: t.works },
    { href: '#services', label: t.services },
    { href: '#estimator', label: t.pricing },
    { href: '#about', label: t.about },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors shrink-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {t.brand}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-400 transition-colors relative py-1 hover:underline underline-offset-8 decoration-amber-400/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Batch Uploader Quick Button */}
          {onOpenBatchUploader && (
            <button
              onClick={onOpenBatchUploader}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors cursor-pointer"
              title="Upload your 60 artwork files to replace previews"
            >
              <FolderUp className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'तस्वीरें अपलोड करें' : 'Upload Artworks'}</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700/60 rounded-lg hover:border-zinc-500 transition-colors cursor-pointer"
            title="Switch Language / भाषा बदलें"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">{t.langToggle}</span>
          </button>

          {/* Primary Action: Post Project */}
          <button
            onClick={onOpenPostModal}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-transform active:scale-95 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-zinc-950" />
            <span>{t.postProject}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-amber-400 py-1"
            >
              {link.label}
            </a>
          ))}
          {onOpenBatchUploader && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBatchUploader();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg"
            >
              <FolderUp className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'तस्वीरें अपलोड करें' : 'Upload Artworks (Bulk)'}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
