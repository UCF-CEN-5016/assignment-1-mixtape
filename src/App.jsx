import { useMemo, useState } from "react";
import albums from "./data/albums.json";
import { FeaturedAlbum } from "./components/FeaturedAlbum.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { AlbumGrid } from "./components/AlbumGrid.jsx";
import { DetailModal } from "./components/DetailModal.jsx";
import { useFavorites } from "./hooks/useFavorites.js";
import { byReleaseDate, filterAlbums, pickFeatured } from "./utils.js";

const App = () => {
  const [query, setQuery] = useState("");
  const [openAlbum, setOpenAlbum] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toggle, isFavorite, favoriteIds } = useFavorites();

  // Chosen once per page load rather than on every keystroke.
  const featured = useMemo(() => pickFeatured(albums), []);

  const visible = useMemo(() => {
    const pool = showFavoritesOnly
      ? albums.filter((album) => favoriteIds.includes(album.id))
      : albums;
    return filterAlbums(pool, query).slice().sort(byReleaseDate);
  }, [query, showFavoritesOnly, favoriteIds]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__logo">Mixtape</h1>
        <button
          type="button"
          className={`header__filter ${showFavoritesOnly ? "is-on" : ""}`}
          onClick={() => setShowFavoritesOnly((on) => !on)}
          aria-pressed={showFavoritesOnly}
        >
          {showFavoritesOnly ? "★ Favorites" : "☆ Favorites"}
        </button>
      </header>

      <main>
        <FeaturedAlbum album={featured} onOpen={setOpenAlbum} />
        <SearchBar value={query} onChange={setQuery} resultCount={visible.length} />
        <AlbumGrid
          albums={visible}
          isFavorite={isFavorite}
          onToggleFavorite={toggle}
          onOpen={setOpenAlbum}
        />
      </main>

      <DetailModal album={openAlbum} onClose={() => setOpenAlbum(null)} />
    </div>
  );
};

export default App;
