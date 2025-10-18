// ============================================================================
// SALES MODULE TYPES
// ============================================================================

export type ClientType = 'GOVERNMENT' | 'PRIVATE' | 'INDIVIDUAL'

export interface Client {
  id: string
  name: string
  client_type: ClientType
  industry: string
  contact_person: string
  email: string
  phone: string
  address: string
  tax_id: string
  tax_rate: string
  payment_terms: string
  credit_limit: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type RFQStatus = 'DRAFT' | 'SUBMITTED' | 'QUOTED' | 'WON' | 'LOST'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface RFQ {
  id: string
  rfq_number: string
  client: string
  client_name: string
  title: string
  description: string
  status: RFQStatus
  priority: Priority
  received_date: string
  due_date: string
  assigned_to: string
  assigned_to_name: string
  estimated_value: string
  created_by: string
  created_at: string
  updated_at: string
}

export type BOMStatus = 'DRAFT' | 'APPROVED' | 'REJECTED'

export interface BOM {
  id: string
  bom_number: string
  rfq: string
  rfq_number: string
  name: string
  description: string
  status: BOMStatus
  total_cost: string
  markup_percentage: string
  total_price: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface BOMLineItem {
  id: string
  bom: string
  product: string
  product_name: string
  product_sku: string
  quantity: number
  unit_cost: string
  total_cost: string
  notes: string
  stock_available: number
}

export type QuoteStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'

export interface Quote {
  id: string
  quote_number: string
  rfq: string
  rfq_number: string
  client: string
  client_name: string
  bom: string
  bom_number: string
  status: QuoteStatus
  issue_date: string
  expiry_date: string
  subtotal: string
  tax_amount: string
  total_amount: string
  notes: string
  terms_and_conditions: string
  created_by: string
  created_at: string
  updated_at: string
}

export type CommunicationType = 'EMAIL' | 'CALL' | 'MEETING' | 'NOTE'

export interface CommunicationLog {
  id: string
  client: string
  rfq?: string
  communication_type: CommunicationType
  subject: string
  notes: string
  contact_person: string
  created_by: string
  created_by_name: string
  created_at: string
}

// Form Data Types
export interface ClientFormData {
  name: string
  client_type: ClientType
  industry: string
  contact_person: string
  email: string
  phone: string
  address: string
  tax_id: string
  tax_rate: string
  payment_terms: string
  credit_limit: string
  is_active: boolean
}

export interface RFQFormData {
  client: string
  title: string
  description: string
  priority: Priority
  received_date: string
  due_date: string
  assigned_to: string
  estimated_value: string
}

export interface BOMFormData {
  rfq: string
  name: string
  description: string
  markup_percentage: string
}

export interface BOMLineItemFormData {
  product: string
  quantity: number
  unit_cost: string
  notes: string
}

export interface QuoteFormData {
  rfq: string
  bom: string
  expiry_date: string
  notes: string
  terms_and_conditions: string
}

export interface CommunicationLogFormData {
  client: string
  rfq?: string
  communication_type: CommunicationType
  subject: string
  notes: string
  contact_person: string
}
