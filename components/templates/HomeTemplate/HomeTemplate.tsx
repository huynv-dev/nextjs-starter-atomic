'use client';

import { useState } from 'react';
import { useRooms } from '@/lib/hooks/useRooms';
import { RoomList } from '@/components/organisms/RoomList';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Skeleton } from '@/components/atoms/Skeleton';

const filters = ['Tất cả', 'Biển', 'Núi', 'Thành phố', 'Đảo', 'Làng quê', 'Khu nghỉ dưỡng'];

export const HomeTemplate = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const { rooms, isLoading, error } = useRooms({
    filter: activeFilter === 'Tất cả' ? undefined : activeFilter,
  });
  console.log(rooms);   
  return (
    <div>
      {/* Filter Section */}
      <div className="sticky top-[104px] z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 text-sm transition pb-2 border-b-2 ${
                  activeFilter === filter 
                    ? 'border-black text-gray-900 font-medium' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h1" className="mb-6">
          Khám phá chỗ ở tại Việt Nam
        </Typography>

        {error ? (
          <div className="text-center py-8">
            <Typography variant="h3" className="text-gray-500">
              Có lỗi xảy ra khi tải dữ liệu
            </Typography>
            <Typography variant="body" className="text-gray-400 mt-2">
              Vui lòng thử lại sau
            </Typography>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <RoomList rooms={rooms.data?.items || []} />
        )}
      </div>
    </div>
  );
};
