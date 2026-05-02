import React, { useEffect, useState } from "react";
import { graphqlAPI } from "../services/graphql";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import { Contact as ContactType } from "../types";

const Contact: React.FC = () => {
  const [contact, setContact] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await graphqlAPI.getContacts();
        setContact(data[0] || null);
      } catch (err) {
        setError("Failed to fetch contact information");
        console.error("Error fetching contact:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;
  if (!contact) return <ErrorDisplay error="No contact information available." />;

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="bg-gradient-to-br from-primary-50 via-amber-50 to-secondary-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl font-extrabold text-neutral-900">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
            Have a question about listings, partnerships, or your business profile? We are here to help.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card md:p-8"
        >
          <h2 className="mb-6 font-display text-2xl font-bold text-neutral-900">Send a Message</h2>
          <div className="grid gap-5">
            <input className="input-field py-3" placeholder="Name" />
            <input className="input-field py-3" type="email" placeholder="Email" />
            <input className="input-field py-3" placeholder="Subject" />
            <textarea className="input-field min-h-36 py-3" placeholder="Message" />
            <button className="btn-primary w-full">Send Request</button>
          </div>
        </form>

        <div className="grid gap-4">
          <InfoCard title="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
          <InfoCard title="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <InfoCard title="Address" value={contact.address} />
          <InfoCard title="Hours" value={contact.businessHours || "Monday to Saturday, 10 AM - 6 PM"} />
          {contact.socialMedia && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">Social</h3>
              <div className="flex gap-3">
                {contact.socialMedia.facebook && <Social href={contact.socialMedia.facebook} label="Facebook" />}
                {contact.socialMedia.instagram && <Social href={contact.socialMedia.instagram} label="Instagram" />}
                {contact.socialMedia.twitter && <Social href={contact.socialMedia.twitter} label="X" />}
                {contact.socialMedia.linkedin && <Social href={contact.socialMedia.linkedin} label="LinkedIn" />}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="h-96 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
          {contact.latitude && contact.longitude ? (
            <iframe
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${contact.latitude},${contact.longitude}&zoom=15`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`Map showing ${contact.name} location`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-500">Map coordinates not available</div>
          )}
        </div>
      </section>
    </div>
  );
};

const InfoCard = ({ title, value, href }: { title: string; value: string; href?: string }) => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">{title}</h3>
    {href ? (
      <a href={href} className="font-semibold text-neutral-900 hover:text-primary-600">
        {value}
      </a>
    ) : (
      <p className="font-medium leading-relaxed text-neutral-700">{value}</p>
    )}
  </div>
);

const Social = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-sm font-bold text-white">
    {label[0]}
  </a>
);

export default Contact;
