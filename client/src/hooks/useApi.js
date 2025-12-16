import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { extractData } from "../utils/extractData";

const baseUrl = "http://localhost:3030";

export default function useApi(url, initialState) {
  const { user, isAuthenticated } = useContext(UserContext);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    request(url)
      .then((result) => setData(result))
      .catch((err) => setError(err.message));
  }, [url]);

  const request = async (url, method = "GET", data = null, config = {}) => {
    let options = {
      method,
      headers: {},
    };

    if (data) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    if (isAuthenticated) {
      options.headers = {
        ...options.headers,
        "X-Authorization": config.accessToken || user.accessToken,
      };
    }
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}${url}`, options);
      const result = await response.json();

      if (!response.ok) {
        const message = result.message || result.error || "Request failed";
        throw new Error(message);
      }

      return extractData(result);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { request, data, error, loading };
}
