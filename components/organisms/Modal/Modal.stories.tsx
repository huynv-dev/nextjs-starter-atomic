import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import { Modal } from './Modal';
import { Info, CheckCircle, XCircle, AlertTriangle, Settings } from 'lucide-react';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component theo phong cách Ant Design với đầy đủ tính năng như static methods, promise support, auto focus, v.v.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Trạng thái hiển thị modal'
    },
    title: {
      control: 'text',
      description: 'Tiêu đề modal'
    },
    content: {
      control: 'text',
      description: 'Nội dung modal'
    },
    okText: {
      control: 'text',
      description: 'Text button OK'
    },
    cancelText: {
      control: 'text',
      description: 'Text button Cancel'
    },
    centered: {
      control: 'boolean',
      description: 'Căn giữa modal theo chiều dọc'
    },
    maskClosable: {
      control: 'boolean',
      description: 'Cho phép đóng modal khi click backdrop'
    },
    closable: {
      control: 'boolean',
      description: 'Hiển thị nút đóng (X)'
    },
    keyboard: {
      control: 'boolean',
      description: 'Cho phép đóng modal bằng ESC'
    },
    width: {
      control: 'number',
      description: 'Chiều rộng modal'
    },
    okType: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Loại button OK'
    },
    autoFocusButton: {
      control: 'select',
      options: [null, 'ok', 'cancel'],
      description: 'Button được auto focus'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Hook để quản lý state trong stories
const useModalState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return { isOpen, openModal, closeModal };
};

// Template component
const ModalTemplate = (args: any) => {
  const { isOpen, openModal, closeModal } = useModalState();

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Mở Modal
      </button>

      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          action('onClose')();
        }}
        onOk={() => {
          action('onOk')();
          closeModal();
        }}
        onCancel={() => {
          action('onCancel')();
          closeModal();
        }}
      >
        {args.children}
      </Modal>
    </div>
  );
};

// Basic Modal
export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Cơ Bản',
    children: (
      <div>
        <p>Đây là nội dung modal cơ bản.</p>
        <p>Bạn có thể đặt bất kỳ nội dung nào ở đây.</p>
      </div>
    ),
    okText: 'Đồng ý',
    cancelText: 'Hủy bỏ'
  }
};

// Modal với icon
export const WithIcon: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Với Icon',
    icon: <Info className="text-blue-500" size={24} />,
    children: (
      <div>
        <p>Modal này có icon thông tin ở tiêu đề.</p>
        <p>Icon giúp người dùng hiểu rõ hơn về mục đích của modal.</p>
      </div>
    ),
    okText: 'Hiểu rồi',
    cancelText: 'Đóng'
  }
};

// Modal căn giữa
export const Centered: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Căn Giữa',
    centered: true,
    children: (
      <div>
        <p>Modal này được căn giữa theo chiều dọc.</p>
        <p>Thuộc tính centered=true</p>
      </div>
    )
  }
};

// Modal có thể đóng bằng mask
export const MaskClosable: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Mask Closable',
    maskClosable: true,
    children: (
      <div>
        <p>Click vào vùng tối bên ngoài để đóng modal.</p>
        <p>Thuộc tính maskClosable=true</p>
      </div>
    )
  }
};

// Modal không có footer
export const NoFooter: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Không Footer',
    footer: null,
    children: (
      <div>
        <p>Modal này không có footer.</p>
        <p>Chỉ có thể đóng bằng nút X hoặc ESC.</p>
      </div>
    )
  }
};

// Modal với footer tùy chỉnh
export const CustomFooter: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Footer Tùy Chỉnh',
    footer: (
      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Trợ giúp
        </button>
        <div className="space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Hủy
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Lưu
          </button>
        </div>
      </div>
    ),
    children: (
      <div>
        <p>Modal này có footer được tùy chỉnh.</p>
        <p>Footer có thể chứa bất kỳ nội dung nào.</p>
      </div>
    )
  }
};

// Modal với kích thước tùy chỉnh
export const CustomWidth: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Rộng',
    width: 800,
    children: (
      <div>
        <p>Modal này có chiều rộng 800px.</p>
        <p>Bạn có thể điều chỉnh kích thước theo nhu cầu.</p>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Thông tin bổ sung</h4>
          <p>Với không gian rộng hơn, bạn có thể hiển thị nhiều nội dung hơn.</p>
        </div>
      </div>
    )
  }
};

// Modal với loading state
export const WithLoading: Story = {
  render: (args: any) => {
    const { isOpen, openModal, closeModal } = useModalState();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
      setLoading(true);
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      closeModal();
      action('onOk - completed')();
    };

    return (
      <div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mở Modal Loading
        </button>

        <Modal
          {...args}
          isOpen={isOpen}
          onClose={closeModal}
          onOk={handleOk}
          onCancel={closeModal}
          okButtonProps={{ loading }}
        />
      </div>
    );
  },
  args: {
    title: 'Modal Với Loading',
    okText: 'Xử lý',
    cancelText: 'Hủy',
    children: (
      <div>
        <p>Nhấn "Xử lý" để xem trạng thái loading.</p>
        <p>Button sẽ hiển thị loading trong 2 giây.</p>
      </div>
    )
  }
};

