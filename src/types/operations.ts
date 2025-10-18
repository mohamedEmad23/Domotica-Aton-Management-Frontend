// ============================================================================
// OPERATIONS MODULE TYPES
// ============================================================================

export type WorkType = 'INSTALLATION' | 'MAINTENANCE' | 'REPAIR' | 'INSPECTION'
export type WOStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type MRStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'DISPATCHED' | 'CANCELLED'
export type UpdateType = 'PROGRESS' | 'ISSUE' | 'COMPLETION' | 'NOTE'

export interface WorkOrder {
  id: string
  wo_number: string
  project: string
  project_name: string
  work_type: WorkType
  status: WOStatus
  title: string
  description: string
  scheduled_date: string
  completion_date?: string
  location: string
  notes: string
  created_by: string
  created_by_name: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  work_order: string
  user: string
  user_name: string
  role: string
  assigned_date: string
}

export interface MaterialRequest {
  id: string
  mr_number: string
  work_order: string
  wo_number: string
  status: MRStatus
  requested_by: string
  requested_by_name: string
  requested_date: string
  required_date: string
  approved_by?: string
  approved_by_name?: string
  approved_at?: string
  dispatched_by?: string
  dispatched_by_name?: string
  dispatched_at?: string
  notes: string
  created_at: string
  updated_at: string
}

export interface MaterialRequestItem {
  id: string
  material_request: string
  product: string
  product_name: string
  product_sku: string
  quantity: number
  notes: string
}

export interface FieldUpdate {
  id: string
  work_order: string
  wo_number: string
  update_type: UpdateType
  title: string
  description: string
  photos: string[]
  latitude?: number
  longitude?: number
  created_by: string
  created_by_name: string
  created_at: string
}

// Form Data Types
export interface WorkOrderFormData {
  project: string
  work_type: WorkType
  title: string
  description: string
  scheduled_date: string
  location: string
  notes: string
}

export interface TeamMemberFormData {
  user: string
  role: string
}

export interface MaterialRequestFormData {
  work_order: string
  required_date: string
  notes: string
}

export interface MaterialRequestItemFormData {
  product: string
  quantity: number
  notes: string
}

export interface FieldUpdateFormData {
  work_order: string
  update_type: UpdateType
  title: string
  description: string
  photos: File[]
  latitude?: number
  longitude?: number
}
