'use client';
import { ReactNode } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';

interface Highlight {
  icon: ReactNode;
  title: string;
  desc: string;
}

interface RoomHighlightsProps {
  highlights: Highlight[];
}

export function RoomHighlights({ highlights }: RoomHighlightsProps) {
  return (
    <>
      {highlights.map((item, idx) => (
        <div key={idx} className="flex items-center gap-6 mb-4">
          {item.icon}
          <div>
            <Typography className="text-sm font-medium">{item.title}</Typography>
            <Typography className="text-sm font-medium !text-gray-500">{item.desc}</Typography>
          </div>
        </div>
      ))}
    </>
  );
}
