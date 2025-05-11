import Image from "next/image"
import Link from "next/link"
import type { Car } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedCarProps {
  car: Car
}

export default function FeaturedCar({ car }: FeaturedCarProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          <Image
            src={car.images[0] || "/placeholder.svg?height=400&width=600"}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
          />
          <Badge className="absolute right-2 top-2 bg-primary">Featured</Badge>
        </div>
        <CardContent className="flex flex-col justify-between p-6">
          <div>
            <h3 className="mb-2 text-2xl font-bold">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="mb-4 text-3xl font-bold text-primary">${car.price.toLocaleString()}</p>
            <p className="mb-4 text-gray-600">{car.description}</p>
            <div className="mb-6 grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Mileage:</span>
                <span>{car.mileage.toLocaleString()} mi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Color:</span>
                <span>{car.color}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Transmission:</span>
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Fuel Type:</span>
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Body Style:</span>
                <span>{car.bodyStyle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">VIN:</span>
                <span>{car.vin}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href={`/inventory/${car._id}`}>View Details</Link>
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule Test Drive
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
