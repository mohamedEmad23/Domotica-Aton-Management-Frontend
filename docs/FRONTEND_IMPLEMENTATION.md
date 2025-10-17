# Frontend Implementation Prompt for Aton Management Platform

**Use this prompt with UI/UX AI tools (v0.dev, Figma AI, Claude, etc.)**

---

## 🎯 Copy This Prompt

```
I need you to design and implement a complete frontend for an ERP management platform called "Aton Integrated Management Platform". This is for an automation and system integration company in Egypt.

## Project Overview

**Name:** Aton Integrated Management Platform
**Type:** Enterprise Resource Planning (ERP) System
**Industry:** Automation & System Integration
**User Base:** Solo developer initially, scaling to 10-50 users
**Backend:** Django REST API (already complete with 130+ endpoints)
**Frontend Tech Stack:** React 18+ with TypeScript, Tailwind CSS, React Query, Zustand

## Backend API Information

**Base URL:** http://localhost:8000/api/v1/
**API Documentation:** http://localhost:8000/api/docs/ (Swagger/OpenAPI)
**Authentication:** Session-based + Token authentication
**Total Endpoints:** 130+ REST API endpoints

## Core Modules (7 Main Modules)

### 1. Inventory Management
**Purpose:** Track products, stock levels, suppliers, and inventory transactions across multiple locations

**Key Features:**
- Product catalog with categories and specifications
- Multi-location inventory tracking
- Stock movements and transactions
- Supplier management
- Reorder point tracking and alerts
- Barcode/SKU management
- Inventory valuation (FIFO/LIFO/Average)
- Stock reservation system

**Main Screens Needed:**
- Product list/grid view with search and filters
- Product detail page with stock levels across locations
- Inventory dashboard with low stock alerts
- Stock movement history
- Supplier management
- Location management
- Inventory reports and analytics

**API Endpoints:**
- GET/POST /inventory/products/
- GET/POST /inventory/categories/
- GET/POST /inventory/suppliers/
- GET/POST /inventory/stock/
- GET /inventory/transactions/

### 2. Sales & Quoting System
**Purpose:** Manage clients, RFQs (Request for Quotation), quotes, and Bill of Materials

**Key Features:**
- Client/customer management
- RFQ handling and tracking
- Quote generation with line items
- Bill of Materials (BOM) builder
- Quote versioning and approval workflow
- Profit margin calculations
- Quote to project conversion

**Main Screens Needed:**
- Client list and detail pages
- RFQ dashboard with status tracking
- Interactive BOM builder (drag-and-drop)
- Quote generation form
- Quote preview and PDF export
- Sales pipeline dashboard
- Client communication history

**API Endpoints:**
- GET/POST /sales/clients/
- GET/POST /sales/rfqs/
- GET/POST /sales/quotes/
- GET/POST /sales/boms/

### 3. Project Management
**Purpose:** Track projects from quote to completion with tasks, milestones, and resources

**Key Features:**
- Project creation and tracking
- Task management with dependencies
- Milestone tracking
- Resource allocation
- Budget management and cost tracking
- Progress monitoring
- Timeline visualization (Gantt chart)
- Document attachments

**Main Screens Needed:**
- Project dashboard with status overview
- Project detail page with tabs (tasks, milestones, resources, budget)
- Interactive Gantt chart for timeline
- Kanban board for task management
- Resource allocation calendar
- Budget vs actual cost tracking
- Project progress reports

**API Endpoints:**
- GET/POST /projects/projects/
- GET/POST /projects/tasks/
- GET/POST /projects/milestones/
- GET/POST /projects/resources/

### 4. Procurement System
**Purpose:** Manage purchase orders, supplier selection, and goods receipt

**Key Features:**
- Purchase requisition workflow
- Purchase order management
- Supplier selection and comparison
- PO approval workflow
- Goods receipt and inspection
- Three-way matching (PO, Receipt, Invoice)
- Supplier performance tracking
- Shipment tracking

**Main Screens Needed:**
- Purchase order list and creation
- PO approval workflow interface
- Supplier comparison table
- Goods receipt form
- Shipment tracking dashboard
- Supplier performance scorecard
- Procurement analytics

**API Endpoints:**
- GET/POST /procurement/purchase-orders/
- GET/POST /procurement/shipments/
- GET/POST /procurement/receipts/

### 5. Operations & Field Management
**Purpose:** Manage work orders, field teams, and material dispatch

**Key Features:**
- Work order management
- Field technician assignment
- Material request system
- Inventory dispatch to projects
- Time tracking for technicians
- Work order status tracking
- Mobile-friendly interface
- Real-time updates

**Main Screens Needed:**
- Work order dashboard
- Work order creation and assignment
- Field team calendar/schedule
- Material request and dispatch
- Mobile-responsive work order view
- Time tracking interface
- Operations progress tracking

**API Endpoints:**
- GET/POST /operations/work-orders/
- GET/POST /operations/material-requests/
- GET/POST /operations/field-updates/

### 6. Analytics & Intelligence
**Purpose:** Provide insights, anomaly detection, and business intelligence

**Key Features:**
- Anomaly detection (inventory, costs, performance)
- Business insights and recommendations
- Predictive analytics
- Executive dashboard with KPIs
- Operational dashboards
- Trend analysis
- Report generation

**Main Screens Needed:**
- Executive dashboard with key metrics
- Anomaly alerts dashboard
- Insights and recommendations feed
- Inventory analytics
- Sales performance analytics
- Project profitability analysis
- Custom report builder

**API Endpoints:**
- GET /analytics/anomalies/
- GET /analytics/insights/
- POST /analytics/insights/generate/

### 7. User Management
**Purpose:** Manage users, roles, and permissions

**Key Features:**
- User authentication
- Role-based access control
- User profiles
- Activity logging
- Permission management

**Main Screens Needed:**
- Login/logout pages
- User profile
- User management (admin)
- Role and permission management

**API Endpoints:**
- GET/POST /accounts/users/
- POST /accounts/login/
- POST /accounts/logout/

## Design Requirements

### Visual Style
- **Theme:** Modern, professional, clean
- **Color Scheme:** 
  - Primary: Blue (#2563eb) - Trust, technology
  - Secondary: Slate gray (#64748b) - Professional
  - Accent: Orange (#f97316) - Energy, action
  - Success: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Error: Red (#ef4444)
- **Typography:** 
  - Headings: Inter or Poppins (bold, modern)
  - Body: Inter or System UI (readable)
- **Layout:** Dashboard-style with sidebar navigation
- **Responsive:** Desktop-first, but mobile-friendly

### UI Components Needed
- **Navigation:** Collapsible sidebar with icons and labels
- **Dashboard Cards:** KPI cards with icons and trends
- **Data Tables:** Sortable, filterable, with pagination
- **Forms:** Multi-step forms, validation, auto-save
- **Charts:** Line, bar, pie, donut charts for analytics
- **Modals:** For quick actions and confirmations
- **Notifications:** Toast notifications for success/error
- **Search:** Global search with autocomplete
- **Filters:** Advanced filtering for lists
- **Date Pickers:** For date range selection
- **File Upload:** Drag-and-drop file upload
- **Status Badges:** Color-coded status indicators
- **Action Buttons:** Primary, secondary, danger variants
- **Loading States:** Skeletons and spinners
- **Empty States:** Friendly messages when no data

### User Experience
- **Dashboard First:** Users land on role-specific dashboard
- **Quick Actions:** Common tasks accessible from anywhere
- **Breadcrumbs:** Clear navigation path
- **Keyboard Shortcuts:** Power user features
- **Bulk Actions:** Select multiple items for batch operations
- **Inline Editing:** Edit data without leaving the page
- **Real-time Updates:** Live data refresh where appropriate
- **Undo/Redo:** For critical actions
- **Contextual Help:** Tooltips and help text
- **Progressive Disclosure:** Show advanced features on demand

### Key User Flows

**Flow 1: Create a Quote**
1. Navigate to Sales → RFQs
2. Select an RFQ
3. Click "Create Quote"
4. Build BOM (add products, quantities, costs)
5. Set pricing and margins
6. Preview quote
7. Submit for approval
8. Convert to project when won

**Flow 2: Manage Inventory**
1. Navigate to Inventory → Products
2. View stock levels across locations
3. Receive low stock alert
4. Create purchase requisition
5. Convert to purchase order
6. Track shipment
7. Receive goods
8. Update inventory

**Flow 3: Track Project**
1. Navigate to Projects
2. View project dashboard
3. See tasks on Kanban board
4. Update task status
5. Log time and costs
6. Track budget vs actual
7. Update milestones
8. Generate progress report

## Technical Requirements

### Frontend Stack
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** 
  - React Query (server state)
  - Zustand (client state)
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts or Chart.js
- **Tables:** TanStack Table (React Table v8)
- **Date Handling:** date-fns
- **HTTP Client:** Axios
- **Icons:** Lucide React or Heroicons

### API Integration
- **Base URL:** Configurable via environment variable
- **Authentication:** 
  - Session cookies (primary)
  - Token authentication (optional)
  - Store auth state in Zustand
- **Error Handling:** 
  - Global error boundary
  - Toast notifications for errors
  - Retry logic for failed requests
- **Loading States:** 
  - Skeleton screens
  - Suspense boundaries
  - Loading indicators

### Code Organization
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components
│   └── modules/         # Module-specific components
├── pages/               # Page components
├── hooks/               # Custom hooks
├── services/            # API services
├── stores/              # Zustand stores
├── types/               # TypeScript types
├── utils/               # Utility functions
└── styles/              # Global styles
```

