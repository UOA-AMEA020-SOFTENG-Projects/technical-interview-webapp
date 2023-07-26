import { useState, useEffect, useRef } from "react";

const useUpdateSolution = (problemId, requiresAuth = false, authToken = "", initialLanguage = "python3", initialCode = "") => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reFetchToggle, setReFetchToggle] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode);

  const BaseURL = import.meta.env.VITE_API_BASE_URL;

  // Initialize useRef with true
  const firstUpdate = useRef(true);

  useEffect(() => {
    // On the first render, firstUpdate.current will be true
    // After the first render, firstUpdate.current will be false
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const headers = requiresAuth
        ? { "Authorization": `Bearer ${authToken}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };

      const requestUrl = `${BaseURL}/editor/${problemId}/saveSolution?language_id=${language}`;
      const body = JSON.stringify({ code });

      try {
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: headers,
          body: body
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
  }, [problemId, requiresAuth, authToken, reFetchToggle, language, code, BaseURL]);

  const updateLanguageAndCode = (newLanguage, newCode) => {
    setLanguage(newLanguage);
    setCode(newCode);
    setReFetchToggle(prev => !prev);
  }

  return { data, isLoading, error, updateLanguageAndCode };
};

export default useUpdateSolution;
