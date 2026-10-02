'use client';

import React from 'react';
import { MousePointer, MousePointerClick } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/animate-ui/components/radix/tooltip';
import {
  FlipButton,
  FlipButtonBack,
  FlipButtonFront,
} from '@/components/animate-ui/components/buttons/flip';
import { useCursor } from '@/components/animate-ui/components/animate/cursor';

export default function CursorToggle() {
  const { enabled, toggleCursor } = useCursor();

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <FlipButton
          onClick={toggleCursor}
          from="top"
          className="rounded-full shadow-md cursor-pointer"
          aria-label="Toggle Custom Cursor"
        >
          <FlipButtonFront
            variant="outline"
            size="sm"
            className="rounded-full px-3 py-1 bg-[#111E24] border-[rgba(56,189,248,0.25)] text-xs font-mono text-[#8FA4B2] hover:text-[#38BDF8] hover:border-[#38BDF8]"
          >
            <span className="flex items-center space-x-1.5">
              <MousePointer className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="hidden sm:inline">{enabled ? 'CURSOR: ON' : 'CURSOR: OFF'}</span>
              <span className="sm:hidden">{enabled ? 'ON' : 'OFF'}</span>
            </span>
          </FlipButtonFront>
          <FlipButtonBack
            variant="outline"
            size="sm"
            className="rounded-full px-3 py-1 bg-[#162630] border-[#38BDF8] text-xs font-mono text-[#38BDF8]"
          >
            <span className="flex items-center space-x-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>TOGGLE</span>
            </span>
          </FlipButtonBack>
        </FlipButton>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        {enabled ? 'Disable custom cursor (use OS cursor)' : 'Enable custom cursor'}
      </TooltipContent>
    </Tooltip>
  );
}
