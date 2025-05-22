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
import { FilterX, Search, RotateCcw, Plus, Minus } from 'lucide-react';
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

const initialFilters: FiltersState = {
  searchTerm: '',
  make: 'all',
  model: 'all',
  minYear: 'all',
  maxYear: 'all',
  minPrice: 'all',
  maxPrice: 'all',
  fuelType: 'all',
  transmission: 'all',
};

export function CarFilters({ initialCars }: CarFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

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
    return {
      min: 1999,
      max: new Date().getFullYear()
    };
  }, []);

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
      const matchesMake = filters.make === 'all' || car.make === filters.make;

      // Model filter
      const matchesModel = filters.model === 'all' || car.model === filters.model;

      // Year range filter
      const year = car.year;
      const matchesYear = (filters.minYear === 'all' || year >= parseInt(filters.minYear)) &&
                         (filters.maxYear === 'all' || year <= parseInt(filters.maxYear));

      // Price range filter
      const price = car.price;
      const matchesPrice = (filters.minPrice === 'all' || price >= parseInt(filters.minPrice)) &&
                          (filters.maxPrice === 'all' || price <= parseInt(filters.maxPrice));

      // Fuel type filter
      const matchesFuel = filters.fuelType === 'all' || car.fuelType === filters.fuelType;

      // Transmission filter
      const matchesTransmission = filters.transmission === 'all' || car.transmission === filters.transmission;

      return matchesSearch && matchesMake && matchesModel && matchesYear && 
             matchesPrice && matchesFuel && matchesTransmission;
    });
  }, [initialCars, filters]);

  const handleSelectChange = (filterName: keyof FiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value === ANY_OPTION_VALUE ? '' : value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const handleYearChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      setFilters(prev => ({
        ...prev,
        minYear: Math.min(Math.max(numValue, yearRange.min), parseInt(prev.maxYear)).toString()
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        maxYear: Math.max(Math.min(numValue, yearRange.max), parseInt(prev.minYear)).toString()
      }));
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      setFilters(prev => ({
        ...prev,
        minPrice: Math.min(Math.max(numValue, 0), parseInt(prev.maxPrice)).toString()
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        maxPrice: Math.max(Math.min(numValue, 1000000), parseInt(prev.minPrice)).toString()
      }));
    }
  };

  const incrementValue = (type: 'min' | 'max', field: 'Year' | 'Price') => {
    const step = field === 'Year' ? 1 : 10000;
    const key = `${type}${field}` as 'minYear' | 'maxYear' | 'minPrice' | 'maxPrice';
    const currentValue = parseInt(filters[key]);
    const newValue = currentValue + step;
    
    if (field === 'Year') {
      handleYearChange(type, newValue.toString());
    } else {
      handlePriceChange(type, newValue.toString());
    }
  };

  const decrementValue = (type: 'min' | 'max', field: 'Year' | 'Price') => {
    const step = field === 'Year' ? 1 : 10000;
    const key = `${type}${field}` as 'minYear' | 'maxYear' | 'minPrice' | 'maxPrice';
    const currentValue = parseInt(filters[key]);
    const newValue = currentValue - step;
    
    if (field === 'Year') {
      handleYearChange(type, newValue.toString());
    } else {
      handlePriceChange(type, newValue.toString());
    }
  };

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <Search className="h-6 w-6" /> Find Your Next Car
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search cars..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="flex-1"
              />
              {Object.values(filters).some(value => value !== 'all' && value !== '') && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetFilters}
                  title="Reset all filters"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Select
              value={filters.make}
              onValueChange={(value) => setFilters(prev => ({ ...prev, make: value, model: 'all' }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {CAR_MAKES.map(make => (
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.model}
              onValueChange={(value) => setFilters(prev => ({ ...prev, model: value }))}
              disabled={filters.make === 'all'}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {availableModels.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.fuelType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, fuelType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuel Types</SelectItem>
                {FUEL_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.transmission}
              onValueChange={(value) => setFilters(prev => ({ ...prev, transmission: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transmissions</SelectItem>
                {TRANSMISSION_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Manufacture Year Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={filters.minYear}
                  onChange={e => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
                  min={yearRange.min}
                  max={filters.maxYear}
                  step={1}
                  placeholder={`Min (${yearRange.min})`}
                  className="h-8"
                />
                <Input
                  type="number"
                  value={filters.maxYear}
                  onChange={e => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
                  min={filters.minYear}
                  max={yearRange.max}
                  step={1}
                  placeholder={`Max (${yearRange.max})`}
                  className="h-8"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: {yearRange.min}</span>
                <span>Max: {yearRange.max}</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range (KES)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={filters.minPrice}
                  onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  min={0}
                  max={filters.maxPrice}
                  step={10000}
                  placeholder="Min (0)"
                  className="h-8"
                />
                <Input
                  type="number"
                  value={filters.maxPrice}
                  onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  min={filters.minPrice}
                  max={100000000}
                  step={10000}
                  placeholder="Max (100,000,000)"
                  className="h-8"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: KES 0</span>
                <span>Max: KES 100,000,000</span>
              </div>
            </div>
          </div>
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
