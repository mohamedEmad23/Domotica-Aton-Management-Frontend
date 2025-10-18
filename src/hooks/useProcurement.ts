import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as procurementService from '@/services/procurement'
import type { PurchaseOrder, POLineItem, Shipment, GoodsReceipt, GoodsReceiptItem } from '@/types/procurement'

// ============================================================================
// PURCHASE ORDERS
// ============================================================================

export function usePurchaseOrders(params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  supplier?: string
}) {
  return useQuery({
    queryKey: ['purchase-orders', params],
    queryFn: () => procurementService.getPurchaseOrders(params),
  })
}

export function usePurchaseOrder(id: string) {
  return useQuery({
    queryKey: ['purchase-order', id],
    queryFn: () => procurementService.getPurchaseOrder(id),
    enabled: !!id,
  })
}

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.createPurchaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      toast.success('Purchase order created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create purchase order')
    },
  })
}

export function useUpdatePurchaseOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseOrder> }) =>
      procurementService.updatePurchaseOrder(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', variables.id] })
      toast.success('Purchase order updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update purchase order')
    },
  })
}

export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.deletePurchaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      toast.success('Purchase order deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete purchase order')
    },
  })
}

export function useSubmitPurchaseOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.submitPurchaseOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', id] })
      toast.success('Purchase order submitted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to submit purchase order')
    },
  })
}

export function useApprovePurchaseOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.approvePurchaseOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', id] })
      toast.success('Purchase order approved successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to approve purchase order')
    },
  })
}

export function useOrderPurchaseOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.orderPurchaseOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', id] })
      toast.success('Purchase order placed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to place purchase order')
    },
  })
}

// ============================================================================
// PO LINE ITEMS
// ============================================================================

export function usePOLineItems(po_id: string) {
  return useQuery({
    queryKey: ['po-line-items', po_id],
    queryFn: () => procurementService.getPOLineItems(po_id),
    enabled: !!po_id,
  })
}

export function useCreatePOLineItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ po_id, item }: { po_id: string; item: Partial<POLineItem> }) =>
      procurementService.createPOLineItem(po_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['po-line-items', variables.po_id] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', variables.po_id] })
      toast.success('Line item added successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to add line item')
    },
  })
}

export function useUpdatePOLineItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ po_id, item_id, item }: { po_id: string; item_id: string; item: Partial<POLineItem> }) =>
      procurementService.updatePOLineItem(po_id, item_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['po-line-items', variables.po_id] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', variables.po_id] })
      toast.success('Line item updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update line item')
    },
  })
}

export function useDeletePOLineItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ po_id, item_id }: { po_id: string; item_id: string }) =>
      procurementService.deletePOLineItem(po_id, item_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['po-line-items', variables.po_id] })
      queryClient.invalidateQueries({ queryKey: ['purchase-order', variables.po_id] })
      toast.success('Line item deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete line item')
    },
  })
}

// ============================================================================
// SHIPMENTS
// ============================================================================

export function useShipments(params?: {
  page?: number
  page_size?: number
  purchase_order?: string
  status?: string
}) {
  return useQuery({
    queryKey: ['shipments', params],
    queryFn: () => procurementService.getShipments(params),
  })
}

export function useShipment(id: string) {
  return useQuery({
    queryKey: ['shipment', id],
    queryFn: () => procurementService.getShipment(id),
    enabled: !!id,
  })
}

export function useCreateShipment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.createShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      toast.success('Shipment created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create shipment')
    },
  })
}

export function useUpdateShipment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Shipment> }) =>
      procurementService.updateShipment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      queryClient.invalidateQueries({ queryKey: ['shipment', variables.id] })
      toast.success('Shipment updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update shipment')
    },
  })
}

export function useDeleteShipment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.deleteShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      toast.success('Shipment deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete shipment')
    },
  })
}

export function useDeliverShipment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.deliverShipment,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      queryClient.invalidateQueries({ queryKey: ['shipment', id] })
      toast.success('Shipment delivered successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to deliver shipment')
    },
  })
}

// ============================================================================
// GOODS RECEIPTS
// ============================================================================

export function useGoodsReceipts(params?: {
  page?: number
  page_size?: number
  purchase_order?: string
}) {
  return useQuery({
    queryKey: ['goods-receipts', params],
    queryFn: () => procurementService.getGoodsReceipts(params),
  })
}

export function useGoodsReceipt(id: string) {
  return useQuery({
    queryKey: ['goods-receipt', id],
    queryFn: () => procurementService.getGoodsReceipt(id),
    enabled: !!id,
  })
}

export function useCreateGoodsReceipt() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.createGoodsReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipts'] })
      toast.success('Goods receipt created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create goods receipt')
    },
  })
}

export function useUpdateGoodsReceipt() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<GoodsReceipt> }) =>
      procurementService.updateGoodsReceipt(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipts'] })
      queryClient.invalidateQueries({ queryKey: ['goods-receipt', variables.id] })
      toast.success('Goods receipt updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update goods receipt')
    },
  })
}

export function useDeleteGoodsReceipt() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: procurementService.deleteGoodsReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipts'] })
      toast.success('Goods receipt deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete goods receipt')
    },
  })
}

// ============================================================================
// GOODS RECEIPT ITEMS
// ============================================================================

export function useGoodsReceiptItems(receipt_id: string) {
  return useQuery({
    queryKey: ['goods-receipt-items', receipt_id],
    queryFn: () => procurementService.getGoodsReceiptItems(receipt_id),
    enabled: !!receipt_id,
  })
}

export function useCreateGoodsReceiptItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ receipt_id, item }: { receipt_id: string; item: Partial<GoodsReceiptItem> }) =>
      procurementService.createGoodsReceiptItem(receipt_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipt-items', variables.receipt_id] })
      queryClient.invalidateQueries({ queryKey: ['goods-receipt', variables.receipt_id] })
      toast.success('Receipt item added successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to add receipt item')
    },
  })
}

export function useUpdateGoodsReceiptItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ receipt_id, item_id, item }: { receipt_id: string; item_id: string; item: Partial<GoodsReceiptItem> }) =>
      procurementService.updateGoodsReceiptItem(receipt_id, item_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipt-items', variables.receipt_id] })
      queryClient.invalidateQueries({ queryKey: ['goods-receipt', variables.receipt_id] })
      toast.success('Receipt item updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update receipt item')
    },
  })
}

export function useDeleteGoodsReceiptItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ receipt_id, item_id }: { receipt_id: string; item_id: string }) =>
      procurementService.deleteGoodsReceiptItem(receipt_id, item_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipt-items', variables.receipt_id] })
      queryClient.invalidateQueries({ queryKey: ['goods-receipt', variables.receipt_id] })
      toast.success('Receipt item deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete receipt item')
    },
  })
}
