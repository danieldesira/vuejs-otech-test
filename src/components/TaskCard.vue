<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps(['task'])
</script>

<template>
  <RouterLink :to="`/edit-task/${task.id}`">
    <div class="flex flex-col gap-2 bg-slate-500 rounded-sm p-5">
      <strong class="font-bold text-[14px]">{{ task.title }}</strong>
      <span class="text-[12px]">{{ task.description }}</span>
      <span class="font-bold text-[12px]">{{ task.priority }}</span>
      <span class="font-bold text-[12px]">{{ task.status }}</span>
      <span class="font-light text-[12px]">{{ task.dueDate }}</span>
    </div>
  </RouterLink>
</template>
