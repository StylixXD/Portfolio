'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export interface AvatarItem {
  id: string;
  name: string;
  role: string;
  image?: string;
  fallback: string;
  isSoloPrimary?: boolean;
}

interface AvatarGroupProps {
  className?: string;
  items?: AvatarItem[];
}

const DEFAULT_SOLO_ITEMS: AvatarItem[] = [
  {
    id: 'ashu',
    name: 'Ashu (@stylixXD)',
    role: 'Solo Developer & Tool Builder',
    image: '/images/processed/avatar-v2.png',
    fallback: 'A',
    isSoloPrimary: true,
  },
  {
    id: 'slot-1',
    name: 'Open Slot',
    role: 'Currently building solo',
    fallback: '?',
  },
  {
    id: 'slot-2',
    name: 'Future Collaborator',
    role: 'Curiosity welcomes others',
    fallback: '?',
  },
  {
    id: 'slot-3',
    name: 'Solo Workflow',
    role: 'One person, full execution',
    fallback: '?',
  },
];

export function AvatarGroup({
  className,
  items = DEFAULT_SOLO_ITEMS,
}: AvatarGroupProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      <div className="flex items-center -space-x-4">
        {items.map((item, index) => {
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ zIndex: isHovered ? 30 : items.length - index }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="cursor-pointer"
              >
                <Avatar
                  className={cn(
                    'h-16 w-16 md:h-18 md:w-18 border-2 transition-colors duration-300 shadow-xl',
                    item.isSoloPrimary
                      ? 'border-[#38BDF8] ring-4 ring-[#38BDF8]/20'
                      : 'border-[rgba(56,189,248,0.25)] bg-[#111E24] hover:border-[#38BDF8]/70'
                  )}
                >
                  {item.image ? (
                    <AvatarImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <AvatarFallback
                      className={cn(
                        'text-xl md:text-2xl font-bold font-mono',
                        item.isSoloPrimary ? 'text-[#38BDF8]' : 'text-[#8FA4B2]'
                      )}
                    >
                      {item.fallback}
                    </AvatarFallback>
                  )}
                </Avatar>
              </motion.div>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#0B1317] border border-[rgba(56,189,248,0.3)] px-3 py-1.5 text-xs shadow-2xl pointer-events-none z-50 backdrop-blur-md"
                  >
                    <p className="font-frama-meta font-bold text-[#F4F6F7]">
                      {item.name}
                    </p>
                    <p className="font-sans-body text-[11px] text-[#38BDF8] mt-0.5">
                      {item.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="pt-1">
        <p className="font-frama-meta text-xs sm:text-sm uppercase tracking-wider text-[#38BDF8] font-bold">
          THE TEAM BEHIND THE BUILDS
        </p>
        <p className="font-sans-body text-sm sm:text-base text-[#F4F6F7]/80 mt-1">
          Currently building solo.
        </p>
      </div>
    </div>
  );
}
