'use client'
import { useGuestCounter } from "@/hooks/useGuestCounter";
import { Counter } from "./Counter";
import { ModalDayPicker } from "./ModalDayPicker";
import { useEffect, useState } from "react";

interface MonthViewProps {
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
  setSelectedStart?: (date: Date | null) => void;
  setSelectedEnd?: (date: Date | null) => void;
  setIsDayModalOpen?: (isOpen: boolean) => void;
  modalRef?: React.RefObject<any>;
  setDayPlus?: (days: number) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  selectedStart,
  selectedEnd,
  setSelectedStart,
  setSelectedEnd,
  setIsDayModalOpen,
  modalRef,
  setDayPlus
}) => {
  const [openModalType, setOpenModalType] = useState<"checkIn" | "checkout" | null>(null);
  const today = new Date();
  const firstDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const oneMonthLater = new Date(firstDayNextMonth);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  // Sử dụng selectedStart/selectedEnd từ props hoặc fallback về default values
  const [localCheckIn, setLocalCheckIn] = useState<Date | null>(selectedStart || firstDayNextMonth);
  const [localCheckOut, setLocalCheckOut] = useState<Date | null>(selectedEnd || oneMonthLater);

  const stayDuration = useGuestCounter(1, 1, 10);
  const [monthOffset, setMonthOffset] = useState(0);



  // Tự động cập nhật checkout khi thay đổi duration hoặc checkin
  useEffect(() => {
    if (localCheckIn) {
      const newCheckOut = new Date(localCheckIn);
      newCheckOut.setMonth(newCheckOut.getMonth() + stayDuration.count);
      setLocalCheckOut(newCheckOut);
    }
  }, [stayDuration.count, localCheckIn]);

  // Thông báo về trạng thái modal
  useEffect(() => {
    setIsDayModalOpen?.(openModalType !== null);
  }, [openModalType, setIsDayModalOpen]);

  // Sync local state với parent component
  useEffect(() => {
    setSelectedStart?.(localCheckIn);
  }, [localCheckIn, setSelectedStart]);

  useEffect(() => {
    setSelectedEnd?.(localCheckOut);
  }, [localCheckOut, setSelectedEnd]);

  const formatDate = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) return '';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayName = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
    return `${dayName}, ${day} tháng ${month}`;
  };

  const handleDateSelect = (date: Date) => {
    console.log('Date selected:', date);

    if (openModalType === "checkIn") {
      setLocalCheckIn(date);
      setSelectedStart?.(date);
    } else if (openModalType === "checkout") {
      setLocalCheckOut(date);
      setSelectedEnd?.(date);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center py-4 border-b border-gray-300 flex justify-between w-full">
        <Counter
          classNames="w-full p-0"
          title='tháng'
          count={stayDuration.count}
          onIncrement={stayDuration.increment}
          onDecrement={stayDuration.decrement}
          onChangeCount={stayDuration.update}
          min={0}
          max={10}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-300 py-2 cursor-pointer" onClick={() => setOpenModalType("checkIn")}>
          <h4 className="font-medium mb-2">Ngày bắt đầu</h4>
          <div className="text-right font-medium underline pb-1">
            {localCheckIn ? formatDate(localCheckIn) : 'Th 3, 1 thg 7'}
          </div>
        </div>

        <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => setOpenModalType("checkout")}>
          <h4 className="font-medium mb-2">Ngày kết thúc</h4>
          <div className="text-right font-medium underline pb-1">
            {localCheckOut ? formatDate(localCheckOut) : 'Th 4, 1 thg 10'}
          </div>
        </div>
      </div>

      <ModalDayPicker
        setDayPlus={setDayPlus}
        isCheckingIn={openModalType === "checkIn"}
        monthOffset={monthOffset}
        setMonthOffset={setMonthOffset}
        modalRef={modalRef}
        localCheckIn={localCheckIn}
        localCheckOut={localCheckOut}
        isOpen={openModalType !== null}
        onClose={() => {
          setOpenModalType(null);
          setMonthOffset(0);
        }}
        selectedDate={openModalType === "checkIn" ? localCheckIn : localCheckOut}
        onSelect={handleDateSelect}
        minSelectableDate={
          openModalType === "checkout" && localCheckIn
            ? new Date(localCheckIn.getTime() + 28 * 24 * 60 * 60 * 1000)
            : undefined
        }
      />
    </div>
  );
};