import useSWR from 'swr';
import type { Room } from '@/types/room';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useRooms() {
  const { data, error, isLoading } = useSWR<Room[]>('/api/rooms', fetcher);

  return {
    rooms: data,
    isLoading,
    error
  };
} 