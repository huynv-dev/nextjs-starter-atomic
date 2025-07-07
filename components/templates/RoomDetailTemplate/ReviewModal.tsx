import Modal from "@/components/organisms/Modal/Modal";
import { ReviewSummarySection } from "./ReviewSummarySection";
import { CalendarClock, Key, Map, MessageCircle, Pin, Search, TicketCheck } from "lucide-react";
import { Typography } from "@/components/atoms/Typography/Typography";
import { Button } from "@/components/atoms/Button/Button";
import { DropdownContainer } from "@/components/molecules/SearchBar/DropdownContainer";
import { RefObject, useEffect, useRef, useState } from "react";
import { ReviewGrid } from "./ReviewCard";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useWindowSize } from "@/hooks/useWindowSize";
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


export const ReviewModal = ({ isOpen, onClose, modalRef }: { isOpen: boolean; onClose: () => void, modalRef?: React.Ref<HTMLDivElement> }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside([dropdownRef], () => setIsDropdownOpen(false));

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setIsScrolled(target.scrollTop > 0);
  };
  const { width } = useWindowSize();
  const isMd = width < 768;
  return (
    <Modal
      ref={modalRef}
      fullscreen={isMd}
      isOpen={isOpen}
      onClose={onClose}
      width={1025}
      height={625}
      showFooter={false}
      centered
      className="!rounded-3xl"
      closePosition="left"
    >
      <div className="grid grid-cols-1 md:grid-cols-6 max-md:max-h-screen">
        <div className="col-span-6 max-md:border-b max-md:border-b-gray-300  md:col-span-2 ">
          <ReviewSummarySection
            vertical
            averageScore={4.87}
            ratingBars={[
              { level: 5, percent: 80 },
              { level: 4, percent: 10 },
              { level: 3, percent: 5 },
              { level: 2, percent: 3 },
              { level: 1, percent: 2 },
            ]}
            metrics={[
              { label: 'Mức độ sạch sẽ', score: 4.8, icon: <CalendarClock width={25} height={25} /> },
              { label: 'Độ chính xác', score: 4.8, icon: <TicketCheck width={25} height={25} /> },
              { label: 'Nhận phòng', score: 4.8, icon: <Key width={25} height={25} /> },
              { label: 'Giao tiếp', score: 4.8, icon: <MessageCircle width={25} height={25} /> },
              { label: 'Vị trí', score: 4.8, icon: <Map width={25} height={25} /> },
              { label: 'Giá trị', score: 4.8, icon: <Pin width={25} height={25} /> },
            ]}
          />
        </div>
        <div className="col-span-6 max-md:mt-[5%] md:col-span-4  flex flex-col px-4 md:px-10">
          {/* Header */}
          <div className={`flex-shrink-0 pb-4 transition-all duration-200 ${isScrolled ? "border-b border-gray-300" : ""}`}>
            <div className="flex items-center justify-between">
              <Typography level={3} className="font-semibold">10 lượt đánh giá</Typography>
              <Button
                type="outline"
                size="sm"
                className="relative rounded-full hover:border hover:border-gray-400"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <Typography className="text-sm font-medium">
                  {value || "Phù hợp nhất"}
                </Typography>
                <DropdownContainer
                  ref={dropdownRef}
                  className="w-[200px] !top-[120%] !rounded-md shadow-lg border border-gray-200 bg-white !py-0"
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                  position="right"
                >
                  <div className="flex flex-col gap-1">
                    {[
                      "Phù hợp nhất",
                      "Gần đây nhất",
                      "Có điểm xếp hạng cao nhất",
                      "Có điểm xếp hạng thấp nhất",
                    ].map((option, idx) => (
                      <div
                        key={idx}
                        className={`w-full px-3 py-2 text-left text-sm font-medium rounded-md cursor-pointer hover:bg-gray-100 ${value === option ? "bg-gray-100 text-black" : "text-gray-700"
                          }`}
                        onClick={() => {
                          setValue(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </DropdownContainer>
              </Button>
            </div>
            <div className="relative w-full mt-4">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="w-full border border-gray-500 rounded-full pl-10 pr-3 py-2 text-sm placeholder:text-gray-400"
                placeholder="Tìm kiếm đánh giá..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <div
            className={`max-h-[35%] ${isMd ? '' : 'overflow-y-auto'} flex-1 mt-4`}
            onScroll={handleScroll}
          >
            <ReviewGrid
              reviews={reviews}
              columns={1}
              showFullButton={false}
            />
          </div>
        </div>

      </div>
    </Modal>
  );
};