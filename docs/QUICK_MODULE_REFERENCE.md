# Quick Module Reference - All Remaining Modules

This document provides essential information for implementing the remaining modules (Sales, Projects, Procurement, Operations, Analytics) in the frontend.

---

## 📋 Module Status

| Module | Detailed Docs | Quick Ref | Status |
|--------|---------------|-----------|--------|
| Accounts | ✅ Complete | ✅ | Ready |
| Inventory | ✅ Complete | ✅ | Ready |
| Sales | ⏳ Below | ✅ | Ready |
| Projects | ⏳ Below | ✅ | Ready |
| Procurement | ⏳ Below | ✅ | Ready |
| Operations | ⏳ Below | ✅ | Ready |
| Analytics | ⏳ Below | ✅ | Ready |

---

## 3. 💼 SALES MODULE

### Models (6)
- Client, RFQ, BOM, BOMLineItem, Quote, CommunicationLog

### Key Endpoints

```typescript
// Clients
GET    /api/v1/sales/clients/
POST   /api/v1/sales/clients/
GET    /api/v1/sales/clients/{id}/
PUT    /api/v1/sales/clients/{id}/
DELETE /api/v1/sales/clients/{id}/

// RFQs
GET    /api/v1/sales/rfqs/
POST   /api/v1/sales/rfqs/
GET    /api/v1/sales/rfqs/{id}/
PUT    /api/v1/sales/rfqs/{id}/
POST   /api/v1/sales/rfqs/{id}/submit/
POST   /api/v1/sales/rfqs/{id}/assign/

// BOMs
GET    /api/v1/sales/boms/
POST   /api/v1/sales/boms/
GET    /api/v1/sales/boms/{id}/
PUT    /api/v1/sales/boms/{id}/
POST   /api/v1/sales/boms/{id}/approve/
GET    /api/v1/sales/boms/{id}/line_items/
POST   /api/v1/sales/boms/{id}/line_items/

// Quotes
GET    /api/v1/sales/quotes/
POST   /api/v1/sales/quotes/
GET    /api/v1/sales/quotes/{id}/
PUT    /api/v1/sales/quotes/{id}/
POST   /api/v1/sales/quotes/{id}/send/
POST   /api/v1/sales/quotes/{id}/accept/
GET    /api/v1/sales/quotes/{id}/pdf/

// Communications
GET    /api/v1/sales/communications/
POST   /api/v1/sales/communications/
```

### TypeScript Types

```typescript
export interface Client {
  id: string;
  name: string;
  client_type: 'corporate' | 'government' | 'individual' | 'partner';
  industry: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  country: string;
  tax_id?: string;
  credit_limit: string;
  payment_terms: string;
  is_active: boolean;
  rating: string;
  created_at: string;
  updated_at: string;
}

export interface RFQ {
  id: string;
  rfq_number: string;  // Auto-generated: RFQ-YYYY-NNNN
  client: string;
  title: string;
  description: string;
  requirements: Record<string, any>;
  technical_specifications?: string;
  site_location?: string;
  required_delivery_date?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'submitted' | 'under_review' | 'technical_review' | 'quoted' | 'won' | 'lost' | 'cancelled';
  submission_date?: string;
  response_deadline?: string;
  estimated_budget?: string;
  budget_currency: string;
  assigned_to?: string;
  technical_reviewer?: string;
  is_overdue: boolean;
  days_since_submission: number;
  created_at: string;
  updated_at: string;
}

export interface BOM {
  id: string;
  rfq: string;
  name: string;
  version: number;
  status: 'draft' | 'under_review' | 'approved' | 'rejected' | 'obsolete';
  material_cost: string;
  labor_cost: string;
  overhead_cost: string;
  total_cost: string;
  notes?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BOMLineItem {
  id: string;
  bom: string;
  product: string;
  product_name?: string;
  quantity: number;
  unit_cost: string;
  line_total: string;
  notes?: string;
  is_optional: boolean;
  lead_time_days: number;
  stock_availability: {
    available: boolean;
    on_hand: number;
    available_qty: number;
    shortfall: number;
  };
}

export interface Quote {
  id: string;
  quote_number: string;  // Auto-generated: QT-YYYY-NNNN
  rfq: string;
  bom: string;
  client: string;
  title: string;
  description?: string;
  subtotal: string;
  tax_rate: string;
  tax_amount: string;
  total_amount: string;
  currency: string;
  payment_terms: string;
  delivery_terms?: string;
  warranty_terms: string;
  validity_days: number;
  estimated_delivery_days: number;
  quote_date: string;
  expiry_date: string;
  status: 'draft' | 'sent' | 'under_review' | 'accepted' | 'rejected' | 'expired' | 'cancelled';
  sent_date?: string;
  response_date?: string;
  is_expired: boolean;
  days_until_expiry: number;
  profit_margin: number;
  created_at: string;
  updated_at: string;
}

export interface CommunicationLog {
  id: string;
  client: string;
  rfq?: string;
  quote?: string;
  communication_type: 'email' | 'phone' | 'meeting' | 'site_visit' | 'proposal' | 'follow_up' | 'other';
  subject: string;
  description: string;
  contact_person?: string;
  our_representative: string;
  requires_follow_up: boolean;
  follow_up_date?: string;
  follow_up_notes?: string;
  communication_date: string;
  created_at: string;
}
```

