<script setup lang="ts">
import { onMounted } from 'vue';
import { useDevices } from '@/composables/useDevices';

const { devices, loading, error, fetchDevices } = useDevices();

onMounted(() => {
  fetchDevices();
});
</script>

<template>
  <div class="devices-view">
    <h1>Available Devices</h1>

    <div v-if="loading">Loading devices…</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <ul v-else class="list">
      <li v-for="d in devices" :key="d.id" class="card">
        <strong>{{ d.name }}</strong>
        <p>Type: {{ d.type }}</p>
        <p>Status: <b :style="{ color: d.isAvailable ? 'green' : 'red' }">
          {{ d.isAvailable ? "Available" : "Unavailable" }}
        </b></p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.devices-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}
.list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}
</style>