### Performance Requirements
- **Initial Load:** < 3 seconds
- **Page Transitions:** < 500ms
- **API Calls:** Show loading state after 200ms
- **Large Lists:** Virtual scrolling for 1000+ items
- **Images:** Lazy loading
- **Code Splitting:** Route-based splitting

### Accessibility
- **WCAG 2.1 Level AA** compliance
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** Proper ARIA labels
- **Color Contrast:** Minimum 4.5:1 ratio
- **Focus Indicators:** Visible focus states

## Deliverables

### Phase 1: Core Layout & Authentication
- [ ] Login/logout pages
- [ ] Main layout with sidebar navigation
- [ ] Dashboard shell
- [ ] User profile page
- [ ] Authentication flow

### Phase 2: Inventory Module
- [ ] Product list and detail pages
- [ ] Stock management interface
- [ ] Supplier management
- [ ] Inventory dashboard

### Phase 3: Sales Module
- [ ] Client management
- [ ] RFQ tracking
- [ ] BOM builder
- [ ] Quote generation

### Phase 4: Project Module
- [ ] Project dashboard
- [ ] Task management (Kanban)
- [ ] Gantt chart
- [ ] Resource allocation

### Phase 5: Procurement & Operations
- [ ] Purchase order management
- [ ] Work order interface
- [ ] Material requests

