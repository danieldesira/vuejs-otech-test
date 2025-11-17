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
const selectedSort = ref()
const isLoading = ref(false)

const statusOptions = ['', 'pending', 'completed']

const priorityOptions = ['', 'low', 'medium', 'high']

const sortOptions = [
  'Title Ascending',
  'Title Descending',
  'Due Date Ascending',
  'Due Date Descending',
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
      isLoading.value = true
      try {
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
      } catch {
        $toast.error('Failed to fetch tasks.')
      } finally {
        isLoading.value = false
      }
    } else {
      await fetchAllTasks()
    }
  },
  { deep: true },
)

watch(selectedSort, async (newSort) => {
  isLoading.value = true
  try {
    if (newSort) {
      const sortMap: Record<string, { field: string; order: 'asc' | 'desc' }> = {
        'Title Ascending': { field: 'title', order: 'asc' },
        'Title Descending': { field: 'title', order: 'desc' },
        'Date Due Ascending': { field: 'dueDate', order: 'asc' },
        'Date Due Descending': { field: 'dueDate', order: 'desc' },
      }

      const sortConfig = sortMap[newSort]
      console.log(sortConfig)
      if (!sortConfig) return

      const response = await axiosInstance.get<Task[]>('tasks', {
        params: {
          _sort: sortConfig.field,
          _order: sortConfig.order,
          title: searchFormData.value.titleFilter || undefined,
          description: searchFormData.value.descriptionFilter || undefined,
          status: searchFormData.value.statusFilter || undefined,
          dueDate: searchFormData.value.dueDateFilter || undefined,
          priority: searchFormData.value.priorityFilter || undefined,
        },
      })
      tasks.value = response.data
    } else {
      await fetchAllTasks()
    }
  } catch {
    $toast.error('Failed to sort tasks.')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="flex flex-wrap gap-5 p-5">
    <section class="flex flex-col gap-1">
      <section class="flex gap-1 flex-wrap">
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
      <section class="flex gap-1 flex-wrap">
        <DropDown id="sort" label="Sort By" v-model="selectedSort" :options="sortOptions" />
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
