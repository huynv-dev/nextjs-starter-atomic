'use client';
import Link from 'next/link';
import { Globe, Menu, User, X, Search, MapPin, CalendarDays, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Image } from '@/components/atoms/Image';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Logo } from '@/components/atoms/Logo';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : 'border-b'}`}>
      <div className="container mx-auto px-4">
        {/* Top Bar - Only show when not scrolled */}
        <div className={`flex items-center justify-between h-20 transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : ''}`}>
          {/* Logo */}
          <Logo className="flex-shrink-0" />

          {/* Navigation - Desktop */}
          <nav className={`hidden lg:flex items-center space-x-10 text-sm font-medium transition-all duration-300 ${isScrolled ? 'opacity-0 invisible h-0' : ''}`}>
            <Link 
              href="/places" 
              className="flex items-center space-x-1 border-b-2 border-black py-2 hover:text-airbnb transition-colors"
            >
              <Image
                src="/images/places.png"
                alt="Places"
                width={36}
                height={36}
              />
              <span>Nơi lưu trú</span>
            </Link>
            <Link 
              href="/experiences" 
              className="flex items-center space-x-1 hover:text-airbnb transition-colors"
            >
              <Image
                src="/images/experiences.png"
                alt="Experiences"
                width={36}
                height={36}
              />
              <span>Trải nghiệm</span>
            </Link>
            <Link 
              href="/online-experiences" 
              className="flex items-center space-x-1 hover:text-airbnb transition-colors"
            >
              <Image
                src="/images/online-exp.png"
                alt="Online Experiences"
                width={36}
                height={36}
              />
              <span>Dịch vụ</span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden lg:block hover:bg-gray-100 px-4 py-2 rounded-full transition">
              Trở thành host
            </button>
            <button className="hidden lg:flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition">
              <Globe size={18} />
            </button>
            <button 
              className="flex items-center space-x-2 border rounded-full p-1 hover:shadow-md transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={18} className="ml-2" />
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className={`py-4 transition-all duration-300 ${isScrolled ? 'py-2' : ''}`}>
          {/* Collapsed Search Bar */}
          <div className={`flex justify-center ${isScrolled ? 'block' : 'hidden'}`}>
            <button className="flex items-center space-x-4 border rounded-full py-3 px-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 border-r pr-4">
                <Search size={16} />
                <span className="text-sm font-medium">Địa điểm bất kỳ</span>
              </div>
              <div className="flex items-center space-x-3 border-r pr-4">
                <CalendarDays size={16} />
                <span className="text-sm font-medium">Thời gian bất kỳ</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users size={16} />
                <span className="text-sm font-medium">Thêm khách</span>
              </div>
              <div className="bg-airbnb text-white p-2 rounded-full">
                <Search size={16} />
              </div>
            </button>
          </div>

          {/* Expanded Search Bar - Only show when not scrolled */}
          <div className={`transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
            <SearchBar />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white h-full w-64 p-6 transform transition-transform duration-300">
              <div className="flex justify-between items-center mb-8">
                <Logo size="sm" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="space-y-6">
                <Link 
                  href="/places" 
                  className="flex items-center space-x-3 hover:text-airbnb transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/images/places.png"
                    alt="Places"
                    width={20}
                    height={20}
                  />
                  <span>Nơi lưu trú</span>
                </Link>
                <Link 
                  href="/experiences" 
                  className="flex items-center space-x-3 hover:text-airbnb transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/images/experiences.png"
                    alt="Experiences"
                    width={20}
                    height={20}
                  />
                  <span>Trải nghiệm</span>
                </Link>
                <Link 
                  href="/online-experiences" 
                  className="flex items-center space-x-3 hover:text-airbnb transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/images/online-exp.png"
                    alt="Online Experiences"
                    width={20}
                    height={20}
                  />
                  <span>Dịch vụ</span>
                </Link>
                <hr />
                <button className="w-full text-left hover:text-airbnb transition-colors">
                  Trở thành host
                </button>
                <button className="w-full text-left hover:text-airbnb transition-colors">
                  Trợ giúp
                </button>
                <button className="w-full text-left hover:text-airbnb transition-colors">
                  Đăng ký
                </button>
                <button className="w-full text-left hover:text-airbnb transition-colors">
                  Đăng nhập
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 