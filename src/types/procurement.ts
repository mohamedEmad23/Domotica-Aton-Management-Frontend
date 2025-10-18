// ============================================================================
// PROCUREMENT MODULE TYPES
// ============================================================================

export type POStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'ORDERED' | 'RECEIVED' | 'CANCELLED'
export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'CUSTOMS' | 'DELIVERED'
export type QualityStatus = 'PASS' | 'FAIL' | 'PENDING'

export interface PurchaseOrder {
  id: string
  po_number: string
  supplier: string
  supplier_name: string
  status: POStatus
  order_date: string
  expected_delivery_date: string
  total_amount: string
  notes: string
  created_by: string
  created_by_name: string
  approved_by?: string
  approved_by_name?: string
  approved_at?: string
  created_at: string
  updated_at: string
}

export interface POLineItem {
  id: string
  purchase_order: string
  product: string
  product_name: string
  product_sku: string
  quantity: number
  unit_price: string
  total_price: string
  notes: string
}

export interface Shipment {
  id: string
  shipment_number: string
  purchase_order: string
  po_number: string
  status: ShipmentStatus
  carrier: string
  tracking_number: string
  shipped_date: string
  expected_delivery_date: string
  actual_delivery_date?: string
  customs_clearance_date?: string
  notes: string
  created_at: string
  updated_at: string
}

export interface GoodsReceipt {
  id: string
  receipt_number: string
  purchase_order: string
  po_number: string
  shipment?: string
  shipment_number?: string
  received_date: string
  received_by: string
  received_by_name: string
  notes: string
  created_at: string
  updated_at: string
}

export interface GoodsReceiptItem {
  id: string
  goods_receipt: string
  po_line_item: string
  product: string
  product_name: string
  ordered_quantity: number
  received_quantity: number
  quality_status: QualityStatus
  quality_notes: string
}

// Form Data Types
export interface PurchaseOrderFormData {
  supplier: string
  order_date: string
  expected_delivery_date: string
  notes: string
}

export interface POLineItemFormData {
  product: string
  quantity: number
  unit_price: string
  notes: string
}

export interface ShipmentFormData {
  purchase_order: string
  carrier: string
  tracking_number: string
  shipped_date: string
  expected_delivery_date: string
  notes: string
}

export interface GoodsReceiptFormData {
  purchase_order: string
  shipment?: string
  received_date: string
  notes: string
}

export interface GoodsReceiptItemFormData {
  po_line_item: string
  received_quantity: number
  quality_status: QualityStatus
  quality_notes: string
}
