import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as salesService from '@/services/sales'
import type { Client, RFQ, BOM, BOMLineItem, Quote, CommunicationLog } from '@/types/sales'

// ============================================================================
// CLIENTS
// ============================================================================

export function useClients(params?: {
  page?: number
  page_size?: number
  search?: string
  client_type?: string
  active_only?: boolean
}) {
  return useQuery({
    queryKey: ['clients', params],
    queryFn: () => salesService.getClients(params),
  })
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => salesService.getClient(id),
    enabled: !!id,
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success('Client created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create client')
    },
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Client> }) =>
      salesService.updateClient(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['client', variables.id] })
      toast.success('Client updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update client')
    },
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success('Client deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete client')
    },
  })
}

// ============================================================================
// RFQs
// ============================================================================

export function useRFQs(params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  priority?: string
  assigned_to?: string
}) {
  return useQuery({
    queryKey: ['rfqs', params],
    queryFn: () => salesService.getRFQs(params),
  })
}

export function useRFQ(id: string) {
  return useQuery({
    queryKey: ['rfq', id],
    queryFn: () => salesService.getRFQ(id),
    enabled: !!id,
  })
}

export function useCreateRFQ() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.createRFQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rfqs'] })
      toast.success('RFQ created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create RFQ')
    },
  })
}

export function useUpdateRFQ() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RFQ> }) =>
      salesService.updateRFQ(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rfqs'] })
      queryClient.invalidateQueries({ queryKey: ['rfq', variables.id] })
      toast.success('RFQ updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update RFQ')
    },
  })
}

export function useDeleteRFQ() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.deleteRFQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rfqs'] })
      toast.success('RFQ deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete RFQ')
    },
  })
}

export function useSubmitRFQ() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.submitRFQ,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['rfqs'] })
      queryClient.invalidateQueries({ queryKey: ['rfq', id] })
      toast.success('RFQ submitted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to submit RFQ')
    },
  })
}

export function useAssignRFQ() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, user_id }: { id: string; user_id: string }) =>
      salesService.assignRFQ(id, user_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rfqs'] })
      queryClient.invalidateQueries({ queryKey: ['rfq', variables.id] })
      toast.success('RFQ assigned successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to assign RFQ')
    },
  })
}

// ============================================================================
// BOMs
// ============================================================================

export function useBOMs(params?: {
  page?: number
  page_size?: number
  rfq?: string
  status?: string
}) {
  return useQuery({
    queryKey: ['boms', params],
    queryFn: () => salesService.getBOMs(params),
  })
}

export function useBOM(id: string) {
  return useQuery({
    queryKey: ['bom', id],
    queryFn: () => salesService.getBOM(id),
    enabled: !!id,
  })
}

export function useCreateBOM() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.createBOM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boms'] })
      toast.success('BOM created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create BOM')
    },
  })
}

export function useUpdateBOM() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BOM> }) =>
      salesService.updateBOM(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boms'] })
      queryClient.invalidateQueries({ queryKey: ['bom', variables.id] })
      toast.success('BOM updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update BOM')
    },
  })
}

export function useDeleteBOM() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.deleteBOM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boms'] })
      toast.success('BOM deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete BOM')
    },
  })
}

export function useApproveBOM() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.approveBOM,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['boms'] })
      queryClient.invalidateQueries({ queryKey: ['bom', id] })
      toast.success('BOM approved successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to approve BOM')
    },
  })
}

// ============================================================================
// BOM LINE ITEMS
// ============================================================================

export function useBOMLineItems(bom_id: string) {
  return useQuery({
    queryKey: ['bom-line-items', bom_id],
    queryFn: () => salesService.getBOMLineItems(bom_id),
    enabled: !!bom_id,
  })
}

export function useCreateBOMLineItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ bom_id, item }: { bom_id: string; item: Partial<BOMLineItem> }) =>
      salesService.createBOMLineItem(bom_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bom-line-items', variables.bom_id] })
      queryClient.invalidateQueries({ queryKey: ['bom', variables.bom_id] })
      toast.success('Line item added successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to add line item')
    },
  })
}

export function useUpdateBOMLineItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ bom_id, item_id, item }: { bom_id: string; item_id: string; item: Partial<BOMLineItem> }) =>
      salesService.updateBOMLineItem(bom_id, item_id, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bom-line-items', variables.bom_id] })
      queryClient.invalidateQueries({ queryKey: ['bom', variables.bom_id] })
      toast.success('Line item updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update line item')
    },
  })
}

export function useDeleteBOMLineItem() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ bom_id, item_id }: { bom_id: string; item_id: string }) =>
      salesService.deleteBOMLineItem(bom_id, item_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bom-line-items', variables.bom_id] })
      queryClient.invalidateQueries({ queryKey: ['bom', variables.bom_id] })
      toast.success('Line item deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete line item')
    },
  })
}

// ============================================================================
// QUOTES
// ============================================================================

export function useQuotes(params?: {
  page?: number
  page_size?: number
  search?: string
  status?: string
  client?: string
}) {
  return useQuery({
    queryKey: ['quotes', params],
    queryFn: () => salesService.getQuotes(params),
  })
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: ['quote', id],
    queryFn: () => salesService.getQuote(id),
    enabled: !!id,
  })
}

export function useCreateQuote() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
      toast.success('Quote created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create quote')
    },
  })
}

export function useUpdateQuote() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Quote> }) =>
      salesService.updateQuote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
      queryClient.invalidateQueries({ queryKey: ['quote', variables.id] })
      toast.success('Quote updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update quote')
    },
  })
}

export function useDeleteQuote() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
      toast.success('Quote deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete quote')
    },
  })
}

export function useSendQuote() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.sendQuote,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
      queryClient.invalidateQueries({ queryKey: ['quote', id] })
      toast.success('Quote sent successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to send quote')
    },
  })
}

export function useAcceptQuote() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.acceptQuote,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
      queryClient.invalidateQueries({ queryKey: ['quote', id] })
      toast.success('Quote accepted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to accept quote')
    },
  })
}

// ============================================================================
// COMMUNICATION LOGS
// ============================================================================

export function useCommunicationLogs(params?: {
  client?: string
  rfq?: string
  communication_type?: string
}) {
  return useQuery({
    queryKey: ['communication-logs', params],
    queryFn: () => salesService.getCommunicationLogs(params),
  })
}

export function useCreateCommunicationLog() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.createCommunicationLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communication-logs'] })
      toast.success('Communication logged successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to log communication')
    },
  })
}

export function useUpdateCommunicationLog() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CommunicationLog> }) =>
      salesService.updateCommunicationLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communication-logs'] })
      toast.success('Communication updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update communication')
    },
  })
}

export function useDeleteCommunicationLog() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: salesService.deleteCommunicationLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communication-logs'] })
      toast.success('Communication deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete communication')
    },
  })
}
