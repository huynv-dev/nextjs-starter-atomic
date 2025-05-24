import { setupWorker } from 'msw';
import { roomsHandler } from './handlers/roomsHandler';
import { RoomList } from '@/features/rooms/RoomList';

export const worker = setupWorker(
  ...roomsHandler
);

if (process.env.NODE_ENV === 'development') {
  require('../mocks');
}