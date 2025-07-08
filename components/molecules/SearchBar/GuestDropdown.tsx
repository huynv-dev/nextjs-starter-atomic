'use client'

import { Button } from "@/components/atoms/Button/Button";
import { Search, X } from "lucide-react";
import { ReactNode } from "react";
import { DropdownContainer } from "./DropdownContainer";
import { Counter } from "../../atoms/Counter/Counter";



export const GuestDropdown = ({
  isOpen,
  onClose,
  guestCounts,
  onChangeGuestCounts,
  position = 'right',
  ref,
  className
}: {
  isOpen: boolean;
  onClose: () => void;
  guestCounts: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  onChangeGuestCounts: (val: typeof guestCounts) => void;
  position?: 'left' | 'center' | 'right';
  ref?: React.Ref<HTMLDivElement>;
  className?: string
}) => {
  const update = (key: keyof typeof guestCounts, delta: number) => {
    const newValue = guestCounts[key] + delta;
    changeTo(key, newValue);
  };

  const changeTo = (key: keyof typeof guestCounts, value: number) => {
    const min = key === 'adults' ? 1 : 0;
    const max = (key === 'infants' || key === 'pets') ? 5 : 10;

    onChangeGuestCounts({
      ...guestCounts,
      [key]: Math.max(min, Math.min(max, value)),
    });
  };

  const guestTypes = [
    { key: 'adults', title: 'Người lớn', subtitle: 'Từ 13 tuổi trở lên' },
    { key: 'children', title: 'Trẻ em', subtitle: 'Độ tuổi 2–12' },
    { key: 'infants', title: 'Em bé', subtitle: 'Dưới 2 tuổi' },
    { key: 'pets', title: 'Thú cưng', subtitle: 'Mang theo động vật phục vụ?' },
  ];

  return (
    <DropdownContainer className={className} ref={ref} isOpen={isOpen} onClose={onClose} position={position}>
      <div className="space-y-1">
        {guestTypes.map((guest, index) => {
          const count = guestCounts[guest.key as keyof typeof guestCounts];
          const min = guest.key === 'adults' ? 1 : 0;
          const max = (guest.key === 'infants' || guest.key === 'pets') ? 5 : 10;

          return (
            <div key={guest.key}>
              <Counter
                title={guest.title}
                subtitle={guest.subtitle}
                count={count}
                onIncrement={() => update(guest.key as any, 1)}
                onDecrement={() => update(guest.key as any, -1)}
                onChangeCount={(val) => changeTo(guest.key as any, val)}
                min={min}
                max={max}
              />
              {index < guestTypes.length - 1 && <div className="border-b border-gray-200" />}
            </div>
          );
        })}
      </div>
    </DropdownContainer>
  );
};


export const GuestInput = ({
  onSearch,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isActive = false,
  children,
  label = 'Thêm khách',
  handleReset,
  isHover,
  checkOutHover
}: {
  onSearch?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  handleReset?: () => void;
  onClick?: () => void;
  isActive?: any;
  children?: ReactNode;
  label?: string;
  isHover?: boolean;
  checkOutHover?: boolean;
}) => {
  return (
    <div
      className={`
      relative w-2/6 rounded-r-full
        ${isActive !== null ? 'bg-gray-200' : ''}
        ${isActive == 'checkout' && isHover ? 'bg-gray-300' : ''}
        ${isActive == 'guest' && checkOutHover ? 'bg-gray-300' : ''}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`
        flex items-center justify-between px-4 py-3 rounded-full text-left transition-colors w-full cursor-pointer
        ${isActive == null ? 'hover:bg-gray-100' : ''}
        ${isActive !== null && isActive == 'guest' ? 'bg-white' : ''}
        ${isActive !== null && isActive == 'location' || isActive == 'checkout' || isActive == 'checkIn' ? 'bg-gray-200 hover:bg-gray-300' : ''}
        `}
        onClick={onClick}
      >
        <div className="flex flex-col items-start relative flex-1 min-w-0">
          <div className="text-xs font-semibold">Khách</div>
          <div className="text-sm text-[#6A6A6A] text-nowrap truncate max-w-full">{label}</div>
        </div>

        {label !== 'Thêm khách' && isActive == 'guest' && (
          <Button
            onClick={handleReset}
            icon={<X size={18} className="text-gray-600" />}
            type='secondary'
            size='sm'
            className="absolute right-[50%] top-[30%] w-7 h-7 z-50 rounded-full hover:bg-gray-50 transition-colors"
          />
        )}

        <Button
          onClick={onSearch}
          size="md"
          className={`
            text-white rounded-full transition-colors flex-shrink-0 ml-2
            ${!isActive
              ? 'bg-[#FF385C] min-w-12'
              : 'bg-[#FF385C] min-w-20 max-h-10 hidden sm:flex'
            }
          `}
          icon={<Search size={20} />}
        >
          {isActive && (
            <span className="hidden sm:inline">Tìm kiếm</span>
          )}
        </Button>

        {/* Button cho mobile khi active */}
        {isActive && (
          <Button
            onClick={onSearch}
            size="md"
            className="bg-[#FF385C] text-white rounded-full transition-colors flex-shrink-0 ml-2 min-w-10 sm:hidden"
            icon={<Search size={16} />}
          />
        )}

        {children}
      </div>
    </div>
  )
};