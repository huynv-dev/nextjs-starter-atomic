'use client'
import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { CalendarDropdown, DateRangeInput } from './CalendarDropdown';
import { LocationDropdown, LocationInput } from './LocationDropdown';
import { GuestDropdown, GuestInput } from './GuestDropdown';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useHover } from '@/hooks/useHover';
import { getGuestLabel } from '@/utils/getGuestLabel';

interface SearchBarProps {
  onSearch?: () => void;
  expandSearch?: boolean;
  focusedInput?: any;
  onRequestClose?: () => void;
}

export const SearchBar = ({ onSearch, expandSearch, focusedInput }: SearchBarProps) => {
  const [checkInHover, setCheckInHover] = useState(false);
  const [checkOutHover, setCheckOutHover] = useState(false);
  const [guestHover, setGuestHover] = useState(false);
  const [locationHover, setLocationHover] = useState(false);


  // Dropdown states
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [calendarDropdownOpen, setCalendarDropdownOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [activeInput, setActiveInput] = useState<"location" | "checkIn" | "checkout" | "guest" | null>(null);
  const [locationValue, setLocationValue] = useState('');
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'flexible'>('day');
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedMonths, setSelectedMonths] = useState<{ month: number; year: number }[]>([]);
  const [isFlexible, setIsFlexible] = useState(false);

  const handleResetDate = () => {
    setSelectedCheckIn(null);
    setSelectedCheckOut(null);
  }
  const handleResetLocation = () => {
    setLocationValue('');
  };

  useEffect(() => {
    if ((viewMode == 'month' || viewMode == 'flexible') && activeInput !== 'guest') {
      setIsFlexible(true);
    } else {
      setIsFlexible(false);
    }
  }, [viewMode, activeInput])

  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });




  useClickOutside(
    [searchBarRef],
    () => {
      setLocationDropdownOpen(false);
      setCalendarDropdownOpen(false);
      setGuestDropdownOpen(false);
      setActiveInput(null);
    },
  );

  useEffect(() => {
    if (!expandSearch || !focusedInput) return;

    if (focusedInput === 'location') {
      setLocationDropdownOpen(true);
      setActiveInput('location');
    } else if (focusedInput === 'checkIn') {
      setCalendarDropdownOpen(true);
      setActiveInput('checkIn');
    } else if (focusedInput === 'checkout') {
      setCalendarDropdownOpen(true);
      setActiveInput('checkout');
    } else if (focusedInput === 'guest') {
      setGuestDropdownOpen(true);
      setActiveInput('guest');
    }
  }, [expandSearch, focusedInput]);


  useEffect(() => {
    console.log('calendarDropdownOpen:', calendarDropdownOpen);
    console.log('isDayModalOpen:', isDayModalOpen);

  }, [calendarDropdownOpen, isDayModalOpen])


  const handleLocationClick = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
    setCalendarDropdownOpen(false);
    setGuestDropdownOpen(false);
    setActiveInput("location");
  };

  const handleDateClick = (type: 'checkIn' | 'checkout') => {
    setCalendarDropdownOpen(true);
    setLocationDropdownOpen(false);
    setGuestDropdownOpen(false);
    setActiveInput(type);
  };

  const handleGuestClick = () => {
    setGuestDropdownOpen(!guestDropdownOpen);
    setLocationDropdownOpen(false);
    setCalendarDropdownOpen(false);
    setActiveInput("guest");
  };

  const handleResetGuest = () => {
    setGuestCounts({
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    });
  };

  return (
    <div className="relative w-full md:w-[60%] mx-auto" ref={searchBarRef}>
      <div className="flex items-center justify-between border rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.1)] hover:shadow-[0_3px_10px_rgb(0,0,0,0.15)] transition-all bg-white max-w-[850px] mx-auto divide-x-0">
        <LocationInput
          handleReset={handleResetLocation}
          isActive={activeInput}
          isFlex={isFlexible}
          showRightBorder={checkInHover
            || (checkOutHover && activeInput == 'location' && viewMode == 'month')
            || (checkOutHover && activeInput == 'guest' && viewMode == 'month')
          }
          onClick={handleLocationClick}
          value={locationValue}
          onChange={setLocationValue}
          onChangeHover={setLocationHover}
        >
          <LocationDropdown
            isOpen={locationDropdownOpen}
            onClose={() => setLocationDropdownOpen(false)}
            onSelect={(value) => {
              setLocationValue(value);
              setLocationDropdownOpen(false);
            }}
          />
        </LocationInput>

        <DateRangeInput
          handleReset={handleResetDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCheckIn={selectedCheckIn}
          selectedCheckOut={selectedCheckOut}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          isActive={activeInput}
          onHoverChange={(hover) => {
            setCheckInHover(hover === "checkIn");
            setCheckOutHover(hover === "checkout");
          }}
          showCheckOutBorder={checkOutHover}
          showGuestBorder={guestHover}
          locationHover={locationHover}
          onCheckInClick={() => handleDateClick("checkIn")}
          onCheckOutClick={() => handleDateClick("checkout")}
          selectedDuration={selectedDuration}
          selectedMonths={selectedMonths}
        >
          <CalendarDropdown
            selectedMonths={selectedMonths}
            selectedDuration={selectedDuration}
            setSelectDuration={setSelectedDuration}
            setSelectedMonths={setSelectedMonths}
            setSelectedCheckIn={setSelectedCheckIn}
            setSelectedCheckOut={setSelectedCheckOut}
            setIsDayModalOpen={setIsDayModalOpen}
            modalRef={modalRef}
            isOpen={isDayModalOpen ? true : calendarDropdownOpen}
            onClose={() => {
              setCalendarDropdownOpen(false);
            }}
            setSelectedStart={setSelectedStart}
            setSelectedEnd={setSelectedEnd}
            selectedEnd={selectedEnd}
            selectedStart={selectedStart}
          />
        </DateRangeInput>

        <GuestInput
          isActive={activeInput}
          onSearch={onSearch}
          onMouseEnter={() => setGuestHover(true)}
          onMouseLeave={() => setGuestHover(false)}
          onClick={handleGuestClick}
          label={getGuestLabel(guestCounts)}
          handleReset={handleResetGuest}
          isHover={guestHover}
          checkOutHover={checkOutHover}
        >
          <GuestDropdown
            isOpen={guestDropdownOpen}
            onClose={() => setGuestDropdownOpen(false)}
            guestCounts={guestCounts}
            onChangeGuestCounts={(newCounts) => setGuestCounts(newCounts)}
          />
        </GuestInput>

      </div>
    </div >
  );
};