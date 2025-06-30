'use client';
import { Button } from "@/components/atoms/Button/Button";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent } from "react";

interface CounterProps {
  title: string;
  subtitle?: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChangeCount?: (value: number) => void; // thêm prop này để hỗ trợ nhập tay
  min?: number;
  max?: number;
  classNames?: string;
}

export const Counter = ({
  title,
  subtitle,
  count,
  onIncrement,
  onDecrement,
  onChangeCount,
  min = 0,
  max = 10,
  classNames = ''
}: CounterProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = min;
    if (value < min) value = min;
    if (value > max) value = max;
    onChangeCount?.(value);
  };

  return (
    <div className={clsx('flex items-center justify-between', classNames || 'p-6')} onClick={(e) => e.stopPropagation()}>
      <div className='font-medium'>
        <div className="text-base">{title}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          icon={<Minus size={16} />}
          type='secondary'
          onClick={(e) => {
            e.stopPropagation();
            onDecrement();
          }}
          disabled={count <= min}
          className={clsx(
            'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
            count <= min
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
          )}
        />
        <input
          type="number"
          value={count}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          className="w-12 text-center border rounded-md text-sm font-medium text-gray-700 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
          min={min}
          max={max}
        />
        <Button
          icon={<Plus size={16} />}
          type='secondary'
          onClick={(e) => {
            e.stopPropagation();
            onIncrement();
          }}
          disabled={count >= max}
          className={clsx(
            'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
            count >= max
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
          )}
        />
      </div>
    </div>
  );
};
