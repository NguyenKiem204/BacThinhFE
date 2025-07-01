import { useState, useEffect } from "react";
import { mockEvents } from "../mocks/events";

export function useEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockEvents);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading, error };
}
