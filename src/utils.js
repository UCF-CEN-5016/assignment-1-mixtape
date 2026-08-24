/**
 * Small pure helpers shared across the app.
 *
 * Everything in here is deliberately free of React so it can be unit tested
 * directly, without rendering anything.
 */

/**
 * Shorten `text` so that it is never longer than `max` characters, appending an
 * ellipsis when characters had to be dropped. Text that already fits should be
 * returned untouched.
 */
export const truncate = (text, max) => {
  if (typeof text !== "string") return "";
  return text.length >= max ? text.slice(0, max - 1) + "…" : text;
};

/** Turn an ISO date such as "1959-08-17" into just the year, "1959". */
export const yearFromReleaseDate = (released) => String(released).slice(0, 4);

/** Render a track length in seconds as "42 min" or "1 hr 39 min". */
export const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours} hr ${minutes % 60} min` : `${minutes} min`;
};

/** Pick one album at random, used for the featured slot at the top of the page. */
export const pickFeatured = (albums) => {
  if (!albums.length) return null;
  return albums[Math.floor(Math.random() * albums.length)];
};

/**
 * Filter `albums` down to those matching `query`, comparing against both the
 * album title and the artist name. An empty query returns everything.
 */
export const filterAlbums = (albums, query) => {
  const q = query.trim();
  if (!q) return albums;
  return albums.filter(
    (album) => album.title.includes(q) || album.artist.includes(q),
  );
};

/** Sort albums oldest-first by release date. */
export const byReleaseDate = (a, b) => a.released.localeCompare(b.released);
