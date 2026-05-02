import { Business } from "../types";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import { useNormalUserAuth } from "../contexts/NormalUserAuthContext";
import { useAuth } from "../contexts/AuthContext";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
} from "./ui/minimal-card";

interface BusinessCardProps {
  business: Business;
  hideContactCTA?: boolean;
}

const BusinessCard = ({ business, hideContactCTA = false }: BusinessCardProps) => {
  const getPriceCategoryColor = (category: string) => {
    switch (category) {
      case "cheap":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white";
      case "moderate":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "expensive":
        return "bg-gradient-to-r from-red-400 to-pink-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };

  const getPriceCategoryLabel = (category: string) => {
    switch (category) {
      case "cheap":
        return "💰 Budget";
      case "moderate":
        return "💸 Mid-Range";
      case "expensive":
        return "💎 Premium";
      default:
        return category;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const getImageUrl = (path: string | undefined): string => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const { isLoggedIn: isNormalUserLoggedIn } = useNormalUserAuth();
  const { isLoggedIn: isAdminLoggedIn } = useAuth();
  const canViewContact = isNormalUserLoggedIn || isAdminLoggedIn;

  const statusLabel = business.isOpen ? "Open now" : "Closed now";
  const statusContainerClasses = business.isOpen
    ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
    : "bg-rose-50/80 text-rose-700 border-rose-200";
  const statusDotClasses = business.isOpen
    ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
    : "bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.15)]";

  return (
    <MinimalCard className="group relative transition-all duration-300 hover:shadow-2xl">
      {business.heroImageUrl && (
        <div className="relative">
          <MinimalCardImage
            src={getImageUrl(business.heroImageUrl)}
            alt={business.name}
            className="mb-4"
          />
          {/* Price Category Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${getPriceCategoryColor(
                business.priceCategory
              )}`}
            >
              {getPriceCategoryLabel(business.priceCategory)}
            </span>
          </div>
        </div>
      )}

      {/* Status badge - middle right of the card */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md ${statusContainerClasses}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${statusDotClasses} ${business.isOpen ? "animate-pulse" : ""}`}></span>
          <span className="text-xs font-semibold tracking-wide">{statusLabel}</span>
        </div>
      </div>

      <MinimalCardContent className="p-4 pt-0">
        <MinimalCardTitle className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 px-0 mt-0">
          {business.name}
        </MinimalCardTitle>

        <MinimalCardDescription className="text-gray-600 mb-2 flex items-center text-sm px-0 pb-0">
          <svg
            className="w-4 h-4 mr-2 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {business.location}
        </MinimalCardDescription>

        {/* Ratings */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars(business.averageRating || 0)}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-900">
                {business.averageRating
                  ? business.averageRating.toFixed(1)
                  : "0.0"}
              </span>
              <span className="text-gray-500 ml-1">
                ({business.totalRatings || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Contact / CTA */}
        {!hideContactCTA && (
          <div className="pt-3 border-t border-gray-100 mb-3">
            {canViewContact ? (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
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
                  {business.phone}
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/user/login" className="btn-secondary w-1/2 text-center">User Login</Link>
                <Link to="/user/register" className="btn-primary w-1/2 text-center">User Register</Link>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div>
          <Link to={`/business/${business.id}`}>
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl">
              View Details
            </button>
          </Link>
        </div>
      </MinimalCardContent>
    </MinimalCard>
  );
};

export default BusinessCard;
