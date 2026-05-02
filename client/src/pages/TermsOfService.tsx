import React, { useState, useEffect } from 'react';

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
  title: 'Terms of Service',
  lastUpdated: 'January 1, 2024',
  introduction: 'Welcome to Goa Yellow Pages. These Terms of Service govern your use of our website and services.',
  acceptanceOfTerms: 'By using our services, you agree to these Terms of Service.',
  descriptionOfService: 'We are a business directory and review platform for Goa.',
  userAccounts: 'You are responsible for your account and credentials.',
  userConduct: 'Use the service lawfully and respectfully; no abusive or illegal content.',
  contentGuidelines: 'Content should be accurate, truthful, and follow our community guidelines.',
  intellectualProperty: 'Content on the platform is protected by intellectual property laws.',
  privacyPolicy: 'Use is subject to our Privacy Policy.',
  disclaimers: 'Services are provided "as is" without warranties.',
  limitationsOfLiability: 'We are not liable for indirect or consequential damages.',
  indemnification: 'You agree to indemnify us for losses due to misuse.',
  termination: 'We may suspend or terminate access for violations.',
  governingLaw: 'These terms are governed by the laws of India.',
  changesToTerms: 'We may update these terms with notice on this page.',
  contactInformation: 'Email: legal@goayellowpages.com, Phone: +91 98765 43210, Address: Goa, India',
};

const TermsOfService: React.FC = () => {
  const [termsData, setTermsData] = useState<TermsContent>(defaultTerms);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('page_terms');
      if (raw) setTermsData({ ...defaultTerms, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const sections = [
    { title: 'Acceptance of Terms', content: termsData.acceptanceOfTerms, icon: '✅' },
    { title: 'Description of Service', content: termsData.descriptionOfService, icon: '🔍' },
    { title: 'User Accounts', content: termsData.userAccounts, icon: '👤' },
    { title: 'User Conduct', content: termsData.userConduct, icon: '📋' },
    { title: 'Content Guidelines', content: termsData.contentGuidelines, icon: '📝' },
    { title: 'Intellectual Property Rights', content: termsData.intellectualProperty, icon: '⚖️' },
    { title: 'Privacy Policy', content: termsData.privacyPolicy, icon: '🔒' },
    { title: 'Disclaimers', content: termsData.disclaimers, icon: '⚠️' },
    { title: 'Limitations of Liability', content: termsData.limitationsOfLiability, icon: '🛡️' },
    { title: 'Indemnification', content: termsData.indemnification, icon: '🤝' },
    { title: 'Termination', content: termsData.termination, icon: '🚫' },
    { title: 'Governing Law', content: termsData.governingLaw, icon: '🏛️' },
    { title: 'Changes to These Terms', content: termsData.changesToTerms, icon: '📅' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Legal Terms</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {termsData.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Please read these terms carefully before using our services.
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg inline-block">
            <div className="text-sm text-gray-600 mb-2">Last Updated</div>
            <div className="text-2xl font-bold text-purple-600">{termsData.lastUpdated}</div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 border border-purple-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {termsData.introduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{section.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-12 border border-amber-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.994-.833-2.764 0L3.05 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">Questions About Terms?</h2>
            <p className="text-purple-100 text-lg mb-8 leading-relaxed">
              Our legal team is here to help clarify any questions about these terms.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="text-purple-100 text-lg leading-relaxed">
                {termsData.contactInformation}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
