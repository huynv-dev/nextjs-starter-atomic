import type { Meta } from '@storybook/react';
import { IconGallery, IconItem } from '@storybook/blocks';
import * as Icons from './index';
import { useState } from 'react';

const meta: Meta = {
  title: 'Icons',
  tags: ['autodocs'],
};

export default meta;

// Custom radio button component
const FilterRadio = ({ 
  label, 
  value, 
  checked, 
  onChange 
}: { 
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) => (
  <label className="inline-flex items-center cursor-pointer">
    <input 
      type="radio" 
      className="sr-only"
      checked={checked}
      onChange={() => onChange(value)}
    />
    <span className={`
      w-3.5 h-3.5 rounded-full border flex items-center justify-center mr-2
      ${checked ? 'border-blue-500 bg-white' : 'border-slate-300 bg-white'}
    `}>
      {checked && <span className="w-2 h-2 rounded-full bg-blue-500" />}
    </span>
    <span className="text-sm text-slate-700">{label}</span>
  </label>
);

// Story showing all icons with filters
export const AllIcons = () => {
  const [filter, setFilter] = useState('outlined');
  const [searchTerm, setSearchTerm] = useState('');

  const iconComponents = (Object.entries(Icons) as [string, React.ComponentType<Icons.IconProps>][])
    .filter(([name]) => name !== 'IconProps')
    .filter(([name]) => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto p-8 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-slate-900">List of icons</h1>

        {/* Filters and Search */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-6">
            <FilterRadio 
              label="Outlined" 
              value="outlined" 
              checked={filter === 'outlined'} 
              onChange={setFilter} 
            />
            <FilterRadio 
              label="Filled" 
              value="filled" 
              checked={filter === 'filled'} 
              onChange={setFilter} 
            />
            <FilterRadio 
              label="Two Tone" 
              value="twoTone" 
              checked={filter === 'twoTone'} 
              onChange={setFilter} 
            />
          </div>
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search icons here, click icon"
              className="w-full h-8 pl-3 pr-8 border border-slate-200 rounded text-sm text-slate-700 placeholder-slate-400
                focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Icons.Search size={14} />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-base font-medium text-slate-900">Directional Icons</h2>

        {/* Icons Gallery */}
        <IconGallery>
          {iconComponents.map(([name, Icon]) => (
            <IconItem key={name} name={name}>
              <Icon size={24} className="text-slate-700" />
            </IconItem>
          ))}
        </IconGallery>
      </div>
    </div>
  );
};

// Individual icon stories
export const HeartIcon = () => (
  <div className="p-4 space-y-8">
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <Icons.Heart size={24} className="text-slate-500" />
        <span className="text-sm text-slate-600">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icons.Heart size={24} className="text-rose-500" />
        <span className="text-sm text-slate-600">Active</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icons.Heart size={24} className="text-slate-300" />
        <span className="text-sm text-slate-600">Disabled</span>
      </div>
    </div>
  </div>
); 