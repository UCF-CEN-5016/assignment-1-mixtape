import { AlbumArt } from "./AlbumArt.jsx";
import { truncate, yearFromReleaseDate } from "../utils.js";

/** Longest album title we show in full on a card before shortening it. */
const TITLE_MAX_LENGTH = 18;

export const AlbumCard = ({ album, isFavorite, onToggleFavorite, onOpen }) => (
  <article className="card">
    <button
      type="button"
      className="card__button"
      onClick={() => onOpen(album)}
      aria-label={`Open details for ${album.title}`}
    >
      <AlbumArt album={album} />
      <h3 className="card__title" title={album.title}>
        {truncate(album.title, TITLE_MAX_LENGTH)}
      </h3>
      <p className="card__meta">
        {album.artist} &middot; {yearFromReleaseDate(album.released)}
      </p>
    </button>
    <button
      type="button"
      className={`card__fav ${isFavorite ? "is-on" : ""}`}
      onClick={() => onToggleFavorite(album.id)}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remove ${album.title} from favorites`
          : `Add ${album.title} to favorites`
      }
    >
      {isFavorite ? "★" : "☆"}
    </button>
  </article>
);
