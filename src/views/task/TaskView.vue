<template>
  <div class="px-5 mt-4">
    <div class="d-flex justify-content-end mb-5">
      <b-button variant="outline-danger" @click="logout" class="mb-3">
        Logout</b-button
      >
    </div>
    <div>
      <b-button variant="outline-success" @click="createTask" class="mb-3"
        >New Task</b-button
      >
    </div>
    <!-- Tabla -->
    <b-table
      :items="items"
      :fields="fields"
      striped
      hover
      responsive
      show-empty
      bordered
      class="text-center"
    >
      <template #cell(title)="{ value }">
        <p
          class="text-truncate"
          style="min-width: 300px; width: 300px"
          :title="value"
        >
          {{ value }}
        </p>
      </template>
      <template #cell(description)="{ value }">
        <p
          class="text-truncate"
          :title="value"
          style="min-width: 300px; width: 300px"
        >
          {{ value }}
        </p>
      </template>
      <template #cell(status)="{ value }">
        <b-badge class="text-uppercase" :variant="statusVariant(value)">{{
          value
        }}</b-badge>
      </template>
      <template #cell(priority)="{ value }">
        <b-badge class="text-uppercase" :variant="priorityVariant(value)">{{
          value
        }}</b-badge>
      </template>
      <template #cell(created_at)="{ value }">
        <p>{{ formatDate(value) }}</p>
      </template>
      <template #cell(updated_at)="{ value }">
        <p>{{ formatDate(value) }}</p>
      </template>
      <template #cell(actions)="{ item }">
        <div class="d-flex justify-content-center" style="gap: 15px">
          <b-button variant="outline-primary" size="sm" @click="editTask(item)">
            Editar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="deleteTask(item.id)"
          >
            Eliminar
          </b-button>
        </div>
      </template>
    </b-table>

    <!-- Paginación -->
    <b-pagination
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="perPage"
      aria-controls="table"
      class="mt-4"
    />

    <!-- Modal Create/Edit -->
    <CreateEdit
      v-if="showModal"
      title="Create/Edit Task"
      @close="closeModal"
      @success="getTask"
      :form="form"
      :isEdit="isEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import TaskService from "@/views/task/service/TaskService.ts";
import CreateEdit from "@/views/task/components/CreateEdit.vue";
import Swal from "sweetalert2";
import AuthService from "@/views/auth/service/AuthService.ts";
import { useRouter } from "vue-router";

interface Item {
  id: number;
  name: string;
  description: string;
}
const router = useRouter();
const items = ref<Item[]>([]);
const currentPage = ref<number>(1);
const perPage = 10;
const totalItems = ref<number>(0);
const showModal = ref(false); // Controla la visibilidad del modal
const fields = ref([
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "created_at", label: "Created At" },
  { key: "updated_at", label: "Updated At" },
  { key: "actions", label: "Actions" },
]);

const form = ref({
  name: "",
  description: "",
  status: "",
  priority: "",
});

const isEdit = ref(false);

const getTask = async () => {
  const { data } = await TaskService.getTasks(currentPage.value, perPage);
  items.value = data.data;
  totalItems.value = data.total;
};

const editTask = (item: Item) => {
  showModal.value = true;
  isEdit.value = true;
  form.value = {
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status,
    priority: item.priority,
  };
};

const createTask = () => {
  showModal.value = true;
  form.value = { title: "", description: "", status: "", priority: "" };
};

const closeModal = () => {
  showModal.value = false;
  isEdit.value = false;
};

const statusVariant = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "complete":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "primary";
  }
};

const priorityVariant = (priority: string) => {
  switch (priority) {
    case "low":
      return "warning";
    case "medium":
      return "success";
    case "high":
      return "danger";
    default:
      return "primary";
  }
};

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleDateString("en-EN", options);
};

const deleteTask = async (id: number) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      await TaskService.delete(id); // Asegúrate de que esta función sea asíncrona
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
      await getTask(); // Espera a que la tabla se actualice correctamente
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    Swal.fire("Error!", "There was a problem deleting the task.", "error");
  }
};

const logout = () => {
  AuthService.logout();
  router.push("/login");
  window.location.reload();
};

onMounted(async () => {
  await getTask();
});

watch(currentPage, async () => {
  await getTask();
});
</script>

<style scoped>
</style>
