import { z } from 'zod'

// Product Schema
export const productSchema = z.object({
  sku: z.string().min(1, 'SKU is required').max(50, 'SKU must be less than 50 characters'),
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
  description: z.string().optional(),
  category: z.string().uuid('Invalid category').optional(),
  unit_of_measure: z.enum(['PCS', 'M', 'KG', 'L', 'SET', 'BOX', 'ROLL', 'PACK'], {
    errorMap: () => ({ message: 'Please select a valid unit of measure' }),
  }),
  weight: z.string().regex(/^\d+(\.\d{1,3})?$/, 'Invalid weight format').optional().or(z.literal('')),
  dimensions: z.string().max(100).optional(),
  standard_cost: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid cost format (use format: 100.00)'),
  primary_supplier: z.string().uuid('Invalid supplier').optional(),
  specifications: z.record(z.any()).optional(),
  is_active: z.boolean().default(true),
})

export type ProductFormData = z.infer<typeof productSchema>

// Category Schema
export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().optional(),
  parent: z.string().uuid('Invalid parent category').optional().or(z.literal('')),
  is_active: z.boolean().default(true),
})

export type CategoryFormData = z.infer<typeof categorySchema>

// Supplier Schema
export const supplierSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
  contact_person: z.string().max(100).optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().max(50).optional(),
  address: z.string().optional(),
  payment_terms: z.string().max(100).optional(),
  lead_time_days: z.number().int().min(0, 'Lead time must be positive').default(0),
  minimum_order_amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount format').default('0.00'),
  is_active: z.boolean().default(true),
  is_preferred: z.boolean().default(false),
})

export type SupplierFormData = z.infer<typeof supplierSchema>

// Stock Operation Schemas
export const receiveStockSchema = z.object({
  product_id: z.string().uuid('Invalid product'),
  location_id: z.string().uuid('Invalid location'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
})

export type ReceiveStockFormData = z.infer<typeof receiveStockSchema>

export const dispatchStockSchema = z.object({
  product_id: z.string().uuid('Invalid product'),
  location_id: z.string().uuid('Invalid location'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
})

export type DispatchStockFormData = z.infer<typeof dispatchStockSchema>

export const transferStockSchema = z.object({
  product_id: z.string().uuid('Invalid product'),
  from_location_id: z.string().uuid('Invalid source location'),
  to_location_id: z.string().uuid('Invalid destination location'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  notes: z.string().optional(),
}).refine((data) => data.from_location_id !== data.to_location_id, {
  message: 'Source and destination locations must be different',
  path: ['to_location_id'],
})

export type TransferStockFormData = z.infer<typeof transferStockSchema>

export const reserveStockSchema = z.object({
  product_id: z.string().uuid('Invalid product'),
  location_id: z.string().uuid('Invalid location'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
})

export type ReserveStockFormData = z.infer<typeof reserveStockSchema>
