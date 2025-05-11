import { Search } from "lucide-react"
import Link from "next/link"
import CarGrid from "@/components/car-grid"
import FeaturedCar from "@/components/featured-car"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCars } from "@/lib/cars"

export default async function Home() {
  const cars = await getAllCars()
  const featuredCar = cars.length > 0 ? cars[0] : null

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}
        />
        <div className="container relative z-20 mx-auto px-4 py-24 sm:py-32">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Find Your Perfect Drive</h1>
          <p className="mb-8 max-w-lg text-lg text-gray-200">
            Premium selection of quality vehicles at competitive prices. Your journey to the perfect car starts here.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Browse Inventory
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Find Your Next Car</h2>
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
            <div className="mt-4 flex justify-end">
              <Button>Apply Filters</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Car Section */}
      {featuredCar && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-bold">Featured Vehicle</h2>
            <FeaturedCar car={featuredCar} />
          </div>
        </section>
      )}

      {/* Car Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Latest Inventory</h2>
            <Link href="/inventory" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <CarGrid cars={cars.slice(0, 8)} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Assurance</h3>
              <p className="text-gray-600">
                All our vehicles undergo rigorous inspection to ensure top quality and reliability.
              </p>
            </div>
            <div className="rounded-lg p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Competitive Pricing</h3>
              <p className="text-gray-600">
                We offer the best market prices with flexible financing options to suit your budget.
              </p>
            </div>
            <div className="rounded-lg p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Support</h3>
              <p className="text-gray-600">
                Our team of automotive experts is always ready to assist you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Find Your Dream Car?</h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg">
            Browse our extensive inventory or contact our sales team to help you find the perfect vehicle that meets
            your needs and budget.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary">
              Browse Inventory
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
