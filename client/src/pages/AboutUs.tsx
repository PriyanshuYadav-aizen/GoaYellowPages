import React, { useEffect, useState } from "react";

interface AboutContent {
  title: string;
  subtitle: string;
  mission: string;
  vision: string;
  description: string;
  foundedYear: string;
  teamMembers: string;
  achievements: string;
  values: string[];
  contactEmail: string;
  contactPhone: string;
}

const defaultAbout: AboutContent = {
  title: "About Goa Yellow Pages",
  subtitle: "Your trusted partner in discovering the best businesses across Goa",
  mission: "To connect people with the best businesses in Goa, providing authentic reviews and reliable information to enhance their experiences.",
  vision: "To become the most trusted and comprehensive business directory in Goa, empowering both businesses and consumers with reliable information and authentic experiences.",
  description:
    "Founded in 2024, Goa Yellow Pages emerged from a simple yet powerful idea: to create a comprehensive, trustworthy platform that connects people with the best businesses across Goa. We understand that finding reliable services in a new place can be challenging, and that's why we've built a platform that goes beyond just listings.",
  foundedYear: "2024",
  teamMembers: "25+",
  achievements: "1000+",
  values: ["Trust", "Quality", "Innovation", "Community", "Excellence", "Integrity"],
  contactEmail: "info@goayellowpages.com",
  contactPhone: "+91 98765 43210",
};

const AboutUs: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutContent>(defaultAbout);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("page_about");
      if (raw) setAboutData({ ...defaultAbout, ...JSON.parse(raw) });
    } catch {
      // Keep default copy if local content is malformed.
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="bg-gradient-to-br from-primary-50 via-amber-50 to-secondary-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-primary-200 bg-white px-4 py-1.5 text-sm font-semibold text-primary-700">
            Est. {aboutData.foundedYear}
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl font-display text-5xl font-extrabold leading-tight text-neutral-900 md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-600">{aboutData.subtitle}</p>
        </div>
      </section>

      <section className="bg-primary-500 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 text-center sm:grid-cols-3">
          <Stat value={aboutData.foundedYear} label="Founded" />
          <Stat value={aboutData.teamMembers} label="Team Members" />
          <Stat value={aboutData.achievements} label="Listings" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <InfoCard title="Our Mission" body={aboutData.mission} />
          <InfoCard title="Our Vision" body={aboutData.vision} />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-card">
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">Building Trust, One Business at a Time</h2>
          <p className="leading-relaxed text-neutral-600">{aboutData.description}</p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 font-display text-3xl font-bold text-neutral-900">What Drives Us</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {aboutData.values.map((value) => (
              <span key={value} className="badge-primary px-4 py-2 text-sm">
                {value}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`mailto:${aboutData.contactEmail}`} className="btn-primary">
              {aboutData.contactEmail}
            </a>
            <a href={`tel:${aboutData.contactPhone}`} className="btn-secondary">
              {aboutData.contactPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="font-display text-4xl font-extrabold">{value}</div>
    <div className="mt-1 text-sm font-medium text-white/80">{label}</div>
  </div>
);

const InfoCard = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-card">
    <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">{title}</h2>
    <p className="leading-relaxed text-neutral-600">{body}</p>
  </div>
);

export default AboutUs;
