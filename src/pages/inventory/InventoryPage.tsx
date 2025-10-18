"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTab } from "@/components/inventory/ProductsTab"
import { StockTab } from "@/components/inventory/StockTab"
import { SuppliersTab } from "@/components/inventory/SuppliersTab"
import { CategoriesTab } from "@/components/inventory/CategoriesTab"

export function InventoryPage() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-500">Manage products, stock levels, suppliers, and categories</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <ProductsTab />
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <StockTab />
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <SuppliersTab />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <CategoriesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
