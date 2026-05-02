import React, { useState, useEffect } from 'react';

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
  title: 'Privacy Policy',
  lastUpdated: 'January 1, 2024',
  introduction: 'At Goa Yellow Pages, we are committed to protecting your privacy and ensuring the security of your personal information.',
  informationWeCollect: 'We collect information you provide directly to us and certain technical data automatically.',
  howWeUseInformation: 'We use your information to provide and improve services, communicate with you, and ensure platform security.',
  informationSharing: 'We do not sell your data. We may share with trusted providers as needed to operate our services.',
  dataSecurity: 'We implement appropriate technical and organizational measures to protect your data.',
  cookiesPolicy: 'We use cookies to improve your experience. You can control cookies in your browser.',
  thirdPartyServices: 'Our site may link to third-party services. Their policies apply to their services.',
  userRights: 'You can access, update, or delete your information and opt out of certain communications.',
  childrenPrivacy: 'Our services are not intended for children under 13 and we do not knowingly collect their data.',
  internationalTransfers: 'Your information may be processed in other countries with appropriate safeguards.',
  changesToPolicy: 'We may update this policy and will post changes with an updated date.',
  contactInformation: 'Email: privacy@goayellowpages.com, Phone: +91 98765 43210, Address: Goa, India',
};

const PrivacyPolicy: React.FC = () => {
  const [privacyData, setPrivacyData] = useState<PrivacyContent>(defaultPrivacy);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('page_privacy');
      if (raw) setPrivacyData({ ...defaultPrivacy, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const sections = [
    { title: 'Information We Collect', content: privacyData.informationWeCollect, icon: '📊' },
    { title: 'How We Use Your Information', content: privacyData.howWeUseInformation, icon: '🔧' },
    { title: 'Information Sharing and Disclosure', content: privacyData.informationSharing, icon: '🤝' },
    { title: 'Data Security', content: privacyData.dataSecurity, icon: '🔒' },
    { title: 'Cookies and Tracking Technologies', content: privacyData.cookiesPolicy, icon: '🍪' },
    { title: 'Third-Party Services', content: privacyData.thirdPartyServices, icon: '🔗' },
    { title: 'Your Rights and Choices', content: privacyData.userRights, icon: '⚖️' },
    { title: "Children's Privacy", content: privacyData.childrenPrivacy, icon: '👶' },
    { title: 'International Data Transfers', content: privacyData.internationalTransfers, icon: '🌍' },
    { title: 'Changes to This Privacy Policy', content: privacyData.changesToPolicy, icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Privacy & Security</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {privacyData.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your privacy is our priority. Learn how we protect and handle your information.
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg inline-block">
            <div className="text-sm text-gray-600 mb-2">Last Updated</div>
            <div className="text-2xl font-bold text-emerald-600">{privacyData.lastUpdated}</div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-12 border border-emerald-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {privacyData.introduction}
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

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">Questions About Privacy?</h2>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
              We're here to help. Contact our privacy team for any questions or concerns.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="text-emerald-100 text-lg leading-relaxed">
                {privacyData.contactInformation}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
