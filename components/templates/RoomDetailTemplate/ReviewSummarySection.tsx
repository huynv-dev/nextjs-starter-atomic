'use client';
import { Image } from '@/components/atoms/Image/Image';
import { Typography } from '@/components/atoms/Typography/Typography';
import { RatingProgressBar } from './ProgressBarOverlay';

export interface ReviewMetric {
  label: string;
  score: number;
  icon: React.ReactNode;
}

export interface RatingBar {
  level: number;
  percent: number;
}

interface ReviewSummarySectionProps {
  averageScore: number;
  title?: string;
  subtitle?: string;
  leftWingImage?: string;
  rightWingImage?: string;
  ratingBars: RatingBar[];
  metrics: ReviewMetric[];
  vertical?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export function ReviewSummarySection({
  vertical = false,
  ref,
  averageScore,
  title = 'Được khách yêu thích',
  subtitle = 'Nhà này được khách yêu thích dựa trên điểm \nxếp hạng, lượt đánh giá và độ tin cậy',
  leftWingImage = '/images/left-wing.png',
  rightWingImage = '/images/right-wing.png',
  ratingBars,
  metrics,
}: ReviewSummarySectionProps) {
  return (
    <div ref={ref} className={`flex flex-col ${!vertical ? 'gap-10' : 'gap-2 max-h-[500px] md:overflow-y-auto px-2'} my-10`}>
      {/* Phần điểm lớn */}
      <div className={`flex items-center justify-center ${vertical ? '' : 'gap-4'}`}>
        <Image src={leftWingImage} alt="left-wing" width={100} height={100} />
        <Typography level={5} className={`font-semibold ${vertical ? 'text-7xl' : 'text-8xl'} mb-5`}>
          {averageScore.toFixed(2)}
        </Typography>
        <Image src={rightWingImage} alt="right-wing" width={100} height={100} />
      </div>

      {/* Phần mô tả */}
      <div className={`flex flex-col items-center ${!vertical ? 'gap-2' : ''} text-center`}>
        <Typography level={3} className={`font-medium ${vertical ? '!text-base' : ''}`}>{title}</Typography>
        <Typography level={1} className={` font-medium !text-gray-500 ${vertical ? '!text-base' : 'whitespace-pre-line'}`}>
          {subtitle}
        </Typography>
      </div>

      {/* Grid tổng quan */}
      {!vertical ? (
        <div className="hidden md:grid grid-cols-7 gap-2">
          {/* Cột đầu tiên: xếp hạng tổng thể */}
          <div className="px-6 col-span-1 -space-y-1 border-r border-gray-300">
            <Typography className="!text-sm font-semibold lg:text-nowrap w-full">Xếp hạng tổng thể</Typography>
            <RatingProgressBar height={5} ratings={ratingBars} />
          </div>

          {/* Các chỉ số chi tiết */}
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="px-6 -space-y-2 border-r border-gray-300 flex flex-col justify-between"
            >
              <div className='col-span-1'>
                <Typography className="!text-sm font-semibold">{metric.label}</Typography>
                <Typography level={2} className="font-medium">{metric.score}</Typography>
              </div>
              {metric.icon}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-4">
          {/* Cột đầu tiên: xếp hạng tổng thể */}
          <div>
            <Typography className="!text-sm font-semibold lg:text-nowrap w-full">Xếp hạng tổng thể</Typography>
            <RatingProgressBar height={5} ratings={ratingBars} />
          </div>

          {/* Các chỉ số chi tiết */}
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="w-full flex items-center justify-between"
            >
              <div className='flex gap-2'>
                {metric.icon}
                <Typography className="!text-sm font-semibold">{metric.label}</Typography>
              </div>
              <Typography className="font-medium !text-sm">{metric.score}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
