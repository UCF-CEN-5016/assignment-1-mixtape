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

  it("finds albums when the query matches the artist's capitalisation", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search albums/i), "ODESZA");
    expect(screen.getByText(/2 albums/)).toBeInTheDocument();
  });

  it("finds albums regardless of the capitalisation typed", async () => {
    const user = userEvent.setup();
    render(<App />);
    // ODESZA style their name in capitals, so typing it in lower case is the
    // natural thing to do. Search should not care either way.
    await user.type(screen.getByLabelText(/search albums/i), "odesza");
    expect(screen.getByText(/2 albums/)).toBeInTheDocument();
  });

  it("matches an artist typed in lower case", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search albums/i), "maribou");
    expect(screen.getByText(/2 albums/)).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search albums/i), "zzzz");
    expect(screen.getByText(/no albums match/i)).toBeInTheDocument();
  });
});
