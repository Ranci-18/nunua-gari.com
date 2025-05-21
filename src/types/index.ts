
export interface Car {
  id: string; // Will be MongoDB's _id.toString()
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  images: string[];
  features: string[];
  engine: string;
  transmission: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  vin?: string; 
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  preferredContactMethod: 'email' | 'phone';
  message: string;
}
