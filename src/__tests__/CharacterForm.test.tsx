import { beforeEach, describe, expect, test, vi, Mock } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer, toast } from "react-toastify";
import CharacterForm from "@/components/character/CharacterForm";
import { Character } from "@/types/types";
import { db } from "@/db";
import "@testing-library/jest-dom";

// Mock the toast notifications
vi.mock("react-toastify", async () => {
  const actualModule = await vi.importActual("react-toastify");
  return {
    ...actualModule,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

// Mock the db
vi.mock("@/db", () => ({
  db: {
    characters: {
      put: vi.fn(),
    },
  },
}));

const mockCharacter: Character = {
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
};

describe("CharacterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders form fields with character data", () => {
    render(<CharacterForm character={mockCharacter} characterId={1} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mass/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hair color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/skin color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/eye color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birth year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
  });

  test("shows success toast and updates form on successful save", async () => {
    render(
      <>
        <CharacterForm character={mockCharacter} characterId={1} />
        <ToastContainer />
      </>
    );

    const nameInput = screen.getByLabelText(/name/i);
    await act(async () => {
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "New Name");
      fireEvent.change(nameInput, { target: { value: "New Name" } });
    });

    const saveButton = screen.getByRole("button", { name: /save/i });
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });

    await act(async () => {
      await userEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(db.characters.put).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockCharacter,
          name: "New Name",
          id: 1,
        })
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Character saved successfully!"
      );
    });

    expect(saveButton).toBeDisabled();
  });

  test("shows error toast on failed save", async () => {
    (db.characters.put as Mock).mockRejectedValue(new Error("Save failed"));

    render(
      <>
        <CharacterForm character={mockCharacter} characterId={1} />
        <ToastContainer />
      </>
    );

    const nameInput = screen.getByLabelText(/name/i);
    await act(async () => {
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "New Name");
      fireEvent.change(nameInput, { target: { value: "New Name" } });
    });

    const saveButton = screen.getByRole("button", { name: /save/i });
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });

    await act(async () => {
      await userEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to save character.");
    });
  });

  test("disables save button if form is not dirty", () => {
    render(<CharacterForm character={mockCharacter} characterId={1} />);

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });
});
