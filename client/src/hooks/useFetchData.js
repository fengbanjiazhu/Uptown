import { useState, useEffect } from "react";

const postOptions = (jsonData) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
};

const patchOptions = (jsonData, userToken) => {
  return {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
    body: jsonData,
  };
};

export const usePostJsonData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostData = async (url, inputData, options = "POST", userToken = undefined) => {
    const jsonData = JSON.stringify(inputData);
    setIsLoading(true);
    try {
      let res;
      if (options === "POST") {
        res = await fetch(url, postOptions(jsonData));
      }
      if (options === "PATCH" && userToken) {
        res = await fetch(url, patchOptions(jsonData, userToken));
      }
      // const res = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: jsonData,
      // });
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
