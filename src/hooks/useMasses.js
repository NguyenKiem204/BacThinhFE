import { useState, useEffect } from "react";
import { mockWeekMasses } from "../mocks/weekMasses";

export function useMasses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockWeekMasses);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading, error };
}
