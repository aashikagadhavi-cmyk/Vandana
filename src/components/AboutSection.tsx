import React from 'react';
import { Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { avatarImg } from '../data/initialProjects';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang].about;

  const softwareStack = [
    { name: 'Adobe Illustrator', exp: 'Vector Identity & Packaging Dielines' },
    { name: 'Adobe Photoshop', exp: 'Photo Manipulation & Studio Mockups' },
    { name: 'Adobe InDesign', exp: 'Editorial Typesetting & Publication Design' },
    { name: 'Figma', exp: 'Design Systems & Digital Social Templates' },
    { name: 'Blender 3D', exp: 'Tactile Product Packaging Renders' },
    { name: 'Glyphs App', exp: 'Bespoke Logotype & Font Customization' },
  ];

  const handleDownloadDeck = () => {
    // Generate text summary download for the client
    const textContent = `VANDANA STUDIO — CREATIVE GRAPHIC DESIGNER PORTFOLIO DECK\n
Role: Senior Graphic Designer & Brand Identity Specialist
Email: vandanaarmy123@gmail.com
Experience: 6+ Years
Specialties: Brand Identity Systems, Packaging & Label Architecture, Print Collateral, Social Media Direction.

Key Deliverables:
- Vector Logo Suites (AI, EPS, SVG)
- Print-ready packaging dielines with bleeds & spot finishes
- Comprehensive Brand Style Guides (40+ pages)
- Typography pairings & Color harmony schemes

Thank you for reviewing my work!`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vandana_Graphic_Designer_Portfolio_Deck.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="about" className="py-20 md:py-24 border-b border-zinc-800/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Visual Framing */}
          <div className="lg:col-span-5">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/20 to-zinc-700/20 rounded-2xl blur-lg opacity-60" />

              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-square shadow-2xl">
                <img
                  src={avatarImg}
                  alt="Vandana - Graphic Designer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Vandana
                  </p>
                  <p className="text-xs text-amber-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Disciplines */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.badge}</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {t.title}
              </h2>
              <p className="text-sm font-semibold text-zinc-300">{t.role}</p>
            </div>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              <p>{t.bio1}</p>
              <p>{t.bio2}</p>
            </div>

            {/* Core Disciplines List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.skillsTitle}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {t.skillsList.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Toolkit */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.toolsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {softwareStack.map((soft, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-lg text-xs"
                  >
                    <p className="font-bold text-zinc-200">{soft.name}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{soft.exp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Deck CTA */}
            <div className="pt-2">
              <button
                onClick={handleDownloadDeck}
                className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadResume}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
