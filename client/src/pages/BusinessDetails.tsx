import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNormalUserAuth } from "../contexts/NormalUserAuthContext";
import { Business } from "../types";
import { graphqlAPI } from "../services/graphql";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import {
  BusinessHeader,
  BusinessGallery,
  BusinessInfo,
  BusinessReviews,
  BusinessFAQ,
} from "../components/BusinessDetails";

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, user: normalUser } = useNormalUserAuth();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasRecordedViewRef = useRef(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!id) {
        setError("Business ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await graphqlAPI.getBusiness(id);
        setBusiness(data);
        setError(null);
        // Public view and per-day history; increment once per mount (prevents StrictMode double run), increments again on page refresh
        try {
          if (!hasRecordedViewRef.current) {
            hasRecordedViewRef.current = true;
            try {
              await graphqlAPI.incrementPublicView(id);
            } catch {}
            const totalKey = `views:business:${id}:public`;
            const current =
              parseInt(localStorage.getItem(totalKey) || "0", 10) || 0;
            localStorage.setItem(totalKey, String(current + 1));
            const histKey = `viewsHistory:business:${id}:public`;
            const today = new Date().toISOString().slice(0, 10);
            const raw = localStorage.getItem(histKey);
            const hist: Record<string, number> = raw ? JSON.parse(raw) : {};
            hist[today] = (hist[today] || 0) + 1;
            localStorage.setItem(histKey, JSON.stringify(hist));
          }
        } catch {}
        // Record logged-in viewer identity for this business (guarded once per tab session)
        try {
          if (isLoggedIn && normalUser?.id) {
            const onceKey = `session:viewedUser:business:${id}`;
            if (!sessionStorage.getItem(onceKey)) {
              const key = `viewers:business:${id}`;
              const raw = localStorage.getItem(key);
              const list: Array<{
                id: string;
                email: string;
                name: string;
                ts: number;
              }> = raw ? JSON.parse(raw) : [];
              list.push({
                id: normalUser.id,
                email: normalUser.email,
                name: normalUser.name,
                ts: Date.now(),
              });
              localStorage.setItem(key, JSON.stringify(list.slice(-200)));
              sessionStorage.setItem(onceKey, "1");
            }
          }
        } catch {}
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch business details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !business) {
    return <ErrorDisplay error={error || "Business not found"} />;
  }

  return (
    <div className="bg-neutral-50">
      <BusinessHeader business={business} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BusinessGallery business={business} />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card md:p-8">
              <h2 className="mb-3 font-display text-2xl font-bold text-neutral-900">About {business.name}</h2>
              <p className="leading-relaxed text-neutral-600">{business.description}</p>
            </section>
            <BusinessReviews business={business} />
            <BusinessFAQ faq={business.faq} businessId={business.id} />
          </div>
          <div className="lg:col-span-1">
            <BusinessInfo business={business} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
