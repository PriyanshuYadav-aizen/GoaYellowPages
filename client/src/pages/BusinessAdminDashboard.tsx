import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { graphqlAPI } from "../services/graphql";
import { Business } from "../types";

const BusinessAdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const targetBusinessId = params.id || user?.businessId;
      if (!targetBusinessId) {
        setError("No associated business found for this admin account");
        setLoading(false);
        return;
      }
      try {
        const data = await graphqlAPI.getBusiness(targetBusinessId);
        setBusiness(data);
        setError(null);
      } catch (e) {
        setError("Failed to load business details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your dashboard...
          </p>
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
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Go to Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
                  d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                My Business Dashboard
              </h1>
              <p className="text-sm text-gray-500">Welcome, {user?.email}</p>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {business && (
          <>
            {/* Page header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {business.name}
              </h2>
              <p className="text-gray-500">{business.location}</p>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Public Views</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {typeof business.publicViews === "number"
                    ? business.publicViews
                    : (() => {
                        try {
                          const key = `views:business:${business.id}:public`;
                          const v =
                            parseInt(localStorage.getItem(key) || "0", 10) || 0;
                          return v;
                        } catch {
                          return 0;
                        }
                      })()}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Unique Logged-in Viewers
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {(() => {
                    try {
                      const key = `viewers:business:${business.id}`;
                      const list: Array<{
                        id: string;
                        email: string;
                        name: string;
                        ts: number;
                      }> = JSON.parse(localStorage.getItem(key) || "[]");
                      return new Set(list.map((v) => v.id)).size;
                    } catch {
                      return 0;
                    }
                  })()}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Average Rating</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {business.averageRating?.toFixed(1) ?? "-"}
                </p>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Area chart card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500">Views (last 14 days)</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <span className="w-3 h-3 bg-blue-500 inline-block rounded-sm"></span>{" "}
                      Logged-in
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <span className="w-3 h-3 bg-emerald-500 inline-block rounded-sm"></span>{" "}
                      Public
                    </span>
                  </div>
                </div>
                {(() => {
                  // Prepare 14-day labels
                  const labels: string[] = [];
                  const now = new Date();
                  for (let i = 6; i >= 0; i--) {
                    const d = new Date(now);
                    d.setDate(now.getDate() - i);
                    labels.push(d.toISOString().slice(0, 10));
                  }

                  // Safe parse helper
                  const safeParse = <T,>(
                    raw: string | null,
                    fallback: T
                  ): T => {
                    try {
                      return raw ? (JSON.parse(raw) as T) : fallback;
                    } catch {
                      return fallback;
                    }
                  };

                  // Logged-in per day
                  const viewersKey = `viewers:business:${business.id}`;
                  const viewers = safeParse<
                    Array<{
                      id: string;
                      email: string;
                      name: string;
                      ts: number;
                    }>
                  >(localStorage.getItem(viewersKey), []);
                  const loggedCounts = labels.map(() => 0);
                  viewers.forEach((v) => {
                    const key = new Date(v.ts).toISOString().slice(0, 10);
                    const idx = labels.indexOf(key);
                    if (idx >= 0) loggedCounts[idx] += 1;
                  });

                  // Public per day
                  const histKey = `viewsHistory:business:${business.id}:public`;
                  const hist = safeParse<Record<string, number>>(
                    localStorage.getItem(histKey),
                    {}
                  );
                  const publicCounts = labels.map((l) => hist[l] || 0);

                  // Fallback: if history empty but total public > 0, map all to today
                  const totalPublic =
                    parseInt(
                      localStorage.getItem(
                        `views:business:${business.id}:public`
                      ) || "0",
                      10
                    ) || 0;
                  const sumPublic = publicCounts.reduce((a, b) => a + b, 0);
                  if (sumPublic === 0 && totalPublic > 0) {
                    const today = new Date().toISOString().slice(0, 10);
                    const idx = labels.indexOf(today);
                    if (idx >= 0) publicCounts[idx] = totalPublic;
                  }

                  // Horizontal bar chart dimensions (compact)
                  const rowHeight = 12; // even thicker bars
                  const subGap = 4; // keep overall height constant
                  const rowGap = 0; // no inter-day gap
                  const topPad = -25;
                  const leftPad = 8;
                  const rightPad = 8;
                  const barMax = 120; // keep bar length
                  const rowBlock = rowHeight * 2 + subGap; // two sub-rows per day
                  const height =
                    topPad + labels.length * (rowBlock + rowGap) + 6;
                  const width = leftPad + barMax + rightPad;

                  // global max for scaling
                  const globalMax = Math.max(
                    1,
                    ...labels.map((_, i) =>
                      Math.max(publicCounts[i], loggedCounts[i])
                    )
                  );

                  // If all zero, show placeholder
                  if (
                    globalMax === 1 &&
                    publicCounts.every((n) => n === 0) &&
                    loggedCounts.every((n) => n === 0)
                  ) {
                    return (
                      <div className="h-40 flex items-center justify-center text-sm text-gray-500 bg-gray-50 rounded-md">
                        No view data yet — visit the business page to generate
                        activity
                      </div>
                    );
                  }

                  return (
                    <svg
                      width={width}
                      height={height}
                      viewBox={`0 0 ${width} ${height}`}
                      preserveAspectRatio="xMinYMin meet"
                      aria-label="views chart"
                    >
                      {labels.map((label, i) => {
                        const y = topPad + i * (rowBlock + rowGap);
                        const pub = publicCounts[i];
                        const log = loggedCounts[i];
                        const wPub = Math.max(1, (pub / globalMax) * barMax);
                        const wLog = Math.max(1, (log / globalMax) * barMax);
                        return (
                          <g key={label}>
                            {/* Public (green) left-to-right */}
                            {pub > 0 && (
                              <rect
                                x={leftPad}
                                y={y}
                                width={wPub}
                                height={rowHeight}
                                fill="#10b981"
                                opacity={0.6}
                                rx={2}
                              />
                            )}
                            {/* Logged-in (blue) under it as a second line */}
                            {log > 0 && (
                              <rect
                                x={leftPad}
                                y={y + rowHeight + subGap}
                                width={wLog}
                                height={rowHeight}
                                fill="#3b82f6"
                                opacity={0.6}
                                rx={2}
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  );
                })()}
              </div>

              {/* Recent viewers */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">
                    Recent Logged-in Viewers
                  </p>
                  <p className="text-sm text-gray-700">
                    {(() => {
                      try {
                        const key = `viewers:business:${business.id}`;
                        const list: Array<{
                          id: string;
                          email: string;
                          name: string;
                          ts: number;
                        }> = JSON.parse(localStorage.getItem(key) || "[]");
                        // Unique by user id (latest only)
                        const latestById = new Map<
                          string,
                          {
                            id: string;
                            email: string;
                            name: string;
                            ts: number;
                          }
                        >();
                        list.forEach((v) => {
                          const prev = latestById.get(v.id);
                          if (!prev || v.ts > prev.ts) latestById.set(v.id, v);
                        });
                        return `Total: ${latestById.size}`;
                      } catch {
                        return `Total: 0`;
                      }
                    })()}
                  </p>
                </div>
                <div className="max-h-64 overflow-auto divide-y divide-gray-200 text-sm">
                  {(() => {
                    try {
                      const key = `viewers:business:${business.id}`;
                      const list: Array<{
                        id: string;
                        email: string;
                        name: string;
                        ts: number;
                      }> = JSON.parse(localStorage.getItem(key) || "[]");
                      if (!list.length)
                        return (
                          <p className="text-gray-500">No recent viewers</p>
                        );
                      // Unique latest per id, then sort desc by ts, limit 20
                      const latestById = new Map<
                        string,
                        { id: string; email: string; name: string; ts: number }
                      >();
                      list.forEach((v) => {
                        const prev = latestById.get(v.id);
                        if (!prev || v.ts > prev.ts) latestById.set(v.id, v);
                      });
                      const uniqueLatest = Array.from(latestById.values())
                        .sort((a, b) => b.ts - a.ts)
                        .slice(0, 20);
                      return uniqueLatest.map((v) => (
                        <div
                          key={`${v.id}-${v.ts}`}
                          className="py-2 flex items-center justify-between"
                        >
                          <span className="text-gray-800">
                            {v.name || v.email}
                          </span>
                          <span className="text-gray-400">
                            {new Date(v.ts).toLocaleString()}
                          </span>
                        </div>
                      ));
                    } catch {
                      return <p className="text-gray-500">No recent viewers</p>;
                    }
                  })()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate(`/business/${business.id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
              >
                Edit Business
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessAdminDashboard;
