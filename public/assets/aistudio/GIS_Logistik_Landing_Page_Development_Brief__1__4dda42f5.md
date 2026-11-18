# GIS Logistics Landing Page — Development Brief

## 1. Project goal
Build a high-converting, mobile-first landing page for **Global Institute of Studies (GIS)** promoting its **Logistics course** to Malaysian parents of recent SPM leavers (around 18 years old), while remaining welcoming to prospective students. Primary conversion: visitors click a CTA, complete a lead form (full name, phone, email), and are redirected to WhatsApp with a prefilled enquiry addressed to **+60 11-3181 2004**.

## 2. Brand and visual direction
- **Light mode only**: warm white (`#FAFBFD`), crisp white cards, navy text (`#18324A`), vivid blue (`#1467C8`), teal (`#11A5A0`) and restrained golden accents (`#E5B65C`). Do not use dark-mode backgrounds, including the hero.
- Editorial, cinematic, premium and reassuring; strong hierarchy, large whitespace, rounded corners, subtle shadows and sophisticated typography (e.g., Plus Jakarta Sans + DM Sans).
- Design primarily for parents: credible, readable, emotionally resonant; avoid sensational claims or pressure tactics.
- Hero headline suggestion: **“Anak Baru Habis SPM? Bina Langkah Pertama Ke Dunia Logistik.”** Supporting copy: “Terokai pembelajaran berorientasikan industri, kemudahan bayaran ansuran dan pilihan pembiayaan PTPK tertakluk kelayakan bersama GIS.”
- Sticky navigation with logo, Program, Kelebihan GIS, Alumni, FAQ and **“Mohon Info Kursus”** CTA.

## 3. Cinematic main banner
- Use an **authentic, high-resolution logistics-related visual**: young Malaysian logistics trainees in a modern warehouse / fulfilment centre, barcode scanning, inventory, warehouse racking, shipping containers or supply-chain operations.
- Prefer an approved GIS photo/video; until supplied, use properly licensed placeholder media clearly marked for replacement.
- Create a cinematic look **without dark mode**: full-bleed wide photo/video with bright natural light, shallow depth of field, smooth slow push-in/parallax, clean white-to-transparent gradient behind text, and a carefully placed subject with safe text space.
- Desktop: two-column editorial hero or full-bleed image with legible overlay; mobile: portrait crop and readable text on white surface. Ensure imagery never obscures form or CTA.
- Optional muted, autoplaying, looping background video with poster image; respect `prefers-reduced-motion`, `Save-Data`, mobile bandwidth and accessibility. No autoplay audio.
- Image art direction: real people, real operational settings, not generic corporate handshakes; avoid implying that stock images show GIS facilities.

## 4. Motion and animated sections
- Use Framer Motion or CSS/IntersectionObserver for subtle scroll reveals: fade + translateY 16–24px, 0.4–0.7s, staggered cards.
- Hero: headline line reveal, gentle image zoom, floating micro-labels (e.g., “Pembelajaran Berorientasikan Industri”), CTA entrance.
- Problem/solution cards: progressive reveal; hover lift only on pointer devices.
- Timeline: animated connector for the student journey (Minat → Belajar → Latihan Kemahiran → Persediaan Kerjaya).
- Alumni/testimonials: accessible carousel with pause controls, manual navigation and no aggressive auto-scroll.
- FAQ accordion with smooth height transition and clear keyboard focus.
- Sticky mobile bottom CTA that does not cover content.
- Respect `prefers-reduced-motion: reduce`: disable parallax, animated transforms and autoplay background video; never make content dependent on animation.

## 5. Text translation / multilingual experience
- Default language **Bahasa Melayu (ms-MY)**; provide an explicit **BM / EN** language toggle in the navigation and mobile menu.
- Translate all visible UI copy, headings, CTA labels, form labels, placeholders, validation messages, FAQ, privacy/consent text and WhatsApp prefilled message. Use human-reviewed, professional **British English** for EN.
- Keep course name, institution name, official acronyms (GIS, PTPK) and verified factual details consistent. Set document `lang` to `ms` or `en` as appropriate; persist selection in local storage and avoid flashing the wrong language on load.
- Use a central translation dictionary / locale files (`ms.json`, `en.json`) and stable translation keys; do not use a decorative or nonfunctional translation button.
- Example: BM “Saya Nak Join Kursus Logistik” ↔ EN “I’m Interested in the Logistics Course”.

## 6. Page architecture and persuasive copy
1. **Header + hero**: cinematic logistics image, headline, reassurance copy, CTA “Dapatkan Info Kursus”, secondary CTA “Lihat Kelebihan GIS”.
2. **Parent concerns**: registration costs vary, uncertainty about career opportunities, choosing a course aligned with the child’s interests, and safety/comfort when studying away from home. Speak empathetically, not fearfully.
3. **GIS solutions**: instalment payment options; PTPK financing **subject to current eligibility and approval**; updated teaching approaches; new facilities for student comfort. Confirm specifics before publishing.
4. **What is logistics?**: approachable overview of warehousing, inventory, distribution, supply chain, transportation coordination; show visually relevant learning experiences, subject to verified curriculum.
5. **Potential career pathways**: warehouse operations, inventory assistant, logistics coordinator, supply-chain support. Describe as possibilities, **not guaranteed placements**.
6. **Campus and student experience**: verified GIS photos, facilities, student support and safety measures. Do not invent hostel/security policies.
7. **Alumni proof**: authentic names, quotes, photos, graduation years and job outcomes **only with written consent and verification**; use clearly labelled placeholders until assets arrive.
8. **How to enquire**: simple 3-step flow: fill form → review WhatsApp message → send to GIS.
9. **FAQ**: instalment terms, PTPK eligibility, programme length, entry requirements, campus location, accommodation/safety, career support. Mark unanswered items “Hubungi penasihat GIS untuk pengesahan” instead of guessing.
10. **Final CTA + footer**: strong parent-friendly CTA, GIS official contacts, privacy notice and any verified accreditation information.

