import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  lang: Language;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  initialMessage = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Brand Identity');
  const [budget, setBudget] = useState('₹25,000 – ₹50,000 / $500 – $1,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = translations[lang].contact;

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Design Inquiry from ${name} - ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget Range: ${budget}\n\nProject Brief:\n${message}`
    );

    // Open user's email client directly targeting designer's email
    window.location.href = `mailto:vandanaarmy123@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-24 border-b border-zinc-800/60 bg-[#09090c] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
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
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Links & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-6">
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {lang === 'hi' ? 'सीधे संपर्क करें' : 'Fastest Ways to Connect'}
              </h3>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hi%20Vandana!%20I%20came%20across%20your%20graphic%20design%20portfolio%20and%20would%20love%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400">{t.whatsappBtn}</p>
                  <p className="text-sm font-bold text-white group-hover:text-emerald-300">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              {/* Email CTA */}
              <a
                href="mailto:vandanaarmy123@gmail.com?subject=New%20Graphic%20Design%20Project%20Inquiry"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-400">{t.emailDirect}</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 truncate">
                    vandanaarmy123@gmail.com
                  </p>
                </div>
              </a>

              {/* Studio Hours & Location Note */}
              <div className="pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 space-y-1">
                <p className="font-semibold text-zinc-300">Studio Working Hours:</p>
                <p>Mon – Sat · 10:00 AM – 7:00 PM IST</p>
                <p>Replies within 24 hours.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {t.sentSuccess}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    {lang === 'hi'
                      ? 'आपका ईमेल क्लाइंट खुल गया होगा। आप सीधे संदेश भेज सकते हैं।'
                      : 'Your email client has been launched with the pre-filled proposal details. I look forward to working together.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        {t.formName}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-zinc-950 border border-zinc-700/70 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        {t.formEmail}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@company.com"
                        className="w-full bg-zinc-950 border border-zinc-700/70 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        {t.formService}
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-700/70 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="Brand Identity">Brand Identity & Logo</option>
                        <option value="Packaging & Labels">Packaging & Label Architecture</option>
                        <option value="Print & Editorial">Print & Editorial Collateral</option>
                        <option value="Social Media Creatives">Social Media & Digital Ads</option>
                        <option value="Complete Brand Overhaul">Complete Brand Overhaul</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        {t.formBudget}
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-700/70 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="₹15,000 – ₹25,000 / $300 – $500">₹15,000 – ₹25,000 ($300 – $500)</option>
                        <option value="₹25,000 – ₹50,000 / $500 – $1,000">₹25,000 – ₹50,000 ($500 – $1,000)</option>
                        <option value="₹50,000 – ₹1,00,000+ / $1,000+">₹50,000 – ₹1,00,000+ ($1,000+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      {t.formMessage}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={lang === 'hi' ? 'अपने ब्रांड और प्रोजेक्ट की आवश्यकताओं के बारे में बताएं...' : 'Tell me about your product, vision, and timeline...'}
                      className="w-full bg-zinc-950 border border-zinc-700/70 rounded-lg p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-transform active:scale-95 cursor-pointer shadow-lg shadow-amber-400/10"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
