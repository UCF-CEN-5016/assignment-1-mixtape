import { AlbumArt } from "./AlbumArt.jsx";
import { formatDuration, yearFromReleaseDate } from "../utils.js";

export const FeaturedAlbum = ({ album, onOpen }) => {
  if (!album) return null;

  return (
    <section className="featured">
      <AlbumArt album={album} size="hero" />
      <div className="featured__body">
        <p className="featured__eyebrow">Featured</p>
        <h2 className="featured__title">{album.title}</h2>
        <p className="featured__meta">
          {album.artist} &middot; {yearFromReleaseDate(album.released)} &middot;{" "}
          {album.genre} &middot; {formatDuration(album.durationSeconds)}
        </p>
        <p className="featured__blurb">{album.blurb}</p>
        <button type="button" className="featured__cta" onClick={() => onOpen(album)}>
          View details
        </button>
      </div>
    </section>
  );
};
