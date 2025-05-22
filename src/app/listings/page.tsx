import { getCars } from '@/lib/data';
import type { Car } from '@/types';
import { CarCard } from '@/components/cars/CarCard';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { CarFilters } from '@/components/cars/CarFilters';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

export const metadata = {
  title: 'Car Listings - Premium Auto',
  description: 'Explore all available cars for sale at Premium Auto.',
};

export default async function ListingsPage() {
  const cars = await getCars();

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Car Listings</h1>
        </div>

        <CarFilters initialCars={cars} />
        </div>
    </Container>
  );
}
