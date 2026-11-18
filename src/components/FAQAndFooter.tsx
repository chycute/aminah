import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToLeadForm } from '../utils/enquiry';

export function FAQAndFooter() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hideStickyCta, setHideStickyCta] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById('lead-form');
    if (!formEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        setHideStickyCta(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1 }
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Section 9: FAQ Accordion */}
      <section id="faq" className="bg-[#FAFBFD] py-16 sm:py-20 border-t border-[#18324A]/8">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs sm:text-sm font-semibold text-[#11A5A0] tracking-wide mb-2">
              {t.faq.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
              {t.faq.title}
            </h2>
            <p className="mt-3 text-base text-[#4A6278] leading-relaxed">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="divide-y divide-[#18324A]/10 bg-white border border-[#18324A]/10 rounded-2xl overflow-hidden">
            {t.faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              const buttonId = `faq-button-${idx}`;

              return (
                <div key={item.q}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full min-h-14 px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#FAFBFD] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1467C8]"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-[#18324A]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#1467C8] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-6 pb-5 text-sm sm:text-base text-[#4A6278] leading-relaxed"
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 10a: Final Reassurance CTA */}
      <section className="bg-[#F2F6FA] py-14 sm:py-16 border-y border-[#18324A]/8">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-1 bg-[#E5B65C] rounded-full mx-auto mb-5" aria-hidden="true" />
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
            {t.finalCta.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4A6278] leading-relaxed max-w-xl mx-auto">
            {t.finalCta.subtitle}
          </p>
          <div className="mt-7">
            <button
              type="button"
              onClick={() => scrollToLeadForm('final_cta', lang)}
              className="inline-flex items-center justify-center gap-2 min-h-12 px-7 py-3.5 text-base font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-xl shadow-[0_8px_20px_-6px_rgba(20,103,200,0.45)] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
            >
              <span>{t.finalCta.button}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 10b: Quiet Light-Mode Footer */}
      <footer className="bg-white pt-12 pb-24 md:pb-12 border-t border-[#18324A]/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#18324A]/10">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-bold text-[#18324A]">
                {t.footer.brand}
              </p>
              <p className="mt-2 text-sm text-[#4A6278] leading-relaxed max-w-sm">
                {t.footer.tagline}
              </p>
              <p className="mt-4 text-xs text-[#4A6278] leading-relaxed max-w-sm">
                {t.footer.accreditationNote}
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-display text-sm font-semibold text-[#18324A] mb-3">
                {t.footer.contactHeading}
              </h3>
              <dl className="space-y-2 text-sm text-[#4A6278]">
                <div>
                  <dt className="text-xs text-[#4A6278]">{t.footer.whatsappLabel}</dt>
                  <dd className="font-semibold text-[#18324A] tabular-nums">
                    <button
                      type="button"
                      onClick={() => scrollToLeadForm('footer_whatsapp', lang)}
                      className="hover:text-[#1467C8] hover:underline cursor-pointer text-left"
                    >
                      {t.footer.whatsappNumber}
                    </button>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#4A6278]">{t.footer.emailLabel}</dt>
                  <dd className="text-xs text-[#4A6278]">{t.footer.emailPlaceholder}</dd>
                </div>
              </dl>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-display text-sm font-semibold text-[#18324A] mb-3">
                {t.footer.privacyHeading}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A6278] leading-relaxed">
                {t.footer.privacySummary}
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4A6278]">
            <p>{t.footer.copyright.replace('{year}', String(currentYear))}</p>
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
              <a href="#program" className="hover:text-[#1467C8]">
                {t.nav.program}
              </a>
              <a href="#benefits" className="hover:text-[#1467C8]">
                {t.nav.benefits}
              </a>
              <a href="#alumni" className="hover:text-[#1467C8]">
                {t.nav.alumni}
              </a>
              <a href="#faq" className="hover:text-[#1467C8]">
                {t.nav.faq}
              </a>
            </nav>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom CTA — hidden when Lead Form is visible, compact to preserve viewport cap */}
      {!hideStickyCta && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAFBFD]/95 backdrop-blur-md border-t border-[#18324A]/12 px-4 py-2 flex items-center justify-between gap-3">
          <span className="font-display text-xs font-semibold text-[#18324A] truncate">
            {t.mobileCta.label}
          </span>
          <button
            type="button"
            onClick={() => scrollToLeadForm('mobile_sticky', lang)}
            className="min-h-10 px-4 py-2 text-xs font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1467C8]"
          >
            {t.mobileCta.button}
          </button>
        </div>
      )}
    </>
  );
}
