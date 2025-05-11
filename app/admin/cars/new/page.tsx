"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePlus, X } from "lucide-react"

export default function NewCarPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // In a real app, you would submit the form data to your API
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setLoading(false)
      router.push("/admin")
    }, 1000)
  }

  const handleImageUpload = () => {
    // In a real app, you would handle file uploads
    // For demo purposes, we'll just add a placeholder
    setImages([...images, `/placeholder.svg?height=300&width=500&text=Image${images.length + 1}`])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Car</h1>
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
                <CardDescription>Enter the basic details about the vehicle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="e.g. Toyota" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g. Camry" required />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" placeholder="e.g. 2023" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="e.g. 25000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input id="mileage" type="number" placeholder="e.g. 15000" required />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN</Label>
                    <Input id="vin" placeholder="Vehicle Identification Number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" placeholder="e.g. Silver" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter a detailed description of the vehicle"
                    rows={5}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured">Feature this car on the homepage</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>Enter detailed specifications about the vehicle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bodyStyle">Body Style</Label>
                    <select id="bodyStyle" className="w-full rounded-md border p-2">
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
                    <select id="transmission" className="w-full rounded-md border p-2">
                      <option value="">Select Transmission</option>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                      <option value="cvt">CVT</option>
                      <option value="dualClutch">Dual Clutch</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <select id="fuelType" className="w-full rounded-md border p-2">
                      <option value="">Select Fuel Type</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="plugin">Plug-in Hybrid</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="engineType">Engine Type</Label>
                    <Input id="engineType" placeholder="e.g. V6 3.5L" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horsepower">Horsepower</Label>
                    <Input id="horsepower" type="number" placeholder="e.g. 280" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="drivetrain">Drivetrain</Label>
                    <select id="drivetrain" className="w-full rounded-md border p-2">
                      <option value="">Select Drivetrain</option>
                      <option value="fwd">Front-Wheel Drive (FWD)</option>
                      <option value="rwd">Rear-Wheel Drive (RWD)</option>
                      <option value="awd">All-Wheel Drive (AWD)</option>
                      <option value="4wd">Four-Wheel Drive (4WD)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doors">Doors</Label>
                    <select id="doors" className="w-full rounded-md border p-2">
                      <option value="">Select Doors</option>
                      <option value="2">2 Doors</option>
                      <option value="3">3 Doors</option>
                      <option value="4">4 Doors</option>
                      <option value="5">5 Doors</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="interiorColor">Interior Color</Label>
                    <Input id="interiorColor" placeholder="e.g. Black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exteriorColor">Exterior Color</Label>
                    <Input id="exteriorColor" placeholder="e.g. Silver Metallic" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Features & Options</CardTitle>
                <CardDescription>Select the features and options available on this vehicle.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-bluetooth" />
                    <Label htmlFor="feature-bluetooth">Bluetooth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-navigation" />
                    <Label htmlFor="feature-navigation">Navigation System</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-leather" />
                    <Label htmlFor="feature-leather">Leather Seats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-sunroof" />
                    <Label htmlFor="feature-sunroof">Sunroof/Moonroof</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-heated" />
                    <Label htmlFor="feature-heated">Heated Seats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-backup" />
                    <Label htmlFor="feature-backup">Backup Camera</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-parking" />
                    <Label htmlFor="feature-parking">Parking Sensors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-blindspot" />
                    <Label htmlFor="feature-blindspot">Blind Spot Monitoring</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-apple" />
                    <Label htmlFor="feature-apple">Apple CarPlay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-android" />
                    <Label htmlFor="feature-android">Android Auto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-cruise" />
                    <Label htmlFor="feature-cruise">Adaptive Cruise Control</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-lane" />
                    <Label htmlFor="feature-lane">Lane Departure Warning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-collision" />
                    <Label htmlFor="feature-collision">Collision Warning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-keyless" />
                    <Label htmlFor="feature-keyless">Keyless Entry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature-start" />
                    <Label htmlFor="feature-start">Remote Start</Label>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="additional-features">Additional Features</Label>
                  <Textarea
                    id="additional-features"
                    placeholder="Enter any additional features not listed above"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Images</CardTitle>
                <CardDescription>
                  Upload images of the vehicle. The first image will be used as the main image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {images.map((image, index) => (
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
                <Button type="button" variant="outline" className="w-full" onClick={handleImageUpload}>
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
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Car"}
          </Button>
        </div>
      </form>
    </div>
  )
}