## 7. Lead form and WhatsApp integration
- Every primary CTA scrolls to or opens an accessible lead form; no CTA should bypass the requested form.
- Fields: `fullName` (required), `phone` (required; Malaysian mobile validation), `email` (required; email validation).
- Show concise consent: “Saya bersetuju maklumat ini digunakan oleh GIS untuk menghubungi saya berkaitan kursus Logistik.” Provide a privacy-policy link once available; do not precheck consent.
- Submit handler validates inputs, then opens:
  `https://wa.me/601131812004?text=${encodeURIComponent(message)}`
- BM message template:
  ```text
  Assalamualaikum GIS, saya nak join kursus logistik.

  Nama: {fullName}
  No. telefon: {phone}
  E-mel: {email}

  Saya ingin mendapatkan maklumat lanjut mengenai kursus Logistik di Global Institute of Studies.
  ```
- EN message template:
  ```text
  Hello GIS, I am interested in joining the Logistics course.

  Name: {fullName}
  Phone: {phone}
  Email: {email}

  Please share further information about the Logistics course at Global Institute of Studies.
  ```
- **Important**: A `wa.me` URL only opens WhatsApp with a prefilled message. The visitor must press **Send**. Do not display “successfully submitted” before that happens. Browser-only redirects do **not** guarantee lead capture or delivery; use a secure, consent-based backend/CRM if GIS also needs to store leads independently.
- URL-encode message safely; trim/sanitise form values; prevent duplicate submissions; provide error handling when WhatsApp cannot open.
- For sensitive personal data, do not include contact details in analytics events or browser logs.

## 8. Suggested technical implementation
- Recommended: **Next.js + TypeScript + Tailwind CSS + Framer Motion**; alternatively, lightweight semantic HTML/CSS/JS if GIS only needs static hosting.
- Component tree: `Navbar`, `LanguageSwitcher`, `Hero`, `ParentConcerns`, `GISBenefits`, `LogisticsOverview`, `CareerPaths`, `CampusGallery`, `AlumniTestimonials`, `LeadForm`, `FAQ`, `Footer`, `MobileStickyCTA`.
- Responsive breakpoints: 360px, 768px, 1024px, 1440px. Design and test at 375px first.
- Use semantic landmarks, accessible labels, descriptive alt text, visible focus states, sufficient contrast, 44px touch targets and keyboard-operable controls.
- Optimise media: AVIF/WebP, responsive `srcset`, lazy-load below-the-fold media, priority-load hero poster, compressed video with static fallback. Target Core Web Vitals: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms on representative devices.
- SEO: unique title/meta description, Open Graph image, canonical URL, language alternate metadata if distinct locale URLs, structured data only for verified organisation/course facts.
- Analytics: track `hero_cta_click`, `lead_form_start`, `lead_form_valid`, `whatsapp_open` (not `lead_sent`); never transmit name, phone or email to analytics.

## 9. Required assets and facts before launch
- Official GIS logo and approved brand palette.
- Real logistics-course, training, facilities and campus images/video, plus usage permission.
- Verified course name, duration, intake dates, location, requirements, fees, instalment details, PTPK terms and any recognised certifications.
- Verified alumni stories with consent and permission to publish.
- Official privacy policy, contact email and any applicable accommodation/student safety information.
- Confirm that **+60 11-3181 2004** is the intended WhatsApp Business destination.

## 10. Acceptance checklist
- [ ] Landing page is light mode throughout, including cinematic hero.
- [ ] Main banner features compelling, relevant logistics visuals.
- [ ] Scroll animations work smoothly and reduced-motion is supported.
- [ ] BM/EN toggle translates all sections, forms and WhatsApp copy.
- [ ] All primary CTAs lead to the same form.
- [ ] Form requires valid name, phone, email and explicit consent.
- [ ] Valid submission opens WhatsApp chat to `601131812004` with all details and course interest prefilled.
- [ ] UI explains that visitor must press Send in WhatsApp.
- [ ] Mobile layout, accessibility, performance and SEO are checked.
- [ ] No unverified guarantees of jobs, financing approvals or student safety arrangements.
- [ ] Placeholder media/testimonials are replaced before publication.

## 11. Sample copy
**BM hero:** “Anak Baru Habis SPM? Masa Depannya Bermula Dengan Pilihan Yang Tepat.”

**BM subheading:** “Kenali peluang pembelajaran dalam bidang Logistik bersama GIS. Terokai pilihan bayaran ansuran, pembiayaan PTPK tertakluk kelayakan, dan persekitaran pembelajaran yang menyokong perkembangan kemahiran anak.”

**EN hero:** “Just Finished SPM? The Right Choice Can Shape Your Child’s Next Step.”

**EN subheading:** “Explore logistics training at GIS, with instalment payment options, PTPK financing subject to eligibility, and a learning environment designed to support practical skills development.”

**Primary CTA:** “Dapatkan Info Kursus” / “Enquire About the Course”.

**Final reassurance:** “Bincang dahulu, buat keputusan dengan yakin.” / “Ask your questions first, then decide with confidence.”
