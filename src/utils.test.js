import { describe, expect, it } from "vitest";
import {
  byReleaseDate,
  filterAlbums,
  formatDuration,
  pickFeatured,
  truncate,
  yearFromReleaseDate,
} from "./utils.js";

const album = (title, artist = "Someone", released = "2020-01-01") => ({
  id: title,
  title,
  artist,
  released,
});

describe("truncate", () => {
  it("leaves short text alone", () => {
    expect(truncate("Isles", 18)).toBe("Isles");
  });

  it("shortens text that is longer than the limit", () => {
    expect(truncate("Cold Enough for Snow", 18)).toBe("Cold Enough for S…");
  });

  it("never returns more characters than the limit", () => {
    expect(truncate("Cold Enough for Snow", 18)).toHaveLength(18);
  });

  it("leaves text that is exactly the limit alone", () => {
    // "When Will We Land?" is 18 characters, so it already fits and must not
    // be shortened.
    expect(truncate("When Will We Land?", 18)).toBe("When Will We Land?");
  });

  it("returns an empty string for non-string input", () => {
    expect(truncate(undefined, 10)).toBe("");
  });
});

describe("yearFromReleaseDate", () => {
  it("keeps only the year", () => {
    expect(yearFromReleaseDate("2017-09-08")).toBe("2017");
  });
});

describe("formatDuration", () => {
  it("formats a sub-hour running time in minutes", () => {
    expect(formatDuration(2760)).toBe("46 min");
  });

  it("formats a longer running time with hours", () => {
    expect(formatDuration(3720)).toBe("1 hr 2 min");
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
    const albums = [album("Isles"), album("Cascade")];
    expect(filterAlbums(albums, "")).toHaveLength(2);
  });

  it("matches on title", () => {
    const albums = [album("Isles"), album("Cascade")];
    expect(filterAlbums(albums, "Isles")).toEqual([albums[0]]);
  });

  it("matches on artist", () => {
    const albums = [album("Isles", "Bicep"), album("Cascade", "Floating Points")];
    expect(filterAlbums(albums, "Bicep")).toEqual([albums[0]]);
  });
});

describe("byReleaseDate", () => {
  it("sorts oldest first", () => {
    const albums = [album("New", "x", "2024-01-01"), album("Old", "x", "2017-01-01")];
    expect(albums.slice().sort(byReleaseDate).map((a) => a.title)).toEqual(["Old", "New"]);
  });
});
