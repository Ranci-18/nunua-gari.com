import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminCarNotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-3xl font-bold mb-2">Car Not Found</h1>
      <p className="text-md text-muted-foreground mb-6">
        The car you are trying to edit does not exist or could not be found.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/admin/cars">Go to Car Management</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
