import { useEffect } from "react";
import { AlbumArt } from "./AlbumArt.jsx";
import { formatDuration, yearFromReleaseDate } from "../utils.js";

export const DetailModal = ({ album, onClose }) => {
  useEffect(() => {
    if (!album) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [album, onClose]);

  if (!album) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={album.title}>
      <div className="modal__panel">
        <AlbumArt album={album} size="hero" />
        <div className="modal__body">
          <h2>{album.title}</h2>
          <p className="modal__meta">
            {album.artist} &middot; {yearFromReleaseDate(album.released)} &middot;{" "}
            {album.genre} &middot; {formatDuration(album.durationSeconds)}
          </p>
          <p>{album.blurb}</p>
        </div>
        <button type="button" className="modal__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
