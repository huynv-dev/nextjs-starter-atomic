# Nextjs Project

## 1. Cấu trúc thư mục dự án

```
/components
  /atoms
    /Button
      Button.tsx
      Button.module.css
      Button.stories.tsx
      Button.test.tsx
    /Input
      Input.tsx
      Input.module.css
      Input.stories.tsx
      Input.test.tsx
    ...
  /molecules
    /ProductCard
      ProductCard.tsx
      ProductCard.stories.tsx
      ProductCard.test.tsx
    ...
  /organisms
    /Header
      Header.tsx
      Header.stories.tsx
      Header.test.tsx
    ...
/pages
  index.tsx
  _app.tsx
  ...
/public
  /images
    ...
/styles
  globals.css
  ...
/utils
  cn.ts
  ...
/jest.config.ts
/jest.setup.ts
/tsconfig.json
/next.config.ts
/package.json
/README.md
```

---

## 2. Kiến thức về Atomic Design

**Atomic Design** là một phương pháp luận để xây dựng giao diện người dùng theo hướng module, giúp tái sử dụng code, dễ bảo trì và mở rộng. Nó chia UI thành 5 cấp độ:

### 2.1. Atoms
- Thành phần nhỏ nhất, không thể chia nhỏ hơn (button, input, label, icon, ...).
- Đơn giản, không phụ thuộc vào các thành phần khác.

### 2.2. Molecules
- Kết hợp nhiều atom để tạo thành một khối chức năng nhỏ (ví dụ: Input + Label + ErrorMessage).
- Đảm nhận một chức năng cụ thể.

### 2.3. Organisms
- Kết hợp nhiều molecule và atom, tạo thành một phần giao diện phức tạp hơn (ví dụ: Header, Footer, ProductList).
- Có thể chứa logic và layout riêng.

### 2.4. Templates
- Định nghĩa bố cục tổng thể của trang, sắp xếp các organism, molecule, atom vào đúng vị trí.
- Chưa chứa dữ liệu thực tế, chỉ là khung.

### 2.5. Pages
- Là instance cụ thể của template với dữ liệu thực tế.
- Thường là các file trong thư mục `/pages` của Next.js.

---

## 3. Cách phân chia và sử dụng trong dự án

- **Atoms**:  Đặt trong `/components/atoms/`.  
  Ví dụ: `Button`, `Input`, `Label`, `Badge`, `Icon`,...
- **Molecules**:  Đặt trong `/components/molecules/`.  
  Ví dụ: `ProductCard` (gồm ảnh, tên, giá, nút mua), `FormField` (label + input + error),...
- **Organisms**:  Đặt trong `/components/organisms/`.  
  Ví dụ: `Header`, `Footer`, `ProductGrid`, `CartSummary`,...
- **Templates**:  Đặt trong `/components/templates/`.  
  Ví dụ: `ProductListTemplate`, `CartTemplate`, `CheckoutTemplate`,...
- **Pages**:  Đặt trong `/pages/` (theo chuẩn Next.js).  
  Ví dụ: `index.tsx`, `cart.tsx`, `checkout.tsx`,...

### **Cách sử dụng**

- Khi xây dựng UI, hãy bắt đầu từ atom → molecule → organism → template → page.
- Luôn ưu tiên tái sử dụng atom và molecule trong các thành phần lớn hơn.
- Mỗi component nên có file test (`.test.tsx`) và storybook (`.stories.tsx`) để dễ kiểm thử và phát triển.
- Khi cần sửa đổi UI, chỉ cần thay đổi ở atom/molecule, các thành phần lớn hơn sẽ tự động cập nhật.

#### **Ví dụ cụ thể**
- **Atom**: `Input` chỉ nhận props và render một `<input />` đơn giản.
- **Molecule**: `FormField` kết hợp `Label` + `Input` + `ErrorMessage`.
- **Organism**: `ProductCard` kết hợp ảnh, tên, giá, nút mua (có thể dùng lại trong nhiều template).
- **Template**: `ProductListTemplate` sắp xếp nhiều `ProductCard` thành lưới.
- **Page**: `/pages/index.tsx` sử dụng `ProductListTemplate` và truyền dữ liệu thực tế.

---

## 4. Lợi ích của Atomic Design

- **Tái sử dụng cao**: Các thành phần nhỏ có thể dùng lại ở nhiều nơi.
- **Dễ bảo trì**: Sửa một chỗ, hiệu ứng lan tỏa toàn bộ hệ thống.
- **Phát triển nhanh**: Có thể phát triển song song các thành phần nhỏ.
- **Kiểm thử dễ dàng**: Test từng phần nhỏ, giảm lỗi khi tích hợp.

---

## 5. Hướng dẫn phát triển

- Chạy Storybook:  
  ```bash
  npm run storybook
  ```
- Chạy test:  
  ```bash
  npm test
  ```
- Build production:  
  ```bash
  npm run build
  ```

---

## 6. Quy tắc phát triển cho thành viên trong team

### 6.1. Quy tắc phát triển code
- **Tuân thủ cấu trúc Atomic Design**: Luôn phân chia component đúng cấp độ (atom, molecule, organism, template, page).
- **Đặt tên rõ ràng**: Tên file, tên component, props phải rõ nghĩa, nhất quán.
- **Sử dụng TypeScript**: Luôn định nghĩa type cho props, tránh dùng kiểu `any`.
- **Tái sử dụng component**: Ưu tiên dùng lại atom/molecule thay vì tạo mới.
- **Không để code thừa**: Xóa code/comment không dùng đến.
- **Chia nhỏ commit**: Mỗi commit nên giải quyết một vấn đề nhỏ, ghi chú rõ ràng.
- **Review code**: Luôn tạo pull request và nhờ review trước khi merge vào nhánh chính.

### 6.2. Viết unit test với Testing Library
- **Mỗi component phải có file test**: Ví dụ, `Button.tsx` thì có `Button.test.tsx` cùng thư mục.
- **Test các trường hợp chính**: Render, event, props, trạng thái disabled, ...
- **Không test logic của thư viện**: Chỉ test logic của component mình viết.
- **Chạy test trước khi push code**: Đảm bảo tất cả test đều pass.
- **Ví dụ test đơn giản**:
  ```tsx
  import { render, screen } from '@testing-library/react'
  import { Button } from './Button'

  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  ```

### 6.3. Viết Storybook
- **Mỗi component phải có file story**: Ví dụ, `Button.tsx` thì có `Button.stories.tsx` cùng thư mục.
- **Story phải cover các trạng thái chính**: Default, disabled, loading, ...
- **Sử dụng args để dễ kiểm thử**:
  ```tsx
  import type { Meta, StoryObj } from '@storybook/react'
  import { Button } from './Button'

  const meta: Meta<typeof Button> = {
    title: 'Atoms/Button',
    component: Button,
  }
  export default meta
  type Story = StoryObj<typeof Button>

  export const Default: Story = {
    args: {
      children: 'Click me',
    },
  }
  ```
- **Chạy Storybook để kiểm tra giao diện**: `npm run storybook`

### 6.4. Quy trình merge code
1. Tạo branch mới từ `main` hoặc `develop`.
2. Phát triển tính năng/bugfix trên branch riêng.
3. Viết test, storybook cho component mới hoặc sửa đổi.
4. Đảm bảo pass toàn bộ test (`npm test`).
5. Tạo pull request, mô tả rõ thay đổi.
6. Được review và approved mới được merge.

---

## 7. Tài liệu tham khảo
- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

---

Nếu có thắc mắc hoặc cần hỗ trợ, hãy liên hệ leader hoặc người phụ trách dự án.