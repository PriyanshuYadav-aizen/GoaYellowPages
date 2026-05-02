import { useState, useEffect } from "react";
import { Business } from "../types";
import { graphqlAPI } from "../services/graphql";
import BusinessFilterSidebar, {
  BusinessFilter,
} from "../components/BusinessFilterSidebar";
import HeroSection from "../components/HeroSection";
import BusinessGrid from "../components/BusinessGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import Footer from "../components/Footer";
import { cn } from "../lib/utils";

// Add the paginated interface
interface PaginatedBusinesses {
  businesses: Business[];
  totalPages: number;
  currentPage: number;
  totalBusinesses: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Home = () => {
  const [businessesData, setBusinessesData] =
    useState<PaginatedBusinesses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<BusinessFilter>({
    search: "",
    category: "",
    expense: "",
  });

  const pageSize = isFilterVisible ? 9 : 12;

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const data = await graphqlAPI.getBusinesses(currentPage, pageSize);
        setBusinessesData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch businesses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [currentPage, pageSize]);

  // Reset to page 1 when filters change and refetch data
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      // If already on page 1, refetch data
      const fetchBusinesses = async () => {
        try {
          setLoading(true);
          const data = await graphqlAPI.getBusinesses(1, pageSize);
          setBusinessesData(data);
          setError(null);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch businesses"
          );
        } finally {
          setLoading(false);
        }
      };
      fetchBusinesses();
    }
  }, [filter.search, filter.category, filter.expense, pageSize]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtering logic - applied to current page businesses
  const filteredBusinesses =
    businessesData?.businesses.filter((b) => {
      // Search by name or location
      const searchMatch =
        filter.search.trim() === "" ||
        b.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        b.location.toLowerCase().includes(filter.search.toLowerCase());

      // Category (using actual category field with fallback for businesses without category)
      const categoryMatch =
        filter.category === "" ||
        (b.category && b.category === filter.category) ||
        (!b.category && filter.category === "Other");

      // Expense
      const expenseMatch =
        filter.expense === "" || b.priceCategory === filter.expense;

      return searchMatch && categoryMatch && expenseMatch;
    }) || [];

  // Show pagination only if there are multiple pages and no active filters
  const shouldShowPagination =
    businessesData &&
    businessesData.totalPages > 1 &&
    !filter.search.trim() &&
    !filter.category &&
    !filter.expense;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter & Content Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setIsFilterVisible(!isFilterVisible);
              setCurrentPage(1);
            }}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-[16px] font-medium text-sm transition-all duration-200",
              "bg-gray-50 text-gray-700",
              "shadow-[4px_4px_8px_rgba(163,163,163,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]",
              "hover:shadow-[6px_6px_12px_rgba(163,163,163,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]",
              "active:shadow-[inset_4px_4px_8px_rgba(163,163,163,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
            )}
          >
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                !isFilterVisible && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          {isFilterVisible && (
            <div className="w-full md:w-[20rem] xl:w-[24rem] flex-shrink-0">
              <BusinessFilterSidebar
                filter={filter}
                onChange={setFilter}
                isVisible={isFilterVisible}
              />
            </div>
          )}
          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            {/* Businesses Section (hide contact/login CTA on home cards) */}
            <BusinessGrid
              data={{
                businesses: filteredBusinesses,
                totalPages: shouldShowPagination
                  ? businessesData?.totalPages || 0
                  : 1,
                currentPage: shouldShowPagination ? currentPage : 1,
                totalBusinesses: shouldShowPagination
                  ? businessesData?.totalBusinesses || 0
                  : filteredBusinesses.length,
                hasNextPage: shouldShowPagination
                  ? businessesData?.hasNextPage || false
                  : false,
                hasPrevPage: shouldShowPagination
                  ? businessesData?.hasPrevPage || false
                  : false,
              }}
              onPageChange={handlePageChange}
              hideContactCTA
              isFilterVisible={isFilterVisible}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
