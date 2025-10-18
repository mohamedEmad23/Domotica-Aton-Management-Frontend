import { z } from 'zod'

// Purchase Order Schema
export const purchaseOrderSchema = z.object({
  supplier: z.string().uuid('Invalid supplier'),
  order_date: z.string().min(1, 'Order date is required'),
  expected_delivery_date: z.string().min(1, 'Expected delivery date is required'),
  notes: z.string().optional(),
}).refine((data) => new Date(data.expected_delivery_date) >= new Date(data.order_date), {
  message: 'Expected delivery date must be after order date',
  path: ['expected_delivery_date'],
})

export type PurchaseOrderFormData = z.infer<typeof purchaseOrderSchema>

// PO Line Item Schema
export const poLineItemSchema = z.object({
  product: z.string().uuid('Invalid product'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unit_price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  notes: z.string().optional(),
})

export type POLineItemFormData = z.infer<typeof poLineItemSchema>

// Shipment Schema
export const shipmentSchema = z.object({
  purchase_order: z.string().uuid('Invalid purchase order'),
  carrier: z.string().min(1, 'Carrier is required').max(100),
  tracking_number: z.string().min(1, 'Tracking number is required').max(100),
  shipped_date: z.string().min(1, 'Shipped date is required'),
  expected_delivery_date: z.string().min(1, 'Expected delivery date is required'),
  notes: z.string().optional(),
}).refine((data) => new Date(data.expected_delivery_date) >= new Date(data.shipped_date), {
  message: 'Expected delivery date must be after shipped date',
  path: ['expected_delivery_date'],
})

export type ShipmentFormData = z.infer<typeof shipmentSchema>

// Goods Receipt Schema
export const goodsReceiptSchema = z.object({
  purchase_order: z.string().uuid('Invalid purchase order'),
  shipment: z.string().uuid('Invalid shipment').optional().or(z.literal('')),
  received_date: z.string().min(1, 'Received date is required'),
  notes: z.string().optional(),
})

export type GoodsReceiptFormData = z.infer<typeof goodsReceiptSchema>

// Goods Receipt Item Schema
export const goodsReceiptItemSchema = z.object({
  po_line_item: z.string().uuid('Invalid PO line item'),
  received_quantity: z.number().int().min(1, 'Received quantity must be at least 1'),
  quality_status: z.enum(['PASS', 'FAIL', 'PENDING']),
  quality_notes: z.string().optional(),
})

export type GoodsReceiptItemFormData = z.infer<typeof goodsReceiptItemSchema>
