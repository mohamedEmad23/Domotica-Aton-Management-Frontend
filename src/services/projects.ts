import api from "./api"
import type { PaginatedResponse } from "@/types/api"
import type {
  Project,
  ProjectTask,
  ProjectMilestone,
  ProjectResource,
  ProjectUpdate,
} from "@/types/projects"

// ============================================================================
// PROJECTS
// ============================================================================

export const getProjects = async (params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  client?: string
  project_manager?: string
}) => {
  const { data } = await api.get<PaginatedResponse<Project>>("/projects/api/projects/", { params })
  return data
}

export const getProject = async (id: string) => {
  const { data } = await api.get<Project>(`/projects/api/projects/${id}/`)
  return data
}

export const createProject = async (project: Partial<Project>) => {
  const { data } = await api.post<Project>("/projects/api/projects/", project)
  return data
}

export const updateProject = async (id: string, project: Partial<Project>) => {
  const { data } = await api.put<Project>(`/projects/api/projects/${id}/`, project)
  return data
}

export const deleteProject = async (id: string) => {
  await api.delete(`/projects/api/projects/${id}/`)
}

export const completeProject = async (id: string) => {
  const { data } = await api.post<Project>(`/projects/api/projects/${id}/complete/`)
  return data
}

// ============================================================================
// TASKS
// ============================================================================

export const getTasks = async (params?: {
  page?: number
  page_size?: number
  project?: string
  status?: string
  assigned_to?: string
  priority?: string
}) => {
  const { data } = await api.get<PaginatedResponse<ProjectTask>>("/projects/api/tasks/", { params })
  return data
}

export const getTask = async (id: string) => {
  const { data } = await api.get<ProjectTask>(`/projects/api/tasks/${id}/`)
  return data
}

export const createTask = async (task: Partial<ProjectTask>) => {
  const { data } = await api.post<ProjectTask>("/projects/api/tasks/", task)
  return data
}

export const updateTask = async (id: string, task: Partial<ProjectTask>) => {
  const { data } = await api.put<ProjectTask>(`/projects/api/tasks/${id}/`, task)
  return data
}

export const deleteTask = async (id: string) => {
  await api.delete(`/projects/api/tasks/${id}/`)
}

export const startTask = async (id: string) => {
  const { data } = await api.post<ProjectTask>(`/projects/api/tasks/${id}/start/`)
  return data
}

export const completeTask = async (id: string) => {
  const { data } = await api.post<ProjectTask>(`/projects/api/tasks/${id}/complete/`)
  return data
}

// ============================================================================
// MILESTONES
// ============================================================================

export const getMilestones = async (params?: {
  project?: string
  is_completed?: boolean
}) => {
  const { data } = await api.get<PaginatedResponse<ProjectMilestone>>("/projects/api/milestones/", { params })
  return data
}

export const getMilestone = async (id: string) => {
  const { data } = await api.get<ProjectMilestone>(`/projects/api/milestones/${id}/`)
  return data
}

export const createMilestone = async (milestone: Partial<ProjectMilestone>) => {
  const { data } = await api.post<ProjectMilestone>("/projects/api/milestones/", milestone)
  return data
}

export const updateMilestone = async (id: string, milestone: Partial<ProjectMilestone>) => {
  const { data } = await api.put<ProjectMilestone>(`/projects/api/milestones/${id}/`, milestone)
  return data
}

export const deleteMilestone = async (id: string) => {
  await api.delete(`/projects/api/milestones/${id}/`)
}

export const completeMilestone = async (id: string) => {
  const { data } = await api.post<ProjectMilestone>(`/projects/api/milestones/${id}/complete/`)
  return data
}

// ============================================================================
// RESOURCES
// ============================================================================

export const getResources = async (params?: {
  project?: string
  resource_type?: string
}) => {
  const { data } = await api.get<PaginatedResponse<ProjectResource>>("/projects/api/resources/", { params })
  return data
}

export const getResource = async (id: string) => {
  const { data } = await api.get<ProjectResource>(`/projects/api/resources/${id}/`)
  return data
}

export const createResource = async (resource: Partial<ProjectResource>) => {
  const { data } = await api.post<ProjectResource>("/projects/api/resources/", resource)
  return data
}

export const updateResource = async (id: string, resource: Partial<ProjectResource>) => {
  const { data } = await api.put<ProjectResource>(`/projects/api/resources/${id}/`, resource)
  return data
}

export const deleteResource = async (id: string) => {
  await api.delete(`/projects/api/resources/${id}/`)
}

// ============================================================================
// UPDATES
// ============================================================================

export const getUpdates = async (params?: {
  project?: string
  update_type?: string
}) => {
  const { data } = await api.get<PaginatedResponse<ProjectUpdate>>("/projects/api/updates/", { params })
  return data
}

export const createUpdate = async (update: FormData) => {
  const { data } = await api.post<ProjectUpdate>("/projects/api/updates/", update, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const deleteUpdate = async (id: string) => {
  await api.delete(`/projects/api/updates/${id}/`)
}
