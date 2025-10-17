# Aton ERP Frontend

Enterprise Resource Planning system for Aton Integrated Management Platform.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router v6** - Routing
- **React Query** - Server state management
- **Zustand** - Client state management
- **Axios** - HTTP client
- **React Hook Form + Zod** - Form handling
- **shadcn/ui** - Component library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open http://localhost:3000

### Default Login

Use the credentials from your Django backend admin user.

## Project Structure

\`\`\`
src/
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── layout/      # Layout components
│   └── auth/        # Auth components
├── pages/           # Page components
├── services/        # API services
├── stores/          # Zustand stores
├── types/           # TypeScript types
├── lib/             # Utilities
└── styles/          # Global styles
\`\`\`

## Development

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Phase 1 Complete ✅

- [x] Project setup with React + TypeScript + Vite
- [x] Tailwind CSS v4 configuration
- [x] API service layer with Axios
- [x] React Query setup
- [x] Zustand stores (auth, UI)
- [x] Main layout with collapsible sidebar
- [x] Top navigation bar
- [x] Authentication flow (login/logout)
- [x] Protected routes
- [x] Dashboard page

## Next Steps

Phase 2: Inventory Module
- Product list with search/filter/sort
- Product detail page
- Product create/edit forms
- Stock management
- Supplier management
