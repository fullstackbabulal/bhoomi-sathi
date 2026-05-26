"use client";

import { useRef } from "react";
import { ImageIcon, Video, UploadCloud, Plus, Trash2, X } from "lucide-react";

const PropertyMediaCard = ({ formData, updateField }) => {
  const thumbnailRef = useRef(null);
  const galleryRef = useRef(null);

  // ======================================================
  // THUMBNAIL UPLOAD
  // ======================================================
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    updateField("thumbnail", {
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeThumbnail = () => {
    updateField("thumbnail", null);
  };

  // ======================================================
  // GALLERY IMAGES
  // ======================================================
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const uploadedImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    updateField("images", [...(formData.images || []), ...uploadedImages]);
  };

  const removeImage = (index) => {
    updateField(
      "images",
      formData.images.filter((_, i) => i !== index),
    );
  };

  // ======================================================
  // VIDEOS
  // ======================================================
  const addVideo = () => {
    updateField("videos", [...(formData.videos || []), { url: "" }]);
  };

  const updateVideo = (index, value) => {
    const updatedVideos = [...formData.videos];

    updatedVideos[index].url = value;

    updateField("videos", updatedVideos);
  };

  const removeVideo = (index) => {
    updateField(
      "videos",
      formData.videos.filter((_, i) => i !== index),
    );
  };

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Media Gallery</h2>

        <p className="text-sm text-slate-500">
          Upload thumbnail and gallery images
        </p>
      </div>

      <div className="space-y-8">
        {/* ===================================
            THUMBNAIL
        =================================== */}
        <div>
          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Thumbnail Image
          </label>

          {!formData.thumbnail ? (
            <button
              type="button"
              onClick={() => thumbnailRef.current?.click()}
              className="flex h-44 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 transition hover:border-violet-500"
            >
              <UploadCloud size={36} className="mb-3 text-violet-600" />

              <span className="font-semibold">Upload Thumbnail</span>

              <span className="text-xs text-slate-500">JPG, PNG, WEBP</span>
            </button>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border">
              <img
                src={formData.thumbnail.preview}
                alt="thumbnail"
                className="h-60 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          <input
            ref={thumbnailRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
          />
        </div>

        {/* ===================================
            GALLERY
        =================================== */}
        <div>
          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Gallery Images
          </label>

          <div className="flex flex-wrap gap-4">
            {/* Upload Box */}
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className="flex h-28 w-44 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 transition hover:border-violet-500"
            >
              <UploadCloud size={24} className="mb-2 text-violet-600" />

              <span className="text-sm font-semibold">Upload Images</span>
            </button>

            {/* Preview */}
            {formData.images?.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt=""
                  className="h-28 w-44 rounded-3xl object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <input
            hidden
            multiple
            type="file"
            ref={galleryRef}
            accept="image/*"
            onChange={handleGalleryUpload}
          />
        </div>

        {/* ===================================
            VIDEOS
        =================================== */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">
              Videos (Optional)
            </label>

            <button
              type="button"
              onClick={addVideo}
              className="rounded-xl border px-4 py-2 text-sm"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {formData.videos?.map((video, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={video.url}
                  onChange={(e) => updateVideo(index, e.target.value)}
                  placeholder="YouTube / Vimeo URL"
                  className="h-12 flex-1 rounded-xl border px-4"
                />

                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="rounded-xl border px-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyMediaCard;
