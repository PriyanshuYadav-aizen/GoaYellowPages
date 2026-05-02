import React from "react";

interface PagesManagerProps {
  pagesEditorType: null | "about" | "privacy" | "terms";
  pagesForm: Record<string, string> & { values?: string };
  onOpen: (type: "about" | "privacy" | "terms") => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
  onClose: () => void;
}

const PagesManager: React.FC<PagesManagerProps> = ({
  pagesEditorType,
  pagesForm,
  onOpen,
  onChange,
  onSave,
  onClose,
}) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Manage Website Pages
        </h3>
        <p className="text-gray-600">
          Edit content for About Us, Privacy Policy, and Terms of Service pages.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">About Us</h4>
          <p className="text-gray-600 text-sm mb-4">
            Company information, mission, vision, and team details.
          </p>
          <button
            onClick={() => onOpen("about")}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
          >
            Edit Content
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Privacy Policy
          </h4>
          <p className="text-gray-600 text-sm mb-4">
            Data collection, usage, and privacy practices.
          </p>
          <button
            onClick={() => onOpen("privacy")}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:from-emerald-600 hover:to-teal-700"
          >
            Edit Content
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-white"
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
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Terms of Service
          </h4>
          <p className="text-gray-600 text-sm mb-4">
            User agreements, rights, and platform rules.
          </p>
          <button
            onClick={() => onOpen("terms")}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:from-purple-600 hover:to-pink-700"
          >
            Edit Content
          </button>
        </div>
      </div>

      {pagesEditorType && (
        <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold text-gray-900">
              {pagesEditorType === "about" && "Edit About Us"}
              {pagesEditorType === "privacy" && "Edit Privacy Policy"}
              {pagesEditorType === "terms" && "Edit Terms of Service"}
            </h4>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                value={pagesForm.title || ""}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {(pagesEditorType === "privacy" || pagesEditorType === "terms") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Updated
                </label>
                <input
                  name="lastUpdated"
                  value={pagesForm.lastUpdated || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {pagesEditorType === "about" && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  name="subtitle"
                  value={pagesForm.subtitle || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mission
                </label>
                <input
                  name="mission"
                  value={pagesForm.mission || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Vision
                </label>
                <input
                  name="vision"
                  value={pagesForm.vision || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={pagesForm.description || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Founded Year
                </label>
                <input
                  name="foundedYear"
                  value={pagesForm.foundedYear || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Team Members
                </label>
                <input
                  name="teamMembers"
                  value={pagesForm.teamMembers || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Achievements
                </label>
                <input
                  name="achievements"
                  value={pagesForm.achievements || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Values (comma separated)
                </label>
                <input
                  name="values"
                  value={pagesForm.values || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  name="contactEmail"
                  value={pagesForm.contactEmail || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  name="contactPhone"
                  value={pagesForm.contactPhone || ""}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          )}

          {pagesEditorType === "privacy" && (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                "introduction",
                "informationWeCollect",
                "howWeUseInformation",
                "informationSharing",
                "dataSecurity",
                "cookiesPolicy",
                "thirdPartyServices",
                "userRights",
                "childrenPrivacy",
                "internationalTransfers",
                "changesToPolicy",
                "contactInformation",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field}
                  </label>
                  <textarea
                    name={field}
                    value={(pagesForm as any)[field] || ""}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  />
                </div>
              ))}
            </div>
          )}

          {pagesEditorType === "terms" && (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                "introduction",
                "acceptanceOfTerms",
                "descriptionOfService",
                "userAccounts",
                "userConduct",
                "contentGuidelines",
                "intellectualProperty",
                "privacyPolicy",
                "disclaimers",
                "limitationsOfLiability",
                "indemnification",
                "termination",
                "governingLaw",
                "changesToTerms",
                "contactInformation",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field}
                  </label>
                  <textarea
                    name={field}
                    value={(pagesForm as any)[field] || ""}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesManager;
