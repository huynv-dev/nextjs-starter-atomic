// Tailwind version - No CSS module
import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Copy, Edit, Check } from 'lucide-react';

type Level = 1 | 2 | 3 | 4 | 5;
type Variant =
  | 'title'
  | 'text'
  | 'link'
  | 'paragraph'
  | 'code'
  | 'mark'
  | 'keyboard'
  | 'delete'
  | 'underline'
  | 'strong'
  | 'italic'
  | 'disabled';

interface TypographyProps {
  variant?: Variant;
  level?: Level;
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  editable?: boolean;
  copyable?: boolean;
}

export function Typography({
  variant = 'text',
  level = 1,
  type = 'primary',
  disabled = false,
  mark = false,
  code = false,
  keyboard = false,
  underline = false,
  delete: isDelete = false,
  strong = false,
  italic = false,
  children,
  className = '',
  onClick,
  editable = false,
  copyable = false,
}: TypographyProps) {
  const Component = variant === 'title' ? `h${level}` : variant === 'paragraph' ? 'p' : 'span';
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState(typeof children === 'string' ? children : '');

  const handleCopy = () => {
    if (typeof text === 'string' && text.length > 0) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const typeClasses = {
    primary: 'text-[var(--foreground)]',
    secondary: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  const levelClasses = {
    title: [
      '',
      'text-lg font-medium',
      'text-xl font-medium',
      'text-2xl font-semibold',
      'text-3xl font-semibold',
      'text-4xl font-bold',
    ],
    text: [
      '',
      'text-lg',
      'text-xl',
      'text-2xl',
      'text-3xl',
      'text-4xl',
    ],
  };

  const extraClasses = clsx({
    underline: underline,
    'line-through': isDelete,
    'font-bold': strong,
    italic: italic,
    'opacity-50 cursor-not-allowed': disabled,
    'bg-yellow-200 px-1 rounded': mark,
    'bg-gray-100 font-mono px-1 rounded text-sm': code,
    'border px-1 text-sm bg-gray-100 rounded font-mono': keyboard,
  });

  const classes = clsx(
    typeClasses[type],
    variant === 'title' ? levelClasses.title[level] : levelClasses.text[level],
    className,
    extraClasses
  );

  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setIsEditing(false);
  };
  const [isEditing, setIsEditing] = useState(false);

  if (editable) {
    return isEditing ? (
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className="border-b outline-none bg-transparent text-inherit w-full h-full"
      />
    ) : (
      // @ts-ignore
      <Component
        className={clsx(classes, 'cursor-pointer flex items-center gap-2')}
        onClick={() => setIsEditing(true)}
      >
        {text}
        <Edit className="ml-2 h-4 w-4" />
        {copyable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="ml-2 cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
      </Component>
    );
  }

  return (
    // @ts-ignore
    <Component
      className={clsx(classes, 'flex items-center gap-2')}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
      {copyable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="ml-2 cursor-pointer"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      )}
    </Component>
  );
}
