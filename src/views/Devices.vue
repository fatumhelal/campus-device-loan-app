<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useDevices } from '@/composables/useDevices';
import { useAuth0 } from '@auth0/auth0-vue';

const { devices, loading, error, fetchDevices } = useDevices();
const { isAuthenticated } = useAuth0();

onMounted(fetchDevices);
watch(isAuthenticated, fetchDevices);
</script>

<template>
  <div class="devices-view">
    <h1>Devices</h1>

    <p v-if="loading">Loading devices…</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <ul v-else class="list">
      <li
        v-for="d in devices"
        :key="d.id ?? `${d.brand}-${d.model}`"
        class="card"
      >
        <strong class="title"> {{ d.brand }} {{ d.model }} </strong>

        <p><strong>Category:</strong> {{ d.category }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.devices-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

.list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background: #fff;
}

.title {
  display: block;
  margin-bottom: 0.5rem;
}

.error {
  color: #b00020;
  font-weight: 600;
}
</style>
