
import type { Car } from '@/types';
import { clientPromise, ObjectId } from './mongodb';
import type { Collection, Document } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB_NAME || 'premiumAutoDB'; // You can make DB name configurable
const CARS_COLLECTION = 'cars';

async function getCarsCollection(): Promise<Collection<Document>> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(CARS_COLLECTION);
}

// Helper to convert MongoDB document to Car type
function docToCar(doc: Document): Car {
  return {
    id: doc._id.toString(),
    make: doc.make,
    model: doc.model,
    year: doc.year,
    price: doc.price,
    mileage: doc.mileage,
    description: doc.description,
    images: doc.images,
    features: doc.features,
    engine: doc.engine,
    transmission: doc.transmission,
    fuelType: doc.fuelType,
    exteriorColor: doc.exteriorColor,
    interiorColor: doc.interiorColor,
    vin: doc.vin,
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  };
}


export async function getCars(): Promise<Car[]> {
  const carsCollection = await getCarsCollection();
  const carDocs = await carsCollection.find({}).sort({ createdAt: -1 }).toArray();
  return carDocs.map(docToCar);
}

export async function getCarById(id: string): Promise<Car | undefined> {
  if (!ObjectId.isValid(id)) {
    return undefined;
  }
  const carsCollection = await getCarsCollection();
  const carDoc = await carsCollection.findOne({ _id: new ObjectId(id) });
  return carDoc ? docToCar(carDoc) : undefined;
}

export async function addCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> {
  const carsCollection = await getCarsCollection();
  const now = new Date();
  const carDocument = {
    ...carData,
    createdAt: now,
    updatedAt: now,
  };
  const result = await carsCollection.insertOne(carDocument);
  
  return {
    ...carData,
    id: result.insertedId.toString(),
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateCar(id: string, carData: Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Car | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const carsCollection = await getCarsCollection();
  const now = new Date();
  
  const updateDoc = {
    $set: {
      ...carData,
      updatedAt: now,
    },
  };

  const result = await carsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    updateDoc,
    { returnDocument: 'after' }
  );

  return result ? docToCar(result) : null;
}

export async function deleteCar(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const carsCollection = await getCarsCollection();
  const result = await carsCollection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// The initial in-memory car data is no longer used.
// You would typically run a script to migrate this data to your MongoDB database once.
/*
let cars: Car[] = [
  // ... initial car data was here
];
*/
