<script setup lang="ts">
defineProps(['task'])
</script>

<template>
  <div class="flex flex-col gap-2 bg-slate-500 rounded-sm p-2">
    <strong class="font-bold text-[14px]">{{ task.title }}</strong>
    <span class="text-[12px]">{{ task.description }}</span>
  </div>
</template>
