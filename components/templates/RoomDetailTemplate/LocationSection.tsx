'use client';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface LocationSectionProps {
  title?: string;
  mapSrc: string;
  locationName: string;
  description: string;
  onShowMore?: () => void;
  showMoreLabel?: string;
}

export function LocationSection({
  title = 'Nơi bạn sẽ đến',
  mapSrc,
  locationName,
  description,
  onShowMore,
  showMoreLabel = 'Hiển thị thêm',
}: LocationSectionProps) {
  return (
    <div className="my-10">
      <Typography level={3} className="font-semibold">
        {title}
      </Typography>

      <div className="relative w-full h-0 pb-[56.25%] my-10">
        <iframe
          src={mapSrc}
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex flex-col gap-3 items-start">
        <Typography className="font-semibold">{locationName}</Typography>
        <Typography className="!text-base">{description}</Typography>
        {onShowMore && (
          <Button
            type="link"
            color="black"
            icon={<ArrowRight width={20} height={20} />}
            iconPosition="end"
            className="!underline"
            onClick={onShowMore}
          >
            {showMoreLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
