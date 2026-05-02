import React from "react";
import { Contact } from "../../types";

interface ContactsTableProps {
  contacts: Contact[];
  deletingContactId: string | null;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  deletingContactId,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Contact Details
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email & Phone
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Social Media
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="hover:bg-blue-50/50 transition-colors duration-150 group"
            >
              <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-emerald-600">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-150">
                      {contact.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {contact.businessHours}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center space-x-1 mt-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span>ID: {contact.id}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="space-y-2">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    <span className="font-medium text-sm">{contact.email}</span>
                  </div>
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="font-medium text-sm">{contact.phone}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="text-sm text-gray-900 max-w-xs">
                  <p className="truncate">{contact.address}</p>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex space-x-2">
                  {contact.socialMedia.facebook && (
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs text-blue-600 font-bold">F</span>
                    </div>
                  )}
                  {contact.socialMedia.instagram && (
                    <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                      <span className="text-xs text-pink-600 font-bold">I</span>
                    </div>
                  )}
                  {contact.socialMedia.twitter && (
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600 font-bold">X</span>
                    </div>
                  )}
                  {contact.socialMedia.linkedin && (
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs text-blue-600 font-bold">L</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onEdit(contact)}
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
                  <button
                    onClick={() => onDelete(contact.id)}
                    disabled={deletingContactId === contact.id}
                    className="group bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 border border-red-200 hover:border-red-300"
                  >
                    {deletingContactId === contact.id ? (
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
