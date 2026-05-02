import { Link } from "react-router-dom";
import { Business } from "../types";
import { API_URL } from "../config";
import { useNormalUserAuth } from "../contexts/NormalUserAuthContext";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "../lib/utils";

interface BusinessCardProps {
  business: Business;
  hideContactCTA?: boolean;
}

const PriceBadge = ({ category }: { category: string }) => {
  const map: Record<string, { label: string; className: string }> = {
    cheap: { label: "₹ Budget", className: "bg-green-100 text-green-700 border-green-200" },
    moderate: { label: "₹₹ Mid", className: "bg-amber-100 text-amber-700 border-amber-200" },
    expensive: { label: "₹₹₹ Premium", className: "bg-rose-100 text-rose-700 border-rose-200" },
  };
  const item = map[category] || {
    label: category || "Price",
    className: "bg-neutral-100 text-neutral-700 border-neutral-200",
  };

  return (
    <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-sm", item.className)}>
      {item.label}
    </span>
  );
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={cn("h-4 w-4", filled ? "text-accent-500" : "text-neutral-200")} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.176 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

const getImageUrl = (path: string | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
};

const BusinessCard = ({ business, hideContactCTA = false }: BusinessCardProps) => {
  const { isLoggedIn: isNormalUserLoggedIn } = useNormalUserAuth();
  const { isLoggedIn: isAdminLoggedIn } = useAuth();
  const canViewContact = isNormalUserLoggedIn || isAdminLoggedIn;
  const imageUrl = getImageUrl(business.heroImageUrl);
  const isOpen = Boolean(business.isOpen);

  return (
    <article className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative h-48 overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={business.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">🏢</div>
        )}

        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 backdrop-blur-sm">
            {business.category || "Business"}
          </span>
        </div>

        <div className="absolute right-3 top-3">
          <PriceBadge category={business.priceCategory} />
        </div>

        <div
          className={cn(
            "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            isOpen
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", isOpen ? "animate-pulse bg-green-500" : "bg-red-500")} />
          {isOpen ? "Open" : "Closed"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 mb-1 text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-primary-600">
          {business.name}
        </h3>

        <p className="mb-3 flex items-center gap-1.5 text-sm text-neutral-500">
          <svg className="h-3.5 w-3.5 flex-shrink-0 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="line-clamp-1">{business.location}</span>
        </p>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} filled={i <= Math.round(business.averageRating || 0)} />
            ))}
          </div>
          <span className="text-sm font-semibold text-neutral-800">
            {business.averageRating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-sm text-neutral-400">({business.totalRatings || 0} reviews)</span>
        </div>

        <div className="flex-1" />

        <div className="flex gap-2 border-t border-neutral-100 pt-3">
          {!hideContactCTA &&
            (canViewContact ? (
              <a
                href={`tel:${business.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                </svg>
                Call
              </a>
            ) : (
              <Link
                to="/user/login"
                className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-center text-sm font-medium text-neutral-600 transition-all hover:border-primary-300 hover:text-primary-600"
              >
                Login to Call
              </Link>
            ))}
          <Link
            to={`/business/${business.id}`}
            className={cn(
              "rounded-xl bg-primary-500 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-button",
              hideContactCTA ? "w-full" : "flex-1"
            )}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BusinessCard;
