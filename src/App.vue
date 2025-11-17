<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex bg-slate-500 h-16 items-center min-w-full px-5">
    <div class="flex gap-5 w-full">
      <nav class="flex gap-2 text-[24px] font-semibold">
        <RouterLink to="/" class="focus:bg-slate-950 rounded-sm">Tasks</RouterLink>
        <RouterLink to="/about" class="focus:bg-slate-950 rounded-sm">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
