import { Link } from "react-router-dom";
import { Business } from "../../types";
import { useNormalUserAuth } from "../../contexts/NormalUserAuthContext";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";

interface BusinessInfoProps {
  business: Business;
}

function to12h(time24?: string): string | undefined {
  if (!time24) return undefined;
  const [hStr, mStr] = time24.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10) || 0;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

const BusinessInfo = ({ business }: BusinessInfoProps) => {
  const { isLoggedIn: isNormalUserLoggedIn } = useNormalUserAuth();
  const { isLoggedIn: isAdminLoggedIn } = useAuth();
  const canViewContact = isNormalUserLoggedIn || isAdminLoggedIn;
  const openingTime = to12h(business.openingTime) || "soon";
  const closingTime = to12h(business.closingTime) || "later";
  const isOpen = Boolean(business.isOpen);

  return (
    <div className="space-y-5">
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border px-4 py-3",
          isOpen ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
        )}
      >
        <span className={cn("h-2 w-2 rounded-full", isOpen ? "animate-pulse bg-green-500" : "bg-red-400")} />
        <span className={cn("text-sm font-semibold", isOpen ? "text-green-700" : "text-red-700")}>
          {isOpen ? `Open · Closes at ${closingTime}` : `Closed · Opens at ${openingTime}`}
        </span>
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
        <h2 className="mb-4 text-lg font-bold text-neutral-900">Contact</h2>
        {!canViewContact ? (
          <Link to="/user/login" className="btn-secondary block text-center">
            Login to view contact details
          </Link>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-neutral-400">Phone</p>
              <p className="text-lg font-semibold text-neutral-900">{business.phone}</p>
            </div>
            <a href={`tel:${business.phone}`} className="btn-primary inline-flex w-full justify-center">
              Call Now
            </a>
            <div>
              <p className="text-xs font-semibold uppercase text-neutral-400">Email</p>
              <p className="break-words text-sm font-medium text-neutral-700">{business.email}</p>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
        <h2 className="mb-4 text-lg font-bold text-neutral-900">Hours</h2>
        <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-sm">
          <span className="font-medium text-neutral-600">Today</span>
          <span className="font-semibold text-neutral-900">{openingTime} - {closingTime}</span>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
        <h2 className="mb-4 text-lg font-bold text-neutral-900">Location</h2>
        <p className="mb-4 text-sm font-medium text-neutral-600">{business.location}</p>
        <div className="h-64 overflow-hidden rounded-xl">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${business.latitude},${business.longitude}&zoom=15`}
            title={`Map showing ${business.name} location`}
          />
        </div>
      </section>
    </div>
  );
};

export default BusinessInfo;
