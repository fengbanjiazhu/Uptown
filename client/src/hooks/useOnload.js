import { useState, useEffect } from "react";

function useOnload() {
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    window.addEventListener("load", (event) => {
      console.log("Page fully loaded");
      setOnLoad(true);
    });
  }, []);

  return { onLoad };
}

export default useOnload;
