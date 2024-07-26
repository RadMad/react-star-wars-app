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
    count: 82,
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
      {
        name: "C-3PO",
        height: "167",
        mass: "75",
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a",
        url: "https://swapi.dev/api/people/2/",
        id: 2,
      },
      {
        name: "R2-D2",
        height: "96",
        mass: "32",
        hair_color: "n/a",
        skin_color: "white, blue",
        eye_color: "red",
        birth_year: "33BBY",
        gender: "n/a",
        url: "https://swapi.dev/api/people/3/",
        id: 3,
      },
      {
        name: "Darth Vader",
        height: "202",
        mass: "136",
        hair_color: "none",
        skin_color: "white",
        eye_color: "yellow",
        birth_year: "41.9BBY",
        gender: "male",
        url: "https://swapi.dev/api/people/4/",
        id: 4,
      },
      {
        name: "Leia Organa",
        height: "150",
        mass: "49",
        hair_color: "brown",
        skin_color: "light",
        eye_color: "brown",
        birth_year: "19BBY",
        gender: "female",
        url: "https://swapi.dev/api/people/5/",
        id: 5,
      },
      {
        name: "Owen Lars",
        height: "178",
        mass: "120",
        hair_color: "brown, grey",
        skin_color: "light",
        eye_color: "blue",
        birth_year: "52BBY",
        gender: "male",
        url: "https://swapi.dev/api/people/6/",
        id: 6,
      },
      {
        name: "Beru Whitesun lars",
        height: "165",
        mass: "75",
        hair_color: "brown",
        skin_color: "light",
        eye_color: "blue",
        birth_year: "47BBY",
        gender: "female",
        url: "https://swapi.dev/api/people/7/",
        id: 7,
      },
      {
        name: "R5-D4",
        height: "97",
        mass: "32",
        hair_color: "n/a",
        skin_color: "white, red",
        eye_color: "red",
        birth_year: "unknown",
        gender: "n/a",
        url: "https://swapi.dev/api/people/8/",
        id: 8,
      },
      {
        name: "Biggs Darklighter",
        height: "183",
        mass: "84",
        hair_color: "black",
        skin_color: "light",
        eye_color: "brown",
        birth_year: "24BBY",
        gender: "male",
        url: "https://swapi.dev/api/people/9/",
        id: 9,
      },
      {
        name: "Obi-Wan Kenobi",
        height: "182",
        mass: "77",
        hair_color: "auburn, white",
        skin_color: "fair",
        eye_color: "blue-gray",
        birth_year: "57BBY",
        gender: "male",
        url: "https://swapi.dev/api/people/10/",
        id: 10,
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
    (fetchCharacters as Mock).mockRejectedValue(new Error("Failed to fetch"));

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

    const nextPageButton = screen.getByRole("button", {
      name: /next/i,
    });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(String)
      );
    });
  });
});
