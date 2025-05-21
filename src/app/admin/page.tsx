import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Car, PlusCircle, ListChecks, Settings } from "lucide-react";
import { getCars } from "@/lib/data";

export default async function AdminDashboardPage() {
  const cars = await getCars();
  const totalListings = cars.length;
  // In a real app, you'd fetch more stats, e.g., messages, views, etc.

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Premium Auto Admin Panel.</p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Add New Car
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Car className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalListings}</div>
            <p className="text-xs text-muted-foreground">
              Currently active car listings
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <ListChecks className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 New</div> {/* Placeholder */}
            <p className="text-xs text-muted-foreground">
              Messages and inquiries this week (placeholder)
            </p>
          </CardContent>
        </Card>

        {/* Add more summary cards as needed */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Quickly navigate to common tasks.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" asChild className="w-full justify-start text-left py-6">
            <Link href="/admin/cars" className="flex items-center gap-3">
              <Car className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Manage Car Listings</p>
                <p className="text-xs text-muted-foreground">View, edit, or delete existing car listings.</p>
              </div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start text-left py-6">
            <Link href="/admin/cars/new" className="flex items-center gap-3">
              <PlusCircle className="h-5 w-5 text-primary" />
               <div>
                <p className="font-semibold">Add a New Car</p>
                <p className="text-xs text-muted-foreground">Create a new listing for a vehicle.</p>
              </div>
            </Link>
          </Button>
           {/* Placeholder for future quick actions */}
          <Button variant="outline" disabled className="w-full justify-start text-left py-6 opacity-50">
             <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Site Settings</p>
                  <p className="text-xs text-muted-foreground">(Coming Soon)</p>
                </div>
              </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
