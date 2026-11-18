import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function ConcernsAndBenefits() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Section 2: Parent Concerns */}
      <section id="concerns" className="bg-[#FAFBFD] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs sm:text-sm font-semibold text-[#11A5A0] tracking-wide mb-2">
              {t.concerns.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
              {t.concerns.title}
            </h2>
            <p className="mt-3 text-base text-[#4A6278] leading-relaxed">
              {t.concerns.subtitle}
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {t.concerns.items.map((item, idx) => (
              <motion.article
                key={item.num}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white border border-[#18324A]/10 rounded-2xl p-6 sm:p-7 transition-transform duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-14px_rgba(24,50,74,0.14)]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-bold tabular-nums text-[#1467C8]">
                    {item.num}.
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#18324A]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm sm:text-base text-[#4A6278] leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: GIS Solutions / Benefits */}
      <section
        id="benefits"
        className="bg-[#F2F6FA] py-16 sm:py-20 border-y border-[#18324A]/8"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-24"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#1467C8] tracking-wide mb-2">
                {t.benefits.eyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
                {t.benefits.title}
              </h2>
              <p className="mt-4 text-base text-[#4A6278] leading-relaxed">
                {t.benefits.subtitle}
              </p>
              <div className="mt-6 h-1 w-16 rounded-full bg-[#E5B65C]" aria-hidden="true" />
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.benefits.items.map((item, idx) => (
                <motion.article
                  key={item.num}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: prefersReducedMotion ? 0 : idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white border border-[#18324A]/10 rounded-2xl p-6 transition-transform duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-14px_rgba(24,50,74,0.14)]"
                >
                  <span className="inline-block font-display text-xs font-bold tabular-nums text-[#11A5A0] mb-2">
                    {item.num}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#18324A]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#4A6278] leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
