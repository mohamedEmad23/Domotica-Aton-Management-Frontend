// ============================================================================
// PROJECTS MODULE TYPES
// ============================================================================

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED'
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'BLOCKED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type ResourceType = 'HUMAN' | 'EQUIPMENT' | 'MATERIAL'

export interface Project {
  id: string
  project_number: string
  name: string
  description: string
  client: string
  client_name: string
  status: ProjectStatus
  priority: Priority
  start_date: string
  end_date: string
  budget: string
  actual_cost: string
  completion_percentage: number
  project_manager: string
  project_manager_name: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface ProjectTask {
  id: string
  project: string
  project_name: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assigned_to: string
  assigned_to_name: string
  start_date: string
  due_date: string
  estimated_hours: number
  actual_hours: number
  dependencies: string[]
  created_by: string
  created_at: string
  updated_at: string
}

export interface ProjectMilestone {
  id: string
  project: string
  project_name: string
  name: string
  description: string
  due_date: string
  completion_date?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface ProjectResource {
  id: string
  project: string
  project_name: string
  resource_type: ResourceType
  name: string
  description: string
  quantity: number
  unit_cost: string
  total_cost: string
  allocated_date: string
  created_at: string
  updated_at: string
}

export type UpdateType = 'STATUS' | 'MILESTONE' | 'ISSUE' | 'NOTE'

export interface ProjectUpdate {
  id: string
  project: string
  project_name: string
  update_type: UpdateType
  title: string
  description: string
  attachments?: string[]
  created_by: string
  created_by_name: string
  created_at: string
}

// Form Data Types
export interface ProjectFormData {
  name: string
  description: string
  client: string
  priority: Priority
  start_date: string
  end_date: string
  budget: string
  project_manager: string
}

export interface ProjectTaskFormData {
  project: string
  title: string
  description: string
  priority: Priority
  assigned_to: string
  start_date: string
  due_date: string
  estimated_hours: number
  dependencies: string[]
}

export interface ProjectMilestoneFormData {
  project: string
  name: string
  description: string
  due_date: string
}

export interface ProjectResourceFormData {
  project: string
  resource_type: ResourceType
  name: string
  description: string
  quantity: number
  unit_cost: string
  allocated_date: string
}

export interface ProjectUpdateFormData {
  project: string
  update_type: UpdateType
  title: string
  description: string
  attachments?: File[]
}