### Service Implementation

```typescript
// src/services/salesService.ts
export const salesService = {
  // Clients
  getClients: (params?) => api.get('/sales/clients/', { params }),
  getClient: (id) => api.get(`/sales/clients/${id}/`),
  createClient: (data) => api.post('/sales/clients/', data),
  updateClient: (id, data) => api.put(`/sales/clients/${id}/`, data),
  deleteClient: (id) => api.delete(`/sales/clients/${id}/`),

  // RFQs
  getRFQs: (params?) => api.get('/sales/rfqs/', { params }),
  getRFQ: (id) => api.get(`/sales/rfqs/${id}/`),
  createRFQ: (data) => api.post('/sales/rfqs/', data),
  updateRFQ: (id, data) => api.put(`/sales/rfqs/${id}/`, data),
  submitRFQ: (id) => api.post(`/sales/rfqs/${id}/submit/`),
  assignRFQ: (id, data) => api.post(`/sales/rfqs/${id}/assign/`, data),

  // BOMs
  getBOMs: (params?) => api.get('/sales/boms/', { params }),
  getBOM: (id) => api.get(`/sales/boms/${id}/`),
  createBOM: (data) => api.post('/sales/boms/', data),
  updateBOM: (id, data) => api.put(`/sales/boms/${id}/`, data),
  approveBOM: (id) => api.post(`/sales/boms/${id}/approve/`),
  getBOMLineItems: (id) => api.get(`/sales/boms/${id}/line_items/`),
  addBOMLineItem: (id, data) => api.post(`/sales/boms/${id}/line_items/`, data),

  // Quotes
  getQuotes: (params?) => api.get('/sales/quotes/', { params }),
  getQuote: (id) => api.get(`/sales/quotes/${id}/`),
  createQuote: (data) => api.post('/sales/quotes/', data),
  updateQuote: (id, data) => api.put(`/sales/quotes/${id}/`, data),
  sendQuote: (id) => api.post(`/sales/quotes/${id}/send/`),
  acceptQuote: (id) => api.post(`/sales/quotes/${id}/accept/`),
  getQuotePDF: (id) => api.get(`/sales/quotes/${id}/pdf/`),

  // Communications
  getCommunications: (params?) => api.get('/sales/communications/', { params }),
  logCommunication: (data) => api.post('/sales/communications/', data),
};
```

---

## 4. 🏗️ PROJECTS MODULE

### Models (5)
- Project, ProjectTask, ProjectMilestone, ProjectResource, ProjectUpdate

### Key Endpoints

