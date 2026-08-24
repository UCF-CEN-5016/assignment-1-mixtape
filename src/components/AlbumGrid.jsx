import { AlbumCard } from "./AlbumCard.jsx";

export const AlbumGrid = ({ albums, isFavorite, onToggleFavorite, onOpen }) => {
  if (!albums.length) {
    return <p className="empty">No albums match that search.</p>;
  }

  return (
    <div className="grid">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          isFavorite={isFavorite(album.id)}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};
