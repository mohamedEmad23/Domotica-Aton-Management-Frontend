import api from "./api"
import type { PaginatedResponse } from "@/types/api"
import type {
  WorkOrder,
  TeamMember,
  MaterialRequest,
  MaterialRequestItem,
  FieldUpdate,
} from "@/types/operations"

// ============================================================================
// WORK ORDERS
// ============================================================================

export const getWorkOrders = async (params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  work_type?: string
  project?: string
}) => {
  const { data } = await api.get<PaginatedResponse<WorkOrder>>("/operations/api/work-orders/", { params })
  return data
}

export const getWorkOrder = async (id: string) => {
  const { data } = await api.get<WorkOrder>(`/operations/api/work-orders/${id}/`)
  return data
}

export const createWorkOrder = async (wo: Partial<WorkOrder>) => {
  const { data } = await api.post<WorkOrder>("/operations/api/work-orders/", wo)
  return data
}

export const updateWorkOrder = async (id: string, wo: Partial<WorkOrder>) => {
  const { data } = await api.put<WorkOrder>(`/operations/api/work-orders/${id}/`, wo)
  return data
}

export const deleteWorkOrder = async (id: string) => {
  await api.delete(`/operations/api/work-orders/${id}/`)
}

export const startWorkOrder = async (id: string) => {
  const { data } = await api.post<WorkOrder>(`/operations/api/work-orders/${id}/start/`)
  return data
}

export const completeWorkOrder = async (id: string) => {
  const { data } = await api.post<WorkOrder>(`/operations/api/work-orders/${id}/complete/`)
  return data
}

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export const getTeamMembers = async (work_order_id: string) => {
  const { data } = await api.get<TeamMember[]>(`/operations/api/work-orders/${work_order_id}/team-members/`)
  return data
}

export const addTeamMember = async (work_order_id: string, member: Partial<TeamMember>) => {
  const { data } = await api.post<TeamMember>(`/operations/api/work-orders/${work_order_id}/team-members/`, member)
  return data
}

export const removeTeamMember = async (work_order_id: string, member_id: string) => {
  await api.delete(`/operations/api/work-orders/${work_order_id}/team-members/${member_id}/`)
}

// ============================================================================
// MATERIAL REQUESTS
// ============================================================================

export const getMaterialRequests = async (params?: {
  page?: number
  page_size?: number
  work_order?: string
  status?: string
}) => {
  const { data } = await api.get<PaginatedResponse<MaterialRequest>>("/operations/api/material-requests/", { params })
  return data
}

export const getMaterialRequest = async (id: string) => {
  const { data } = await api.get<MaterialRequest>(`/operations/api/material-requests/${id}/`)
  return data
}

export const createMaterialRequest = async (mr: Partial<MaterialRequest>) => {
  const { data } = await api.post<MaterialRequest>("/operations/api/material-requests/", mr)
  return data
}

export const updateMaterialRequest = async (id: string, mr: Partial<MaterialRequest>) => {
  const { data } = await api.put<MaterialRequest>(`/operations/api/material-requests/${id}/`, mr)
  return data
}

export const deleteMaterialRequest = async (id: string) => {
  await api.delete(`/operations/api/material-requests/${id}/`)
}

export const approveMaterialRequest = async (id: string) => {
  const { data } = await api.post<MaterialRequest>(`/operations/api/material-requests/${id}/approve/`)
  return data
}

export const dispatchMaterialRequest = async (id: string) => {
  const { data } = await api.post<MaterialRequest>(`/operations/api/material-requests/${id}/dispatch/`)
  return data
}

// ============================================================================
// MATERIAL REQUEST ITEMS
// ============================================================================

export const getMaterialRequestItems = async (mr_id: string) => {
  const { data } = await api.get<MaterialRequestItem[]>(`/operations/api/material-requests/${mr_id}/items/`)
  return data
}

export const createMaterialRequestItem = async (mr_id: string, item: Partial<MaterialRequestItem>) => {
  const { data } = await api.post<MaterialRequestItem>(`/operations/api/material-requests/${mr_id}/items/`, item)
  return data
}

export const updateMaterialRequestItem = async (mr_id: string, item_id: string, item: Partial<MaterialRequestItem>) => {
  const { data } = await api.put<MaterialRequestItem>(`/operations/api/material-requests/${mr_id}/items/${item_id}/`, item)
  return data
}

export const deleteMaterialRequestItem = async (mr_id: string, item_id: string) => {
  await api.delete(`/operations/api/material-requests/${mr_id}/items/${item_id}/`)
}

// ============================================================================
// FIELD UPDATES
// ============================================================================

export const getFieldUpdates = async (params?: {
  work_order?: string
  update_type?: string
}) => {
  const { data } = await api.get<PaginatedResponse<FieldUpdate>>("/operations/api/field-updates/", { params })
  return data
}

export const getFieldUpdate = async (id: string) => {
  const { data } = await api.get<FieldUpdate>(`/operations/api/field-updates/${id}/`)
  return data
}

export const createFieldUpdate = async (update: FormData) => {
  const { data } = await api.post<FieldUpdate>("/operations/api/field-updates/", update, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const deleteFieldUpdate = async (id: string) => {
  await api.delete(`/operations/api/field-updates/${id}/`)
}
