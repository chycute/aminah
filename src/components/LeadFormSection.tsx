import React, { useRef, useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  WHATSAPP_NUMBER_DISPLAY,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  isValidEmail,
  isValidMalaysianMobile,
  sanitizeField,
  trackEvent,
} from '../utils/enquiry';

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  consent?: string;
}

export function LeadFormSection() {
  const { lang, t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readyData, setReadyData] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

  const markFormStarted = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('lead_form_start', lang);
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const cleanName = sanitizeField(fullName);
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      nextErrors.fullName = t.leadForm.errors.fullNameRequired;
    } else if (cleanName.length < 2) {
      nextErrors.fullName = t.leadForm.errors.fullNameShort;
    }

    if (!cleanPhone) {
      nextErrors.phone = t.leadForm.errors.phoneRequired;
    } else if (!isValidMalaysianMobile(cleanPhone)) {
      nextErrors.phone = t.leadForm.errors.phoneInvalid;
    }

    if (!cleanEmail) {
      nextErrors.email = t.leadForm.errors.emailRequired;
    } else if (!isValidEmail(cleanEmail)) {
      nextErrors.email = t.leadForm.errors.emailInvalid;
    }

    if (!consent) {
      nextErrors.consent = t.leadForm.errors.consentRequired;
    }

    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    trackEvent('lead_form_valid', lang);

    const message = buildWhatsAppMessage(lang, {
      fullName,
      phone,
      email,
    });
    const whatsappUrl = buildWhatsAppUrl(message);

    setReadyData({ message, whatsappUrl });
    setCopied(false);
    trackEvent('whatsapp_open', lang);

    // Programmatically activate a standard external anchor instead of window.open
    // so browsers open WhatsApp cleanly without popup-blocker issues.
    window.setTimeout(() => {
      if (hiddenLinkRef.current) {
        hiddenLinkRef.current.href = whatsappUrl;
        hiddenLinkRef.current.click();
      }
      setIsSubmitting(false);
    }, 60);
  };

  const handleCopyMessage = async () => {
    if (!readyData) return;
    try {
      await navigator.clipboard.writeText(readyData.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  return (
    <section
      id="lead-form"
      className="bg-[#F2F6FA] py-16 sm:py-20 border-t border-[#18324A]/8 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section 8: How to Enquire 3-Step Flow */}
        <div className="mb-12">
          <p className="text-xs sm:text-sm font-semibold text-[#1467C8] tracking-wide mb-2">
            {t.howTo.eyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18324A] tracking-tight text-balance">
            {t.howTo.title}
          </h2>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.howTo.steps.map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[#18324A]/10 rounded-2xl p-6"
              >
                <span className="font-display text-sm font-bold tabular-nums text-[#11A5A0]">
                  {step.num}
                </span>
                <h3 className="mt-2 font-display text-base sm:text-lg font-semibold text-[#18324A]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#4A6278] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Lead Capture Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-semibold text-[#11A5A0] tracking-wide mb-2">
              {t.leadForm.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18324A] tracking-tight text-balance">
              {t.leadForm.title}
            </h2>
            <p className="mt-3 text-base text-[#4A6278] leading-relaxed">
              {t.leadForm.subtitle}
            </p>

            <ul className="mt-6 space-y-3 border-t border-[#18324A]/10 pt-6">
              {t.leadForm.reassurance.map((line, idx) => (
                <li key={line} className="flex items-start gap-3 text-sm sm:text-base text-[#18324A]">
                  <span
                    className="font-display text-xs font-bold tabular-nums text-[#1467C8] pt-1 shrink-0"
                    aria-hidden="true"
                  >
                    0{idx + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-[#18324A]/12 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_14px_36px_-18px_rgba(24,50,74,0.16)]">
              {/* Hidden link used to trigger external WhatsApp navigation safely */}
              <a
                ref={hiddenLinkRef}
                href="https://wa.me/601131812004"
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                WhatsApp
              </a>

              {readyData ? (
                <div className="space-y-5" role="status" aria-live="polite">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#11A5A0]/12 text-[#11A5A0] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#18324A]">
                        {t.leadForm.readyPanel.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium text-[#18324A] bg-[#E5B65C]/20 border border-[#E5B65C]/50 rounded-xl px-4 py-3">
                        {t.leadForm.readyPanel.warningNotice}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#4A6278] mb-2">
                      {t.leadForm.readyPanel.previewLabel}
                    </p>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-[#18324A] bg-[#FAFBFD] border border-[#18324A]/12 rounded-xl p-4 leading-relaxed">
                      {readyData.message}
                    </pre>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={readyData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_open', lang, 'ready_panel')}
                      className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
                    >
                      <span>{t.leadForm.readyPanel.openWhatsappButton}</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center justify-center gap-2 min-h-12 px-5 py-3 text-sm font-semibold text-[#18324A] bg-[#F2F6FA] hover:bg-[#E5EDF5] border border-[#18324A]/12 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1467C8]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#11A5A0]" aria-hidden="true" />
                          <span>{t.leadForm.readyPanel.copiedButton}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>{t.leadForm.readyPanel.copyButton}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#4A6278] leading-relaxed">
                    {t.leadForm.readyPanel.fallbackTip}
                  </p>

                  <div className="pt-3 border-t border-[#18324A]/10">
                    <button
                      type="button"
                      onClick={() => setReadyData(null)}
                      className="text-sm font-semibold text-[#1467C8] hover:underline cursor-pointer"
                    >
                      {t.leadForm.readyPanel.editButton}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="lead-full-name"
                      className="block text-sm font-semibold text-[#18324A] mb-1.5"
                    >
                      {t.leadForm.fullNameLabel}
                    </label>
                    <input
                      id="lead-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onFocus={markFormStarted}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      placeholder={t.leadForm.fullNamePlaceholder}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                      className={`w-full min-h-12 px-4 py-3 text-base text-[#18324A] bg-[#FAFBFD] border rounded-xl placeholder:text-[#4A6278]/65 focus:outline-none focus:ring-2 focus:ring-[#1467C8]/25 focus:border-[#1467C8] transition-colors ${
                        errors.fullName ? 'border-[#C53030]' : 'border-[#18324A]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="error-full-name" role="alert" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-sm font-semibold text-[#18324A] mb-1.5"
                    >
                      {t.leadForm.phoneLabel}
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onFocus={markFormStarted}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder={t.leadForm.phonePlaceholder}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={`w-full min-h-12 px-4 py-3 text-base text-[#18324A] bg-[#FAFBFD] border rounded-xl placeholder:text-[#4A6278]/65 focus:outline-none focus:ring-2 focus:ring-[#1467C8]/25 focus:border-[#1467C8] transition-colors ${
                        errors.phone ? 'border-[#C53030]' : 'border-[#18324A]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p id="error-phone" role="alert" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-sm font-semibold text-[#18324A] mb-1.5"
                    >
                      {t.leadForm.emailLabel}
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onFocus={markFormStarted}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder={t.leadForm.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`w-full min-h-12 px-4 py-3 text-base text-[#18324A] bg-[#FAFBFD] border rounded-xl placeholder:text-[#4A6278]/65 focus:outline-none focus:ring-2 focus:ring-[#1467C8]/25 focus:border-[#1467C8] transition-colors ${
                        errors.email ? 'border-[#C53030]' : 'border-[#18324A]/20'
                      }`}
                    />
                    {errors.email && (
                      <p id="error-email" role="alert" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id="lead-consent"
                        name="consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          markFormStarted();
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                        }}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? 'error-consent' : undefined}
                        className="mt-1 w-5 h-5 rounded border-[#18324A]/30 text-[#1467C8] focus:ring-[#1467C8] cursor-pointer shrink-0"
                      />
                      <label htmlFor="lead-consent" className="text-sm text-[#4A6278] leading-relaxed cursor-pointer">
                        {t.leadForm.consentText}{' '}
                        <button
                          type="button"
                          onClick={() => setPrivacyOpen(true)}
                          className="font-semibold text-[#1467C8] hover:underline cursor-pointer"
                        >
                          {t.leadForm.privacyLink}
                        </button>
                        .
                      </label>
                    </div>
                    {errors.consent && (
                      <p id="error-consent" role="alert" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-12 px-6 py-3.5 text-base font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] disabled:opacity-60 rounded-xl shadow-[0_8px_20px_-6px_rgba(20,103,200,0.45)] transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1467C8]"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>
                      {isSubmitting ? t.leadForm.submittingButton : t.leadForm.submitButton}
                    </span>
                  </button>

                  <p className="text-xs text-[#4A6278] leading-relaxed">
                    {t.leadForm.whatsappNote} ({WHATSAPP_NUMBER_DISPLAY})
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice Modal */}
      {privacyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18324A]/45 backdrop-blur-xs"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="bg-white border border-[#18324A]/15 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id="privacy-modal-title" className="font-display text-xl font-bold text-[#18324A]">
                {t.privacyModal.title}
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                aria-label={t.privacyModal.close}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#4A6278] hover:bg-[#F2F6FA] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#4A6278] leading-relaxed">
              {t.privacyModal.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="min-h-11 px-5 py-2.5 text-sm font-semibold text-white bg-[#1467C8] hover:bg-[#0F52A3] rounded-xl cursor-pointer"
              >
                {t.privacyModal.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
