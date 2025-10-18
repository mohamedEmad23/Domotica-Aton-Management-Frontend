"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductTable } from "./ProductTable"
import { ProductDialog } from "./ProductDialog"
import { getProducts } from "@/services/inventory"

export function ProductsTab() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", page, search],
    queryFn: () => getProducts({ page, page_size: 20, search: search || undefined }),
  })

  const handleEdit = (productId: string) => {
    setSelectedProduct(productId)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedProduct(null)
    refetch()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductTable
        products={data?.results || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        page={page}
        totalPages={data ? Math.ceil(data.count / 20) : 1}
        onPageChange={setPage}
      />

      <ProductDialog open={isDialogOpen} onClose={handleDialogClose} productId={selectedProduct} />
    </div>
  )
}
