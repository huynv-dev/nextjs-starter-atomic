# Technical Summary: Unsplash Gallery Clone

## 1. Kiến trúc & Kỹ thuật sử dụng

- **Atomic Design**: Chia nhỏ UI thành Atoms, Molecules, Organisms, Templates để dễ mở rộng, tái sử dụng và kiểm thử.
- **Next.js App Router**: Sử dụng cấu trúc thư mục `app/` cho routing, API mock, layout.
- **Zustand**: Quản lý state ảnh, loading, error, fetch ảnh (mock hoặc Unsplash thật).
- **Mock API**: Sử dụng API `/api/mock-gallery` trả về ảnh từ Lorem Picsum, hỗ trợ phân trang, random ảnh.
- **Responsive Masonry Grid**: Dùng `react-responsive-masonry` để hiển thị grid ảnh tự động thay đổi số cột theo kích thước màn hình.
- **Next.js Image**: Tối ưu lazy load, responsive, giữ tỉ lệ khung hình, tăng hiệu năng.
- **Skeleton Loading**: Hiển thị skeleton giữ chỗ khi ảnh chưa tải xong, tránh layout nhảy.
- **Gallery Preview**: Modal preview ảnh lớn, responsive, mở khi click vào ảnh.
- **Test & Storybook**: Viết test và story cho các component chính.

## 2. Vấn đề khi render nhiều ảnh & Giải pháp

### Vấn đề
- **Không thể render hàng ngàn/hàng triệu ảnh cùng lúc**: Gây lag, crash trình duyệt, tốn RAM.
- **Scroll nhanh, ảnh chưa kịp load**: Dẫn đến blank, layout nhảy, UX kém.
- **Layout Masonry dễ bị nhảy khi ảnh chưa xác định kích thước.**

### Giải pháp
- **Infinite Scroll + Windowed State**: Chỉ fetch và giữ 1 lượng ảnh vừa đủ (ví dụ 200 ảnh gần nhất), fetch thêm khi scroll gần cuối.
- **Virtualization (nếu cần)**: Chỉ render các ảnh trong viewport (có thể dùng thêm react-window nếu số lượng ảnh lớn vượt quá khả năng Masonry).
- **Skeleton Placeholder**: Hiển thị skeleton đúng tỉ lệ khung hình cho từng ảnh, giúp layout không nhảy và không bị blank khi ảnh chưa load xong.
- **Responsive Masonry**: Số lượng cột tự động thay đổi theo màn hình, tối ưu UX trên mọi thiết bị.
- **Tối ưu Next.js Image**: Lazy load, responsive, giữ aspect ratio, hiệu ứng fade-in khi load xong.
- **Tách component theo atomic design**: Dễ kiểm soát, tối ưu từng phần nhỏ, dễ test và maintain.

## 3. Windowed State: Giải thích chi tiết & Ví dụ cụ thể

### Windowed State là gì?
- Chỉ giữ một "cửa sổ" (window) nhỏ các ảnh trong bộ nhớ/UI, ví dụ 200 ảnh gần nhất, thay vì giữ toàn bộ danh sách ảnh.
- Giúp tiết kiệm RAM, tăng hiệu năng, tránh crash khi kho ảnh lớn.

### Thuật toán windowed state (pseudo-code)
```js
const WINDOW_SIZE = 200;
let photos = [];

function onFetchNewPhotos(newPhotos) {
  photos = [...photos, ...newPhotos];
  if (photos.length > WINDOW_SIZE) {
    photos = photos.slice(photos.length - WINDOW_SIZE);
  }
}
```

### Ví dụ cụ thể khi scroll

Giả sử WINDOW_SIZE = 5 để dễ hình dung.

#### 1. **Scroll xuống (load thêm ảnh mới)**
- Ban đầu: `photos = [1,2,3,4,5]`
- User scroll xuống, fetch thêm 3 ảnh: `[6,7,8]`
- Sau khi thêm:
  - `photos = [1,2,3,4,5,6,7,8]`
  - Quá WINDOW_SIZE, chỉ giữ 5 ảnh cuối: `photos = [4,5,6,7,8]`
- **Kết quả:** Luôn chỉ giữ 5 ảnh gần nhất, ảnh cũ tự loại bỏ khỏi state/UI.

#### 2. **Scroll lên (muốn xem lại ảnh cũ)**
- Nếu chỉ dùng windowed state đơn giản như trên, các ảnh cũ đã bị loại khỏi state, user không xem lại được.
- **Giải pháp nếu cần hỗ trợ scroll lên:**
  - Kết hợp windowed state với cache hoặc fetch lại page cũ khi user scroll lên (giống cơ chế của các app chat/feed lớn).
  - Hoặc dùng virtualization (react-window) để chỉ render các ảnh trong viewport, nhưng vẫn giữ reference tới toàn bộ data (nếu RAM cho phép).

### Lưu ý
- Với gallery chỉ cần trải nghiệm mượt khi scroll xuống (xem ảnh mới), windowed state là đủ.
- Nếu cần scroll lên/xuống không giới hạn, nên kết hợp windowed state với cache hoặc virtualization.

## 4. Tổng kết
- Dự án đảm bảo hiệu năng, UX tốt kể cả với kho ảnh lớn.
- Dễ mở rộng, tái sử dụng, kiểm thử nhờ atomic design.
- Có thể chuyển đổi giữa mock API và Unsplash thật dễ dàng. 