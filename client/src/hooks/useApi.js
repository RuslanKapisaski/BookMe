import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { extractData } from "../utils/extractData";

const baseUrl = "http://localhost:3030";

export default function useApi() {
  const { user, isAuthenticated } = useContext(UserContext);

  const request = async (url, method = "GET", body = null, config = {}) => {
    let options = {
      method,
      headers: {},
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    if (isAuthenticated) {
      options.headers = {
        ...options.headers,
        "X-Authorization": config.accessToken || user.accessToken,
      };
    }

    const response = await fetch(`${baseUrl}${url}`, options);

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || "Request failed");
    }

    return extractData(result);
  };

  return { request };
}
