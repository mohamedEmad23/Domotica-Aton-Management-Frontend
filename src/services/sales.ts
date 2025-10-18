import api from "./api"
import type { PaginatedResponse } from "@/types/api"
import type {
  Client,
  RFQ,
  BOM,
  BOMLineItem,
  Quote,
  CommunicationLog,
} from "@/types/sales"

// ============================================================================
// CLIENTS
// ============================================================================

export const getClients = async (params?: {
  page?: number
  page_size?: number
  search?: string
  client_type?: string
  active_only?: boolean
}) => {
  const { data } = await api.get<PaginatedResponse<Client>>("/sales/api/clients/", { params })
  return data
}

export const getClient = async (id: string) => {
  const { data } = await api.get<Client>(`/sales/api/clients/${id}/`)
  return data
}

export const createClient = async (client: Partial<Client>) => {
  const { data } = await api.post<Client>("/sales/api/clients/", client)
  return data
}

export const updateClient = async (id: string, client: Partial<Client>) => {
  const { data } = await api.put<Client>(`/sales/api/clients/${id}/`, client)
  return data
}

export const deleteClient = async (id: string) => {
  await api.delete(`/sales/api/clients/${id}/`)
}

// ============================================================================
// RFQs
// ============================================================================

export const getRFQs = async (params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  priority?: string
  assigned_to?: string
}) => {
  const { data } = await api.get<PaginatedResponse<RFQ>>("/sales/api/rfqs/", { params })
  return data
}

export const getRFQ = async (id: string) => {
  const { data } = await api.get<RFQ>(`/sales/api/rfqs/${id}/`)
  return data
}

export const createRFQ = async (rfq: Partial<RFQ>) => {
  const { data } = await api.post<RFQ>("/sales/api/rfqs/", rfq)
  return data
}

export const updateRFQ = async (id: string, rfq: Partial<RFQ>) => {
  const { data } = await api.put<RFQ>(`/sales/api/rfqs/${id}/`, rfq)
  return data
}

export const deleteRFQ = async (id: string) => {
  await api.delete(`/sales/api/rfqs/${id}/`)
}

export const submitRFQ = async (id: string) => {
  const { data } = await api.post<RFQ>(`/sales/api/rfqs/${id}/submit/`)
  return data
}

export const assignRFQ = async (id: string, user_id: string) => {
  const { data } = await api.post<RFQ>(`/sales/api/rfqs/${id}/assign/`, { user_id })
  return data
}

// ============================================================================
// BOMs
// ============================================================================

export const getBOMs = async (params?: {
  page?: number
  page_size?: number
  rfq?: string
  status?: string
}) => {
  const { data } = await api.get<PaginatedResponse<BOM>>("/sales/api/boms/", { params })
  return data
}

export const getBOM = async (id: string) => {
  const { data } = await api.get<BOM>(`/sales/api/boms/${id}/`)
  return data
}

export const createBOM = async (bom: Partial<BOM>) => {
  const { data } = await api.post<BOM>("/sales/api/boms/", bom)
  return data
}

export const updateBOM = async (id: string, bom: Partial<BOM>) => {
  const { data } = await api.put<BOM>(`/sales/api/boms/${id}/`, bom)
  return data
}

export const deleteBOM = async (id: string) => {
  await api.delete(`/sales/api/boms/${id}/`)
}

export const approveBOM = async (id: string) => {
  const { data } = await api.post<BOM>(`/sales/api/boms/${id}/approve/`)
  return data
}

// ============================================================================
// BOM LINE ITEMS
// ============================================================================

export const getBOMLineItems = async (bom_id: string) => {
  const { data } = await api.get<BOMLineItem[]>(`/sales/api/boms/${bom_id}/line-items/`)
  return data
}

export const createBOMLineItem = async (bom_id: string, item: Partial<BOMLineItem>) => {
  const { data } = await api.post<BOMLineItem>(`/sales/api/boms/${bom_id}/line-items/`, item)
  return data
}

export const updateBOMLineItem = async (bom_id: string, item_id: string, item: Partial<BOMLineItem>) => {
  const { data } = await api.put<BOMLineItem>(`/sales/api/boms/${bom_id}/line-items/${item_id}/`, item)
  return data
}

export const deleteBOMLineItem = async (bom_id: string, item_id: string) => {
  await api.delete(`/sales/api/boms/${bom_id}/line-items/${item_id}/`)
}

// ============================================================================
// QUOTES
// ============================================================================

export const getQuotes = async (params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  client?: string
}) => {
  const { data } = await api.get<PaginatedResponse<Quote>>("/sales/api/quotes/", { params })
  return data
}

export const getQuote = async (id: string) => {
  const { data } = await api.get<Quote>(`/sales/api/quotes/${id}/`)
  return data
}

export const createQuote = async (quote: Partial<Quote>) => {
  const { data } = await api.post<Quote>("/sales/api/quotes/", quote)
  return data
}

export const updateQuote = async (id: string, quote: Partial<Quote>) => {
  const { data } = await api.put<Quote>(`/sales/api/quotes/${id}/`, quote)
  return data
}

export const deleteQuote = async (id: string) => {
  await api.delete(`/sales/api/quotes/${id}/`)
}

export const sendQuote = async (id: string) => {
  const { data } = await api.post<Quote>(`/sales/api/quotes/${id}/send/`)
  return data
}

export const acceptQuote = async (id: string) => {
  const { data } = await api.post<Quote>(`/sales/api/quotes/${id}/accept/`)
  return data
}

export const getQuotePDF = async (id: string) => {
  const { data } = await api.get(`/sales/api/quotes/${id}/pdf/`, {
    responseType: 'blob',
  })
  return data
}

// ============================================================================
// COMMUNICATION LOGS
// ============================================================================

export const getCommunicationLogs = async (params?: {
  client?: string
  rfq?: string
  communication_type?: string
}) => {
  const { data } = await api.get<PaginatedResponse<CommunicationLog>>("/sales/api/communication-logs/", { params })
  return data
}

export const createCommunicationLog = async (log: Partial<CommunicationLog>) => {
  const { data } = await api.post<CommunicationLog>("/sales/api/communication-logs/", log)
  return data
}

export const updateCommunicationLog = async (id: string, log: Partial<CommunicationLog>) => {
  const { data } = await api.put<CommunicationLog>(`/sales/api/communication-logs/${id}/`, log)
  return data
}

export const deleteCommunicationLog = async (id: string) => {
  await api.delete(`/sales/api/communication-logs/${id}/`)
}