### Phase 6: Analytics & Reporting
- [ ] Executive dashboard
- [ ] Analytics charts
- [ ] Report generation

## Example API Response Formats

### Product List
```json
{
  "count": 150,
  "next": "http://localhost:8000/api/v1/inventory/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "sku": "PROD-001",
      "name": "Product Name",
      "category_name": "Category",
      "unit_of_measure": "pcs",
      "standard_cost": "100.00",
      "current_stock_level": 50,
      "available_stock": 45,
      "is_active": true
    }
  ]
}
```

### Project Detail
```json
{
  "id": "uuid",
  "project_number": "PRJ-2025-001",
  "name": "Project Name",
  "client_name": "Client Name",
  "status": "in_progress",
  "priority": "high",
  "start_date": "2025-01-01",
  "planned_end_date": "2025-06-30",
  "budget": "100000.00",
  "actual_cost": "45000.00",
  "progress_percentage": 45,
  "is_overdue": false,
  "days_remaining": 120
}
```

## Additional Context

- **Target Users:** Project managers, inventory managers, sales team, field technicians
- **Deployment:** Separate frontend repo, deployed to Vercel/Netlify
- **Backend:** Already deployed (or will be on Render.com)
- **CORS:** Backend configured to allow frontend origin
- **Environment:** Development, Staging, Production environments

