import { beforeEach, describe, expect, test, vi, Mock } from "vitest";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterPage from "@/pages/CharacterPage";
import useFetchCharacter from "@/hooks/useFetchCharacter";

// Mock the useFetchCharacter hook
vi.mock("@/hooks/useFetchCharacter");

describe("CharacterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading spinner while fetching data", async () => {
    (useFetchCharacter as Mock).mockReturnValue({
      character: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeDefined();
  });

  test("renders error message if fetching data fails", async () => {
    (useFetchCharacter as Mock).mockReturnValue({
      character: null,
      loading: false,
      error: "Failed to fetch",
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch")).toBeDefined();
    });
  });
});
