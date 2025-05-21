
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCars } from '@/lib/data';
import type { Car } from '@/types';
import { CarCard } from '@/components/cars/CarCard';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { CarFilters, type FiltersState } from '@/components/cars/CarFilters';
import { Skeleton } from '@/components/ui/skeleton';

// Metadata is typically handled by generateMetadata in Server Components
// For Client Components, you might need a different approach if dynamic metadata based on fetched data is required.
// For now, we'll keep it simple. Consider this if SEO for filtered states is critical.
// export const metadata: Metadata = { ... }; 

const initialFilters: FiltersState = {
  searchTerm: '',
  make: '',
  model: '',
  minYear: '',
  maxYear: '',
  minPrice: '',
  maxPrice: '',
  fuelType: '',
  transmission: '',
};

export default function ListingsPage() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      setIsLoading(true);
      try {
        const carsData = await getCars();
        setAllCars(carsData);
        setDisplayedCars(carsData); // Initially display all cars
      } catch (error) {
        console.error("Failed to load cars:", error);
        // Optionally set an error state here
      }
      setIsLoading(false);
    }
    loadCars();
  }, []);

  const handleFilterChange = useCallback((filterName: keyof FiltersState, value: string) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [filterName]: value };
      // If make is changed, reset model
      if (filterName === 'make' && prevFilters.make !== value) {
        newFilters.model = '';
      }
      return newFilters;
    });
  }, []);
  
  const handleResetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  useEffect(() => {
    if (isLoading) return; // Don't filter if initial data isn't loaded

    let filtered = [...allCars];

    // Search term (make, model, description)
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(searchTermLower) ||
        car.model.toLowerCase().includes(searchTermLower) ||
        car.description.toLowerCase().includes(searchTermLower)
      );
    }

    // Make
    if (filters.make) {
      filtered = filtered.filter(car => car.make === filters.make);
    }

    // Model
    if (filters.model) {
      filtered = filtered.filter(car => car.model === filters.model);
    }
    
    // Year
    if (filters.minYear) {
      filtered = filtered.filter(car => car.year >= parseInt(filters.minYear, 10));
    }
    if (filters.maxYear) {
      filtered = filtered.filter(car => car.year <= parseInt(filters.maxYear, 10));
    }

    // Price
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice, 10));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice, 10));
    }
    
    // Fuel Type
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    // Transmission
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    setDisplayedCars(filtered);
  }, [filters, allCars, isLoading]);


  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-6 flex justify-start">
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <CarFilters 
        cars={allCars} 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onResetFilters={handleResetFilters} 
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : displayedCars.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg py-10 flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
          <p className="text-xl font-semibold">No cars match your current filters.</p>
          <p>Try adjusting your search or filter criteria, or reset the filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </Container>
  );
}
