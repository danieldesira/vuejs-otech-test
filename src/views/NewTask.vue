<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { axiosInstance } from '@/axiosInstance'
import InputText from '@/components/InputText.vue'
import DropDown from '@/components/DropDown.vue'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const formData = ref({
  title: '',
  description: '',
  priority: '',
  status: '',
  dateDue: '',
})
const isWaiting = ref(false)

const $toast = useToast()

const priorityOptions = ['low', 'medium', 'high']
const statusOptions = ['pending', 'completed']

const getTimestampWithoutTime = (timestamp: number) => {
  const date = new Date(timestamp)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

const validateForm = () => {
  if (
    formData.value.dateDue &&
    Date.parse(formData.value.dateDue) < getTimestampWithoutTime(Date.now())
  ) {
    $toast.error('Due date cannot be in the past.')
    return false
  }
  return true
}

const submitForm = async (event: Event) => {
  event.preventDefault()

  if (!validateForm()) {
    return
  }

  isWaiting.value = true
  try {
    await axiosInstance.post('tasks', formData.value)
    $toast.success('Task created successfully.')
    router.push('/')
  } catch {
    $toast.error('Failed to create task.')
  } finally {
    isWaiting.value = false
  }
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
