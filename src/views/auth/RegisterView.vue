<template>
  <div class="container mt-5">
    <b-card title="Register User" class="w-50 mx-auto">
      <b-form @submit="onSubmit">
        <!-- Campo de Nombre -->
        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Enter your name"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Campo de Email -->
        <b-form-group
          id="input-group-2"
          label="Email address"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Campo de Contraseña -->
        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Campo de Confirmación de Contraseña -->
        <b-form-group
          id="input-group-4"
          label="Confirm Password"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.password_confirmation"
            type="password"
            placeholder="Confirm your password"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Botones -->
        <div class="d-flex justify-content-center gap-1">
          <b-button type="submit" variant="primary">Create</b-button>
          <b-button type="reset" variant="danger" class="ml-2">Reset</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup>

import { ref } from "vue";
import AuthService from "@/views/auth/service/AuthService.ts";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const onSubmit = async (event) => {
  event.preventDefault();
  await AuthService.register(form.value);
  router.push("/main");
  window.location.reload();
};
</script>

<style scoped>
</style>
