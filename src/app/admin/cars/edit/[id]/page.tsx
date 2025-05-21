import { getCarById } from '@/lib/data';
import { CarForm } from '@/components/cars/CarForm';
import { updateCarAction } from '@/lib/actions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const car = await getCarById(params.id);
  if (!car) {
    return { title: 'Car Not Found - Admin' };
  }
  return {
    title: `Edit ${car.make} ${car.model} - Admin Panel`,
    description: `Edit details for ${car.make} ${car.model}.`,
  };
}

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const car = await getCarById(params.id);

  if (!car) {
    notFound();
  }

  // Bind the car ID to the updateCarAction
  const updateCarWithIdAction = updateCarAction.bind(null, car.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Edit Car Listing</h1>
        <p className="text-muted-foreground">Update the details for {car.make} {car.model} (VIN: {car.vin}).</p>
      </div>
      <CarForm car={car} action={updateCarWithIdAction} />
    </div>
  );
}
