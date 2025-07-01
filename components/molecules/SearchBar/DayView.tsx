'use client'
import { Button } from "@/components/atoms/Button/Button";
import MinusPlusIcon from "@/components/icons/MinusPlus";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { on } from "node:stream";
import { useEffect, useState } from "react";

interface DayViewProps {
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
  onClear?: () => void
}


export const DayView: React.FC<DayViewProps> = ({
  selectedCheckIn,
  selectedCheckOut,
  monthOffset,
  setMonthOffset,
  onDateClick,
  onQuickSelect,
  onClearQuickSelect,
  isModal = false,
  minSelectableDate = 28,// tối thiểu 28 ngày sau ngày check-in
  onCloseModal,
  selectedDate,
  onClear
}) => {
  const [tempDate, setTempDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isModal) {
      setTempDate(selectedDate ?? null);
    }
  }, [selectedDate, isModal]);


  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

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

  const renderCalendar = (days: Date[], month: number, year: number, iconLeft?: boolean, iconRight?: boolean) => (
    <div className="relative">
      {iconLeft &&
        <Button
          type="secondary"
          size="sm"
          icon={<ChevronLeft size={20} />}
          onClick={() => setMonthOffset(monthOffset - 1)}
          className="p-2 absolute hover:bg-gray-100 -top-2 -left-[3%]"
        />
      }
      <div className="flex-1">
        <div className="text-center font-semibold mb-4">
          {monthNames[month]} năm {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-3" onClick={(event) => event.stopPropagation()}>
          {days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === month;
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
                className={`p-2 flex justify-center items-center text-sm rounded-full transition-colors relative ${!isCurrentMonth || isPast ? 'text-gray-300' : 'text-gray-900'} 
                  ${(isSelected || isTempSelected) ? 'bg-black text-white' : ''}
                  ${isInRange ? 'bg-gray-300' : ''} 
                  ${isToday && !isSelected ? 'ring-2 ring-black' : ''} 
                  ${isModal ? 'cursor-not-allowed' : !isSelected && !isPast && isCurrentMonth ? 'hover:bg-gray-100' : ''} 
                  ${isPast ? 'cursor-not-allowed' : ''}
                  `}
              >
                {date.getDate()}
              </Button>
            );
          })}
        </div>
      </div>
      {iconRight &&
        <Button
          type="secondary"
          size="sm"
          icon={<ChevronRight size={20} />}
          onClick={() => setMonthOffset(monthOffset + 1)}
          className="p-2 absolute hover:bg-gray-100 -top-2 -right-[3%]"
        />
      }
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-center gap-8">
        {renderCalendar(currentMonthDays, adjustedMonth, currentYear, true)}
        {renderCalendar(nextMonthDays, (adjustedMonth + 1) % 12, currentYear + Math.floor((adjustedMonth + 1) / 12), false, true)}
      </div>

      {onClear ? (
        <div className="flex items-center justify-end">
          <Button type="link" onClick={onClear} color="black">Xóa ngày</Button>
        </div>
      ) : (
        <div className={`flex gap-2 items-center mt-6 pt-4 ${!isModal ? 'border-t' : 'border-b pb-5 border-gray-300'}`}>
          <Button
            icon={<MinusPlusIcon />}
            type="secondary"
            size="sm"
            onClick={() => onClearQuickSelect?.(0)}
            className="text-xs border focus:border-black font-normal border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50">
            Ngày chính xác
          </Button>
          {[1, 2, 3, 7, 14].map(days => (
            <Button
              icon={<MinusPlusIcon />}
              key={days}
              type="secondary"
              size="sm"
              onClick={() => onQuickSelect?.(days)}
              className="text-xs border font-normal focus:border-black border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 flex items-center gap-1"
            >
              {days} Ngày
            </Button>
          ))}
        </div>
      )}
      {isModal &&
        <div className="mt-3 flex justify-end">
          <Button type="secondary" color="black" className="rounded-xl"
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
      }
    </div>
  );
};