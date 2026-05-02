import { Business } from "../../types";
import { useNormalUserAuth } from "../../contexts/NormalUserAuthContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface BusinessInfoProps {
  business: Business;
}

function to12h(time24?: string): string | undefined {
  if (!time24) return undefined;
  const [hStr, mStr] = time24.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10) || 0;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const hh = `${hour}`;
  const mm = minute.toString().padStart(2, "0");
  return `${hh}:${mm} ${ampm}`;
}

const BusinessInfo = ({ business }: BusinessInfoProps) => {
  // Helper for price category badge
  const getPriceCategoryLabel = (category: string) => {
    switch (category) {
      case "cheap":
        return "Budget";
      case "moderate":
        return "Mid-Range";
      case "expensive":
        return "Premium";
      default:
        return category;
    }
  };
  const getPriceCategoryColor = (category: string) => {
    switch (category) {
      case "cheap":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "moderate":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "expensive":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const { isLoggedIn: isNormalUserLoggedIn } = useNormalUserAuth();
  const { isLoggedIn: isAdminLoggedIn } = useAuth();
  const canViewContact = isNormalUserLoggedIn || isAdminLoggedIn;

  const hasHours = Boolean(business.openingTime || business.closingTime);
  const opening12 = to12h(business.openingTime) || "--:--";
  const closing12 = to12h(business.closingTime) || "--:--";

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-white/50 flex flex-col items-stretch md:w-96 w-full min-h-[600px] p-0">
      {/* Map at the top, full width */}
      <div className="w-full h-56 rounded-t-3xl overflow-hidden shadow-lg mb-6">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${business.latitude},${business.longitude}&zoom=15`}
          title={`Map showing ${business.name} location`}
        ></iframe>
      </div>
      <h2 className="text-3xl font-extrabold text-gray-600 pt-4 pb-6 px-8 text-left tracking-tight">
        About
      </h2>
      {/* Category and Price Category */}
      <div className="w-full px-8 pb-4 flex flex-wrap gap-3 items-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border bg-blue-100 text-blue-800 border-blue-200">
          <svg
            className="w-4 h-4 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          {business.category || "Uncategorized"}
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getPriceCategoryColor(
            business.priceCategory
          )}`}
        >
          <svg
            className="w-4 h-4 mr-2 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
            />
          </svg>
          {getPriceCategoryLabel(business.priceCategory)}
        </span>
        {hasHours && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border bg-slate-100 text-slate-800 border-slate-200">
            <svg
              className="w-4 h-4 mr-2 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
              />
            </svg>
            {opening12} - {closing12}
          </span>
        )}
      </div>
      {/* Contact Information - full width, left aligned */}
      <div className="w-full px-8 pb-6">
        <div className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-2">
          Contact Information
        </div>
        {!canViewContact ? (
          <div className="flex flex-col gap-2">
            <Link
              to="/user/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-lg transition-colors w-max"
            >
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
                  d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11zm0 0v2m6-1a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              Login to view contact details
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 mr-3 text-green-600"
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
              <span className="text-base font-medium text-gray-900">{business.phone}</span>
            </div>
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 mr-3 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <span className="text-base font-medium text-gray-900">{business.email}</span>
            </div>
          </>
        )}
      </div>
      {/* Location - full width, left aligned */}
      <div className="w-full px-8 pb-8">
        <div className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-2">
          Location
        </div>
        <div className="flex items-center">
          <svg
            className="w-6 h-6 mr-3 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-medium text-gray-900">
            {business.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
