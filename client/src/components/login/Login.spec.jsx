import { render, screen, fireEvent, findByText } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import * as ReactRouter from "react-router";
import Login from "./Login";
import { act } from "react";
import { UserContext } from "../../contexts/UserContext";

describe("Login component", () => {
  let loginHandlerMock;
  let mockNavigate;

  const renderLogin = () =>
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ loginHandler: loginHandlerMock }}>
          <Login />
        </UserContext.Provider>
      </MemoryRouter>
    );

  beforeEach(() => {
    loginHandlerMock = vi.fn();
    mockNavigate = vi.fn();
    vi.spyOn(ReactRouter, "useNavigate").mockReturnValue(mockNavigate);

    renderLogin();
  });

  describe("Unhappy path", () => {
    it("Should show error when submitting empty form", async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));

      expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
      expect(loginHandlerMock).not.toHaveBeenCalled();
    });

    it("Should show error when submitting only email", async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "ivancho@abv.com" },
      });

      fireEvent.click(screen.getByRole("button", { name: /login/i }));

      expect(
        await screen.findByText(/password is required/i)
      ).toBeInTheDocument();
      expect(loginHandlerMock).not.toHaveBeenCalled();
    });
  });

  describe("Happy path", () => {
    it("Should redirect to homepage after successful login", () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "ivancho@abv.com" },
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "123456" },
      });

      fireEvent.click(screen.getByRole("button", { name: /login/i }));

      expect(loginHandlerMock).toHaveBeenCalled();
      expect(mockNavigate("/"));
    });
  });
});
