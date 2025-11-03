import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FilterOption {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
  displayValue: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  activeFilters?: ActiveFilter[];
  onFilterChange?: (key: string, value: string) => void;
  onFilterRemove?: (key: string) => void;
  onClearAll?: () => void;
  children?: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  activeFilters = [],
  onFilterChange,
  onFilterRemove,
  onClearAll,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg border border-stone p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-concrete w-4 h-4" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 bg-stone border-0 focus:ring-2 focus:ring-slate"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          {filters.map(filter => (
            <div key={filter.key} className="min-w-[150px]">
              {filter.type === "select" && filter.options && (
                <select
                  className="w-full bg-stone border-0 rounded-md px-3 py-2 text-slate text-sm focus:outline-none focus:ring-2 focus:ring-slate"
                  onChange={e => onFilterChange?.(filter.key, e.target.value)}
                >
                  <option value="">
                    {filter.placeholder || `All ${filter.label}`}
                  </option>
                  {filter.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {filter.type === "date" && (
                <input
                  type="date"
                  className="w-full bg-stone border-0 rounded-md px-3 py-2 text-slate text-sm focus:outline-none focus:ring-2 focus:ring-slate"
                  onChange={e => onFilterChange?.(filter.key, e.target.value)}
                />
              )}

              {filter.type === "text" && (
                <Input
                  type="text"
                  placeholder={filter.placeholder || filter.label}
                  className="bg-stone border-0 focus:ring-2 focus:ring-slate"
                  onChange={e => onFilterChange?.(filter.key, e.target.value)}
                />
              )}
            </div>
          ))}

          {children}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-stone">
          <span className="text-xs text-concrete font-medium">
            Active filters:
          </span>
          <div className="flex items-center space-x-2 flex-wrap">
            {activeFilters.map(filter => (
              <span
                key={filter.key}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-slate bg-opacity-10 text-slate"
              >
                <span className="font-medium">{filter.label}:</span>
                <span className="ml-1">{filter.displayValue}</span>
                <button
                  onClick={() => onFilterRemove?.(filter.key)}
                  className="ml-2 hover:text-danger transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {activeFilters.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-xs text-concrete hover:text-slate"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
