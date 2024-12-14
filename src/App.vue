<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import AuthService from "@/views/auth/service/AuthService.ts";

const isAuthenticated = ref(false);

onMounted(() => {
  isAuthenticated.value = AuthService.isAuthenticated();
});
</script>

<template>
  <!-- Barra de navegación -->
  <b-navbar toggleable="lg" variant="primary" bg="primary">
    <b-navbar-brand href="#">My App</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isAuthenticated">
          <RouterLink to="/login" class="nav-link">Login</RouterLink>
        </b-nav-item>
        
        <b-nav-item v-if="!isAuthenticated">
          <RouterLink to="/register" class="nav-link">Register</RouterLink>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <RouterView />
</template>

<style scoped>
</style>
