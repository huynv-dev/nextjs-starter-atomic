'use client';

import { useEffect, useRef, useState } from 'react';
import { useRoom } from '@/hooks/useRoom';
import { useLayout } from '@/context/LayoutContext';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Image } from '@/components/atoms/Image/Image';
import { Button } from '@/components/atoms/Button/Button';
import { ButtonReview } from './ButtonReview';
import {
  CalendarFoldIcon, Car, Grid, Heart, LocationEdit, Map, ShareIcon, SnowflakeIcon, Wifi, DoorOpen,
  CalendarClock, TicketCheck, Key, MessageCircle, Pin,
  ChevronLeft,
  Star,
  Dot,
} from 'lucide-react';
import { RoomHighlights } from './RoomHighlightItem';
import { HostInfo } from './HostInfo';
import { RoomOverview } from './RoomOverview';
import { ExpandableParagraph } from './ExpandableParagraph';
import { RoomFeatures } from './RoomFeatures';
import { ReviewSummarySection } from './ReviewSummarySection';
import { ReviewGrid } from './ReviewCard';
import { LocationSection } from './LocationSection';
import HostProfile from './HostSection';
import { InfoSection } from './InfoSection';
import { BookingSummary } from './BookingSummary';
import { Calendar } from '@/components/atoms/Calendar/Calendar';
import Modal from '@/components/organisms/Modal/Modal';
import { ImageModal } from './ImageModal';
import { ReviewModal } from './ReviewModal';
import { NavHeader } from './NavHeader';
import Link from 'next/link';

interface RoomDetailTemplateProps {
  id: string;
}

const highlights = [
  {
    icon: <DoorOpen width={25} height={25} />,
    title: 'Tự nhận phòng',
    desc: 'Bạn có thể gặp nhân viên trực cửa để nhận phòng.',
  },
  {
    icon: <LocationEdit width={25} height={25} />,
    title: 'Nhiều điều để trải nghiệm gần đó',
    desc: 'Khách cho biết khu vực này có rất nhiều điều để khám phá.',
  },
  {
    icon: <CalendarFoldIcon width={25} height={25} />,
    title: 'Hủy miễn phí trước 25 thg 9',
    desc: 'Được hoàn tiền đầy đủ nếu bạn thay đổi kế hoạch.',
  },
];
const features = [
  { icon: <Wifi width={20} height={20} />, label: 'Wifi' },
  { icon: <Car width={20} height={20} />, label: 'Miễn phí đỗ xe trên đường/phố' },
  { icon: <Map width={20} height={20} />, label: 'Hướng nhìn ra đường chân trời thành phố' },
  { icon: <SnowflakeIcon width={20} height={20} />, label: 'Điều hoà nhiệt độ' },
  { icon: <Map width={20} height={20} />, label: 'Gần khu trung tâm' },
];

const featureGroups = [
  {
    title: 'Cảnh quan đẹp',
    items: [
      { icon: <Map width={20} height={20} />, label: 'Hướng nhìn ra đường chân trời thành phố' },
      { icon: <Map width={20} height={20} />, label: 'Hướng nhìn ra công viên' },
    ],
  },
  {
    title: 'Tiện nghi nổi bật',
    items: [
      { icon: <Wifi width={20} height={20} />, label: 'Wifi miễn phí' },
      { icon: <SnowflakeIcon width={20} height={20} />, label: 'Điều hòa nhiệt độ' },
    ],
  },
];

