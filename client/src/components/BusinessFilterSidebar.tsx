import React from "react";
import { cn } from "../lib/utils";

const CATEGORIES = [
  "Restaurant",
  "Hotel",
  "Shop",
  "Cafe",
  "Bar",
  "Resort",
  "Tour",
  "Other",
];

const EXPENSES = [
  { label: "Budget", value: "cheap" },
  { label: "Mid-Range", value: "moderate" },
  { label: "Premium", value: "expensive" },
];

export interface BusinessFilter {
  search: string;
  category: string;
  expense: string;
}

interface Props {
  filter: BusinessFilter;
  onChange: (filter: BusinessFilter) => void;
  isVisible?: boolean;
}

const BusinessFilterSidebar: React.FC<Props> = ({ filter, onChange, isVisible = true }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ ...filter, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    onChange({ search: "", category: "", expense: "" });
  };

  if (!isVisible) return null;

  return (
    <aside
      className={cn(
        "w-full md:w-[20rem] xl:w-[24rem] mb-8 md:mb-0 sticky top-8 transition-all duration-300",
        "bg-gray-50 rounded-[24px] p-6",
        "shadow-[inset_6px_6px_12px_rgba(163,163,163,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]",
        "border border-gray-200/50"
      )}
      style={{ minWidth: "0" }}
    >
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Filters
        </h2>
      </div>
      
      <div className="space-y-8">
        {/* Search */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-4 text-lg"
            htmlFor="search"
          >
            Search
          </label>
          <input
            id="search"
            name="search"
            type="text"
            value={filter.search}
            onChange={handleInputChange}
            placeholder="Name or location..."
            className={cn(
              "w-full px-5 py-4 rounded-[16px] border-0 text-base",
              "bg-gray-50 shadow-[inset_4px_4px_8px_rgba(163,163,163,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]",
              "focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(163,163,163,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]",
              "placeholder-gray-400 transition-all duration-200"
            )}
          />
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-4 text-lg">
            Category
          </label>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer group py-2">
              <div className={cn(
                "relative w-6 h-6 rounded-full mr-4",
                "bg-gray-50 shadow-[inset_2px_2px_4px_rgba(163,163,163,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]",
                filter.category === "" && "shadow-[inset_4px_4px_8px_rgba(59,130,246,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]"
              )}>
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filter.category === ""}
                  onChange={handleInputChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {filter.category === "" && (
                  <div className="absolute inset-1.5 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-gray-700 text-base font-medium">All Categories</span>
            </label>
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer group py-2">
                <div className={cn(
                  "relative w-6 h-6 rounded-full mr-4",
                  "bg-gray-50 shadow-[inset_2px_2px_4px_rgba(163,163,163,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]",
                  filter.category === cat && "shadow-[inset_4px_4px_8px_rgba(59,130,246,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]"
                )}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filter.category === cat}
                    onChange={handleInputChange}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  {filter.category === cat && (
                    <div className="absolute inset-1.5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-700 text-base font-medium">{cat}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Expense */}
        <div>
          <label className="block text-gray-700 font-semibold mb-4 text-lg">
            Price Range
          </label>
          <div className="space-y-3">
            {EXPENSES.map((exp) => (
              <label key={exp.value} className="flex items-center cursor-pointer group py-2">
                <div className={cn(
                  "relative w-6 h-6 rounded-full mr-4",
                  "bg-gray-50 shadow-[inset_2px_2px_4px_rgba(163,163,163,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]",
                  filter.expense === exp.value && "shadow-[inset_4px_4px_8px_rgba(59,130,246,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]"
                )}>
                  <input
                    type="radio"
                    name="expense"
                    value={exp.value}
                    checked={filter.expense === exp.value}
                    onChange={handleInputChange}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  {filter.expense === exp.value && (
                    <div className="absolute inset-1.5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-700 text-base font-medium">{exp.label}</span>
              </label>
            ))}
            <label className="flex items-center cursor-pointer group py-2">
              <div className={cn(
                "relative w-6 h-6 rounded-full mr-4",
                "bg-gray-50 shadow-[inset_2px_2px_4px_rgba(163,163,163,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]",
                filter.expense === "" && "shadow-[inset_4px_4px_8px_rgba(59,130,246,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]"
              )}>
                <input
                  type="radio"
                  name="expense"
                  value=""
                  checked={filter.expense === ""}
                  onChange={handleInputChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {filter.expense === "" && (
                  <div className="absolute inset-1.5 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-gray-700 text-base font-medium">All</span>
            </label>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleClear}
        className={cn(
          "w-full mt-8 py-4 px-6 rounded-[16px] font-semibold text-base transition-all duration-200",
          "bg-gray-50 text-gray-700",
          "shadow-[4px_4px_8px_rgba(163,163,163,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]",
          "hover:shadow-[6px_6px_12px_rgba(163,163,163,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]",
          "active:shadow-[inset_4px_4px_8px_rgba(163,163,163,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
        )}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default BusinessFilterSidebar;
