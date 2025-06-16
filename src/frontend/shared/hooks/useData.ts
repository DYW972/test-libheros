import { useState } from 'react';
import { Types, Functions } from '@/shared';

export function useFetchData<T extends Types.TTasksList | Types.TTask>() {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async (endPoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Functions.fetchData<T>(endPoint);
      if (response.success === true && Array.isArray(response.data)) {
        setData(response.data);
      } else {
        throw new Error('Invalid data received');
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown fetch error');
      setError(error);
      setData(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    setData,
    fetch,
    loading,
    error,
  };
}
