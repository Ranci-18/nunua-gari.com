import type { Car } from '@/types';
import { ImageGallery } from '@/components/shared/ImageGallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CalendarDays, Gauge, DollarSign, Wrench, Palette, CarIcon, Settings, Fuel } from 'lucide-react';

interface CarDetailsDisplayProps {
  car: Car;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-start">
    <span className="text-accent mr-3 mt-1 shrink-0">{icon}</span>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-md font-semibold">{value}</p>
    </div>
  </div>
);

export function CarDetailsDisplay({ car }: CarDetailsDisplayProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <ImageGallery images={car.images} altTextPrefix={`${car.make} ${car.model}`} />
      </div>
      
      <div className="md:col-span-1 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">{car.make} {car.model}</CardTitle>
            <p className="text-lg text-muted-foreground">{car.year}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-accent flex items-center gap-2 mb-6">
              <DollarSign className="h-8 w-8" />
              {car.price.toLocaleString()}
            </p>
            <div className="space-y-3">
              <DetailItem icon={<Gauge className="h-5 w-5" />} label="Mileage" value={`${car.mileage.toLocaleString()} mi`} />
              <DetailItem icon={<CalendarDays className="h-5 w-5" />} label="First Registered" value={new Date(car.createdAt).toLocaleDateString()} />
              <DetailItem icon={<Tag className="h-5 w-5" />} label="VIN" value={car.vin} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Key Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailItem icon={<Settings className="h-5 w-5" />} label="Engine" value={car.engine} />
            <DetailItem icon={<Wrench className="h-5 w-5" />} label="Transmission" value={car.transmission} />
            <DetailItem icon={<Fuel className="h-5 w-5" />} label="Fuel Type" value={car.fuelType} />
            <DetailItem icon={<Palette className="h-5 w-5" />} label="Exterior Color" value={car.exteriorColor} />
            <DetailItem icon={<CarIcon className="h-5 w-5" />} label="Interior Color" value={car.interiorColor} />
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-3 space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{car.description}</p>
          </CardContent>
        </Card>

        {car.features && car.features.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
