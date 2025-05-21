
import type { Car, ContactMessageDb, ContactFormDataForDb } from '@/types';
import { clientPromise, ObjectId } from './mongodb';
import type { Collection, Document } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB_NAME || 'premiumAutoDB';
const CARS_COLLECTION = 'cars';
const MESSAGES_COLLECTION = 'contactMessages';

async function getCollection(collectionName: string): Promise<Collection<Document>> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(collectionName);
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

// Helper to convert MongoDB document to ContactMessageDb type
function docToMessage(doc: Document): ContactMessageDb {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    preferredContactMethod: doc.preferredContactMethod,
    message: doc.message,
    isRead: doc.isRead,
    createdAt: new Date(doc.createdAt),
  };
}


// Car Functions
export async function getCars(): Promise<Car[]> {
  const carsCollection = await getCollection(CARS_COLLECTION);
  const carDocs = await carsCollection.find({}).sort({ createdAt: -1 }).toArray();
  return carDocs.map(docToCar);
}

export async function getCarById(id: string): Promise<Car | undefined> {
  if (!ObjectId.isValid(id)) {
    return undefined;
  }
  const carsCollection = await getCollection(CARS_COLLECTION);
  const carDoc = await carsCollection.findOne({ _id: new ObjectId(id) });
  return carDoc ? docToCar(carDoc) : undefined;
}

export async function addCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> {
  const carsCollection = await getCollection(CARS_COLLECTION);
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
  const carsCollection = await getCollection(CARS_COLLECTION);
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
  const carsCollection = await getCollection(CARS_COLLECTION);
  const result = await carsCollection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// Contact Message Functions
export async function addContactMessage(messageData: ContactFormDataForDb): Promise<ContactMessageDb> {
  const messagesCollection = await getCollection(MESSAGES_COLLECTION);
  const now = new Date();
  const messageDocument = {
    ...messageData,
    isRead: false,
    createdAt: now,
  };
  const result = await messagesCollection.insertOne(messageDocument);
  return {
    ...messageData,
    id: result.insertedId.toString(),
    isRead: false,
    createdAt: now,
  };
}

export async function getContactMessages(): Promise<ContactMessageDb[]> {
  const messagesCollection = await getCollection(MESSAGES_COLLECTION);
  const messageDocs = await messagesCollection.find({}).sort({ createdAt: -1 }).toArray();
  return messageDocs.map(docToMessage);
}

export async function getContactMessageById(id: string): Promise<ContactMessageDb | undefined> {
  if (!ObjectId.isValid(id)) {
    return undefined;
  }
  const messagesCollection = await getCollection(MESSAGES_COLLECTION);
  const messageDoc = await messagesCollection.findOne({ _id: new ObjectId(id) });
  return messageDoc ? docToMessage(messageDoc) : undefined;
}

export async function markContactMessageReadStatus(id: string, isRead: boolean): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const messagesCollection = await getCollection(MESSAGES_COLLECTION);
  const result = await messagesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { isRead: isRead, updatedAt: new Date() } } // Also update updatedAt if you add it to schema
  );
  return result.modifiedCount === 1;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const messagesCollection = await getCollection(MESSAGES_COLLECTION);
  const result = await messagesCollection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
