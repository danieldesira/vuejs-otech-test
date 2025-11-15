<script setup lang="ts">
import { axiosInstance } from '@/axiosInstance'
import type { Task } from '@/interfaces'
import { ref, onMounted } from 'vue'
import TaskCard from '@/components/TaskCard.vue'

const tasks = ref<Task[]>([])

onMounted(async () => {
  const response = await axiosInstance.get<Task[]>('tasks')
  tasks.value = response.data
})
</script>

<template>
  <main class="flex flex-wrap gap-5 p-5">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    <RouterLink to="/new-task">
      <div
        class="fixed bottom-5 right-5 rounded-[60px] w-[60px] h-[60px] bg-slate-500 flex justify-center items-center"
      >
        <i class="pi pi-plus text-white text-5xl"></i>
      </div>
    </RouterLink>
  </main>
</template>
