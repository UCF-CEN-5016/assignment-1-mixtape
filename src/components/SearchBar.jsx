export const SearchBar = ({ value, onChange, resultCount }) => (
  <div className="search">
    <label className="search__label" htmlFor="album-search">
      Search albums
    </label>
    <input
      id="album-search"
      className="search__input"
      type="search"
      placeholder="Try an artist or a title..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    <p className="search__count" role="status">
      {resultCount} {resultCount === 1 ? "album" : "albums"}
    </p>
  </div>
);
