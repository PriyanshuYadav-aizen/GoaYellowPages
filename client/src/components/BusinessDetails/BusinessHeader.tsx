import { Business } from "../../types";
import { API_URL } from "../../config";

interface BusinessHeaderProps {
  business: Business;
}

const BusinessHeader = ({ business }: BusinessHeaderProps) => {
  const rating = Math.round(business.averageRating || 0);

  const getImageUrl = (path: string): string => {
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Hero Image Background */}
      {business.heroImageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl(business.heroImageUrl)}
            alt={business.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center min-h-[80vh] justify-center">
        {/* Business Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-lg">
          {business.name}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-2 text-lg md:text-xl font-medium text-white/90 mb-4 drop-shadow-md">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{business.location}</span>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < rating ? "text-yellow-400" : "text-white/60"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.176 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
          </div>
          <div className="text-base sm:text-lg text-white font-semibold drop-shadow-md">
            {business.averageRating?.toFixed(1) ?? "0.0"}
            <span className="text-sm text-white/80 ml-1">
              ({business.totalRatings ?? 0} reviews)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHeader;
