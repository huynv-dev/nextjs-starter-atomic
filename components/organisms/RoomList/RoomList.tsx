'use client';

import { Room } from '@/types/room';
import { RoomCard } from '@/components/molecules/RoomCard';
import { Typography } from '@/components/atoms/Typography/Typography';
import { useRooms } from '@/lib/hooks/useRooms';

interface RoomListProps {
  rooms: Room[];
}

export const RoomList = ({ rooms }: RoomListProps) => {
  console.log(rooms);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </div>
  );
};

export function RoomListContainer() {
  const { rooms, isLoading, error } = useRooms();

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Typography color="secondary">Đang tải danh sách phòng...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Typography color="rose">Có lỗi xảy ra khi tải danh sách phòng</Typography>
      </div>
    );
  }

  return (
    <RoomList rooms={rooms} />
  );
} 