import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from '../TaskCard.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('TaskCard.vue', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    priority: 'high',
    status: 'pending',
    dueDate: '2025-12-20',
  }

  const createWrapper = () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/edit-task/:id',
          name: 'edit-task',
          component: { template: '<div>Edit Task</div>' },
        },
      ],
    })

    return mount(TaskCard, {
      props: {
        task: mockTask,
      },
      global: {
        plugins: [router],
      },
    })
  }

  it('renders the task card with correct content', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Test Task')
    expect(wrapper.text()).toContain('This is a test task')
    expect(wrapper.text()).toContain('high')
    expect(wrapper.text()).toContain('pending')
    expect(wrapper.text()).toContain('2025-12-20')
  })

  it('displays task title in bold', () => {
    const wrapper = createWrapper()
    const titleElement = wrapper.find('strong')

    expect(titleElement.text()).toBe('Test Task')
  })

  it('has correct router link to edit task', () => {
    const wrapper = createWrapper()
    const routerLink = wrapper.findComponent({ name: 'RouterLink' })

    expect(routerLink.props('to')).toBe('/edit-task/1')
  })

  it('renders all task properties', () => {
    const wrapper = createWrapper()
    const spans = wrapper.findAll('span')

    expect(spans.length).toBeGreaterThanOrEqual(4)
  })

  it('applies correct styling classes', () => {
    const wrapper = createWrapper()
    const cardDiv = wrapper.find('div')

    expect(cardDiv.classes()).toContain('flex')
    expect(cardDiv.classes()).toContain('flex-col')
    expect(cardDiv.classes()).toContain('gap-2')
    expect(cardDiv.classes()).toContain('bg-slate-500')
    expect(cardDiv.classes()).toContain('rounded-sm')
    expect(cardDiv.classes()).toContain('p-5')
  })
})
