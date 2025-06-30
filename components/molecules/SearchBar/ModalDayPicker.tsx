'use client'
import { useEffect } from "react";
import { DayView } from "./DayView";
import { Modal } from "@/components/organisms/Modal/Modal";

interface ModalDayPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  minSelectableDate?: Date;
  selectedDate?: Date | null;
  localCheckIn?: Date | null;
  localCheckOut?: Date | null;
  modalRef?: React.RefObject<any>;
  monthOffset?: number;
  setMonthOffset: (offset: number) => void;
  isCheckingIn?: boolean;
  setDayPlus?: (days: number) => void;
}

export const ModalDayPicker = ({
  isOpen,
  onClose,
  onSelect,
  selectedDate,
  minSelectableDate,
  localCheckIn,
  localCheckOut,
  modalRef,
  monthOffset = 0,
  setMonthOffset,
  isCheckingIn,
  setDayPlus
}: ModalDayPickerProps) => {

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      width={870}
      title={isCheckingIn ? "Chọn ngày bắt đầu" : "Chọn ngày kết thúc"}
      closePosition="left"
      className="max-h-300px overflow-y-auto overflow-x-hidden rounded-xl"
      showFooter={false}
      ref={modalRef}
    >
      <DayView
        selectedCheckIn={localCheckIn}
        selectedCheckOut={localCheckOut}
        selectedDate={selectedDate}
        monthOffset={monthOffset}
        setMonthOffset={setMonthOffset}
        onDateClick={(date) => {
          onSelect(date);
        }}
        isModal
        minSelectableDate={minSelectableDate}
        onCloseModal={onClose}
        onQuickSelect={setDayPlus}
      />
    </Modal >
  )


};