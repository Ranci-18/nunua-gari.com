
import type { Car } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, CalendarDays, Gauge } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const primaryImage = car.images && car.images.length > 0 ? car.images[0] : 'https://placehold.co/600x400.png';
  const imageAlt = `${car.make} ${car.model}`;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/cars/${car.id}`} className="block">
          <div className="aspect-video relative w-full overflow-hidden">
            <Image
              src={primaryImage}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint={primaryImage === 'https://placehold.co/600x400.png' ? 'placeholder car' : `${car.make} ${car.model}`}
              priority={false} // Only set priority for above-the-fold images on initial load (e.g., hero)
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/cars/${car.id}`}>
          <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {car.make} {car.model}
          </CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground space-y-1">
          {car.vin && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-accent" />
              <span>VIN: {car.vin.slice(0,5)}...{car.vin.slice(-5)}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span>Year: {car.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-accent" />
            <span>Mileage: {car.mileage.toLocaleString()} kms</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <p className="text-2xl font-bold text-primary">
          Ksh {car.price.toLocaleString()}
        </p>
        <Button asChild>
          <Link href={`/cars/${car.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
