"use client"

import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderKanban,
  ShoppingBag,
  Wrench,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/stores/uiStore"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Sales & Quoting", href: "/sales", icon: ShoppingCart },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Procurement", href: "/procurement", icon: ShoppingBag },
  { name: "Operations", href: "/operations", icon: Wrench },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: Users },
]

export function Sidebar() {
  const location = useLocation()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!sidebarCollapsed && <h1 className="text-xl font-bold text-primary-600">Aton ERP</h1>}
        <button onClick={toggleSidebar} className="rounded-lg p-1.5 hover:bg-gray-100" aria-label="Toggle sidebar">
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-3">
        {navigation.map((item) => {
          const isActive =
            location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-100",
                sidebarCollapsed && "justify-center",
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