const reviews = [
  {
    avatar: '/images/avatar.png',
    name: 'Loi',
    experience: '5 năm hoạt động trên Airbnb',
    timeAgo: '1 tuần trước',
    content: 'Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà.',
  }, {
    avatar: '/images/avatar.png',
    name: 'Loi',
    experience: '5 năm hoạt động trên Airbnb',
    timeAgo: '1 tuần trước',
    content: 'Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà.',
  },
  {
    avatar: '/images/avatar.png',
    name: 'Loi',
    experience: '5 năm hoạt động trên Airbnb',
    timeAgo: '1 tuần trước',
    content: 'Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà.',
  },
  {
    avatar: '/images/avatar.png',
    name: 'Loi',
    experience: '5 năm hoạt động trên Airbnb',
    timeAgo: '1 tuần trước',
    content: 'Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà.',
  },
  {
    avatar: '/images/avatar.png',
    name: 'Loi',
    experience: '5 năm hoạt động trên Airbnb',
    timeAgo: '1 tuần trước',
    content: 'Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà.',
  },
  {
    avatar: '/images/avatar.png',
    name: 'Loi',
    experience: '5 năm hoạt động trên Airbnb',
    timeAgo: '1 tuần trước',
    content: 'Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà. Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà. Chỗ ở ấm áp, ấm cúng với tầm nhìn tuyệt vời. Chủ nhà sạch sẽ và rất thân thiện. Cảm giác như ở nhà. ',
  },
]

