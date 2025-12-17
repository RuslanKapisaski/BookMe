import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router";
import Register from "./Register";
import { UserContext } from "../../contexts/UserContext";

//Мокване на useNavigate
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Register component", () => {
  it("Should show error when submitting empty form", async () => {
    //ААА pattern

    //Arrange
    const registerHandlerMock = vi.fn();

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ registerHandler: registerHandlerMock }}>
          <Register />
        </UserContext.Provider>
      </MemoryRouter>
    );

    //Act
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    //Assert
    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();

    expect(registerHandlerMock).not.toHaveBeenCalled();
  });
});
