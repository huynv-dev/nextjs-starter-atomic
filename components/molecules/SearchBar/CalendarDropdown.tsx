'use client'
import React, { ReactNode, useEffect, useState } from "react";
import { DropdownContainer } from "./DropdownContainer";
import { useHover } from "@/hooks/useHover";
import { SectionWrapper } from "./SectionWrapper";
import { TabSelector } from "./Tabselector";
import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { FlexibleView } from "./FlexibleView";
import { use } from "chai";
import { Button } from "@/components/atoms/Button/Button";
import { X } from "lucide-react";

interface DateRangeProps {
  checkInLabel?: string;
  checkOutLabel?: string;
  showCheckOutBorder?: boolean;
  showGuestBorder?: boolean;
  onHoverChange?: (hovered: "checkIn" | "checkout" | null) => void;
  onCheckInClick?: () => void;
  onCheckOutClick?: () => void;
  children?: ReactNode;
  isActive?: any;
  viewMode?: 'day' | 'month' | 'flexible'
  setViewMode?: any;
  selectedCheckIn?: Date | null;
  selectedCheckOut?: Date | null;
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
}


interface CalendarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode?: 'day' | 'month' | 'flexible';
  setViewMode?: (mode: 'day' | 'month' | 'flexible') => void;
  setSelectedCheckIn?: (date: Date | null) => void;
  setSelectedCheckOut?: (date: Date | null) => void;
  setSelectedStart?: (date: Date | null) => void;
  setSelectedEnd?: (date: Date | null) => void;
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
  selectedCheckIn?: Date | null;
  selectedCheckOut?: Date | null;
  setDayPlus?: (value: number) => void;
  setDayPlusMonth?: (value: number) => void;
  setIsDayModalOpen?: (isOpen: boolean) => void;
  modalRef?: React.RefObject<any>;
  setSelectDuration?: (days: number) => void;
  setSelectedMonths: React.Dispatch<React.SetStateAction<{ month: number; year: number }[]>>;
  selectedMonths?: { month: number; year: number }[];
  selectedDuration?: number;
}

export const CalendarDropdown = ({
  isOpen,
  onClose,
  viewMode = 'day',
  setViewMode,
  setSelectedCheckIn,
  setSelectedCheckOut,
  setSelectedStart,
  setSelectedEnd,
  selectedStart,
  selectedEnd,
  selectedCheckIn: propCheckIn,
  selectedCheckOut: propCheckOut,
  setDayPlus,
  setIsDayModalOpen,
  setDayPlusMonth,
  setSelectDuration,
  setSelectedMonths,
  selectedMonths,
  selectedDuration
}: CalendarDropdownProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(propCheckIn ?? null);
  const [checkOut, setCheckOut] = useState<Date | null>(propCheckOut ?? null);
  const [monthOffset, setMonthOffset] = useState(0);


  const handleSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setSelectedCheckIn?.(date);
      setSelectedCheckOut?.(null);
    } else if (date > checkIn) {
      setCheckOut(date);
      setSelectedCheckOut?.(date);
    } else {
      setCheckIn(date);
      setCheckOut(null);
      setSelectedCheckIn?.(date);
      setSelectedCheckOut?.(null);
    }
  };

  useEffect(() => {
    if (propCheckIn !== undefined) setCheckIn(propCheckIn);
    if (propCheckOut !== undefined) setCheckOut(propCheckOut);
  }, [propCheckIn, propCheckOut]);



  if (!isOpen) return null;

  return (
    <DropdownContainer
      isOpen
      onClose={onClose}
      position="center"
      width="w-[850px]"

    >
      <div className="px-4 max-h-[450px] overflow-y-auto overflow-x-hidden flex flex-col items-center">
        <TabSelector viewMode={viewMode} setViewMode={setViewMode} />
        {viewMode === 'day' && (
          <DayView
            selectedCheckIn={checkIn}
            selectedCheckOut={checkOut}
            monthOffset={monthOffset}
            setMonthOffset={setMonthOffset}
            onDateClick={handleSelect}
            onQuickSelect={setDayPlus}
          />
        )}
        {viewMode === 'month' && <MonthView
          setDayPlus={setDayPlusMonth}
          setIsDayModalOpen={setIsDayModalOpen}
          setSelectedEnd={setSelectedEnd}
          setSelectedStart={setSelectedStart}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
        />}
        {viewMode === 'flexible' && <FlexibleView
          onSelectDuration={setSelectDuration}
          onSelectMonth={setSelectedMonths}
          selectedMonths={selectedMonths}
          selectedDuration={selectedDuration}
        />}
      </div>

    </DropdownContainer>
  );
};



