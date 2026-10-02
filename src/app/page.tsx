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
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import BranchedNavRail from '@/components/navigation/BranchedNavRail';
import { CursorProvider, Cursor } from '@/components/animate-ui/components/animate/cursor';

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
    <CursorProvider global={true}>
      <Cursor />
      <main className="relative min-h-screen bg-[#0B1317] text-[#F4F6F7] selection:bg-[#38BDF8] selection:text-[#0B1317]">
        <NoiseOverlay />
        <BranchedNavRail />
        <EditorialHeader />
        <Hero />
        <WorkExhibition />
        <AboutNarrative />
        <CraftToolbox />
        <ContactEditorial />
      </main>
    </CursorProvider>
  );
}
