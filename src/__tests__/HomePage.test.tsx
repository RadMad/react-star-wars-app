import { beforeEach, describe, expect, test, vi, Mock } from "vitest";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import { fetchCharacters } from "@/api/starWarsApi";
import { CharactersResponse } from "@/types/types";

// Mock the fetchCharacters API call
vi.mock("@/api/starWarsApi", () => ({
  fetchCharacters: vi.fn(),
}));

describe("HomePage", () => {
  const mockCharacters: CharactersResponse = {
    count: 1,
    results: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        url: "https://swapi.dev/api/people/1/",
        id: 1,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the HomePage with title", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });
    expect(screen.getByText("Star Wars Characters")).toBeDefined();
  });

  test("displays character data when fetched successfully", async () => {
    (fetchCharacters as Mock).mockResolvedValue(mockCharacters);

    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeDefined();
    });
  });

  test("displays no data message when no characters are found", async () => {
    (fetchCharacters as Mock).mockResolvedValue({ count: 0, results: [] });

    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("No data available")).toBeDefined();
    });
  });

  test("updates the search query", async () => {
    (fetchCharacters as Mock).mockResolvedValue(mockCharacters);

    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "Darth" } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Darth")).toBeDefined();
    });
  });

  test("displays loading spinner while fetching data", async () => {
    (fetchCharacters as Mock).mockReturnValue(new Promise(() => {}));

    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    expect(screen.getAllByRole("progressbar")).toBeDefined();
  });

  test("displays error message if fetching data fails", async () => {
    (fetchCharacters as Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred while fetching data.")
      ).toBeDefined();
    });
  });

  test("handles pagination correctly", async () => {
    (fetchCharacters as Mock).mockResolvedValue(mockCharacters);

    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeDefined();
    });

    expect(fetchCharacters).toHaveBeenCalledWith(1, "");

    const nextPageButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(String)
      );
    });
  });
});
