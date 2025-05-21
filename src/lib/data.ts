
import type { Car } from '@/types';

let cars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 2800000, // Ksh
    mileage: 15000,
    description: 'A reliable and fuel-efficient sedan, perfect for families and commuters. Well-maintained with low mileage.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Bluetooth', 'Backup Camera', 'Lane Assist', 'Apple CarPlay'],
    engine: '2.5L 4-Cylinder',
    transmission: 'Automatic', // Changed from 8-Speed Automatic for simplicity in filters
    fuelType: 'Gasoline',
    exteriorColor: 'Silver',
    interiorColor: 'Black',
    vin: '1ABC123XYZ7890000',
    createdAt: new Date('2023-01-15T09:00:00Z'),
    updatedAt: new Date('2023-05-20T14:30:00Z'),
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    price: 3200000, // Ksh
    mileage: 22000,
    description: 'Spacious and versatile SUV with all-wheel drive. Great for adventures and daily driving.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Sunroof', 'Heated Seats', 'AWD', 'Android Auto'],
    engine: '1.5L Turbocharged 4-Cylinder',
    transmission: 'CVT',
    fuelType: 'Gasoline',
    exteriorColor: 'Red',
    interiorColor: 'Gray',
    vin: '2DEF456UVW4560000',
    createdAt: new Date('2023-02-10T11:00:00Z'),
    updatedAt: new Date('2023-06-01T10:00:00Z'),
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    price: 4500000, // Ksh
    mileage: 35000,
    description: 'Powerful and rugged pickup truck. Ready for work or play, with impressive towing capacity.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Towing Package', '4x4', 'Touchscreen Display', 'Bed Liner'],
    engine: '3.5L V6 EcoBoost',
    transmission: 'Automatic', // Changed from 10-Speed Automatic
    fuelType: 'Gasoline',
    exteriorColor: 'Blue',
    interiorColor: 'Tan',
    vin: '3GHI789RST1230000',
    createdAt: new Date('2022-12-01T15:00:00Z'),
    updatedAt: new Date('2023-04-10T09:15:00Z'),
  },
  {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 5200000, // Ksh
    mileage: 5000,
    description: 'Luxury sport sedan with dynamic performance and premium features. Almost new condition.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Leather Seats', 'Navigation System', 'Harman Kardon Sound', 'Parking Sensors'],
    engine: '2.0L TwinPower Turbo I4',
    transmission: 'Automatic', // Changed from 8-Speed Sport Automatic
    fuelType: 'Gasoline',
    exteriorColor: 'Black Sapphire Metallic',
    interiorColor: 'Cognac Vernasca Leather',
    vin: '4JKL012PQR7890000',
    createdAt: new Date('2023-08-15T10:00:00Z'),
    updatedAt: new Date('2023-09-01T16:20:00Z'),
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 5500000, // Ksh
    mileage: 10000,
    description: 'Cutting-edge electric sedan with impressive range and Autopilot features.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Autopilot', 'Premium Interior', ' panoramic Glass Roof', '15-inch Touchscreen'],
    engine: 'Dual Motor All-Wheel Drive',
    transmission: 'Automatic', // Electric cars are typically single-speed automatic
    fuelType: 'Electric',
    exteriorColor: 'Pearl White Multi-Coat',
    interiorColor: 'All Black',
    vin: '5YJSA1CN0FL00000',
    createdAt: new Date('2023-07-20T14:00:00Z'),
    updatedAt: new Date('2023-09-10T11:00:00Z'),
  },
  {
    id: '6',
    make: 'Volkswagen',
    model: 'Golf TDI',
    year: 2021,
    price: 2300000, // Ksh
    mileage: 30000,
    description: 'Fuel-efficient diesel hatchback, known for its reliability and practicality.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Apple CarPlay', 'Android Auto', 'Blind Spot Monitor', 'Adaptive Cruise Control'],
    engine: '2.0L TDI Diesel',
    transmission: 'Automatic', // DSG Automatic
    fuelType: 'Diesel',
    exteriorColor: 'Dark Blue',
    interiorColor: 'Titan Black Cloth',
    vin: 'WVWZZZAUZMP00000',
    createdAt: new Date('2023-03-05T09:30:00Z'),
    updatedAt: new Date('2023-08-25T15:00:00Z'),
  },
  {
    id: '7',
    make: 'Mazda',
    model: 'MX-5 Miata',
    year: 2022,
    price: 3000000, // Ksh
    mileage: 8000,
    description: 'Iconic roadster that offers pure driving fun with its manual transmission and agile handling.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Convertible Soft Top', 'Bose Audio System', 'Limited-Slip Differential', 'Sport-Tuned Suspension'],
    engine: '2.0L Skyactiv-G 4-Cylinder',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    exteriorColor: 'Soul Red Crystal Metallic',
    interiorColor: 'Black Leather',
    vin: 'JM1ND0EGXN000000',
    createdAt: new Date('2023-06-10T16:00:00Z'),
    updatedAt: new Date('2023-09-05T10:45:00Z'),
  },
  {
    id: '8',
    make: 'Subaru',
    model: 'Outback',
    year: 2020,
    price: 2900000, // Ksh
    mileage: 45000,
    description: 'Dependable all-wheel-drive wagon, perfect for all weather conditions and outdoor activities.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    features: ['Symmetrical AWD', 'EyeSight Driver Assist', 'Roof Rails', 'Heated Seats'],
    engine: '2.5L Boxer Engine',
    transmission: 'CVT', // Lineartronic CVT
    fuelType: 'Gasoline',
    exteriorColor: 'Green',
    interiorColor: 'Gray Cloth',
    vin: '4S4BSBFD0L300000',
    createdAt: new Date('2022-11-01T12:00:00Z'),
    updatedAt: new Date('2023-07-15T08:30:00Z'),
  }
];

// I also simplified some of the transmission values (e.g., "8-Speed Automatic" to just "Automatic")
// to make the filter dropdowns less cluttered with very specific transmission types.
// If you need more granular transmission types in filters, you can keep the detailed names.

export async function getCars(): Promise<Car[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return cars.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getCarById(id: string): Promise<Car | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return cars.find(car => car.id === id);
}

export async function addCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCar: Car = {
    ...carData,
    id: String(Date.now()) + Math.random().toString(36).substring(2,7), // Simple unique ID generation
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  cars.unshift(newCar); // Add to the beginning of the array
  return newCar;
}

export async function updateCar(id: string, carData: Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Car | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const carIndex = cars.findIndex(car => car.id === id);
  if (carIndex === -1) {
    return null;
  }
  cars[carIndex] = {
    ...cars[carIndex],
    ...carData,
    updatedAt: new Date(),
  };
  return cars[carIndex];
}

export async function deleteCar(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const initialLength = cars.length;
  cars = cars.filter(car => car.id !== id);
  return cars.length < initialLength;
}

    