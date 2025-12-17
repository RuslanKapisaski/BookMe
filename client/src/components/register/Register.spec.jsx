import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import * as ReactRouter from "react-router";
import Register from "./Register";
import { act } from "react";
import { UserContext } from "../../contexts/UserContext";

describe("Register component", () => {
  let registerHandlerMock;
  let mockNavigate;

  const renderRegister = () =>
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ registerHandler: registerHandlerMock }}>
          <Register />
        </UserContext.Provider>
      </MemoryRouter>
    );

  beforeEach(() => {
    registerHandlerMock = vi.fn();
    mockNavigate = vi.fn();
    vi.spyOn(ReactRouter, "useNavigate").mockReturnValue(mockNavigate);


    renderRegister();
  });

  describe("Unhappy path", () => {
    it("Should show error when submitting empty form", async () => {
      //Act
      fireEvent.click(screen.getByRole("button", { name: /register/i }));

      //Assert
      expect(
        await screen.findByText(/username is required/i)
      ).toBeInTheDocument();
      expect(registerHandlerMock).not.toHaveBeenCalled();
    });

    it("Should show error when submitting with invalid email", async () => {
      //Act
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "ivancho" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "ivanchotestabv.bg" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.change(screen.getByLabelText("Repeat Password"), {
        target: { value: "123456" },
      });

      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /register/i }));
      });

      //Assert
      const errorEl = await screen.findByText(/invalid email/i, {
        selector: "p",
      });
      expect(errorEl).toBeInTheDocument();
      expect(registerHandlerMock).not.toHaveBeenCalled();
    });

    it("Should show error when passwords mismatch", async () => {
      //Act
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "ivancho" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "ivanchotest@abv.bg" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.change(screen.getByLabelText("Repeat Password"), {
        target: { value: "12345" },
      });

      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /register/i }));
      });

      //Assert
      const errorEl = await screen.findByText(/passwords mismatch!/i, {
        selector: "p",
      });
      expect(errorEl).toBeInTheDocument();
      expect(registerHandlerMock).not.toHaveBeenCalled();
    });
  });

  describe("Happy path", () => {
    it("Should redirect to homepage after submit with valid data", async () => {
      //Act
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "ivancho" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "ivanchotest@abv.bg" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.change(screen.getByLabelText("Repeat Password"), {
        target: { value: "123456" },
      });

      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /register/i }));
      });

      //Assert
      expect(registerHandlerMock).toHaveBeenCalledWith({
        username: "ivancho",
        email: "ivanchotest@abv.bg",
        password: "123456",
        repeatPassword: "123456",
      });

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
