import { Image } from "@/components/atoms/Image";
import { Typography } from "@/components/atoms/Typography/Typography";
import Modal from "@/components/organisms/Modal/Modal";
import { ChevronLeft, Heart, ShareIcon } from "lucide-react";

export const ImageModal = ({ isOpen, onClose, imgPath }: { isOpen: boolean, onClose: () => void, imgPath: string }) => {
  return (
    <Modal
      fullscreen
      isOpen={isOpen}
      onClose={onClose}
      showFooter={false}
      closeIcon={<ChevronLeft width={24} height={24} />}
      closePosition='left'
      titlePosition='right'
      title={
        <div className="flex gap-4">
          {['Chia sẻ', 'Yêu thích'].map((text, i) => (
            <div key={i} className="font-medium flex items-center gap-2 cursor-pointer">
              {i === 0 ? <ShareIcon width={16} height={16} /> : <Heart width={16} height={16} />}
              <Typography underline type="primary" className="text-sm font-semibold">{text}</Typography>
            </div>
          ))}
        </div>
      }
    >
      <div className="h-screen w-full overflow-y-auto">
        <div className="max-w-screen-md mx-auto px-4 py-6">
          {[...Array(20)].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2 mb-2">
              <div className="h-[60%]">
                <Image
                  src={imgPath}
                  alt={`${imgPath} - ${idx}`}
                  width={200}
                  height={170}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 h-[40%]">
                <Image
                  src={imgPath}
                  alt={`${imgPath} - ${idx}`}
                  width={200}
                  height={170}
                  className="w-full h-auto object-cover"
                />
                <Image
                  src={imgPath}
                  alt={`${imgPath} - ${idx}`}
                  width={200}
                  height={170}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};