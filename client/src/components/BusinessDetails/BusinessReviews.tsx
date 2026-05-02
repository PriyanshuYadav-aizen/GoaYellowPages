import { Business, Rating } from "../../types";

interface BusinessReviewsProps {
  business: Business;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`h-4 w-4 ${filled ? "text-accent-500" : "text-neutral-200"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.176 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

const avatarColor = (value: string) => {
  const colors = ["bg-primary-100 text-primary-700", "bg-secondary-100 text-secondary-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"];
  const total = value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[total % colors.length];
};

const BusinessReviews = ({ business }: BusinessReviewsProps) => {
  const ratings = business.ratings || [];
  const total = ratings.length || business.totalRatings || 0;
  const distribution = [5, 4, 3, 2, 1].map((score) => {
    const count = ratings.filter((rating) => Math.round(rating.rating) === score).length;
    return { score, percent: total ? Math.round((count / total) * 100) : 0 };
  });

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card md:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-neutral-900">Reviews</h2>
          <p className="text-sm text-neutral-500">Real ratings from Goa Yellow Pages users.</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} filled={i <= Math.round(business.averageRating || 0)} />
          ))}
          <span className="text-sm font-semibold text-neutral-900">{business.averageRating?.toFixed(1) || "0.0"}</span>
        </div>
      </div>

      <div className="mb-6 space-y-2 rounded-xl bg-neutral-50 p-4">
        {distribution.map((row) => (
          <div key={row.score} className="grid grid-cols-[36px_1fr_42px] items-center gap-3 text-sm">
            <span className="font-semibold text-neutral-700">{row.score}★</span>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full rounded-full bg-accent-500" style={{ width: `${row.percent}%` }} />
            </div>
            <span className="text-right text-neutral-500">{row.percent}%</span>
          </div>
        ))}
      </div>

      {ratings.length === 0 ? (
        <div className="py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-3xl">★</div>
          <h3 className="text-lg font-bold text-neutral-900">No reviews yet</h3>
          <p className="mt-1 text-neutral-600">Be the first to review this business.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ratings.map((rating: Rating, index: number) => (
            <div key={`${rating.userId}-${index}`} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${avatarColor(rating.userId)}`}>
                    {rating.userId.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">User {rating.userId.slice(-4)}</p>
                    <p className="text-xs text-neutral-500">{new Date(rating.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} filled={i <= rating.rating} />
                  ))}
                </div>
              </div>
              {rating.comment && <p className="leading-relaxed text-neutral-700">{rating.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BusinessReviews;
