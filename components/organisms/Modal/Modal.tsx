import { Button, ButtonProps } from "@/components/atoms/Button/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { X, Info, CheckCircle, XCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";



interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancel?: (close: () => void) => void | Promise<void>;
  onOk?: (close: () => void) => void | Promise<void>;
  afterClose?: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;

  // Button configurations
  autoFocusButton?: null | "ok" | "cancel";
  cancelButtonProps?: ButtonProps;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  okText?: string;
  okType?: "primary" | "secondary" | "danger";

  // Styling and behavior
  centered?: boolean;
  className?: string;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  closePosition?: 'left' | 'right';
  footer?: React.ReactNode | ((originNode: React.ReactNode, extra: { OkBtn: React.FC, CancelBtn: React.FC }) => React.ReactNode) | null;
  showFooter?: boolean;
  icon?: React.ReactNode;
  keyboard?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  wrapClassName?: string;
  zIndex?: number;

  // Container
  getContainer?: HTMLElement | (() => HTMLElement) | string | false;
  ref?: React.Ref<any>;
}

interface ConfirmProps extends Omit<ModalProps, 'isOpen' | 'onClose'> {
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';

}

export const Modal: React.FC<ModalProps> & {
  info: (props: ConfirmProps) => void;
  success: (props: ConfirmProps) => void;
  error: (props: ConfirmProps) => void;
  warning: (props: ConfirmProps) => void;
  confirm: (props: ConfirmProps) => void;
} = ({
  isOpen = false,
  onClose,
  onCancel,
  onOk,
  afterClose,
  title,
  content,
  children,

  autoFocusButton = "ok",
  cancelButtonProps = {},
  cancelText = "Cancel",
  okButtonProps = {},
  okText = "OK",
  okType = "primary",
  closePosition = "right",

  centered = false,
  className = "",
  closable = true,
  closeIcon,
  footer,
  showFooter = true,
  icon,
  keyboard = true,
  mask = true,
  maskClosable = false,
  style = {},
  width = 520,
  height = 500,
  wrapClassName = "",
  zIndex = 1000,

  getContainer = document.body,
  ref = null
}) => {
    const [loading, setLoading] = useState({ ok: false, cancel: false });
    const [mounted, setMounted] = useState(false);
    const okButtonRef = useRef<HTMLButtonElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";

        // Auto focus
        if (autoFocusButton === "ok" && okButtonRef.current) {
          okButtonRef.current.focus();
        } else if (autoFocusButton === "cancel" && cancelButtonRef.current) {
          cancelButtonRef.current.focus();
        }
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen, autoFocusButton]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (keyboard && e.key === "Escape" && isOpen) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [keyboard, isOpen]);

    const handleClose = () => {
      onClose?.();
      setTimeout(() => {
        afterClose?.();
      }, 300); // Animation duration
    };

    const handleCancel = async () => {
      if (onCancel) {
        setLoading(prev => ({ ...prev, cancel: true }));
        try {
          await onCancel(handleClose);
          handleClose();
        } catch (error) {
          // Don't close if promise rejects
        } finally {
          setLoading(prev => ({ ...prev, cancel: false }));
        }
      } else {
        handleClose();
      }
    };

    const handleOk = async () => {
      if (onOk) {
        setLoading(prev => ({ ...prev, ok: true }));
        try {
          await onOk(handleClose);
          handleClose();
        } catch (error) {
          // Don't close if promise rejects
        } finally {
          setLoading(prev => ({ ...prev, ok: false }));
        }
      } else {
        handleClose();
      }
    };

    const handleBackdropClick = () => {
      if (maskClosable) {
        handleClose();
      }
    };

    const renderDefaultFooter = () => {
      const OkBtn: React.FC = () => (
        <Button
          ref={okButtonRef}
          type={okType}
          loading={loading.ok}
          onClick={handleOk}
          {...okButtonProps}
          className={`ml-2 ${okButtonProps.className || ""}`}
        >
          {okText}
        </Button>
      );

      const CancelBtn: React.FC = () => (
        <Button
          ref={cancelButtonRef}
          type="outline"
          loading={loading.cancel}
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
      );

      const defaultFooter = (
        <div className="p-3 flex justify-end mt-6">
          <CancelBtn />
          <OkBtn />
        </div>
      );

      if (typeof footer === "function") {
        return footer(defaultFooter, { OkBtn, CancelBtn });
      }

      return footer === null ? null : footer || defaultFooter;
    };

    if (!isOpen || !mounted) return null;

    const modalContent = (
      <div
        ref={ref}
        className={`fixed inset-0 flex ${centered ? "items-center" : "items-start pt-[10vh]"} justify-center ${wrapClassName}`}
        style={{ zIndex }}
        role="dialog"
        aria-modal="true"
      >
        {mask && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={handleBackdropClick}
            data-testid="modal-backdrop"
          />
        )}

        <div
          className={`relative bg-white rounded-lg shadow-2xl z-10 mx-4 transform transition-all duration-300 ${className}`}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            maxWidth: '90vw',
            maxHeight: '90vh',
            ...style
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || closable) && (
            <div className="relative p-6 pb-0 text-center">
              {/* Nút close bên trái */}
              {closable && closePosition === 'left' && (
                <div className="absolute left-6 top-6">
                  <Button
                    type="secondary"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 h-6 w-6 hover:text-gray-600 transition-colors p-1"
                    aria-label="Close"
                    icon={closeIcon || <X className="h-5 w-5" />}
                  />
                </div>
              )}

              {/* Title & icon */}
              {(title || icon) && (
                <div className="flex items-center justify-center">
                  {icon && <span className="mr-3 text-xl">{icon}</span>}
                  {title && (
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                  )}
                </div>
              )}

              {/* Nút close bên phải */}
              {closable && closePosition === 'right' && (
                <div className="absolute right-6 top-6">
                  <Button
                    type="secondary"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 h-6 w-6 hover:text-gray-600 transition-colors p-1"
                    aria-label="Close"
                    icon={closeIcon || <X className="h-5 w-5" />}
                  />
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {content || children}
          </div>

          {/* Footer */}
          {showFooter && renderDefaultFooter()}
        </div>
      </div>
    );

    // Handle getContainer
    if (getContainer === false) {
      return modalContent;
    }

    const container = typeof getContainer === 'function'
      ? getContainer()
      : typeof getContainer === 'string'
        ? document.querySelector(getContainer) as HTMLElement
        : getContainer || document.body;

    return ReactDOM.createPortal(modalContent, container);
  };

const createConfirmModal = (config: ConfirmProps & { type: 'info' | 'success' | 'error' | 'warning' | 'confirm' }) => {
  const iconMap = {
    info: <Info className="text-blue-500" size={24} />,
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <ExclamationTriangleIcon className="text-yellow-500" />,
    confirm: <ExclamationTriangleIcon className="text-yellow-500" />
  };

  const div = document.createElement('div');
  document.body.appendChild(div);
  const root = createRoot(div);

  const destroy = () => {
    root.unmount();
    document.body.removeChild(div);
  };

  const ConfirmModal = () => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
      setVisible(false);
      setTimeout(destroy, 300);
    };

    return (
      <Modal
        isOpen={visible}
        onClose={handleClose}
        icon={config.icon || iconMap[config.type]}
        title={config.title}
        content={config.content}
        onOk={config.onOk}
        onCancel={config.onCancel}
        okText={config.okText}
        cancelText={config.cancelText}
        okType={config.type === 'error' ? 'danger' : 'primary'}
        {...config}
      />
    );
  };

  root.render(<ConfirmModal />);
};

Modal.info = (props: ConfirmProps) => createConfirmModal({ ...props, type: 'info' });
Modal.success = (props: ConfirmProps) => createConfirmModal({ ...props, type: 'success' });
Modal.error = (props: ConfirmProps) => createConfirmModal({ ...props, type: 'error' });
Modal.warning = (props: ConfirmProps) => createConfirmModal({ ...props, type: 'warning' });
Modal.confirm = (props: ConfirmProps) => createConfirmModal({ ...props, type: 'confirm' });

export default Modal;