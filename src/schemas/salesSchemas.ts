import { z } from 'zod'

// Client Schema
export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  client_type: z.enum(['GOVERNMENT', 'PRIVATE', 'INDIVIDUAL']),
  industry: z.string().min(1, 'Industry is required').max(100),
  contact_person: z.string().min(1, 'Contact person is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').max(50),
  address: z.string().min(1, 'Address is required'),
  tax_id: z.string().min(1, 'Tax ID is required').max(50),
  tax_rate: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid tax rate format'),
  payment_terms: z.string().min(1, 'Payment terms are required').max(100),
  credit_limit: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid credit limit format'),
  is_active: z.boolean().default(true),
})

export type ClientFormData = z.infer<typeof clientSchema>

// RFQ Schema
export const rfqSchema = z.object({
  client: z.string().uuid('Invalid client'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  received_date: z.string().min(1, 'Received date is required'),
  due_date: z.string().min(1, 'Due date is required'),
  assigned_to: z.string().uuid('Invalid user'),
  estimated_value: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid value format'),
})

export type RFQFormData = z.infer<typeof rfqSchema>

// BOM Schema
export const bomSchema = z.object({
  rfq: z.string().uuid('Invalid RFQ'),
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().optional(),
  markup_percentage: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid markup format'),
})

export type BOMFormData = z.infer<typeof bomSchema>

// BOM Line Item Schema
export const bomLineItemSchema = z.object({
  product: z.string().uuid('Invalid product'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unit_cost: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid cost format'),
  notes: z.string().optional(),
})

export type BOMLineItemFormData = z.infer<typeof bomLineItemSchema>

// Quote Schema
export const quoteSchema = z.object({
  rfq: z.string().uuid('Invalid RFQ'),
  bom: z.string().uuid('Invalid BOM'),
  expiry_date: z.string().min(1, 'Expiry date is required'),
  notes: z.string().optional(),
  terms_and_conditions: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteSchema>

// Communication Log Schema
export const communicationLogSchema = z.object({
  client: z.string().uuid('Invalid client'),
  rfq: z.string().uuid('Invalid RFQ').optional().or(z.literal('')),
  communication_type: z.enum(['EMAIL', 'CALL', 'MEETING', 'NOTE']),
  subject: z.string().min(1, 'Subject is required').max(200),
  notes: z.string().min(1, 'Notes are required'),
  contact_person: z.string().min(1, 'Contact person is required').max(100),
})

export type CommunicationLogFormData = z.infer<typeof communicationLogSchema>
