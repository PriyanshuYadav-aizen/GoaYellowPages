import { Business, Rating } from "../../types";

interface BusinessReviewsProps {
  business: Business;
}

const BusinessReviews = ({ business }: BusinessReviewsProps) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
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

      {business.ratings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600">Be the first to review this business!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {business.ratings.map((rating: Rating, index: number) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">
                      {rating.userId.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      User {rating.userId.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(rating.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex">{renderStars(rating.rating)}</div>
              </div>
              {rating.comment && (
                <p className="text-gray-700 leading-relaxed">
                  {rating.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessReviews;
