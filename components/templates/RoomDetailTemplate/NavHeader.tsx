import { Button } from "@/components/atoms/Button/Button";
import { Typography } from "@/components/atoms/Typography/Typography";
import { Star, Dot } from "lucide-react";
import { MutableRefObject } from "react";

interface NavHeaderProps {
  isNavVisible: boolean;
  bookingVisible: boolean;
  roomOverviewRef: MutableRefObject<HTMLElement | null>;
  reviewSectionRef: MutableRefObject<HTMLElement | null>;
  bookingRef: MutableRefObject<HTMLElement | null>;
  roomRating?: number;
}

export const NavHeader = ({
  isNavVisible,
  bookingVisible,
  roomOverviewRef,
  reviewSectionRef,
  bookingRef,
  roomRating = 4.87,
}: NavHeaderProps) => {
  if (!isNavVisible) return null;

  return (
    <div className="max-md:hidden fixed h-20 flex items-center justify-between top-0 left-0 w-full bg-white border-b z-[999] shadow-sm transition-all px-4">
      <div className="flex items-center gap-4 overflow-x-auto">
        <Button
          type="text"
          className="text-sm font-medium hover:underline"
          onClick={() =>
            roomOverviewRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Tổng quan
        </Button>
        <Button
          type="text"
          className="text-sm font-medium hover:underline"
          onClick={() =>
            reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Đánh giá
        </Button>
        <Button
          type="text"
          className="text-sm font-medium hover:underline"
          onClick={() =>
            bookingRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Lịch
        </Button>
      </div>

      {bookingVisible ? (
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
            <Typography className="!text-base">
              Thêm ngày để xem giá
            </Typography>
            <div className="flex items-center gap-1">
              <Star width={12} height={12} fill="#000" />
              <Typography className="!text-xs">{roomRating}</Typography>
              <Dot width={12} height={12} />
              <Typography className="!text-xs text-gray-500">
                200 đánh giá
              </Typography>
            </div>
          </div>
          <Button size="md" className="rounded-xl">
            Kiểm tra tình trạng còn phòng
          </Button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
