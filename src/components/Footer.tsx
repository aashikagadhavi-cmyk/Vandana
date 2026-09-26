import React, { useRef } from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';
import { Language, Project } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  projects: Project[];
  onImportProjects: (imported: Project[]) => void;
  onResetProjects: () => void;
  onShowToast?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  projects,
  onImportProjects,
  onResetProjects,
  onShowToast,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang].footer;

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vandana_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportProjects(parsed);
            if (onShowToast) {
              onShowToast(lang === 'hi' ? 'प्रोजेक्ट्स सफलतापूर्वक आयात हो गए!' : 'Projects successfully imported!');
            }
          }
        } catch {
          if (onShowToast) {
            onShowToast(lang === 'hi' ? 'अमान्य JSON फ़ाइल फ़ॉर्मैट।' : 'Invalid JSON file format.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <footer className="py-12 border-t border-zinc-800 bg-[#070709] text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Mark & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <p
              className="text-base font-bold text-white tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Vandana Studio
            </p>
            <p className="text-zinc-500 text-xs">{t.tagline}</p>
          </div>

          {/* Social Links (text with hover) */}
          <div className="flex items-center gap-6 text-zinc-400">
            <a
              href="https://www.behance.net"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Dribbble
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Data Backup / Restore Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer text-[11px]"
              title="Backup your portfolio projects as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer text-[11px]"
              title="Import JSON backup"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={() => {
                if (window.confirm(lang === 'hi' ? 'क्या आप डिफ़ॉल्ट प्रोजेक्ट्स रीसेट करना चाहते हैं?' : 'Reset to default projects?')) {
                  onResetProjects();
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer text-[11px]"
              title="Reset default template"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright Line */}
        <div className="pt-6 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
          © {new Date().getFullYear()} Vandana Studio. {t.rights} Designed for bold brands.
        </div>
      </div>
    </footer>
  );
};
