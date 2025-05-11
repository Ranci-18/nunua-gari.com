import Link from "next/link"
import Image from "next/image"
import type { Car } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CarGridProps {
  cars: Car[]
}

export default function CarGrid({ cars }: CarGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.map((car) => (
        <Link key={car._id} href={`/inventory/${car._id}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-video relative">
              <Image
                src={car.images[0] || "/placeholder.svg?height=300&width=500"}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
              {car.featured && <Badge className="absolute right-2 top-2">Featured</Badge>}
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Mileage:</span> {car.mileage.toLocaleString()} mi
                </div>
                <div>
                  <span className="font-medium">Color:</span> {car.color}
                </div>
                <div>
                  <span className="font-medium">Transmission:</span> {car.transmission}
                </div>
                <div>
                  <span className="font-medium">Fuel:</span> {car.fuelType}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <span className="text-sm text-gray-600">View Details</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
