import React, { useEffect, useState } from "react";

interface PrivacyContent {
  title: string;
  lastUpdated: string;
  introduction: string;
  informationWeCollect: string;
  howWeUseInformation: string;
  informationSharing: string;
  dataSecurity: string;
  cookiesPolicy: string;
  thirdPartyServices: string;
  userRights: string;
  childrenPrivacy: string;
  internationalTransfers: string;
  changesToPolicy: string;
  contactInformation: string;
}

const defaultPrivacy: PrivacyContent = {
  title: "Privacy Policy",
  lastUpdated: "January 1, 2024",
  introduction: "At Goa Yellow Pages, we are committed to protecting your privacy and ensuring the security of your personal information.",
  informationWeCollect: "We collect information you provide directly to us and certain technical data automatically.",
  howWeUseInformation: "We use your information to provide and improve services, communicate with you, and ensure platform security.",
  informationSharing: "We do not sell your data. We may share with trusted providers as needed to operate our services.",
  dataSecurity: "We implement appropriate technical and organizational measures to protect your data.",
  cookiesPolicy: "We use cookies to improve your experience. You can control cookies in your browser.",
  thirdPartyServices: "Our site may link to third-party services. Their policies apply to their services.",
  userRights: "You can access, update, or delete your information and opt out of certain communications.",
  childrenPrivacy: "Our services are not intended for children under 13 and we do not knowingly collect their data.",
  internationalTransfers: "Your information may be processed in other countries with appropriate safeguards.",
  changesToPolicy: "We may update this policy and will post changes with an updated date.",
  contactInformation: "Email: privacy@goayellowpages.com, Phone: +91 98765 43210, Address: Goa, India",
};

const PrivacyPolicy: React.FC = () => {
  const [privacyData, setPrivacyData] = useState<PrivacyContent>(defaultPrivacy);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("page_privacy");
      if (raw) setPrivacyData({ ...defaultPrivacy, ...JSON.parse(raw) });
    } catch {
      // Keep defaults if stored content is malformed.
    }
  }, []);

  const sections = [
    ["Information We Collect", privacyData.informationWeCollect],
    ["How We Use Your Information", privacyData.howWeUseInformation],
    ["Information Sharing and Disclosure", privacyData.informationSharing],
    ["Data Security", privacyData.dataSecurity],
    ["Cookies and Tracking Technologies", privacyData.cookiesPolicy],
    ["Third-Party Services", privacyData.thirdPartyServices],
    ["Your Rights and Choices", privacyData.userRights],
    ["Children's Privacy", privacyData.childrenPrivacy],
    ["International Data Transfers", privacyData.internationalTransfers],
    ["Changes to This Privacy Policy", privacyData.changesToPolicy],
  ];
  const sectionId = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-4 shadow-card">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">On this page</p>
            <nav className="space-y-2">
              {sections.map(([title]) => (
                <a key={title} href={`#${sectionId(title)}`} className="block text-sm text-neutral-600 hover:text-primary-600">
                  {title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="max-w-3xl">
          <h1 className="mb-2 font-display text-3xl font-bold text-neutral-900">{privacyData.title}</h1>
          <p className="mb-8 text-sm font-medium text-neutral-500">Last updated: {privacyData.lastUpdated}</p>
          <section className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
            <h2 className="mb-3 text-xl font-semibold text-neutral-800">Introduction</h2>
            <p className="leading-relaxed text-neutral-600">{privacyData.introduction}</p>
          </section>

          {sections.map(([title, content]) => (
            <section key={title} id={sectionId(title)}>
              <h2 className="mb-3 mt-10 text-xl font-semibold text-neutral-800">{title}</h2>
              <p className="leading-relaxed text-neutral-600">{content}</p>
            </section>
          ))}

          <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
            <h2 className="mb-3 text-xl font-semibold text-neutral-800">Contact Information</h2>
            <p className="leading-relaxed text-neutral-600">{privacyData.contactInformation}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
