<script setup lang="ts">
import { axiosInstance } from '@/axiosInstance'
import type { Task } from '@/interfaces'
import { reactive } from 'vue'

const tasks = reactive((await axiosInstance.get<Task[]>('tasks')).data)
</script>

<template>
  <main class="flex gap-2">
    <TaskCard v-for="task in tasks" :key="task.title" :task="task" />
  </main>
</template>
