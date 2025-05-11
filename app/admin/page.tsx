import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getAllCars } from "@/lib/cars"
import AdminCarList from "@/components/admin/admin-car-list"

export default async function AdminDashboard() {
  const cars = await getAllCars()

  // Calculate some stats
  const totalCars = cars.length
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0)
  const featuredCars = cars.filter((car) => car.featured).length
  const recentlyAdded = cars.slice(0, 5)

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/cars/new">Add New Car</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCars} cars</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total value of all vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Featured Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredCars}</div>
            <p className="text-xs text-muted-foreground">Currently featured on homepage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">New inquiries this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Car Inventory</CardTitle>
              <CardDescription>
                Manage your car listings, update details, or remove vehicles from inventory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCarList cars={cars} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Inquiries</CardTitle>
              <CardDescription>View and respond to customer inquiries and test drive requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-center text-gray-500">No inquiries to display</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>View sales performance and website traffic analytics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-center text-gray-500">Analytics data will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Business Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border px-3 py-2"
                  defaultValue="Premium Auto Sales"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border px-3 py-2"
                  defaultValue="admin@premiumauto.com"
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
