import { getCars } from '@/lib/data';
import { CarDataTable } from '@/components/admin/CarDataTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'Manage Cars - Admin Panel',
  description: 'View, edit, or delete car listings for AutoList.',
};

export default async function AdminCarsPage() {
  const cars = await getCars();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Manage Car Listings</h1>
          <p className="text-muted-foreground">
            Here you can view, edit, or delete car listings.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Add New Car
          </Link>
        </Button>
      </div>
      <CarDataTable cars={cars} />
    </div>
  );
}

// Revalidate this page frequently as data might change
export const revalidate = 5; // 5 seconds, or adjust as needed
