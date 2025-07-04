'use client';
import { Star, Dot as DotIcon } from 'lucide-react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Image } from '@/components/atoms/Image/Image';
import { Button } from '@/components/atoms/Button/Button';
import { useEffect, useRef, useState } from 'react';

interface ReviewCardProps {
  avatar: string;
  name: string;
  experience: string;
  timeAgo: string;
  content: string;
  star?: number;
  onShowFull?: () => void
}

export function ReviewCard({ avatar, name, experience, timeAgo, content, star = 5, onShowFull }: ReviewCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      // Sau khi render, so sánh chiều cao tối đa của 3 dòng với chiều cao thực tế
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || '24');
      const maxHeight = lineHeight * 3;
      if (el.scrollHeight > maxHeight) {
        setShowButton(true);
      }
    }
  }, [content]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Image
          src={avatar}
          alt={name}
          width={50}
          height={50}
          className="object-cover rounded-full"
        />
        <div>
          <Typography className="!font-semibold !text-base">{name}</Typography>
          <Typography className="!font-medium !text-sm text-gray-700">{experience}</Typography>
        </div>
      </div>

      {/* Stars & Time */}
      <div className="flex items-center gap-1 mb-2">
        {Array(star)
          .fill(0)
          .map((_, i) => (
            <Star key={i} width={10} height={10} fill="currentColor" />
          ))}
        <DotIcon width={10} height={10} fill="currentColor" />
        <Typography className="!font-medium !text-sm ml-1">{timeAgo}</Typography>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={`!font-medium !text-base text-gray-700 line-clamp-3`}
      >
        {content}
      </div>

      {/* Toggle button */}
      {showButton && (
        <Button type="link" color="black" onClick={onShowFull}>
          Hiển thị thêm
        </Button>
      )}
    </div>
  );
}

interface Review {
  avatar: string;
  name: string;
  experience: string;
  timeAgo: string;
  content: string;
}

interface ReviewGridProps {
  reviews: Review[];
  columns?: number;
  showFullButton?: boolean;
  onShowFull?: () => void;
}

export function ReviewGrid({ reviews, columns = 2, showFullButton = true, onShowFull }: ReviewGridProps) {
  return (
    <div className=' my-10'>
      <div className={`grid sm:grid-cols-${columns} grid-rows-3 gap-10`}>
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} onShowFull={onShowFull} />
        ))}
      </div>
      {showFullButton && (
        <>
          <Button onClick={onShowFull} type='ghost' className='!bg-gray-200 rounded-xl !font-semibold !text-base'>Hiển thị tất cả 101 đánh giá</Button>
          <Button type='link' color='black' className='text-gray-500 text-xs'>Tìm hiểu quy trình đánh giá</Button>
        </>
      )}
    </div>
  );
}
