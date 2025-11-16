<script setup lang="ts">
defineProps(['label', 'id', 'options'])
defineEmits(['update:modelValue'])
defineModel<string>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-[12px] font-semibold" :for="id">{{ label }}</label>
    <select
      class="border border-slate-500 rounded-sm p-2 w-full h-10"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        class="capitalize text-slate-700"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>
