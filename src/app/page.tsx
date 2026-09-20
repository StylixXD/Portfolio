'use client';

import React, { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/smoothScroll';
import { initScrollReveal } from '@/lib/scrollReveal';
import EditorialHeader from '@/components/layout/EditorialHeader';
import Hero from '@/components/sections/Hero';
import WorkExhibition from '@/components/sections/WorkExhibition';
import AboutNarrative from '@/components/sections/AboutNarrative';
import CraftToolbox from '@/components/sections/CraftToolbox';
import ContactEditorial from '@/components/sections/ContactEditorial';

export default function Home() {
  useEffect(() => {
    const scrollCleanup = initSmoothScroll();
    const revealCleanup = initScrollReveal();
    return () => {
      scrollCleanup();
      revealCleanup();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#111113] text-[#F4F3EE] selection:bg-[#CEFF00] selection:text-[#111113]">
      <EditorialHeader />
      <Hero />
      <WorkExhibition />
      <AboutNarrative />
      <CraftToolbox />
      <ContactEditorial />
    </main>
  );
}
