import React, { useState, useEffect } from 'react';
import { X, Upload, Palette, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Project, ColorSwatch, Language } from '../types';
import { translations } from '../data/translations';
import { heroImg, brandingImg, editorialImg, coffeeImg } from '../data/initialProjects';

interface PostProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  editingProject?: Project | null;
  defaultCategory?: Project['category'];
  lang: Language;
}

const PRESET_MOCKUPS = [
  { label: 'Minimalist Skincare Packaging', src: brandingImg },
  { label: 'Artisan Coffee Pouch Mockup', src: coffeeImg },
  { label: 'Avant-Garde Typography & Posters', src: editorialImg },
  { label: 'Luxury Foil Stationery Suite', src: heroImg },
];

export const PostProjectModal: React.FC<PostProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
  defaultCategory,
  lang,
}) => {
  const t = translations[lang].postModal;

  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [category, setCategory] = useState<Project['category']>('Branding');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2026');
  const [coverImage, setCoverImage] = useState(brandingImg);
  const [imageType, setImageType] = useState<'preset' | 'upload' | 'url'>('preset');
  const [customUrl, setCustomUrl] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionHi, setDescriptionHi] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [toolsInput, setToolsInput] = useState('Adobe Illustrator, Adobe Photoshop, InDesign');
  const [colors, setColors] = useState<ColorSwatch[]>([
    { hex: '#1C1F1E', name: 'Dark Slate' },
    { hex: '#EAE5DB', name: 'Alabaster' },
    { hex: '#B87333', name: 'Foil Copper' },
  ]);
  const [headingFont, setHeadingFont] = useState('Syne Bold');
  const [bodyFont, setBodyFont] = useState('Plus Jakarta Sans');
  const [deliverablesInput, setDeliverablesInput] = useState('Logo Pack, Brand Guide, Vector Dielines, Mockups');
  const [featured, setFeatured] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync state if editing an existing project
  useEffect(() => {
    setFormError(null);
    if (editingProject) {
      setTitle(editingProject.title);
      setTitleHi(editingProject.titleHi || '');
      setCategory(editingProject.category);
      setClient(editingProject.client);
      setYear(editingProject.year);
      setCoverImage(editingProject.coverImage);
      setDescription(editingProject.description);
      setDescriptionHi(editingProject.descriptionHi || '');
      setChallenge(editingProject.challenge || '');
      setSolution(editingProject.solution || '');
      setToolsInput(editingProject.tools.join(', '));
      setColors(editingProject.colors || []);
      setHeadingFont(editingProject.typography?.heading || 'Syne Bold');
      setBodyFont(editingProject.typography?.body || 'Plus Jakarta Sans');
      setDeliverablesInput((editingProject.deliverables || []).join(', '));
      setFeatured(!!editingProject.featured);
    } else {
      // Reset form for fresh creation
      setTitle('');
      setTitleHi('');
      setCategory(defaultCategory || 'Branding');
      setClient('');
      setYear('2026');
      setCoverImage(brandingImg);
      setImageType('preset');
      setDescription('');
      setDescriptionHi('');
      setChallenge('');
      setSolution('');
      setToolsInput('Adobe Illustrator, Photoshop, InDesign');
      setColors([
        { hex: '#2A3B32', name: 'Spruce' },
        { hex: '#EAE5DB', name: 'Cream' },
        { hex: '#B87333', name: 'Copper' },
      ]);
      setHeadingFont('Cormorant Garamond');
      setBodyFont('Plus Jakarta Sans');
      setDeliverablesInput('Brand Identity Suite, Vector Logos, Packaging Mockups');
      setFeatured(true);
    }
  }, [editingProject, defaultCategory, isOpen]);

  if (!isOpen) return null;

  // Handle local file upload via FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddColor = () => {
    setColors([...colors, { hex: '#D4AF37', name: 'Accent Gold' }]);
  };

  const handleUpdateColor = (index: number, hex: string, name: string) => {
    const updated = [...colors];
    updated[index] = { hex, name };
    setColors(updated);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim() || !description.trim()) {
      setFormError(
        lang === 'hi'
          ? 'कृपया आवश्यक जानकारी (शीर्षक, क्लाइंट, विवरण) भरें।'
          : 'Please fill all required fields (Title, Client, Description).'
      );
      return;
    }
    setFormError(null);

    const tools = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const deliverables = deliverablesInput
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const projectData: Project = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      title: title.trim(),
      titleHi: titleHi.trim() || undefined,
      category,
      client: client.trim(),
      year: year.trim() || '2026',
      coverImage: coverImage,
      galleryImages: [coverImage],
      description: description.trim(),
      descriptionHi: descriptionHi.trim() || undefined,
      challenge: challenge.trim() || undefined,
      solution: solution.trim() || undefined,
      tools: tools.length > 0 ? tools : ['Adobe Illustrator', 'Photoshop'],
      colors,
      typography: {
        heading: headingFont.trim() || 'Display Serif',
        body: bodyFont.trim() || 'Clean Sans',
      },
      deliverables: deliverables.length > 0 ? deliverables : ['Brand Assets'],
      featured,
      createdAt: editingProject ? editingProject.createdAt : Date.now(),
    };

    onSave(projectData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className="relative w-full max-w-3xl bg-[#101014] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-[#121217]">
          <div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {editingProject ? t.editTitle : t.createTitle}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Title & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.projectTitle}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.projectTitlePlaceholder}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.category}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
              >
                <option value="Branding">Brand Identity & Logos</option>
                <option value="Packaging">Packaging & Label Design</option>
                <option value="Print & Posters">Print & Posters</option>
                <option value="Social Media">Social Media Creatives</option>
                <option value="UI & Digital">UI & Digital</option>
              </select>
            </div>
          </div>

          {/* Hindi Title (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              {lang === 'hi' ? 'प्रोजेक्ट का शीर्षक (हिंदी - वैकल्पिक)' : 'Project Title in Hindi (Optional)'}
            </label>
            <input
              type="text"
              value={titleHi}
              onChange={(e) => setTitleHi(e.target.value)}
              placeholder="उदा. ऑरा स्किनकेयर · लग्जरी पैकेजिंग"
              className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Client & Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.clientName}
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder={t.clientPlaceholder}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">{t.year}</label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 tabular-nums"
              />
            </div>
          </div>

          {/* Cover Image Selector */}
          <div className="space-y-3 p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                {t.coverImage}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setImageType('preset')}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-colors cursor-pointer ${
                    imageType === 'preset' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Preset Studio Art
                </button>
                <button
                  type="button"
                  onClick={() => setImageType('upload')}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-colors cursor-pointer ${
                    imageType === 'upload' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageType('url')}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-colors cursor-pointer ${
                    imageType === 'url' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Mode 1: Presets */}
            {imageType === 'preset' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {PRESET_MOCKUPS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCoverImage(preset.src)}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all aspect-[4/3] bg-zinc-900 ${
                      coverImage === preset.src ? 'border-amber-400 scale-[1.02]' : 'border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.src}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 flex items-end">
                      <span className="text-[10px] text-white font-medium line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mode 2: Upload File */}
            {imageType === 'upload' && (
              <div className="pt-2">
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-xl cursor-pointer bg-zinc-900/60 transition-colors">
                  <Upload className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-xs text-zinc-200 font-medium">
                    {t.uploadFromDevice}
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-1">PNG, JPG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Mode 3: Custom URL */}
            {imageType === 'url' && (
              <div className="pt-2 flex gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    if (e.target.value) setCoverImage(e.target.value);
                  }}
                  placeholder={t.customUrlPlaceholder}
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            )}

            {/* Selected Image Preview */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-zinc-400">Current Preview:</span>
              <div className="w-16 h-12 rounded-md overflow-hidden border border-zinc-700 bg-zinc-900">
                <img
                  src={coverImage}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              {t.description}
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descPlaceholder}
              className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">{t.challenge}</label>
              <textarea
                rows={2}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder={t.challengePlaceholder}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">{t.solution}</label>
              <textarea
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder={t.solutionPlaceholder}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Color Palette Builder */}
          <div className="space-y-3 p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  {t.colorPalette}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addColor}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {colors.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) => handleUpdateColor(idx, e.target.value, c.name)}
                    className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={c.hex}
                      onChange={(e) => handleUpdateColor(idx, e.target.value, c.name)}
                      className="w-full font-mono text-[11px] bg-transparent text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => handleUpdateColor(idx, c.hex, e.target.value)}
                      placeholder="Name"
                      className="w-full text-[10px] bg-transparent text-zinc-400 focus:outline-none"
                    />
                  </div>
                  {colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(idx)}
                      className="text-zinc-600 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Typography System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">{t.headingFont}</label>
              <input
                type="text"
                value={headingFont}
                onChange={(e) => setHeadingFont(e.target.value)}
                placeholder={t.headingFontPlaceholder}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">{t.bodyFont}</label>
              <input
                type="text"
                value={bodyFont}
                onChange={(e) => setBodyFont(e.target.value)}
                placeholder={t.bodyFontPlaceholder}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Tools & Deliverables */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">{t.tools}</label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder={t.toolsPlaceholder}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.deliverables}
              </label>
              <input
                type="text"
                value={deliverablesInput}
                onChange={(e) => setDeliverablesInput(e.target.value)}
                placeholder={t.deliverablesPlaceholder}
                className="w-full bg-zinc-900 border border-zinc-700/70 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2.5 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-amber-400 focus:ring-amber-400 cursor-pointer"
            />
            <label htmlFor="featured" className="text-xs font-medium text-zinc-300 cursor-pointer">
              {t.featured}
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingProject ? t.updateProject : t.saveProject}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
