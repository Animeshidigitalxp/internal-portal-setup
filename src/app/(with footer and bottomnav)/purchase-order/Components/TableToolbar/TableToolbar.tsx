'use client';

import { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import styles from './TableToolbar.module.sass';

export type SortOption = {
  label: string;
  value: string;
};



type TableToolbarProps = {
  placeholder?: string;
  onFilterClick?: () => void;
  onSearch?: (value: string) => void;
  onSortChange?: (value: string) => void;
};

export default function TableToolbar({
  onSearch,
  onSortChange,
  onFilterClick,
  placeholder = "Search orders...",
}: TableToolbarProps) {
 
  

 return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <select 
        className={styles.sortSelect} 
        onChange={(e) => onSortChange?.(e.target.value)}
      >
        <option value="latest">Created (Latest First)</option>
        <option value="oldest">Created (Oldest First)</option>
        <option value="status">Status</option>
      </select>

      {/* Filter Button */}
      <button className={styles.filterBtn} onClick={() => onFilterClick?.()}>
        <span>+</span> Filter
      </button>
    </div>
  );
}
