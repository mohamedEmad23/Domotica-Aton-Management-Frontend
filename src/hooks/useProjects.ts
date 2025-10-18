import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as projectsService from '@/services/projects'
import type { Project, ProjectTask, ProjectMilestone, ProjectResource, ProjectUpdate } from '@/types/projects'

// ============================================================================
// PROJECTS
// ============================================================================

export function useProjects(params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  client?: string
  project_manager?: string
}) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsService.getProjects(params),
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getProject(id),
    enabled: !!id,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create project')
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      projectsService.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] })
      toast.success('Project updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update project')
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete project')
    },
  })
}

export function useCompleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.completeProject,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', id] })
      toast.success('Project completed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to complete project')
    },
  })
}

// ============================================================================
// TASKS
// ============================================================================

export function useTasks(params?: {
  page?: number
  page_size?: number
  project?: string
  status?: string
  assigned_to?: string
  priority?: string
}) {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: () => projectsService.getTasks(params),
  })
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => projectsService.getTask(id),
    enabled: !!id,
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create task')
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectTask> }) =>
      projectsService.updateTask(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] })
      toast.success('Task updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update task')
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete task')
    },
  })
}

export function useStartTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.startTask,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', id] })
      toast.success('Task started successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to start task')
    },
  })
}

export function useCompleteTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.completeTask,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', id] })
      toast.success('Task completed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to complete task')
    },
  })
}

// ============================================================================
// MILESTONES
// ============================================================================

export function useMilestones(params?: {
  project?: string
  is_completed?: boolean
}) {
  return useQuery({
    queryKey: ['milestones', params],
    queryFn: () => projectsService.getMilestones(params),
  })
}

export function useMilestone(id: string) {
  return useQuery({
    queryKey: ['milestone', id],
    queryFn: () => projectsService.getMilestone(id),
    enabled: !!id,
  })
}

export function useCreateMilestone() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.createMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] })
      toast.success('Milestone created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create milestone')
    },
  })
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectMilestone> }) =>
      projectsService.updateMilestone(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] })
      queryClient.invalidateQueries({ queryKey: ['milestone', variables.id] })
      toast.success('Milestone updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update milestone')
    },
  })
}

export function useDeleteMilestone() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.deleteMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] })
      toast.success('Milestone deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete milestone')
    },
  })
}

export function useCompleteMilestone() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.completeMilestone,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] })
      queryClient.invalidateQueries({ queryKey: ['milestone', id] })
      toast.success('Milestone completed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to complete milestone')
    },
  })
}

// ============================================================================
// RESOURCES
// ============================================================================

export function useResources(params?: {
  project?: string
  resource_type?: string
}) {
  return useQuery({
    queryKey: ['resources', params],
    queryFn: () => projectsService.getResources(params),
  })
}

export function useResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: () => projectsService.getResource(id),
    enabled: !!id,
  })
}

export function useCreateResource() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      toast.success('Resource created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create resource')
    },
  })
}

export function useUpdateResource() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectResource> }) =>
      projectsService.updateResource(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({ queryKey: ['resource', variables.id] })
      toast.success('Resource updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update resource')
    },
  })
}

export function useDeleteResource() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      toast.success('Resource deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete resource')
    },
  })
}

// ============================================================================
// UPDATES
// ============================================================================

export function useUpdates(params?: {
  project?: string
  update_type?: string
}) {
  return useQuery({
    queryKey: ['updates', params],
    queryFn: () => projectsService.getUpdates(params),
  })
}

export function useCreateUpdate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.createUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updates'] })
      toast.success('Update created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create update')
    },
  })
}

export function useDeleteUpdate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsService.deleteUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updates'] })
      toast.success('Update deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete update')
    },
  })
}
