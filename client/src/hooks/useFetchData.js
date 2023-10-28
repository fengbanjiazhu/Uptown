import { useState, useEffect } from "react";

export const usePostJsonData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostData = async (url, inputData) => {
    const jsonData = JSON.stringify(inputData);
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message);
      return data;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchPostData };
};

export const useGetData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.message);
        const data = await res.json();

        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
