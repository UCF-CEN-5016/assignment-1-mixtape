import { describe, expect, it } from "vitest";
import {
  byReleaseDate,
  filterAlbums,
  formatDuration,
  pickFeatured,
  truncate,
  yearFromReleaseDate,
} from "./utils.js";

const album = (title, artist = "Someone", released = "1959-01-01") => ({
  id: title,
  title,
  artist,
  released,
});

describe("truncate", () => {
  it("leaves short text alone", () => {
    expect(truncate("Time Out", 18)).toBe("Time Out");
  });

  it("shortens text that is longer than the limit", () => {
    expect(truncate("The Shape of Jazz to Come", 18)).toBe("The Shape of Jazz…");
  });

  it("never returns more characters than the limit", () => {
    expect(truncate("The Shape of Jazz to Come", 18)).toHaveLength(18);
  });

  it("leaves text that is exactly the limit alone", () => {
    // "Saxophone Colossus" is 18 characters, so it already fits and must not
    // be shortened.
    expect(truncate("Saxophone Colossus", 18)).toBe("Saxophone Colossus");
  });

  it("returns an empty string for non-string input", () => {
    expect(truncate(undefined, 10)).toBe("");
  });
});

describe("yearFromReleaseDate", () => {
  it("keeps only the year", () => {
    expect(yearFromReleaseDate("1959-08-17")).toBe("1959");
  });
});

describe("formatDuration", () => {
  it("formats a sub-hour running time in minutes", () => {
    expect(formatDuration(2793)).toBe("46 min");
  });

  it("formats a longer running time with hours", () => {
    expect(formatDuration(5946)).toBe("1 hr 39 min");
  });
});

describe("pickFeatured", () => {
  it("returns null when there is nothing to pick", () => {
    expect(pickFeatured([])).toBeNull();
  });

  it("always returns one of the albums it was given", () => {
    const albums = [album("A"), album("B"), album("C")];
    for (let i = 0; i < 50; i += 1) {
      expect(albums).toContain(pickFeatured(albums));
    }
  });
});

describe("filterAlbums", () => {
  it("returns everything for an empty query", () => {
    const albums = [album("Blue Train"), album("Time Out")];
    expect(filterAlbums(albums, "")).toHaveLength(2);
  });

  it("matches on title", () => {
    const albums = [album("Blue Train"), album("Time Out")];
    expect(filterAlbums(albums, "Blue")).toEqual([albums[0]]);
  });

  it("matches on artist", () => {
    const albums = [album("Blue Train", "John Coltrane"), album("Time Out", "Dave Brubeck")];
    expect(filterAlbums(albums, "Coltrane")).toEqual([albums[0]]);
  });
});

describe("byReleaseDate", () => {
  it("sorts oldest first", () => {
    const albums = [album("New", "x", "1970-01-01"), album("Old", "x", "1956-01-01")];
    expect(albums.slice().sort(byReleaseDate).map((a) => a.title)).toEqual(["Old", "New"]);
  });
});
