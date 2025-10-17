import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, FolderKanban, TrendingUp } from "lucide-react"

export function DashboardPage() {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Quotes",
      value: "56",
      change: "+8%",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Projects",
      value: "23",
      change: "+5%",
      icon: FolderKanban,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Revenue (MTD)",
      value: "EGP 450K",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to Aton Integrated Management Platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50">
              <Package className="mb-2 h-6 w-6 text-primary-600" />
              <h3 className="font-semibold">Add Product</h3>
              <p className="text-sm text-gray-500">Create a new product</p>
            </button>
            <button className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50">
              <ShoppingCart className="mb-2 h-6 w-6 text-primary-600" />
              <h3 className="font-semibold">New Quote</h3>
              <p className="text-sm text-gray-500">Generate a quote</p>
            </button>
            <button className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50">
              <FolderKanban className="mb-2 h-6 w-6 text-primary-600" />
              <h3 className="font-semibold">Create Project</h3>
              <p className="text-sm text-gray-500">Start a new project</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
