'use client';
import Modal from "@/components/organisms/Modal/Modal"

export const ParagraphModal = (
  { isOpen, onClose, children }: { isOpen: boolean; onClose: () => void, children?: any }
) => {
  return (
    <Modal
      className="!rounded-3xl"
      isOpen={isOpen}
      onClose={onClose}
      width={785}
      title="Giới thiệu về chỗ ở này"
      closePosition="left"
      showFooter={false}

    >
      {children ? children : (
        <div className="space-y-4 text-gray-800 leading-relaxed text-sm">
          Thư giãn trong sự thoải mái và yên tĩnh ở nơi yên bình này nằm hoàn hảo ở trung tâm Sài Gòn,
          tòa nhà Bitexco, chợ Bến Thành, Phố đi bộ Nguyễn Huệ, Nhà thờ Đức Bà Sài Gòn, Dinh Độc Lập...
          <br />
          Địa điểm đặc biệt này gần mọi nơi, giúp bạn dễ dàng lên kế hoạch cho chuyến thăm của mình.
          <br />
          <ul className="list-disc list-inside space-y-1">
            <li>&lt; 5 phút đi bộ từ Trung tâm mua sắm &amp; Công viên</li>
            <li>Chợ trái cây và ẩm ướt địa phương đích thực trước nhà của chúng tôi</li>
            <li>Nhiều nhà hàng địa phương gần đó (ăn chay, hải sản, bánh mì,...)</li>
          </ul>

          <p className="font-medium">Chỗ ở</p>

          <p>
            Căn phòng đặc biệt này nằm ở tầng 4, mang đến trải nghiệm độc đáo và riêng tư.
            Để sử dụng, bạn có thể đi thang máy lên tầng 3 và sau đó đi lên một tầng cầu thang.
            Đừng lo lắng về hành lý của bạn – chúng tôi sẽ có mặt để chào đón bạn và hỗ trợ bất cứ điều gì bạn cần,
            đảm bảo việc đến nơi suôn sẻ và thoải mái!
          </p>
        </div>
      )}

    </Modal>
  )
}
