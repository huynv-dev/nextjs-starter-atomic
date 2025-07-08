'use client';
interface RatingBar {
  level: number; // 1 → 5
  percent: number; // từ 0 → 100
}

interface RatingProgressBarProps {
  ratings: RatingBar[];
  height?: number;
  className?: string;
}

export function RatingProgressBar({
  ratings,
  height = 10,
  className = '',
}: RatingProgressBarProps) {
  return (
    <div className="flex flex-col w-full">
      {ratings
        .sort((a, b) => b.level - a.level)
        .map(({ level, percent }, idx) => {
          const clamped = Math.min(100, Math.max(0, percent));
          return (
            <div key={idx} className="flex items-center w-full">
              <div className="w-5 text-sm font-medium">
                {level}
              </div>
              <div
                className={`relative bg-gray-200 rounded-full overflow-hidden flex-1 ${className}`}
                style={{ height }}
              >
                <div
                  className="bg-black absolute top-0 left-0 h-full"
                  style={{ width: `${clamped}%` }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
