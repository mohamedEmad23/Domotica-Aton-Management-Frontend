import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useProducts, useDeleteProduct } from '@/hooks/useInventory'
import { DataTable } from '@/components/common/DataTable'
import { PageHeader } from '@/components/common/PageHeader'
import { PageSkeleton } from '@/components/common/LoadingSkeleton'
import { ErrorState } from '@/components/common/ErrorState'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/button'
import { ProductDialog } from '@/components/inventory/ProductDialog'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import type { ColumnDef } from '@tanstack/react-table'
import type { Product } from '@/types/api'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ProductsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const { data, isLoading, error, refetch } = useProducts()
  const deleteProduct = useDeleteProduct()

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct.mutate(productToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false)
          setProductToDelete(null)
        },
      })
    }
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'category_name',
      header: 'Category',
    },
    {
      accessorKey: 'unit_of_measure',
      header: 'Unit',
    },
    {
      accessorKey: 'standard_cost',
      header: 'Cost',
      cell: ({ row }) => `$${parseFloat(row.original.standard_cost).toFixed(2)}`,
    },
    {
      accessorKey: 'current_stock_level',
      header: 'Stock',
      cell: ({ row }) => (
        <span className={row.original.current_stock_level < 10 ? 'text-red-600 font-semibold' : ''}>
          {row.original.current_stock_level}
        </span>
      ),
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <StatusBadge status={row.original.is_active ? 'ACTIVE' : 'INACTIVE'} />
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  if (isLoading) return <PageSkeleton />
  if (error) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog"
        action={{
          label: 'Add Product',
          onClick: () => {
            setSelectedProduct(null)
            setDialogOpen(true)
          },
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={data?.results || []}
        searchKey="name"
        searchPlaceholder="Search products..."
      />

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={selectedProduct}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  )
}
