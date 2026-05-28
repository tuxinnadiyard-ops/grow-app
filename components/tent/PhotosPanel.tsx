import usePreferences from "@/hooks/usePreferences";

type Photo = {
  id: string;
  url: string;
  note?: string | null;
  createdAt: string;
};

type Props = {
  activeRun: unknown;
  photoNote: string;
  setPhotoNote: (
    value: string
  ) => void;
  setPhotoFile: (
    file: File | null
  ) => void;
  uploadPhoto: () => void;
  photos: Photo[];
};

export default function PhotosPanel({
  activeRun,
  photoNote,
  setPhotoNote,
  setPhotoFile,
  uploadPhoto,
  photos,
}: Props) {

  const { formatDate } = usePreferences();

  return (
    <section className="card">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Photos
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          Visual grow history
        </p>
      </div>

      {!activeRun ? null : (
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhotoFile(
                e.target.files?.[0] ??
                  null
              )
            }
          />

          <textarea
            rows={2}
            placeholder="Photo note"
            value={photoNote}
            onChange={(e) =>
              setPhotoNote(
                e.target.value
              )
            }
          />

          <button
            className="btn-primary w-full"
            onClick={uploadPhoto}
          >
            Add Photo
          </button>

          {photos.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <div className="text-4xl">
                📷
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {photos.map(
                (photo) => (
                  <div
                    key={photo.id}
                    className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <img
                      src={
                        photo.url
                      }
                      alt="Grow"
                      className="aspect-square w-full object-cover"
                    />

                    <div className="p-4">
                      <p className="text-xs text-[var(--text-muted)]">
                        {formatDate(
                          photo.createdAt
                        )}
                      </p>

                      {photo.note && (
                        <p className="mt-3 text-sm">
                          {
                            photo.note
                          }
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}