import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Edit3, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';

interface ProjectModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
  onEdit: (project: Project) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  lang,
  onClose,
  onEdit,
  onNext,
  onPrev,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  const t = translations[lang].caseStudy;
  const displayTitle = lang === 'hi' && project.titleHi ? project.titleHi : project.title;
  const displayDesc = lang === 'hi' && project.descriptionHi ? project.descriptionHi : project.description;

  const allImages = [
    project.coverImage,
    ...(project.galleryImages ? project.galleryImages.filter((img) => img !== project.coverImage) : []),
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      <div
        className="relative w-full max-w-5xl bg-[#0f0f12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0f0f12]/90 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="font-semibold text-amber-400">{project.category}</span>
            <span>·</span>
            <span>{project.client}</span>
            <span>·</span>
            <span className="tabular-nums">{project.year}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit(project)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.editThisProject}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-10">
          {/* Main Showcase Image */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={allImages[activeImageIndex] || project.coverImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Prev / Next image arrows if multiple */}
              {allImages.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
                    }
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white pointer-events-auto transition-transform active:scale-95 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
                    }
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white pointer-events-auto transition-transform active:scale-95 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === i ? 'border-amber-400 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Overview */}
          <div className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {displayTitle}
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {displayDesc}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-950/70 border border-zinc-800/80 rounded-xl">
              {project.challenge && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                    {t.challenge}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                    {t.solution}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Color Palette Breakdown */}
          {project.colors && project.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-300 tracking-wider uppercase">
                  {t.colorPalette}
                </h4>
                <span className="text-[11px] text-zinc-500">{t.clickToCopy}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.colors.map((color, idx) => {
                  const isCopied = copiedHex === color.hex;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleCopyHex(color.hex)}
                      className="group p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-3 cursor-pointer hover:border-zinc-700 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg shadow-inner border border-black/40 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white truncate">
                          {color.name || 'Color'}
                        </p>
                        <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                          <span>{color.hex.toUpperCase()}</span>
                          {isCopied ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Typography System & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-800/80">
            {/* Typography */}
            {project.typography && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-300 tracking-wider uppercase">
                  {t.typography}
                </h4>
                <div className="space-y-3 bg-zinc-950/60 p-4 border border-zinc-800 rounded-xl">
                  <div>
                    <p className="text-[11px] text-amber-400 font-medium">
                      {t.headingFont}
                    </p>
                    <p className="text-base font-bold text-white mt-0.5">
                      {project.typography.heading}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800/60">
                    <p className="text-[11px] text-zinc-400 font-medium">{t.bodyFont}</p>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      {project.typography.body}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Deliverables */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-300 tracking-wider uppercase">
                  {t.deliverables}
                </h4>
                <ul className="space-y-2 bg-zinc-950/60 p-4 border border-zinc-800 rounded-xl">
                  {project.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-zinc-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tools & Footer Info */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <div>
              <span className="font-semibold text-zinc-300">{t.softwareTools}: </span>
              <span>{project.tools.join(' · ')}</span>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
