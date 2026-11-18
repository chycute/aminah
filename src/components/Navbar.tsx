import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToLeadForm } from '../utils/enquiry';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#program', label: t.nav.program },
    { href: '#benefits', label: t.nav.benefits },
    { href: '#alumni', label: t.nav.alumni },
    { href: '#faq', label: t.nav.faq },
  ];

  const handleCtaClick = () => {
    setMobileOpen(false);
    scrollToLeadForm('navbar', lang);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFBFD]/95 backdrop-blur-md border-b border-[#18324A]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Clean single-line Brand wordmark */}
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#18324A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1467C8] rounded"
        >
          {t.nav.brand}
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A6278]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#1467C8] transition-colors duration-150 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1467C8] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language toggle + Primary CTA (desktop) / Hamburger (mobile) */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label={t.nav.langToggleLabel}
            className="inline-flex items-center p-0.5 rounded-lg bg-[#EDF2F7] border border-[#18324A]/10"
          >
            <button
              type="button"
              onClick={() => setLang('ms')}
              aria-pressed={lang === 'ms'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8] ${
                lang === 'ms'
                  ? 'bg-white text-[#18324A] shadow-xs'
                  : 'text-[#4A6278] hover:text-[#18324A]'
              }`}
            >
              BM
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8] ${
                lang === 'en'
                  ? 'bg-white text-[#18324A] shadow-xs'
                  : 'text-[#4A6278] hover:text-[#18324A]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
          >
            {t.nav.cta}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#18324A] hover:bg-[#EDF2F7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1467C8]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FAFBFD] border-t border-[#18324A]/10 px-4 py-4 space-y-2 shadow-sm"
        >
          <nav aria-label="Mobile" className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="min-h-11 flex items-center px-3 text-base font-medium text-[#18324A] hover:bg-[#EDF2F7] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#18324A]/10">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full min-h-11 px-5 py-3 text-sm font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-xl transition-colors cursor-pointer"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
