import React, { useState, useEffect } from 'react';
import { graphqlAPI } from '../services/graphql';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl: string;
  website: string;
  description: string;
  businessHours: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const Contact: React.FC = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await graphqlAPI.getContacts();
        // Only use the first contact - there should be only one
        setContact(data[0] || null);
      } catch (err) {
        setError('Failed to fetch contact information');
        console.error('Error fetching contact:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No contact information available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - Contact Information & Visuals */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-gray-900 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nulla tempus sollicitudin dui, ut vehicula lacus porta vel duis urna ligula luctus at feugiat a lacinia ut sem.
          </p>
        </div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Address</h3>
                             <p className="text-gray-700 leading-relaxed">{contact.address}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Email</h3>
                             <p className="text-gray-700 leading-relaxed">{contact.email}</p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Phone</h3>
                             <p className="text-gray-700 leading-relaxed">{contact.phone}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Social Media</h3>
              <div className="flex space-x-4">
                                 {contact.socialMedia.facebook && (
                   <a href={contact.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] hover:bg-[#166FE5] rounded flex items-center justify-center transition-all duration-200 shadow-lg">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                     </svg>
                   </a>
                 )}
                                 {contact.socialMedia.instagram && (
                   <a href={contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 rounded flex items-center justify-center transition-all duration-200 shadow-lg">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                     </svg>
                   </a>
                 )}
                                 {contact.socialMedia.twitter && (
                   <a href={contact.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black hover:bg-gray-800 rounded flex items-center justify-center transition-all duration-200 shadow-lg">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                     </svg>
                   </a>
                 )}
                                 {contact.socialMedia.linkedin && (
                   <a href={contact.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0A66C2] hover:bg-[#004182] rounded flex items-center justify-center transition-all duration-200 shadow-lg">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                     </svg>
                   </a>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Vases Section */}
        <div className="flex justify-end mb-20">
          <div className="flex space-x-8">
            <div className="w-32 h-40 bg-blue-100 rounded-t-full flex items-end justify-center">
              <div className="w-24 h-32 bg-blue-200 rounded-t-full mb-2"></div>
            </div>
            <div className="w-32 h-40 bg-blue-100 rounded-t-full flex items-end justify-center relative">
              <div className="w-24 h-32 bg-blue-200 rounded-t-full mb-2"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <div className="w-4 h-6 bg-green-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-gray-300 mb-20" />
      </div>

      {/* Middle Section - Get In Touch Form */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nulla tempus sollicitudin dui, ut vehicula lacus porta vel duis urna ligula luctus at feugiat a lacinia ut sem.
          </p>
        </div>

        <form className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-500">
                <option value="">-- Occasion</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="inquiry">General Inquiry</option>
              </select>
            </div>
            <div>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-500">
                <option value="">-- Budget</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="mb-8">
            <textarea
              placeholder="Message"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="bg-amber-200 hover:bg-amber-300 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              SEND REQUEST
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Section - Map */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-96 relative">
                         {contact.latitude && contact.longitude ? (
               <iframe
                 src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${contact.latitude},${contact.longitude}&zoom=15`}
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title={`Map showing ${contact.name} location`}
               ></iframe>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Map coordinates not available</p>
                </div>
              </div>
            )}
            
                         {/* Visit site button overlay */}
             {contact.latitude && contact.longitude && (
               <div className="absolute bottom-6 left-6">
                 <a
                   href={`https://www.google.com/maps/search/?api=1&query=${contact.latitude},${contact.longitude}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                 >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-sm font-medium">Visit site</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
