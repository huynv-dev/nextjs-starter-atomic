import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Heart, Share } from "lucide-react";
import { Image } from "@/components/atoms/Image";

export const ImageSliderModal = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-white bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onClose}>
          <X size={24} />
        </button>
        <span className="text-sm">{currentIndex + 1} / {images.length}</span>
        <div className="flex items-center gap-4">
          <Share size={20} />
          <button onClick={() => setLiked(!liked)}>
            <Heart className={liked ? "fill-red-500 text-red-500" : "text-white"} size={20} />
          </button>
        </div>
      </div>

      {/* Main image with arrows */}
      <div className="flex-1 flex items-center justify-center relative">
        <button onClick={goToPrevious} className="absolute left-4 text-white z-10">
          <ChevronLeft size={32} />
        </button>
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          width={600}
          height={600}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <button onClick={goToNext} className="absolute right-4 text-white z-10">
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};
