import type { Car } from '@/types';

let cars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 28000,
    mileage: 15000,
    description: 'A reliable and fuel-efficient sedan, perfect for families and commuters. Well-maintained with low mileage.',
    images: ['https://placehold.co/600x400.png?text=Toyota+Camry+Front', 'https://placehold.co/600x400.png?text=Toyota+Camry+Side', 'https://placehold.co/600x400.png?text=Toyota+Camry+Interior'],
    features: ['Bluetooth', 'Backup Camera', 'Lane Assist', 'Apple CarPlay'],
    engine: '2.5L 4-Cylinder',
    transmission: '8-Speed Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Silver',
    interiorColor: 'Black',
    vin: '1ABC123XYZ789',
    createdAt: new Date('2023-01-15T09:00:00Z'),
    updatedAt: new Date('2023-05-20T14:30:00Z'),
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    price: 32000,
    mileage: 22000,
    description: 'Spacious and versatile SUV with all-wheel drive. Great for adventures and daily driving.',
    images: ['https://placehold.co/600x400.png?text=Honda+CR-V+Front', 'https://placehold.co/600x400.png?text=Honda+CR-V+Rear', 'https://placehold.co/600x400.png?text=Honda+CR-V+Cabin'],
    features: ['Sunroof', 'Heated Seats', 'AWD', 'Android Auto'],
    engine: '1.5L Turbocharged 4-Cylinder',
    transmission: 'CVT',
    fuelType: 'Gasoline',
    exteriorColor: 'Red',
    interiorColor: 'Gray',
    vin: '2DEF456UVW456',
    createdAt: new Date('2023-02-10T11:00:00Z'),
    updatedAt: new Date('2023-06-01T10:00:00Z'),
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    price: 45000,
    mileage: 35000,
    description: 'Powerful and rugged pickup truck. Ready for work or play, with impressive towing capacity.',
    images: ['https://placehold.co/600x400.png?text=Ford+F-150+Profile', 'https://placehold.co/600x400.png?text=Ford+F-150+Bed', 'https://placehold.co/600x400.png?text=Ford+F-150+Dashboard'],
    features: ['Towing Package', '4x4', 'Touchscreen Display', 'Bed Liner'],
    engine: '3.5L V6 EcoBoost',
    transmission: '10-Speed Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Blue',
    interiorColor: 'Tan',
    vin: '3GHI789RST123',
    createdAt: new Date('2022-12-01T15:00:00Z'),
    updatedAt: new Date('2023-04-10T09:15:00Z'),
  },
   {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 52000,
    mileage: 5000,
    description: 'Luxury sport sedan with dynamic performance and premium features. Almost new condition.',
    images: ['https://placehold.co/600x400.png?text=BMW+3+Series+Angle', 'https://placehold.co/600x400.png?text=BMW+3+Series+Wheel', 'https://placehold.co/600x400.png?text=BMW+3+Series+Cockpit'],
    features: ['Leather Seats', 'Navigation System', 'Harman Kardon Sound', 'Parking Sensors'],
    engine: '2.0L TwinPower Turbo I4',
    transmission: '8-Speed Sport Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Black Sapphire Metallic',
    interiorColor: 'Cognac Vernasca Leather',
    vin: '4JKL012PQR789',
    createdAt: new Date('2023-08-15T10:00:00Z'),
    updatedAt: new Date('2023-09-01T16:20:00Z'),
  },
];

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
    id: String(Date.now()), // Simple ID generation
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
