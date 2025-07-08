import { useState, useEffect, useRef } from "react"
import { Typography } from "@/components/atoms/Typography/Typography"
import { CardLayout } from "./CardLayout"
import { Image } from "@/components/atoms/Image"
import { Button } from "@/components/atoms/Button/Button"
import { ChevronDown } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { DateRangeDropdown } from "./DateRangeDropdown"
import { DateInputButton } from "./DateInputButton"
import { GuestDropdown } from "@/components/molecules/SearchBar/GuestDropdown"
import { getGuestLabel } from "@/utils/getGuestLabel"
import clsx from "clsx"



export const BookingSummary = (
  {
    checkIn,
    checkOut,
    onDateClick,
    setMonthOffset,
    monthOffset,
    onClear,
  }: {
    checkIn: Date | null;
    checkOut: Date | null;
    onDateClick: (date: Date) => void;
    setMonthOffset: (offset: number) => void;
    monthOffset: number;
    onClear: (type: "checkIn" | "checkOut" | "all") => void
  }

) => {
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const guestModalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside([modalRef], () => setIsDayOpen(false));
  useClickOutside([guestModalRef], () => setIsGuestOpen(false));

  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  return (
    <>
      <CardLayout classNames="flex gap-2 items-center justify-center">
        <Image src="/images/diamond.png" alt="diamond" width={20} height={20} />
        <Typography level={1} className="text-sm font-semibold whitespace-pre-line">
          Hiếm khi còn phòng! Chỗ ở này thường kín{"\n"} phòng
        </Typography>
      </CardLayout>

      <CardLayout classNames="flex flex-col gap-4 p-6">
        <Typography level={2} className="!text-xl">Thêm ngày để xem giá</Typography>

        <div className="border border-gray-400 rounded-xl">
          <div className="relative grid grid-cols-2 divide-x divide-gray-400 focus-within:divide-transparent">
            <DateInputButton
              label="NHẬN PHÒNG"
              date={checkIn}
              placeholder="Thêm ngày"
              onClick={() => {
                setIsDayOpen(true);
                setIsCheckIn(true);
              }}
            />
            <DateInputButton
              label="TRẢ PHÒNG"
              date={checkOut}
              placeholder="Thêm ngày"
              onClick={() => {
                setIsDayOpen(true);
                setIsCheckIn(false);
              }}
            />

            <DateRangeDropdown
              isOpen={isDayOpen}
              dropdownRef={modalRef}
              isCheckIn={isCheckIn}
              checkIn={checkIn}
              checkOut={checkOut}
              monthOffset={monthOffset}
              setIsOpen={setIsDayOpen}
              setIsCheckIn={setIsCheckIn}
              setMonthOffset={setMonthOffset}
              handleReset={onClear}
              handleSelectDate={onDateClick}
            />
          </div>

          <Button
            onClick={() => setIsGuestOpen(true)}
            type="secondary"
            className={clsx(
              "relative border-t border-gray-400 !px-2 !py-1 w-full flex items-center justify-between min-h-[60px]",
              {
                "outline outline-black outline-2 rounded-xl": isGuestOpen,
              }
            )}

          >
            <div className="flex flex-col items-start">
              <Typography className="!text-[10px] !font-bold">KHÁCH</Typography>
              <Typography className="!text-sm font-medium mt-1">{getGuestLabel(guestCounts, true)}</Typography>
            </div>
            <ChevronDown className="flex-shrink-0" />
            <GuestDropdown
              className={'rounded-xl top-[90%] w-[inherit]'}
              ref={guestModalRef}
              isOpen={isGuestOpen}
              onClose={() => setIsGuestOpen(false)}
              guestCounts={guestCounts}
              onChangeGuestCounts={(newCounts) => setGuestCounts(newCounts)}
              position="center"
            />
          </Button>
        </div>

        <Button className="w-full mt-4 rounded-xl">Kiểm tra tình trạng đặt phòng</Button>
      </CardLayout>
    </>
  );
};