```typescript
// Projects
GET    /api/v1/projects/projects/
POST   /api/v1/projects/projects/
GET    /api/v1/projects/projects/{id}/
PUT    /api/v1/projects/projects/{id}/
POST   /api/v1/projects/projects/{id}/complete/
GET    /api/v1/projects/projects/{id}/tasks/
GET    /api/v1/projects/projects/{id}/milestones/
GET    /api/v1/projects/projects/{id}/resources/
GET    /api/v1/projects/projects/{id}/updates/

// Tasks
GET    /api/v1/projects/tasks/
POST   /api/v1/projects/tasks/
GET    /api/v1/projects/tasks/{id}/
PUT    /api/v1/projects/tasks/{id}/
POST   /api/v1/projects/tasks/{id}/start/
POST   /api/v1/projects/tasks/{id}/complete/

// Milestones
GET    /api/v1/projects/milestones/
POST   /api/v1/projects/milestones/
GET    /api/v1/projects/milestones/{id}/
PUT    /api/v1/projects/milestones/{id}/
POST   /api/v1/projects/milestones/{id}/complete/

// Resources
GET    /api/v1/projects/resources/
POST   /api/v1/projects/resources/
GET    /api/v1/projects/resources/{id}/
PUT    /api/v1/projects/resources/{id}/

// Updates
GET    /api/v1/projects/updates/
POST   /api/v1/projects/updates/
GET    /api/v1/projects/updates/{id}/
```

### TypeScript Types

```typescript
export interface Project {
  id: string;
  project_number: string;  // Auto-generated: PRJ-YYYY-NNNN
  client: string;
  quote?: string;
  bom?: string;
  name: string;
  description?: string;
  site_location?: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  start_date?: string;
  planned_end_date?: string;
  actual_end_date?: string;
  budget: string;
  actual_cost: string;
  project_manager?: string;
  team_members: string[];
  progress_percentage: number;
  notes?: string;
  documents: string[];
  is_overdue: boolean;
  days_remaining: number;
  budget_variance: string;
  budget_variance_percentage: number;
  duration_days: number;
  elapsed_days: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectTask {
  id: string;
  project: string;
  title: string;
  description?: string;
  task_number?: string;
  status: 'not_started' | 'in_progress' | 'blocked' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigned_to?: string;
  planned_start_date?: string;
  planned_end_date?: string;
  actual_start_date?: string;
  actual_end_date?: string;
  progress_percentage: number;
  estimated_hours: string;
  actual_hours: string;
  dependencies: string[];
  notes?: string;
  is_overdue: boolean;
  can_start: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectMilestone {
  id: string;
  project: string;
  name: string;
  description?: string;
  planned_date: string;
  actual_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'missed';
  deliverables?: string;
  completion_criteria?: string;
  is_overdue: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectResource {
  id: string;
  project: string;
  resource_type: 'material' | 'equipment' | 'personnel' | 'service' | 'other';
  name: string;
  description?: string;
  product?: string;
  quantity_allocated: string;
  quantity_used: string;
  unit_cost: string;
  total_cost: string;
  quantity_remaining: string;
  assigned_to_task?: string;
  allocated_date: string;
  created_at: string;
}

export interface ProjectUpdate {
  id: string;
  project: string;
  update_type: 'status' | 'progress' | 'issue' | 'milestone' | 'resource' | 'other';
  title: string;
  description: string;
  progress_percentage?: number;
  is_blocking: boolean;
  requires_action: boolean;
  attachments: string[];
  update_date: string;
  created_by: string;
  created_at: string;
}
```

---

## 5. 🛒 PROCUREMENT MODULE

### Models (5)
- PurchaseOrder, POLineItem, Shipment, GoodsReceipt, GoodsReceiptItem

### Key Endpoints

```typescript
// Purchase Orders
GET    /api/v1/procurement/purchase-orders/
POST   /api/v1/procurement/purchase-orders/
GET    /api/v1/procurement/purchase-orders/{id}/
PUT    /api/v1/procurement/purchase-orders/{id}/
POST   /api/v1/procurement/purchase-orders/{id}/submit/
POST   /api/v1/procurement/purchase-orders/{id}/approve/
POST   /api/v1/procurement/purchase-orders/{id}/order/
GET    /api/v1/procurement/purchase-orders/{id}/line-items/

// Shipments
GET    /api/v1/procurement/shipments/
POST   /api/v1/procurement/shipments/
GET    /api/v1/procurement/shipments/{id}/
PUT    /api/v1/procurement/shipments/{id}/
POST   /api/v1/procurement/shipments/{id}/deliver/

// Goods Receipts
GET    /api/v1/procurement/goods-receipts/
POST   /api/v1/procurement/goods-receipts/
GET    /api/v1/procurement/goods-receipts/{id}/
GET    /api/v1/procurement/goods-receipts/{id}/items/
```

### TypeScript Types

