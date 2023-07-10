import { useState, useEffect } from "react";

const useSolution = (url, method, requiresAuth = false, authToken = "") => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const headers = requiresAuth
        ? { "Authorization": `Bearer ${authToken}` }
        : {};

      try {
        const response = await fetch(url, {
          method: method,
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method, requiresAuth, authToken]);

  return { data, isLoading, error };
};

export default useSolution;
