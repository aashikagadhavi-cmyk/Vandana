import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileImage,
  ArrowRight,
  Sparkles,
  RefreshCw,
  FolderUp
} from 'lucide-react';
import { Project, Language } from '../types';
import { saveProjectImage } from '../utils/imageStore';

interface BatchUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onImagesApplied: (updatedMap: Record<string, string>) => void;
  lang: Language;
}

interface QueuedFile {
  file: File;
  previewUrl: string;
  matchedProjectId: string | null;
  status: 'matched' | 'unmatched';
}

export const BatchUploaderModal: React.FC<BatchUploaderModalProps> = ({
  isOpen,
  onClose,
  projects,
  onImagesApplied,
  lang,
}) => {
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Auto-matching algorithm matching file names to project IDs
  const matchFileToProject = (filename: string): string | null => {
    const fn = filename.toLowerCase();

    if (fn.includes('herbloom')) return 'proj-herbloom-naturals';
    if (fn.includes('japanese')) return 'proj-japanese-skincare';
    if (fn.includes('350') || fn.includes('aam')) return 'proj-350ml-aam';
    if (fn.includes('strawberry')) return 'proj-strawberry-drink';
    if (fn.includes('chandigarh') || fn.includes('workshop')) return 'proj-chandigarh-workshop';
    if (fn.includes('movie') || fn.includes('the best') || fn.includes('17-09-26')) return 'proj-movie-poster-the-best';
    if (fn.includes('bike') || fn.includes('mountain')) return 'proj-mountain-bike-circuit';
    if (fn.includes('untitled')) return 'proj-untitled-creative-study';
    if (fn.includes('राधा') || fn.includes('radha') || fn.includes('carousel')) return 'proj-radha-death-carousel';
    if (fn.includes('कृष्ण') || fn.includes('krishna')) return 'proj-krishna-birth-carousel';
    if (fn.includes('जामवंत') || fn.includes('jamwant')) return 'proj-jamwant-rahasya';
    if (fn.includes('बादल') || fn.includes('badal') || fn.includes('barish')) return 'proj-badal-beni-poetry';
    if (fn.includes('worship')) return 'proj-why-we-must-worship';
    if (fn.includes('think') || fn.includes('every time')) return 'proj-every-time-i-think';
    if (fn.includes('mandala')) return 'proj-mandala-art-1';
    if (fn.includes('bride')) return 'proj-bride-illustration';
    if (fn.includes('mahabali')) return 'proj-small-mahabali';
    if (fn.includes('illus')) return 'proj-illus-series-2';
    if (fn.includes('artboard') && (fn.includes('7') || fn.includes('resume'))) return 'proj-vandana-resume-profile';
    if (fn.includes('filming')) return 'proj-vandana-resume-profile';
    if (fn.includes('artboard') || fn.includes('art board')) return 'proj-artboard-vector-suite';
    if (fn.includes('brand') || fn.includes('brand 1') || fn.includes('brand 2')) return 'proj-brand-systems-suite';
    if (fn.includes('project') || fn.includes('pro ject')) return 'proj-commercial-projects-suite';
    if (fn.includes('1.png') || fn.includes('5.png') || fn.includes('7.png')) return 'proj-creative-number-series';

    // Fallback: match by title similarity
    const matched = projects.find((p) => {
      const titleLower = p.title.toLowerCase();
      const parts = fn.replace(/\.[^/.]+$/, '').split(/[\s-_]+/);
      return parts.some((part) => part.length > 3 && titleLower.includes(part));
    });

    return matched ? matched.id : null;
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newQueued: QueuedFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        const matchedProjectId = matchFileToProject(file.name);
        newQueued.push({
          file,
          previewUrl,
          matchedProjectId,
          status: matchedProjectId ? 'matched' : 'unmatched',
        });
      }
    });

    setQueuedFiles((prev) => [...prev, ...newQueued]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleManualMatch = (index: number, projectId: string) => {
    setQueuedFiles((prev) => {
      const copy = [...prev];
      copy[index].matchedProjectId = projectId || null;
      copy[index].status = projectId ? 'matched' : 'unmatched';
      return copy;
    });
  };

  const handleRemoveQueueItem = (index: number) => {
    setQueuedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyAll = async () => {
    setIsProcessing(true);
    const updatedMap: Record<string, string> = {};

    for (const item of queuedFiles) {
      if (item.matchedProjectId) {
        // Convert to Base64 data URL
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(item.file);
        });

        // Store in IndexedDB for permanent storage
        await saveProjectImage(item.matchedProjectId, dataUrl);
        updatedMap[item.matchedProjectId] = dataUrl;
      }
    }

    onImagesApplied(updatedMap);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FolderUp className="w-5 h-5" />
            </div>
            <div>
              <h2
                className="text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {lang === 'hi'
                  ? 'अपनी तस्वीरें सीधे अपलोड करें'
                  : 'Upload & Auto-Match Your Artwork Files'}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {lang === 'hi'
                  ? 'अपने कंप्यूटर से अपनी सभी फ़ाइलें चुनें (जैसे HERBLOOM NATURALS, 350 ML AAM, आदि) और वे तुरंत अपनी जगह पर सेट हो जाएंगी।'
                  : 'Select your artwork image files. The app reads filenames and automatically matches them to your portfolio projects!'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
              dragActive
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-zinc-700/80 hover:border-amber-400/60 bg-zinc-900/40 hover:bg-zinc-900/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />

            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {lang === 'hi'
                  ? 'फ़ाइलें चुनने के लिए क्लिक करें या यहाँ ड्रैग करें'
                  : 'Click to select artwork files or drag & drop them here'}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {lang === 'hi'
                  ? 'आप एक साथ 10, 20 या सभी 60 तस्वीरें चुन सकते हैं (PNG, JPG, WEBP)'
                  : 'Select any or all 60 of your image files at once (PNG, JPG, WEBP)'}
              </p>
            </div>

            <span className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-zinc-950 font-semibold text-xs mt-1 shadow-sm">
              {lang === 'hi' ? 'कंप्यूटर से तस्वीरें चुनें' : 'Browse Files on Your Computer'}
            </span>
          </div>

          {/* Queued Files Preview List */}
          {queuedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>
                    {lang === 'hi'
                      ? `चुनी गई तस्वीरें (${queuedFiles.length})`
                      : `Selected Artworks (${queuedFiles.length})`}
                  </span>
                  <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                    {queuedFiles.filter((q) => q.matchedProjectId).length} Auto-Matched
                  </span>
                </h3>

                <button
                  onClick={() => setQueuedFiles([])}
                  className="text-xs text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'सूची साफ़ करें' : 'Clear All'}
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {queuedFiles.map((item, index) => {
                  const matchedProj = projects.find((p) => p.id === item.matchedProjectId);

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs"
                    >
                      {/* Left: Thumbnail & Filename */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={item.previewUrl}
                          alt={item.file.name}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-950 border border-zinc-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate text-xs" title={item.file.name}>
                            {item.file.name}
                          </p>
                          <p className="text-[11px] text-zinc-500 font-mono">
                            {(item.file.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>

                      {/* Middle: Match Status & Dropdown */}
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 shrink-0 hidden sm:block" />

                        <select
                          value={item.matchedProjectId || ''}
                          onChange={(e) => handleManualMatch(index, e.target.value)}
                          className={`bg-zinc-950 border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none transition-colors max-w-[220px] truncate ${
                            item.matchedProjectId
                              ? 'border-emerald-500/50 text-emerald-300'
                              : 'border-amber-500/50 text-amber-300'
                          }`}
                        >
                          <option value="">-- {lang === 'hi' ? 'प्रोजेक्ट चुनें' : 'Choose Project'} --</option>
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => handleRemoveQueueItem(index)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {queuedFiles.length === 0 && (
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60 text-xs text-zinc-400 space-y-2">
              <p className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>
                  {lang === 'hi' ? 'स्वचालित मिलान (Smart Auto-Match)' : 'Smart Filename Matching'}
                </span>
              </p>
              <p>
                {lang === 'hi'
                  ? 'जैसे ही आप अपनी फ़ाइलें चुनेंगे, वेबसाइट उनके नाम से पहचान कर सही प्रोजेक्ट पर अपने आप सेट कर देगी (जैसे HERBLOOM, 350 ML AAM, STRAWBERRY, WORKSHOP, MANDALA, BRIDE, आदि)।'
                  : 'Files named "HERBLOOM NATURALS", "350 ML AAM", "STRAWBERRY 1", "WORKSHOP IN CHANDIGARH", "MANDALA ART", "BRIDE", "SMALL MAHABALI", "MOVIE POSTER", etc., will automatically pair with their corresponding project cards!'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-zinc-800 bg-zinc-900/60">
          <p className="text-xs text-zinc-400">
            {queuedFiles.length > 0
              ? `${queuedFiles.filter((q) => q.matchedProjectId).length} of ${queuedFiles.length} files ready to apply.`
              : 'No files selected yet.'}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>

            <button
              onClick={handleApplyAll}
              disabled={queuedFiles.length === 0 || isProcessing}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer shadow-md"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{lang === 'hi' ? 'सेव हो रहा है...' : 'Saving Artworks...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {lang === 'hi'
                      ? 'पोर्टफोलियो में तस्वीरें लागू करें'
                      : 'Apply Images to Portfolio'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
