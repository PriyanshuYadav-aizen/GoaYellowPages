import React, { useState } from "react";
import { graphqlAPI } from "../services/graphql";
import { Business } from "../types";

interface AdminEditFormProps {
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
    businessId?: string;
  };
  onSuccess: (admin: {
    id: string;
    name: string;
    email: string;
    role: string;
    businessId?: string;
  }) => void;
  onCancel: () => void;
}

const AdminEditForm: React.FC<AdminEditFormProps> = ({
  admin,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    businessId: admin.businessId || "",
  });
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingBusinesses, setLoadingBusinesses] = useState(false);
  const [businessesLoaded, setBusinessesLoaded] = useState(false);

  const fetchBusinesses = async () => {
    if (businessesLoaded) return; // Don't fetch if already loaded

    try {
      setLoadingBusinesses(true);
      const data = await graphqlAPI.getBusinesses(1, 50); // Reduced from 1000 to 50
      setBusinesses(data.businesses);
      setBusinessesLoaded(true);
    } catch (err) {
      setError("Failed to fetch businesses");
    } finally {
      setLoadingBusinesses(false);
    }
  };

  // Only fetch businesses when dropdown is focused
  const handleBusinessDropdownFocus = () => {
    if (!businessesLoaded) {
      fetchBusinesses();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { name, email, businessId } = formData;
      const updatedAdmin = await graphqlAPI.updateUser(admin.id, {
        name,
        email,
        businessId: businessId || undefined,
      });
      onSuccess(updatedAdmin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Edit Admin User
                </h1>
                <p className="text-blue-100 mt-1">Update admin information</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.994-.833-2.764 0L3.05 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                  placeholder="Enter admin name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                  placeholder="Enter admin email"
                />
              </div>

              {/* Business Selection */}
              <div>
                <label
                  htmlFor="businessId"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Associated Business (Optional)
                </label>
                <select
                  id="businessId"
                  name="businessId"
                  value={formData.businessId}
                  onChange={handleChange}
                  onFocus={handleBusinessDropdownFocus}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a business (optional)</option>
                  {loadingBusinesses ? (
                    <option disabled>Loading businesses...</option>
                  ) : (
                    businesses.map((business) => (
                      <option key={business.id} value={business.id}>
                        {business.name} - {business.location}
                      </option>
                    ))
                  )}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  If selected, this admin will be redirected to edit this
                  business when they log in.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Update Admin</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditForm;