// Modal nguy hiểm
export const DangerModal: Story = {
  render: ModalTemplate,
  args: {
    title: 'Xóa Tài Khoản',
    icon: <XCircle className="text-red-500" size={24} />,
    okType: 'danger',
    okText: 'Xóa',
    cancelText: 'Giữ lại',
    children: (
      <div>
        <p className="text-red-600 font-medium">Cảnh báo: Hành động này không thể hoàn tác!</p>
        <p className="mt-2">Bạn có chắc chắn muốn xóa tài khoản này không?</p>
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
          <li>Tất cả dữ liệu sẽ bị mất vĩnh viễn</li>
          <li>Không thể khôi phục sau khi xóa</li>
          <li>Các liên kết sẽ bị vô hiệu hóa</li>
        </ul>
      </div>
    )
  }
};

// Modal form
export const FormModal: Story = {
  render: ModalTemplate,
  args: {
    title: 'Thêm Người Dùng Mới',
    width: 600,
    okText: 'Tạo',
    cancelText: 'Hủy',
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập họ và tên"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vai trò
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Người dùng</option>
            <option>Quản trị viên</option>
            <option>Biên tập viên</option>
          </select>
        </div>
      </form>
    )
  }
};

// Static Methods Stories
export const StaticMethods: Story = {
  render: () => {
    const showInfo = () => {
      Modal.info({
        title: 'Thông Tin',
        content: 'Đây là modal thông tin được tạo bằng Modal.info()',
        okText: 'Đã hiểu'
      });
    };

    const showSuccess = () => {
      Modal.success({
        title: 'Thành Công',
        content: 'Thao tác đã được thực hiện thành công!',
        okText: 'Tuyệt vời'
      });
    };

    const showError = () => {
      Modal.error({
        title: 'Lỗi',
        content: 'Đã xảy ra lỗi khi thực hiện thao tác. Vui lòng thử lại.',
        okText: 'Thử lại'
      });
    };

    const showWarning = () => {
      Modal.warning({
        title: 'Cảnh Báo',
        content: 'Bạn có chắc chắn muốn tiếp tục? Hành động này có thể ảnh hưởng đến dữ liệu.',
        okText: 'Tiếp tục',
        cancelText: 'Hủy'
      });
    };

    const showConfirm = () => {
      Modal.confirm({
        title: 'Xác Nhận',
        content: 'Bạn có muốn lưu các thay đổi không?',
        okText: 'Lưu',
        cancelText: 'Không lưu',
        onOk: () => {
          console.log('Đã lưu');
          action('Confirmed - Saved')();
        },
        onCancel: () => {
          console.log('Không lưu');
          action('Cancelled - Not saved')();
        }
      });
    };

    const showPromiseConfirm = () => {
      Modal.confirm({
        title: 'Xóa Tệp',
        content: 'Bạn có chắc chắn muốn xóa tệp này không?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        okType: 'danger',
        onOk: async (close) => {
          try {
            // Giả lập API call
            await new Promise((resolve, reject) => {
              setTimeout(() => {
                // Giả lập 70% thành công, 30% thất bại
                Math.random() > 0.3 ? resolve(true) : reject(new Error('Network error'));
              }, 1500);
            });

            action('File deleted successfully')();
            // Modal sẽ tự đóng nếu Promise resolve
          } catch (error) {
            action('Failed to delete file')();
            alert('Lỗi: Không thể xóa tệp. Vui lòng thử lại.');
            throw error; // Ném lỗi để modal không đóng
          }
        }
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Static Methods</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={showInfo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Info size={16} />
            Modal.info()
          </button>

          <button
            onClick={showSuccess}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} />
            Modal.success()
          </button>

          <button
            onClick={showError}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <XCircle size={16} />
            Modal.error()
          </button>

          <button
            onClick={showWarning}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center gap-2"
          >
            <AlertTriangle size={16} />
            Modal.warning()
          </button>

          <button
            onClick={showConfirm}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center justify-center gap-2"
          >
            <Settings size={16} />
            Modal.confirm()
          </button>

          <button
            onClick={showPromiseConfirm}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <AlertTriangle size={16} />
            Promise Confirm
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Hướng dẫn:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Modal.info()</strong>: Hiển thị thông tin</li>
            <li>• <strong>Modal.success()</strong>: Thông báo thành công</li>
            <li>• <strong>Modal.error()</strong>: Thông báo lỗi</li>
            <li>• <strong>Modal.warning()</strong>: Cảnh báo</li>
            <li>• <strong>Modal.confirm()</strong>: Xác nhận hành động</li>
            <li>• <strong>Promise Confirm</strong>: Xử lý bất đồng bộ với Promise</li>
          </ul>
        </div>
      </div>
    );
  }
};

// Playground để test tất cả props
export const Playground: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Playground',
    okText: 'OK',
    cancelText: 'Cancel',
    centered: false,
    maskClosable: false,
    closable: true,
    keyboard: true,
    width: 520,
    okType: 'primary',
    autoFocusButton: 'ok',
    children: (
      <div>
        <p>Đây là playground để test tất cả các props của Modal.</p>
        <p>Thay đổi các controls bên phải để xem sự khác biệt.</p>
      </div>
    )
  }
};