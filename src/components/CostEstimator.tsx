import React, { useState } from 'react';
import { Calculator, MessageSquare, Mail, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CostEstimatorProps {
  lang: Language;
  onInquireEmail: (details: string) => void;
}

interface PackageOption {
  id: string;
  name: string;
  nameHi: string;
  priceUsd: number;
  priceInr: number;
  description: string;
}

interface AddonOption {
  id: string;
  name: string;
  nameHi: string;
  priceUsd: number;
  priceInr: number;
}

const PACKAGES: PackageOption[] = [
  {
    id: 'brand',
    name: 'Full Brand Identity Suite',
    nameHi: 'सम्पूर्ण ब्रांड आइडेंटिटी व लोगो',
    priceUsd: 650,
    priceInr: 28000,
    description: 'Logo mark suite, color system, typography pairings & basic guidelines',
  },
  {
    id: 'packaging',
    name: 'Packaging & Label Architecture',
    nameHi: 'पैकेजिंग डाई-लाइन्स व लेबल्स',
    priceUsd: 550,
    priceInr: 22000,
    description: 'Print-ready box/bottle/pouch dielines with CMYK printer specs',
  },
  {
    id: 'print',
    name: 'Print & Editorial Collateral',
    nameHi: 'प्रिंट, कैटलॉग व स्टेशनरी',
    priceUsd: 400,
    priceInr: 15000,
    description: 'Brochures, stationery, event posters & publication layouts',
  },
  {
    id: 'social',
    name: 'Social Media Launch Kit',
    nameHi: 'सोशल मीडिया क्रिएटिव किट',
    priceUsd: 350,
    priceInr: 14000,
    description: '20 high-converting Instagram carousels & editable Canva/Figma templates',
  },
];

const ADDONS: AddonOption[] = [
  {
    id: '3d-mockups',
    name: '3D Photorealistic Packaging Renders (5x Angles)',
    nameHi: '3D रियलिस्टिक पैकेजिंग रेंडर्स (5 एंगल्स)',
    priceUsd: 150,
    priceInr: 6000,
  },
  {
    id: 'brand-book',
    name: 'Comprehensive 40-Page Brand Style Guide Manual',
    nameHi: '40-पेज विस्तृत ब्रांड स्टाइल गाइड बुक',
    priceUsd: 200,
    priceInr: 8000,
  },
  {
    id: 'vector-pack',
    name: 'Complete Vector Master Archive (AI, EPS, SVG, PDF)',
    nameHi: 'मास्टर वेक्टर फाइल्स आर्काइव (AI, EPS, SVG)',
    priceUsd: 100,
    priceInr: 4000,
  },
  {
    id: 'express',
    name: 'Priority Rush Delivery (7 Days Fast-Track)',
    nameHi: 'फास्ट-ट्रैक डिलीवरी (7 कार्य दिवस)',
    priceUsd: 180,
    priceInr: 7500,
  },
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({ lang, onInquireEmail }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('brand');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['brand-book', 'vector-pack']);
  const [currency, setCurrency] = useState<'INR' | 'USD'>(lang === 'hi' ? 'INR' : 'USD');

  const t = translations[lang].estimator;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalCost = React.useMemo(() => {
    let sum = currency === 'INR' ? currentPkg.priceInr : currentPkg.priceUsd;
    selectedAddons.forEach((addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        sum += currency === 'INR' ? addon.priceInr : addon.priceUsd;
      }
    });
    return sum;
  }, [selectedPackage, selectedAddons, currency, currentPkg]);

  const formattedTotal = currency === 'INR' ? `₹${totalCost.toLocaleString('en-IN')}` : `$${totalCost.toLocaleString('en-US')}`;

  const getBreakdownSummary = () => {
    const pkgName = lang === 'hi' ? currentPkg.nameHi : currentPkg.name;
    const addonNames = selectedAddons
      .map((id) => {
        const a = ADDONS.find((item) => item.id === id);
        return a ? (lang === 'hi' ? a.nameHi : a.name) : '';
      })
      .filter(Boolean)
      .join(', ');

    return `Project: ${pkgName} | Addons: ${addonNames || 'None'} | Est. Investment: ${formattedTotal}`;
  };

  const handleWhatsApp = () => {
    const summary = getBreakdownSummary();
    const message = encodeURIComponent(
      `Hi Vandana! I am interested in booking design work through your portfolio estimator:\n\n${summary}\n\nPlease let me know your availability.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <section id="estimator" className="py-20 md:py-24 border-b border-zinc-800/60 bg-[#09090c] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
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

        {/* Estimator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            {/* Currency Selector */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300">{t.currencyToggle}</span>
              <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    currency === 'INR' ? 'bg-amber-400 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  INR (₹)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    currency === 'USD' ? 'bg-amber-400 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Step 1: Package Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.serviceType}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  const price = currency === 'INR' ? `₹${pkg.priceInr.toLocaleString('en-IN')}` : `$${pkg.priceUsd}`;
                  const title = lang === 'hi' ? pkg.nameHi : pkg.name;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/5'
                          : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-white leading-snug">{title}</p>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        )}
                      </div>
                      <div className="flex items-baseline justify-between pt-1 border-t border-zinc-800/60">
                        <span className="text-[11px] text-zinc-500">Base Scope</span>
                        <span className="text-sm font-bold text-white tabular-nums">{price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-on Deliverables */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.deliverablesSection}
              </h3>
              <div className="space-y-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const price = currency === 'INR' ? `+₹${addon.priceInr.toLocaleString('en-IN')}` : `+$${addon.priceUsd}`;
                  const name = lang === 'hi' ? addon.nameHi : addon.name;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer text-xs ${
                        isChecked
                          ? 'border-amber-400/60 bg-amber-400/5 text-white'
                          : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-amber-400 focus:ring-0 cursor-pointer"
                        />
                        <span className="font-medium">{name}</span>
                      </div>
                      <span className="font-mono text-zinc-300 font-bold tabular-nums ml-2 shrink-0">
                        {price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary: Right Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-8 bg-zinc-900/90 border border-zinc-700/80 rounded-2xl shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {t.estimatedCost}
                </span>
                <p
                  className="text-4xl sm:text-5xl font-extrabold text-amber-400 tabular-nums"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {formattedTotal}
                </p>
                <p className="text-[11px] text-zinc-500 pt-1">{t.disclaimer}</p>
              </div>

              {/* Selected Breakdown Recap */}
              <div className="space-y-2 py-4 border-y border-zinc-800 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span className="truncate max-w-[65%]">
                    {lang === 'hi' ? currentPkg.nameHi : currentPkg.name}
                  </span>
                  <span className="tabular-nums font-mono">
                    {currency === 'INR' ? `₹${currentPkg.priceInr.toLocaleString('en-IN')}` : `$${currentPkg.priceUsd}`}
                  </span>
                </div>
                {selectedAddons.map((id) => {
                  const a = ADDONS.find((item) => item.id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex justify-between text-zinc-400 text-[11px]">
                      <span className="truncate max-w-[65%]">{lang === 'hi' ? a.nameHi : a.name}</span>
                      <span className="tabular-nums font-mono">
                        {currency === 'INR' ? `+₹${a.priceInr.toLocaleString('en-IN')}` : `+$${a.priceUsd}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-transform active:scale-95 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.inquireWhatsApp}</span>
                </button>

                <button
                  onClick={() => onInquireEmail(getBreakdownSummary())}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{t.inquireEmail}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
