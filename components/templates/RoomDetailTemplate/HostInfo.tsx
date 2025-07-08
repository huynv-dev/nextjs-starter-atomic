'use client';
import { ReactNode } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import MedalIcon from '@/components/icons/MedalIcon';

interface HostInfoProps {
  avatar: ReactNode;
  name: string;
  yearsOfExperience: number;
}

export function HostInfo({ avatar, name, yearsOfExperience }: HostInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-10 h-10">
        {avatar}
        <MedalIcon className="absolute bottom-[-10%] right-[-3%]" width={20} height={20} />
      </div>
      <div>
        <Typography className="font-medium">Host: {name}</Typography>
        <Typography className="text-sm !text-gray-500">
          Superhost · {yearsOfExperience} năm kinh nghiệm đón tiếp khách
        </Typography>
      </div>
    </div>
  );
}
