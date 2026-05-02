import { Business } from "../../types";
import { API_URL } from "../../config";

interface BusinessGalleryProps {
  business: Business;
}

const BusinessGallery = ({ business }: BusinessGalleryProps) => {
  const getImageUrl = (path: string): string => {
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const galleryImages = (business.galleryImages || [])
    .filter(Boolean)
    .slice(0, 5);

  if (galleryImages.length === 0) {
    return (
      <div className="my-8 mx-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-lg shadow-2xl p-8 border border-white/50">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Images Available
          </h3>
          <p className="text-gray-600 text-lg">
            This business hasn't uploaded any images yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 mx-4 md:h-[500px] lg:h-[600px]">
      {/* Mobile: Stack images vertically */}
      <div className="block md:hidden space-y-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="w-full aspect-video rounded-lg overflow-hidden"
          >
            <img
              src={getImageUrl(image)}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Desktop: Original grid, unchanged */}
      <div className="hidden md:block h-full">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 rounded-lg overflow-hidden h-full">
          {/* First large image (2 rows x 2 cols) */}
          <div className="col-span-2 row-span-2">
            <img
              src={getImageUrl(galleryImages[0])}
              alt="Gallery Image 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Remaining 4 images */}
          {galleryImages.slice(1, 5).map((image, index) => (
            <div key={index} className="col-span-1 row-span-1">
              <img
                src={getImageUrl(image)}
                alt={`Gallery Image ${index + 2}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessGallery;
