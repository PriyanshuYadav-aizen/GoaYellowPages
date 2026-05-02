import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Business } from "../types";
import { graphqlAPI } from "../services/graphql";
import { BusinessForm } from "../components/BusinessForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import { useAuth } from "../contexts/AuthContext";

const BusinessEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!id) {
        setError("Business ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await graphqlAPI.getBusiness(id);
        setBusiness(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch business details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  const handleSuccess = (_updatedBusiness: Business) => {
    // Redirect to the business admin dashboard after successful edit
    navigate(`/business-admin`);
  };

  const handleCancel = () => {
    // Redirect back to the business admin dashboard
    navigate(`/business-admin`);
  };

  // Check if user has permission to edit this business
  if (user?.role === "admin" && user?.businessId !== id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <h2 className="text-xl font-bold text-white">Access Denied</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                You don't have permission to edit this business.
              </p>
              <button
                onClick={() => navigate(`/business/${id}`)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !business) {
    return <ErrorDisplay error={error || "Business not found"} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with logout button */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Edit Business: {business.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Update your business information
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="group bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-red-200 hover:border-red-300"
            >
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Business Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <BusinessForm
          initialData={business}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default BusinessEdit;
