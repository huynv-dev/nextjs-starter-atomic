'use client'
import { Button } from "@/components/atoms/Button/Button";

export const TabSelector = ({ viewMode, setViewMode }: { viewMode?: 'day' | 'month' | 'flexible'; setViewMode?: (mode: 'day' | 'month' | 'flexible') => void; }) => (
  <div className="flex items-center justify-center bg-gray-100 rounded-full p-1 mb-6 max-w-[350px]">
    <Button
      type="secondary"
      size="sm"
      onClick={() => setViewMode?.('day')}
      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === 'day' ? 'bg-white text-black shadow-sm' : 'text-gray-600'
        }`}
    >
      Ngày
    </Button>
    <Button
      type="secondary"
      size="sm"
      onClick={() => setViewMode?.('month')}
      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === 'month' ? 'bg-white text-black shadow-sm' : 'text-gray-600'
        }`}
    >
      Tháng
    </Button>
    <Button
      type="secondary"
      size="sm"
      onClick={() => setViewMode?.('flexible')}
      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === 'flexible' ? 'bg-white text-black shadow-sm' : 'text-gray-600'
        }`}
    >
      Linh hoạt
    </Button>
  </div>
);