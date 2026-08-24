import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlbumCard } from "./AlbumCard.jsx";

const album = {
  id: 3,
  title: "When Will We Land?",
  artist: "Barry Can't Swim",
  released: "2023-10-20",
  genre: "Chill House",
  durationSeconds: 2820,
  colorFrom: "#123f3a",
  colorTo: "#3fa88f",
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
    expect(screen.getByText(/Barry Can't Swim/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  it("shows an 18 character title in full, with no ellipsis", () => {
    renderCard();
    expect(
      screen.getByRole("heading", { name: "When Will We Land?" }),
    ).toBeInTheDocument();
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
    expect(onToggleFavorite).toHaveBeenCalledWith(3);
  });
});
