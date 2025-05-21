import { getCars } from '@/lib/data';
import { CarCard } from '@/components/cars/CarCard';
import { Container } from '@/components/shared/Container';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const cars = await getCars();

  return (
    <Container>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Find Your Perfect Ride
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground sm:text-xl">
          Browse our curated selection of quality pre-owned vehicles.
        </p>
      </div>
      <Separator className="my-8" />
      {cars.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg">No cars available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </Container>
  );
}

// Revalidate this page every 60 seconds (or as needed)
export const revalidate = 60;
