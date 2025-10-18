import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories, useSuppliers, useCreateProduct, useUpdateProduct } from "@/hooks/useInventory"
import { productSchema, type ProductFormData } from "@/schemas/inventorySchemas"
import type { Product, UnitOfMeasure } from "@/types/api"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const { data: categoriesData } = useCategories()
  const { data: suppliersData } = useSuppliers({ active_only: true })
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()

  useEffect(() => {
    if (product) {
      reset({
        sku: product.sku,
        name: product.name,
        description: product.description,
        category: product.category,
        unit_of_measure: product.unit_of_measure,
        weight: product.weight,
        dimensions: product.dimensions,
        standard_cost: product.standard_cost,
        primary_supplier: product.primary_supplier,
        specifications: product.specifications,
        is_active: product.is_active,
      })
    } else {
      reset({
        sku: "",
        name: "",
        description: "",
        unit_of_measure: "PCS",
        standard_cost: "0.00",
        is_active: true,
      })
    }
  }, [product, reset, open])

  const onSubmit = (data: ProductFormData) => {
    if (product) {
      updateMutation.mutate({ id: product.id, data }, {
        onSuccess: () => onOpenChange(false),
      })
    } else {
      createMutation.mutate(data, {
        onSuccess: () => onOpenChange(false),
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Create Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" {...register("sku")} placeholder="PROD-001" />
              {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" {...register("name")} placeholder="Temperature Sensor" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              {...register("description")} 
              rows={3} 
              placeholder="Product description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                value={watch("category") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesData?.results.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit_of_measure">Unit of Measure *</Label>
              <Select
                onValueChange={(value) => setValue("unit_of_measure", value as UnitOfMeasure)}
                value={watch("unit_of_measure") || "PCS"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PCS">Pieces</SelectItem>
                  <SelectItem value="KG">Kilograms</SelectItem>
                  <SelectItem value="M">Meters</SelectItem>
                  <SelectItem value="L">Liters</SelectItem>
                  <SelectItem value="SET">Sets</SelectItem>
                  <SelectItem value="BOX">Boxes</SelectItem>
                  <SelectItem value="ROLL">Rolls</SelectItem>
                  <SelectItem value="PACK">Packs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="standard_cost">Standard Cost (EGP) *</Label>
              <Input 
                id="standard_cost" 
                type="number" 
                step="0.01" 
                {...register("standard_cost", { required: true })} 
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                type="number" 
                step="0.001" 
                {...register("weight")} 
                placeholder="0.000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input 
                id="dimensions" 
                {...register("dimensions")} 
                placeholder="10 x 5 x 3 cm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary_supplier">Primary Supplier</Label>
            <Select
              onValueChange={(value) => setValue("primary_supplier", value)}
              value={watch("primary_supplier") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliersData?.results.map((supplier: any) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? "Saving..." : product ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
