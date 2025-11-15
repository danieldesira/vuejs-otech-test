<script setup lang="ts">
import { axiosInstance } from '@/axiosInstance'
import type { Task } from '@/interfaces'
import { ref, onMounted, watch } from 'vue'
import TaskCard from '@/components/TaskCard.vue'
import InputText from '@/components/InputText.vue'

const tasks = ref<Task[]>([])
const searchQuery = ref()

const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get<Task[]>('tasks')
    tasks.value = response.data
  } finally {
  }
}

onMounted(async () => await fetchTasks())

watch(searchQuery, async (newQuery) => {
  if (newQuery) {
    tasks.value = tasks.value.filter(
      (task) =>
        task.title.toLowerCase().includes(newQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(newQuery.toLowerCase()),
    )
  } else {
    await fetchTasks()
  }
})
</script>

<template>
  <main class="flex flex-wrap gap-5 p-5">
    <section class="flex gap-1">
      <InputText id="search" label="Search Tasks" v-model="searchQuery" />
    </section>
    <section class="flex flex-wrap gap-5">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </section>
    <RouterLink to="/new-task">
      <div
        class="fixed bottom-5 right-5 rounded-[60px] w-[60px] h-[60px] bg-slate-500 flex justify-center items-center"
      >
        <i class="pi pi-plus text-white text-5xl"></i>
      </div>
    </RouterLink>
  </main>
</template>
