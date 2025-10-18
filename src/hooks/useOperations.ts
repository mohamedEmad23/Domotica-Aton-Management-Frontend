import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as operationsService from '@/services/operations'
import type { WorkOrder, TeamMember, MaterialRequest, MaterialRequestItem, FieldUpdate } from '@/types/operations'

// ============================================================================
// WORK ORDERS
// ============================================================================

export function useWorkOrders(params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  work_type?: string
  project?: string
}) {
  return useQuery({
    queryKey: ['work-orders', params],
    queryFn: () => operationsService.getWorkOrders(params),
  })
}

export function useWorkOrder(id: string) {
  return useQuery({
    queryKey: ['work-order', id],
    queryFn: () => operationsService.getWorkOrder(id),
    enabled: !!id,
  })
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.createWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] })
      toast.success('Work order created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create work order')
    },
  })
}

export function useUpdateWorkOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkOrder> }) =>
      operationsService.updateWorkOrder(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] })
      queryClient.invalidateQueries({ queryKey: ['work-order', variables.id] })
      toast.success('Work order updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update work order')
    },
  })
}

export function useDeleteWorkOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.deleteWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] })
      toast.success('Work order deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete work order')
    },
  })
}

export function useStartWorkOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.startWorkOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] })
      queryClient.invalidateQueries({ queryKey: ['work-order', id] })
      toast.success('Work order started successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to start work order')
    },
  })
}

export function useCompleteWorkOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.completeWorkOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] })
      queryClient.invalidateQueries({ queryKey: ['work-order', id] })
      toast.success('Work order completed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to complete work order')
    },
  })
}

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export function useTeamMembers(work_order_id: string) {
  return useQuery({
    queryKey: ['team-members', work_order_id],
    queryFn: () => operationsService.getTeamMembers(work_order_id),
    enabled: !!work_order_id,
  })
}

export function useAddTeamMember() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ work_order_id, member }: { work_order_id: string; member: Partial<TeamMember> }) =>
      operationsService.addTeamMember(work_order_id, member),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team-members', variables.work_order_id] })
      queryClient.invalidateQueries({ queryKey: ['work-order', variables.work_order_id] })
      toast.success('Team member added successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to add team member')
    },
  })
}

export function useRemoveTeamMember() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ work_order_id, member_id }: { work_order_id: string; member_id: string }) =>
      operationsService.removeTeamMember(work_order_id, member_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team-members', variables.work_order_id] })
      queryClient.invalidateQueries({ queryKey: ['work-order', variables.work_order_id] })
      toast.success('Team member removed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to remove team member')
    },
  })
}

// ============================================================================
// MATERIAL REQUESTS
// ============================================================================

export function useMaterialRequests(params?: {
  page?: number
  page_size?: number
  work_order?: string
  status?: string
}) {
  return useQuery({
    queryKey: ['material-requests', params],
    queryFn: () => operationsService.getMaterialRequests(params),
  })
}

export function useMaterialRequest(id: string) {
  return useQuery({
    queryKey: ['material-request', id],
    queryFn: () => operationsService.getMaterialRequest(id),
    enabled: !!id,
  })
}

export function useCreateMaterialRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.createMaterialRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-requests'] })
      toast.success('Material request created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create material request')
    },
  })
}

export function useUpdateMaterialRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MaterialRequest> }) =>
      operationsService.updateMaterialRequest(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['material-requests'] })
      queryClient.invalidateQueries({ queryKey: ['material-request', variables.id] })
      toast.success('Material request updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update material request')
    },
  })
}

export function useDeleteMaterialRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.deleteMaterialRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-requests'] })
      toast.success('Material request deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete material request')
    },
  })
}

export function useApproveMaterialRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.approveMaterialRequest,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['material-requests'] })
      queryClient.invalidateQueries({ queryKey: ['material-request', id] })
      toast.success('Material request approved successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to approve material request')
    },
  })
}

export function useDispatchMaterialRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.dispatchMaterialRequest,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['material-requests'] })
      queryClient.invalidateQueries({ queryKey: ['material-request', id] })
      toast.success('Materials dispatched successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to dispatch materials')
    },
  })
}

// ============================================================================
// MATERIAL REQUEST ITEMS
// ============================================================================

export function useMaterialRequestItems(mr_id: string) {
  return useQuery({
    queryKey: ['material-request-items', mr_id],
    queryFn: () => operationsService.getMaterialRequestItems(mr_id),
    enabled: !!mr_id,
  })
}

export function useCreateMaterialRequestItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ mr_id, item }: { mr_id: string; item: Partial<MaterialRequestItem> }) =>
      operationsService.createMaterialRequestItem(mr_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['material-request-items', variables.mr_id] })
      queryClient.invalidateQueries({ queryKey: ['material-request', variables.mr_id] })
      toast.success('Item added successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to add item')
    },
  })
}

export function useUpdateMaterialRequestItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ mr_id, item_id, item }: { mr_id: string; item_id: string; item: Partial<MaterialRequestItem> }) =>
      operationsService.updateMaterialRequestItem(mr_id, item_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['material-request-items', variables.mr_id] })
      queryClient.invalidateQueries({ queryKey: ['material-request', variables.mr_id] })
      toast.success('Item updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update item')
    },
  })
}

export function useDeleteMaterialRequestItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ mr_id, item_id }: { mr_id: string; item_id: string }) =>
      operationsService.deleteMaterialRequestItem(mr_id, item_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['material-request-items', variables.mr_id] })
      queryClient.invalidateQueries({ queryKey: ['material-request', variables.mr_id] })
      toast.success('Item deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete item')
    },
  })
}

// ============================================================================
// FIELD UPDATES
// ============================================================================

export function useFieldUpdates(params?: {
  work_order?: string
  update_type?: string
}) {
  return useQuery({
    queryKey: ['field-updates', params],
    queryFn: () => operationsService.getFieldUpdates(params),
  })
}

export function useFieldUpdate(id: string) {
  return useQuery({
    queryKey: ['field-update', id],
    queryFn: () => operationsService.getFieldUpdate(id),
    enabled: !!id,
  })
}

export function useCreateFieldUpdate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.createFieldUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field-updates'] })
      toast.success('Field update created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create field update')
    },
  })
}

export function useDeleteFieldUpdate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: operationsService.deleteFieldUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field-updates'] })
      toast.success('Field update deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete field update')
    },
  })
}