## Questions to Consider

1. Should we use a component library (shadcn/ui, MUI, Ant Design) or build custom?
2. Do you want dark mode support?
3. Should we implement real-time features (WebSockets)?
4. Do you need offline support (PWA)?
5. What's the priority order for modules?
6. Do you need mobile apps (React Native) in the future?

## Success Criteria

- [ ] All 7 modules fully functional
- [ ] Responsive design (desktop, tablet, mobile)
- [ ] Fast performance (< 3s initial load)
- [ ] Intuitive UX (minimal training needed)
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Type-safe (TypeScript throughout)
- [ ] Well-documented code
- [ ] Comprehensive error handling
- [ ] Production-ready

Please design and implement this frontend with a focus on:
1. **User Experience:** Intuitive, efficient workflows
2. **Visual Design:** Modern, professional, clean
3. **Performance:** Fast, responsive, optimized
4. **Code Quality:** Type-safe, maintainable, scalable
5. **Accessibility:** Inclusive, keyboard-friendly

Start with the core layout, authentication, and one complete module (Inventory recommended) to establish patterns, then expand to other modules.
```

---

## 📋 How to Use This Prompt

### With v0.dev (Vercel)
1. Go to https://v0.dev
2. Paste the entire prompt
3. Ask for specific components first: "Create the sidebar navigation component"
4. Then: "Create the product list page"
5. Iterate on each component

### With Claude/ChatGPT
1. Start a new conversation
2. Paste the prompt
3. Ask: "Let's start with the project structure and core layout"
4. Then: "Create the authentication flow"
5. Build module by module

### With Figma AI
1. Use the prompt to describe the design system
2. Ask for wireframes first
3. Then high-fidelity mockups
4. Export to code

### With Cursor/Windsurf
1. Create new React project
2. Paste prompt in chat
3. Ask: "Set up the project structure based on this"
4. Then: "Implement the inventory module"

---

## 🎨 Design System Starter

If the AI asks for more design details, provide:

**Colors:**
```css
--primary-50: #eff6ff
--primary-500: #2563eb
--primary-900: #1e3a8a
--gray-50: #f8fafc
--gray-500: #64748b
--gray-900: #0f172a
```

**Spacing Scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64)

**Border Radius:** 
- Small: 4px
- Medium: 8px
- Large: 12px

**Shadows:**
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px rgba(0,0,0,0.1)
- lg: 0 10px 15px rgba(0,0,0,0.1)

---

## 📦 Recommended Component Libraries

If you want to speed up development:

1. **shadcn/ui** (Recommended)
   - Tailwind-based
   - Copy-paste components
   - Highly customizable

2. **Headless UI**
   - Unstyled components
   - Full control over design
   - Accessible by default

3. **Radix UI**
   - Primitive components
   - Accessible
   - Unstyled

4. **Ant Design**
   - Complete component library
   - Enterprise-ready
   - Lots of components

---

## 🔗 API Documentation Link

Provide this to the AI for API reference:
- **Swagger UI:** http://localhost:8000/api/docs/
- **OpenAPI Schema:** http://localhost:8000/api/schema/

---

## ✅ Checklist for AI

When working with AI, ask it to:
- [ ] Set up project structure
- [ ] Configure TypeScript
- [ ] Set up Tailwind CSS
- [ ] Create API service layer
- [ ] Implement authentication
- [ ] Build layout components
- [ ] Create one complete module (Inventory)
- [ ] Add error handling
- [ ] Add loading states
- [ ] Make it responsive
- [ ] Add accessibility features
- [ ] Write documentation

---

**Good luck with your frontend implementation!** 🚀
