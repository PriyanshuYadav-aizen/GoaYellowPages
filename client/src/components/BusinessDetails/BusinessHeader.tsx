import { Link } from "react-router-dom";
import { Business } from "../../types";
import { API_URL } from "../../config";

interface BusinessHeaderProps {
  business: Business;
}

const getImageUrl = (path: string): string => (path.startsWith("http") ? path : `${API_URL}${path}`);

const priceLabel: Record<string, string> = {
  cheap: "₹ Budget",
  moderate: "₹₹ Mid",
  expensive: "₹₹₹ Premium",
};

const BusinessHeader = ({ business }: BusinessHeaderProps) => {
  const rating = Math.round(business.averageRating || 0);

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-neutral-900">
      {business.heroImageUrl ? (
        <img
          src={getImageUrl(business.heroImageUrl)}
          alt={business.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            (event.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-secondary-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex w-max items-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-800 backdrop-blur-sm transition-all hover:bg-white"
        >
          ← Back to Results
        </Link>

        <div className="max-w-4xl pb-8 text-white">
          <div className="mb-4 text-sm font-medium text-white/75">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>{business.category || "Business"}</span>
            <span className="mx-2">›</span>
            <span>{business.name}</span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {business.category || "Business"}
            </span>
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {priceLabel[business.priceCategory] || business.priceCategory}
            </span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl md:text-6xl">
            {business.name}
          </h1>
          <div className="mb-4 flex items-center gap-2 text-lg font-medium text-white/90">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{business.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className={`h-5 w-5 ${i <= rating ? "text-accent-500" : "text-white/40"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.176 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold">
              {business.averageRating?.toFixed(1) ?? "0.0"} ({business.totalRatings ?? 0} reviews)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHeader;
