import { ref } from 'vue';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const devices = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useDevices() {
  async function fetchDevices() {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${API_BASE}/devices`);
      const json = await res.json();

      if (!json.success) {
        throw new Error("Backend returned error");
      }

      devices.value = json.data; // <--- IMPORTANT
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return { devices, loading, error, fetchDevices };
}
