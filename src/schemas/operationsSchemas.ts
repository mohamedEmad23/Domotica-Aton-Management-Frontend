import { z } from 'zod'

// Work Order Schema
export const workOrderSchema = z.object({
  project: z.string().uuid('Invalid project'),
  work_type: z.enum(['INSTALLATION', 'MAINTENANCE', 'REPAIR', 'INSPECTION']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  scheduled_date: z.string().min(1, 'Scheduled date is required'),
  location: z.string().min(1, 'Location is required'),
  notes: z.string().optional(),
})

export type WorkOrderFormData = z.infer<typeof workOrderSchema>

// Team Member Schema
export const teamMemberSchema = z.object({
  user: z.string().uuid('Invalid user'),
  role: z.string().min(1, 'Role is required').max(100),
})

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>

// Material Request Schema
export const materialRequestSchema = z.object({
  work_order: z.string().uuid('Invalid work order'),
  required_date: z.string().min(1, 'Required date is required'),
  notes: z.string().optional(),
})

export type MaterialRequestFormData = z.infer<typeof materialRequestSchema>

// Material Request Item Schema
export const materialRequestItemSchema = z.object({
  product: z.string().uuid('Invalid product'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  notes: z.string().optional(),
})

export type MaterialRequestItemFormData = z.infer<typeof materialRequestItemSchema>

// Field Update Schema
export const fieldUpdateSchema = z.object({
  work_order: z.string().uuid('Invalid work order'),
  update_type: z.enum(['PROGRESS', 'ISSUE', 'COMPLETION', 'NOTE']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export type FieldUpdateFormData = z.infer<typeof fieldUpdateSchema>
