'use client';
import { useState } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { ParagraphModal } from './ParagraphModal';
import Modal from '@/components/organisms/Modal/Modal';

interface ExpandableParagraphProps {
  title: string;
  content: React.ReactNode;
  modalContent?: React.ReactNode;
  buttonLabel?: string;
}

export function ExpandableParagraph({
  title,
  content,
  modalContent,
  buttonLabel = 'Hiển thị thêm',
}: ExpandableParagraphProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Typography level={3} className="font-semibold mt-4">
        {title}
      </Typography>
      <Typography className="!text-base mt-3" variant="paragraph">
        {content}
      </Typography>
      {/* {modalContent && ( */}
      <>
        <Button
          type="secondary"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="bg-gray-100 rounded-xl text-sm font-semibold mt-2 hover:bg-gray-200"
        >
          {buttonLabel}
        </Button>
        <ParagraphModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {modalContent}
        </ParagraphModal>
      </>
      {/* )} */}
    </div>
  );
}
