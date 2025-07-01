import { useState, useEffect } from "react";
import { mockNews } from "../mocks/news";

export function useNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockNews);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading, error };
}
