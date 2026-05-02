import React from "react";
import { cn } from "../lib/utils";

const CATEGORIES = ["Restaurant", "Hotel", "Shop", "Cafe", "Bar", "Resort", "Tour", "Other"];

const EXPENSES = [
  { label: "Budget", value: "cheap" },
  { label: "Mid", value: "moderate" },
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
  resultsCount?: number;
}

const BusinessFilterSidebar: React.FC<Props> = ({ filter, onChange, isVisible = true, resultsCount = 0 }) => {
  const setValue = (name: keyof BusinessFilter, value: string) => {
    onChange({ ...filter, [name]: value });
  };

  if (!isVisible) return null;

  return (
    <aside className="sticky top-24 w-full rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-neutral-900">Filter Results</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Showing <strong className="text-neutral-800">{resultsCount}</strong> businesses
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700" htmlFor="search">
            Search
          </label>
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.1-5.15a6.25 6.25 0 11-12.5 0 6.25 6.25 0 0112.5 0z" />
            </svg>
            <input
              id="search"
              value={filter.search}
              onChange={(event) => setValue("search", event.target.value)}
              placeholder="Name or location..."
              className="w-full rounded-xl border border-neutral-200 px-10 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-neutral-700">Category</p>
          <div className="flex flex-wrap gap-2">
            <Pill selected={filter.category === ""} onClick={() => setValue("category", "")}>
              All
            </Pill>
            {CATEGORIES.map((category) => (
              <Pill key={category} selected={filter.category === category} onClick={() => setValue("category", category)}>
                {category}
              </Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-neutral-700">Price tier</p>
          <div className="flex flex-wrap gap-2">
            <Pill selected={filter.expense === ""} onClick={() => setValue("expense", "")}>
              All
            </Pill>
            {EXPENSES.map((expense) => (
              <Pill key={expense.value} selected={filter.expense === expense.value} onClick={() => setValue("expense", expense.value)}>
                {expense.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onChange({ search: "", category: "", expense: "" })}
        className="mt-6 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
      >
        Clear filters
      </button>
    </aside>
  );
};

const Pill = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
      selected
        ? "border-primary-500 bg-primary-50 text-primary-700"
        : "border-neutral-200 text-neutral-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
    )}
  >
    {children}
  </button>
);

export default BusinessFilterSidebar;
