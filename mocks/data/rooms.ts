import type { Room } from '@/types/room';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Căn hộ tại Vũng Tàu',
    location: 'Vũng Tàu',
    price: 983749,
    pricePerNight: 983749,
    squareMeters: 65,
    image: 'https://picsum.photos/seed/room1/800/600',
    images: [
      'https://picsum.photos/seed/room1-1/800/600',
      'https://picsum.photos/seed/room1-2/800/600',
      'https://picsum.photos/seed/room1-3/800/600',
      'https://picsum.photos/seed/room1-4/800/600',
      'https://picsum.photos/seed/room1-5/800/600'
    ],
    rating: 5.0,
    numReviews: 120,
    description: 'Căn hộ cao cấp view biển tuyệt đẹp, nội thất sang trọng, đầy đủ tiện nghi.',
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: [
      'Wifi',
      'Bếp',
      'Máy giặt',
      'TV',
      'Điều hòa',
      'Ban công',
      'Hồ bơi',
      'Gym'
    ],
    host: {
      name: 'Minh Anh',
      avatar: 'https://picsum.photos/seed/host1/64/64',
      isSuperHost: true
    },
    coordinates: {
      lat: 10.346_377,
      lng: 107.084_59
    },
    instantBook: true,
    cancellationPolicy: 'Linh hoạt',
    cleaningFee: 100000,
    serviceFee: 50000
  },
  {
    id: '2',
    name: 'Căn hộ Luxury View Biển',
    location: 'Vũng Tàu',
    price: 1341000,
    pricePerNight: 1341000,
    squareMeters: 85,
    image: 'https://picsum.photos/seed/room2/800/600',
    images: [
      'https://picsum.photos/seed/room2-1/800/600',
      'https://picsum.photos/seed/room2-2/800/600',
      'https://picsum.photos/seed/room2-3/800/600',
      'https://picsum.photos/seed/room2-4/800/600'
    ],
    rating: 4.94,
    numReviews: 98,
    description: 'Căn hộ cao cấp view biển 180 độ, thiết kế hiện đại, nội thất cao cấp nhập khẩu.',
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    amenities: [
      'Wifi',
      'Bếp',
      'Máy giặt',
      'TV 4K',
      'Điều hòa',
      'Ban công rộng',
      'Hồ bơi vô cực',
      'Gym',
      'Spa'
    ],
    host: {
      name: 'Thu Hà',
      avatar: 'https://picsum.photos/seed/host2/64/64',
      isSuperHost: true
    },
    coordinates: {
      lat: 10.348_925,
      lng: 107.082_681
    },
    instantBook: true,
    cancellationPolicy: 'Linh hoạt',
    cleaningFee: 150000,
    serviceFee: 70000
  },
  {
    id: '3',
    name: 'Căn hộ Studio Giá Tốt',
    location: 'Vũng Tàu',
    price: 722000,
    pricePerNight: 722000,
    squareMeters: 45,
    image: 'https://picsum.photos/seed/room3/800/600',
    images: [
      'https://picsum.photos/seed/room3-1/800/600',
      'https://picsum.photos/seed/room3-2/800/600',
      'https://picsum.photos/seed/room3-3/800/600'
    ],
    rating: 4.82,
    numReviews: 210,
    description: 'Căn hộ studio tiện nghi, vị trí trung tâm, giá tốt cho 2-3 người.',
    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: [
      'Wifi',
      'Bếp mini',
      'TV',
      'Điều hòa',
      'Ban công',
      'Hồ bơi'
    ],
    host: {
      name: 'Hoàng Nam',
      avatar: 'https://picsum.photos/seed/host3/64/64',
      isSuperHost: false
    },
    coordinates: {
      lat: 10.346_123,
      lng: 107.083_456
    },
    instantBook: true,
    cancellationPolicy: 'Linh hoạt',
    cleaningFee: 80000,
    serviceFee: 40000
  },
  {
    id: '4',
    name: 'Căn hộ Hoàn Kiếm',
    location: 'Hà Nội',
    price: 957977,
    pricePerNight: 957977,
    squareMeters: 55,
    image: 'https://picsum.photos/seed/room4/800/600',
    images: [
      'https://picsum.photos/seed/room4-1/800/600',
      'https://picsum.photos/seed/room4-2/800/600',
      'https://picsum.photos/seed/room4-3/800/600',
      'https://picsum.photos/seed/room4-4/800/600'
    ],
    rating: 4.97,
    numReviews: 145,
    description: 'Căn hộ view Hồ Hoàn Kiếm, thiết kế hiện đại pha trộn nét đẹp cổ điển.',
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: [
      'Wifi',
      'Bếp',
      'Máy giặt',
      'TV',
      'Điều hòa',
      'Ban công view hồ',
      'Dọn phòng hàng ngày'
    ],
    host: {
      name: 'Quang Minh',
      avatar: 'https://picsum.photos/seed/host4/64/64',
      isSuperHost: true
    },
    coordinates: {
      lat: 21.028_461,
      lng: 105.852_291
    },
    instantBook: true,
    cancellationPolicy: 'Nghiêm ngặt',
    cleaningFee: 120000,
    serviceFee: 60000
  },
  {
    id: '5',
    name: 'Căn hộ Ba Đình',
    location: 'Hà Nội',
    price: 820000,
    pricePerNight: 820000,
    squareMeters: 50,
    image: 'https://picsum.photos/seed/room5/800/600',
    images: [
      'https://picsum.photos/seed/room5-1/800/600',
      'https://picsum.photos/seed/room5-2/800/600',
      'https://picsum.photos/seed/room5-3/800/600'
    ],
    rating: 4.8,
    numReviews: 89,
    description: 'Căn hộ yên tĩnh trong khu phố cổ, thiết kế tối giản hiện đại.',
    maxGuests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [
      'Wifi',
      'Bếp',
      'TV',
      'Điều hòa',
      'Ban công',
      'Máy giặt'
    ],
    host: {
      name: 'Thanh Hương',
      avatar: 'https://picsum.photos/seed/host5/64/64',
      isSuperHost: false
    },
    coordinates: {
      lat: 21.035_367,
      lng: 105.823_765
    },
    instantBook: true,
    cancellationPolicy: 'Linh hoạt',
    cleaningFee: 90000,
    serviceFee: 45000
  }
]; 