```typescript
export interface PurchaseOrder {
  id: string;
  po_number: string;  // Auto-generated: PO-YYYY-NNNN
  supplier: string;
  project?: string;
  description?: string;
  status: 'draft' | 'submitted' | 'approved' | 'ordered' | 'partially_received' | 'received' | 'cancelled';
  order_date: string;
  expected_delivery_date?: string;
  actual_delivery_date?: string;
  subtotal: string;
  tax_rate: string;
  tax_amount: string;
  shipping_cost: string;
  total_amount: string;
  currency: string;
  payment_terms: string;
  delivery_terms?: string;
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  is_overdue: boolean;
  days_until_delivery: number;
  received_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface POLineItem {
  id: string;
  purchase_order: string;
  product: string;
  product_name?: string;
  quantity: number;
  unit_cost: string;
  line_total: string;
  received_quantity: number;
  remaining_quantity: number;
  is_fully_received: boolean;
  notes?: string;
  expected_delivery_date?: string;
}

export interface Shipment {
  id: string;
  shipment_number: string;
  purchase_order: string;
  carrier?: string;
  tracking_number?: string;
  status: 'pending' | 'in_transit' | 'customs' | 'delivered' | 'cancelled';
  ship_date?: string;
  estimated_arrival_date?: string;
  actual_arrival_date?: string;
  customs_declaration_number?: string;
  customs_clearance_date?: string;
  documents: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GoodsReceipt {
  id: string;
  receipt_number: string;  // Auto-generated: GR-YYYY-NNNN
  purchase_order: string;
  shipment?: string;
  receipt_date: string;
  received_by: string;
  quality_check_passed: boolean;
  quality_notes?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GoodsReceiptItem {
  id: string;
  goods_receipt: string;
  po_line_item: string;
  product_name?: string;
  quantity_received: number;
  location: string;
  quality_status: 'accepted' | 'rejected' | 'quarantine';
  notes?: string;
  created_at: string;
}
```

---

## 6. ⚙️ OPERATIONS MODULE

### Models (4)
- WorkOrder, MaterialRequest, MaterialRequestItem, FieldUpdate

### Key Endpoints

```typescript
// Work Orders
GET    /api/v1/operations/work-orders/
POST   /api/v1/operations/work-orders/
GET    /api/v1/operations/work-orders/{id}/
PUT    /api/v1/operations/work-orders/{id}/
POST   /api/v1/operations/work-orders/{id}/start/
POST   /api/v1/operations/work-orders/{id}/complete/
GET    /api/v1/operations/work-orders/{id}/material-requests/
GET    /api/v1/operations/work-orders/{id}/field-updates/

// Material Requests
GET    /api/v1/operations/material-requests/
POST   /api/v1/operations/material-requests/
GET    /api/v1/operations/material-requests/{id}/
PUT    /api/v1/operations/material-requests/{id}/
POST   /api/v1/operations/material-requests/{id}/approve/
POST   /api/v1/operations/material-requests/{id}/dispatch/
GET    /api/v1/operations/material-requests/{id}/items/

// Field Updates
GET    /api/v1/operations/field-updates/
POST   /api/v1/operations/field-updates/
GET    /api/v1/operations/field-updates/{id}/
```

### TypeScript Types

```typescript
export interface WorkOrder {
  id: string;
  wo_number: string;  // Auto-generated: WO-YYYY-NNNN
  project: string;
  project_task?: string;
  title: string;
  description: string;
  work_type: 'installation' | 'maintenance' | 'repair' | 'inspection' | 'commissioning';
  status: 'draft' | 'scheduled' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  site_location: string;
  site_contact_person?: string;
  site_contact_phone?: string;
  scheduled_start_date?: string;
  scheduled_end_date?: string;
  actual_start_date?: string;
  actual_end_date?: string;
  assigned_team_lead?: string;
  team_members: string[];
  progress_percentage: number;
  notes?: string;
  completion_notes?: string;
  photos: string[];
  documents: string[];
  is_overdue: boolean;
  duration_days: number;
  created_at: string;
  updated_at: string;
}

export interface MaterialRequest {
  id: string;
  request_number: string;  // Auto-generated: MR-YYYY-NNNN
  work_order: string;
  status: 'draft' | 'submitted' | 'approved' | 'dispatched' | 'received' | 'rejected';
  requested_date: string;
  required_date: string;
  approved_by?: string;
  approved_at?: string;
  dispatched_by?: string;
  dispatched_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MaterialRequestItem {
  id: string;
  material_request: string;
  product: string;
  product_name?: string;
  quantity_requested: number;
  quantity_dispatched: number;
  is_fully_dispatched: boolean;
  notes?: string;
  created_at: string;
}

export interface FieldUpdate {
  id: string;
  work_order: string;
  update_type: 'progress' | 'issue' | 'completion' | 'material' | 'other';
  title: string;
  description: string;
  progress_percentage?: number;
  is_blocking: boolean;
  requires_action: boolean;
  photos: string[];
  latitude?: string;
  longitude?: string;
  update_date: string;
  created_by: string;
  created_at: string;
}
```

