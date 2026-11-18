import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToLeadForm } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

const TRAINING_IMG = '/src/assets/images/logistics_inventory_training_1794983854798.jpg';
const CAMPUS_IMG = '/src/assets/images/campus_learning_environment_1794983855456.jpg';
const HUB_IMG = '/src/assets/images/supply_chain_distribution_1794983855657.jpg';

export function LogisticsAndJourney() {
  const { lang, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Section 4: What Is Logistics? */}
      <section id="program" className="bg-[#FAFBFD] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#11A5A0] tracking-wide mb-2">
                {t.logistics.eyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
                {t.logistics.title}
              </h2>
              <p className="mt-4 text-base text-[#4A6278] leading-relaxed">
                {t.logistics.subtitle}
              </p>

              {/* Editorial Bento Media Pair */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="rounded-2xl overflow-hidden border border-[#18324A]/10 bg-white aspect-[4/3]">
                  <ResilientImage
                    src={TRAINING_IMG}
                    alt={t.logistics.trainingImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#18324A]/10 bg-white aspect-[4/3]">
                  <ResilientImage
                    src={HUB_IMG}
                    alt={t.logistics.hubImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-2.5 text-xs text-[#4A6278]">{t.logistics.mediaNote}</p>
            </motion.div>

            {/* Right Column: 4 Core Learning Pillars */}
            <div className="lg:col-span-7 divide-y divide-[#18324A]/10 bg-white border border-[#18324A]/10 rounded-2xl">
              {t.logistics.pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: prefersReducedMotion ? 0 : idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display text-sm font-bold tabular-nums text-[#1467C8] pt-1 shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-[#18324A]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-[#4A6278] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Student Journey Timeline */}
      <section className="bg-[#F2F6FA] py-16 sm:py-20 border-y border-[#18324A]/8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs sm:text-sm font-semibold text-[#1467C8] tracking-wide mb-2">
              {t.journey.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
              {t.journey.title}
            </h2>
            <p className="mt-3 text-base text-[#4A6278] leading-relaxed">
              {t.journey.subtitle}
            </p>
          </motion.div>

          <div className="relative mt-12">
            {/* Desktop Horizontal Connector Track */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-5 left-0 right-0 h-0.5 bg-[#18324A]/10"
            >
              <motion.div
                initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="h-full w-full bg-gradient-to-r from-[#1467C8] via-[#11A5A0] to-[#E5B65C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.journey.steps.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: prefersReducedMotion ? 0 : idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#1467C8] font-display text-xs font-bold tabular-nums text-[#1467C8] mb-4 relative z-10">
                    0{idx + 1}
                  </div>
                  <div className="bg-white border border-[#18324A]/10 rounded-2xl p-5 sm:p-6 h-[calc(100%-3.5rem)]">
                    <p className="text-xs font-semibold text-[#11A5A0] mb-1.5">
                      {item.step}
                    </p>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-[#18324A]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4A6278] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Potential Career Pathways */}
      <section id="careers" className="bg-[#FAFBFD] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-[#11A5A0] tracking-wide mb-2">
                {t.careers.eyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
                {t.careers.title}
              </h2>
              <p className="mt-3 text-base text-[#4A6278] leading-relaxed">
                {t.careers.subtitle}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#4A6278] max-w-sm bg-white border border-[#18324A]/10 rounded-xl px-4 py-3">
              {t.careers.disclaimer}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.careers.roles.map((role, idx) => (
              <motion.article
                key={role.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white border border-[#18324A]/10 rounded-2xl p-6 flex flex-col justify-between transition-transform duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-14px_rgba(24,50,74,0.14)]"
              >
                <div>
                  <span className="inline-block font-display text-xs font-bold tabular-nums text-[#1467C8] mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#18324A]">
                    {role.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#4A6278] leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Campus & Student Experience */}
      <section className="bg-[#F2F6FA] py-16 sm:py-20 border-t border-[#18324A]/8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-[#18324A]/10 bg-white flex-1 min-h-[260px]">
                <ResilientImage
                  src={CAMPUS_IMG}
                  alt={t.logistics.campusImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2.5 text-xs text-[#4A6278]">{t.logistics.mediaNote}</p>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-semibold text-[#1467C8] tracking-wide mb-2">
                {t.campus.eyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18324A] tracking-tight text-balance">
                {t.campus.title}
              </h2>
              <p className="mt-3 text-base text-[#4A6278] leading-relaxed">
                {t.campus.subtitle}
              </p>

              <div className="mt-6 space-y-4">
                {t.campus.highlights.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border border-[#18324A]/10 rounded-xl p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-[#18324A]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#4A6278] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => scrollToLeadForm('campus', lang)}
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
                >
                  <span>{t.campus.cta}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
