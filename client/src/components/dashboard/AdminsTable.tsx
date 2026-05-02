import React, { useMemo, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessId?: string;
}

interface AdminsTableProps {
  users: User[];
  currentUserId?: string;
  deletingUserId: string | null;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const AdminsTable: React.FC<AdminsTableProps> = ({
  users,
  currentUserId,
  deletingUserId,
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setVisibleCount(10);
  }, [search]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) => {
      const hay = [u.name, u.email, u.role]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [users, search]);

  const visible = useMemo(
    () => filtered.slice(0, Math.min(visibleCount, filtered.length)),
    [filtered, visibleCount]
  );

  return (
    <div className="overflow-x-auto">
      <div className="p-4 flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search admins..."
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              User Details
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {visible.map((userItem) => (
            <tr
              key={userItem.id}
              className="hover:bg-blue-50/50 transition-colors duration-150 group"
            >
              <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-600">
                      {userItem.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-150">
                      {userItem.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {userItem.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <div className="flex items-center space-x-2 text-gray-900">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <span className="font-medium">{userItem.email}</span>
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    userItem.role === "superadmin"
                      ? "bg-purple-100 text-purple-800 border-purple-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }`}
                >
                  {userItem.role === "superadmin"
                    ? "👑 Super Admin"
                    : "👤 Admin"}
                </span>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                {userItem.businessId ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span className="text-sm text-gray-600">
                      Associated with Business
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">
                    No business assigned
                  </span>
                )}
              </td>
              <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  {userItem.role !== "superadmin" && (
                    <button
                      onClick={() => onEdit(userItem)}
                      className="group bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-blue-200 hover:border-blue-300"
                    >
                      <svg
                        className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
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
                      <span>Edit</span>
                    </button>
                  )}
                  {userItem.role !== "superadmin" &&
                    userItem.id !== currentUserId && (
                      <button
                        onClick={() => onDelete(userItem.id)}
                        disabled={deletingUserId === userItem.id}
                        className="group bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 border border-red-200 hover:border-red-300"
                      >
                        {deletingUserId === userItem.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-3 py-4">
        {visible.length < filtered.length && (
          <button
            onClick={() => setVisibleCount((c) => c + 10)}
            className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Load more
          </button>
        )}
        {visibleCount > 10 && (
          <button
            onClick={() => setVisibleCount(10)}
            className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminsTable;
