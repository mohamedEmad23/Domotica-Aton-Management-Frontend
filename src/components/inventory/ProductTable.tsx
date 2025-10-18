"use client"

import { Edit, Trash2, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/types/api"

interface ProductTableProps {
  products: Product[]
  isLoading: boolean
  onEdit: (id: string) => void
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ProductTable({ products, isLoading, onEdit, page, totalPages, onPageChange }: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
        <p className="mt-2 text-sm text-gray-500">Get started by creating your first product.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category_name || "-"}</TableCell>
                <TableCell className="uppercase">{product.unit_of_measure}</TableCell>
                <TableCell className="text-right">EGP {product.standard_cost}</TableCell>
                <TableCell className="text-right">{product.current_stock_level}</TableCell>
                <TableCell>
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(product.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
