'use client';

import React, { useState, useEffect } from 'react';
import BranchedMenu, { BranchedMenuItem } from '@/components/reactbits/BranchedMenu/BranchedMenu';
import { scrollToSection } from '@/lib/smoothScroll';
import {
  Layers01Icon,
  TextFontIcon,
  Settings02Icon,
  Notification03Icon,
  Rocket01Icon,
  CursorPointer01Icon,
  Download04Icon,
} from '@hugeicons/core-free-icons';

const NAV_ITEMS: BranchedMenuItem[] = [
  {
    label: 'SECTIONS',
    children: [
      { value: 'work', label: 'Selected Work', icon: Layers01Icon },
      { value: 'about', label: 'The Story', icon: TextFontIcon },
      { value: 'craft', label: 'Craft & Toolbox', icon: Settings02Icon },
      { value: 'contact', label: 'Get In Touch', icon: Notification03Icon },
    ],
  },
  {
    label: 'REPOSITORIES',
    children: [
      { value: 'project-telegram-concurrency', label: 'Telegram Bot', icon: Rocket01Icon },
      { value: 'project-discord-security-bot', label: 'Discord Bot', icon: CursorPointer01Icon },
      { value: 'project-xbox-auth-validator', label: 'Xbox Tool', icon: Settings02Icon },
      { value: 'project-storageiq', label: 'StorageIQ', icon: Layers01Icon },
      { value: 'project-automation-tooling-ecosystem', label: 'Automation', icon: Download04Icon },
    ],
  },
];

export default function BranchedNavRail() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('work');

  // Track active section on scroll to highlight current branch
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const sections = ['contact', 'craft', 'about', 'work'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && scrollPos >= el.offsetTop) {
          setActiveItem(s);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (value: string) => {
    setActiveItem(value);
    scrollToSection(value);
  };

  return (
    <aside
      aria-label="Branched Navigation Rail"
      className="hidden 2xl:block fixed left-6 top-32 z-30 select-none transition-all duration-300"
    >
      <div className="relative backdrop-blur-md bg-[#0B1317]/85 border border-[rgba(56,189,248,0.15)] rounded-2xl shadow-2xl p-4 transition-all duration-300">
        {/* Rail Header with minimize toggle */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(56,189,248,0.1)] mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="font-frama-meta text-[11px] uppercase tracking-wider text-[#38BDF8] font-bold">
              SYS // MAP
            </span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[10px] font-frama-meta text-[#8FA4B2] hover:text-[#38BDF8] transition-colors px-1.5 py-0.5 rounded border border-[rgba(56,189,248,0.15)]"
            title={collapsed ? 'Expand rail' : 'Collapse rail'}
          >
            {collapsed ? '+' : '—'}
          </button>
        </div>

        {!collapsed && (
          <BranchedMenu
            items={NAV_ITEMS}
            defaultOpen={[0, 1]}
            defaultActive={activeItem}
            onSelect={handleSelect}
            color="#8FA4B2"
            accentColor="#38BDF8"
            lineColor="rgba(56, 189, 248, 0.25)"
            width={210}
            rowHeight={32}
            indent={36}
            fontSize={12}
            className="font-frama-meta"
          />
        )}
      </div>
    </aside>
  );
}
