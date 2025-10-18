"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getSuppliers } from "@/services/inventory"

export function SuppliersTab() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ["suppliers", page, search],
    queryFn: () => getSuppliers({ page, search: search || undefined }),
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }

  const suppliers = data?.results || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                <Badge variant={supplier.is_active ? "default" : "secondary"}>
                  {supplier.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{supplier.rating.toFixed(1)}</span>
                <span className="text-gray-500">/ 5.0</span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">Contact:</span> {supplier.contact_person}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {supplier.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {supplier.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
