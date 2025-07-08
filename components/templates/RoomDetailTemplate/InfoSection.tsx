// components/InfoSection.tsx
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { ArrowRight } from 'lucide-react';

interface InfoSectionProps {
  title: string;
  items: string[];
  showMore?: boolean;
  onShowMore?: () => void;
}

export const InfoSection = () => {
  return (
    <div className='my-10'>
      <Typography level={3} className="font-semibold">
        Những điều cần biết
      </Typography>
      <div className='grid grid-cols-1 md:grid-cols-3 my-10'>
        <div className='max-md:border-b max-md:border-gray-400 max-md:mb-4 flex flex-col gap-2 items-start'>
          <Typography className='font-semibold !text-base'>Nội quy nhà</Typography>
          <Typography className=' !text-base'>Nhận phòng sau 15:00</Typography>
          <Typography className=' !text-base'>Trả phòng trước 11:00</Typography>
          <Typography className=' !text-base'>Tối đa 2 khách</Typography>
          <Button
            type="link"
            color="black"
            icon={<ArrowRight width={20} height={20} />}
            iconPosition="end"
            className="!underline !px-0"
          >
            Hiển thị thêm
          </Button>
        </div>
        <div className='max-md:border-b max-md:border-gray-400 max-md:mb-4 flex flex-col gap-2 items-start'>
          <Typography className='font-semibold !text-base'>An toàn và chỗ ở</Typography>
          <Typography className=' !text-base'>Máy phát hiện khí CO</Typography>
          <Typography className=' !text-base'>Máy báo khói</Typography>
          <Typography className=' !text-base'>Phù hợp với em bé (dưới 2 tuổi)</Typography>
          <Button
            type="link"
            color="black"
            icon={<ArrowRight width={20} height={20} />}
            iconPosition="end"
            className="!underline !px-0"
          >
            Hiển thị thêm
          </Button>
        </div>
        <div className='max-md:border-b max-md:border-gray-400 max-md:mb-4 flex flex-col gap-2 items-start'>
          <Typography className='font-semibold !text-base'>Chính sách hủy</Typography>
          <Typography className=' !text-base'>Bạn được hủy miễn phí trước 17 thg 7. Bạn được hoàn tiền một phần nếu hủy trước khi nhận phòng/bắt đầu trải nghiệm vào 18 thg 7.</Typography>
          <Typography className=' !text-base'>Xem toàn bộ chính sách của Chủ nhà này để biết chi tiết.</Typography>
          <Button
            type="link"
            color="black"
            icon={<ArrowRight width={20} height={20} />}
            iconPosition="end"
            className="!underline !px-0"
          >
            Hiển thị thêm
          </Button>
        </div>
      </div>
    </div>
  );
};
