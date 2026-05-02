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
    <div>
      <BusinessHeader business={business} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BusinessGallery business={business} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            <BusinessReviews business={business} />
            <BusinessFAQ faq={business.faq} businessId={business.id} />
            {/* Add more sections here if needed */}
          </div>
          <div className="md:col-span-1">
            <BusinessInfo business={business} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
