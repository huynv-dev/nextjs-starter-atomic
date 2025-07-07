import { useState, useEffect, useRef } from "react"
import { Typography } from "@/components/atoms/Typography/Typography"
import { CardLayout } from "./CardLayout"
import { Image } from "@/components/atoms/Image"
import { Button } from "@/components/atoms/Button/Button"
import { ChevronDown } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { DateRangeDropdown } from "./DateRangeDropdown"
import { DateInputButton } from "./DateInputButton"
import { DropdownContainer } from "@/components/molecules/SearchBar/DropdownContainer"
import { Counter } from "@/components/atoms/Counter/Counter"
import { GuestDropdown } from "@/components/molecules/SearchBar/GuestDropdown"
import { getGuestLabel } from "@/utils/getGuestLabel"
import clsx from "clsx"



interface guestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

export const BookingSummary = () => {
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const guestModalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside([modalRef], () => setIsDayOpen(false));
  useClickOutside([guestModalRef], () => setIsGuestOpen(false));

  const handleDateSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    if (!checkIn || (checkIn && checkOut) || date < checkIn) {
      setCheckIn(date);
      setCheckOut(null);
    } else {
      setCheckOut(date);
    }
  };

  const handleReset = (type: "checkIn" | "checkOut") => {
    if (type === "checkIn") {
      setCheckIn(null);
      setCheckOut(null);
    } else {
      setCheckOut(null);
    }
  };

  useEffect(() => {
    console.log("checkIn:", checkIn, "checkOut:", checkOut);
  }, [checkIn, checkOut]);

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
              handleReset={handleReset}
              handleSelectDate={handleDateSelect}
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
