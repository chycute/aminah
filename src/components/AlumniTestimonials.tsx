import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';

const ALUMNI_IMAGE = '/src/assets/images/alumni_graduate_portrait_1794983856404.jpg';

export function AlumniTestimonials() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const items = t.alumni.items;
  const total = items.length;

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, total]);

  const handlePrev = () => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const currentItem = items[activeIndex];
  const indicatorText = t.alumni.slideIndicator
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(total));

  return (
    <section
      id="alumni"
      className="bg-[#FAFBFD] py-16 sm:py-20 border-t border-[#18324A]/8"
      aria-roledescription="carousel"
      aria-label={t.alumni.title}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#11A5A0] tracking-wide mb-2">
              {t.alumni.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
              {t.alumni.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={!isPaused}
              className="inline-flex items-center gap-1.5 min-h-11 px-3.5 py-2 text-xs font-semibold text-[#18324A] bg-white hover:bg-[#F2F6FA] border border-[#18324A]/15 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1467C8]"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.alumni.playLabel}</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.alumni.pauseLabel}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              aria-label={t.alumni.prevLabel}
              className="inline-flex items-center justify-center w-11 h-11 bg-white hover:bg-[#F2F6FA] text-[#18324A] border border-[#18324A]/15 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1467C8]"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t.alumni.nextLabel}
              className="inline-flex items-center justify-center w-11 h-11 bg-white hover:bg-[#F2F6FA] text-[#18324A] border border-[#18324A]/15 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1467C8]"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Honest Disclosure Banner */}
        <p className="mb-6 text-xs sm:text-sm text-[#4A6278] bg-[#F2F6FA] border border-[#18324A]/10 rounded-xl px-4 py-3">
          {t.alumni.notice}
        </p>

        {/* Active Slide Card */}
        <div
          className="bg-white border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_12px_32px_-16px_rgba(24,50,74,0.1)]"
          aria-live="polite"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="aspect-square max-w-[220px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-[#18324A]/10 bg-[#EDF2F7]">
                <ResilientImage
                  src={ALUMNI_IMAGE}
                  alt={t.alumni.portraitAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-9">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A6278] mb-3">
                <span className="font-semibold text-[#11A5A0]">{currentItem.cohort}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{indicatorText}</span>
              </div>

              <blockquote className="font-display text-lg sm:text-xl lg:text-2xl font-medium text-[#18324A] leading-relaxed">
                “{currentItem.quote}”
              </blockquote>

              <div className="mt-6 pt-5 border-t border-[#18324A]/10">
                <p className="font-display text-base font-bold text-[#18324A]">
                  {currentItem.name}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#4A6278]">
                  {currentItem.outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Manual Slide Selection Dots */}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-2">
            {items.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex(idx);
                }}
                aria-label={`${idx + 1} / ${total}`}
                aria-current={idx === activeIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8] ${
                  idx === activeIndex
                    ? 'w-7 bg-[#1467C8]'
                    : 'w-2.5 bg-[#18324A]/20 hover:bg-[#18324A]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
