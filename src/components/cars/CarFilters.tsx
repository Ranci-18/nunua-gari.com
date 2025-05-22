'use client';

import { useState, useMemo } from 'react';
import type { Car } from '@/types';
import { CarCard } from './CarCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { FilterX, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Common car makes
const CAR_MAKES = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 
  'Audi', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 
  'Tesla', 'Porsche', 'Jeep', 'Dodge', 'Chrysler', 'GMC', 'Buick', 'Cadillac',
  'Acura', 'Infiniti', 'Lincoln', 'Volvo', 'Land Rover', 'Jaguar', 'Mini',
  'Mitsubishi', 'Suzuki', 'Fiat', 'Alfa Romeo', 'Maserati', 'Bentley', 'Rolls-Royce',
  'Lamborghini', 'Ferrari', 'Aston Martin', 'McLaren', 'Bugatti'
].sort();

const TRANSMISSION_TYPES = ['Automatic', 'Manual', 'CVT'] as const;
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric'] as const;

export interface FiltersState {
  searchTerm: string;
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  fuelType: string;
  transmission: string;
}

interface CarFiltersProps {
  initialCars: Car[];
}

const ANY_OPTION_VALUE = "__ANY_OPTION__"; // Special value for "Any" options

export function CarFilters({ initialCars }: CarFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    searchTerm: '',
    make: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    transmission: '',
  });

  // Get unique models for the selected make
  const availableModels = useMemo(() => {
    if (!filters.make) return [];
    return [...new Set(
      initialCars
        .filter(car => car.make === filters.make)
        .map(car => car.model)
    )].sort();
  }, [filters.make, initialCars]);

  // Get min and max years from the car list
  const yearRange = useMemo(() => {
    const years = initialCars.map(car => car.year);
    return {
      min: Math.min(...years),
      max: Math.max(...years)
    };
  }, [initialCars]);

  // Get min and max prices from the car list
  const priceRange = useMemo(() => {
    const prices = initialCars.map(car => car.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [initialCars]);

  const filteredCars = useMemo(() => {
    return initialCars.filter(car => {
      // Search term filter (case-insensitive)
      const searchTerm = filters.searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm) ||
        car.description.toLowerCase().includes(searchTerm);

      // Make filter
      const matchesMake = !filters.make || car.make === filters.make;

      // Model filter
      const matchesModel = !filters.model || car.model === filters.model;

      // Year range filter
      const year = car.year;
      const matchesYear = (!filters.minYear || year >= parseInt(filters.minYear)) &&
                         (!filters.maxYear || year <= parseInt(filters.maxYear));

      // Price range filter
      const price = car.price;
      const matchesPrice = (!filters.minPrice || price >= parseInt(filters.minPrice)) &&
                          (!filters.maxPrice || price <= parseInt(filters.maxPrice));

      // Fuel type filter
      const matchesFuel = !filters.fuelType || car.fuelType === filters.fuelType;

      // Transmission filter
      const matchesTransmission = !filters.transmission || car.transmission === filters.transmission;

      return matchesSearch && matchesMake && matchesModel && matchesYear && 
             matchesPrice && matchesFuel && matchesTransmission;
    });
  }, [initialCars, filters]);

  const handleSelectChange = (filterName: keyof FiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value === ANY_OPTION_VALUE ? '' : value }));
  };

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <Search className="h-6 w-6" /> Find Your Next Car
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {/* Search Term */}
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="searchTerm">Search (Make, Model, Description)</Label>
            <Input
              id="searchTerm"
              placeholder="e.g., Toyota Camry reliable"
              value={filters.searchTerm}
              onChange={(e) => handleSelectChange('searchTerm', e.target.value)}
            />
          </div>

          {/* Make */}
          <div>
            <Label htmlFor="make">Make</Label>
            <Select 
              value={filters.make === '' ? ANY_OPTION_VALUE : filters.make} 
              onValueChange={(value) => handleSelectChange('make', value)}
            >
              <SelectTrigger id="make">
                <SelectValue placeholder="Any Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY_OPTION_VALUE}>Any Make</SelectItem>
                {CAR_MAKES.map(make => (
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model */}
          <div>
            <Label htmlFor="model">Model</Label>
            <Select 
              value={filters.model === '' ? ANY_OPTION_VALUE : filters.model} 
              onValueChange={(value) => handleSelectChange('model', value)} 
              disabled={!filters.make && availableModels.length === 0 && CAR_MAKES.length > 0}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Any Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY_OPTION_VALUE}>Any Model</SelectItem>
                {availableModels.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Fuel Type */}
          <div>
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select 
              value={filters.fuelType === '' ? ANY_OPTION_VALUE : filters.fuelType} 
              onValueChange={(value) => handleSelectChange('fuelType', value)}
            >
              <SelectTrigger id="fuelType">
                <SelectValue placeholder="Any Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY_OPTION_VALUE}>Any Fuel Type</SelectItem>
                {FUEL_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transmission */}
          <div>
            <Label htmlFor="transmission">Transmission</Label>
            <Select 
              value={filters.transmission === '' ? ANY_OPTION_VALUE : filters.transmission} 
              onValueChange={(value) => handleSelectChange('transmission', value)}
            >
              <SelectTrigger id="transmission">
                <SelectValue placeholder="Any Transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY_OPTION_VALUE}>Any Transmission</SelectItem>
                {TRANSMISSION_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minYear">Min Year</Label>
              <Input
                id="minYear"
                type="number"
                placeholder="1990"
                value={filters.minYear}
                onChange={(e) => handleSelectChange('minYear', e.target.value)}
                min={yearRange.min.toString()}
                max={yearRange.max.toString()}
              />
            </div>
            <div>
              <Label htmlFor="maxYear">Max Year</Label>
              <Input
                id="maxYear"
                type="number"
                placeholder={yearRange.max.toString()}
                value={filters.maxYear}
                onChange={(e) => handleSelectChange('maxYear', e.target.value)}
                min={yearRange.min.toString()}
                max={yearRange.max.toString()}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice">Min Price (Ksh)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleSelectChange('minPrice', e.target.value)}
                min={priceRange.min.toString()}
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Max Price (Ksh)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="10000000"
                value={filters.maxPrice}
                onChange={(e) => handleSelectChange('maxPrice', e.target.value)}
                min={priceRange.min.toString()}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <FilterX className="h-4 w-4" /> Reset Filters
          </Button>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredCars.length} of {initialCars.length} cars
        </div>

        {/* Car grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* No results message */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No cars match your filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
