import React, { useMemo, useState, useEffect } from "react";
import { Business } from "../../types";

interface BusinessesTableProps {
  businesses: Business[];
  deletingBusinessId: string | null;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  getPriceCategoryColor: (category: string) => string;
  getPriceCategoryLabel: (category: string) => string;
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const BusinessesTable: React.FC<BusinessesTableProps> = ({
  businesses,
  deletingBusinessId,
  onDelete,
  onView,
  getPriceCategoryColor,
  getPriceCategoryLabel,
  currentPage: _currentPage,
  totalPages: _totalPages,
  hasPrevPage: _hasPrevPage,
  hasNextPage: _hasNextPage,
  onPageChange: _onPageChange,
}) => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setVisibleCount(10);
  }, [search]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return businesses;
    return businesses.filter((b) => {
      const hay = [
        b.name,
        b.location,
        b.phone,
        b.category,
        b.priceCategory,
        b.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [businesses, search]);

  const visible = useMemo(
    () => filtered.slice(0, Math.min(visibleCount, filtered.length)),
    [filtered, visibleCount]
  );

  return (
    <div className="overflow-x-auto">
      <div className="p-4 flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search businesses..."
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Business Details
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {visible.map((business) => (
            <tr
              key={business.id}
              className="hover:bg-blue-50/50 transition-colors duration-150 group"
            >
              <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-600">
                      {business.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-150">
                      {business.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{business.phone}</span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center space-x-1 mt-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span>ID: {business.id}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <div className="flex items-center space-x-2 text-gray-900">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium">{business.location}</span>
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriceCategoryColor(
                    business.priceCategory
                  )}`}
                >
                  {getPriceCategoryLabel(business.priceCategory)}
                </span>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {business.averageRating
                        ? business.averageRating.toFixed(1)
                        : "0.0"}
                    </span>
                    <svg
                      className="w-5 h-5 text-yellow-400 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({business.totalRatings || 0})
                  </span>
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onView(business.id)}
                    className="group bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-blue-200 hover:border-blue-300"
                  >
                    <svg
                      className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 0a9 9 0 1118 0 9 9 0 01-18 0z"
                      />
                    </svg>
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onDelete(business.id)}
                    disabled={deletingBusinessId === business.id}
                    className="group bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 border border-red-200 hover:border-red-300"
                  >
                    {deletingBusinessId === business.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-3 py-4">
        {visible.length < filtered.length && (
          <button
            onClick={() => setVisibleCount((c) => c + 10)}
            className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Load more
          </button>
        )}
        {visibleCount > 10 && (
          <button
            onClick={() => setVisibleCount(10)}
            className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default BusinessesTable;
