import React, { useState, useRef } from "react";
import { Business, FAQ } from "../types";
import { graphqlAPI } from "../services/graphql";

// Helper to convert file to base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CATEGORIES = [
  "Restaurant",
  "Hotel",
  "Shop",
  "Cafe",
  "Bar",
  "Resort",
  "Tour",
  "Other",
];

const TIME_OPTIONS_30M: string[] = (() => {
  const items: string[] = [];
  const minutes = ["00", "30"];
  minutes.forEach((m) => items.push(`12:${m}`));
  for (let h = 1; h <= 11; h++) {
    minutes.forEach((m) => items.push(`${h}:${m}`));
  }
  return items;
})();

function to24h(time12: string, ampm: "AM" | "PM"): string {
  if (!time12) return "";
  const [hStr, mStr] = time12.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10) || 0;
  if (ampm === "AM") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour = hour + 12;
  }
  const hh = hour.toString().padStart(2, "0");
  const mm = minute.toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function parse24hTo12(time24?: string): { time12: string; ampm: "AM" | "PM" } | undefined {
  if (!time24) return undefined;
  const [hStr, mStr] = time24.split(":");
  let hour = parseInt(hStr, 10);
  const ampm: "AM" | "PM" = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const time12 = `${hour}:${(parseInt(mStr, 10) || 0).toString().padStart(2, "0")}`;
  return { time12, ampm };
}

interface BusinessFormProps {
  initialData?: Partial<Business>;
  onSuccess?: (business: Business) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    category: initialData?.category || "Other",
    priceCategory: initialData?.priceCategory || "moderate",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    description: initialData?.description || "",
    isOpen: initialData?.isOpen ?? false,
    openingTime: initialData?.openingTime || "",
    closingTime: initialData?.closingTime || "",
  });

  const openingParsed = parse24hTo12(initialData?.openingTime);
  const closingParsed = parse24hTo12(initialData?.closingTime);
  const [openingTime12, setOpeningTime12] = useState<string>(openingParsed?.time12 || "");
  const [openingAmPm, setOpeningAmPm] = useState<"AM" | "PM">(openingParsed?.ampm || "AM");
  const [closingTime12, setClosingTime12] = useState<string>(closingParsed?.time12 || "");
  const [closingAmPm, setClosingAmPm] = useState<"AM" | "PM">(closingParsed?.ampm || "PM");

  const [heroImage, setHeroImage] = useState<string | null>(
    initialData?.heroImageUrl || null
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.galleryImages || []
  );
  const [faq, setFaq] = useState<FAQ[]>(initialData?.faq || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (error) setError(null);
  };

  const handleHeroImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const base64 = await toBase64(file);
        setHeroImage(base64);
      } catch (error) {
        setError("Failed to process hero image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGalleryImagesChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setLoading(true);
      try {
        const base64Promises = files.map(toBase64);
        const base64Images = await Promise.all(base64Promises);

        // Limit to exactly 5 images total
        const currentImages = galleryImages.length;
        const newImages = base64Images.slice(0, 5 - currentImages);
        setGalleryImages((prev) => [...prev, ...newImages]);
      } catch (error) {
        setError("Failed to process gallery images.");
      } finally {
        setLoading(false);
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeHeroImage = () => {
    setHeroImage(null);
    if (heroFileInputRef.current) {
      heroFileInputRef.current.value = "";
    }
  };

  // FAQ Management Functions
  const addFAQ = () => {
    setFaq((prev) => [...prev, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    setFaq((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    setFaq((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const openingTime = openingTime12 ? to24h(openingTime12, openingAmPm) : undefined;
      const closingTime = closingTime12 ? to24h(closingTime12, closingAmPm) : undefined;

      const businessData = {
        ...formData,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        heroImage: heroImage || undefined,
        galleryImages: galleryImages,
        faq: faq.filter((item) => item.question.trim() && item.answer.trim()),
        isOpen: Boolean(formData.isOpen),
        openingTime,
        closingTime,
      };

      let result: Business;
      if (isEditing && initialData?.id) {
        result = await graphqlAPI.updateBusiness(initialData.id, businessData);
      } else {
        result = await graphqlAPI.createBusiness(businessData);
      }

      onSuccess?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save business");
    } finally {
      setLoading(false);
    }
  };

  const isGalleryFull = galleryImages.length >= 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                {isEditing ? (
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ) : (
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </div>
              {isEditing ? "Edit Business" : "Create New Business"}
            </h2>
            <p className="text-blue-100 mt-2">
              {isEditing
                ? "Update your business information"
                : "Add a new business to the directory"}
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg animate-pulse">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Category *
                </label>
                <select
                  name="priceCategory"
                  value={formData.priceCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="cheap">Budget</option>
                  <option value="moderate">Mid-Range</option>
                  <option value="expensive">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="business@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Latitude *
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="15.2993"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="74.1240"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Current Status</p>
                  <p className="text-xs text-gray-500">Toggle to set the business as open or closed</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, isOpen: !p.isOpen }))}
                  aria-pressed={formData.isOpen}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    formData.isOpen ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
                      formData.isOpen ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Opening Time</label>
                <div className="flex gap-2">
                  <select
                    value={openingTime12}
                    onChange={(e) => setOpeningTime12(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select time</option>
                    {TIME_OPTIONS_30M.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    value={openingAmPm}
                    onChange={(e) => setOpeningAmPm(e.target.value as "AM" | "PM")}
                    className="px-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Closing Time</label>
                <div className="flex gap-2">
                  <select
                    value={closingTime12}
                    onChange={(e) => setClosingTime12(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select time</option>
                    {TIME_OPTIONS_30M.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    value={closingAmPm}
                    onChange={(e) => setClosingAmPm(e.target.value as "AM" | "PM")}
                    className="px-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe your business..."
              />
            </div>

            {/* Image Upload Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Hero Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Image
                </label>
                <div className="space-y-4">
                  {heroImage && (
                    <div className="relative">
                      <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={removeHeroImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <input
                    ref={heroFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Gallery Images
                  </label>
                  <span
                    className={`text-sm font-medium ${
                      isGalleryFull ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {galleryImages.length}/5 images
                  </span>
                </div>
                <div className="space-y-4">
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                          >
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImagesChange}
                    disabled={isGalleryFull}
                    className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isGalleryFull ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  {isGalleryFull && (
                    <p className="text-sm text-red-600">
                      Maximum 5 images reached. Remove some images to add more.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Frequently Asked Questions
                </h3>
                <button
                  type="button"
                  onClick={addFAQ}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add FAQ</span>
                </button>
              </div>

              {faq.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-600">No FAQ items added yet.</p>
                  <p className="text-sm text-gray-500">
                    Click "Add FAQ" to add frequently asked questions.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {faq.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          FAQ #{index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFAQ(index)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Question *
                          </label>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) =>
                              updateFAQ(index, "question", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter the question"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Answer *
                          </label>
                          <textarea
                            value={item.answer}
                            onChange={(e) =>
                              updateFAQ(index, "answer", e.target.value)
                            }
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter the answer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
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
                    {isEditing ? "Update Business" : "Create Business"}
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 
