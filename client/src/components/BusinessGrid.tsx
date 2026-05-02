import { Business } from "../types";
import BusinessCard from "./BusinessCard";

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

const BusinessGrid = ({
  data,
  hideContactCTA = false,
  isFilterVisible = true,
  onPageChange,
}: BusinessGridProps) => {
  const {
    businesses,
    totalPages,
    currentPage,
    totalBusinesses,
    hasNextPage,
    hasPrevPage,
  } = data;

  if (businesses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-gray-100 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            No businesses found
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Businesses will appear here once they are added to the system. Check
            back soon for amazing local recommendations!
          </p>
        </div>
      </div>
    );
  }

  // Dynamic grid: 4 columns when filter hidden, 3 when shown
  const gridCols = isFilterVisible
    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  const pageSize = isFilterVisible ? 9 : 12;

  return (
    <div className="space-y-8">
      {/* Business Grid */}
      <div className={gridCols}>
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            hideContactCTA={hideContactCTA}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              hasPrevPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Page Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              hasNextPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center text-gray-600">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, totalBusinesses)} of {totalBusinesses}{" "}
        businesses
      </div>
    </div>
  );
};

export default BusinessGrid;
