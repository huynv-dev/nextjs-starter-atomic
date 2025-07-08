import { Button } from "@/components/atoms/Button/Button";
import { Image } from "@/components/atoms/Image";
import { Typography } from "@/components/atoms/Typography/Typography";
import Modal from "@/components/organisms/Modal/Modal";
import { ChevronLeft, ChevronRight, Heart, ShareIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

export const ImageModal = ({
  isOpen,
  onClose,
  imgPath,
}: {
  isOpen: boolean;
  onClose: () => void;
  imgPath: string;
}) => {
  const [liked, setLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const images = [...Array(20)].map((_, idx) => `${imgPath}?v=${idx}`);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") goToPrevious();
      else if (e.key === "ArrowRight") goToNext();
      else if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNext();
    else if (distance < -50) goToPrevious();
  };

  return (
    <Modal
      fullscreen
      isOpen={isOpen}
      onClose={onClose}
      showFooter={false}
      closable={!isSliderOpen}
      closeIcon={<ChevronLeft width={24} height={24} />}
      closePosition="left"
      titlePosition="right"
      title={
        <div className="flex gap-4">
          {["Chia sẻ", "Yêu thích"].map((text, i) => (
            <div
              key={i}
              className="font-medium flex items-center gap-2 cursor-pointer"
              onClick={() => i === 1 && setLiked((prev) => !prev)}
            >
              {i === 0 ? (
                <ShareIcon
                  className={isSliderOpen ? "text-white" : ""}
                  size={16}
                />
              ) : (
                <Heart
                  className={`${liked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500"
                    } ${isSliderOpen ? "text-white" : ""}`}
                  size={16}
                />
              )}
              <Typography
                underline
                type="primary"
                className={`text-sm font-semibold ${isSliderOpen ? "text-white" : ""
                  }`}
              >
                {!isSliderOpen && text}
              </Typography>
            </div>
          ))}
        </div>
      }
      style={{ backgroundColor: isSliderOpen ? "black" : "white" }}
    >
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${isSliderOpen ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="relative h-full w-full flex items-center justify-center bg-black">
            <Button
              size="sm"
              icon={<X size={20} className="text-white" />}
              type="outline"
              className="absolute top-0 left-4 z-10 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setIsSliderOpen(false)}
            >
              Đóng
            </Button>

            <Button
              icon={<ChevronLeft size={32} />}
              type="outline"
              onClick={goToPrevious}
              className="absolute left-4 z-10 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={images.length <= 1}
            />

            <div
              className="relative w-full h-full flex flex-col items-center justify-start px-16"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Typography className="text-white mb-4">
                {currentIndex + 1} / {images.length}
              </Typography>
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                width={700}
                height={500}
              />
            </div>

            <Button
              icon={<ChevronRight size={32} />}
              type="outline"
              onClick={goToNext}
              className="absolute right-4 z-10 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={images.length <= 1}
            />
          </div>
        </div>

        <div
          className={`absolute inset-0 overflow-y-auto transition-opacity duration-200 ${!isSliderOpen ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="max-w-screen-md mx-auto px-4 py-6">
            {images.map((src, idx) => (
              <div key={idx} className="flex flex-col gap-2 mb-4">
                <div className="h-[60%]">
                  <Image
                    src={src}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-auto object-cover cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsSliderOpen(true);
                    }}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 h-[40%]">
                  <Image
                    src={src}
                    alt={`Thumb ${idx + 1}-1`}
                    className="w-full h-auto object-cover"
                    width={100}
                    height={100}
                  />
                  <Image
                    src={src}
                    alt={`Thumb ${idx + 1}-2`}
                    className="w-full h-auto object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
