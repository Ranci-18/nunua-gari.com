
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

export interface ContactFormDataForDb {
  name: string;
  email: string;
  phone?: string;
  preferredContactMethod: 'email' | 'phone';
  message: string;
}

export interface ContactMessageDb extends ContactFormDataForDb {
  id: string; // Will be MongoDB's _id.toString()
  isRead: boolean;
  createdAt: Date;
  // updatedAt: Date; // Could be added if we track updates to the message itself
}
