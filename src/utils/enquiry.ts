import type { Language } from '../context/LanguageContext';

export const WHATSAPP_NUMBER_INTL = '601131812004';
export const WHATSAPP_NUMBER_DISPLAY = '+60 11-3181 2004';

export type AnalyticsEventName =
  | 'hero_cta_click'
  | 'lead_form_start'
  | 'lead_form_valid'
  | 'whatsapp_open';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Tracks anonymous funnel milestones without transmitting any personal contact data
 * (no fullName, phone, or email is ever passed to analytics or browser logs).
 */
export function trackEvent(event: AnalyticsEventName, lang: Language, source?: string): void {
  if (typeof window === 'undefined') return;
  const payload: Record<string, unknown> = {
    event,
    lang,
    ...(source ? { source } : {}),
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
}

export function sanitizeField(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function normalizeMalaysianPhone(raw: string): string {
  return raw.replace(/[\s\-().]/g, '').trim();
}

export function isValidMalaysianMobile(raw: string): boolean {
  const cleaned = normalizeMalaysianPhone(raw);
  // Accepts:
  // 01XXXXXXXX (10-11 digits, e.g., 011-31812004 or 012-3456789)
  // 601XXXXXXXX / +601XXXXXXXX
  return /^(\+?60|0)1[0-9]{8,9}$/.test(cleaned);
}

export function isValidEmail(raw: string): boolean {
  const trimmed = raw.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function buildWhatsAppMessage(
  lang: Language,
  data: { fullName: string; phone: string; email: string }
): string {
  const fullName = sanitizeField(data.fullName);
  const phone = sanitizeField(data.phone);
  const email = data.email.trim();

  if (lang === 'ms') {
    return [
      'Assalamualaikum GIS, saya nak join kursus logistik.',
      '',
      `Nama: ${fullName}`,
      `No. telefon: ${phone}`,
      `E-mel: ${email}`,
      '',
      'Saya ingin mendapatkan maklumat lanjut mengenai kursus Logistik di Global Institute of Studies.',
    ].join('\n');
  }

  return [
    'Hello GIS, I am interested in joining the Logistics course.',
    '',
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    '',
    'Please share further information about the Logistics course at Global Institute of Studies.',
  ].join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(message)}`;
}

export function scrollToLeadForm(source: string, lang: Language): void {
  if (source === 'hero') {
    trackEvent('hero_cta_click', lang, 'hero');
  }
  const formSection = document.getElementById('lead-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      const nameInput = document.getElementById('lead-full-name') as HTMLInputElement | null;
      nameInput?.focus({ preventScroll: true });
    }, 450);
  }
}
