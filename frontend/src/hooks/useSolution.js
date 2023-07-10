import { useState, useEffect } from "react";

const useSolution = (url, method, requiresAuth = false, authToken = "", initialLanguage = "python3") => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reFetchToggle, setReFetchToggle] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  
  console.log("-----------------------------");
  console.log(language, 11);
  console.log("-----------------------------");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const headers = requiresAuth
        ? { "Authorization": `Bearer ${authToken}` }
        : {};

      const requestUrl = `${url}?language=${language}`;

      try {
        const response = await fetch(requestUrl, {
          method: method,
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        console.log(37)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method, requiresAuth, authToken, reFetchToggle, language]);

  const refetch = () => setReFetchToggle(prev => !prev);

  return { data, isLoading, error, refetch, setLanguage };
};

export default useSolution;
