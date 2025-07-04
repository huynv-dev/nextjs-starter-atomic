import React from 'react';
import { User2Icon, Star, Book, BathIcon, VaultIcon, User2 } from 'lucide-react';
import Image from 'next/image';
import { Typography } from '@/components/atoms/Typography/Typography';
import { CardLayout } from './CardLayout';
import VerifiedIconWrapper from '@/components/icons/VerifiedIcon';
import { Button } from '@/components/atoms/Button/Button';
import { ShieldIcon } from '@/components/icons/ShieldIcon';

interface HostStats {
  reviews: number;
  rating: number;
  yearsExperience: number;
}

interface HostInfo {
  name: string;
  avatar: string;
  isVerified?: boolean;
  isSuperHost?: boolean;
  stats: HostStats;
  personalInfo: {
    birthDecade?: string;
    education?: string;
    occupation?: string;
    uniqueFeature?: string;
    hostingStyle?: string;
    additionalInfo?: string;
  };
  hostingInfo: {
    responseRate: string;
    responseTime: string;
  };
}

interface HostProfileProps {
  host: HostInfo;
  showSuperHostBadge?: boolean;
  showContactButton?: boolean;
  showPaymentWarning?: boolean;
  className?: string;
}

const HostProfile: React.FC<HostProfileProps> = ({
  host,
  showSuperHostBadge = true,
  showContactButton = true,
  showPaymentWarning = true,
  className = '',
}) => {
  const {
    name,
    avatar,
    isVerified = false,
    isSuperHost = false,
    stats,
    personalInfo,
    hostingInfo,
  } = host;

  return (
    <div className={`my-10 ${className}`}>
      <Typography level={3} className="font-semibold">
        Gặp gỡ host của bạn
      </Typography>

      <div className="flex items-start gap-10 ">
        <div className="w-2/3 md:w-1/3">
          <CardLayout classNames="flex my-10">
            <div className="flex w-2/3 items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Image
                    src={avatar}
                    alt={`${name} avatar`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  {isVerified && <VerifiedIconWrapper />}
                </div>

                <Typography level={4} className="!font-semibold">
                  {name}
                </Typography>

                {isSuperHost && showSuperHostBadge && (
                  <div className="flex items-center gap-1">
                    <User2Icon className="rotate-180 text-gray-500" width={15} height={15} />
                    <Typography className="text-xs text-gray-500">
                      Chủ nhà siêu cấp
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/3">
              <div className="flex flex-col items-start border-b border-gray-300 py-2">
                <Typography level={3} className="!font-semibold">
                  {stats.reviews}
                </Typography>
                <Typography className="!text-xs font-medium">Đánh giá</Typography>
              </div>

              <div className="flex flex-col items-start border-b border-gray-300 py-2">
                <Typography level={3} className="!font-semibold flex items-center gap-1">
                  {stats.rating}{' '}
                  <Star width={10} height={10} fill="currentColor" />
                </Typography>
                <Typography className="!text-xs font-medium">Xếp hạng</Typography>
              </div>

              <div className="flex flex-col items-start py-2">
                <Typography level={3} className="!font-semibold">
                  {stats.yearsExperience}
                </Typography>
                <Typography className="!text-xs font-medium">
                  Năm kinh nghiệm đón tiếp khách
                </Typography>
              </div>
            </div>
          </CardLayout>

          <div className="flex flex-col gap-5">
            {personalInfo.birthDecade && (
              <div className="flex items-center gap-3">
                <VaultIcon width={25} height={25} />
                <Typography level={1} className="!text-base">
                  Sinh ra vào {personalInfo.birthDecade}
                </Typography>
              </div>
            )}

            {personalInfo.education && (
              <div className="flex items-center gap-3">
                <Book width={25} height={25} />
                <Typography level={1} className="!text-base">
                  Nơi tôi từng theo học: {personalInfo.education}
                </Typography>
              </div>
            )}

            {personalInfo.occupation && (
              <div className="flex items-center gap-3">
                <BathIcon width={25} height={25} />
                <Typography level={1} className="!text-base">
                  Công việc của tôi: {personalInfo.occupation}
                </Typography>
              </div>
            )}

            {personalInfo.uniqueFeature && (
              <div className="flex items-center gap-3">
                <VaultIcon width={25} height={25} />
                <Typography level={1} className="!text-base whitespace-pre-line">
                  Điều độc đáo : {personalInfo.uniqueFeature}
                </Typography>
              </div>
            )}

            {personalInfo.hostingStyle && (
              <div className="flex items-center gap-3">
                <User2 width={25} height={25} />
                <Typography level={1} className="!text-base">
                  {personalInfo.hostingStyle}
                </Typography>
              </div>
            )}

            {personalInfo.additionalInfo && (
              <Typography level={1} className="!text-base">
                {personalInfo.additionalInfo}
              </Typography>
            )}
          </div>
        </div>

        <div className="hidden md:block w-2/3">
          <div className="flex flex-col gap-10 border-b border-gray-300 pb-10">
            {isSuperHost && (
              <div className="flex flex-col gap-3">
                <Typography level={2} className="!text-lg font-semibold">
                  {name} là một Chủ nhà siêu cấp
                </Typography>
                <Typography level={1} className="!text-base">
                  Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá cao
                  và cam kết mang lại kỳ nghỉ tuyệt vời cho khách.
                </Typography>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Typography level={2} className="!text-lg font-semibold">
                Thông tin Chủ nhà
              </Typography>
              <Typography level={1} className="!text-base whitespace-pre-line">
                Tỉ lệ phản hồi: {hostingInfo.responseRate} {'\n'}
                Phản hồi trong vòng {hostingInfo.responseTime}
              </Typography>
            </div>

            {showContactButton && (
              <Button
                type="ghost"
                className="w-fit rounded-xl !bg-gray-200 !text-base"
              >
                Nhắn tin cho host
              </Button>
            )}
          </div>

          {showPaymentWarning && (
            <div className="flex gap-3 my-5">
              <ShieldIcon />
              <Typography className="!text-xs">
                Để bảo vệ khoản thanh toán của bạn, hãy luôn sử dụng Airbnb
                để chuyển tiền và liên lạc với host.
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostProfile;