"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Car } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AdminCarListProps {
  cars: Car[]
}

export default function AdminCarList({ cars }: AdminCarListProps) {
  const [selectedCars, setSelectedCars] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [carToDelete, setCarToDelete] = useState<string | null>(null)

  const handleSelectAll = () => {
    if (selectedCars.length === cars.length) {
      setSelectedCars([])
    } else {
      setSelectedCars(cars.map((car) => car._id))
    }
  }

  const handleSelect = (id: string) => {
    if (selectedCars.includes(id)) {
      setSelectedCars(selectedCars.filter((carId) => carId !== id))
    } else {
      setSelectedCars([...selectedCars, id])
    }
  }

  const confirmDelete = (id: string) => {
    setCarToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    // In a real app, you would call an API to delete the car
    console.log(`Deleting car with ID: ${carToDelete}`)
    setDeleteDialogOpen(false)
    setCarToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedCars.length === cars.length && cars.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm">
            Select All
          </label>
        </div>
        <div className="flex gap-2">
          {selectedCars.length > 0 && (
            <Button variant="destructive" size="sm">
              Delete Selected
            </Button>
          )}
          <Button size="sm" asChild>
            <Link href="/admin/cars/new">Add Car</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
          <div className="col-span-1"></div>
          <div className="col-span-2">Image</div>
          <div className="col-span-3">Vehicle</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Actions</div>
        </div>

        {cars.map((car) => (
          <div key={car._id} className="grid grid-cols-12 items-center gap-4 border-b p-4 last:border-0">
            <div className="col-span-1">
              <Checkbox checked={selectedCars.includes(car._id)} onCheckedChange={() => handleSelect(car._id)} />
            </div>
            <div className="col-span-2">
              <div className="relative h-16 w-24 overflow-hidden rounded-md">
                <Image
                  src={car.images[0] || "/placeholder.svg?height=100&width=150"}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="font-medium">
                {car.make} {car.model}
              </div>
              <div className="text-sm text-gray-500">
                {car.mileage.toLocaleString()} mi • {car.transmission} • {car.fuelType}
              </div>
            </div>
            <div className="col-span-1">{car.year}</div>
            <div className="col-span-2 font-medium">${car.price.toLocaleString()}</div>
            <div className="col-span-2">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${car.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              >
                {car.featured ? "Featured" : "Standard"}
              </span>
            </div>
            <div className="col-span-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/cars/${car._id}/edit`} className="flex items-center">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => confirmDelete(car._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the car from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
