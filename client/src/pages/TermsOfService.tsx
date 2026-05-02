import React, { useEffect, useState } from "react";

interface TermsContent {
  title: string;
  lastUpdated: string;
  introduction: string;
  acceptanceOfTerms: string;
  descriptionOfService: string;
  userAccounts: string;
  userConduct: string;
  contentGuidelines: string;
  intellectualProperty: string;
  privacyPolicy: string;
  disclaimers: string;
  limitationsOfLiability: string;
  indemnification: string;
  termination: string;
  governingLaw: string;
  changesToTerms: string;
  contactInformation: string;
}

const defaultTerms: TermsContent = {
  title: "Terms of Service",
  lastUpdated: "January 1, 2024",
  introduction: "Welcome to Goa Yellow Pages. These Terms of Service govern your use of our website and services.",
  acceptanceOfTerms: "By using our services, you agree to these Terms of Service.",
  descriptionOfService: "We are a business directory and review platform for Goa.",
  userAccounts: "You are responsible for your account and credentials.",
  userConduct: "Use the service lawfully and respectfully; no abusive or illegal content.",
  contentGuidelines: "Content should be accurate, truthful, and follow our community guidelines.",
  intellectualProperty: "Content on the platform is protected by intellectual property laws.",
  privacyPolicy: "Use is subject to our Privacy Policy.",
  disclaimers: "Services are provided as is without warranties.",
  limitationsOfLiability: "We are not liable for indirect or consequential damages.",
  indemnification: "You agree to indemnify us for losses due to misuse.",
  termination: "We may suspend or terminate access for violations.",
  governingLaw: "These terms are governed by the laws of India.",
  changesToTerms: "We may update these terms with notice on this page.",
  contactInformation: "Email: legal@goayellowpages.com, Phone: +91 98765 43210, Address: Goa, India",
};

const TermsOfService: React.FC = () => {
  const [termsData, setTermsData] = useState<TermsContent>(defaultTerms);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("page_terms");
      if (raw) setTermsData({ ...defaultTerms, ...JSON.parse(raw) });
    } catch {
      // Keep defaults if stored content is malformed.
    }
  }, []);

  const sections = [
    ["Acceptance of Terms", termsData.acceptanceOfTerms],
    ["Description of Service", termsData.descriptionOfService],
    ["User Accounts", termsData.userAccounts],
    ["User Conduct", termsData.userConduct],
    ["Content Guidelines", termsData.contentGuidelines],
    ["Intellectual Property Rights", termsData.intellectualProperty],
    ["Privacy Policy", termsData.privacyPolicy],
    ["Disclaimers", termsData.disclaimers],
    ["Limitations of Liability", termsData.limitationsOfLiability],
    ["Indemnification", termsData.indemnification],
    ["Termination", termsData.termination],
    ["Governing Law", termsData.governingLaw],
    ["Changes to These Terms", termsData.changesToTerms],
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
          <h1 className="mb-2 font-display text-3xl font-bold text-neutral-900">{termsData.title}</h1>
          <p className="mb-8 text-sm font-medium text-neutral-500">Last updated: {termsData.lastUpdated}</p>
          <section className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
            <h2 className="mb-3 text-xl font-semibold text-neutral-800">Introduction</h2>
            <p className="leading-relaxed text-neutral-600">{termsData.introduction}</p>
          </section>

          {sections.map(([title, content]) => (
            <section key={title} id={sectionId(title)}>
              <h2 className="mb-3 mt-10 text-xl font-semibold text-neutral-800">{title}</h2>
              <p className="leading-relaxed text-neutral-600">{content}</p>
            </section>
          ))}

          <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
            <h2 className="mb-3 text-xl font-semibold text-neutral-800">Contact Information</h2>
            <p className="leading-relaxed text-neutral-600">{termsData.contactInformation}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsOfService;
