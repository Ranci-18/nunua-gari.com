import { CarForm } from '@/components/cars/CarForm';
import { createCarAction } from '@/lib/actions';

export const metadata = {
  title: 'Add New Car - Admin Panel - Premium Auto',
  description: 'Create a new car listing for Premium Auto.',
};

export default function NewCarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Add New Car Listing</h1>
        <p className="text-muted-foreground">Fill in the details below to create a new car listing.</p>
      </div>
      <CarForm action={createCarAction} />
    </div>
  );
}
