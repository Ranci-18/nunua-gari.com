
import { getCars } from '@/lib/data';
import { CarCard } from '@/components/cars/CarCard';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import type { Car } from '@/types';

export const metadata: Metadata = {
  title: 'All Car Listings - AutoList',
  description: 'Browse our complete inventory of quality pre-owned cars at AutoList.',
};

export default async function ListingsPage() {
  const allCars: Car[] = await getCars();

  return (
    <Container className="py-8 md:py-12">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          All Car Listings
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Browse our complete inventory of quality pre-owned cars.
        </p>
      </div>
      {allCars.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-10">
          No cars available at the moment. Please check back later.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </Container>
  );
}

// Revalidate this page every 60 seconds (or as needed)
export const revalidate = 60;
