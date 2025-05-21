import { getCarById, getCars } from '@/lib/data';
import { CarDetailsDisplay } from '@/components/cars/CarDetailsDisplay';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const car = await getCarById(params.id);

  if (!car) {
    return {
      title: 'Car Not Found - AutoList',
      description: 'The car you are looking for could not be found.',
    }
  }

  return {
    title: `${car.year} ${car.make} ${car.model} - AutoList`,
    description: car.description.substring(0, 160) + '...',
    openGraph: {
      images: car.images.length > 0 ? [car.images[0]] : [],
    },
  }
}

export async function generateStaticParams() {
  const cars = await getCars();
  return cars.map((car) => ({
    id: car.id,
  }));
}

export default async function CarDetailsPage({ params }: Props) {
  const car = await getCarById(params.id);

  if (!car) {
    notFound();
  }

  return (
    <Container className="py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>
      </Button>
      <CarDetailsDisplay car={car} />
    </Container>
  );
}

// Revalidate this page if data changes, e.g. every hour
export const revalidate = 3600;
