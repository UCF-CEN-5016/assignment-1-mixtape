/**
 * Stand-in for cover art. The app ships no image files on purpose: a CSS
 * gradient keeps the repo small and means the UI works offline and in CI.
 */
export const AlbumArt = ({ album, size = "card" }) => {
  const initials = album.artist
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`album-art album-art--${size}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${album.colorFrom}, ${album.colorTo})`,
      }}
      aria-hidden="true"
    >
      <span className="album-art__initials">{initials}</span>
    </div>
  );
};
