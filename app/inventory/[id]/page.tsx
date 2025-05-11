import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCarById, getSimilarCars } from "@/lib/cars"
import CarGrid from "@/components/car-grid"

interface CarDetailPageProps {
  params: {
    id: string
  }
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const car = await getCarById(params.id)

  if (!car) {
    notFound()
  }

  const similarCars = await getSimilarCars(car)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={car.images[0] || "/placeholder.svg?height=400&width=600"}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {car.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={image || `/placeholder.svg?height=100&width=150&text=Image${index + 1}`}
                  alt={`${car.make} ${car.model} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">
            {car.year} {car.make} {car.model}
          </h1>
          <p className="mb-4 text-3xl font-bold text-primary">${car.price.toLocaleString()}</p>
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
          <div className="mb-6 space-y-4">
            <Button className="w-full">Contact Seller</Button>
            <Button variant="outline" className="w-full">
              Schedule Test Drive
            </Button>
            <Button variant="secondary" className="w-full">
              Apply for Financing
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-semibold">Seller Notes</h3>
            <p className="text-gray-600">{car.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs for Additional Information */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="history">Vehicle History</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">Vehicle Features</h3>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">Vehicle Specifications</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Engine</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Engine Type: {car.specifications.engine.type}</li>
                <li>Displacement: {car.specifications.engine.displacement}</li>
                <li>Horsepower: {car.specifications.engine.horsepower} hp</li>
                <li>Torque: {car.specifications.engine.torque} lb-ft</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Dimensions</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Length: {car.specifications.dimensions.length} in</li>
                <li>Width: {car.specifications.dimensions.width} in</li>
                <li>Height: {car.specifications.dimensions.height} in</li>
                <li>Wheelbase: {car.specifications.dimensions.wheelbase} in</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Performance</h4>
              <ul className="space-y-1 text-gray-600">
                <li>0-60 mph: {car.specifications.performance.zeroToSixty} sec</li>
                <li>Top Speed: {car.specifications.performance.topSpeed} mph</li>
                <li>Fuel Economy (City): {car.specifications.performance.fuelEconomyCity} mpg</li>
                <li>Fuel Economy (Highway): {car.specifications.performance.fuelEconomyHighway} mpg</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Capacity</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Seating: {car.specifications.capacity.seating} passengers</li>
                <li>Cargo Volume: {car.specifications.capacity.cargoVolume} cu ft</li>
                <li>Fuel Tank: {car.specifications.capacity.fuelTank} gal</li>
                <li>Towing Capacity: {car.specifications.capacity.towingCapacity} lbs</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history" className="rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">Vehicle History</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Ownership</h4>
                <p className="text-gray-600">Previous Owners: {car.history.owners}</p>
                <p className="text-gray-600">Title Status: {car.history.title}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Accidents</h4>
                <p className="text-gray-600">
                  {car.history.accidents ? `${car.history.accidents} reported accidents` : "No reported accidents"}
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Service History</h4>
              <ul className="space-y-2">
                {car.history.serviceRecords.map((record, index) => (
                  <li key={index} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium">{record.date}</span>
                      <span className="text-gray-600">{record.mileage.toLocaleString()} miles</span>
                    </div>
                    <p className="text-gray-600">{record.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Similar Cars */}
      {similarCars.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">Similar Vehicles</h2>
          <CarGrid cars={similarCars} />
        </div>
      )}
    </div>
  )
}
