"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePlus, X } from "lucide-react"
import { getCarById } from "@/lib/cars"
import type { Car } from "@/lib/types"

interface EditCarPageProps {
  params: {
    id: string
  }
}

export default function EditCarPage({ params }: EditCarPageProps) {
  const router = useRouter()
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(params.id)
        setCar(carData)
      } catch (error) {
        console.error("Error fetching car:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // In a real app, you would submit the form data to your API
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setSaving(false)
      router.push("/admin")
    }, 1000)
  }

  const removeImage = (index: number) => {
    if (car) {
      const newImages = [...car.images]
      newImages.splice(index, 1)
      setCar({ ...car, images: newImages })
    }
  }

  const addImage = () => {
    if (car) {
      setCar({
        ...car,
        images: [...car.images, `/placeholder.svg?height=300&width=500&text=Image${car.images.length + 1}`],
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading car details...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="container mx-auto p-4 py-8">
        <div className="rounded-lg border border-destructive p-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-destructive">Car Not Found</h2>
          <p className="mb-4">The car you are trying to edit could not be found.</p>
          <Button onClick={() => router.push("/admin")}>Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Car</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit the basic details about the vehicle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      value={car.make}
                      onChange={(e) => setCar({ ...car, make: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={car.model}
                      onChange={(e) => setCar({ ...car, model: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={car.year}
                      onChange={(e) => setCar({ ...car, year: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={car.price}
                      onChange={(e) => setCar({ ...car, price: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={car.mileage}
                      onChange={(e) => setCar({ ...car, mileage: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN</Label>
                    <Input
                      id="vin"
                      value={car.vin}
                      onChange={(e) => setCar({ ...car, vin: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={car.color}
                      onChange={(e) => setCar({ ...car, color: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={car.description}
                    onChange={(e) => setCar({ ...car, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={car.featured}
                    onCheckedChange={(checked) => setCar({ ...car, featured: checked === true })}
                  />
                  <Label htmlFor="featured">Feature this car on the homepage</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>Edit detailed specifications about the vehicle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bodyStyle">Body Style</Label>
                    <select
                      id="bodyStyle"
                      className="w-full rounded-md border p-2"
                      value={car.bodyStyle}
                      onChange={(e) => setCar({ ...car, bodyStyle: e.target.value })}
                    >
                      <option value="">Select Body Style</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="truck">Truck</option>
                      <option value="coupe">Coupe</option>
                      <option value="convertible">Convertible</option>
                      <option value="wagon">Wagon</option>
                      <option value="van">Van</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <select
                      id="transmission"
                      className="w-full rounded-md border p-2"
                      value={car.transmission}
                      onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                    >
                      <option value="">Select Transmission</option>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                      <option value="cvt">CVT</option>
                      <option value="dualClutch">Dual Clutch</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <select
                      id="fuelType"
                      className="w-full rounded-md border p-2"
                      value={car.fuelType}
                      onChange={(e) => setCar({ ...car, fuelType: e.target.value })}
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="plugin">Plug-in Hybrid</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Features & Options</CardTitle>
                <CardDescription>Edit the features and options available on this vehicle.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${index}`}
                        checked={true}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            const newFeatures = car.features.filter((_, i) => i !== index)
                            setCar({ ...car, features: newFeatures })
                          }
                        }}
                      />
                      <Label htmlFor={`feature-${index}`}>{feature}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="additional-features">Add Feature</Label>
                  <div className="flex gap-2">
                    <Input id="new-feature" placeholder="Enter a new feature" />
                    <Button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("new-feature") as HTMLInputElement
                        if (input.value.trim()) {
                          setCar({
                            ...car,
                            features: [...car.features, input.value.trim()],
                          })
                          input.value = ""
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Images</CardTitle>
                <CardDescription>
                  Edit images of the vehicle. The first image will be used as the main image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {car.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Vehicle image ${index + 1}`}
                        className="aspect-video w-full rounded-md object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {index === 0 && (
                        <span className="absolute left-1 top-1 rounded-md bg-primary px-2 py-1 text-xs text-white">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={addImage}>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
