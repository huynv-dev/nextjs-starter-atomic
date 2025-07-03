import { ColumnType } from "@/types/table";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const FilterDropdown: React.FC<{
  column: ColumnType;
  filteredValue: any[];
  onFilter: (values: any[]) => void;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}> = ({ column, filteredValue, onFilter, visible, onVisibleChange }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState<any[]>(filteredValue || []);

  const filteredOptions = useMemo(() => {
    if (!column.filters || !column.filterSearch) return column.filters || [];
    return (column.filters || []).filter(item =>
      item.text.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [column.filters, searchText, column.filterSearch]);

  const handleConfirm = () => {
    onFilter(selectedValues);
    onVisibleChange(false);
  };

  const handleReset = () => {
    setSelectedValues([]);
    onFilter([]);
    onVisibleChange(false);
  };
  useEffect(() => {
    if (visible) {
      setSearchText('');
      setSelectedValues(filteredValue || []);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-3 min-w-48 z-100">
      {column.filterSearch && (
        <div className="mb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in filters"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded text-sm"
            />
          </div>
        </div>
      )}
      <div className="max-h-48 overflow-y-auto">
        {filteredOptions.map((filter, index) => (
          <label key={index} className="flex items-center py-1 cursor-pointer hover:bg-gray-50">
            <input
              type={column.filterMultiple !== false ? 'checkbox' : 'radio'}
              checked={selectedValues.includes(filter.value)}
              onChange={(e) => {
                if (column.filterMultiple !== false) {
                  if (e.target.checked) {
                    setSelectedValues([...selectedValues, filter.value]);
                  } else {
                    setSelectedValues(selectedValues.filter(v => v !== filter.value));
                  }
                } else {
                  setSelectedValues(e.target.checked ? [filter.value] : []);
                }
              }}
              className="mr-2"
            />
            <span className="text-sm">{filter.text}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-3 pt-2 border-t">
        <button
          onClick={handleReset}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
        <button
          onClick={handleConfirm}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};
