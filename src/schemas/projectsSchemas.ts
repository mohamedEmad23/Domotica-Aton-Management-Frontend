import { z } from 'zod'

// Project Schema
export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().min(1, 'Description is required'),
  client: z.string().uuid('Invalid client'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid budget format'),
  project_manager: z.string().uuid('Invalid project manager'),
}).refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
  message: 'End date must be after start date',
  path: ['end_date'],
})

export type ProjectFormData = z.infer<typeof projectSchema>

// Task Schema
export const taskSchema = z.object({
  project: z.string().uuid('Invalid project'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  assigned_to: z.string().uuid('Invalid user'),
  start_date: z.string().min(1, 'Start date is required'),
  due_date: z.string().min(1, 'Due date is required'),
  estimated_hours: z.number().min(0, 'Estimated hours must be positive'),
  dependencies: z.array(z.string().uuid()).default([]),
}).refine((data) => new Date(data.due_date) >= new Date(data.start_date), {
  message: 'Due date must be after start date',
  path: ['due_date'],
})

export type TaskFormData = z.infer<typeof taskSchema>

// Milestone Schema
export const milestoneSchema = z.object({
  project: z.string().uuid('Invalid project'),
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().optional(),
  due_date: z.string().min(1, 'Due date is required'),
})

export type MilestoneFormData = z.infer<typeof milestoneSchema>

// Resource Schema
export const resourceSchema = z.object({
  project: z.string().uuid('Invalid project'),
  resource_type: z.enum(['HUMAN', 'EQUIPMENT', 'MATERIAL']),
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unit_cost: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid cost format'),
  allocated_date: z.string().min(1, 'Allocated date is required'),
})

export type ResourceFormData = z.infer<typeof resourceSchema>

// Update Schema
export const updateSchema = z.object({
  project: z.string().uuid('Invalid project'),
  update_type: z.enum(['STATUS', 'MILESTONE', 'ISSUE', 'NOTE']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
})

export type UpdateFormData = z.infer<typeof updateSchema>
