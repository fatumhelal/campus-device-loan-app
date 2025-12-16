import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function useDevices() {
  const devices = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function fetchDevices() {
    loading.value = true;
    error.value = null;

    let url = `${API_BASE}/public/devices`;
    const headers: Record<string, string> = {};

    console.info('[Devices] Fetch started', {
      authenticated: isAuthenticated.value,
    });

    try {
      if (isAuthenticated.value) {
        const token = await getAccessTokenSilently();
        url = `${API_BASE}/devices`;
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      devices.value = await res.json();
    } catch (e: any) {
      console.error('[Devices] Fetch failed', e);
      error.value = e.message ?? 'Failed to load devices';
    } finally {
      loading.value = false;
    }
  }

  return { devices, loading, error, fetchDevices };
}
