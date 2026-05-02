import React, { useState, useEffect } from 'react';

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
  title: 'About Goa Yellow Pages',
  subtitle: 'Your trusted partner in discovering the best businesses across Goa',
  mission: 'To connect people with the best businesses in Goa, providing authentic reviews and reliable information to enhance their experiences.',
  vision: 'To become the most trusted and comprehensive business directory in Goa, empowering both businesses and consumers with reliable information and authentic experiences.',
  description:
    "Founded in 2024, Goa Yellow Pages emerged from a simple yet powerful idea: to create a comprehensive, trustworthy platform that connects people with the best businesses across Goa. We understand that finding reliable services in a new place can be challenging, and that's why we've built a platform that goes beyond just listings.",
  foundedYear: '2024',
  teamMembers: '25+',
  achievements: '1000+',
  values: ['Trust', 'Quality', 'Innovation', 'Community', 'Excellence', 'Integrity'],
  contactEmail: 'info@goayellowpages.com',
  contactPhone: '+91 98765 43210',
};

const AboutUs: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutContent>(defaultAbout);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('page_about');
      if (raw) {
        const parsed = JSON.parse(raw);
        setAboutData({ ...defaultAbout, ...parsed });
      }
    } catch (e) {
      // ignore bad JSON
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-gray-700">Est. {aboutData.foundedYear}</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {aboutData.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            {aboutData.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{aboutData.foundedYear}</div>
              <div className="text-gray-600 font-medium">Founded</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{aboutData.teamMembers}</div>
              <div className="text-gray-600 font-medium">Team Members</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{aboutData.achievements}</div>
              <div className="text-gray-600 font-medium">Businesses Listed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Connecting People with <span className="text-emerald-600">Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {aboutData.mission}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600">Verified Business Listings</span>
              </div>
            </div>
            
            {/* Vision */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Our Vision
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                The Most <span className="text-purple-600">Trusted</span> Directory
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {aboutData.vision}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-600">Authentic Reviews & Ratings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Our Story
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Building Trust, One Business at a Time
            </h2>
            
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {aboutData.description}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our team of dedicated professionals works tirelessly to verify businesses, collect authentic reviews, and maintain the highest standards of quality. We believe that every business deserves to be discovered, and every customer deserves to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Core Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide every decision we make and every action we take.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 hover:border-gray-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">{value.charAt(0)}</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value}</h4>
                <p className="text-gray-600 leading-relaxed">
                  We embody {value.toLowerCase()} in everything we do, ensuring the highest standards for our users and partners.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Goa's Best?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join thousands of users who trust us to find the perfect businesses for their needs.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="text-white font-medium">{aboutData.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white font-medium">{aboutData.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
