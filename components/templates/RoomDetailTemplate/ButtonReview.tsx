'use client';

import { Button } from "@/components/atoms/Button/Button";
import { Typography } from "@/components/atoms/Typography/Typography";
import { LeftWingIcon } from "@/components/icons/LeftWingIcon";
import { RightWingIcon } from "@/components/icons/RightWingIcon";
import { Star } from "lucide-react";
import { useRef, useState } from "react";
import { ReviewModal } from "./ReviewModal";
import { useClickOutside } from "@/hooks/useClickOutside";

export const ButtonReview = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside([modalRef], () => setIsModalOpen(false));
  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        type='outline'
        size='lg'
        className='min-h-28 w-full lg:min-w-[660px] rounded-xl flex items-center justify-between gap-2 lg:gap-4 px-4 lg:px-6 [@media(max-width:768px)]:border-none'
      >
        {/* Desktop Layout - Tất cả elements trên 1 hàng */}
        <div className="hidden lg:flex items-center justify-between w-full gap-4">
          {/* Title với wings */}
          <div className="flex items-center">
            <LeftWingIcon />
            <Typography className="whitespace-pre-line text-center leading-tight" level={1}>
              Được khách{'\n'}yêu thích
            </Typography>
            <RightWingIcon />
          </div>

          {/* Description */}
          <Typography className="whitespace-pre-line text-left leading-tight " level={1}>
            Khách đánh giá đây là một {'\n'} trong những ngôi nhà được yêu {'\n'} thích nhất trên Airbnb
          </Typography>

          {/* Rating */}
          <div className="flex flex-col items-center gap-2 border-r border-gray-300 px-4">
            <Typography level={3}>5,0</Typography>
            <div className="flex items-center gap-1">
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
            </div>
          </div>

          {/* Review count */}
          <div className="flex flex-col items-center">
            <Typography level={3}>14</Typography>
            <Typography className='text-sm'>đánh giá</Typography>
          </div>
        </div>

        {/* Medium Layout - Bỏ description, title ở giữa */}
        <div className="hidden md:flex lg:hidden items-center justify-between w-full gap-4">
          {/* Rating */}
          <div className="flex flex-col items-center gap-2 border-r border-gray-300 px-4">
            <Typography level={3}>5,0</Typography>
            <div className="flex items-center gap-1">
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
            </div>
          </div>

          {/* Title với wings ở giữa */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <LeftWingIcon />
            <Typography className="whitespace-pre-line text-center leading-tight" level={2}>
              Được khách{'\n'}yêu thích
            </Typography>
            <RightWingIcon />
          </div>

          {/* Review count */}
          <div className="flex flex-col items-center">
            <Typography level={3}>14</Typography>
            <Typography className='text-sm'>đánh giá</Typography>
          </div>
        </div>

        {/* Mobile Layout - 3 elements theo hàng dọc */}
        <div className="flex md:hidden flex-col items-center justify-center w-fit mx-auto gap-4">
          {/* Rating */}
          <div className="flex flex-col items-center gap-2">
            <Typography level={1}>5,0</Typography>
            <div className="flex items-center gap-1">
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
              <Star width={10} height={10} fill="currentColor" />
            </div>
          </div>

          {/* Title với wings */}
          <div className="flex items-center gap-2">
            <LeftWingIcon />
            <Typography className="whitespace-pre-line text-center leading-tight" level={1}>
              Được khách{'\n'}yêu thích
            </Typography>
            <RightWingIcon />
          </div>

          {/* Review count */}
          <div className="flex flex-col items-center">
            <Typography level={2}>14</Typography>
            <Typography className='text-sm'>đánh giá</Typography>
          </div>
        </div>
      </Button>
      <ReviewModal modalRef={modalRef} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};