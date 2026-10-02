'use client';

import React, { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/smoothScroll';

import CursorToggle from '@/components/ui/CursorToggle';

export default function EditorialHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'bg-[#0B1317]/95 backdrop-blur-md border-b border-[rgba(56,189,248,0.1)] py-3.5 px-6 md:px-12 shadow-lg'
          : 'bg-transparent py-7 px-6 md:px-12'
      }`}
    >
      {/* Editorial Hairline Reading Progress Indicator */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#2DD4BF] to-white transition-all duration-75 z-[101] pointer-events-none opacity-80"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand wordmark */}
        <div className="flex items-center space-x-6">
          <a
            href="#"
            onClick={(e) => handleNav(e, 'top')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Stylix Portfolio Home"
          >
            <span className="font-frama-black-italic text-2xl md:text-3xl tracking-tight text-[#F4F6F7] group-hover:text-[#38BDF8] transition-colors duration-300">
              STYLIX
            </span>
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-3 md:space-x-6 uppercase">
          <CursorToggle />

          <a
            href="#work"
            onClick={(e) => handleNav(e, 'work')}
            className="group flex items-center space-x-1.5 text-[#F4F6F7] hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer focus:outline-none"
            aria-label="Navigate to Selected Work"
          >
            <span className="text-[#38BDF8] font-frama-meta text-xs md:text-sm mr-0.5">[01]</span>
            <span className="font-frama-meta text-xs md:text-sm tracking-wide">Work</span>
          </a>

          <a
            href="#about"
            onClick={(e) => handleNav(e, 'about')}
            className="group flex items-center space-x-1.5 text-[#F4F6F7] hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer focus:outline-none"
            aria-label="Navigate to About Section"
          >
            <span className="text-[#38BDF8] font-frama-meta text-xs md:text-sm mr-0.5">[02]</span>
            <span className="font-frama-meta text-xs md:text-sm tracking-wide">About</span>
          </a>

          <a
            href="#craft"
            onClick={(e) => handleNav(e, 'craft')}
            className="group flex items-center space-x-1.5 text-[#F4F6F7] hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer focus:outline-none"
            aria-label="Navigate to Builds Section"
          >
            <span className="text-[#38BDF8] font-frama-meta text-xs md:text-sm mr-0.5">[03]</span>
            <span className="font-frama-meta text-xs md:text-sm tracking-wide">Builds</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNav(e, 'contact')}
            className="bg-[#38BDF8] text-[#0B1317] hover:bg-[#F4F6F7] hover:scale-105 active:scale-95 px-4 py-1.5 rounded-full font-frama-meta text-xs md:text-sm tracking-wide shadow-sm transition-all duration-300 cursor-pointer focus:outline-none font-bold"
            aria-label="Navigate to Contact Section"
          >
            [Contact]
          </a>
        </nav>
      </div>
    </header>
  );
}
