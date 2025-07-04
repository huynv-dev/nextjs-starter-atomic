import { Button } from "@/components/atoms/Button/Button";
import { Typography } from "@/components/atoms/Typography/Typography";
import { X } from "lucide-react";

const formatDate = (date: Date | null) => {
  if (!date || isNaN(date.getTime())) return '';
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
export const DateInputButton = ({
  label,
  date,
  placeholder,
  isActive,
  onClick,
  onReset,
  disabled = false,
}: {
  label: string;
  date: Date | null;
  placeholder: string;
  isActive?: boolean;
  onClick: () => void;
  onReset?: () => void;
  disabled?: boolean;
}) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`relative transition-opacity duration-200 cursor-pointer 
      ${isActive ? "outline outline-2 outline-black rounded-xl" : ""}
      ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    `}
  >
    <Button
      type="secondary"
      className="!px-2 !py-0 w-full h-full flex flex-col items-start justify-center min-h-[60px] relative overflow-hidden"
      disabled={disabled}
    >
      <Typography className="!text-[10px] !font-bold text-left w-full">{label}</Typography>
      <input
        readOnly
        value={formatDate(date)}
        className="!text-sm !text-gray-500 outline-none bg-transparent border-none w-full text-left placeholder:text-gray-500 mt-1"
        placeholder={placeholder}
      />
    </Button>

    {date && onReset && !disabled && (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
        className="absolute top-[20%] -right-2"
        size="sm"
        type="secondary"
        icon={<X className="text-gray-500" width={16} height={16} />}
      />
    )}
  </div>
);
