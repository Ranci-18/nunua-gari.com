import { Search } from "lucide-react"
import CarGrid from "@/components/car-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCars } from "@/lib/cars"

export default async function InventoryPage() {
  const cars = await getAllCars()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Inventory</h1>

      {/* Search and Filter */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Input type="text" placeholder="Search by make, model..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
          <select className="rounded-md border border-gray-300 px-3 py-2">
            <option value="">All Makes</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2">
            <option value="">Price Range</option>
            <option value="0-10000">$0 - $10,000</option>
            <option value="10000-20000">$10,000 - $20,000</option>
            <option value="20000-30000">$20,000 - $30,000</option>
            <option value="30000+">$30,000+</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2">
            <option value="">Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="older">Older</option>
          </select>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <select className="rounded-md border border-gray-300 px-3 py-2">
            <option value="">Body Style</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="coupe">Coupe</option>
            <option value="convertible">Convertible</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2">
            <option value="">Transmission</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2">
            <option value="">Fuel Type</option>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
          <div className="flex justify-end">
            <Button>Apply Filters</Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">{cars.length} vehicles found</p>
        <select className="rounded-md border border-gray-300 px-3 py-2">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Car Grid */}
      <CarGrid cars={cars} />
    </div>
  )
}
