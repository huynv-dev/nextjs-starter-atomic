'use client';
import { Button } from "@/components/atoms/Button/Button";
import clsx from "clsx";
import { Calendar, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface FlexibleViewProps {
  onSelectDuration?: (days: number) => void;
  onSelectMonth?: (months: { month: number; year: number }[]) => void;
  selectedMonths?: { month: number; year: number }[];
  selectedDuration?: number;
}

export const FlexibleView: React.FC<FlexibleViewProps> = ({
  onSelectDuration,
  onSelectMonth,
  selectedMonths: initialMonths,
  selectedDuration: initialDuration
}) => {
  const currentDate = new Date();
  const [monthOffset, setMonthOffset] = useState(0);

  // Local states, sync with props only once on mount
  const [selectedDuration, setSelectedDuration] = useState<number>(initialDuration ?? 0);
  const [selectedMonths, setSelectedMonths] = useState<{ month: number; year: number }[]>(initialMonths ?? []);

  useEffect(() => {
    if (initialDuration !== undefined) {
      setSelectedDuration(initialDuration);
    }
  }, [initialDuration]);

  useEffect(() => {
    if (initialMonths) {
      setSelectedMonths(initialMonths);
    }
  }, [initialMonths]);

  const handleMonthClick = (month: number, year: number) => {
    const exists = selectedMonths.some(m => m.month === month && m.year === year);
    const newSelected = exists
      ? selectedMonths.filter(m => !(m.month === month && m.year === year))
      : [...selectedMonths, { month, year }];

    setSelectedMonths(newSelected);
    onSelectMonth?.(newSelected);
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-16">
        {/* Duration */}
        <div>
          <h3 className="text-lg font-medium mb-4">Bạn muốn ở trong bao lâu?</h3>
          <div className="flex gap-3 justify-center">
            {[{ label: 'Cuối tuần', value: 8 }, { label: '1 tuần', value: 7 }, { label: '1 tháng', value: 30 }].map(duration => (
              <Button
                type="secondary"
                key={duration.label}
                value={duration.value}
                onClick={() => {
                  setSelectedDuration(duration.value);
                  onSelectDuration?.(duration.value);
                }}
                className={clsx(
                  'px-6 py-2 border rounded-full text-sm hover:bg-gray-50',
                  selectedDuration === duration.value ? 'border-black' : 'border-gray-300'
                )}
              >
                {duration.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Months */}
        <div>
          <h3 className="text-lg font-medium mb-4">Bạn muốn đi khi nào?</h3>
          <div className="flex gap-4 pb-2 items-center relative">
            {Array.from({ length: 6 }, (_, i) => {
              const month = (currentDate.getMonth() + i + monthOffset) % 12;
              const year = currentDate.getFullYear() + Math.floor((currentDate.getMonth() + i + monthOffset) / 12);
              const isSelected = selectedMonths.some(m => m.month === month && m.year === year);

              return (
                <Button
                  type="secondary"
                  key={`${month}-${year}`}
                  onClick={() => handleMonthClick(month, year)}
                  className={clsx(
                    'flex flex-col items-center justify-center border rounded-xl text-center min-w-[120px] hover:bg-gray-50',
                    isSelected ? 'bg-gray-200 border-black' : 'border-gray-200'
                  )}
                >
                  <Calendar className="w-8 h-8 text-gray-500" />
                  <div className="font-medium">{monthNames[month]}</div>
                  <div className="text-sm text-gray-500">{year}</div>
                </Button>
              );
            })}
            <Button
              onClick={() => setMonthOffset(prev => prev + 1)}
              type="secondary"
              className="flex-shrink-0 -right-[3%] absolute w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50"
              icon={<ChevronRight size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
