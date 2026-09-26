import React from 'react';
import { ArrowUpRight, Check, Star } from 'lucide-react';
import { DESIGN_SERVICES, TESTIMONIALS } from '../data/initialProjects';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectService,
}) => {
  const t = translations[lang].services;

  return (
    <section id="services" className="py-20 md:py-24 border-b border-zinc-800/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            {t.badge}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {t.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Services List / Clean 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DESIGN_SERVICES.map((serv) => {
            const title = lang === 'hi' ? serv.titleHi : serv.title;
            const desc = lang === 'hi' ? serv.descriptionHi : serv.description;
            const price = lang === 'hi' ? serv.startingPriceInr : serv.startingPrice;

            return (
              <div
                key={serv.id}
                className="group relative flex flex-col justify-between p-8 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl transition-all duration-300 space-y-6"
              >
                <div className="space-y-4">
                  {/* Natural Editorial Numbering & Price Line */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-black text-amber-400/80"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {serv.number}.
                    </span>
                    <div className="text-right">
                      <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
                        {t.startingFrom}
                      </span>
                      <span className="text-base font-bold text-white tabular-nums">
                        {price}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-semibold text-zinc-300 tracking-wide">
                      {t.deliverablesTitle}
                    </p>
                    <ul className="space-y-1.5">
                      {serv.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <div className="text-zinc-500">
                    <span>{t.estTimeline}: </span>
                    <span className="text-zinc-300 font-medium">{serv.turnaround}</span>
                  </div>

                  <button
                    onClick={() => onSelectService(title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>{t.bookService}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim-to-Proof Adjacency: Client Testimonials */}
        <div className="pt-12 border-t border-zinc-800/80 space-y-8">
          <div className="flex items-center justify-between">
            <h3
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {lang === 'hi' ? 'क्लाइंट्स का विश्वास व अनुभव' : 'Client Words & Endorsements'}
            </h3>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => {
              const quote = lang === 'hi' ? test.quoteHi : test.quote;
              return (
                <div
                  key={test.id}
                  className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl space-y-4 flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                    "{quote}"
                  </p>
                  <div className="pt-2 border-t border-zinc-800/60">
                    <p className="text-xs font-bold text-white">{test.author}</p>
                    <p className="text-[11px] text-zinc-500">
                      {test.role} · {test.company}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
