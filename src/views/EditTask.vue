<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { axiosInstance } from '@/axiosInstance'
import InputText from '@/components/InputText.vue'
import DropDown from '@/components/DropDown.vue'
import type { Task } from '@/interfaces'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { useToast } from 'vue-toast-notification'
import router from '@/router'

const route = useRoute()
const taskId = route.params.id
const $toast = useToast()

const formData = ref({
  title: '',
  description: '',
  priority: '',
  status: '',
  dateDue: '',
})
const isWaiting = ref(false)

const priorityOptions = ['low', 'medium', 'high']
const statusOptions = ['pending', 'completed']

const submitForm = async (event: Event) => {
  event.preventDefault()
  isWaiting.value = true
  try {
    await axiosInstance.put(`tasks/${taskId}`, formData.value)
    $toast.success('Task updated successfully.')
  } catch {
    $toast.error('Failed to fetch task details.')
  } finally {
    isWaiting.value = false
  }
}

onMounted(async () => {
  isWaiting.value = true
  try {
    const response = await axiosInstance.get<Task>(`tasks/${taskId}`)
    const task = response.data
    formData.value = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dateDue: task.dueDate,
    }
  } catch {
    $toast.error('Failed to fetch task details.')
  } finally {
    isWaiting.value = false
  }
})

const deleteTask = async () => {
  isWaiting.value = true
  try {
    await axiosInstance.delete(`tasks/${taskId}`)
    router.push({ path: '/' })
  } catch {
    $toast.error('Failed to fetch task details.')
  } finally {
    isWaiting.value = false
  }
}
</script>

<template>
  <main class="flex flex-col gap-5 p-5">
    <h2 class="text-4xl font-extrabold">Edit Task</h2>
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
        Update Task
      </button>
      <button
        type="button"
        class="bg-red-500 text-white font-bold py-2 px-4 rounded-sm w-fit"
        @click="deleteTask"
      >
        Delete Task
      </button>
    </form>
    <LoadingOverlay v-if="isWaiting" />
  </main>
</template>
