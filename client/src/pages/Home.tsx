import { useState, useEffect } from "react";
import { Business } from "../types";
import { graphqlAPI } from "../services/graphql";
import BusinessFilterSidebar, {
  BusinessFilter,
} from "../components/BusinessFilterSidebar";
import HeroSection from "../components/HeroSection";
import BusinessGrid from "../components/BusinessGrid";
import ErrorDisplay from "../components/ErrorDisplay";
import Footer from "../components/Footer";
import CategoryStrip from "../components/CategoryStrip";
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

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <HeroSection
        search={filter.search}
        onSearchChange={(search) => setFilter((current) => ({ ...current, search }))}
        onCategorySelect={(category) => setFilter((current) => ({ ...current, category }))}
      />
      <CategoryStrip
        selected={filter.category}
        onCategorySelect={(category) => setFilter((current) => ({ ...current, category }))}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-neutral-900">Explore Businesses</h2>
            <p className="mt-1 text-sm text-neutral-500">Find trusted places, services, and experiences across Goa.</p>
          </div>
          <button
            onClick={() => {
              setIsFilterVisible(!isFilterVisible);
              setCurrentPage(1);
            }}
            className={cn(
              "flex min-h-[44px] items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:border-primary-300 hover:text-primary-600"
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
          {isFilterVisible && (
            <div className="w-full flex-shrink-0 md:w-[20rem] xl:w-[22rem]">
              <BusinessFilterSidebar
                filter={filter}
                onChange={setFilter}
                isVisible={isFilterVisible}
                resultsCount={filteredBusinesses.length}
              />
            </div>
          )}
          <div className="flex-1 min-w-0 w-full">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-card">
                    <div className="h-48 bg-neutral-200" />
                    <div className="space-y-4 p-5">
                      <div className="h-5 w-3/4 rounded bg-neutral-200" />
                      <div className="h-4 w-1/2 rounded bg-neutral-200" />
                      <div className="h-10 rounded-xl bg-neutral-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <BusinessGrid
                data={{
                  businesses: filteredBusinesses,
                  totalPages: shouldShowPagination ? businessesData?.totalPages || 0 : 1,
                  currentPage: shouldShowPagination ? currentPage : 1,
                  totalBusinesses: shouldShowPagination
                    ? businessesData?.totalBusinesses || 0
                    : filteredBusinesses.length,
                  hasNextPage: shouldShowPagination ? businessesData?.hasNextPage || false : false,
                  hasPrevPage: shouldShowPagination ? businessesData?.hasPrevPage || false : false,
                }}
                onPageChange={handlePageChange}
                hideContactCTA
                isFilterVisible={isFilterVisible}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
