import { Business } from "../types";
import BusinessCard from "./BusinessCard";
import { cn } from "../lib/utils";

interface PaginatedBusinesses {
  businesses: Business[];
  totalPages: number;
  currentPage: number;
  totalBusinesses: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface BusinessGridProps {
  data: PaginatedBusinesses;
  hideContactCTA?: boolean;
  isFilterVisible?: boolean;
  onPageChange: (page: number) => void;
}

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-card">
    <div className="h-48 bg-neutral-200" />
    <div className="space-y-4 p-5">
      <div className="h-5 w-3/4 rounded bg-neutral-200" />
      <div className="h-4 w-1/2 rounded bg-neutral-200" />
      <div className="h-4 w-2/3 rounded bg-neutral-200" />
      <div className="flex gap-2 pt-3">
        <div className="h-10 flex-1 rounded-xl bg-neutral-200" />
        <div className="h-10 flex-1 rounded-xl bg-neutral-200" />
      </div>
    </div>
  </div>
);

export const BusinessGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }, (_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

const BusinessGrid = ({
  data,
  hideContactCTA = false,
  isFilterVisible = true,
  onPageChange,
}: BusinessGridProps) => {
  const { businesses, totalPages, currentPage, totalBusinesses, hasNextPage, hasPrevPage } = data;
  const pageSize = isFilterVisible ? 9 : 12;

  if (businesses.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-12 shadow-card">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-4xl">
            🔍
          </div>
          <h3 className="mb-3 font-display text-2xl font-bold text-neutral-900">No businesses found</h3>
          <p className="text-neutral-600">Try adjusting your search or filters.</p>
        </div>
      </div>
    );
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => totalPages <= 7 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  return (
    <div className="space-y-8">
      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2",
          isFilterVisible ? "lg:grid-cols-3" : "lg:grid-cols-4"
        )}
      >
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} hideContactCTA={hideContactCTA} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className="rounded-xl border border-neutral-200 p-2 text-neutral-600 transition-all hover:border-primary-300 disabled:opacity-40"
            aria-label="Previous page"
          >
            ←
          </button>
          {pages.map((page, index) => {
            const previous = pages[index - 1];
            return (
              <span key={page} className="flex items-center gap-2">
                {previous && page - previous > 1 && <span className="text-neutral-400">...</span>}
                <button
                  onClick={() => onPageChange(page)}
                  className={cn(
                    "h-10 w-10 rounded-xl text-sm font-semibold transition-all",
                    page === currentPage
                      ? "bg-primary-500 text-white"
                      : "border border-neutral-200 text-neutral-600 hover:border-primary-300"
                  )}
                >
                  {page}
                </button>
              </span>
            );
          })}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="rounded-xl border border-neutral-200 p-2 text-neutral-600 transition-all hover:border-primary-300 disabled:opacity-40"
            aria-label="Next page"
          >
            →
          </button>
        </div>
      )}

      <div className="text-center text-sm text-neutral-500">
        Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalBusinesses)} of{" "}
        {totalBusinesses} businesses
      </div>
    </div>
  );
};

export default BusinessGrid;
