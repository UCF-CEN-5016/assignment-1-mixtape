import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

beforeEach(() => {
  window.localStorage.clear();
});

describe("Mixtape", () => {
  it("lists the album catalogue on load", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Mixtape" })).toBeInTheDocument();
    expect(screen.getByText(/12 albums/)).toBeInTheDocument();
  });

  it("finds albums when the query matches the title's capitalisation", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search albums/i), "Blue");
    expect(screen.getByText(/2 albums/)).toBeInTheDocument();
  });

  it("finds albums regardless of the capitalisation typed", async () => {
    const user = userEvent.setup();
    render(<App />);
    // "Kind of Blue" and "Blue Train" both contain "blue"; searching should not
    // care that the user typed it in lower case.
    await user.type(screen.getByLabelText(/search albums/i), "blue");
    expect(screen.getByText(/2 albums/)).toBeInTheDocument();
  });

  it("matches an artist typed in lower case", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search albums/i), "coltrane");
    expect(screen.getByText(/4 albums/)).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search albums/i), "zzzz");
    expect(screen.getByText(/no albums match/i)).toBeInTheDocument();
  });
});
