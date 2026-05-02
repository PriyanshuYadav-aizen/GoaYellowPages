import { cn } from "../lib/utils";

const CATEGORIES = [
  { emoji: "🍽", label: "Restaurants", value: "Restaurant" },
  { emoji: "🏨", label: "Hotels", value: "Hotel" },
  { emoji: "☕", label: "Cafes", value: "Cafe" },
  { emoji: "🍹", label: "Bars", value: "Bar" },
  { emoji: "🏖", label: "Resorts", value: "Resort" },
  { emoji: "🗺", label: "Tours", value: "Tour" },
  { emoji: "🛍", label: "Shops", value: "Shop" },
  { emoji: "🏢", label: "Other", value: "Other" },
];

interface CategoryStripProps {
  selected: string;
  onCategorySelect: (category: string) => void;
}

const CategoryStrip = ({ selected, onCategorySelect }: CategoryStripProps) => (
  <div className="border-b border-neutral-100 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto py-4">
        <button
          onClick={() => onCategorySelect("")}
          className={cn(
            "flex flex-shrink-0 flex-col items-center gap-1.5 rounded-xl border px-5 py-3 transition-all",
            selected === ""
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50"
          )}
        >
          <span className="text-2xl">✨</span>
          <span className="whitespace-nowrap text-xs font-semibold">All</span>
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategorySelect(cat.value)}
            className={cn(
              "flex flex-shrink-0 flex-col items-center gap-1.5 rounded-xl border px-5 py-3 transition-all",
              selected === cat.value
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50"
            )}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span className="whitespace-nowrap text-xs font-semibold">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default CategoryStrip;
