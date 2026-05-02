import { Business } from "../../types";
import { API_URL } from "../../config";

interface BusinessGalleryProps {
  business: Business;
}

const getImageUrl = (path: string): string => (path.startsWith("http") ? path : `${API_URL}${path}`);

const BusinessGallery = ({ business }: BusinessGalleryProps) => {
  const galleryImages = (business.galleryImages || []).filter(Boolean);
  const visibleImages = galleryImages.slice(0, 4);

  if (visibleImages.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-3xl">📷</div>
        <h3 className="text-xl font-bold text-neutral-900">No photos yet</h3>
        <p className="mt-2 text-neutral-600">This business has not uploaded any images.</p>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:grid-cols-3">
      <div className="aspect-video overflow-hidden rounded-xl sm:col-span-2 sm:row-span-2 sm:aspect-auto">
        <img src={getImageUrl(visibleImages[0])} alt={`${business.name} gallery 1`} className="h-full w-full object-cover" />
      </div>
      {visibleImages.slice(1).map((image, index) => (
        <div key={image} className="aspect-video overflow-hidden rounded-xl">
          <img src={getImageUrl(image)} alt={`${business.name} gallery ${index + 2}`} className="h-full w-full object-cover" />
        </div>
      ))}
      {galleryImages.length > 4 && (
        <button className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-card">
          View All Photos
        </button>
      )}
    </div>
  );
};

export default BusinessGallery;
