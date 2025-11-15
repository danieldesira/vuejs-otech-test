<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex bg-slate-500">
    <div class="flex gap-5 w-full">
      <nav class="flex gap-2 text-[12px] font-semibold">
        <RouterLink to="/">View Tasks</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