interface DateRangeProps {
  checkInLabel?: string;
  checkOutLabel?: string;
  showGuestBorder?: boolean;
  showCheckOutBorder?: boolean;
  onHoverChange?: (hovered: "checkIn" | "checkout" | null) => void;
  onCheckInClick?: () => void;
  onCheckOutClick?: () => void;
  children?: ReactNode;
  isActive?: any;
  viewMode?: 'day' | 'month' | 'flexible';
  setViewMode?: any;
  selectedCheckIn?: Date | null;
  selectedCheckOut?: Date | null;
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
  selectedDuration?: number;
  selectedMonths?: { month: number; year: number; }[],
  handleReset?: () => void;
  locationHover?: boolean;
}

const formatDateShort = (date?: Date | null, dayPlus?: number) => {
  if (!date) return "Thêm ngày";
  const d = date.getDate();
  const m = date.getMonth() + 1;
  if (dayPlus && dayPlus > 0) {
    return `${d}thg${m} ± ${dayPlus}`;
  }
  return `${d}thg${m}`;
};

export const DateRangeInput = ({
  checkInLabel = "Nhận phòng",
  checkOutLabel = "Trả phòng",
  selectedCheckIn,
  selectedCheckOut,
  selectedStart,
  selectedEnd,
  showGuestBorder,
  onHoverChange,
  onCheckInClick,
  onCheckOutClick,
  children,
  isActive,
  viewMode,
  setViewMode,
  selectedDuration,
  selectedMonths,
  handleReset,
  locationHover,


}: DateRangeProps) => {
  const { isHovered: checkInHovered, bind: bindCheckIn } = useHover();
  const { isHovered: checkOutHovered, bind: bindCheckOut } = useHover();
  const [dayPlus, setDayPlus] = useState(0);
  const [dayPlusMonth, setDayPlusMonth] = useState(0);


  useEffect(() => {
    if (checkInHovered) onHoverChange?.("checkIn");
    else if (checkOutHovered) onHoverChange?.("checkout");
    else onHoverChange?.(null);
  }, [checkInHovered, checkOutHovered]);

  const isMonthOrFlexible = viewMode === 'month' || viewMode === 'flexible';

  const renderChildren = () =>
    React.cloneElement(children as React.ReactElement<any>, {
      viewMode,
      setViewMode,
      selectedCheckIn,
      selectedCheckOut,
      setDayPlus,
      setDayPlusMonth
    })

  const getQuickSelectLabel = () => {
    if (dayPlus > 0) {
      return `${formatDateShort(selectedCheckIn)} ±${dayPlus}`;
    }
    return null;
  };

  const getMonthQuickSelectLabel = () => {
    if (!selectedDuration || !selectedMonths || selectedMonths.length === 0) return null;

    const DurationLabel =
      selectedDuration === 7 ? "1 tuần" :
        selectedDuration === 8 ? "Cuối tuần" :
          "1 tháng";

    const visibleMonths = selectedMonths.slice(0, 3).map(m => `thg ${m.month + 1}`);
    const isTruncated = selectedMonths.length > 3;

    const monthList = visibleMonths.join(', ') + (isTruncated ? ', ...' : '');

    return `${DurationLabel} vào ${monthList}`;
  };

  const displayText = (() => {
    if (viewMode === "month") {
      return `${formatDateShort(selectedStart, dayPlusMonth)} - ${formatDateShort(selectedEnd, dayPlusMonth)}`;
    }
    if (viewMode === "flexible" && selectedDuration && selectedMonths && selectedMonths.length > 0) {
      return getMonthQuickSelectLabel();
    }
    return 'Thời điểm bất kỳ';
  })();

  return (
    <div className={`w-2/6 ${isActive !== null ? 'bg-gray-200' : ''}
    
    `}>
      {!isMonthOrFlexible ? (
        <div className="relative flex">
          <div className={`w-1/2 
          ${isActive == 'checkIn' && locationHover ? 'bg-gray-300 rounded-r-full' : ''}
          ${isActive == 'checkIn' && checkOutHovered ? 'bg-gray-300 rounded-l-full' : ''}
          ${isActive == 'checkout' && checkInHovered ? 'bg-gray-300 rounded-l-full' : ''}
          ${isActive == 'location' ? 'hover:bg-gray-300 rounded-r-full' : ''}
          
          `}>
            <SectionWrapper

              styleActive={`
                ${isActive === 'checkIn' ? 'bg-white ' : ''}
                ${['location', 'checkout', 'guest'].includes(isActive) ? 'hover:bg-gray-300' : ''}
              `}
              showRightBorder={
                ['checkout'].includes(isActive) ||
                isActive === 'checkIn' || checkInHovered || checkOutHovered
              }
              onClick={onCheckInClick}
              isActive={isActive}
              className="w-full"
              {...bindCheckIn}
            >
              <div className="text-xs font-semibold">{checkInLabel}</div>
              <div className={`text-sm text-[#6A6A6A] ${selectedCheckIn !== null ? 'text-black' : ''}`}>
                {getQuickSelectLabel() ?? formatDateShort(selectedCheckIn)}
              </div>

              {(selectedCheckIn || selectedCheckOut) && isActive === 'checkIn' && (
                <Button
                  onClick={handleReset}
                  icon={<X size={18} className="text-gray-600" />}
                  type="secondary"
                  size="sm"
                  className="absolute right-[0%] top-[30%] w-7 h-7 z-50 rounded-full hover:bg-gray-50 transition-colors"
                />
              )}
            </SectionWrapper>
          </div>

          <div className={`w-1/2 
          ${isActive == 'checkIn' && checkOutHovered ? 'bg-gray-300 rounded-r-full' : ''}
          ${isActive == 'checkout' && checkInHovered ? 'bg-gray-300 rounded-r-full' : ''}
          ${isActive == 'checkout' && showGuestBorder ? 'bg-gray-300 rounded-l-full' : ''}
          ${isActive == 'guest' && checkOutHovered ? 'bg-gray-300 rounded-l-full' : ''}
          
          `}>
            <SectionWrapper
              styleActive={`
                ${isActive === 'checkout' ? 'bg-white' : ''}
                ${['location', 'checkIn', 'guest'].includes(isActive) ? 'hover:bg-gray-300' : ''}
              `}
              showRightBorder={
                ['guest'].includes(isActive) || isActive === 'checkout' || checkOutHovered || showGuestBorder
              }
              onClick={onCheckOutClick}
              isActive={isActive}
              className="w-full"
              {...bindCheckOut}
            >
              <div className="text-xs font-semibold">{checkOutLabel}</div>
              <div className={`text-sm text-[#6A6A6A] ${selectedCheckOut !== null ? 'text-black' : ''}`}>
                {formatDateShort(selectedCheckOut)}
              </div>

              {(selectedCheckIn || selectedCheckOut) && isActive === 'checkout' && (
                <Button
                  onClick={handleReset}
                  icon={<X size={18} className="text-gray-600" />}
                  type="secondary"
                  size="sm"
                  className="absolute right-[0%] top-[30%] w-7 h-7 z-50 rounded-full hover:bg-gray-50 transition-colors"
                />
              )}
            </SectionWrapper>
          </div>
          {renderChildren()}
        </div>
      ) : (
        <div className={`
        ${isActive == 'checkout' && locationHover ? 'bg-gray-300 rounded-r-full' : ''}
        ${isActive == 'checkIn' && locationHover ? 'bg-gray-300 rounded-r-full' : ''}
        ${isActive == 'location' ? 'hover:bg-gray-300 rounded-r-full ' : ''}
        ${isActive == 'checkout' && showGuestBorder ? 'bg-gray-300 rounded-l-full ' : ''}
        ${isActive == 'checkIn' && showGuestBorder ? 'bg-gray-300 rounded-l-full ' : ''}
        ${isActive == 'guest' ? 'hover:bg-gray-300 rounded-l-full ' : ''}
        `}>
          <SectionWrapper
            styleActive={`
              ${['checkIn', 'checkout'].includes(isActive) ? 'bg-white' : ''}
              ${['location', 'guest'].includes(isActive) ? 'bg-gray-200 hover:bg-gray-300' : ''}
              
            `}
            showRightBorder={
              ['checkout', 'guest', 'checkIn', 'checkout'].includes(isActive) ||
              checkOutHovered || showGuestBorder
            }
            onClick={onCheckOutClick}
            className="w-full"
            isActive={isActive}
            {...bindCheckOut}
          >
            <div className="text-xs font-semibold">Thời gian</div>
            <div className={`text-sm text-[#6A6A6A] ${displayText !== null ? 'text-black' : ''}`}>
              {displayText}
            </div>
          </SectionWrapper>
          {renderChildren()}
        </div>
      )}
    </div>
  );
};
