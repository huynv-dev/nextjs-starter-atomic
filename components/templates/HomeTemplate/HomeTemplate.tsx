'use client';

import { useRooms } from '@/hooks/useRooms';
import { RoomList } from '@/components/organisms/RoomList';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Skeleton } from '@/components/atoms/Skeleton';

export const HomeTemplate = () => {
  const { rooms, isLoading, error } = useRooms();

  return (
    <div>
      {/* Main Content */}
      <div className="container-fluid mx-auto px-12 py-8">
        {error ? (
          <div className="text-center py-8">
            <Typography variant="text" className="text-gray-500">
              Có lỗi xảy ra khi tải dữ liệu
            </Typography>
            <Typography variant="text" className="text-gray-400 mt-2">
              Vui lòng thử lại sau
            </Typography>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-6 overflow-hidden">
                  {Array(4).fill(0).map((_, j) => (
                    <Skeleton key={j} className="w-[300px] h-[200px] flex-none rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <RoomList rooms={rooms || []} />
        )}
      </div>
    </div>
  );
};
