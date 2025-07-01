import { useState, useEffect } from "react";
import { mockPrayers } from "../mocks/prayers";

export function usePrayers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockPrayers);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading, error };
}
