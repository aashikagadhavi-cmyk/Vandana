import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Eye,
  Edit3,
  Trash2,
  PlusCircle,
  ArrowUpRight,
  BarChart2,
  Layers,
  Sparkles,
  Package,
  Printer,
  Share2,
  Monitor,
  RotateCcw,
  SlidersHorizontal,
  FolderUp,
  Camera
} from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';

interface PortfolioGridProps {
  projects: Project[];
  lang: Language;
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onOpenPostModal: (category?: Project['category']) => void;
  onOpenBatchUploader?: () => void;
  onQuickUploadImage?: (projectId: string, file: File) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  lang,
  onSelectProject,
  onEditProject,
  onDeleteProject,
  onOpenPostModal,
  onOpenBatchUploader,
  onQuickUploadImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const t = translations[lang].portfolio;

  // Compute live project counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: projects.length,
      Branding: 0,
      Packaging: 0,
      'Print & Posters': 0,
      'Social Media': 0,
      'UI & Digital': 0,
    };
    projects.forEach((project) => {
      if (counts[project.category] !== undefined) {
        counts[project.category]++;
      }
    });
    return counts;
  }, [projects]);

  const categoryCards = [
    {
      key: 'All',
      label: t.all,
      icon: Layers,
      count: categoryCounts['All'] || 0,
      tagHi: 'समस्त संग्रह',
      tagEn: 'Master Archive',
    },
    {
      key: 'Branding',
      label: t.branding,
      icon: Sparkles,
      count: categoryCounts['Branding'] || 0,
      tagHi: 'लोगो व पहचान',
      tagEn: 'Logos & Identity',
    },
    {
      key: 'Packaging',
      label: t.packaging,
      icon: Package,
      count: categoryCounts['Packaging'] || 0,
      tagHi: 'लेबल व बॉटल',
      tagEn: 'Labels & Boxes',
    },
    {
      key: 'Print & Posters',
      label: t.print,
      icon: Printer,
      count: categoryCounts['Print & Posters'] || 0,
      tagHi: 'पोस्टर व प्रिंट',
      tagEn: 'Posters & Print',
    },
    {
      key: 'Social Media',
      label: t.social,
      icon: Share2,
      count: categoryCounts['Social Media'] || 0,
      tagHi: 'कैरोसेल व पोस्ट्स',
      tagEn: 'Carousels & Feed',
    },
    {
      key: 'UI & Digital',
      label: t.digital,
      icon: Monitor,
      count: categoryCounts['UI & Digital'] || 0,
      tagHi: 'मंडाला व वेक्टर्स',
      tagEn: 'Mandalas & Vectors',
    },
  ];

  const categories: { key: string; label: string }[] = [
    { key: 'All', label: t.all },
    { key: 'Branding', label: t.branding },
    { key: 'Packaging', label: t.packaging },
    { key: 'Print & Posters', label: t.print },
    { key: 'Social Media', label: t.social },
    { key: 'UI & Digital', label: t.digital },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        (project.titleHi && project.titleHi.toLowerCase().includes(q)) ||
        project.client.toLowerCase().includes(q) ||
        project.tools.some((t) => t.toLowerCase().includes(q)) ||
        project.deliverables.some((d) => d.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="works" className="py-20 md:py-24 border-b border-zinc-800/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Action Buttons: Bulk Artwork Upload & Post Project */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenBatchUploader && (
              <button
                onClick={onOpenBatchUploader}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <FolderUp className="w-4 h-4 text-amber-400" />
                <span>{lang === 'hi' ? 'तस्वीरें अपलोड करें (Bulk)' : 'Upload My Artworks (Bulk)'}</span>
              </button>
            )}

            <button
              onClick={() => onOpenPostModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{translations[lang].nav.postProject}</span>
            </button>
          </div>
        </div>

        {/* ── PROJECT SUMMARY WIDGET (Category counts breakdown) ── */}
        <div className="p-5 sm:p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-5 shadow-xl backdrop-blur-sm">
          {/* Summary Widget Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3
                  className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <span>{t.summaryTitle}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono font-normal">
                    {projects.length} {t.summaryTotalWorks}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {t.summarySubtitle}
                </p>
              </div>
            </div>

            {/* Current Active Filter Indicator & Reset */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
                <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                <span>
                  {t.summaryShowingCategory}: <strong className="text-amber-300 font-semibold">{categoryCards.find(c => c.key === selectedCategory)?.label || selectedCategory}</strong>
                </span>
              </span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer border border-zinc-700/70"
                  title="Reset filter to show all"
                >
                  <RotateCcw className="w-3 h-3 text-zinc-400" />
                  <span>{lang === 'hi' ? 'सभी देखें' : 'Show All'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryCards.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedCategory === item.key;
              const total = projects.length || 1;
              const percentage = Math.round((item.count / total) * 100);

              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedCategory(item.key)}
                  className={`group relative text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-amber-400/[0.08] border-amber-400/80 ring-1 ring-amber-400/40 shadow-lg shadow-amber-950/20'
                      : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                  aria-pressed={isSelected}
                  title={`${item.label} (${item.count})`}
                >
                  {/* Top: Icon & Percentage Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                        isSelected
                          ? 'text-amber-300 bg-amber-950/40 font-semibold'
                          : 'text-zinc-500 bg-zinc-900'
                      }`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  {/* Middle: Count & Label */}
                  <div className="space-y-0.5 mb-2.5">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {item.count}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono">
                        {lang === 'hi' ? 'कार्य' : 'items'}
                      </span>
                    </div>

                    <p
                      className={`text-xs font-semibold leading-tight line-clamp-1 transition-colors ${
                        isSelected
                          ? 'text-amber-300'
                          : 'text-zinc-300 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </p>

                    <p className="text-[10px] text-zinc-500 line-clamp-1">
                      {lang === 'hi' ? item.tagHi : item.tagEn}
                    </p>
                  </div>

                  {/* Bottom: Progress Bar */}
                  <div className="w-full h-1 bg-zinc-800/80 rounded-full overflow-hidden mt-auto">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isSelected
                          ? 'bg-amber-400'
                          : 'bg-zinc-600 group-hover:bg-zinc-500'
                      }`}
                      style={{ width: `${Math.max(percentage, 8)}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar: Category Buttons & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-2 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          {/* Category Tabs (Segmented functional buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              const count = categoryCounts[cat.key] || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      active
                        ? 'bg-zinc-950/20 text-zinc-900 font-bold'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-zinc-950/80 border border-zinc-700/60 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-8 space-y-4">
            <p className="text-zinc-400 text-sm">{t.noResults}</p>
            <button
              onClick={() => onOpenPostModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.postProjectPrompt}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                {/* Project Image Viewport */}
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-zinc-950 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.coverImage}
                    alt={lang === 'hi' && project.titleHi ? project.titleHi : project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Overlay & Hover Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Category & Year Stamp */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-semibold tracking-wider text-amber-400 uppercase text-[11px] bg-zinc-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-zinc-800/60">
                      {project.category}
                    </span>

                    {/* Single-Click Instant Image Upload on Card */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => {
                          fileInputRefs.current[project.id] = el;
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && onQuickUploadImage) {
                            onQuickUploadImage(project.id, file);
                          }
                        }}
                      />
                      <button
                        onClick={() => fileInputRefs.current[project.id]?.click()}
                        className="p-1.5 rounded-md bg-zinc-950/80 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 border border-zinc-700/80 backdrop-blur-sm transition-colors cursor-pointer"
                        title={lang === 'hi' ? 'इस प्रोजेक्ट के लिए अपनी असली तस्वीर अपलोड करें' : 'Upload your real artwork photo for this project'}
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-zinc-300 font-mono text-[11px] bg-zinc-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Quick View Case Study Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.viewCaseStudy}</span>
                    </span>
                  </div>
                </div>

                {/* Project Metadata Card */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-400 font-medium">
                      {project.client}
                    </p>
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-2"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {lang === 'hi' && project.titleHi ? project.titleHi : project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {lang === 'hi' && project.descriptionHi
                        ? project.descriptionHi
                        : project.description}
                    </p>
                  </div>

                  {/* Software Stack & Deliverables snippet */}
                  <div className="space-y-3 pt-3 border-t border-zinc-800/60">
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-400">
                      {project.tools.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-zinc-300 font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="px-1.5 py-0.5 text-zinc-500 text-[10px]">
                          +{project.tools.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Color Palette Indicators */}
                    {project.colors && project.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        {project.colors.slice(0, 4).map((c, i) => (
                          <div
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-zinc-700/80 shadow-xs"
                            style={{ backgroundColor: c.hex }}
                            title={`${c.name} (${c.hex})`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Action Bar (View, Edit, Delete) */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        <span>{t.viewCaseStudy}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditProject(project)}
                          aria-label={`Edit ${project.title}`}
                          className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                          title={t.edit}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(t.confirmDelete)) {
                              onDeleteProject(project.id);
                            }
                          }}
                          aria-label={`Delete ${project.title}`}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/20 rounded transition-colors cursor-pointer"
                          title={t.delete}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
