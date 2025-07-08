// components/molecules/Booking/DateRangeDropdown.tsx
import { RefObject, useEffect } from "react";
import { DropdownContainer } from "@/components/molecules/SearchBar/DropdownContainer";
import { Button } from "@/components/atoms/Button/Button";
import { Typography } from "@/components/atoms/Typography/Typography";
import { Calendar } from "@/components/atoms/Calendar/Calendar";
import { DateInputButton } from "./DateInputButton";

interface DateRangeDropdownProps {
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  isCheckIn: boolean;
  checkIn: Date | null;
  checkOut: Date | null;
  monthOffset: number;
  setIsOpen: (value: boolean) => void;
  setIsCheckIn: (value: boolean) => void;
  setMonthOffset: (offset: number) => void;
  handleReset: (type: "checkIn" | "checkOut" | "all") => void;
  handleSelectDate: (date: Date) => void;
}

export const DateRangeDropdown = ({
  isOpen,
  dropdownRef,
  isCheckIn,
  checkIn,
  checkOut,
  monthOffset,
  setIsOpen,
  setIsCheckIn,
  setMonthOffset,
  handleReset,
  handleSelectDate,
}: DateRangeDropdownProps) => {
  const getCheckInState = () => {
    const isActive = isCheckIn && !checkIn || (!checkIn && !checkOut);
    const isDisabled = false; // CheckIn không bao giờ bị disable

    return { isActive, isDisabled };
  };

  const getCheckOutState = () => {
    const isActive = (!isCheckIn && !!checkOut) || (!!checkIn && !checkOut);
    const isDisabled = !checkIn;

    return { isActive, isDisabled };
  };

  const checkInState = getCheckInState();
  const checkOutState = getCheckOutState();

  useEffect(() => {
    if (checkIn && checkOut) {
      setIsOpen(false);
    }
  }, [checkIn, checkOut]);

  return (
    <DropdownContainer
      ref={dropdownRef}
      isOpen={isOpen}
      position="right"
      className="absolute !p-6 !top-[-25%] right-[-10%] md:w-[665px] min-h-[500px]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Typography level={2} className="font-semibold">Chọn ngày</Typography>
            <Typography className="!text-sm text-gray-500">Thời gian ở tối thiểu: 2 đêm</Typography>
          </div>
          <div
            className={`border w-1/2 border-gray-400 rounded-xl grid grid-cols-2 divide-x divide-gray-400 focus-within:divide-transparent
            ${checkInState.isActive || checkOutState.isActive ? "divide-transparent" : ""}`}
          >
            <DateInputButton
              label="NHẬN PHÒNG"
              date={checkIn}
              placeholder="Thêm ngày"
              isActive={checkInState.isActive}
              onClick={() => setIsCheckIn(true)}
              onReset={() => handleReset("checkIn")}
            />
            <DateInputButton
              label="TRẢ PHÒNG"
              date={checkOut}
              placeholder="Thêm ngày"
              isActive={checkOutState.isActive}
              onClick={() => setIsCheckIn(false)}
              onReset={() => handleReset("checkOut")}
              disabled={checkOutState.isDisabled}
            />
          </div>
        </div>
        <Calendar
          calendarGap={0}
          correctDate={false}
          selectedCheckIn={checkIn}
          selectedCheckOut={checkOut}
          monthOffset={monthOffset}
          setMonthOffset={setMonthOffset}
          onDateClick={handleSelectDate}
        />
        <div className="flex justify-end gap-2">
          <Button onClick={() => handleReset("all")} size="sm" type="link" color="black">Xóa ngày</Button>
          <Button size="sm" className="rounded-xl" type="secondary" color="black" onClick={() => setIsOpen(false)}>Đóng</Button>
        </div>
      </div>
    </DropdownContainer>
  );
};