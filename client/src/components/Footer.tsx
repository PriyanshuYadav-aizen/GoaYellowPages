import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contact } from "../types";
import { graphqlAPI } from "../services/graphql";

const Footer = () => {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await graphqlAPI.getContacts();
        setContact(data[0] || null);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <Link to="/" className="mb-5 inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-2xl">
                🌴
              </span>
              <span>
                <span className="font-borel text-3xl leading-none text-primary-400">Goa</span>{" "}
                <span className="font-bold text-white">Yellow Pages</span>
              </span>
            </Link>
            <p className="max-w-2xl text-neutral-300">
              Discover trusted local businesses across Goa, from coastal cafes and boutique stays to daily services and essential shops.
            </p>
            <p className="mt-4 text-sm font-medium text-primary-300">Made with love for Goa</p>

            {contact?.socialMedia && (
              <div className="mt-6 flex gap-3">
                {contact.socialMedia.facebook && <Social href={contact.socialMedia.facebook} label="Facebook" className="bg-[#1877F2]" />}
                {contact.socialMedia.instagram && <Social href={contact.socialMedia.instagram} label="Instagram" className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]" />}
                {contact.socialMedia.twitter && <Social href={contact.socialMedia.twitter} label="X" className="bg-black" />}
                {contact.socialMedia.linkedin && <Social href={contact.socialMedia.linkedin} label="LinkedIn" className="bg-[#0A66C2]" />}
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-neutral-400">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/about", "About Us"],
                ["/contact", "Contact Us"],
                ["/privacy", "Privacy Policy"],
                ["/terms", "Terms of Service"],
                ["/login", "Admin Login"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-neutral-300 transition-colors hover:text-primary-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-800 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Goa Yellow Pages. All rights reserved.</span>
          <span>Authentic local discovery for every corner of Goa.</span>
        </div>
      </div>
    </footer>
  );
};

const Social = ({ href, label, className }: { href: string; label: string; className: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white transition-transform hover:-translate-y-0.5 ${className}`}
  >
    {label[0]}
  </a>
);

export default Footer;
