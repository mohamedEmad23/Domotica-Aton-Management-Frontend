"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { getStock } from "@/services/inventory"

export function StockTab() {
  const [search, setSearch] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["stock"],
    queryFn: () => getStock(),
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  const stocks = data?.results || []
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      stock.location_name?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by product or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.map((stock) => {
              const isLowStock = stock.quantity < 10
              return (
                <TableRow key={stock.id}>
                  <TableCell className="font-medium">{stock.product_name}</TableCell>
                  <TableCell>{stock.location_name}</TableCell>
                  <TableCell className="text-right font-mono">{stock.quantity}</TableCell>
                  <TableCell>
                    {isLowStock ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="default">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(stock.last_updated).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
