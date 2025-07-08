'use client'
import { Image } from "@/components/atoms/Image";
import { ReactNode, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { useHover } from "@/hooks/useHover";
import { SectionWrapper } from "./SectionWrapper";
import { DropdownContainer } from "./DropdownContainer";
import { Button } from "@/components/atoms/Button/Button";
import clsx from "clsx";

interface Location {
  image?: ReactNode;
  name: string;
  description: string;
}

export const LocationDropdown = ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (val: string) => void;
}) => {
  const locations: Location[] = [
    {
      name: 'Hà Nội', description: 'Thủ đô Việt Nam', image: <Image src="/images/demo.png" alt="demo" width={60} height={60} />
    },
    { name: 'Hồ Chí Minh', description: 'Thành phố lớn nhất', image: <Image src="/images/demo.png" alt="demo" width={60} height={60} /> },
    { name: 'Đà Nẵng', description: 'Thành phố biển', image: <Image src="/images/demo.png" alt="demo" width={60} height={60} /> },
    { name: 'Hội An', description: 'Phố cổ Việt Nam', image: <Image src="/images/demo.png" alt="demo" width={60} height={60} /> },
    { name: 'Nha Trang', description: 'Thành phố biển', image: <Image src="/images/demo.png" alt="demo" width={60} height={60} /> },
    { name: 'Đà Lạt', description: 'Thành phố ngàn hoa', image: <Image src="/images/demo.png" alt="demo" width={60} height={60} /> },
  ];


  return (
    <DropdownContainer isOpen={isOpen} onClose={onClose} >
      <div className='p-3 flex flex-col items-start justify-start w-full max-h-[450px] overflow-y-auto overscroll-contain'>
        <span className='text-xs ml-2'>Điểm đến được đề xuất</span>
        <div className="w-full">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center w-full gap-3 py-3 pl-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
              onClick={() => {
                onSelect?.(location.name);
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {location.image ? (
                  <div className="w-full h-full object-cover">
                    {location.image}
                  </div>
                ) : (
                  <MapPin size={16} className="text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{location.name}</div>
                <div className="text-xs text-gray-500">{location.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DropdownContainer>
  );
};


export const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  showRightBorder,
  onClick,
  children,
  isActive,
  handleReset,
  isFlex = false,
  onChangeHover
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  showRightBorder?: boolean;
  onChangeHover?: (value: boolean) => void;
  onClick?: () => void;
  handleReset?: () => void;
  children?: ReactNode;
  isActive?: any;
  isFlex?: boolean;
}) => {
  const { isHovered, bind } = useHover();
  useEffect(() => {
    if (isHovered) onChangeHover?.(true);
    else onChangeHover?.(false);
  }, [isHovered])
  return (
    <div
      className={`
        relative
        ${showRightBorder && isActive == 'location' ? 'bg-gray-300 rounded-l-full' : ''} 
        ${isHovered && isActive == 'checkIn' ? 'bg-gray-300 rounded-l-full' : ''} 
        ${showRightBorder && isFlex ? 'bg-gray-300 rounded-l-full' : ''} 
        ${isHovered && isFlex && isActive == 'checkout' ? 'bg-gray-300 rounded-l-full' : ''} 

      `}
    >

      <SectionWrapper
        isHover={isHovered}
        styleActive={`${isActive !== null && isActive == 'location' ? 'bg-white' : ''}
        ${isActive !== null && isActive == 'checkIn' || isActive == 'checkout' || isActive == 'guest' ? 'bg-gray-200 hover:bg-gray-300' : ''}
        `}
        isActive={isActive}
        showRightBorder={(isActive !== null && (isActive == 'location' || isActive == 'checkIn'
          || (showRightBorder && isActive == 'guest') || isFlex)) || (isHovered || showRightBorder)}
        onClick={onClick}
        className="w-full"
        {...bind}
      >
        <div className="flex items-center gap-3 w-full pl-2 ">
          <div className="flex flex-col items-start w-full relative">
            <div className="text-xs font-semibold">{label}</div>
            {onChange ? (
              <input
                type="text"
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm text-[#6A6A6A] placeholder-[#6A6A6A] bg-transparent border-none outline-none transition-colors"
              />
            ) : (
              <div className="text-sm text-[#6A6A6A]">{placeholder}</div>
            )}
            {value &&
              <Button
                onClick={handleReset}
                icon={<X size={18} className="text-gray-600" />}
                type='secondary'
                size='sm'
                className="absolute -right-[5%] top-[15%] w-7 h-7 z-50 rounded-full  hover:bg-gray-50 transition-colors"
              />
            }
          </div>
        </div>
      </SectionWrapper>
      {children}
    </div>
  );
};

export const LocationInput = ({
  showRightBorder,
  onClick,
  children,
  isActive,
  value,
  onChange,
  handleReset,
  isFlex = false,
  onChangeHover
}: {
  isActive?: any
  showRightBorder?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  value?: string;
  onChange?: (val: string) => void;
  onChangeHover?: (value: boolean) => void;
  handleReset?: () => void;
  isFlex?: boolean;
}) => {
  return (
    <div className={`
      relative w-2/6 rounded-l-full
      ${isActive !== null ? 'bg-gray-200' : ''}
    `}>
      <InputField
        handleReset={handleReset}
        onChangeHover={onChangeHover}
        isActive={isActive}
        isFlex={isFlex}
        label="Địa điểm"
        placeholder="Tìm kiếm điểm đến"
        value={value}
        onChange={onChange}
        showRightBorder={showRightBorder}
        onClick={onClick}
      />
      {children}
    </div>
  );
};