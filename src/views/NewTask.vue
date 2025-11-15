<script setup lang="ts">
import { ref } from 'vue'
import { axiosInstance } from '@/axiosInstance'
import InputText from '@/components/InputText.vue'
import DropDown from '@/components/Dropdown.vue'

const formData = ref({
  title: '',
  description: '',
  priority: '',
  status: '',
  dateDue: '',
})

const priorityOptions = ['low', 'medium', 'high']
const statusOptions = ['pending', 'completed']

const submitForm = async (event: Event) => {
  event.preventDefault()
  await axiosInstance.post('tasks', formData.value)
}
</script>

<template>
  <main class="flex flex-col gap-5 p-5">
    <h2 class="text-4xl font-extrabold">New Task</h2>
    <form class="flex flex-col gap-4 mt-5" @submit="submitForm">
      <InputText id="title" label="Title" v-model="formData.title" required="" />
      <InputText id="description" label="Description" v-model="formData.description" />
      <DropDown
        id="priority"
        label="Priority"
        v-model="formData.priority"
        :options="priorityOptions"
      />
      <DropDown id="status" label="Status" v-model="formData.status" :options="statusOptions" />
      <InputText id="date-due" label="Date Due" type="date" v-model="formData.dateDue" />
      <button type="submit" class="bg-slate-500 text-white font-bold py-2 px-4 rounded-sm w-fit">
        Create Task
      </button>
    </form>
  </main>
</template>