---

## 7. 📊 ANALYTICS MODULE

### Models (3)
- Anomaly, Insight, AnalyticsCache

### Key Endpoints

```typescript
// Anomalies
GET    /api/v1/analytics/anomalies/
POST   /api/v1/analytics/anomalies/
GET    /api/v1/analytics/anomalies/{id}/
PUT    /api/v1/analytics/anomalies/{id}/
POST   /api/v1/analytics/anomalies/{id}/acknowledge/
POST   /api/v1/analytics/anomalies/{id}/resolve/
GET    /api/v1/analytics/anomalies/statistics/

// Insights
GET    /api/v1/analytics/insights/
POST   /api/v1/analytics/insights/
GET    /api/v1/analytics/insights/{id}/
PUT    /api/v1/analytics/insights/{id}/
POST   /api/v1/analytics/insights/{id}/dismiss/
POST   /api/v1/analytics/insights/generate/
GET    /api/v1/analytics/insights/statistics/

// Cache
GET    /api/v1/analytics/cache/
POST   /api/v1/analytics/cache/clear_all/
POST   /api/v1/analytics/cache/clear_expired/
```

### TypeScript Types

```typescript
export interface Anomaly {
  id: string;
  anomaly_type: 'inventory_depletion' | 'inventory_surplus' | 'cost_overrun' | 'price_spike' | 'timeline_delay' | 'supplier_delay' | 'quality_issue' | 'budget_variance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'acknowledged' | 'investigating' | 'resolved' | 'false_positive';
  title: string;
  description: string;
  detected_value?: string;
  expected_value?: string;
  variance_percentage?: string;
  related_object_type?: string;
  related_object_id?: string;
  recommendation?: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved_by?: string;
  resolved_at?: string;
  resolution_notes?: string;
  detected_at: string;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  insight_type: 'trend' | 'prediction' | 'recommendation' | 'alert' | 'opportunity';
  category: 'inventory' | 'sales' | 'projects' | 'procurement' | 'operations' | 'financial';
  title: string;
  description: string;
  recommendation?: string;
  confidence_score?: string;
  impact_score?: string;
  is_active: boolean;
  is_dismissed: boolean;
  dismissed_by?: string;
  dismissed_at?: string;
  generated_at: string;
  expires_at?: string;
  created_at: string;
}

export interface AnalyticsCache {
  id: string;
  cache_key: string;
  cache_data: any;
  expires_at: string;
  is_expired: boolean;
  created_at: string;
}
```

---

## 🎯 Implementation Priority

1. ✅ **Accounts** - DONE
2. ✅ **Inventory** - DONE
3. **Sales** - Implement next (clients, RFQs, quotes)
4. **Projects** - After sales
5. **Procurement** - After projects
6. **Operations** - After procurement
7. **Analytics** - Last (uses all modules)

---

## 📝 Quick Implementation Steps

For each module:

1. **Copy TypeScript types** to `src/types/{module}.ts`
2. **Create service** in `src/services/{module}Service.ts`
3. **Create list page** in `src/pages/{module}/{Module}ListPage.tsx`
4. **Create form** in `src/components/{module}/{Module}Form.tsx`
5. **Add routes** to router
6. **Test with backend**

---

## 🚀 All Backend APIs Ready

- ✅ Django server running on port 8000
- ✅ Swagger UI: http://localhost:8000/api/docs/
- ✅ All 180+ endpoints documented
- ✅ Test credentials: admin / admin123

---

**You now have everything needed to implement all modules in the frontend!**
