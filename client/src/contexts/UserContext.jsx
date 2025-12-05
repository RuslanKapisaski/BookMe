import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  registerHandler() {},
  loginHandler() {},
  logoutHandler() {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function registerHandler(userName, email, password, repeatPassword) {
    const newUser = { userName, email, password, repeatPassword };

    fetch("http://localhost:3030/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result.user);
        return result.user;
      })
      .catch((err) => alert(err.message || "Register failed"));
  }

  function loginHandler(email, password) {
    const user = { email, password };

    fetch("http://localhost:3030/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        const userData = result.user;
        setUser(userData);
        return userData;
      })
      .catch((err) => alert(err.message || "Login failed"));
  }

  function logoutHandler() {
    const options = {
      method: "POST",
      credentials: "include",
    };

    return fetch("http://localhost:3030/api/auth/logout", options).finally(() =>
      setUser(null)
    );
  }

  const userContextValues = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const contextData = useContext(UserContext);
  return contextData;
}
