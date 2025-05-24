import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: () => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="flex items-center justify-between border rounded-full shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Location */}
      <button className="flex-1 px-6 py-4 text-left border-r">
        <div className="text-sm font-semibold">Địa điểm</div>
        <input 
          type="text"
          placeholder="Tìm kiếm điểm đến"
          className="w-full text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none"
        />
      </button>

      {/* Check-in */}
      <button className="flex-1 px-6 py-4 text-left border-r">
        <div className="text-sm font-semibold">Nhận phòng</div>
        <div className="text-sm text-gray-600">Thêm ngày</div>
      </button>

      {/* Check-out */}
      <button className="flex-1 px-6 py-4 text-left border-r">
        <div className="text-sm font-semibold">Trả phòng</div>
        <div className="text-sm text-gray-600">Thêm ngày</div>
      </button>

      {/* Guests */}
      <button className="flex-1 px-6 py-4 text-left">
        <div className="text-sm font-semibold">Khách</div>
        <div className="text-sm text-gray-600">Thêm khách</div>
      </button>

      {/* Search Button */}
      <button 
        onClick={onSearch}
        className="p-4 ml-2 mr-2 text-white bg-primary rounded-full hover:bg-primary/90 transition"
      >
        <Search size={20} />
      </button>
    </div>
  );
}; 