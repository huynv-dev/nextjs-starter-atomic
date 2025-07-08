'use client'
import { Button } from "@/components/atoms/Button/Button";
import MinusPlusIcon from "@/components/icons/MinusPlus";
import { generateCalendar } from "@/utils/generateCalendar";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface CalendarProps {
  selectedCheckIn?: Date | null;
  selectedCheckOut?: Date | null;
  monthOffset: number;
  setMonthOffset: (offset: number) => void;
  onDateClick: (date: Date) => void;
  onQuickSelect?: (days: number) => void;
  onClearQuickSelect?: (days: number) => void;
  isModal?: boolean;
  minSelectableDate?: Date;
  onCloseModal?: () => void;
  selectedDate?: Date | null;
  onClear?: (type: "checkIn" | "checkOut" | "all") => void;
  calendarGap?: number;
  correctDate?: boolean
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedCheckIn,
  selectedCheckOut,
  monthOffset,
  setMonthOffset,
  onDateClick,
  onQuickSelect,
  onClearQuickSelect,
  isModal = false,
  minSelectableDate = 28,
  onCloseModal,
  selectedDate,
  onClear,
  calendarGap = 3,
  correctDate = true,
}) => {
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isModal) {
      setTempDate(selectedDate ?? null);
    }
  }, [selectedDate, isModal]);

  const isDateSelected = (date: Date) => {
    return (
      (selectedCheckIn && date.toDateString() === selectedCheckIn.toDateString()) ||
      (selectedCheckOut && date.toDateString() === selectedCheckOut.toDateString())
    );
  };

  const isDateInRange = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return date > selectedCheckIn && date < selectedCheckOut;
  };

  // Calendar calculations
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + monthOffset;
  const currentYear = currentDate.getFullYear() + Math.floor(currentMonth / 12);
  const adjustedMonth = ((currentMonth % 12) + 12) % 12;

  const currentMonthDays = generateCalendar(currentYear, adjustedMonth);
  const nextMonthDays = generateCalendar(currentYear, adjustedMonth + 1);

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const renderCalendar = (days: (Date | null)[], month: number, year: number, iconLeft?: boolean, iconRight?: boolean) => (
    <div className="relative w-full">
      {iconLeft && !isMobile &&
        <Button
          type="secondary"
          size="sm"
          icon={<ChevronLeft size={20} />}
          onClick={() => setMonthOffset(monthOffset - 1)}
          className="p-2 absolute hover:bg-gray-100 -top-2 -left-[3%] z-10"
        />
      }
      <div className="flex-1">
        <div className="text-center font-semibold mb-4 text-base sm:text-lg">
          {monthNames[month]} năm {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 p-1 sm:p-2">
              {day}
            </div>
          ))}
        </div>
        <div className={`grid grid-cols-7 grid-rows-6 gap-${calendarGap}`} onClick={(event) => event.stopPropagation()}>
          {days.map((date, index) => {
            // Nếu ô trống (null), render một ô trống không có tương tác
            if (date === null) {
              return (
                <div key={index} className="p-1 sm:p-2 h-8 w-8 sm:h-10 sm:w-10"></div>
              );
            }

            const isToday = date.toDateString() === currentDate.toDateString();
            const isTempSelected = isModal && tempDate && date.toDateString() === tempDate.toDateString();
            const isSelected = !isModal && isDateSelected(date);
            const isInRange = isDateInRange(date);
            const isPast = date < currentDate;
            const isBeforeMinDate = minSelectableDate && date < minSelectableDate;

            return (
              <Button
                type="secondary"
                size="sm"
                key={index}
                onClick={() => {
                  if (!isPast && !isBeforeMinDate) {
                    !isModal && onDateClick(date);
                    setTempDate(date);
                  }
                }}
                disabled={isPast}
                className={`p-1 sm:p-2 flex justify-center items-center text-xs sm:text-sm rounded-full transition-colors relative text-gray-900 h-8 w-8 sm:h-10 sm:w-10
                  ${(isSelected || isTempSelected) ? 'bg-black text-white' : ''}
                  ${isInRange ? 'bg-gray-300' : ''} 
                  ${isToday && !isSelected ? 'ring-1 ring-black' : ''} 
                  ${isModal ? 'cursor-not-allowed' : !isSelected && !isPast ? 'hover:bg-gray-100' : ''} 
                  ${isPast ? 'cursor-not-allowed text-gray-300' : ''}
                  `}
              >
                {date.getDate()}
              </Button>
            );
          })}
        </div>
      </div>
      {iconRight && !isMobile &&
        <Button
          type="secondary"
          size="sm"
          icon={<ChevronRight size={20} />}
          onClick={() => setMonthOffset(monthOffset + 1)}
          className="p-2 absolute hover:bg-gray-100 -top-2 -right-[3%] z-10"
        />
      }
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Mobile Navigation */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <Button
            type="secondary"
            size="sm"
            icon={<ChevronLeft size={18} />}
            onClick={() => setMonthOffset(monthOffset - 1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          />
          <div className="text-sm font-medium text-gray-600">
            Chọn tháng
          </div>
          <Button
            type="secondary"
            size="sm"
            icon={<ChevronRight size={18} />}
            onClick={() => setMonthOffset(monthOffset + 1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          />
        </div>
      )}

      {/* Calendar Grid */}
      <div className={`${isMobile ? 'space-y-6' : 'flex items-center justify-center gap-4 sm:gap-8'}`}>
        {isMobile ? (
          // Mobile: Single column layout
          <div className="space-y-6">
            {renderCalendar(currentMonthDays, adjustedMonth, currentYear)}
            {renderCalendar(nextMonthDays, (adjustedMonth + 1) % 12, currentYear + Math.floor((adjustedMonth + 1) / 12))}
          </div>
        ) : (
          // Desktop: Side by side layout
          <>
            {renderCalendar(currentMonthDays, adjustedMonth, currentYear, true)}
            {renderCalendar(nextMonthDays, (adjustedMonth + 1) % 12, currentYear + Math.floor((adjustedMonth + 1) / 12), false, true)}
          </>
        )}
      </div>

      {/* Clear Button */}
      {onClear ? (
        <div className="flex items-center justify-end mt-4">
          <Button type="link" onClick={() => onClear('all')} color="black" className="text-sm">
            Xóa ngày
          </Button>
        </div>
      ) : (
        correctDate && (
          <div className={`mt-4 sm:mt-6 pt-4 ${!isModal ? 'border-t' : 'border-b pb-5 border-gray-300'}`}>
            {/* Quick Select Buttons */}
            <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
              <Button
                icon={<MinusPlusIcon />}
                type="secondary"
                size="sm"
                onClick={() => onClearQuickSelect?.(0)}
                className="text-xs border focus:border-black font-normal border-gray-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50">
                Ngày chính xác
              </Button>
              {[1, 2, 3, 7, 14].map(days => (
                <Button
                  icon={<MinusPlusIcon />}
                  key={days}
                  type="secondary"
                  size="sm"
                  onClick={() => onQuickSelect?.(days)}
                  className="text-xs border font-normal focus:border-black border-gray-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 flex items-center gap-1"
                >
                  {days} Ngày
                </Button>
              ))}
            </div>
          </div>
        )
      )}

      {/* Modal Save Button */}
      {isModal && (
        <div className="mt-4 sm:mt-6 flex justify-end">
          <Button
            type="secondary"
            color="black"
            className="rounded-xl w-full sm:w-auto px-6 py-2"
            onClick={() => {
              if (tempDate) {
                console.log('vào');
                onDateClick(tempDate);
              }
              onCloseModal?.();
            }}
          >
            Lưu
          </Button>
        </div>
      )}
    </div>
  );
};