import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlbumCard } from "./AlbumCard.jsx";

const album = {
  id: 4,
  title: "Saxophone Colossus",
  artist: "Sonny Rollins",
  released: "1956-06-22",
  genre: "Hard Bop",
  durationSeconds: 2340,
  colorFrom: "#000",
  colorTo: "#fff",
  blurb: "…",
};

const renderCard = (overrides = {}) => {
  const props = {
    album,
    isFavorite: false,
    onToggleFavorite: vi.fn(),
    onOpen: vi.fn(),
    ...overrides,
  };
  render(<AlbumCard {...props} />);
  return props;
};

describe("AlbumCard", () => {
  it("shows the artist and release year", () => {
    renderCard();
    expect(screen.getByText(/Sonny Rollins/)).toBeInTheDocument();
    expect(screen.getByText(/1956/)).toBeInTheDocument();
  });

  it("shows an 18 character title in full, with no ellipsis", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: "Saxophone Colossus" })).toBeInTheDocument();
  });

  it("reports the album when opened", async () => {
    const user = userEvent.setup();
    const { onOpen } = renderCard();
    await user.click(screen.getByRole("button", { name: /open details/i }));
    expect(onOpen).toHaveBeenCalledWith(album);
  });

  it("toggles favorite state", async () => {
    const user = userEvent.setup();
    const { onToggleFavorite } = renderCard();
    await user.click(screen.getByRole("button", { name: /add .* to favorites/i }));
    expect(onToggleFavorite).toHaveBeenCalledWith(4);
  });
});
