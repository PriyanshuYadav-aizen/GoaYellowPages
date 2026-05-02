import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { graphqlAPI } from "../services/graphql";
import { Business, Contact } from "../types";
import { BusinessForm } from "../components/BusinessForm";
import { ContactForm } from "../components/ContactForm";
import AdminForm from "../components/AdminForm";
import AdminEditForm from "../components/AdminEditForm";
import BusinessAdminRedirect from "../components/BusinessAdminRedirect";
import BusinessesTable from "../components/dashboard/BusinessesTable";
import AdminsTable from "../components/dashboard/AdminsTable";
import ContactsTable from "../components/dashboard/ContactsTable";
import PagesManager from "../components/dashboard/PagesManager";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessId?: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<User | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingBusinessId, setDeletingBusinessId] = useState<string | null>(
    null
  );
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "businesses" | "admins" | "contacts" | "pages"
  >("businesses");
  const [pagesEditorType, setPagesEditorType] = useState<
    null | "about" | "privacy" | "terms"
  >(null);
  const [pagesForm, setPagesForm] = useState<Record<string, string>>({});

  // Pagination state for businesses
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const pageSize = 12;

  const openPagesEditor = (type: "about" | "privacy" | "terms") => {
    setPagesEditorType(type);
    try {
      const key =
        type === "about"
          ? "page_about"
          : type === "privacy"
          ? "page_privacy"
          : "page_terms";
      const raw = localStorage.getItem(key);
      const existing = raw ? JSON.parse(raw) : {};
      if (type === "about") {
        setPagesForm({
          title: existing.title || "About Goa Yellow Pages",
          subtitle:
            existing.subtitle ||
            "Your trusted partner in discovering the best businesses across Goa",
          mission: existing.mission || "",
          vision: existing.vision || "",
          description: existing.description || "",
          foundedYear: existing.foundedYear || "2024",
          teamMembers: existing.teamMembers || "25+",
          achievements: existing.achievements || "1000+",
          values:
            existing.values && Array.isArray(existing.values)
              ? existing.values.join(", ")
              : existing.values ||
                "Trust, Quality, Innovation, Community, Excellence, Integrity",
          contactEmail: existing.contactEmail || "info@goayellowpages.com",
          contactPhone: existing.contactPhone || "+91 98765 43210",
        });
      } else if (type === "privacy") {
        setPagesForm({
          title: existing.title || "Privacy Policy",
          lastUpdated: existing.lastUpdated || "January 1, 2024",
          introduction: existing.introduction || "",
          informationWeCollect: existing.informationWeCollect || "",
          howWeUseInformation: existing.howWeUseInformation || "",
          informationSharing: existing.informationSharing || "",
          dataSecurity: existing.dataSecurity || "",
          cookiesPolicy: existing.cookiesPolicy || "",
          thirdPartyServices: existing.thirdPartyServices || "",
          userRights: existing.userRights || "",
          childrenPrivacy: existing.childrenPrivacy || "",
          internationalTransfers: existing.internationalTransfers || "",
          changesToPolicy: existing.changesToPolicy || "",
          contactInformation: existing.contactInformation || "",
        });
      } else {
        setPagesForm({
          title: existing.title || "Terms of Service",
          lastUpdated: existing.lastUpdated || "January 1, 2024",
          introduction: existing.introduction || "",
          acceptanceOfTerms: existing.acceptanceOfTerms || "",
          descriptionOfService: existing.descriptionOfService || "",
          userAccounts: existing.userAccounts || "",
          userConduct: existing.userConduct || "",
          contentGuidelines: existing.contentGuidelines || "",
          intellectualProperty: existing.intellectualProperty || "",
          privacyPolicy: existing.privacyPolicy || "",
          disclaimers: existing.disclaimers || "",
          limitationsOfLiability: existing.limitationsOfLiability || "",
          indemnification: existing.indemnification || "",
          termination: existing.termination || "",
          governingLaw: existing.governingLaw || "",
          changesToTerms: existing.changesToTerms || "",
          contactInformation: existing.contactInformation || "",
        });
      }
    } catch {
      // ignore
    }
  };

  const handlePagesInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPagesForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePages = () => {
    if (!pagesEditorType) return;
    const key =
      pagesEditorType === "about"
        ? "page_about"
        : pagesEditorType === "privacy"
        ? "page_privacy"
        : "page_terms";
    const payload: Record<string, any> = { ...pagesForm };
    if (pagesEditorType === "about") {
      payload.values = (pagesForm.values || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    localStorage.setItem(key, JSON.stringify(payload));
    setPagesEditorType(null);
  };

  // Check if user is a business admin and redirect them
  if (user?.role === "admin" && user?.businessId) {
    return <BusinessAdminRedirect />;
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const [businessesData, usersData, contactsData] = await Promise.all([
        graphqlAPI.getBusinesses(page, pageSize),
        graphqlAPI.getUsers(),
        graphqlAPI.getContacts(),
      ]);
      // businessesData is paginated shape similar to Home
      setBusinesses(businessesData.businesses);
      setTotalPages(businessesData.totalPages || 1);
      setTotalBusinesses(
        businessesData.totalBusinesses || businessesData.businesses.length
      );
      setHasNextPage(!!businessesData.hasNextPage);
      setHasPrevPage(!!businessesData.hasPrevPage);
      setUsers(usersData);
      setContacts(contactsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBusiness = (business: Business) => {
    setBusinesses((prev) => [...prev, business]);
    setShowCreateForm(false);
  };

  const handleUpdateBusiness = (updatedBusiness: Business) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === updatedBusiness.id ? updatedBusiness : b))
    );
    setEditingBusiness(null);
  };

  const handleDeleteBusiness = async (id: string) => {
    if (!confirm("Are you sure you want to delete this business?")) return;

    setDeletingBusinessId(id);
    try {
      await graphqlAPI.deleteBusiness(id);
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      setError("Failed to delete business");
    } finally {
      setDeletingBusinessId(null);
    }
  };

  const handleCreateAdmin = (admin: User) => {
    setUsers((prev) => [...prev, admin]);
    setShowAdminForm(false);
  };

  const handleUpdateAdmin = (updatedAdmin: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedAdmin.id ? updatedAdmin : u))
    );
    setEditingAdmin(null);
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin user?")) return;

    setDeletingUserId(id);
    try {
      await graphqlAPI.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      setError("Failed to delete admin user");
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleCreateContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
    // contact form toggling removed; keep logic minimal
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
    setEditingContact(null);
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    setDeletingContactId(id);
    try {
      await graphqlAPI.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      setError("Failed to delete contact");
    } finally {
      setDeletingContactId(null);
    }
  };

  const getPriceCategoryColor = (category: string) => {
    switch (category) {
      case "cheap":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "moderate":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "expensive":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriceCategoryLabel = (category: string) => {
    switch (category) {
      case "cheap":
        return "💰 Budget";
      case "moderate":
        return "💸 Mid-Range";
      case "expensive":
        return "💎 Premium";
      default:
        return category;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
                <h2 className="text-xl font-bold text-white">Error</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show business form if creating or editing
  if (showCreateForm || editingBusiness) {
    return (
      <BusinessForm
        initialData={editingBusiness || undefined}
        onSuccess={
          editingBusiness ? handleUpdateBusiness : handleCreateBusiness
        }
        onCancel={() => {
          setShowCreateForm(false);
          setEditingBusiness(null);
        }}
        isEditing={!!editingBusiness}
      />
    );
  }

  // Show admin form if creating or editing
  if (showAdminForm) {
    return (
      <AdminForm
        onSuccess={handleCreateAdmin}
        onCancel={() => setShowAdminForm(false)}
      />
    );
  }

  // Show admin edit form if editing
  if (editingAdmin) {
    return (
      <AdminEditForm
        admin={editingAdmin}
        onSuccess={handleUpdateAdmin}
        onCancel={() => setEditingAdmin(null)}
      />
    );
  }

  // Show contact form if creating or editing
  if (editingContact) {
    return (
      <ContactForm
        initialData={editingContact || undefined}
        onSuccess={editingContact ? handleUpdateContact : handleCreateContact}
        onCancel={() => {
          setEditingContact(null);
        }}
        isEditing={!!editingContact}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-blue-100 mt-1">
                    Welcome back,{" "}
                    <span className="font-semibold">{user?.email}</span>!
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {user?.role === "superadmin" && (
                  <>
                    <button
                      onClick={() => setShowAdminForm(true)}
                      className="group bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <span>Add Admin</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="group bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add Business</span>
                </button>
                <button
                  onClick={logout}
                  className="group bg-white/10 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-red-400 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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

          {/* Stats Row */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Businesses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalBusinesses || businesses.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget Options</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      businesses.filter((b) => b.priceCategory === "cheap")
                        .length
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💸</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mid-Range</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      businesses.filter((b) => b.priceCategory === "moderate")
                        .length
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💎</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Premium</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      businesses.filter((b) => b.priceCategory === "expensive")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-white/50 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 px-8 py-4 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("businesses")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "businesses"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>Businesses ({totalBusinesses})</span>
                </span>
              </button>
              {user?.role === "superadmin" && (
                <>
                  <button
                    onClick={() => setActiveTab("admins")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === "admins"
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <span>Admins ({users.length})</span>
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === "contacts"
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      <span>Contact ({contacts.length})</span>
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("pages")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === "pages"
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Pages</span>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          {activeTab === "businesses" ? (
            <BusinessesTable
              businesses={businesses}
              deletingBusinessId={deletingBusinessId}
              onDelete={handleDeleteBusiness}
              onView={(id) => navigate(`/business-admin/${id}`)}
              getPriceCategoryColor={getPriceCategoryColor}
              getPriceCategoryLabel={getPriceCategoryLabel}
              currentPage={currentPage}
              totalPages={totalPages}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={setCurrentPage}
            />
          ) : activeTab === "admins" ? (
            <AdminsTable
              users={users}
              currentUserId={user?.id}
              deletingUserId={deletingUserId}
              onEdit={(u) => setEditingAdmin(u)}
              onDelete={handleDeleteAdmin}
            />
          ) : activeTab === "contacts" ? (
            <ContactsTable
              contacts={contacts}
              deletingContactId={deletingContactId}
              onEdit={(c) => setEditingContact(c)}
              onDelete={handleDeleteContact}
            />
          ) : activeTab === "pages" ? (
            <PagesManager
              pagesEditorType={pagesEditorType}
              pagesForm={pagesForm as any}
              onOpen={openPagesEditor}
              onChange={handlePagesInputChange}
              onSave={handleSavePages}
              onClose={() => setPagesEditorType(null)}
            />
          ) : null}
        </div>

        {/* Empty State */}
        {activeTab === "businesses" && businesses.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No businesses found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your business directory by adding your first
              business listing.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Your First Business</span>
            </button>
          </div>
        )}

        {activeTab === "admins" && users.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No admin users found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your admin team by adding your first admin user.
            </p>
            <button
              onClick={() => setShowAdminForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Your First Admin</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
