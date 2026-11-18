/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConcernsAndBenefits } from './components/ConcernsAndBenefits';
import { LogisticsAndJourney } from './components/LogisticsAndJourney';
import { AlumniTestimonials } from './components/AlumniTestimonials';
import { LeadFormSection } from './components/LeadFormSection';
import { FAQAndFooter } from './components/FAQAndFooter';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <div className="min-h-screen bg-[#FAFBFD] text-[#18324A] flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <ConcernsAndBenefits />
            <LogisticsAndJourney />
            <AlumniTestimonials />
            <LeadFormSection />
            <FAQAndFooter />
          </main>
        </div>
      </LanguageProvider>
    </MotionConfig>
  );
}