const hostData = {
  name: "Loi",
  avatar: "/images/avatar.png",
  isVerified: true,
  isSuperHost: true,
  stats: {
    reviews: 375,
    rating: 4.78,
    yearsExperience: 8
  },
  personalInfo: {
    birthDecade: "thập niên 90",
    education: "HCMC",
    occupation: "Nguồn cung toàn cầu",
    uniqueFeature: "Khám phá cuộc sống địa phương",
    hostingStyle: "Tôi thích dành thời gian gặp gỡ khách",
    additionalInfo: "Hộp này không đủ để mô tả tôi."
  },
  hostingInfo: {
    responseRate: "100%",
    responseTime: "1 giờ"
  }
};
export function RoomDetailTemplate({ id }: RoomDetailTemplateProps) {
  const { room, isLoading, error } = useRoom(id);
  const { setLayout } = useLayout();
  const [monthOffset, setMonthOffset] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const roomOverviewRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const [imageModal, setImageModal] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!roomOverviewRef.current || !reviewSectionRef.current || !bookingRef.current) return;

      const roomOverviewTop = roomOverviewRef.current.offsetTop;
      const reviewSectionTop = reviewSectionRef.current.offsetTop;
      const bookingHeight = bookingRef.current.offsetHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const stickyStart = roomOverviewTop;
      const stickyEnd = reviewSectionTop - bookingHeight;

      const shouldStick = scrollTop >= stickyStart && scrollTop <= stickyEnd;

      setIsSticky(shouldStick);
      setIsNavVisible(scrollTop > 300);
      setBookingVisible(scrollTop > stickyEnd);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLayout?.({ disableScrollLogic: true });
    return () => setLayout?.({ disableScrollLogic: false });
  }, []);


  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [liked, setLiked] = useState(false);
  const handleSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };
  const handleClear = (type: "checkIn" | "checkOut" | "all") => {
    if (type === "checkIn") {
      setCheckIn(null);
    } else if (type === "checkOut") {
      setCheckOut(null);
    } else {
      setCheckIn(null);
      setCheckOut(null);
    }
  };

  const formatDateShort = (date?: Date | null, dayPlus?: number) => {
    if (!date) return;
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return `${d}thg${m} ${y}`;
  };

  if (isLoading || !room) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Typography type="secondary">
          {isLoading ? 'Đang tải thông tin phòng...' : 'Có lỗi xảy ra khi tải thông tin phòng'}
        </Typography>
      </div>
    );
  }

  const renderImageGrid = () => (
    <div className="hidden md:grid w-1/2 grid-cols-2 grid-rows-2 gap-2">
      {[1, 2, 3, 4].map((_, idx) => (
        <div key={idx} className={`${idx === 3 ? 'relative  z-0' : ''}`}>
          <Image
            onClick={() => { setImageModal(true) }}
            src={room.image}
            alt={`${room.name} - ${idx}`}
            width={200}
            height={170}
            className={`w-full h-full cursor-pointer object-cover hover:brightness-75 ${idx === 1 ? 'rounded-tr-xl' : ''} ${idx === 3 ? 'rounded-br-xl' : ''}`}
          />
          {idx === 3 && (
            <Button
              onClick={() => { setImageModal(true) }}
              icon={<Grid width={16} height={16} />}
              type="outline"
              size="sm"
              className="rounded-xl border-black absolute bottom-4 right-4 bg-white max-h-2"
            >
              Hiển thị tất cả ảnh
            </Button>
          )}
          <ImageModal isOpen={imageModal} onClose={() => { setImageModal(false) }} imgPath={room.image} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative max-md:px-4 max-w-6xl mx-auto overflow-x-hidden">
      <NavHeader
        isNavVisible={isNavVisible}
        bookingVisible={isSticky}
        roomOverviewRef={roomOverviewRef}
        reviewSectionRef={reviewSectionRef}
        bookingRef={bookingRef}
        roomRating={room?.rating}
      />
      <div className="flex flex-col gap-6">
        {/* Title + Share */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className='md:hidden'
          >
            <ChevronLeft width={30} height={30} />
          </Link>
          <Typography level={3} className="font-semibold max-md:!text-xl">{room.name}</Typography>
          <div className="flex gap-4">
            {['Chia sẻ', 'Yêu thích'].map((text, i) => (
              <div key={i} className="font-medium flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if (i === 1) setLiked((prev) => !prev);
                }}
              >
                {i === 0 ? <ShareIcon width={16} height={16} /> : <Heart width={16} height={16} className={liked ? "text-red-500 fill-red-500" : "text-gray-500"} />}
                <Typography underline type="primary" className="text-sm font-semibold max-md:hidden">{text}</Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Main Images */}
        <div className="w-full min-h-[175px] flex gap-2">
          <div className="w-full md:w-1/2">
            <Image
              onClick={() => { setImageModal(true) }}
              src={room.image}
              alt={room.name}
              width={400}
              height={350}
              className="w-full h-full cursor-pointer hover:brightness-75 object-cover md:rounded-l-xl"
            />
          </div>
          {renderImageGrid()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-9 md:gap-10 mt-3">
          <div className="col-span-6 flex flex-col gap-8">
            {/* Info */}
            <RoomOverview
              ref={roomOverviewRef}
              title="Toàn bộ căn hộ cho thuê tại Quận 1, Việt Nam"
              infoList={['4 khách', '2 phòng ngủ', '2 phòng tắm']}
            />

            <ButtonReview />

            {/* Host Info */}
            <HostInfo
              avatar={
                <Image
                  src="/images/Squirrel.png"
                  alt="Squirrel"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              }
              name="Squirrel Village"
              yearsOfExperience={2}
            />

            <hr />

            {/* Highlights */}
            <RoomHighlights highlights={highlights} />

            <hr />
            <Typography className="!text-base">
              Một số thông tin đã được dịch tự động.{' '}
              <Typography underline className="!text-base font-medium">Xem bản gốc</Typography>
            </Typography>

            {/* Description */}
            <ExpandableParagraph
              title="Giới thiệu về chỗ ở này"
              content={
                <>
                  Thư giãn trong sự thoải mái và yên tĩnh ở nơi yên bình này nằm hoàn hảo ở trung tâm Sài Gòn, tòa nhà Bitexco, chợ Bến Thành, Phố đi bộ Nguyễn Huệ, Nhà thờ Đức Bà Sài Gòn, Dinh Độc Lập...<br /><br />
                  Địa điểm đặc biệt này gần mọi nơi, giúp bạn dễ dàng lên kế hoạch cho chuyến thăm của mình.<br /><br />
                  - &lt; 5 phút đi bộ từ Trung tâm mua sắm &amp; Công viên
                </>
              }
              modalContent={''}
            />

            <hr />

            {/* Features */}
            <RoomFeatures
              title="Nơi này có những gì cho bạn"
              features={features}
              featureGroups={featureGroups}
            />
            <hr />
            <div>
              <div className="flex flex-col gap-2 mb-6">
                <Typography level={3} className="font-semibold">
                  Đặc điểm phù hợp với người có nhu cầu đặc biệt
                </Typography>
                <Typography level={1} className=" !text-gray-500">
                  Thông tin này do Chủ nhà cung cấp và được Airbnb xét duyệt.
                </Typography>
              </div>
              <div className='flex flex-col gap-4'>
                <Image
                  onClick={() => { setImageModal(true) }}
                  src={room.image}
                  alt={room.name}
                  width={300}
                  height={300}
                  className="hover:brightness-75 cursor-pointer h-fit max-w-max  object-cover md:rounded-xl"
                />
                <div>
                  <Typography className='font-semibold'>Phòng khách</Typography>
                  <Typography className='!text-base text-gray-500'>Lối vào không có bậc</Typography>
                </div>
                <Button onClick={() => { setImageModal(true) }} type='outline' className='rounded-xl border-black w-fit'>Hiển thị tất cả thông tin về tiện nghi</Button>
              </div>
            </div>
            <hr />
            <div className='mb-10' ref={bookingRef}>
              <div className="flex flex-col gap-2 mb-6">
                <Typography level={3} className="font-semibold">
                  Chọn ngày nhận phòng
                </Typography>
                <Typography level={1} className=" !text-gray-500 !text-sm">
                  {checkIn && checkOut ? `${formatDateShort(checkIn)} - ${formatDateShort(checkOut)}` : "Thêm ngày đi để biết giá chính xác"}
                </Typography>
              </div>
              <Calendar
                selectedCheckIn={checkIn}
                selectedCheckOut={checkOut}
                onDateClick={handleSelect}
                setMonthOffset={setMonthOffset}
                monthOffset={monthOffset}
                onClear={handleClear}
              />
            </div>
          </div>

          {/* Booking Box */}
          <div
            className={`order-first mb-10 md:order-last md:col-span-3 transition-all duration-200 
              ${isSticky
                ? 'md:sticky top-2 self-start'
                : ''
              }`}>
            <BookingSummary
              checkIn={checkIn}
              checkOut={checkOut}
              onDateClick={handleSelect}
              setMonthOffset={setMonthOffset}
              monthOffset={monthOffset}
              onClear={handleClear}
            />
          </div>
        </div>
      </div>
      <hr />


      <ReviewSummarySection
        ref={reviewSectionRef}
        averageScore={4.87}
        ratingBars={[
          { level: 5, percent: 80 },
          { level: 4, percent: 10 },
          { level: 3, percent: 5 },
          { level: 2, percent: 3 },
          { level: 1, percent: 2 },
        ]}
        metrics={[
          { label: 'Mức độ sạch sẽ', score: 4.8, icon: <CalendarClock width={35} height={35} /> },
          { label: 'Độ chính xác', score: 4.8, icon: <TicketCheck width={35} height={35} /> },
          { label: 'Nhận phòng', score: 4.8, icon: <Key width={35} height={35} /> },
          { label: 'Giao tiếp', score: 4.8, icon: <MessageCircle width={35} height={35} /> },
          { label: 'Vị trí', score: 4.8, icon: <Map width={35} height={35} /> },
          { label: 'Giá trị', score: 4.8, icon: <Pin width={35} height={35} /> },
        ]}
      />
      <hr />
      <ReviewGrid
        reviews={reviews}
        onShowFull={() => { setIsReviewModalOpen(true) }}
      />
      <hr />
      <LocationSection
        mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.596802972681!2d105.79424317471384!3d21.007435188511764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab95bd37c61f%3A0x6ec553a57ae27350!2sHanoi%20Grand%20Plaza%20Hotel!5e1!3m2!1sen!2s!4v1751355928594!5m2!1sen!2s"
        locationName="Tân Phú district, Hồ Chí Minh, Việt Nam"
        description="Nếu bạn muốn có thêm trải nghiệm địa phương tại TP HCM, Quận Tân Phú là nơi bạn thực sự có thể bắt gặp cách người Sài Gòn làm việc, mua sắm và sinh hoạt hàng ngày. Hơn nữa, quận này có thể thu hút bạn với nhiều món ăn đường phố giá rẻ ngon miệng."
        onShowMore={() => console.log('Xem thêm vị trí')}
        showMoreLabel="Hiển thị thêm"
      />
      <hr />
      <HostProfile host={hostData} />
      <hr />

      <InfoSection />
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />
    </div>
  );
}
