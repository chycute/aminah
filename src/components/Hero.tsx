import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToLeadForm } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

const HERO_IMAGE = '/src/assets/images/hero_logistics_warehouse_1794983854184.jpg';

export function Hero() {
  const { lang, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative bg-[#FAFBFD] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 overflow-x-clip border-b border-[#18324A]/8"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-semibold text-[#1467C8] tracking-wide mb-3"
            >
              {t.hero.kicker}
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[#18324A] tracking-tight leading-[1.12] text-balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-base sm:text-lg text-[#4A6278] leading-relaxed max-w-xl"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToLeadForm('hero', lang)}
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3.5 text-base font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-xl shadow-[0_8px_20px_-6px_rgba(20,103,200,0.45)] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#benefits"
                className="inline-flex items-center justify-center min-h-12 px-5 py-3 text-sm sm:text-base font-semibold text-[#18324A] bg-white hover:bg-[#F2F6FA] border border-[#18324A]/15 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
              >
                {t.hero.secondaryCta}
              </a>
            </motion.div>
          </div>

          {/* Right Cinematic Light-Mode Visual */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-1 min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-[#18324A]/10 bg-[#EDF2F7] shadow-[0_18px_40px_-20px_rgba(24,50,74,0.22)]"
            >
              <motion.div
                className="w-full h-full"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.035] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 14, ease: 'easeOut' }
                }
              >
                <ResilientImage
                  src={HERO_IMAGE}
                  alt={t.hero.imageAlt}
                  priority
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Soft light-mode edge veil ensuring seamless daylight feel */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAFBFD]/85 via-[#FAFBFD]/30 to-transparent"
              />
            </motion.div>
            <p className="mt-2.5 text-xs text-[#4A6278]">
              {t.hero.mediaCaption}
            </p>
          </div>
        </div>

        {/* Full-Width Key Reassurance Strip Below Split */}
        <div className="mt-10 pt-7 border-t border-[#18324A]/10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {t.hero.highlights.map((item, idx) => (
            <div key={item} className="flex items-start gap-3">
              <span
                className="font-display text-xs font-bold tabular-nums text-[#11A5A0] pt-0.5 shrink-0"
                aria-hidden="true"
              >
                0{idx + 1}
              </span>
              <p className="text-sm sm:text-base font-medium text-[#18324A]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
