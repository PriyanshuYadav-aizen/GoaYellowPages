import { useState } from "react";

interface HeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCategorySelect: (value: string) => void;
}

const categories = [
  { emoji: "🍽", label: "Restaurants", value: "Restaurant" },
  { emoji: "🏨", label: "Hotels", value: "Hotel" },
  { emoji: "☕", label: "Cafes", value: "Cafe" },
  { emoji: "🍹", label: "Bars", value: "Bar" },
  { emoji: "🏖", label: "Resorts", value: "Resort" },
  { emoji: "🗺", label: "Tours", value: "Tour" },
];

const HeroSection = ({ search, onSearchChange, onCategorySelect }: HeroSectionProps) => {
  const [localSearch, setLocalSearch] = useState(search);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearchChange(localSearch);
  };

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-primary-50 via-amber-50 to-secondary-50">
      <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            <span>🌴</span>
            <span>Goa's #1 Business Directory</span>
          </div>

          <h1 className="mb-6 font-display text-5xl font-extrabold leading-tight text-neutral-900 md:text-6xl lg:text-7xl">
            Discover the Best
            <br />
            <span className="text-primary-500">Businesses</span> in Goa
          </h1>

          <p className="mb-10 max-w-2xl text-xl leading-relaxed text-neutral-600">
            From beachside shacks to luxury resorts, find authentic ratings, real reviews, and trusted contact details for every business in paradise.
          </p>

          <form
            onSubmit={submitSearch}
            className="flex max-w-2xl flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 px-4">
              <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.1-5.15a6.25 6.25 0 11-12.5 0 6.25 6.25 0 0112.5 0z" />
              </svg>
              <input
                value={localSearch}
                onChange={(event) => {
                  setLocalSearch(event.target.value);
                  onSearchChange(event.target.value);
                }}
                placeholder="Search restaurants, hotels, cafes..."
                className="min-h-[44px] flex-1 bg-transparent text-base text-neutral-800 outline-none placeholder:text-neutral-400"
              />
            </div>
            <select
              onChange={(event) => onCategorySelect(event.target.value)}
              className="hidden border-l border-neutral-200 bg-transparent px-4 py-2 text-sm text-neutral-600 outline-none sm:block"
              defaultValue=""
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <button className="whitespace-nowrap rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white shadow-button transition-all hover:bg-primary-600">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategorySelect(category.value)}
                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-8">
          {[
            ["500+", "Businesses Listed"],
            ["4.5★", "Average Rating"],
            ["10K+", "Monthly Visitors"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-neutral-900">{num}</div>
              <div className="text-sm text-neutral-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
