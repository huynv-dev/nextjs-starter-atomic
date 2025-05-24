import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile Typography component that handles different text styles consistently across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body1', 'body2', 'caption'],
      description: 'The variant determines the text style and size',
      table: {
        defaultValue: { summary: 'body1' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'rose'],
      description: 'The color of the text',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    children: {
      control: 'text',
      description: 'The content to be rendered',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">
        Heading 1 - The quick brown fox jumps over the lazy dog (24px)
      </Typography>
      <Typography variant="h2">
        Heading 2 - The quick brown fox jumps over the lazy dog (20px)
      </Typography>
      <Typography variant="h3">
        Heading 3 - The quick brown fox jumps over the lazy dog (18px)
      </Typography>
      <Typography variant="body1">
        Body 1 - The quick brown fox jumps over the lazy dog (16px)
      </Typography>
      <Typography variant="body2">
        Body 2 - The quick brown fox jumps over the lazy dog (14px)
      </Typography>
      <Typography variant="caption">
        Caption - The quick brown fox jumps over the lazy dog (14px light)
      </Typography>
    </div>
  ),
};

// Showcase all colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography color="primary">
        Primary Color - Used for main content
      </Typography>
      <Typography color="secondary">
        Secondary Color - Used for supporting text
      </Typography>
      <Typography color="rose">
        Rose Color - Used for Airbnb branding and CTAs
      </Typography>
    </div>
  ),
};

// Individual variants with different colors
export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Khám phá chỗ ở tại Việt Nam',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Những địa điểm nổi bật',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Đánh giá từ khách hàng',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Khám phá những địa điểm tuyệt vời và trải nghiệm độc đáo tại Việt Nam.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Giá đã bao gồm thuế và phí dịch vụ',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Cập nhật lần cuối: 15/03/2024',
  },
};

// Real world examples
export const RoomCardExample: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <Typography variant="body2" color="secondary">
        Hồ Chí Minh, Việt Nam
      </Typography>
      <Typography variant="h3">
        Căn hộ cao cấp view thành phố
      </Typography>
      <Typography variant="body1">
        2 khách · 1 phòng ngủ · 1 giường
      </Typography>
      <div className="flex items-baseline space-x-1">
        <Typography variant="h3" color="primary">
          1.250.000₫
        </Typography>
        <Typography variant="body2" color="secondary">
          /đêm
        </Typography>
      </div>
    </div>
  ),
};

// Error message example
export const ErrorMessage: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="h3" className="text-red-500">
        Đã có lỗi xảy ra
      </Typography>
      <Typography variant="body2" color="secondary">
        Vui lòng thử lại sau hoặc liên hệ hỗ trợ
      </Typography>
    </div>
  ),
};

// Success message example
export const SuccessMessage: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="h3" className="text-green-500">
        Đặt phòng thành công
      </Typography>
      <Typography variant="body2" color="secondary">
        Thông tin chi tiết đã được gửi vào email của bạn
      </Typography>
    </div>
  ),
};

// Long text example with different variants
export const ArticleExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Typography variant="h1">
        Du lịch Việt Nam: Khám phá vẻ đẹp ẩn giấu
      </Typography>
      <Typography variant="h2">
        Những điểm đến không thể bỏ qua
      </Typography>
      <Typography variant="body1">
        Việt Nam là một đất nước với nhiều điểm đến hấp dẫn, từ những bãi biển 
        tuyệt đẹp ở miền Trung đến những dãy núi hùng vĩ ở phía Bắc. Mỗi vùng 
        miền đều mang trong mình những nét văn hóa độc đáo và phong cảnh thiên 
        nhiên tuyệt vời.
      </Typography>
      <Typography variant="h3">
        Ẩm thực đặc sắc
      </Typography>
      <Typography variant="body2">
        Không chỉ nổi tiếng với cảnh đẹp, Việt Nam còn được biết đến với nền 
        ẩm thực phong phú và đa dạng. Từ phở Hà Nội đến bánh mì Sài Gòn, mỗi 
        món ăn đều là một trải nghiệm ẩm thực độc đáo.
      </Typography>
      <Typography variant="caption">
        Nguồn: Tổng cục Du lịch Việt Nam
      </Typography>
    </div>
  ),
}; 