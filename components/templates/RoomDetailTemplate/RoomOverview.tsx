'use client';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Dot } from 'lucide-react';

interface RoomOverviewProps {
  title: string;
  infoList: string[];
  ref?: React.Ref<HTMLDivElement>;
}

export function RoomOverview({ title, infoList, ref }: RoomOverviewProps) {
  return (
    <div ref={ref}>
      <Typography level={3} className="font-medium">
        {title}
      </Typography>
      <div className="flex items-center flex-wrap text-sm gap-x-2 gap-y-1 mt-2">
        {infoList.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <Typography type="secondary" className="!text-black !text-base">{item}</Typography>
            {i < infoList.length - 1 && <Dot width={16} height={16} />}
          </div>
        ))}
      </div>
    </div>
  );
}
