<script setup lang="ts">
import { axiosInstance } from '@/axiosInstance'
import type { Task } from '@/interfaces'
import { ref, onMounted, watch } from 'vue'
import TaskCard from '@/components/TaskCard.vue'
import InputText from '@/components/InputText.vue'
import DropDown from '@/components/DropDown.vue'
import { useToast } from 'vue-toast-notification'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const tasks = ref<Task[]>([])
const searchFormData = ref({
  titleFilter: '',
  descriptionFilter: '',
  statusFilter: '',
  priorityFilter: '',
  dueDateFilter: '',
})
const selectedSort = ref('')
const isLoading = ref(false)

const statusOptions = ['', 'pending', 'completed']

const priorityOptions = ['', 'low', 'medium', 'high']

const sortOptions = [
  { label: 'Title Ascending', value: 'title_asc' },
  { label: 'Title Descending', value: 'title_desc' },
  { label: 'Due Date Ascending', value: 'dateDue_asc' },
  { label: 'Due Date Descending', value: 'dateDue_desc' },
]

const $toast = useToast()

const fetchAllTasks = async () => {
  isLoading.value = true
  try {
    const response = await axiosInstance.get<Task[]>('tasks')
    tasks.value = response.data
  } catch {
    $toast.error('Failed to fetch tasks.')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => await fetchAllTasks())

watch(
  searchFormData,
  async (newQuery) => {
    if (
      newQuery.titleFilter ||
      newQuery.statusFilter ||
      newQuery.descriptionFilter ||
      newQuery.dueDateFilter ||
      newQuery.priorityFilter
    ) {
      tasks.value = (
        await axiosInstance.get<Task[]>('tasks', {
          params: {
            title: newQuery.titleFilter,
            description: newQuery.descriptionFilter,
            status: newQuery.statusFilter || undefined,
            dueDate: newQuery.dueDateFilter || undefined,
            priority: newQuery.priorityFilter || undefined,
          },
        })
      ).data
    } else {
      await fetchAllTasks()
    }
  },
  { deep: true },
)

watch(selectedSort, async (newQuery) => {
  if (newQuery) {
    tasks.value = tasks.value.sort((a, b) => {
      switch (newQuery) {
        case 'title_asc':
          return a.title.localeCompare(b.title)
        case 'title_desc':
          return b.title.localeCompare(a.title)
        case 'dateDue_asc':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case 'dateDue_desc':
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        default:
          return 0
      }
    })
  } else {
    await fetchAllTasks()
  }
})
</script>

<template>
  <main class="flex flex-wrap gap-5 p-5">
    <section class="flex flex-col gap-1">
      <section class="flex gap-1">
        <InputText
          id="search-title"
          label="Search Tasks by Title"
          v-model="searchFormData.titleFilter"
        />
        <InputText
          id="search-description"
          label="Search Tasks by Description"
          v-model="searchFormData.descriptionFilter"
        />
        <DropDown
          id="filter-status"
          label="Filter by Status"
          v-model="searchFormData.statusFilter"
          :options="statusOptions"
        />
        <DropDown
          id="filter-priority"
          label="Filter by Priority"
          v-model="searchFormData.priorityFilter"
          :options="priorityOptions"
        />
        <InputText
          id="filter-due-date"
          label="Filter by Due Date"
          type="date"
          v-model="searchFormData.dueDateFilter"
        />
      </section>
      <section class="flex gap-1">
        <DropDown
          id="sort"
          label="Sort By"
          v-model="selectedSort"
          :options="sortOptions.map((option) => option.label)"
        />
      </section>
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
    <LoadingOverlay v-if="isLoading" />
  </main>
</template>
