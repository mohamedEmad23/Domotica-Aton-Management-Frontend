import api from "./api"
import type { PaginatedResponse } from "@/types/api"
import type {
  PurchaseOrder,
  POLineItem,
  Shipment,
  GoodsReceipt,
  GoodsReceiptItem,
} from "@/types/procurement"

// ============================================================================
// PURCHASE ORDERS
// ============================================================================

export const getPurchaseOrders = async (params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  supplier?: string
}) => {
  const { data } = await api.get<PaginatedResponse<PurchaseOrder>>("/procurement/api/purchase-orders/", { params })
  return data
}

export const getPurchaseOrder = async (id: string) => {
  const { data } = await api.get<PurchaseOrder>(`/procurement/api/purchase-orders/${id}/`)
  return data
}

export const createPurchaseOrder = async (po: Partial<PurchaseOrder>) => {
  const { data } = await api.post<PurchaseOrder>("/procurement/api/purchase-orders/", po)
  return data
}

export const updatePurchaseOrder = async (id: string, po: Partial<PurchaseOrder>) => {
  const { data } = await api.put<PurchaseOrder>(`/procurement/api/purchase-orders/${id}/`, po)
  return data
}

export const deletePurchaseOrder = async (id: string) => {
  await api.delete(`/procurement/api/purchase-orders/${id}/`)
}

export const submitPurchaseOrder = async (id: string) => {
  const { data } = await api.post<PurchaseOrder>(`/procurement/api/purchase-orders/${id}/submit/`)
  return data
}

export const approvePurchaseOrder = async (id: string) => {
  const { data } = await api.post<PurchaseOrder>(`/procurement/api/purchase-orders/${id}/approve/`)
  return data
}

export const orderPurchaseOrder = async (id: string) => {
  const { data } = await api.post<PurchaseOrder>(`/procurement/api/purchase-orders/${id}/order/`)
  return data
}

// ============================================================================
// PO LINE ITEMS
// ============================================================================

export const getPOLineItems = async (po_id: string) => {
  const { data } = await api.get<POLineItem[]>(`/procurement/api/purchase-orders/${po_id}/line-items/`)
  return data
}

export const createPOLineItem = async (po_id: string, item: Partial<POLineItem>) => {
  const { data } = await api.post<POLineItem>(`/procurement/api/purchase-orders/${po_id}/line-items/`, item)
  return data
}

export const updatePOLineItem = async (po_id: string, item_id: string, item: Partial<POLineItem>) => {
  const { data } = await api.put<POLineItem>(`/procurement/api/purchase-orders/${po_id}/line-items/${item_id}/`, item)
  return data
}

export const deletePOLineItem = async (po_id: string, item_id: string) => {
  await api.delete(`/procurement/api/purchase-orders/${po_id}/line-items/${item_id}/`)
}

// ============================================================================
// SHIPMENTS
// ============================================================================

export const getShipments = async (params?: {
  page?: number
  page_size?: number
  purchase_order?: string
  status?: string
}) => {
  const { data } = await api.get<PaginatedResponse<Shipment>>("/procurement/api/shipments/", { params })
  return data
}

export const getShipment = async (id: string) => {
  const { data } = await api.get<Shipment>(`/procurement/api/shipments/${id}/`)
  return data
}

export const createShipment = async (shipment: Partial<Shipment>) => {
  const { data } = await api.post<Shipment>("/procurement/api/shipments/", shipment)
  return data
}

export const updateShipment = async (id: string, shipment: Partial<Shipment>) => {
  const { data } = await api.put<Shipment>(`/procurement/api/shipments/${id}/`, shipment)
  return data
}

export const deleteShipment = async (id: string) => {
  await api.delete(`/procurement/api/shipments/${id}/`)
}

export const deliverShipment = async (id: string) => {
  const { data } = await api.post<Shipment>(`/procurement/api/shipments/${id}/deliver/`)
  return data
}

// ============================================================================
// GOODS RECEIPTS
// ============================================================================

export const getGoodsReceipts = async (params?: {
  page?: number
  page_size?: number
  purchase_order?: string
}) => {
  const { data } = await api.get<PaginatedResponse<GoodsReceipt>>("/procurement/api/goods-receipts/", { params })
  return data
}

export const getGoodsReceipt = async (id: string) => {
  const { data } = await api.get<GoodsReceipt>(`/procurement/api/goods-receipts/${id}/`)
  return data
}

export const createGoodsReceipt = async (receipt: Partial<GoodsReceipt>) => {
  const { data } = await api.post<GoodsReceipt>("/procurement/api/goods-receipts/", receipt)
  return data
}

export const updateGoodsReceipt = async (id: string, receipt: Partial<GoodsReceipt>) => {
  const { data } = await api.put<GoodsReceipt>(`/procurement/api/goods-receipts/${id}/`, receipt)
  return data
}

export const deleteGoodsReceipt = async (id: string) => {
  await api.delete(`/procurement/api/goods-receipts/${id}/`)
}

// ============================================================================
// GOODS RECEIPT ITEMS
// ============================================================================

export const getGoodsReceiptItems = async (receipt_id: string) => {
  const { data } = await api.get<GoodsReceiptItem[]>(`/procurement/api/goods-receipts/${receipt_id}/items/`)
  return data
}

export const createGoodsReceiptItem = async (receipt_id: string, item: Partial<GoodsReceiptItem>) => {
  const { data } = await api.post<GoodsReceiptItem>(`/procurement/api/goods-receipts/${receipt_id}/items/`, item)
  return data
}

export const updateGoodsReceiptItem = async (receipt_id: string, item_id: string, item: Partial<GoodsReceiptItem>) => {
  const { data } = await api.put<GoodsReceiptItem>(`/procurement/api/goods-receipts/${receipt_id}/items/${item_id}/`, item)
  return data
}

export const deleteGoodsReceiptItem = async (receipt_id: string, item_id: string) => {
  await api.delete(`/procurement/api/goods-receipts/${receipt_id}/items/${item_id}/`)
}
