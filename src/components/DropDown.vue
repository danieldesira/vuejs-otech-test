<script setup lang="ts">
defineProps(['label', 'id', 'options'])
defineEmits(['update:modelValue'])
defineModel<string>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-[12px] font-semibold" :for="id">{{ label }}</label>
    <select
      class="border border-slate-500 rounded-sm p-2 w-full"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
