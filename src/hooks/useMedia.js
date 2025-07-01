import { useState, useEffect } from "react";
import { mockMedia } from "../mocks/media";

export function useMedia() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockMedia);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading, error };
}
