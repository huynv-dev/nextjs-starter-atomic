'use client';

import Link from 'next/link';
import { Room } from '@/types/room';
import { Image } from '@/components/atoms/Image';
import { Typography } from '@/components/atoms/Typography/Typography';

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <Link href={`/rooms/${room.id}`} className="block">
      <div className="group cursor-pointer">
        {/* Room Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={room.image}
            alt={room.name}
            width={500}
            height={500}
            className="object-cover group-hover:scale-105 transition duration-200"
          />
        </div>

        {/* Room Info */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{room.location}</h3>
            <div className="flex items-center">
              <span className="text-sm">★</span>
              <span className="ml-1 text-sm">{room.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{room.name}</p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold text-black">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(room.price)}
            </span>
            {' '}/ đêm
          </p>
        </div>
      </div>
    </Link>
  );
}; 