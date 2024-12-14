<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    ref="myModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <b-form @submit="submitForm">
            <b-form-group id="input-group-2" label="Title:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.title"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Description:"
              label-for="input-2"
            >
              <b-form-textarea
                id="input-2"
                v-model="form.description"
                placeholder="Enter description"
                required
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Status:"
              label-for="input-4"
            >
              <b-form-select
                id="input-4"
                v-model="form.status"
                :options="statusOptions"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Priority:"
              label-for="input-5"
            >
              <b-form-select
                id="input-5"
                v-model="form.priority"
                :options="priorityOptions"
                required
              ></b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="submitForm">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import TaskService from "@/views/task/service/TaskService.ts";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";

const emit = defineEmits(["close", "success"]);
const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      status: "",
      priority: "",
    }),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const form = ref(props.form);

const title = computed(() => {
  return props.isEdit ? "Edit Task" : "Create Task";
});

const statusOptions = ref([
  { value: "pending", text: "Pending" },
  { value: "completed", text: "Completed" },
  { value: "cancelled", text: "Cancelled" },
]);

const priorityOptions = ref([
  { value: "low", text: "Low" },
  { value: "medium", text: "Medium" },
  { value: "high", text: "High" },
]);

const myModal = ref<HTMLElement | null>(null);

onMounted(() => {
  if (myModal.value) {
    const modal = new bootstrap.Modal(myModal.value);
    modal.show();
    myModal.value.addEventListener("hidden.bs.modal", () => {
      emit("close");
    });
  }
});

onBeforeUnmount(() => {
  if (myModal.value) {
    const modal = new bootstrap.Modal(myModal.value);
    modal.hide();
  }
});

const submitForm = async () => {
  try {
    if (props.isEdit) {
      await TaskService.update(form.value.id, form.value);
    } else {
      await TaskService.create(form.value);
    }

    const modal = new bootstrap.Modal(myModal.value);
    modal.hide();

    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }

    Swal.fire(
      `Task ${props.isEdit ? "updated" : "created"} successfully!`,
      "Success!",
      "success"
    );

    emit("close");
    emit("success");
  } catch (error) {
    if(error.response.status === 422) {
      Swal.fire(
        "Warning!",
        "The field are required",
        "warning"
      );
    } else {
      Swal.fire(
        "Error!",
        `There was a problem ${props.isEdit ? "updating" : "creating"} the task.`,
        "error"
      );
    }
  }
};


</script>

<style scoped>
</style>
