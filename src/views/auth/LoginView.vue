<template>
  <div class="container mt-5">
    <b-card title="Login User" class="w-50 mx-auto">
      <b-form @submit="onSubmit">
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

        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex justify-content-center gap-1">
          <b-button type="submit" variant="primary">Login</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AuthService from "@/views/auth/service/AuthService.ts";
import { useRouter } from "vue-router"; 

const form = ref({
  email: "",
  password: "",
});

const router = useRouter();

const onSubmit = async (event) => {
  event.preventDefault();
  
  await AuthService.login(form.value);
  
  router.push("/main");
  window.location.reload();
};
</script>

<style scoped>
</style>
