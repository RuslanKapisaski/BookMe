import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function registerHandler(values) {
    try {
      const res = await fetch("http://localhost:3030/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(res);

        throw new Error(data.error);
      }

      setUser(data.user);

      return { user: data.user };
    } catch (err) {
      throw err;
    }
  }

  // LOGIN
  async function loginHandler(values) {
    try {
      const res = await fetch("http://localhost:3030/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error || "Login failed" };
      }

      setUser(data.user);
      return { user: data.user };
    } catch (err) {
      throw err;
    }
  }

  async function logoutHandler() {
    await fetch("http://localhost:3030/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        registerHandler,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
