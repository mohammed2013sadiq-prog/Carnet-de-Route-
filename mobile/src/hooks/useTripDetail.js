import { useCallback, useEffect, useState } from 'react';
import { getTrip } from '../services/apiService';

export function useTripDetail(id) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTrip = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setTrip(await getTrip(id));
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTrip();
  }, [loadTrip]);

  return { trip, loading, error, reload: loadTrip };
}
