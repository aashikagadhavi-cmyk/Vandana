import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { heroImg, brandingImg } from '../data/initialProjects';

interface BeforeAfterSliderProps {
  lang: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ lang }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const t = translations[lang].beforeAfter;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 md:py-24 border-b border-zinc-800/60 bg-[#0b0b0e]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
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
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => (isDragging.current = true)}
            onTouchEnd={() => (isDragging.current = false)}
            onTouchMove={handleTouchMove}
            className="relative select-none aspect-[16/9] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl cursor-ew-resize bg-zinc-950"
          >
            {/* "After" Layer (Bottom / Full Width) */}
            <div className="absolute inset-0">
              <img
                src={brandingImg}
                alt="After Redesign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute bottom-5 right-6 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg border border-zinc-700/80 text-xs font-semibold text-amber-400">
                {t.afterLabel}
              </div>
            </div>

            {/* "Before" Layer (Top / Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <img
                  src={heroImg}
                  alt="Before Draft"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-[100vw] max-w-[896px] h-full object-cover filter grayscale contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-5 left-6 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg border border-zinc-700/80 text-xs font-semibold text-zinc-300">
                  {t.beforeLabel}
                </div>
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-amber-400 shadow-lg pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-zinc-950 font-black text-xs flex items-center justify-center shadow-xl border-2 border-zinc-950">
                ↔
              </div>
            </div>
          </div>

          {/* Subtext instruction */}
          <p className="text-center text-xs text-zinc-500 mt-4">
            {lang === 'hi'
              ? 'स्लाइडर को आगे-पीछे ड्रैग करके डिज़ाइन का अंतर महसूस करें।'
              : 'Drag the slider across to compare the brand craft.'}
          </p>
        </div>
      </div>
    </section>
  );
};
