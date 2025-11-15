export interface Task {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed'
  dueDate: string
}
