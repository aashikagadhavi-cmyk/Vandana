import React from 'react';
import { ArrowDownRight, PlusCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { heroImg } from '../data/initialProjects';

interface HeroProps {
  lang: Language;
  onOpenPostModal: () => void;
  totalProjects: number;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenPostModal, totalProjects }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-zinc-800/60">
      {/* Subtle background ambient radial gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typographic Statement & Value */}
          <div className="lg:col-span-7 space-y-8">
            {/* Subtle designer descriptor (natural unboxed text, no pills) */}
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-amber-400 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{t.designerBadge}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Available for Select Projects</span>
            </div>

            {/* Massive Display Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t.mainHeadline}
            </h1>

            {/* Refined Body Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              {t.subHeadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#works"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all active:scale-95 shadow-lg shadow-amber-400/10 cursor-pointer"
              >
                <span>{t.exploreBtn}</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenPostModal}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>{t.postWorkBtn}</span>
              </button>
            </div>

            {/* Impact Metrics Adjacency (Zero-pill, tabular numbers, strictly typography) */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {t.statExperience}
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-medium">{t.statExpLabel}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {totalProjects}+
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-medium">
                  {lang === 'hi' ? 'लाइव प्रोजेक्ट्स' : 'Active Projects'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                  {t.statSatisfaction}
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-medium">{t.statSatLabel}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer frame glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-zinc-700/30 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Graphic Design Studio Brand Mockup"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Measured Scrim for contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent flex flex-col justify-end p-6">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured Studio Showcase · 2026</span>
                    </p>
                    <h2
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Bespoke Brand Identity & Embossed Stationery
                    </h2>
                    <p className="text-xs text-zinc-300">
                      Print-ready dielines · Foil stamping · Custom Monogram
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
