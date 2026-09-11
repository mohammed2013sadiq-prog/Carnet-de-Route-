import { apiBaseUrl } from '../constants/colors';
import { Trip } from '../models/Trip';

async function request(path, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    ...options,
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Une erreur est survenue.');
    }
    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Le serveur ne répond pas. Vérifiez que le backend est démarré.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getTrips() {
  const data = await request('/trips');
  return data.map(Trip.fromJson);
}

export async function getTrip(id) {
  return Trip.fromJson(await request(`/trips/${id}`));
}

export async function createTrip(trip) {
  const data = await request('/trips', {
    method: 'POST',
    body: JSON.stringify(trip),
  });
  return Trip.fromJson(data.trip);
}
