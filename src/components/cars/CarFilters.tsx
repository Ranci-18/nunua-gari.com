
'use client';

import type { Car } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useMemo } from 'react';
import { FilterX, Search } from 'lucide-react';

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
  cars: Car[];
  filters: FiltersState;
  onFilterChange: (filterName: keyof FiltersState, value: string) => void;
  onResetFilters: () => void;
}

const ANY_OPTION_VALUE = "__ANY_OPTION__"; // Special value for "Any" options

export function CarFilters({ cars, filters, onFilterChange, onResetFilters }: CarFiltersProps) {
  const uniqueMakes = useMemo(() => Array.from(new Set(cars.map(car => car.make).filter(Boolean))).sort(), [cars]);
  
  const availableModels = useMemo(() => {
    if (filters.make) {
      return Array.from(new Set(cars.filter(car => car.make === filters.make).map(car => car.model).filter(Boolean))).sort();
    }
    return Array.from(new Set(cars.map(car => car.model).filter(Boolean))).sort();
  }, [cars, filters.make]);

  const uniqueFuelTypes = useMemo(() => Array.from(new Set(cars.map(car => car.fuelType).filter(Boolean))).sort(), [cars]);
  const uniqueTransmissions = useMemo(() => Array.from(new Set(cars.map(car => car.transmission).filter(Boolean))).sort(), [cars]);

  const currentYear = new Date().getFullYear();

  const handleSelectChange = (filterName: keyof FiltersState, value: string) => {
    onFilterChange(filterName, value === ANY_OPTION_VALUE ? '' : value);
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
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
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
                {uniqueMakes.map(make => (
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
              disabled={!filters.make && availableModels.length === 0 && uniqueMakes.length > 0}
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
                {uniqueFuelTypes.map(type => (
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
                {uniqueTransmissions.map(type => (
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
                onChange={(e) => onFilterChange('minYear', e.target.value)}
                min="1900"
                max={currentYear.toString()}
              />
            </div>
            <div>
              <Label htmlFor="maxYear">Max Year</Label>
              <Input
                id="maxYear"
                type="number"
                placeholder={currentYear.toString()}
                value={filters.maxYear}
                onChange={(e) => onFilterChange('maxYear', e.target.value)}
                min="1900"
                max={currentYear.toString()}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice">Min Price ($)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Max Price ($)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="100000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onResetFilters} className="flex items-center gap-2">
            <FilterX className="h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
