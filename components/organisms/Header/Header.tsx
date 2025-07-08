'use client';
import Link from 'next/link';
import { Globe, Menu, User, X, Search, CalendarDays, Users } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Image } from '@/components/atoms/Image';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Logo } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button/Button';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLayout } from '@/context/LayoutContext';


export const Header = () => {
  const { disableScrollLogic } = useLayout();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"location" | "checkIn" | "checkout" | "guest" | null>(null);

  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const collapsedSearchRef = useRef<HTMLDivElement>(null);

  // Fix useClickOutside to exclude collapsed search clicks
  useClickOutside([searchRef], () => {
    setExpandSearch(false);
    setFocusedInput(null);
  });

  useEffect(() => {
    // Chỉ thêm scroll listener nếu không disable scroll logic
    if (!disableScrollLogic) {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [disableScrollLogic]);

  const handleExpandSearch = (inputType: "location" | "checkIn" | "checkout" | "guest", event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setExpandSearch(true);
    setFocusedInput(inputType);
  };

  // Quyết định class cho header dựa trên props
  const headerClasses = disableScrollLogic
    ? "max-md:hidden top-0 left-0 right-0 z-50 border-b shadow-md pt-2"
    : "max-md:hidden fixed top-0 left-0 right-0 z-50 border-b shadow-sm pt-2";

  // Quyết định logic hiển thị dựa trên props
  const shouldShowScrolledState = (!disableScrollLogic && isScrolled) || disableScrollLogic;
  const shouldShowNormalState = !disableScrollLogic && !isScrolled && !expandSearch;

  return (
    <header className={headerClasses} style={{ background: "linear-gradient(180deg, #ffffff 39.9%, #f8f8f8 100%)" }}>
      <div className={`container-fluid mx-auto px-12 flex flex-col justify-around`}>
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          <Logo className="flex-shrink-0 hidden md:block" />

          {/* Navigation */}
          <div className="flex-1 flex justify-center">
            <nav
              className={`
                w-full flex items-center justify-center 
                space-x-4 md:space-x-6 lg:space-x-10 
                text-sm font-medium
                min-h-[80px] lg:min-h-[104px] 
                 
                ${expandSearch ? expandSearch : shouldShowScrolledState ? 'opacity-0 invisible' : ''}
              `}
            >
              <Link
                href="/places"
                className="flex flex-col md:flex-row items-center space-x-1 md:space-x-2 border-b-4 border-black py-2 hover:text-airbnb transition-colors px-2"
              >
                <Image
                  src="/images/places.png"
                  alt="Places"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <span className="text-xs md:text-sm">Nơi lưu trú</span>
              </Link>

              <Link
                href="/experiences"
                className="flex flex-col md:flex-row items-center space-x-1 md:space-x-2 hover:text-airbnb transition-colors px-2"
              >
                <Image
                  src="/images/experiences.png"
                  alt="Experiences"
                  width={24}
                  height={24}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <span className="text-xs md:text-sm">Trải nghiệm</span>
              </Link>

              <Link
                href="/online-experiences"
                className="flex flex-col md:flex-row items-center space-x-1 md:space-x-2 hover:text-airbnb transition-colors px-2"
              >
                <Image
                  src="/images/online-exp.png"
                  alt="Online Experiences"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <span className="text-xs md:text-sm">Dịch vụ</span>
              </Link>
            </nav>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Button size="sm" type="ghost" className="hover:bg-gray-100 px-4 py-2 rounded-full text-base hidden lg:inline-flex">
              Trở thành host
            </Button>
            <Button size="sm" type="secondary" className="rounded-full bg-[#F2F2F2] hover:bg-[#EBEBEB] h-10 w-10 pl-[10px]">
              <Globe size={18} />
            </Button>
            <Button
              size="sm"
              type="secondary"
              className="rounded-full bg-[#F2F2F2] hover:bg-[#EBEBEB] h-10 w-10 pl-[10px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={18} />
            </Button>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className={`relative z-50 ${shouldShowScrolledState ? '' : 'pt-5 pb-10'}  ${!expandSearch ? '' : 'pt-3 pb-8'}`} ref={headerRef}>
          {/* Expanded Search Bar - Show when expandSearch is true */}
          {expandSearch && (
            <div
              ref={searchRef}
              className="w-full transition-all duration-300 opacity-100 visible scale-100"
            >
              <SearchBar
                expandSearch={expandSearch}
                focusedInput={focusedInput}
                onRequestClose={() => {
                  setExpandSearch(false);
                  setFocusedInput(null);
                }}
              />
            </div>
          )}

          {/* Normal Search Bar - Show when not scrolled and not expanded, hoặc khi disable scroll logic */}
          {shouldShowNormalState && (
            <div className="w-full transition-all duration-300 opacity-100 visible scale-100">
              <SearchBar
                expandSearch={false}
                focusedInput={null}
                onRequestClose={() => { }}
              />
            </div>
          )}

          {/* Collapsed Search Bar - Show when scrolled and not expanded, hoặc khi disable scroll logic */}
          {((disableScrollLogic) || (!disableScrollLogic && isScrolled)) && !expandSearch && (
            <div className={`md:w-[80%] md:mx-auto absolute top-[50%] translate-y-[-125%] left-0 right-0 flex justify-center transition-all duration-500 ${shouldShowScrolledState ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
              <div
                ref={collapsedSearchRef}
                className="flex items-center space-x-4 border rounded-full max-h-16 py-2 px-6 shadow-md hover:shadow-lg transition-shadow bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div
                  className="flex items-center space-x-3 border-r pr-4 cursor-pointer  rounded-lg px-2 py-1 transition-colors"
                  onClick={(e) => handleExpandSearch('location', e)}
                >
                  <Search size={16} />
                  <span className="text-sm font-medium flex-1 hidden md:block">Địa điểm bất kỳ</span>
                </div>
                <div
                  className="flex items-center space-x-3 border-r pr-4 cursor-pointer  rounded-lg px-2 py-1 transition-colors"
                  onClick={(e) => handleExpandSearch('checkIn', e)}
                >
                  <CalendarDays size={16} />
                  <span className="text-sm font-medium flex-1 hidden md:block">Thời gian bất kỳ</span>
                </div>
                <div
                  className="flex items-center justify-between space-x-3 cursor-pointer  rounded-lg px-2 py-1 transition-colors"
                  onClick={(e) => handleExpandSearch('guest', e)}
                >
                  <Users size={16} />
                  <span className="text-sm font-medium flex-1 hidden md:block">Thêm khách</span>
                  <Button
                    size="md"
                    className="text-white rounded-full transition-colors flex-shrink-0 text-nowrap w-8 h-8 ml-2"
                    icon={<Search size={15} />}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle search action here - chỉ cho phép expand search khi không disable scroll logic
                      if (!disableScrollLogic) {
                        // Handle search action here
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white h-full w-64 p-6">
              <div className="flex justify-between items-center mb-8">
                <Logo size="sm" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-6">
                <Link href="/places" className="flex items-center space-x-3 hover:text-airbnb" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/images/places.png" alt="Places" width={20} height={20} />
                  <span>Nơi lưu trú</span>
                </Link>
                <Link href="/experiences" className="flex items-center space-x-3 hover:text-airbnb" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/images/experiences.png" alt="Experiences" width={20} height={20} />
                  <span>Trải nghiệm</span>
                </Link>
                <Link href="/online-experiences" className="flex items-center space-x-3 hover:text-airbnb" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/images/online-exp.png" alt="Online Experiences" width={20} height={20} />
                  <span>Dịch vụ</span>
                </Link>
                <hr />
                <button className="w-full text-left lg:hidden hover:text-airbnb">Trở thành host</button>
                <button className="w-full text-left lg:hidden hover:text-airbnb">Trợ giúp</button>
                <button className="w-full text-left hover:text-airbnb">Đăng ký</button>
                <button className="w-full text-left hover:text-airbnb">Đăng nhập</button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};