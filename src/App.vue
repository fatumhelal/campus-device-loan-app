<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
</script>

<template>
  <div>
    <header class="topbar">
      <div class="brand">Campus Device Loan</div>

      <div class="actions">
        <button
          v-if="!isAuthenticated && !isLoading"
          @click="loginWithRedirect()"
        >
          Login
        </button>

        <button
          v-else-if="isAuthenticated"
          @click="
            logout({ logoutParams: { returnTo: window.location.origin } })
          "
        >
          Logout
        </button>

        <span v-else>Loading…</span>
      </div>
    </header>

    <router-view />
  </div>
</template>
